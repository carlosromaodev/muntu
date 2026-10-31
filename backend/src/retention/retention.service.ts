import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, gte, inArray, lt, sql } from 'drizzle-orm';
import { canSeeBranch, type AuthCtx } from '../auth/context.js';
import { addDays, Clock, daysBetween } from '../common/clock.js';
import { forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { AuditService } from '../core/audit.service.js';
import { SettingsService } from '../core/settings.service.js';
import { DATABASE, type Database } from '../db/database.js';
import { checkins, memberContacts, members, plans, subscriptions, users, type ContactOutcome } from '../db/schema.js';
import { TasksService } from '../tasks/tasks.service.js';

const dayStart = (d: string) => new Date(`${d}T00:00:00+01:00`);

export type Signal = { codigo: string; descricao: string; peso: number };

/**
 * Membros em risco (RF-RET-01) e registo de contactos (RF-RET-03).
 * O risco junta sinais simples e explicáveis; cada membro mostra porquê.
 */
@Injectable()
export class RetentionService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly settings: SettingsService,
    private readonly tasks: TasksService,
  ) {}

  atRisk(ctx: AuthCtx, q: { branchId?: string }) {
    if (q.branchId && !canSeeBranch(ctx, q.branchId)) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const today = this.clock.today();
      const s = await this.settings.get(tx, ctx.orgId);
      // Última subscrição activa de cada membro, incluindo quem está na tolerância.
      const subs = await tx
        .select({ memberId: members.id, name: members.name, phone: members.phone, branchId: subscriptions.branchId, endsOn: subscriptions.endsOn, startsOn: subscriptions.startsOn, plan: plans.name, price: plans.priceCents, trial: plans.isTrial })
        .from(subscriptions)
        .innerJoin(members, eq(members.id, subscriptions.memberId))
        .innerJoin(plans, eq(plans.id, subscriptions.planId))
        .where(
          and(
            q.branchId ? eq(subscriptions.branchId, q.branchId) : undefined,
            eq(subscriptions.status, 'activa'),
            gte(subscriptions.endsOn, addDays(today, -s.toleranceDays)),
            sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.status in ('activa','congelada') and s2.ends_on > ${subscriptions.endsOn})`,
          ),
        );
      const visible = subs.filter((x) => canSeeBranch(ctx, x.branchId));
      if (!visible.length) return [];
      const ids = visible.map((x) => x.memberId);
      const d14 = dayStart(addDays(today, -14));
      const d42 = dayStart(addDays(today, -42));
      const counts = await tx
        .select({
          memberId: checkins.memberId,
          recent: sql<string>`count(*) filter (where ${checkins.createdAt} >= ${d14})`,
          before: sql<string>`count(*) filter (where ${checkins.createdAt} < ${d14})`,
          last: sql<Date>`max(${checkins.createdAt})`,
        })
        .from(checkins)
        .where(and(inArray(checkins.memberId, ids), inArray(checkins.result, ['entrou', 'manual']), gte(checkins.createdAt, d42)))
        .groupBy(checkins.memberId);
      const lastEver = await tx.select({ memberId: checkins.memberId, last: sql<Date>`max(${checkins.createdAt})` }).from(checkins).where(and(inArray(checkins.memberId, ids), inArray(checkins.result, ['entrou', 'manual']))).groupBy(checkins.memberId);
      const contacts = await tx.select().from(memberContacts).where(inArray(memberContacts.memberId, ids)).orderBy(desc(memberContacts.createdAt), desc(memberContacts.id));

      const out = visible.map((m) => {
        const c = counts.find((x) => x.memberId === m.memberId);
        const recent = Number(c?.recent ?? 0);
        const before = Number(c?.before ?? 0) / 2; // por 14 dias
        const lastAt = lastEver.find((x) => x.memberId === m.memberId)?.last;
        const idle = lastAt ? daysBetween(new Date(lastAt).toISOString().slice(0, 10), today) : m.startsOn ? daysBetween(m.startsOn, today) : 0;
        const left = daysBetween(today, m.endsOn!);
        const signals: Signal[] = [];
        if (idle >= 10) signals.push({ codigo: 'sem_entradas', descricao: lastAt ? `Sem entrar há ${idle} dias` : 'Ainda não entrou', peso: idle >= 21 ? 3 : 2 });
        if (before >= 2 && recent < before / 2) signals.push({ codigo: 'frequencia_em_queda', descricao: `Frequência caiu ${Math.round((1 - recent / before) * 100)}% nas últimas 2 semanas`, peso: 2 });
        if (left < 0) signals.push({ codigo: 'em_divida', descricao: `Mensalidade vencida há ${-left} dias`, peso: 2 });
        else if (left <= 7 && !m.trial) signals.push({ codigo: 'renovacao_proxima', descricao: left === 0 ? 'Vence hoje' : `Vence em ${left} dias`, peso: 1 });
        if (m.trial && left <= 2) signals.push({ codigo: 'fim_do_teste', descricao: 'Teste grátis a acabar', peso: 1 });
        const contact = contacts.find((x) => x.memberId === m.memberId);
        const score = signals.reduce((a, x) => a + x.peso, 0);
        return { membroId: m.memberId, nome: m.name, telefone: m.phone, plano: m.plan, filialId: m.branchId, vence: m.endsOn, risco: score >= 4 ? 'alto' : score >= 2 ? 'medio' : 'baixo', pontos: score, sinais: signals, ultimoContacto: contact ? { resultado: contact.outcome, motivo: contact.reason, em: contact.createdAt } : null };
      });
      // Quem já disse que volta ou renova nos últimos 7 dias sai da lista principal.
      const weekAgo = this.clock.now().getTime() - 7 * 86_400_000;
      return out
        .filter((m) => m.pontos >= 2 && !(m.ultimoContacto && ['vai_voltar', 'voltou', 'vai_renovar', 'renovou'].includes(m.ultimoContacto.resultado) && new Date(m.ultimoContacto.em).getTime() > weekAgo))
        .sort((a, b) => b.pontos - a.pontos);
    });
  }

  /** RF-RET-03 · regista um contacto. "Sem resposta" cria uma pendência para tentar outra vez. */
  contact(ctx: AuthCtx, input: { memberId: string; channel: 'telefone' | 'sms' | 'whatsapp' | 'presencial'; reason?: (typeof memberContacts.$inferInsert)['reason']; outcome: ContactOutcome; note?: string }) {
    return this.database.withOrg(ctx, async (tx) => {
      const [m] = await tx.select().from(members).where(eq(members.id, input.memberId));
      if (!m) throw notFound('Membro');
      if (!canSeeBranch(ctx, m.baseBranchId)) throw forbidden();
      const id = uuidv7();
      await tx.insert(memberContacts).values({ id, orgId: ctx.orgId, memberId: m.id, channel: input.channel, reason: input.reason ?? null, outcome: input.outcome, note: input.note?.trim() || null, byUser: ctx.userId });
      let taskId: string | null = null;
      if (input.outcome === 'sem_resposta') {
        const t = await this.tasks.createInTx(tx, ctx, { branchId: m.baseBranchId, kind: 'retencao', title: `Voltar a contactar ${m.name}`, memberId: m.id, dueOn: addDays(this.clock.today(), 2), originType: 'retencao', originId: m.id });
        taskId = t.id;
      } else {
        await this.tasks.resolveByOrigin(tx, ctx, 'retencao', m.id, `Contacto registado: ${input.outcome.replace(/_/g, ' ')}.`);
      }
      await this.audit.record(tx, ctx, 'retencao.contacto', 'member', m.id, { channel: input.channel, reason: input.reason ?? null, outcome: input.outcome });
      return { id, pendenciaId: taskId };
    });
  }

  contacts(ctx: AuthCtx, memberId: string) {
    return this.database.withOrg(ctx, async (tx) => {
      const [m] = await tx.select({ id: members.id, branchId: members.baseBranchId }).from(members).where(eq(members.id, memberId));
      if (!m) throw notFound('Membro');
      if (!canSeeBranch(ctx, m.branchId)) throw forbidden();
      const rows = await tx.select({ c: memberContacts, by: users.name }).from(memberContacts).leftJoin(users, eq(users.id, memberContacts.byUser)).where(eq(memberContacts.memberId, memberId)).orderBy(desc(memberContacts.createdAt), desc(memberContacts.id)).limit(100);
      return rows.map((r) => ({ ...r.c, por: r.by }));
    });
  }
}
