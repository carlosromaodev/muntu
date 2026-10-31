import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, inArray } from 'drizzle-orm';
import { canSeeBranch, type AuthCtx } from '../auth/context.js';
import { forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { AuditService } from '../core/audit.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { DATABASE, type Database } from '../db/database.js';
import { noticeReads, staff, staffNotices, users } from '../db/schema.js';

export const AUDIENCES = ['todos', 'rececao', 'financas', 'pt', 'gerente', 'vigilante'] as const;
export type Audience = (typeof AUDIENCES)[number];

/** Avisos internos à equipa, com confirmação de leitura (RF-AVI-01). */
@Injectable()
export class NoticesService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly audit: AuditService,
    private readonly outbox: OutboxService,
  ) {}

  /** O aviso é para mim? (público e filial) */
  private isFor(ctx: AuthCtx, n: { audience: string[]; branchId: string | null; createdBy: string }) {
    if (n.createdBy === ctx.userId || ctx.roles.includes('dono')) return true;
    if (n.branchId && !canSeeBranch(ctx, n.branchId)) return false;
    return n.audience.includes('todos') || n.audience.some((a) => ctx.roles.includes(a as never));
  }

  async create(ctx: AuthCtx, input: { body: string; priority: 'urgente' | 'normal'; audience: Audience[]; branchId?: string | null }) {
    if (input.branchId && !canSeeBranch(ctx, input.branchId)) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const id = uuidv7();
      const audience = input.audience.includes('todos') ? ['todos'] : [...new Set(input.audience)];
      await tx.insert(staffNotices).values({ id, orgId: ctx.orgId, branchId: input.branchId ?? null, audience, priority: input.priority, body: input.body.trim(), createdBy: ctx.userId });
      const roles = audience.includes('todos') ? ['rececao', 'financas', 'pt', 'gerente', 'vigilante'] : audience;
      for (const r of roles) await this.outbox.enqueue(tx, ctx.orgId, 'push', input.branchId ? `filial:${input.branchId}:${r}` : `perfil:${r}`, input.priority === 'urgente' ? 'aviso.urgente' : 'aviso.novo', { id, texto: input.body.trim().slice(0, 140) }, `aviso:${id}:${r}`);
      await this.audit.record(tx, ctx, 'aviso.enviado', 'staff_notice', id, { audience, priority: input.priority, branchId: input.branchId ?? null });
      return { id, audience, priority: input.priority };
    });
  }

  /** Avisos para quem pede, do mais recente, com "lido" e, para quem enviou, quantos leram. */
  list(ctx: AuthCtx, opts: { unread?: boolean }) {
    return this.database.withOrg(ctx, async (tx) => {
      const rows = await tx.select({ n: staffNotices, author: users.name }).from(staffNotices).leftJoin(users, eq(users.id, staffNotices.createdBy)).orderBy(desc(staffNotices.createdAt)).limit(200);
      const mine = rows.filter((r) => this.isFor(ctx, r.n));
      if (!mine.length) return [];
      const reads = await tx.select().from(noticeReads).where(inArray(noticeReads.noticeId, mine.map((r) => r.n.id)));
      return mine
        .map((r) => {
          const rs = reads.filter((x) => x.noticeId === r.n.id);
          const own = rs.find((x) => x.userId === ctx.userId);
          return { ...r.n, autor: r.author, lido: !!own || r.n.createdBy === ctx.userId, lidoEm: own?.readAt ?? null, ...(r.n.createdBy === ctx.userId || ctx.roles.includes('dono') ? { leituras: rs.length } : {}) };
        })
        .filter((r) => !opts.unread || !r.lido);
    });
  }

  markRead(ctx: AuthCtx, id: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const [n] = await tx.select().from(staffNotices).where(eq(staffNotices.id, id));
      if (!n || !this.isFor(ctx, n)) throw notFound('Aviso');
      await tx.insert(noticeReads).values({ orgId: ctx.orgId, noticeId: id, userId: ctx.userId }).onConflictDoNothing();
      return { id, lido: true };
    });
  }

  markAllRead(ctx: AuthCtx) {
    return this.database.withOrg(ctx, async (tx) => {
      const rows = await tx.select().from(staffNotices).orderBy(desc(staffNotices.createdAt)).limit(200);
      const mine = rows.filter((n) => this.isFor(ctx, n) && n.createdBy !== ctx.userId);
      for (const n of mine) await tx.insert(noticeReads).values({ orgId: ctx.orgId, noticeId: n.id, userId: ctx.userId }).onConflictDoNothing();
      return { lidos: mine.length };
    });
  }

  /** Quem leu e quem falta ler (para quem enviou e para o dono). */
  reads(ctx: AuthCtx, id: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const [n] = await tx.select().from(staffNotices).where(eq(staffNotices.id, id));
      if (!n) throw notFound('Aviso');
      if (n.createdBy !== ctx.userId && !ctx.roles.includes('dono')) throw forbidden();
      const team = await tx.select({ userId: staff.userId, role: staff.role, branchIds: staff.branchIds, name: users.name }).from(staff).innerJoin(users, eq(users.id, staff.userId)).where(and(eq(staff.active, true)));
      const targets = new Map<string, string>();
      for (const s of team) {
        if (s.role === 'dono' || s.userId === n.createdBy) continue;
        if (!n.audience.includes('todos') && !n.audience.includes(s.role)) continue;
        if (n.branchId && s.branchIds !== null && !s.branchIds.includes(n.branchId)) continue;
        targets.set(s.userId, s.name);
      }
      const reads = await tx.select().from(noticeReads).where(eq(noticeReads.noticeId, id));
      const readMap = new Map(reads.map((r) => [r.userId, r.readAt]));
      const people = [...targets].map(([userId, nome]) => ({ userId, nome, lidoEm: readMap.get(userId) ?? null }));
      return { id, total: people.length, lidos: people.filter((p) => p.lidoEm).length, pessoas: people };
    });
  }
}
