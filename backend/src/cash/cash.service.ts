import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, sql } from 'drizzle-orm';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { AuthService } from '../auth/auth.service.js';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { Clock } from '../common/clock.js';
import { conflict, DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { countTotal, kz } from '../common/money.js';
import { AuditService } from '../core/audit.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { SettingsService } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { cashMovements, shiftCounts, shifts, type MovementKind, type PayMethod, type ShiftKind } from '../db/schema.js';

export type Shift = typeof shifts.$inferSelect;
type CountInput = { quantities: Record<string, number>; looseCents: number; decision?: 'ressalva' | 'revisao'; justification?: string };

/**
 * Caixa por turno (RF-CAI, RF-TUR, RN-11 a RN-19, RN-50 a RN-55).
 * O livro razão (cash_movements) só aceita INSERT; o esperado em dinheiro é
 * sempre a soma dos movimentos em dinheiro do turno.
 */
@Injectable()
export class CashService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly outbox: OutboxService,
    private readonly settings: SettingsService,
    private readonly approvals: ApprovalsService,
    private readonly auth: AuthService,
  ) {}

  async openShiftOf(tx: Tx, branchId: string): Promise<Shift | null> {
    return (await tx.select().from(shifts).where(and(eq(shifts.branchId, branchId), eq(shifts.status, 'aberto'))))[0] ?? null;
  }

  async addMovement(tx: Tx, ctx: AuthCtx, m: { branchId: string; shiftId: string | null; kind: MovementKind; method: PayMethod; amountCents: number; originType?: string; originId?: string; reversesId?: string; reason?: string; receiptUrl?: string; approvedBy?: string; deviceAt?: Date }) {
    const id = uuidv7();
    await tx.insert(cashMovements).values({ id, orgId: ctx.orgId, branchId: m.branchId, shiftId: m.shiftId, kind: m.kind, method: m.method, amountCents: m.amountCents, originType: m.originType ?? null, originId: m.originId ?? null, reversesId: m.reversesId ?? null, reason: m.reason ?? null, receiptUrl: m.receiptUrl ?? null, createdBy: ctx.userId, approvedBy: m.approvedBy ?? null, deviceAt: m.deviceAt ?? null });
    return id;
  }

  /** Esperado em dinheiro = fundo + entradas em dinheiro − saídas (RN-13). */
  async expectedCash(tx: Tx, shiftId: string): Promise<number> {
    const [r] = await tx
      .select({ total: sql<string>`coalesce(sum(${cashMovements.amountCents}), 0)` })
      .from(cashMovements)
      .where(and(eq(cashMovements.shiftId, shiftId), eq(cashMovements.method, 'dinheiro')));
    return Number(r?.total ?? 0);
  }

  /** RF-CAI-02 · abrir caixa com fundo de troco. Um só caixa aberto por filial. */
  async open(ctx: AuthCtx, input: { branchId: string; kind: ShiftKind; openingFloatCents: number }) {
    if (!canSeeBranch(ctx, input.branchId)) throw forbidden('Não pode abrir o caixa desta filial.');
    return this.database.withOrg(ctx, async (tx) => {
      if (await this.openShiftOf(tx, input.branchId)) throw conflict('CAIXA_JA_ABERTO', 'Já há um caixa aberto nesta filial. Receba o turno em vez de abrir outro.');
      const shift = await this.insertShift(tx, ctx, input.branchId, input.kind, input.openingFloatCents, null);
      await this.audit.record(tx, ctx, 'caixa.aberto', 'shift', shift.id, { branchId: input.branchId, kind: input.kind, openingFloatCents: input.openingFloatCents });
      return shift;
    });
  }

  private async insertShift(tx: Tx, ctx: AuthCtx, branchId: string, kind: ShiftKind, floatCents: number, previousShiftId: string | null) {
    const id = uuidv7();
    await tx.insert(shifts).values({ id, orgId: ctx.orgId, branchId, kind, status: 'aberto', openedBy: ctx.userId, openingFloatCents: floatCents, previousShiftId });
    if (floatCents > 0) await this.addMovement(tx, ctx, { branchId, shiftId: id, kind: 'abertura', method: 'dinheiro', amountCents: floatCents, originType: 'shift', originId: id, reason: previousShiftId ? 'Dinheiro recebido do turno anterior' : 'Fundo de troco' });
    return (await tx.select().from(shifts).where(eq(shifts.id, id)))[0]!;
  }

  /** Turno aberto de uma filial. O esperado só aparece a quem não está a contar (fecho cego). */
  async current(ctx: AuthCtx, branchId: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const shift = await this.openShiftOf(tx, branchId);
      if (!shift) return null;
      const movements = await tx.select().from(cashMovements).where(eq(cashMovements.shiftId, shift.id)).orderBy(desc(cashMovements.createdAt));
      const showExpected = hasRole(ctx, 'gerente', 'financas');
      return { ...shift, movements, ...(showExpected ? { expectedCashCents: await this.expectedCash(tx, shift.id) } : {}) };
    });
  }

  /** RF-CAI-03/04 · sangria, reforço ou despesa. Despesas acima do limite pedem aprovação (RN-22). */
  async movement(ctx: AuthCtx, shiftId: string, input: { kind: 'sangria' | 'reforco' | 'despesa'; amountCents: number; reason: string; receiptUrl?: string }) {
    return this.database.withOrg(ctx, async (tx) => {
      const [shift] = await tx.select().from(shifts).where(eq(shifts.id, shiftId));
      if (!shift) throw notFound('Turno');
      if (!canSeeBranch(ctx, shift.branchId)) throw forbidden();
      if (shift.status !== 'aberto') throw new DomainError('CAIXA_FECHADO', 'Este caixa já está fechado.', 409);
      if (input.amountCents <= 0) throw new DomainError('VALOR_INVALIDO', 'O valor tem de ser maior que zero.');
      if (input.kind === 'sangria' && input.amountCents > (await this.expectedCash(tx, shiftId))) throw new DomainError('SEM_DINHEIRO', 'Não há esse dinheiro no caixa.');
      const s = await this.settings.get(tx, ctx.orgId);
      if (input.kind === 'despesa') {
        if (input.amountCents > s.expenseReceiptAboveCents && !input.receiptUrl) throw new DomainError('COMPROVATIVO_EM_FALTA', `Despesas acima de ${kz(s.expenseReceiptAboveCents)} precisam da foto do comprovativo.`);
        const canDirect = ctx.roles.includes('dono') || (ctx.roles.includes('financas') && input.amountCents <= s.expenseLimitFinancasCents);
        if (!canDirect) {
          const req = await this.approvals.requestInTx(tx, ctx, { kind: 'despesa', branchId: shift.branchId, payload: { shiftId, amountCents: input.amountCents, reason: input.reason, receiptUrl: input.receiptUrl ?? null }, amountCents: input.amountCents, reason: input.reason });
          return { registado: false, aprovacao: req };
        }
      }
      const sign = input.kind === 'reforco' ? 1 : -1;
      const id = await this.addMovement(tx, ctx, { branchId: shift.branchId, shiftId, kind: input.kind, method: 'dinheiro', amountCents: sign * input.amountCents, originType: 'shift', originId: shiftId, reason: input.reason, receiptUrl: input.receiptUrl });
      await this.audit.record(tx, ctx, `caixa.${input.kind}`, 'cash_movement', id, { shiftId, amountCents: input.amountCents, reason: input.reason });
      return { registado: true, id };
    });
  }

  /** Executa uma despesa aprovada (chamado pelas aprovações). */
  async executeExpense(tx: Tx, approver: AuthCtx, req: { payload: Record<string, unknown>; requestedBy: string; id: string }) {
    const shiftId = String(req.payload.shiftId);
    const [shift] = await tx.select().from(shifts).where(eq(shifts.id, shiftId));
    if (!shift) throw notFound('Turno');
    // Se o caixa do pedido já fechou, a despesa entra no caixa aberto da filial.
    const target = shift.status === 'aberto' ? shift : await this.openShiftOf(tx, shift.branchId);
    if (!target) throw new DomainError('CAIXA_FECHADO', 'Não há caixa aberto para registar a despesa.', 409);
    const id = await this.addMovement(tx, { ...approver, userId: req.requestedBy }, { branchId: shift.branchId, shiftId: target.id, kind: 'despesa', method: 'dinheiro', amountCents: -Number(req.payload.amountCents), originType: 'approval', originId: req.id, reason: String(req.payload.reason), receiptUrl: (req.payload.receiptUrl as string | null) ?? undefined, approvedBy: approver.userId });
    return { movementId: id };
  }

  /**
   * RF-CAI-05 / RF-TUR-01 · contagem às cegas.
   * 1.ª submissão: grava a tentativa e revela a diferença.
   * Com diferença ≠ 0 é preciso decidir (ressalva ou revisão) e justificar (RN-14).
   * Fecho: fecha o caixa. Recepção: fecha o turno anterior e abre o novo com o
   * dinheiro contado; os dados do turno anterior não se alteram (RN-52).
   */
  async count(ctx: AuthCtx, shiftId: string, purpose: 'fecho' | 'recepcao', input: CountInput & { kind?: ShiftKind; password?: string; withoutColleague?: boolean; withoutColleagueReason?: string }) {
    const counted = countTotal(input.quantities, input.looseCents);
    // Assinatura da passagem de turno com a senha (RN-51); confirmada antes da transacção.
    const finalising = input.decision !== undefined;
    if (purpose === 'recepcao' && finalising) {
      if (!input.password) throw new DomainError('ASSINATURA_EM_FALTA', 'Confirme com a sua senha para assumir o turno.');
      await this.auth.confirmPassword(ctx.userId, input.password);
    }
    return this.database.withOrg(ctx, async (tx) => {
      const [shift] = await tx.select().from(shifts).where(eq(shifts.id, shiftId)).for('update');
      if (!shift) throw notFound('Turno');
      if (!canSeeBranch(ctx, shift.branchId)) throw forbidden();
      if (shift.status !== 'aberto') throw new DomainError('CAIXA_FECHADO', 'Este caixa já está fechado.', 409);
      if (purpose === 'recepcao' && shift.openedBy === ctx.userId) throw new DomainError('MESMA_PESSOA', 'Quem recebe o turno tem de ser outra pessoa.', 409);
      if (purpose === 'recepcao' && input.withoutColleague && (input.withoutColleagueReason ?? '').trim().length < 5) throw new DomainError('MOTIVO_EM_FALTA', 'Diga porque recebe sem o colega (pelo menos 5 caracteres).');
      const expected = await this.expectedCash(tx, shiftId);
      const diff = counted - expected;
      const base = { id: uuidv7(), orgId: ctx.orgId, shiftId, purpose, countedBy: ctx.userId, quantities: input.quantities, looseCents: input.looseCents, countedCents: counted, expectedCents: expected, differenceCents: diff, withoutColleague: !!input.withoutColleague };
      const reveal = { contadoCentimos: counted, esperadoCentimos: expected, diferencaCentimos: diff };

      if (diff !== 0 && !finalising) {
        await tx.insert(shiftCounts).values({ ...base, decision: null, justification: null });
        await this.audit.record(tx, ctx, 'caixa.contagem', 'shift', shiftId, { purpose, ...reveal });
        return { fechado: false, precisaDecisao: true, ...reveal };
      }
      if (diff !== 0 && (input.justification ?? '').trim().length < 5) throw new DomainError('JUSTIFICACAO_EM_FALTA', 'Escreva uma justificação curta para a diferença.');
      const decision = diff === 0 ? 'sem_diferenca' : input.decision!;
      await tx.insert(shiftCounts).values({ ...base, decision, justification: diff === 0 ? null : input.justification!.trim() });
      const now = this.clock.now();
      await tx.update(shifts).set({ status: 'fechado', closedBy: ctx.userId, closedAt: now }).where(eq(shifts.id, shiftId));
      if (diff !== 0) await this.outbox.enqueue(tx, ctx.orgId, 'push', 'perfil:dono', decision === 'revisao' ? 'caixa.revisao' : 'caixa.diferenca', { shiftId, diferenca: kz(diff), justificacao: input.justification });
      if (input.withoutColleague) await this.outbox.enqueue(tx, ctx.orgId, 'push', 'perfil:gerente', 'turno.sem_colega', { shiftId, motivo: input.withoutColleagueReason });
      await this.audit.record(tx, ctx, purpose === 'fecho' ? 'caixa.fechado' : 'turno.recebido', 'shift', shiftId, { decision, ...reveal, justification: input.justification ?? null });
      let next: Shift | null = null;
      if (purpose === 'recepcao') next = await this.insertShift(tx, ctx, shift.branchId, input.kind ?? 'tarde', counted, shift.id);
      return { fechado: true, decisao: decision, ...reveal, novoTurno: next };
    });
  }

  /** Reabrir um caixa fechado (só por aprovação do dono, RN-17). */
  async reopen(tx: Tx, approver: AuthCtx, shiftId: string) {
    const [shift] = await tx.select().from(shifts).where(eq(shifts.id, shiftId));
    if (!shift) throw notFound('Turno');
    if (shift.status === 'aberto') return shift;
    if (await this.openShiftOf(tx, shift.branchId)) throw conflict('CAIXA_JA_ABERTO', 'Há outro caixa aberto nesta filial. Feche-o antes de reabrir este.');
    await tx.update(shifts).set({ status: 'aberto', closedBy: null, closedAt: null }).where(eq(shifts.id, shiftId));
    await this.audit.record(tx, approver, 'caixa.reaberto', 'shift', shiftId, { status: 'aberto' }, { status: 'fechado' });
    return { ...shift, status: 'aberto' as const };
  }

  /** RF-CAI-08 · histórico de turnos com a contagem final. */
  history(ctx: AuthCtx, branchId: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const list = await tx.select().from(shifts).where(eq(shifts.branchId, branchId)).orderBy(desc(shifts.openedAt)).limit(60);
      const counts = await tx.select().from(shiftCounts).where(eq(shiftCounts.orgId, ctx.orgId));
      return list.map((s) => ({ ...s, contagem: counts.filter((c) => c.shiftId === s.id && c.decision !== null).at(-1) ?? null }));
    });
  }
}
