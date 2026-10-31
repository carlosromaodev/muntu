import { Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, inArray, sql } from 'drizzle-orm';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { Clock } from '../common/clock.js';
import { conflict, DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { AuditService } from '../core/audit.service.js';
import { CountersService } from '../core/counters.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { members, staff, taskEvents, tasks, users, type TaskKind } from '../db/schema.js';

export type Task = typeof tasks.$inferSelect;
export type TaskInput = { branchId: string; kind: TaskKind; title: string; detail?: string | null; memberId?: string | null; dueOn?: string | null; ownerUserId?: string; originType?: string; originId?: string };

/**
 * Pendências (RF-PEN-01/02, RN-54, RN-64).
 * Uma pendência tem sempre um responsável. Passa de turno em turno até alguém a
 * resolver; quem recebe o turno passa a ser o responsável. O histórico vive em
 * task_events, que só aceita INSERT.
 */
@Injectable()
export class TasksService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly counters: CountersService,
    private readonly outbox: OutboxService,
  ) {}

  private async event(tx: Tx, ctx: Pick<AuthCtx, 'orgId' | 'userId'>, taskId: string, kind: (typeof taskEvents.$inferInsert)['kind'], extra: { note?: string | null; fromUser?: string | null; toUser?: string | null } = {}) {
    await tx.insert(taskEvents).values({ id: uuidv7(), orgId: ctx.orgId, taskId, kind, note: extra.note ?? null, fromUser: extra.fromUser ?? null, toUser: extra.toUser ?? null, byUser: ctx.userId });
  }

  /**
   * Cria uma pendência dentro de uma transacção já aberta (usado por outros módulos).
   * Se já houver uma pendência aberta com a mesma origem, devolve essa.
   */
  async createInTx(tx: Tx, ctx: Pick<AuthCtx, 'orgId' | 'userId'>, input: TaskInput): Promise<Task> {
    if (input.originId) {
      const [same] = await tx.select().from(tasks).where(and(eq(tasks.originType, input.originType ?? ''), eq(tasks.originId, input.originId), eq(tasks.status, 'aberta')));
      if (same) return same;
    }
    const number = await this.counters.next(tx, ctx.orgId, 'pendencia', 1);
    const id = uuidv7();
    const owner = input.ownerUserId ?? ctx.userId;
    await tx.insert(tasks).values({ id, orgId: ctx.orgId, branchId: input.branchId, number, kind: input.kind, title: input.title.trim(), detail: input.detail?.trim() || null, memberId: input.memberId ?? null, originType: input.originType ?? null, originId: input.originId ?? null, ownerUserId: owner, dueOn: input.dueOn ?? null, status: 'aberta', createdBy: ctx.userId });
    await this.event(tx, ctx, id, 'criada', { toUser: owner });
    if (owner !== ctx.userId) await this.outbox.enqueue(tx, ctx.orgId, 'push', `utilizador:${owner}`, 'pendencia.atribuida', { id, titulo: input.title.trim() });
    return (await tx.select().from(tasks).where(eq(tasks.id, id)))[0]!;
  }

  /** Fecha a pendência aberta de uma origem (ex.: a ocorrência foi resolvida). */
  async resolveByOrigin(tx: Tx, ctx: Pick<AuthCtx, 'orgId' | 'userId'>, originType: string, originId: string, resolution: string) {
    const [t] = await tx.select().from(tasks).where(and(eq(tasks.originType, originType), eq(tasks.originId, originId), eq(tasks.status, 'aberta')));
    if (!t) return null;
    await tx.update(tasks).set({ status: 'resolvida', resolvedBy: ctx.userId, resolvedAt: this.clock.now(), resolution }).where(eq(tasks.id, t.id));
    await this.event(tx, ctx, t.id, 'resolvida', { note: resolution });
    return t.id;
  }

  /**
   * RN-54 · na passagem de turno, as pendências abertas da filial que estavam com
   * quem entregou passam para quem recebeu. Devolve quantas passaram.
   */
  async handOver(tx: Tx, ctx: Pick<AuthCtx, 'orgId' | 'userId'>, branchId: string, fromUserId: string): Promise<number> {
    const list = await tx.select({ id: tasks.id }).from(tasks).where(and(eq(tasks.branchId, branchId), eq(tasks.ownerUserId, fromUserId), eq(tasks.status, 'aberta')));
    if (!list.length) return 0;
    await tx
      .update(tasks)
      .set({ ownerUserId: ctx.userId, shiftsPassed: sql`${tasks.shiftsPassed} + 1` })
      .where(inArray(tasks.id, list.map((t) => t.id)));
    for (const t of list) await this.event(tx, ctx, t.id, 'passou_turno', { fromUser: fromUserId, toUser: ctx.userId });
    return list.length;
  }

  /** Pendências abertas de uma filial (para o resumo do turno). */
  async openForBranch(tx: Tx, branchId: string) {
    return tx.select().from(tasks).where(and(eq(tasks.branchId, branchId), eq(tasks.status, 'aberta'))).orderBy(asc(tasks.createdAt));
  }

  // ------------------------------------------------------------------ HTTP

  async create(ctx: AuthCtx, input: TaskInput) {
    if (!canSeeBranch(ctx, input.branchId)) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      if (input.ownerUserId && input.ownerUserId !== ctx.userId) await this.assertStaffOfBranch(tx, input.ownerUserId, input.branchId);
      if (input.memberId) {
        const [m] = await tx.select({ id: members.id }).from(members).where(eq(members.id, input.memberId));
        if (!m) throw notFound('Membro');
      }
      const t = await this.createInTx(tx, ctx, input);
      await this.audit.record(tx, ctx, 'pendencia.criada', 'task', t.id, { kind: t.kind, title: t.title, owner: t.ownerUserId });
      return t;
    });
  }

  list(ctx: AuthCtx, q: { branchId?: string; status?: 'aberta' | 'resolvida' | 'cancelada'; mine?: boolean; kind?: TaskKind }) {
    if (q.branchId && !canSeeBranch(ctx, q.branchId)) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const rows = await tx
        .select({ task: tasks, owner: users.name, member: members.name })
        .from(tasks)
        .leftJoin(users, eq(users.id, tasks.ownerUserId))
        .leftJoin(members, eq(members.id, tasks.memberId))
        .where(and(q.branchId ? eq(tasks.branchId, q.branchId) : undefined, eq(tasks.status, q.status ?? 'aberta'), q.mine ? eq(tasks.ownerUserId, ctx.userId) : undefined, q.kind ? eq(tasks.kind, q.kind) : undefined))
        .orderBy(q.status && q.status !== 'aberta' ? desc(tasks.resolvedAt) : asc(tasks.createdAt))
        .limit(300);
      return rows.filter((r) => canSeeBranch(ctx, r.task.branchId)).map((r) => ({ ...r.task, responsavel: r.owner, membro: r.member }));
    });
  }

  get(ctx: AuthCtx, id: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const t = await this.load(tx, ctx, id);
      const history = await tx.select({ event: taskEvents, by: users.name }).from(taskEvents).leftJoin(users, eq(users.id, taskEvents.byUser)).where(eq(taskEvents.taskId, id)).orderBy(asc(taskEvents.createdAt), asc(taskEvents.id));
      return { ...t, historico: history.map((h) => ({ ...h.event, por: h.by })) };
    });
  }

  note(ctx: AuthCtx, id: string, note: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const t = await this.load(tx, ctx, id);
      if (t.status !== 'aberta') throw conflict('PENDENCIA_FECHADA', 'Esta pendência já está fechada.');
      await this.event(tx, ctx, id, 'nota', { note: note.trim() });
      return { ok: true };
    });
  }

  /** Passar a outra pessoa da equipa (com nota). */
  transfer(ctx: AuthCtx, id: string, toUserId: string, note?: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const t = await this.load(tx, ctx, id);
      if (t.status !== 'aberta') throw conflict('PENDENCIA_FECHADA', 'Esta pendência já está fechada.');
      if (t.ownerUserId !== ctx.userId && !hasRole(ctx, 'gerente')) throw forbidden('Só o responsável ou o gerente podem passar esta pendência.');
      if (toUserId === t.ownerUserId) throw new DomainError('MESMO_RESPONSAVEL', 'Essa pessoa já é a responsável.');
      await this.assertStaffOfBranch(tx, toUserId, t.branchId);
      await tx.update(tasks).set({ ownerUserId: toUserId }).where(eq(tasks.id, id));
      await this.event(tx, ctx, id, 'transferida', { fromUser: t.ownerUserId, toUser: toUserId, note: note?.trim() || null });
      await this.outbox.enqueue(tx, ctx.orgId, 'push', `utilizador:${toUserId}`, 'pendencia.atribuida', { id, titulo: t.title });
      await this.audit.record(tx, ctx, 'pendencia.transferida', 'task', id, { owner: toUserId }, { owner: t.ownerUserId });
      return { id, responsavel: toUserId };
    });
  }

  resolve(ctx: AuthCtx, id: string, resolution: string, cancel = false) {
    return this.database.withOrg(ctx, async (tx) => {
      const t = await this.load(tx, ctx, id);
      if (t.status !== 'aberta') throw conflict('PENDENCIA_FECHADA', 'Esta pendência já está fechada.');
      if (cancel && !hasRole(ctx, 'gerente')) throw forbidden('Só o gerente ou o dono podem cancelar uma pendência.');
      const status = cancel ? 'cancelada' : 'resolvida';
      await tx.update(tasks).set({ status, resolvedBy: ctx.userId, resolvedAt: this.clock.now(), resolution: resolution.trim() }).where(eq(tasks.id, id));
      await this.event(tx, ctx, id, status, { note: resolution.trim() });
      await this.audit.record(tx, ctx, `pendencia.${status}`, 'task', id, { status, resolution: resolution.trim() }, { status: 'aberta' });
      return { id, status };
    });
  }

  reopen(ctx: AuthCtx, id: string, note: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const t = await this.load(tx, ctx, id);
      if (t.status === 'aberta') return { id, status: 'aberta' };
      await tx.update(tasks).set({ status: 'aberta', ownerUserId: ctx.userId, resolvedBy: null, resolvedAt: null, resolution: null }).where(eq(tasks.id, id));
      await this.event(tx, ctx, id, 'reaberta', { note: note.trim(), toUser: ctx.userId });
      await this.audit.record(tx, ctx, 'pendencia.reaberta', 'task', id, { status: 'aberta' }, { status: t.status });
      return { id, status: 'aberta' };
    });
  }

  private async load(tx: Tx, ctx: AuthCtx, id: string) {
    const [t] = await tx.select().from(tasks).where(eq(tasks.id, id));
    if (!t) throw notFound('Pendência');
    if (!canSeeBranch(ctx, t.branchId)) throw forbidden();
    return t;
  }

  private async assertStaffOfBranch(tx: Tx, userId: string, branchId: string) {
    const rows = await tx.select().from(staff).where(and(eq(staff.userId, userId), eq(staff.active, true)));
    const ok = rows.some((r) => r.role !== 'vigilante' && (r.role === 'dono' || r.branchIds === null || r.branchIds.includes(branchId)));
    if (!ok) throw new DomainError('RESPONSAVEL_INVALIDO', 'Essa pessoa não trabalha nesta filial.');
  }
}
