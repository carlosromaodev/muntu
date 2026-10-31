import { createHmac, timingSafeEqual } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, gte, inArray, ne } from 'drizzle-orm';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { Clock, luandaMinutes } from '../common/clock.js';
import { DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { ENV, type Env } from '../config/env.js';
import { AuditService } from '../core/audit.service.js';
import { SettingsService, type Settings } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { branches, checkins, members, plans, subscriptions } from '../db/schema.js';
import { memberStatus, type MemberStatus } from '../members/members.service.js';

const QR_STEP_MS = 30_000;

/** QR dinâmico (RN-05): id do membro + janela de 30 s + assinatura. */
export function qrToken(secret: string, orgId: string, memberId: string, now: number) {
  const step = Math.floor(now / QR_STEP_MS);
  const sig = createHmac('sha256', secret).update(`${orgId}.${memberId}.${step}`).digest('base64url').slice(0, 22);
  return { token: `${memberId}.${step}.${sig}`, expiresAt: new Date((step + 1) * QR_STEP_MS) };
}

/** Valida o QR: aceita a janela actual e a anterior (tolerância de relógio). */
export function readQr(secret: string, orgId: string, token: string, now: number): string | null {
  const [memberId, stepS, sig] = token.split('.');
  if (!memberId || !stepS || !sig) return null;
  const step = Number(stepS);
  const cur = Math.floor(now / QR_STEP_MS);
  if (!Number.isInteger(step) || step < cur - 1 || step > cur) return null;
  const expected = Buffer.from(createHmac('sha256', secret).update(`${orgId}.${memberId}.${step}`).digest('base64url').slice(0, 22));
  const given = Buffer.from(sig);
  return given.length === expected.length && timingSafeEqual(given, expected) ? memberId : null;
}

export type AccessFacts = {
  status: MemberStatus;
  days: number | null;
  scope: string | null;
  planBranchId: string | null;
  subBranchId: string | null;
  branchId: string;
  hoursFrom: number | null;
  hoursTo: number | null;
  nowMinutes: number;
  minutesSinceLastEntry: number | null;
  lastEntryBranchId: string | null;
  otherBranchEntriesThisMonth: number;
  otherEntriesMonth: number;
  inside: number;
  capacity: number;
};

/**
 * Regras de acesso, pela ordem de RN-04: estado, âmbito do plano, horário,
 * anti-passback e lotação. A primeira que falha dá o motivo mostrado.
 */
export function evaluateAccess(f: AccessFacts, s: Pick<Settings, 'antiPassbackMinutes'>): { ok: boolean; reason: string | null; warning: string | null } {
  const no = (reason: string) => ({ ok: false, reason, warning: null });
  if (f.status === 'sem_plano') return no('Sem plano activo.');
  if (f.status === 'pendente') return no('Plano à espera de pagamento.');
  if (f.status === 'congelado') return no('Plano congelado.');
  if (f.status === 'bloqueado') return no(`Plano expirou há ${-(f.days ?? 0)} dias.`);
  const base = f.planBranchId ?? f.subBranchId;
  if ((f.scope === 'local' || f.scope === 'horario') && base !== f.branchId) return no('O plano não dá acesso a esta filial.');
  if (f.scope === 'hibrido' && base !== f.branchId && f.otherBranchEntriesThisMonth >= f.otherEntriesMonth) return no(`Já usou as ${f.otherEntriesMonth} entradas deste mês noutras filiais.`);
  if (f.hoursFrom != null && f.hoursTo != null && (f.nowMinutes < f.hoursFrom * 60 || f.nowMinutes >= f.hoursTo * 60)) return no(`O plano só dá acesso das ${String(f.hoursFrom).padStart(2, '0')}:00 às ${String(f.hoursTo).padStart(2, '0')}:00.`);
  if (f.minutesSinceLastEntry !== null && f.minutesSinceLastEntry < s.antiPassbackMinutes) return no(`Já entrou há ${f.minutesSinceLastEntry} min.`);
  if (f.lastEntryBranchId && f.lastEntryBranchId !== f.branchId && f.minutesSinceLastEntry !== null && f.minutesSinceLastEntry < 60) return no('Entrou noutra filial há menos de uma hora.');
  if (f.inside >= f.capacity) return no('Lotação máxima atingida.');
  const warning = f.status === 'em_divida' ? `Mensalidade em atraso há ${-(f.days ?? 0)} dias. Cobrar.` : f.status === 'a_vencer' ? `Plano vence em ${f.days} dias.` : null;
  return { ok: true, reason: null, warning };
}

/** Controlo de acesso (RF-ACE): QR dinâmico, validação, entrada manual, lotação e presentes. */
@Injectable()
export class AccessService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    @Inject(ENV) private readonly env: Env,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly settings: SettingsService,
    private readonly approvals: ApprovalsService,
  ) {}

  /** RF-ACE-01 · QR do membro, renovado a cada 30 s. */
  myQr(ctx: AuthCtx) {
    if (!ctx.memberId) throw forbidden('Só membros têm QR de acesso.');
    return qrToken(this.env.QR_SECRET, ctx.orgId, ctx.memberId, this.clock.now().getTime());
  }

  private async inside(tx: Tx, branchId: string, s: Settings) {
    const since = new Date(this.clock.now().getTime() - s.avgStayMinutes * 60_000);
    const rows = await tx
      .select({ memberId: checkins.memberId, createdAt: checkins.createdAt })
      .from(checkins)
      .where(and(eq(checkins.branchId, branchId), inArray(checkins.result, ['entrou', 'manual']), gte(checkins.createdAt, since)))
      .orderBy(desc(checkins.createdAt));
    const seen = new Map<string, Date>();
    for (const r of rows) if (!seen.has(r.memberId)) seen.set(r.memberId, r.createdAt);
    return seen;
  }

  private async facts(tx: Tx, orgId: string, memberId: string, branchId: string, s: Settings): Promise<{ facts: AccessFacts; member: typeof members.$inferSelect }> {
    const [member] = await tx.select().from(members).where(eq(members.id, memberId));
    if (!member) throw notFound('Membro');
    const [branch] = await tx.select().from(branches).where(eq(branches.id, branchId));
    if (!branch) throw notFound('Filial');
    const subs = await tx.select().from(subscriptions).where(eq(subscriptions.memberId, memberId));
    const st = memberStatus(subs, this.clock.today(), s);
    const plan = st.sub ? (await tx.select().from(plans).where(eq(plans.id, st.sub.planId)))[0] : undefined;
    const now = this.clock.now();
    const [last] = await tx
      .select()
      .from(checkins)
      .where(and(eq(checkins.memberId, memberId), inArray(checkins.result, ['entrou', 'manual'])))
      .orderBy(desc(checkins.createdAt))
      .limit(1);
    const monthStart = new Date(`${this.clock.today().slice(0, 7)}-01T00:00:00+01:00`);
    const base = plan?.branchId ?? st.sub?.branchId ?? member.baseBranchId;
    const other = await tx
      .select({ id: checkins.id })
      .from(checkins)
      .where(and(eq(checkins.memberId, memberId), inArray(checkins.result, ['entrou', 'manual']), ne(checkins.branchId, base), gte(checkins.createdAt, monthStart)));
    const inside = await this.inside(tx, branchId, s);
    void orgId;
    return {
      member,
      facts: {
        status: st.status,
        days: st.days,
        scope: plan?.scope ?? null,
        planBranchId: plan?.branchId ?? null,
        subBranchId: st.sub?.branchId ?? null,
        branchId,
        hoursFrom: plan?.hoursFrom ?? null,
        hoursTo: plan?.hoursTo ?? null,
        nowMinutes: luandaMinutes(now),
        minutesSinceLastEntry: last ? Math.floor((now.getTime() - last.createdAt.getTime()) / 60_000) : null,
        lastEntryBranchId: last?.branchId ?? null,
        otherBranchEntriesThisMonth: other.length,
        otherEntriesMonth: plan?.otherEntriesMonth ?? 0,
        inside: inside.has(memberId) ? inside.size - 1 : inside.size,
        capacity: branch.capacity,
      },
    };
  }

  /** RF-ACE-02 · valida e regista a entrada (QR, catraca ou pesquisa na recepção). */
  async validate(ctx: AuthCtx, input: { branchId: string; qr?: string; memberId?: string; method: 'qr' | 'catraca'; deviceAt?: Date }) {
    if (!canSeeBranch(ctx, input.branchId)) throw forbidden('Não pode validar entradas nesta filial.');
    const memberId = input.qr ? readQr(this.env.QR_SECRET, ctx.orgId, input.qr, this.clock.now().getTime()) : (input.memberId ?? null);
    if (!memberId) throw new DomainError('QR_INVALIDO', 'QR expirado ou inválido. Peça ao membro para abrir o QR de novo.', 400);
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const { facts, member } = await this.facts(tx, ctx.orgId, memberId, input.branchId, s);
      const r = evaluateAccess(facts, s);
      const id = uuidv7();
      await tx.insert(checkins).values({ id, orgId: ctx.orgId, branchId: input.branchId, memberId, result: r.ok ? 'entrou' : 'recusado', reason: r.reason ?? r.warning, method: input.method, createdBy: ctx.userId, deviceAt: input.deviceAt ?? null });
      // O vigilante vê só nome, número e estado (RNF-06).
      return { id, entra: r.ok, motivo: r.reason, aviso: r.warning, membro: { id: member.id, nome: member.name, numero: member.number, estado: facts.status, dias: facts.days } };
    });
  }

  /** RF-ACE-04 · entrada manual com motivo; se o membro seria recusado, é um pedido de aprovação (RN-08). */
  async manual(ctx: AuthCtx, input: { branchId: string; memberId: string; reason: string }) {
    if (!canSeeBranch(ctx, input.branchId)) throw forbidden();
    if (input.reason.trim().length < 5) throw new DomainError('MOTIVO_EM_FALTA', 'Escreva o motivo da entrada manual.');
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const { facts } = await this.facts(tx, ctx.orgId, input.memberId, input.branchId, s);
      const r = evaluateAccess(facts, s);
      if (!r.ok && !hasRole(ctx, 'gerente')) {
        const req = await this.approvals.requestInTx(tx, ctx, { kind: 'entrada_manual', branchId: input.branchId, payload: { memberId: input.memberId, branchId: input.branchId, blockedReason: r.reason }, reason: input.reason });
        return { entra: false, motivo: r.reason, aprovacao: req };
      }
      const id = await this.recordManual(tx, ctx, input.memberId, input.branchId, input.reason);
      return { id, entra: true, motivo: null, aviso: r.ok ? r.warning : `Entrada autorizada apesar de: ${r.reason}` };
    });
  }

  async recordManual(tx: Tx, ctx: AuthCtx, memberId: string, branchId: string, reason: string) {
    const id = uuidv7();
    await tx.insert(checkins).values({ id, orgId: ctx.orgId, branchId, memberId, result: 'manual', reason, method: 'manual', createdBy: ctx.userId });
    await this.audit.record(tx, ctx, 'acesso.manual', 'checkin', id, { memberId, branchId, reason });
    return id;
  }

  /** RF-ACE-05 · lotação ao vivo por check-in (visível ao membro). */
  occupancy(ctx: AuthCtx, branchId: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const [branch] = await tx.select().from(branches).where(eq(branches.id, branchId));
      if (!branch) throw notFound('Filial');
      const n = (await this.inside(tx, branchId, s)).size;
      const pct = Math.round((n / branch.capacity) * 100);
      return { filialId: branchId, pessoas: n, capacidade: branch.capacity, percentagem: pct, nivel: n < branch.capacity * 0.42 ? 'Tranquilo' : n < branch.capacity * 0.71 ? 'Moderado' : 'Cheio' };
    });
  }

  /** RF-ACE-06 · membros presentes agora (só equipa). */
  present(ctx: AuthCtx, branchId: string) {
    if (!hasRole(ctx, 'rececao', 'gerente', 'financas', 'pt', 'vigilante')) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const s = await this.settings.get(tx, ctx.orgId);
      const inside = await this.inside(tx, branchId, s);
      if (!inside.size) return [];
      const list = await tx.select({ id: members.id, name: members.name, number: members.number }).from(members).where(inArray(members.id, [...inside.keys()]));
      const now = this.clock.now().getTime();
      return list.map((m) => ({ ...m, entrou: inside.get(m.id)!, minutos: Math.floor((now - inside.get(m.id)!.getTime()) / 60_000) })).sort((a, b) => b.entrou.getTime() - a.entrou.getTime());
    });
  }
}
