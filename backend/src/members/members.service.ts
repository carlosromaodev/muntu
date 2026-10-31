import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, ilike, inArray, or } from 'drizzle-orm';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { AuthService } from '../auth/auth.service.js';
import { addDays, Clock, daysBetween } from '../common/clock.js';
import { conflict, DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { applyDiscount } from '../common/money.js';
import { ENV, type Env } from '../config/env.js';
import { AuditService } from '../core/audit.service.js';
import { CountersService } from '../core/counters.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { SettingsService, type Settings } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { branches, checkins, members, payments, plans, subscriptions, trials } from '../db/schema.js';

export type MemberStatus = 'sem_plano' | 'pendente' | 'pago' | 'a_vencer' | 'em_divida' | 'bloqueado' | 'congelado';
type Sub = typeof subscriptions.$inferSelect;

/**
 * Estado do membro a partir das subscrições (RN-02, RN-03).
 * Devolve também quantos dias faltam (positivo) ou passaram (negativo) do fim.
 */
export function memberStatus(subs: Sub[], today: string, s: Pick<Settings, 'toleranceDays' | 'warnDays'>): { status: MemberStatus; sub: Sub | null; days: number | null } {
  const live = subs.filter((x) => x.status === 'activa' || x.status === 'congelada').sort((a, b) => (b.endsOn ?? '').localeCompare(a.endsOn ?? ''));
  const cur = live[0];
  if (!cur) {
    const pend = subs.find((x) => x.status === 'pendente');
    return { status: pend ? 'pendente' : 'sem_plano', sub: pend ?? null, days: null };
  }
  if (cur.status === 'congelada') return { status: 'congelado', sub: cur, days: null };
  const days = daysBetween(today, cur.endsOn!);
  if (days >= 0) return { status: days <= s.warnDays ? 'a_vencer' : 'pago', sub: cur, days };
  return { status: -days <= s.toleranceDays ? 'em_divida' : 'bloqueado', sub: cur, days };
}

@Injectable()
export class MembersService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    @Inject(ENV) private readonly env: Env,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly counters: CountersService,
    private readonly outbox: OutboxService,
    private readonly settings: SettingsService,
    private readonly auth: AuthService,
  ) {}

  /** RF-INS-02 · procura duplicados por telefone, BI e NIF. */
  private async findDuplicate(tx: Tx, orgId: string, phone: string, bi?: string | null, nif?: string | null) {
    const conds = [eq(members.phone, phone)];
    if (bi) conds.push(eq(members.bi, bi));
    if (nif) conds.push(eq(members.nif, nif));
    const [dup] = await tx.select({ id: members.id, name: members.name, number: members.number }).from(members).where(and(eq(members.orgId, orgId), or(...conds)));
    return dup ?? null;
  }

  /** RF-INS-01 · cria o membro (primeiro passo da inscrição). */
  async create(ctx: AuthCtx, input: { name: string; phone: string; bi?: string; nif?: string; birthDate?: string; baseBranchId: string; consent: boolean; createAccount: boolean }) {
    if (!canSeeBranch(ctx, input.baseBranchId)) throw forbidden('Não pode inscrever membros nesta filial.');
    if (!input.consent) throw new DomainError('CONSENTIMENTO_EM_FALTA', 'O membro tem de aceitar o tratamento dos dados pessoais.');
    // A conta de app cria-se antes (transacção de sistema), só se o telefone ainda não for membro.
    const pre = await this.database.withOrg(ctx, (tx) => this.findDuplicate(tx, ctx.orgId, input.phone, input.bi, input.nif));
    if (pre) throw conflict('MEMBRO_DUPLICADO', `Já existe o membro ${pre.name} (n.º ${pre.number}) com este telefone, BI ou NIF.`, { membroId: pre.id });
    const account = input.createAccount ? await this.auth.ensureUser(input.name, input.phone) : null;
    return this.database.withOrg(ctx, async (tx) => {
      const [branch] = await tx.select({ id: branches.id }).from(branches).where(and(eq(branches.id, input.baseBranchId), eq(branches.orgId, ctx.orgId)));
      if (!branch) throw notFound('Filial');
      const dup = await this.findDuplicate(tx, ctx.orgId, input.phone, input.bi, input.nif);
      if (dup) throw conflict('MEMBRO_DUPLICADO', `Já existe o membro ${dup.name} (n.º ${dup.number}) com este telefone, BI ou NIF.`, { membroId: dup.id });
      const id = uuidv7();
      const number = await this.counters.next(tx, ctx.orgId, 'membro', 4001);
      const row = { id, orgId: ctx.orgId, number, userId: account?.userId ?? null, name: input.name, phone: input.phone, bi: input.bi ?? null, nif: input.nif ?? null, birthDate: input.birthDate ?? null, baseBranchId: input.baseBranchId, consentAt: this.clock.now(), createdBy: ctx.userId };
      await tx.insert(members).values(row);
      if (account?.tempPassword) await this.outbox.enqueue(tx, ctx.orgId, 'sms', input.phone, 'membro.credenciais', { nome: input.name, senha: account.tempPassword });
      await this.audit.record(tx, ctx, 'membro.criado', 'member', id, { number, name: input.name, phone: input.phone });
      return { ...row, ...(this.env.NODE_ENV !== 'production' && account?.tempPassword ? { tempPassword: account.tempPassword } : {}) };
    });
  }

  /** RF-MEM-01 · pesquisa por nome, telefone, BI, NIF ou número. */
  async search(ctx: AuthCtx, q: string, status?: MemberStatus) {
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const term = q.trim();
      const digits = term.replace(/\D/g, '');
      const conds = term ? [ilike(members.name, `%${term}%`), ...(digits ? [ilike(members.phone, `%${digits}%`), eq(members.bi, term), eq(members.nif, term)] : []), ...(/^\d+$/.test(term) ? [eq(members.number, Number(term))] : [])] : [];
      const rows = await tx
        .select()
        .from(members)
        .where(and(eq(members.orgId, ctx.orgId), conds.length ? or(...conds) : undefined))
        .orderBy(members.name)
        .limit(50);
      const visible = rows.filter((m) => canSeeBranch(ctx, m.baseBranchId) || hasRole(ctx, 'financas'));
      const subs = visible.length ? await tx.select().from(subscriptions).where(inArray(subscriptions.memberId, visible.map((m) => m.id))) : [];
      const today = this.clock.today();
      const out = visible.map((m) => {
        const st = memberStatus(subs.filter((x) => x.memberId === m.id), today, s);
        return { id: m.id, number: m.number, name: m.name, phone: m.phone, baseBranchId: m.baseBranchId, status: st.status, endsOn: st.sub?.endsOn ?? null, days: st.days };
      });
      return status ? out.filter((m) => m.status === status) : out;
    });
  }

  /** RF-MEM-02 · ficha do membro. O PT só vê os seus alunos e nunca pagamentos (RN-73). */
  async get(ctx: AuthCtx, id: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const [m] = await tx.select().from(members).where(eq(members.id, id));
      if (!m) throw notFound('Membro');
      const isSelf = ctx.memberId === id;
      if (!isSelf && !hasRole(ctx, 'gerente', 'rececao', 'financas', 'vigilante')) throw forbidden();
      const s = await this.settings.get(tx, ctx.orgId);
      const subs = await tx.select().from(subscriptions).where(eq(subscriptions.memberId, id)).orderBy(desc(subscriptions.createdAt));
      const st = memberStatus(subs, this.clock.today(), s);
      const recent = await tx.select().from(checkins).where(eq(checkins.memberId, id)).orderBy(desc(checkins.createdAt)).limit(20);
      const pays = ctx.roles.includes('vigilante') && !hasRole(ctx, 'gerente', 'rececao', 'financas') ? [] : await tx.select().from(payments).where(eq(payments.memberId, id)).orderBy(desc(payments.createdAt)).limit(20);
      if (ctx.roles.length === 1 && ctx.roles[0] === 'vigilante') return { id: m.id, name: m.name, number: m.number, status: st.status, days: st.days };
      return { ...m, status: st.status, days: st.days, current: st.sub, subscriptions: subs, checkins: recent, payments: pays };
    });
  }

  /** RF-PLA-03/04 · nova subscrição. Fica pendente até pagamento ou aprovação (RN-01); o teste grátis activa já (RN-09). */
  async subscribe(ctx: AuthCtx, memberId: string, input: { planId: string; branchId?: string }) {
    return this.database.withOrg(ctx, async (tx) => {
      const [m] = await tx.select().from(members).where(eq(members.id, memberId));
      if (!m) throw notFound('Membro');
      const [plan] = await tx.select().from(plans).where(and(eq(plans.id, input.planId), eq(plans.active, true)));
      if (!plan) throw notFound('Plano');
      const branchId = input.branchId ?? m.baseBranchId;
      if (!canSeeBranch(ctx, branchId)) throw forbidden('Não pode vender planos nesta filial.');
      const id = uuidv7();
      if (plan.isTrial) {
        const s = await this.settings.get(tx, ctx.orgId);
        const keys = [`tel:${m.phone}`, ...(m.bi ? [`bi:${m.bi}`] : [])];
        const used = await tx.select().from(trials).where(and(eq(trials.orgId, ctx.orgId), inArray(trials.key, keys)));
        if (used.length) throw conflict('TESTE_JA_USADO', 'O teste grátis já foi usado com este BI ou telefone.');
        if (!m.bi) throw new DomainError('BI_EM_FALTA', 'Para o teste grátis é preciso o número do BI.');
        for (const key of keys) await tx.insert(trials).values({ orgId: ctx.orgId, key, memberId });
        const today = this.clock.today();
        await tx.insert(subscriptions).values({ id, orgId: ctx.orgId, memberId, planId: plan.id, branchId, status: 'activa', priceCents: 0, startsOn: today, endsOn: addDays(today, s.trialDays - 1), activatedBy: 'teste', createdBy: ctx.userId });
      } else {
        await tx.insert(subscriptions).values({ id, orgId: ctx.orgId, memberId, planId: plan.id, branchId, status: 'pendente', priceCents: plan.priceCents, createdBy: ctx.userId });
      }
      await this.audit.record(tx, ctx, 'subscricao.criada', 'subscription', id, { memberId, planId: plan.id, trial: plan.isTrial });
      return (await tx.select().from(subscriptions).where(eq(subscriptions.id, id)))[0]!;
    });
  }

  /**
   * Activa uma subscrição (pagamento confirmado ou aprovação). Numa renovação,
   * o novo período começa no dia a seguir ao fim do actual.
   */
  async activate(tx: Tx, subId: string, by: 'pagamento' | 'aprovacao', ref: string) {
    const [sub] = await tx.select().from(subscriptions).where(eq(subscriptions.id, subId));
    if (!sub) throw notFound('Subscrição');
    if (sub.status !== 'pendente') return sub;
    const [plan] = await tx.select().from(plans).where(eq(plans.id, sub.planId));
    const today = this.clock.today();
    const prev = (await tx.select().from(subscriptions).where(and(eq(subscriptions.memberId, sub.memberId), eq(subscriptions.status, 'activa')))).filter((x) => x.endsOn && x.endsOn >= today).sort((a, b) => b.endsOn!.localeCompare(a.endsOn!))[0];
    const startsOn = prev ? addDays(prev.endsOn!, 1) : today;
    const endsOn = addDays(startsOn, plan!.periodDays - 1);
    await tx.update(subscriptions).set({ status: 'activa', startsOn, endsOn, activatedBy: by, activationRef: ref }).where(eq(subscriptions.id, subId));
    return { ...sub, status: 'activa' as const, startsOn, endsOn, activatedBy: by, activationRef: ref };
  }

  /** Aplica um desconto já autorizado (pelo limite do perfil ou por aprovação). */
  async setDiscount(tx: Tx, subId: string, pct: number) {
    const [sub] = await tx.select().from(subscriptions).where(eq(subscriptions.id, subId));
    if (!sub) throw notFound('Subscrição');
    if (sub.status !== 'pendente') throw new DomainError('SUBSCRICAO_NAO_PENDENTE', 'Só se aplica desconto antes do pagamento.');
    const [plan] = await tx.select().from(plans).where(eq(plans.id, sub.planId));
    const priceCents = applyDiscount(plan!.priceCents, pct);
    await tx.update(subscriptions).set({ discountPct: pct, priceCents }).where(eq(subscriptions.id, subId));
    return priceCents;
  }
}
