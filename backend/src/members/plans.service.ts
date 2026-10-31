import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import type { AuthCtx } from '../auth/context.js';
import { DomainError, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { AuditService } from '../core/audit.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { plans, subscriptions, type PlanScope } from '../db/schema.js';

export type PlanInput = { name: string; priceCents: number; periodDays: number; scope: PlanScope; branchId?: string | null; otherEntriesMonth?: number; hoursFrom?: number | null; hoursTo?: number | null; maxDiscountPct?: number; isTrial?: boolean };

/** RF-PLA-01/02 · planos com preço, período, âmbito e horário. */
@Injectable()
export class PlansService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly audit: AuditService,
  ) {}

  list(ctx: AuthCtx) {
    return this.database.withOrg(ctx, async (tx) => {
      const rows = await tx.select().from(plans).where(eq(plans.orgId, ctx.orgId)).orderBy(plans.priceCents);
      const counts = await tx
        .select({ planId: subscriptions.planId, n: sql<number>`count(*)::int` })
        .from(subscriptions)
        .where(and(eq(subscriptions.orgId, ctx.orgId), eq(subscriptions.status, 'activa')))
        .groupBy(subscriptions.planId);
      return rows.map((p) => ({ ...p, activeMembers: counts.find((c) => c.planId === p.id)?.n ?? 0 }));
    });
  }

  create(ctx: AuthCtx, input: PlanInput) {
    if (input.scope === 'local' && !input.branchId) throw new DomainError('FILIAL_EM_FALTA', 'Um plano local precisa da filial.');
    if (input.scope === 'horario' && (input.hoursFrom == null || input.hoursTo == null)) throw new DomainError('HORARIO_EM_FALTA', 'Um plano por horário precisa da hora de início e de fim.');
    return this.database.withOrg(ctx, async (tx) => {
      const id = uuidv7();
      const row = { id, orgId: ctx.orgId, name: input.name, priceCents: input.isTrial ? 0 : input.priceCents, periodDays: input.periodDays, scope: input.scope, branchId: input.branchId ?? null, otherEntriesMonth: input.otherEntriesMonth ?? 0, hoursFrom: input.hoursFrom ?? null, hoursTo: input.hoursTo ?? null, maxDiscountPct: input.maxDiscountPct ?? 10, isTrial: input.isTrial ?? false };
      await tx.insert(plans).values(row);
      await this.audit.record(tx, ctx, 'plano.criado', 'plan', id, row);
      return row;
    });
  }

  /** Quantos membros activos tem o plano (alterar o preço com activos pede aprovação, RN-23). */
  async activeCount(tx: Tx, planId: string) {
    const [r] = await tx.select({ n: sql<number>`count(*)::int` }).from(subscriptions).where(and(eq(subscriptions.planId, planId), eq(subscriptions.status, 'activa')));
    return r?.n ?? 0;
  }

  async setPrice(tx: Tx, ctx: AuthCtx, planId: string, priceCents: number) {
    const [p] = await tx.select().from(plans).where(eq(plans.id, planId));
    if (!p) throw notFound('Plano');
    await tx.update(plans).set({ priceCents }).where(eq(plans.id, planId));
    await this.audit.record(tx, ctx, 'plano.preco', 'plan', planId, { priceCents }, { priceCents: p.priceCents });
    return { planId, priceCents, before: p.priceCents };
  }
}
