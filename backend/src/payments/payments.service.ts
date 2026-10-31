import { createHmac, timingSafeEqual } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { CashService } from '../cash/cash.service.js';
import { Clock } from '../common/clock.js';
import { DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { kz } from '../common/money.js';
import { ENV, type Env } from '../config/env.js';
import { AuditService } from '../core/audit.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { SettingsService } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { cashMovements, members, payments, plans, subscriptions, type PayMethod } from '../db/schema.js';
import { InvoicesService } from '../invoices/invoices.service.js';
import { MembersService } from '../members/members.service.js';

export type Payment = typeof payments.$inferSelect;
const IMMEDIATE: PayMethod[] = ['dinheiro', 'tpa'];

/** Assinatura dos webhooks do agregador de pagamentos (RNF-09). */
export const webhookSignature = (secret: string, p: { orgId: string; paymentId: string; status: string; amountCents: number }) => createHmac('sha256', secret).update(`${p.orgId}.${p.paymentId}.${p.status}.${p.amountCents}`).digest('hex');

/**
 * Pagamentos (RF-PAG, RN-01, RN-11, RN-20, RN-21).
 *  - Dinheiro e TPA confirmam no momento e exigem caixa aberto.
 *  - Express, referência e transferência ficam pendentes até confirmação
 *    (webhook assinado do agregador ou confirmação manual por finanças).
 *  - Confirmar = movimento no livro razão + activar a subscrição + factura-recibo.
 *  - Idempotente pela chave do cliente (RNF-11).
 */
@Injectable()
export class PaymentsService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    @Inject(ENV) private readonly env: Env,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly outbox: OutboxService,
    private readonly settings: SettingsService,
    private readonly cash: CashService,
    private readonly invoices: InvoicesService,
    private readonly members: MembersService,
  ) {}

  /** Limite de desconto do perfil (RN-20); o dono não tem limite. */
  private discountLimit(ctx: AuthCtx, s: { discountLimits: { rececao: number; gerente: number } }) {
    if (ctx.roles.includes('dono')) return 100;
    if (ctx.roles.includes('gerente')) return s.discountLimits.gerente;
    if (ctx.roles.includes('rececao') || ctx.roles.includes('financas')) return s.discountLimits.rececao;
    return 0;
  }

  async create(ctx: AuthCtx, input: { branchId: string; memberId?: string; subscriptionId?: string; method: PayMethod; amountCents: number; idempotencyKey: string; discountPct?: number; externalRef?: string; deviceAt?: Date }) {
    const isMemberSelf = !!ctx.memberId && ctx.memberId === input.memberId && !hasRole(ctx, 'rececao', 'financas', 'gerente');
    if (isMemberSelf && IMMEDIATE.includes(input.method)) throw forbidden('Pela app só pode pagar por Multicaixa Express ou referência.');
    if (!isMemberSelf && !hasRole(ctx, 'rececao', 'financas', 'gerente')) throw forbidden();
    if (!canSeeBranch(ctx, input.branchId) && !isMemberSelf) throw forbidden('Não pode cobrar nesta filial.');
    return this.database.withOrg(ctx, async (tx) => {
      const [existing] = await tx.select().from(payments).where(and(eq(payments.orgId, ctx.orgId), eq(payments.idempotencyKey, input.idempotencyKey)));
      if (existing) return this.view(tx, existing, true);

      let memberId = input.memberId ?? null;
      let description = 'Pagamento';
      if (input.subscriptionId) {
        const [sub] = await tx.select().from(subscriptions).where(eq(subscriptions.id, input.subscriptionId));
        if (!sub) throw notFound('Subscrição');
        if (memberId && sub.memberId !== memberId) throw new DomainError('SUBSCRICAO_DE_OUTRO_MEMBRO', 'Esta subscrição não é deste membro.');
        memberId = sub.memberId;
        if (sub.status !== 'pendente') throw new DomainError('SUBSCRICAO_NAO_PENDENTE', 'Esta subscrição já não está à espera de pagamento.', 409);
        const [plan] = await tx.select().from(plans).where(eq(plans.id, sub.planId));
        description = `${plan!.name} · ${plan!.periodDays} dias`;
        let price = sub.priceCents;
        if (input.discountPct && input.discountPct !== sub.discountPct) {
          const s = await this.settings.get(tx, ctx.orgId);
          const limit = Math.min(this.discountLimit(ctx, s), ctx.roles.includes('dono') ? 100 : plan!.maxDiscountPct);
          if (input.discountPct > limit) throw new DomainError('DESCONTO_ACIMA_DO_LIMITE', `O seu limite de desconto é ${limit}%. Peça aprovação para ${input.discountPct}%.`, 409, { limite: limit });
          price = await this.members.setDiscount(tx, sub.id, input.discountPct);
          await this.audit.record(tx, ctx, 'subscricao.desconto', 'subscription', sub.id, { pct: input.discountPct, priceCents: price });
        }
        if (input.amountCents !== price) throw new DomainError('VALOR_DIFERENTE', `O valor a pagar é ${kz(price)}.`, 400, { valorCentimos: price });
      }
      if (memberId) {
        const [m] = await tx.select({ id: members.id }).from(members).where(eq(members.id, memberId));
        if (!m) throw notFound('Membro');
      }

      const immediate = IMMEDIATE.includes(input.method);
      const shift = await this.cash.openShiftOf(tx, input.branchId);
      if (immediate && !shift) throw new DomainError('CAIXA_FECHADO', 'O caixa está fechado. Abra o caixa ou receba o turno para cobrar.', 409);
      const id = uuidv7();
      await tx.insert(payments).values({ id, orgId: ctx.orgId, branchId: input.branchId, memberId, subscriptionId: input.subscriptionId ?? null, shiftId: shift?.id ?? null, method: input.method, amountCents: input.amountCents, status: 'pendente', externalRef: input.externalRef ?? null, idempotencyKey: input.idempotencyKey, createdBy: ctx.userId });
      await this.audit.record(tx, ctx, 'pagamento.criado', 'payment', id, { method: input.method, amountCents: input.amountCents, subscriptionId: input.subscriptionId ?? null });
      let payment = (await tx.select().from(payments).where(eq(payments.id, id)))[0]!;
      if (immediate) payment = await this.confirmInTx(tx, ctx, payment, description);
      return this.view(tx, payment, false);
    });
  }

  /** Confirma: livro razão + activação + factura-recibo + SMS (RF-PAG-02, RF-FAC-01). */
  private async confirmInTx(tx: Tx, ctx: AuthCtx, p: Payment, description?: string): Promise<Payment> {
    if (p.status === 'confirmado') return p;
    if (p.status !== 'pendente') throw new DomainError('PAGAMENTO_NAO_PENDENTE', 'Este pagamento já não está pendente.', 409);
    const now = this.clock.now();
    const shift = await this.cash.openShiftOf(tx, p.branchId);
    await tx.update(payments).set({ status: 'confirmado', confirmedAt: now, shiftId: p.shiftId ?? shift?.id ?? null }).where(eq(payments.id, p.id));
    await this.cash.addMovement(tx, ctx, { branchId: p.branchId, shiftId: p.method === 'dinheiro' || p.method === 'tpa' ? (p.shiftId ?? shift?.id ?? null) : (shift?.id ?? null), kind: 'pagamento', method: p.method, amountCents: p.amountCents, originType: 'payment', originId: p.id });
    let desc = description;
    if (p.subscriptionId) {
      await this.members.activate(tx, p.subscriptionId, 'pagamento', p.id);
      if (!desc) {
        const [sub] = await tx.select().from(subscriptions).where(eq(subscriptions.id, p.subscriptionId));
        const [plan] = await tx.select().from(plans).where(eq(plans.id, sub!.planId));
        desc = `${plan!.name} · ${plan!.periodDays} dias`;
      }
    }
    const invoice = await this.invoices.issue(tx, ctx, { branchId: p.branchId, docType: 'FR', description: desc ?? 'Pagamento', totalCents: p.amountCents, memberId: p.memberId, paymentId: p.id });
    if (p.memberId) {
      const [m] = await tx.select({ phone: members.phone, name: members.name }).from(members).where(eq(members.id, p.memberId));
      if (m) await this.outbox.enqueue(tx, ctx.orgId, 'sms', m.phone, 'pagamento.confirmado', { nome: m.name, valor: kz(p.amountCents), factura: invoice.fullNumber }, `pagamento:${p.id}`);
    }
    await this.audit.record(tx, ctx, 'pagamento.confirmado', 'payment', p.id, { invoice: invoice.fullNumber });
    return (await tx.select().from(payments).where(eq(payments.id, p.id)))[0]!;
  }

  /** Confirmação manual (finanças/gerente) com referência do comprovativo. */
  async confirmManual(ctx: AuthCtx, id: string, externalRef: string) {
    if (!hasRole(ctx, 'financas', 'gerente')) throw forbidden('Só finanças ou gerência confirmam pagamentos electrónicos.');
    return this.database.withOrg(ctx, async (tx) => {
      const [p] = await tx.select().from(payments).where(eq(payments.id, id)).for('update');
      if (!p) throw notFound('Pagamento');
      if (p.externalRef !== externalRef) await tx.update(payments).set({ externalRef }).where(eq(payments.id, id));
      return this.view(tx, await this.confirmInTx(tx, ctx, { ...p, externalRef }), false);
    });
  }

  /** Webhook do agregador (Multicaixa Express, referências): assinado e idempotente (RNF-09). */
  async webhook(body: { orgId: string; paymentId: string; status: 'confirmado' | 'falhado'; amountCents: number; externalRef?: string }, signature: string) {
    const expected = Buffer.from(webhookSignature(this.env.WEBHOOK_SECRET, body), 'hex');
    const given = Buffer.from(signature || '', 'hex');
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) throw new DomainError('ASSINATURA_INVALIDA', 'Assinatura do webhook inválida.', 401);
    const system: AuthCtx = { orgId: body.orgId, userId: '00000000-0000-7000-8000-000000000000', roles: ['dono'], branchIds: null, memberId: null };
    return this.database.withOrg(system, async (tx) => {
      const [p] = await tx.select().from(payments).where(eq(payments.id, body.paymentId)).for('update');
      if (!p) throw notFound('Pagamento');
      if (p.amountCents !== body.amountCents) throw new DomainError('VALOR_DIFERENTE', 'O valor do webhook não corresponde ao pagamento.');
      if (p.status !== 'pendente') return { id: p.id, status: p.status, repetido: true };
      if (body.status === 'falhado') {
        await tx.update(payments).set({ status: 'falhado' }).where(eq(payments.id, p.id));
        await this.audit.record(tx, system, 'pagamento.falhado', 'payment', p.id, { externalRef: body.externalRef ?? null });
        return { id: p.id, status: 'falhado' };
      }
      if (body.externalRef) await tx.update(payments).set({ externalRef: body.externalRef }).where(eq(payments.id, p.id));
      const done = await this.confirmInTx(tx, system, p);
      return { id: done.id, status: done.status };
    });
  }

  /**
   * Estorno aprovado (RN-11, RN-21): movimento inverso ligado ao original e nota
   * de crédito ligada à factura-recibo. O movimento original não se altera.
   */
  async executeRefund(tx: Tx, approver: AuthCtx, req: { id: string; payload: Record<string, unknown>; reason: string; requestedBy: string }) {
    const [mov] = await tx.select().from(cashMovements).where(eq(cashMovements.id, String(req.payload.movementId)));
    if (!mov) throw notFound('Movimento');
    const [already] = await tx.select({ id: cashMovements.id }).from(cashMovements).where(eq(cashMovements.reversesId, mov.id));
    if (already) throw new DomainError('JA_ESTORNADO', 'Este movimento já foi estornado.', 409);
    const shift = await this.cash.openShiftOf(tx, mov.branchId);
    if (mov.method === 'dinheiro' && !shift) throw new DomainError('CAIXA_FECHADO', 'Abra o caixa para devolver o dinheiro.', 409);
    const id = await this.cash.addMovement(tx, { ...approver, userId: req.requestedBy }, { branchId: mov.branchId, shiftId: shift?.id ?? null, kind: 'estorno', method: mov.method, amountCents: -mov.amountCents, originType: mov.originType ?? undefined, originId: mov.originId ?? undefined, reversesId: mov.id, reason: req.reason, approvedBy: approver.userId });
    let creditNote: string | null = null;
    if (mov.kind === 'pagamento') {
      const fr = mov.originType === 'payment' && mov.originId ? await this.invoices.byPayment(tx, mov.originId) : null;
      if (fr) {
        const nc = await this.invoices.issue(tx, approver, { branchId: mov.branchId, docType: 'NC', description: `Anulação de ${fr.fullNumber}`, totalCents: fr.totalCents, memberId: fr.memberId, paymentId: fr.paymentId, referencesId: fr.id, reason: req.reason });
        creditNote = nc.fullNumber;
      }
    }
    return { movementId: id, creditNote };
  }

  async validateRefund(tx: Tx, payload: Record<string, unknown>) {
    if (typeof payload.movementId !== 'string') throw new DomainError('DADOS_INVALIDOS', 'Indique o movimento a estornar.');
    const [mov] = await tx.select().from(cashMovements).where(eq(cashMovements.id, payload.movementId));
    if (!mov) throw notFound('Movimento');
    if (mov.kind === 'estorno' || mov.amountCents <= 0) throw new DomainError('NAO_ESTORNAVEL', 'Só se estornam entradas de dinheiro.');
    const [already] = await tx.select({ id: cashMovements.id }).from(cashMovements).where(eq(cashMovements.reversesId, mov.id));
    if (already) throw new DomainError('JA_ESTORNADO', 'Este movimento já foi estornado.', 409);
    return mov;
  }

  private async view(tx: Tx, p: Payment, repeated: boolean) {
    const invoice = p.status === 'confirmado' ? await this.invoices.byPayment(tx, p.id) : null;
    return { ...p, factura: invoice ? { id: invoice.id, numero: invoice.fullNumber } : null, repetido: repeated };
  }

  list(ctx: AuthCtx, branchId: string) {
    if (!hasRole(ctx, 'financas', 'gerente', 'rececao')) throw forbidden();
    return this.database.withOrg(ctx, (tx) => tx.select().from(payments).where(eq(payments.branchId, branchId)).orderBy(desc(payments.createdAt)).limit(200));
  }
}
