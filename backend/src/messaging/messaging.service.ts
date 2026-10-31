import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, gte, isNull, lt, sql } from 'drizzle-orm';
import { hasRole, type AuthCtx } from '../auth/context.js';
import { addDays, Clock } from '../common/clock.js';
import { DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { AuditService } from '../core/audit.service.js';
import { SettingsService } from '../core/settings.service.js';
import { DATABASE, type Database } from '../db/database.js';
import { members, messageLog, messageRules, notifications, outbox, plans, subscriptions } from '../db/schema.js';
import { effectiveRules } from './rules.js';
import { DEFAULT_RULES, render, type RuleKind } from './templates.js';

export type Segment = 'activos' | 'em_divida' | 'bloqueados' | 'plano';

/** Regras de mensagens, registo de envios, envio manual e notificações na app (RF-AVI-02/03/04). */
@Injectable()
export class MessagingService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly clock: Clock,
    private readonly audit: AuditService,
    private readonly settings: SettingsService,
  ) {}

  rules(ctx: AuthCtx) {
    return this.database.withOrg(ctx, async (tx) => Object.values(await effectiveRules(tx, ctx.orgId)));
  }

  /** Muda uma regra: ligar/desligar, canal, modelo e hora. Pré-visualiza com dados de exemplo. */
  updateRule(ctx: AuthCtx, kind: RuleKind, patch: { enabled?: boolean; channel?: 'sms' | 'whatsapp'; template?: string; sendHour?: number }) {
    return this.database.withOrg(ctx, async (tx) => {
      const before = (await effectiveRules(tx, ctx.orgId))[kind];
      const next = { ...before, ...Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)) };
      if (next.channel === 'whatsapp') throw new DomainError('CANAL_INDISPONIVEL', 'O WhatsApp ainda não está ligado. Use SMS.');
      const unknown = [...next.template.matchAll(/\{(\w+)\}/g)].map((m) => m[1]!).filter((v) => !['nome', 'valor', 'data', 'bloqueio', 'plano', 'ginasio', 'factura', 'dias', 'referencia'].includes(v));
      if (unknown.length) throw new DomainError('VARIAVEL_DESCONHECIDA', `Variável desconhecida no modelo: {${unknown[0]}}.`);
      const row = { orgId: ctx.orgId, kind, enabled: next.enabled, channel: next.channel, template: next.template.trim(), sendHour: next.sendHour, updatedBy: ctx.userId, updatedAt: this.clock.now() };
      await tx.insert(messageRules).values(row).onConflictDoUpdate({ target: [messageRules.orgId, messageRules.kind], set: { enabled: row.enabled, channel: row.channel, template: row.template, sendHour: row.sendHour, updatedBy: row.updatedBy, updatedAt: row.updatedAt } });
      await this.audit.record(tx, ctx, 'mensagens.regra', 'message_rule', null, { kind, ...patch }, { enabled: before.enabled, template: before.template, sendHour: before.sendHour });
      return { ...next, exemplo: render(next.template, { nome: 'Kátia', valor: '30 000,00 Kz', data: '02/11', bloqueio: '09/11', plano: 'Local Mensal', ginasio: 'o teu ginásio', factura: 'FR TAL/2026/0142', dias: 14 }) };
    });
  }

  /** Repõe o modelo de omissão de uma regra. */
  resetRule(ctx: AuthCtx, kind: RuleKind) {
    const d = DEFAULT_RULES[kind];
    return this.updateRule(ctx, kind, { enabled: d.enabled, channel: d.channel, template: d.template, sendHour: d.sendHour });
  }

  /** RF-AVI-03 · registo de envios, com as mensagens ainda por enviar ou a repetir. */
  log(ctx: AuthCtx, q: { status?: 'enviado' | 'entregue' | 'falhou'; memberId?: string; limit?: number }) {
    return this.database.withOrg(ctx, async (tx) => {
      const sent = await tx
        .select({ log: messageLog, member: members.name })
        .from(messageLog)
        .leftJoin(members, eq(members.id, messageLog.memberId))
        .where(and(q.status ? eq(messageLog.status, q.status) : undefined, q.memberId ? eq(messageLog.memberId, q.memberId) : undefined))
        .orderBy(desc(messageLog.createdAt))
        .limit(Math.min(q.limit ?? 100, 500));
      const queued = await tx
        .select({ id: outbox.id, channel: outbox.channel, template: outbox.template, target: outbox.target, attempts: outbox.attempts, nextAttemptAt: outbox.nextAttemptAt, lastError: outbox.lastError, status: outbox.status, createdAt: outbox.createdAt })
        .from(outbox)
        .where(and(sql`${outbox.channel} <> 'push'`, sql`${outbox.status} in ('pendente','falhou')`))
        .orderBy(desc(outbox.createdAt))
        .limit(100);
      const [counts] = await tx
        .select({ enviados: sql<number>`count(*) filter (where ${messageLog.status} in ('enviado','entregue'))`, falhados: sql<number>`count(*) filter (where ${messageLog.status} = 'falhou')` })
        .from(messageLog)
        .where(gte(messageLog.createdAt, new Date(this.clock.now().getTime() - 30 * 86_400_000)));
      return {
        envios: sent.map((r) => ({ ...r.log, membro: r.member })),
        porEnviar: queued.map((o) => ({ ...o, agendado: o.status === 'pendente' })),
        ultimos30Dias: { enviados: Number(counts?.enviados ?? 0), falhados: Number(counts?.falhados ?? 0) },
      };
    });
  }

  /** RF-AVI-04 · envio manual a um segmento. Cada membro recebe uma mensagem (com o seu nome). */
  send(ctx: AuthCtx, input: { segment: Segment; planId?: string; text: string }) {
    if (!hasRole(ctx, 'gerente')) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const today = this.clock.today();
      const s = await this.settings.get(tx, ctx.orgId);
      if (input.segment === 'plano') {
        if (!input.planId) throw new DomainError('PLANO_EM_FALTA', 'Escolha o plano.');
        const [p] = await tx.select({ id: plans.id }).from(plans).where(eq(plans.id, input.planId));
        if (!p) throw notFound('Plano');
      }
      const latest = tx
        .select({ memberId: subscriptions.memberId, endsOn: sql<string>`max(${subscriptions.endsOn})`.as('ends_on') })
        .from(subscriptions)
        .where(eq(subscriptions.status, 'activa'))
        .groupBy(subscriptions.memberId)
        .as('latest');
      const base = tx.select({ id: members.id, phone: members.phone }).from(members).innerJoin(latest, eq(latest.memberId, members.id));
      const rows =
        input.segment === 'activos'
          ? await base.where(gte(latest.endsOn, today))
          : input.segment === 'em_divida'
            ? await base.where(and(lt(latest.endsOn, today), gte(latest.endsOn, addDays(today, -s.toleranceDays))))
            : input.segment === 'bloqueados'
              ? await base.where(and(lt(latest.endsOn, addDays(today, -s.toleranceDays)), gte(latest.endsOn, addDays(today, -90))))
              : await tx.selectDistinct({ id: members.id, phone: members.phone }).from(members).innerJoin(subscriptions, eq(subscriptions.memberId, members.id)).where(and(eq(subscriptions.planId, input.planId!), eq(subscriptions.status, 'activa'), gte(subscriptions.endsOn, today)));
      if (rows.length > 5000) throw new DomainError('SEGMENTO_GRANDE', 'O segmento tem mais de 5000 pessoas. Divida o envio.');
      const batch = uuidv7();
      for (const m of rows) await tx.insert(outbox).values({ id: uuidv7(), orgId: ctx.orgId, channel: 'sms', target: `membro:${m.id}`, template: 'manual', payload: { texto: input.text.trim(), lote: batch }, dedupeKey: `manual:${batch}:${m.id}` });
      await this.audit.record(tx, ctx, 'mensagens.envio_manual', 'outbox', null, { segment: input.segment, planId: input.planId ?? null, pessoas: rows.length, lote: batch });
      return { lote: batch, pessoas: rows.length, exemplo: render(input.text, { nome: 'Kátia', ginasio: 'o teu ginásio' }) };
    });
  }

  // ---------------------------------------------------------------- notificações na app

  notifications(ctx: AuthCtx, unread: boolean) {
    return this.database.withOrg(ctx, async (tx) => {
      const rows = await tx.select().from(notifications).where(and(eq(notifications.userId, ctx.userId), unread ? isNull(notifications.readAt) : undefined)).orderBy(desc(notifications.createdAt)).limit(100);
      const [c] = await tx.select({ n: sql<number>`count(*)` }).from(notifications).where(and(eq(notifications.userId, ctx.userId), isNull(notifications.readAt)));
      return { porLer: Number(c?.n ?? 0), notificacoes: rows };
    });
  }

  readNotification(ctx: AuthCtx, id: string | 'todas') {
    return this.database.withOrg(ctx, async (tx) => {
      const r = await tx
        .update(notifications)
        .set({ readAt: this.clock.now() })
        .where(and(eq(notifications.userId, ctx.userId), isNull(notifications.readAt), id === 'todas' ? undefined : eq(notifications.id, id)))
        .returning({ id: notifications.id });
      return { lidas: r.length };
    });
  }
}
