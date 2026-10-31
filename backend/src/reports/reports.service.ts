import { Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, gte, inArray, isNull, lt, lte, ne, or, sql, type SQL } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { addDays, Clock, daysBetween } from '../common/clock.js';
import { DomainError, forbidden } from '../common/errors.js';
import { SettingsService } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { approvalRequests, branches, cashMovements, checkins, incidents, memberContacts, members, payments, plans, shifts, subscriptions, tasks, users } from '../db/schema.js';

/** Início de um dia de Luanda (UTC+1, sem hora de Verão). */
const dayStart = (d: string) => new Date(`${d}T00:00:00+01:00`);
const num = (v: unknown) => Number(v ?? 0);

type Period = { branchId?: string; from?: string; to?: string };

/**
 * Painel do dono, resumo financeiro, renovações e esperado vs. recebido
 * (RF-REL-01/02, RF-PER-03, RF-RET-02). Tudo calculado a partir do livro razão e
 * das subscrições; nenhum número é guardado à parte.
 */
@Injectable()
export class ReportsService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly settings: SettingsService,
  ) {}

  /** Filtro de filial: a pedida, ou as que a pessoa pode ver. */
  private scope(ctx: AuthCtx, col: PgColumn, branchId?: string): SQL | undefined {
    if (branchId) {
      if (!canSeeBranch(ctx, branchId)) throw forbidden();
      return eq(col, branchId);
    }
    if (ctx.roles.includes('dono') || ctx.branchIds === null) return undefined;
    return inArray(col, ctx.branchIds.length ? ctx.branchIds : ['00000000-0000-0000-0000-000000000000']);
  }

  private period(p: Period) {
    const today = this.clock.today();
    const from = p.from ?? `${today.slice(0, 8)}01`;
    const to = p.to ?? today;
    if (from > to) throw new DomainError('PERIODO_INVALIDO', 'A data inicial é depois da final.');
    if (daysBetween(from, to) > 366) throw new DomainError('PERIODO_LONGO', 'O período máximo é um ano.');
    return { from, to, today, start: dayStart(from), end: dayStart(addDays(to, 1)) };
  }

  /**
   * RF-PER-03 · esperado vs. recebido, com a diferença explicada linha a linha.
   * Esperado = inscrições e renovações cujo período começa (ou devia começar) no intervalo,
   * ao preço de tabela. Recebido = pagamentos menos estornos no livro razão.
   */
  private async expectedVsReceived(tx: Tx, ctx: AuthCtx, p: ReturnType<ReportsService['period']>, branchId?: string) {
    const subScope = this.scope(ctx, subscriptions.branchId, branchId);
    // Subscrições do período: activas/congeladas que começaram nele, ou pendentes criadas nele.
    const subs = await tx
      .select({ sub: subscriptions, member: members.name, planPrice: plans.priceCents, isTrial: plans.isTrial })
      .from(subscriptions)
      .innerJoin(members, eq(members.id, subscriptions.memberId))
      .innerJoin(plans, eq(plans.id, subscriptions.planId))
      .where(
        and(
          subScope,
          eq(plans.isTrial, false),
          or(
            and(inArray(subscriptions.status, ['activa', 'congelada']), gte(subscriptions.startsOn, p.from), lte(subscriptions.startsOn, p.to)),
            and(eq(subscriptions.status, 'pendente'), gte(subscriptions.createdAt, p.start), lt(subscriptions.createdAt, p.end)),
          ),
        ),
      );
    // Renovações em falta: subscrições que acabaram no intervalo (até ontem) sem sucessora.
    const lastDay = p.to < p.today ? p.to : addDays(p.today, -1);
    const missing = lastDay < addDays(p.from, -1)
      ? []
      : await tx
          .select({ sub: subscriptions, member: members.name, planPrice: plans.priceCents })
          .from(subscriptions)
          .innerJoin(members, eq(members.id, subscriptions.memberId))
          .innerJoin(plans, eq(plans.id, subscriptions.planId))
          .where(
            and(
              subScope,
              eq(subscriptions.status, 'activa'),
              eq(plans.isTrial, false),
              gte(subscriptions.endsOn, addDays(p.from, -1)),
              lte(subscriptions.endsOn, addDays(lastDay, -1)),
              sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.status in ('activa','pendente','congelada') and (s2.starts_on is null or s2.starts_on > ${subscriptions.startsOn}))`,
            ),
          );

    const ledger = await tx
      .select({ kind: cashMovements.kind, method: cashMovements.method, total: sql<string>`sum(${cashMovements.amountCents})`, n: sql<string>`count(*)` })
      .from(cashMovements)
      .where(and(this.scope(ctx, cashMovements.branchId, branchId), inArray(cashMovements.kind, ['pagamento', 'estorno']), gte(cashMovements.createdAt, p.start), lt(cashMovements.createdAt, p.end)))
      .groupBy(cashMovements.kind, cashMovements.method);
    const refunds = await tx
      .select({ id: cashMovements.id, amount: cashMovements.amountCents, reason: cashMovements.reason, at: cashMovements.createdAt })
      .from(cashMovements)
      .where(and(this.scope(ctx, cashMovements.branchId, branchId), eq(cashMovements.kind, 'estorno'), gte(cashMovements.createdAt, p.start), lt(cashMovements.createdAt, p.end)));

    const expected = subs.reduce((a, s) => a + s.planPrice, 0) + missing.reduce((a, s) => a + s.planPrice, 0);
    const received = ledger.reduce((a, r) => a + num(r.total), 0);
    const lines: { tipo: string; descricao: string; centimos: number; membro?: string; ref?: string }[] = [];
    for (const s of subs) {
      if (s.sub.status === 'pendente') lines.push({ tipo: 'por_pagar', descricao: 'Inscrição ou renovação por pagar', centimos: s.sub.priceCents, membro: s.member, ref: s.sub.id });
      else if (s.sub.activatedBy === 'aprovacao') lines.push({ tipo: 'sem_pagamento', descricao: 'Activada por aprovação, sem pagamento', centimos: s.sub.priceCents, membro: s.member, ref: s.sub.id });
      if (s.planPrice > s.sub.priceCents) lines.push({ tipo: 'desconto', descricao: `Desconto de ${s.sub.discountPct}%`, centimos: s.planPrice - s.sub.priceCents, membro: s.member, ref: s.sub.id });
    }
    for (const m of missing) lines.push({ tipo: 'renovacao_em_falta', descricao: `Renovação em falta desde ${addDays(m.sub.endsOn!, 1)}`, centimos: m.planPrice, membro: m.member, ref: m.sub.id });
    for (const r of refunds) lines.push({ tipo: 'estorno', descricao: r.reason ? `Estorno · ${r.reason}` : 'Estorno', centimos: -r.amount, ref: r.id });
    lines.sort((a, b) => b.centimos - a.centimos);
    const porMeio: Record<string, number> = {};
    for (const r of ledger) porMeio[r.method] = (porMeio[r.method] ?? 0) + num(r.total);
    return { esperadoCentimos: expected, recebidoCentimos: received, diferencaCentimos: expected - received, recebidoPorMeio: porMeio, linhas: lines, payers: subs.filter((s) => s.sub.status !== 'pendente' && s.sub.activatedBy === 'pagamento').length };
  }

  /** RF-REL-01 · painel do dono. */
  dashboard(ctx: AuthCtx, q: Period) {
    if (!hasRole(ctx, 'gerente', 'financas')) throw forbidden();
    const p = this.period(q);
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const evr = await this.expectedVsReceived(tx, ctx, p, q.branchId);
      const subScope = this.scope(ctx, subscriptions.branchId, q.branchId);

      const activeAt = async (date: string) => {
        const [r] = await tx
          .select({ n: sql<string>`count(distinct ${subscriptions.memberId})` })
          .from(subscriptions)
          .innerJoin(plans, eq(plans.id, subscriptions.planId))
          .where(and(subScope, eq(plans.isTrial, false), inArray(subscriptions.status, ['activa', 'congelada']), lte(subscriptions.startsOn, date), gte(subscriptions.endsOn, addDays(date, -s.toleranceDays))));
        return num(r?.n);
      };
      const activeNow = await activeAt(p.to < p.today ? p.to : p.today);
      const activeStart = await activeAt(p.from);
      // Saíram: a última subscrição acabou no período há mais do que a tolerância, sem renovação.
      const churnTo = addDays(p.to < p.today ? p.to : p.today, -s.toleranceDays - 1);
      const [churn] = churnTo < p.from
        ? [{ n: '0' }]
        : await tx
            .select({ n: sql<string>`count(distinct ${subscriptions.memberId})` })
            .from(subscriptions)
            .innerJoin(plans, eq(plans.id, subscriptions.planId))
            .where(and(subScope, eq(plans.isTrial, false), eq(subscriptions.status, 'activa'), gte(subscriptions.endsOn, p.from), lte(subscriptions.endsOn, churnTo), sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.status in ('activa','congelada') and s2.ends_on > ${subscriptions.endsOn})`));
      const [newMembers] = await tx
        .select({ n: sql<string>`count(*)` })
        .from(members)
        .where(and(this.scope(ctx, members.baseBranchId, q.branchId), gte(members.createdAt, p.start), lt(members.createdAt, p.end)));
      const [payers] = await tx
        .select({ n: sql<string>`count(distinct ${payments.memberId})` })
        .from(payments)
        .where(and(this.scope(ctx, payments.branchId, q.branchId), eq(payments.status, 'confirmado'), gte(payments.confirmedAt, p.start), lt(payments.confirmedAt, p.end)));

      const hours = await tx
        .select({ h: sql<number>`extract(hour from ${checkins.createdAt} at time zone 'Africa/Luanda')::int`, n: sql<string>`count(*)` })
        .from(checkins)
        .where(and(this.scope(ctx, checkins.branchId, q.branchId), inArray(checkins.result, ['entrou', 'manual']), gte(checkins.createdAt, p.start), lt(checkins.createdAt, p.end)))
        .groupBy(sql`1`);
      const days = Math.max(1, daysBetween(p.from, p.to < p.today ? p.to : p.today) + 1);
      const occupancy = Array.from({ length: 17 }, (_, i) => {
        const h = i + 6;
        const n = num(hours.find((x) => Number(x.h) === h)?.n);
        return { hora: h, entradas: n, mediaDia: Math.round((n / days) * 10) / 10 };
      });

      const [appr] = await tx.select({ n: sql<string>`count(*)` }).from(approvalRequests).where(and(eq(approvalRequests.status, 'pendente'), q.branchId ? or(eq(approvalRequests.branchId, q.branchId), isNull(approvalRequests.branchId)) : undefined));
      const [open] = await tx.select({ n: sql<string>`count(*)` }).from(tasks).where(and(this.scope(ctx, tasks.branchId, q.branchId), eq(tasks.status, 'aberta')));
      const [urgent] = await tx.select({ n: sql<string>`count(*)` }).from(incidents).where(and(this.scope(ctx, incidents.branchId, q.branchId), ne(incidents.status, 'resolvida'), eq(incidents.urgency, 'alta')));

      return {
        periodo: { de: p.from, ate: p.to },
        esperadoCentimos: evr.esperadoCentimos,
        recebidoCentimos: evr.recebidoCentimos,
        diferencaCentimos: evr.diferencaCentimos,
        taxaCobranca: evr.esperadoCentimos ? Math.round((evr.recebidoCentimos / evr.esperadoCentimos) * 1000) / 10 : null,
        recebidoPorMeio: evr.recebidoPorMeio,
        membros: { activos: activeNow, novos: num(newMembers?.n), sairam: num(churn?.n), churn: activeStart ? Math.round((num(churn?.n) / activeStart) * 1000) / 10 : null },
        ticketMedioCentimos: num(payers?.n) ? Math.round(evr.recebidoCentimos / num(payers?.n)) : null,
        ocupacaoPorHora: occupancy,
        aprovacoesPendentes: num(appr?.n),
        pendenciasAbertas: num(open?.n),
        ocorrenciasUrgentes: num(urgent?.n),
        alertas: await this.alerts(tx, ctx, p, q.branchId),
      };
    });
  }

  /** RF-PER-03 · a diferença entre esperado e recebido, linha a linha. */
  difference(ctx: AuthCtx, q: Period) {
    if (!hasRole(ctx, 'gerente', 'financas')) throw forbidden();
    const p = this.period(q);
    return this.database.withOrg(ctx, async (tx) => {
      const { payers: _payers, ...evr } = await this.expectedVsReceived(tx, ctx, p, q.branchId);
      return { periodo: { de: p.from, ate: p.to }, ...evr };
    });
  }

  /** RF-PER-02 · sinais de fuga de receita (indícios a rever, não acusações). */
  private async alerts(tx: Tx, ctx: AuthCtx, p: ReturnType<ReportsService['period']>, branchId?: string) {
    const out: { tipo: string; descricao: string; quantidade: number }[] = [];
    const [noPay] = await tx
      .select({ n: sql<string>`count(*)` })
      .from(subscriptions)
      .where(and(this.scope(ctx, subscriptions.branchId, branchId), eq(subscriptions.activatedBy, 'aprovacao'), gte(subscriptions.startsOn, p.from), lte(subscriptions.startsOn, p.to)));
    if (num(noPay?.n)) out.push({ tipo: 'activadas_sem_pagamento', descricao: 'Subscrições activadas sem pagamento', quantidade: num(noPay?.n) });

    const weekAgo = new Date(this.clock.now().getTime() - 7 * 86_400_000);
    const trial = await tx
      .select({ member: checkins.memberId, n: sql<string>`count(*)` })
      .from(checkins)
      .innerJoin(subscriptions, and(eq(subscriptions.memberId, checkins.memberId), eq(subscriptions.status, 'activa'), eq(subscriptions.activatedBy, 'teste')))
      .where(and(this.scope(ctx, checkins.branchId, branchId), inArray(checkins.result, ['entrou', 'manual']), gte(checkins.createdAt, weekAgo)))
      .groupBy(checkins.memberId)
      .having(sql`count(*) >= 6`);
    if (trial.length) out.push({ tipo: 'teste_muito_usado', descricao: 'Membros em teste grátis com 6 ou mais entradas esta semana', quantidade: trial.length });

    const [late] = await tx
      .select({ n: sql<string>`count(*)` })
      .from(cashMovements)
      .where(and(this.scope(ctx, cashMovements.branchId, branchId), gte(cashMovements.createdAt, p.start), lt(cashMovements.createdAt, p.end), sql`(extract(hour from ${cashMovements.createdAt} at time zone 'Africa/Luanda') < 6 or extract(hour from ${cashMovements.createdAt} at time zone 'Africa/Luanda') >= 23)`));
    if (num(late?.n)) out.push({ tipo: 'fora_de_horas', descricao: 'Movimentos de caixa fora do horário (23:00–06:00)', quantidade: num(late?.n) });

    const manual = await tx
      .select({ n: sql<string>`count(*)` })
      .from(checkins)
      .where(and(this.scope(ctx, checkins.branchId, branchId), eq(checkins.result, 'manual'), gte(checkins.createdAt, p.start), lt(checkins.createdAt, p.end)));
    if (num(manual[0]?.n)) out.push({ tipo: 'entradas_manuais', descricao: 'Entradas manuais (sem QR)', quantidade: num(manual[0]?.n) });
    return out;
  }

  /** RF-REL-02 · resumo financeiro do dia: entradas por meio, caixas abertos, por confirmar e devedores. */
  finance(ctx: AuthCtx, q: { branchId?: string; date?: string }) {
    if (!hasRole(ctx, 'financas', 'gerente')) throw forbidden();
    const date = q.date ?? this.clock.today();
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const start = dayStart(date);
      const end = dayStart(addDays(date, 1));
      const ledger = await tx
        .select({ method: cashMovements.method, kind: cashMovements.kind, total: sql<string>`sum(${cashMovements.amountCents})`, n: sql<string>`count(*)` })
        .from(cashMovements)
        .where(and(this.scope(ctx, cashMovements.branchId, q.branchId), gte(cashMovements.createdAt, start), lt(cashMovements.createdAt, end), ne(cashMovements.kind, 'abertura')))
        .groupBy(cashMovements.method, cashMovements.kind);
      const entradas: Record<string, number> = {};
      const saidas: Record<string, number> = {};
      for (const r of ledger) {
        if (r.kind === 'pagamento' || r.kind === 'estorno') entradas[r.method] = (entradas[r.method] ?? 0) + num(r.total);
        else saidas[r.kind] = (saidas[r.kind] ?? 0) + num(r.total);
      }
      const openShifts = await tx
        .select({ id: shifts.id, branchId: shifts.branchId, branch: branches.name, kind: shifts.kind, openedAt: shifts.openedAt, operator: users.name })
        .from(shifts)
        .innerJoin(branches, eq(branches.id, shifts.branchId))
        .leftJoin(users, eq(users.id, shifts.openedBy))
        .where(and(this.scope(ctx, shifts.branchId, q.branchId), eq(shifts.status, 'aberto')));
      const pending = await tx
        .select({ id: payments.id, method: payments.method, amount: payments.amountCents, createdAt: payments.createdAt, member: members.name })
        .from(payments)
        .leftJoin(members, eq(members.id, payments.memberId))
        .where(and(this.scope(ctx, payments.branchId, q.branchId), eq(payments.status, 'pendente')))
        .orderBy(asc(payments.createdAt))
        .limit(100);
      const debtors = await this.debtors(tx, ctx, q.branchId, s.toleranceDays);
      const total = Object.values(entradas).reduce((a, b) => a + b, 0);
      return {
        dia: date,
        entradasCentimos: total,
        entradasPorMeio: entradas,
        saidasPorTipo: saidas,
        caixasAbertos: openShifts,
        porConfirmar: { quantidade: pending.length, centimos: pending.reduce((a, x) => a + x.amount, 0), pagamentos: pending },
        devedores: { quantidade: debtors.length, centimos: debtors.reduce((a, d) => a + d.valorCentimos, 0), lista: debtors.slice(0, 50) },
      };
    });
  }

  /** Membros cuja última subscrição acabou nos últimos 90 dias sem renovação paga. */
  private async debtors(tx: Tx, ctx: AuthCtx, branchId: string | undefined, toleranceDays: number) {
    const today = this.clock.today();
    const rows = await tx
      .select({ memberId: members.id, name: members.name, phone: members.phone, endsOn: subscriptions.endsOn, price: plans.priceCents, plan: plans.name, branchId: subscriptions.branchId })
      .from(subscriptions)
      .innerJoin(members, eq(members.id, subscriptions.memberId))
      .innerJoin(plans, eq(plans.id, subscriptions.planId))
      .where(
        and(
          this.scope(ctx, subscriptions.branchId, branchId),
          eq(subscriptions.status, 'activa'),
          eq(plans.isTrial, false),
          lt(subscriptions.endsOn, today),
          gte(subscriptions.endsOn, addDays(today, -90)),
          sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.status in ('activa','congelada') and s2.ends_on > ${subscriptions.endsOn})`,
        ),
      );
    return rows
      .map((r) => {
        const late = daysBetween(r.endsOn!, today);
        return { membroId: r.memberId, nome: r.name, telefone: r.phone, plano: r.plan, venceu: r.endsOn, diasAtraso: late, estado: late <= toleranceDays ? 'em_divida' : 'bloqueado', valorCentimos: r.price, filialId: r.branchId };
      })
      .sort((a, b) => b.diasAtraso - a.diasAtraso);
  }

  /** RF-RET-02 · renovações nos próximos N dias, com a última entrada e o último contacto. */
  renewals(ctx: AuthCtx, q: { days: number; branchId?: string }) {
    return this.database.withOrg(ctx, async (tx) => {
      const today = this.clock.today();
      const rows = await tx
        .select({ subId: subscriptions.id, memberId: members.id, name: members.name, phone: members.phone, endsOn: subscriptions.endsOn, price: plans.priceCents, plan: plans.name, branchId: subscriptions.branchId })
        .from(subscriptions)
        .innerJoin(members, eq(members.id, subscriptions.memberId))
        .innerJoin(plans, eq(plans.id, subscriptions.planId))
        .where(
          and(
            this.scope(ctx, subscriptions.branchId, q.branchId),
            eq(subscriptions.status, 'activa'),
            gte(subscriptions.endsOn, today),
            lte(subscriptions.endsOn, addDays(today, q.days)),
            sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.status in ('activa','pendente','congelada') and (s2.ends_on is null or s2.ends_on > ${subscriptions.endsOn}))`,
          ),
        )
        .orderBy(asc(subscriptions.endsOn));
      if (!rows.length) return { dias: q.days, quantidade: 0, centimos: 0, membros: [] };
      const ids = rows.map((r) => r.memberId);
      const last = await tx.select({ memberId: checkins.memberId, at: sql<Date>`max(${checkins.createdAt})` }).from(checkins).where(and(inArray(checkins.memberId, ids), inArray(checkins.result, ['entrou', 'manual']))).groupBy(checkins.memberId);
      const contacts = await tx.select().from(memberContacts).where(inArray(memberContacts.memberId, ids)).orderBy(desc(memberContacts.createdAt), desc(memberContacts.id));
      return {
        dias: q.days,
        quantidade: rows.length,
        centimos: rows.reduce((a, r) => a + r.price, 0),
        membros: rows.map((r) => {
          const c = contacts.find((x) => x.memberId === r.memberId);
          const l = last.find((x) => x.memberId === r.memberId)?.at;
          return { membroId: r.memberId, nome: r.name, telefone: r.phone, plano: r.plan, vence: r.endsOn, diasRestantes: daysBetween(today, r.endsOn!), valorCentimos: r.price, ultimaEntrada: l ? new Date(l) : null, ultimoContacto: c ? { resultado: c.outcome, em: c.createdAt } : null };
        }),
      };
    });
  }
}
