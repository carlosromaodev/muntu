import { Inject, Injectable } from '@nestjs/common';
import { and, eq, gte, inArray, isNotNull, lt, sql } from 'drizzle-orm';
import { addDays, Clock, luandaMinutes } from '../common/clock.js';
import { kz } from '../common/money.js';
import { OutboxService } from '../core/outbox.service.js';
import { SettingsService } from '../core/settings.service.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { checkins, members, organizations, plans, subscriptions } from '../db/schema.js';
import { SYSTEM_USER } from './dispatcher.service.js';
import { effectiveRules } from './rules.js';
import type { RuleKind } from './templates.js';

const fmt = (d: string) => `${d.slice(8, 10)}/${d.slice(5, 7)}`;

/**
 * Lembretes automáticos (RN-75, RF-AVI-02). Corre várias vezes por dia; cada
 * regra só gera mensagens a partir da sua hora de envio, e cada mensagem tem uma
 * chave única (regra + subscrição + data), por isso nunca sai duas vezes.
 */
@Injectable()
export class RemindersService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly outbox: OutboxService,
    private readonly settings: SettingsService,
  ) {}

  async allOrgs(): Promise<string[]> {
    return this.database.db.transaction(async (tx) => {
      await tx.execute(sql`SET LOCAL ROLE muntu_worker`);
      return (await tx.select({ id: organizations.id }).from(organizations)).map((r) => r.id);
    });
  }

  async runOnce(): Promise<number> {
    let n = 0;
    for (const orgId of await this.allOrgs()) n += await this.database.withOrg({ orgId, userId: SYSTEM_USER }, (tx) => this.forOrg(tx, orgId));
    return n;
  }

  /** Subscrições activas que acabam numa data e ainda não têm sucessora (renovação). */
  private endingOn(tx: Tx, date: string) {
    return tx
      .select({ subId: subscriptions.id, memberId: members.id, name: members.name, phone: members.phone, endsOn: subscriptions.endsOn, price: subscriptions.priceCents, plan: plans.name })
      .from(subscriptions)
      .innerJoin(members, eq(members.id, subscriptions.memberId))
      .innerJoin(plans, eq(plans.id, subscriptions.planId))
      .where(
        and(
          eq(subscriptions.status, 'activa'),
          eq(subscriptions.endsOn, date),
          eq(plans.isTrial, false),
          sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.status = 'activa' and s2.ends_on > ${subscriptions.endsOn})`,
        ),
      );
  }

  async forOrg(tx: Tx, orgId: string): Promise<number> {
    const today = this.clock.today();
    const hour = Math.floor(luandaMinutes(this.clock.now()) / 60);
    const rules = await effectiveRules(tx, orgId);
    const s = await this.settings.get(tx, orgId);
    const due = (k: RuleKind) => rules[k].enabled && hour >= rules[k].sendHour;
    let n = 0;
    const send = async (kind: RuleKind, phone: string, payload: Record<string, unknown>, key: string) => {
      await this.outbox.enqueue(tx, orgId, rules[kind].channel, phone, `regra.${kind}`, payload, `regra:${kind}:${key}`);
      n++;
    };

    const byDate: [RuleKind, string][] = [
      ['vence_3d', addDays(today, 3)],
      ['vence_hoje', today],
      ['em_atraso', addDays(today, -3)],
      ['bloqueado', addDays(today, -s.toleranceDays)],
    ];
    for (const [kind, date] of byDate) {
      if (!due(kind)) continue;
      for (const r of await this.endingOn(tx, date)) {
        await send(kind, r.phone, { nome: r.name, valor: kz(r.price), data: fmt(r.endsOn!), bloqueio: fmt(addDays(r.endsOn!, s.toleranceDays)), plano: r.plan }, `${r.subId}:${r.endsOn}`);
      }
    }

    if (due('boas_vindas')) {
      const rows = await tx
        .select({ subId: subscriptions.id, name: members.name, phone: members.phone, endsOn: subscriptions.endsOn, plan: plans.name })
        .from(subscriptions)
        .innerJoin(members, eq(members.id, subscriptions.memberId))
        .innerJoin(plans, eq(plans.id, subscriptions.planId))
        .where(and(eq(subscriptions.status, 'activa'), eq(subscriptions.startsOn, today), sql`not exists (select 1 from subscriptions s2 where s2.member_id = ${subscriptions.memberId} and s2.id <> ${subscriptions.id} and s2.starts_on < ${today})`));
      for (const r of rows) await send('boas_vindas', r.phone, { nome: r.name, plano: r.plan, data: r.endsOn ? fmt(r.endsOn) : '' }, r.subId);
    }

    if (due('aniversario')) {
      const md = today.slice(5);
      const rows = await tx.select({ id: members.id, name: members.name, phone: members.phone }).from(members).where(and(isNotNull(members.birthDate), sql`to_char(${members.birthDate}, 'MM-DD') = ${md}`));
      for (const r of rows) await send('aniversario', r.phone, { nome: r.name }, `${r.id}:${today.slice(0, 4)}`);
    }

    if (due('saudades')) {
      // Membros com plano activo cuja última entrada foi há exactamente 14 dias.
      const since = new Date(`${addDays(today, -14)}T00:00:00+01:00`);
      const until = new Date(`${addDays(today, -13)}T00:00:00+01:00`);
      const last = await tx
        .select({ memberId: checkins.memberId, last: sql<Date>`max(${checkins.createdAt})`.as('last') })
        .from(checkins)
        .where(inArray(checkins.result, ['entrou', 'manual']))
        .groupBy(checkins.memberId)
        .having(and(gte(sql`max(${checkins.createdAt})`, since), lt(sql`max(${checkins.createdAt})`, until)));
      if (last.length) {
        const rows = await tx
          .selectDistinct({ id: members.id, name: members.name, phone: members.phone })
          .from(members)
          .innerJoin(subscriptions, eq(subscriptions.memberId, members.id))
          .where(and(inArray(members.id, last.map((l) => l.memberId)), eq(subscriptions.status, 'activa'), gte(subscriptions.endsOn, today)));
        for (const r of rows) await send('saudades', r.phone, { nome: r.name, dias: 14 }, `${r.id}:${today}`);
      }
    }
    return n;
  }
}
