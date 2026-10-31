import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { AuthService } from '../auth/auth.service.js';
import { hasRole, type AuthCtx } from '../auth/context.js';
import { Clock } from '../common/clock.js';
import { DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { kz } from '../common/money.js';
import { AuditService } from '../core/audit.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { SettingsService, type Settings } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { approvalRequests, type ApprovalKind, type ApproverRole } from '../db/schema.js';

export type ApprovalRequest = typeof approvalRequests.$inferSelect;

/** O que cada tipo de pedido precisa: quem aprova, validação ao pedir e efeito ao aprovar. */
export type ApprovalHandler = {
  requiredRole: (req: { payload: Record<string, unknown>; amountCents: number | null }, s: Settings) => ApproverRole;
  validate?: (tx: Tx, ctx: AuthCtx, payload: Record<string, unknown>) => Promise<void>;
  execute: (tx: Tx, approver: AuthCtx, req: ApprovalRequest) => Promise<unknown>;
};

const EXPIRED = Symbol('expirado');
const RANK: Record<ApproverRole, number> = { gerente: 1, financas: 1, dono: 2 };

/** Pode este utilizador decidir pedidos que exigem este perfil? */
export function canDecide(ctx: AuthCtx, required: ApproverRole) {
  if (ctx.roles.includes('dono')) return true;
  if (RANK[required] >= RANK.dono) return false;
  return ctx.roles.includes(required);
}

/**
 * Pedidos de aprovação (RF-APR, RN-24, RN-40, RN-41). Os módulos registam os seus
 * tipos (estorno, desconto, despesa…) para evitar dependências circulares.
 */
@Injectable()
export class ApprovalsService {
  private readonly handlers = new Map<ApprovalKind, ApprovalHandler>();

  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly outbox: OutboxService,
    private readonly settings: SettingsService,
    private readonly auth: AuthService,
  ) {}

  register(kind: ApprovalKind, handler: ApprovalHandler) {
    this.handlers.set(kind, handler);
  }

  private handler(kind: ApprovalKind) {
    const h = this.handlers.get(kind);
    if (!h) throw new DomainError('TIPO_DE_PEDIDO_INVALIDO', 'Este tipo de pedido não existe.');
    return h;
  }

  /** Cria o pedido dentro de uma transacção já aberta (usado por outros módulos). */
  async requestInTx(tx: Tx, ctx: AuthCtx, input: { kind: ApprovalKind; branchId?: string | null; payload: Record<string, unknown>; amountCents?: number | null; reason: string }) {
    const h = this.handler(input.kind);
    if (input.reason.trim().length < 5) throw new DomainError('MOTIVO_EM_FALTA', 'Escreva o motivo do pedido (pelo menos 5 caracteres).');
    await h.validate?.(tx, ctx, input.payload);
    const s = await this.settings.get(tx, ctx.orgId);
    // O valor validado pelo módulo (ex.: o do movimento a estornar) prevalece sobre o que o cliente enviou.
    const amountCents = typeof input.payload.amountCents === 'number' ? input.payload.amountCents : (input.amountCents ?? null);
    const requiredRole = h.requiredRole({ payload: input.payload, amountCents }, s);
    const id = uuidv7();
    const expiresAt = new Date(this.clock.now().getTime() + s.approvalTtlHours * 3_600_000);
    await tx.insert(approvalRequests).values({ id, orgId: ctx.orgId, branchId: input.branchId ?? null, kind: input.kind, payload: input.payload, amountCents, reason: input.reason.trim(), requiredRole, status: 'pendente', requestedBy: ctx.userId, expiresAt });
    await this.outbox.enqueue(tx, ctx.orgId, 'push', `perfil:${requiredRole}`, 'aprovacao.pedido', { id, kind: input.kind, valor: amountCents === null ? null : kz(amountCents), motivo: input.reason });
    await this.audit.record(tx, ctx, 'aprovacao.pedida', 'approval', id, { kind: input.kind, amountCents, requiredRole });
    return (await tx.select().from(approvalRequests).where(eq(approvalRequests.id, id)))[0]!;
  }

  request(ctx: AuthCtx, input: Parameters<ApprovalsService['requestInTx']>[2]) {
    return this.database.withOrg(ctx, (tx) => this.requestInTx(tx, ctx, input));
  }

  /** Pedidos pendentes que este utilizador pode decidir, e os que ele próprio fez. */
  list(ctx: AuthCtx, status: 'pendente' | 'todos' = 'pendente') {
    return this.database.withOrg(ctx, async (tx) => {
      const rows = await tx
        .select()
        .from(approvalRequests)
        .where(and(eq(approvalRequests.orgId, ctx.orgId), status === 'pendente' ? eq(approvalRequests.status, 'pendente') : undefined))
        .orderBy(desc(approvalRequests.createdAt))
        .limit(100);
      return rows.filter((r) => r.requestedBy === ctx.userId || canDecide(ctx, r.requiredRole)).map((r) => ({ ...r, podeDecidir: r.status === 'pendente' && r.requestedBy !== ctx.userId && canDecide(ctx, r.requiredRole) }));
    });
  }

  /** Aprovar ou recusar, com confirmação da senha (RNF-05). Ninguém aprova o próprio pedido (RN-40). */
  async decide(ctx: AuthCtx, id: string, input: { approve: boolean; password: string; reason?: string }) {
    if (!hasRole(ctx, 'gerente', 'financas')) throw forbidden('Só gestores, finanças ou o dono decidem pedidos.');
    await this.auth.confirmPassword(ctx.userId, input.password);
    const out = await this.database.withOrg(ctx, async (tx) => {
      const [req] = await tx.select().from(approvalRequests).where(eq(approvalRequests.id, id)).for('update');
      if (!req) throw notFound('Pedido');
      if (req.status !== 'pendente') throw new DomainError('PEDIDO_JA_DECIDIDO', 'Este pedido já foi decidido.', 409);
      const now = this.clock.now();
      if (req.expiresAt <= now) {
        // Grava o "expirado" (a transacção confirma) e só depois responde com o erro.
        await tx.update(approvalRequests).set({ status: 'expirado' }).where(eq(approvalRequests.id, id));
        return EXPIRED;
      }
      if (req.requestedBy === ctx.userId) throw forbidden('Não pode decidir o seu próprio pedido.');
      if (!canDecide(ctx, req.requiredRole)) throw forbidden(req.requiredRole === 'dono' ? 'Só o dono pode decidir este pedido.' : 'Este pedido está acima do seu limite.');
      if (!input.approve && (input.reason ?? '').trim().length < 3) throw new DomainError('MOTIVO_EM_FALTA', 'Diga porque recusa.');
      let result: unknown = null;
      if (input.approve) result = await this.handler(req.kind).execute(tx, ctx, req);
      await tx
        .update(approvalRequests)
        .set({ status: input.approve ? 'aprovado' : 'recusado', decidedBy: ctx.userId, decidedAt: now, decisionReason: input.reason?.trim() ?? null })
        .where(eq(approvalRequests.id, id));
      await this.outbox.enqueue(tx, ctx.orgId, 'push', `utilizador:${req.requestedBy}`, input.approve ? 'aprovacao.aprovada' : 'aprovacao.recusada', { id, kind: req.kind });
      await this.audit.record(tx, ctx, input.approve ? 'aprovacao.aprovada' : 'aprovacao.recusada', 'approval', id, { kind: req.kind, result }, { status: 'pendente' });
      return { id, status: input.approve ? 'aprovado' : 'recusado', result };
    });
    if (out === EXPIRED) throw new DomainError('PEDIDO_EXPIRADO', 'O pedido expirou. Peça de novo.', 409);
    return out;
  }

  /** Pedidos do mesmo tipo e alvo ainda pendentes (evita duplicados). */
  async pendingFor(tx: Tx, kind: ApprovalKind, key: string, value: string) {
    const rows = await tx.select().from(approvalRequests).where(and(eq(approvalRequests.kind, kind), eq(approvalRequests.status, 'pendente')));
    return rows.filter((r) => r.payload[key] === value);
  }
}

