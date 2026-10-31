import { Inject, Injectable, Logger } from '@nestjs/common';
import { and, asc, eq, inArray, lte, sql } from 'drizzle-orm';
import { Clock } from '../common/clock.js';
import { uuidv7 } from '../common/ids.js';
import { DATABASE, type Database, type Tx } from '../db/database.js';
import { members, messageLog, notifications, organizations, outbox, staff, subscriptions } from '../db/schema.js';
import { MESSAGE_PROVIDER, type MessageProvider } from './providers.js';
import { effectiveRules } from './rules.js';
import { PUSH_TEMPLATES, render, ruleOf, SERVICE_TEMPLATES } from './templates.js';

/** Utilizador técnico dos processos automáticos (aparece na auditoria e nos eventos). */
export const SYSTEM_USER = '00000000-0000-0000-0000-000000000000';

/** Esperas entre tentativas, em minutos (RNF-53). Depois da última, a mensagem fica "falhou". */
export const BACKOFF_MIN = [1, 5, 15, 60, 240];

type Row = typeof outbox.$inferSelect;
type Recipient = { to: string; memberId: string | null; vars: Record<string, unknown> };

/**
 * Envia o outbox (RNF-53, RF-AVI-03).
 *  - push → notificações na app de cada pessoa do destino (perfil, filial, utilizador, membro);
 *  - sms/whatsapp → fornecedor de mensagens, um registo por destinatário em message_log.
 * Cada mensagem é tratada na sua transacção, dentro da organização (RLS).
 * Falhas temporárias voltam a tentar com espera crescente; destinatários já
 * servidos não recebem a mensagem duas vezes.
 */
@Injectable()
export class DispatcherService {
  private readonly log = new Logger('Envios');
  private running = false;

  constructor(
    @Inject(DATABASE) private readonly database: Database,
    @Inject(MESSAGE_PROVIDER) private readonly provider: MessageProvider,
    private readonly clock: Clock,
  ) {}

  /** Organizações com mensagens prontas a enviar (papel muntu_worker: só vê ids). */
  async dueOrgs(): Promise<string[]> {
    const now = this.clock.now();
    return this.database.db.transaction(async (tx) => {
      await tx.execute(sql`SET LOCAL ROLE muntu_worker`);
      const rows = await tx.selectDistinct({ orgId: outbox.orgId }).from(outbox).where(and(eq(outbox.status, 'pendente'), lte(outbox.nextAttemptAt, now))).limit(200);
      return rows.map((r) => r.orgId);
    });
  }

  /** Uma passagem: envia tudo o que está pronto. Devolve quantas mensagens tratou. */
  async runOnce(limitPerOrg = 200): Promise<{ enviadas: number; falhadas: number; canceladas: number }> {
    if (this.running) return { enviadas: 0, falhadas: 0, canceladas: 0 };
    this.running = true;
    const out = { enviadas: 0, falhadas: 0, canceladas: 0 };
    try {
      for (const orgId of await this.dueOrgs()) {
        const ctx = { orgId, userId: SYSTEM_USER };
        const ids = await this.database.withOrg(ctx, async (tx) =>
          (await tx.select({ id: outbox.id }).from(outbox).where(and(eq(outbox.status, 'pendente'), lte(outbox.nextAttemptAt, this.clock.now()))).orderBy(asc(outbox.createdAt)).limit(limitPerOrg)).map((r) => r.id),
        );
        for (const id of ids) {
          const r = await this.database.withOrg(ctx, (tx) => this.process(tx, orgId, id));
          if (r === 'enviado') out.enviadas++;
          else if (r === 'cancelado') out.canceladas++;
          else if (r) out.falhadas++;
        }
      }
    } finally {
      this.running = false;
    }
    return out;
  }

  private async process(tx: Tx, orgId: string, id: string): Promise<'enviado' | 'falhou' | 'repetir' | 'cancelado' | null> {
    const [row] = await tx.select().from(outbox).where(and(eq(outbox.id, id), eq(outbox.status, 'pendente'))).for('update', { skipLocked: true });
    if (!row) return null;
    const [org] = await tx.select({ name: organizations.name }).from(organizations).where(eq(organizations.id, orgId));
    const base = { ...row.payload, ginasio: org?.name ?? 'MUNTU', tipo: row.payload.kind ?? row.payload.tipo, estado: row.payload.status ?? row.payload.estado };
    if (row.channel === 'push') return this.push(tx, row, base);
    return this.message(tx, row, base);
  }

  private async finish(tx: Tx, row: Row, status: 'enviado' | 'cancelado', note?: string) {
    await tx.update(outbox).set({ status, sentAt: this.clock.now(), attempts: row.attempts + 1, lastError: note ?? null }).where(eq(outbox.id, row.id));
    return status;
  }

  private async retry(tx: Tx, row: Row, error: string) {
    const attempts = row.attempts + 1;
    if (attempts >= BACKOFF_MIN.length) {
      await tx.update(outbox).set({ status: 'falhou', attempts, lastError: error }).where(eq(outbox.id, row.id));
      this.log.warn(`Mensagem ${row.id} (${row.template}) falhou de vez: ${error}`);
      return 'falhou' as const;
    }
    const next = new Date(this.clock.now().getTime() + BACKOFF_MIN[attempts - 1]! * 60_000);
    await tx.update(outbox).set({ attempts, nextAttemptAt: next, lastError: error }).where(eq(outbox.id, row.id));
    return 'repetir' as const;
  }

  // ---------------------------------------------------------------- push

  /** Utilizadores de um destino: `perfil:gerente`, `filial:<id>:rececao`, `utilizador:<id>`, `membro:<id>`. */
  private async users(tx: Tx, target: string): Promise<string[]> {
    const [kind, a, b] = target.split(':');
    if (kind === 'utilizador' && a) return [a];
    if (kind === 'membro' && a) {
      const [m] = await tx.select({ userId: members.userId }).from(members).where(eq(members.id, a));
      return m?.userId ? [m.userId] : [];
    }
    const team = await tx.select({ userId: staff.userId, role: staff.role, branchIds: staff.branchIds }).from(staff).where(eq(staff.active, true));
    if (kind === 'perfil' && a) return [...new Set(team.filter((s) => s.role === a).map((s) => s.userId))];
    if (kind === 'filial' && a && b) return [...new Set(team.filter((s) => s.role === b && (s.branchIds === null || s.branchIds.includes(a))).map((s) => s.userId))];
    return [];
  }

  private async push(tx: Tx, row: Row, vars: Record<string, unknown>) {
    const tpl = PUSH_TEMPLATES[row.template] ?? { title: 'MUNTU', body: row.template };
    const people = await this.users(tx, row.target);
    for (const userId of people) {
      await tx
        .insert(notifications)
        .values({ id: uuidv7(), orgId: row.orgId, userId, outboxId: row.id, kind: row.template, title: render(tpl.title, vars), body: render(tpl.body, vars), data: row.payload })
        .onConflictDoNothing();
    }
    // Um destino sem ninguém (ex.: ainda não há gerente) não é erro: fica registado.
    return this.finish(tx, row, 'enviado', people.length ? undefined : 'Sem destinatários.');
  }

  // ---------------------------------------------------------------- sms / whatsapp

  /** Destinatários: telefone directo, `membro:<id>` ou `plano:<id>` (membros com subscrição activa nesse plano). */
  private async recipients(tx: Tx, target: string): Promise<Recipient[]> {
    if (/^9\d{8}$/.test(target)) {
      const [m] = await tx.select({ id: members.id, name: members.name }).from(members).where(eq(members.phone, target));
      return [{ to: target, memberId: m?.id ?? null, vars: m ? { nome: m.name.split(' ')[0] } : {} }];
    }
    const [kind, id] = target.split(':');
    if (kind === 'membro' && id) {
      const [m] = await tx.select({ id: members.id, name: members.name, phone: members.phone }).from(members).where(eq(members.id, id));
      return m ? [{ to: m.phone, memberId: m.id, vars: { nome: m.name.split(' ')[0] } }] : [];
    }
    if (kind === 'plano' && id) {
      const rows = await tx.selectDistinct({ id: members.id, name: members.name, phone: members.phone }).from(subscriptions).innerJoin(members, eq(members.id, subscriptions.memberId)).where(and(eq(subscriptions.planId, id), eq(subscriptions.status, 'activa')));
      return rows.map((m) => ({ to: m.phone, memberId: m.id, vars: { nome: m.name.split(' ')[0] } }));
    }
    return [];
  }

  private async message(tx: Tx, row: Row, vars: Record<string, unknown>) {
    const ruleKind = ruleOf(row.template);
    let template = row.template === 'manual' ? String(row.payload.texto ?? '') || null : (SERVICE_TEMPLATES[row.template] ?? null);
    let channel = row.channel as 'sms' | 'whatsapp';
    if (ruleKind) {
      const rule = (await effectiveRules(tx, row.orgId))[ruleKind];
      if (!rule.enabled) return this.finish(tx, row, 'cancelado', 'Regra desligada pelo dono.');
      template = rule.template;
      channel = rule.channel;
    }
    if (!template) return this.finish(tx, row, 'cancelado', `Modelo desconhecido: ${row.template}`);
    const list = await this.recipients(tx, row.target);
    if (!list.length) return this.finish(tx, row, 'cancelado', 'Sem destinatários.');
    const done = new Set((await tx.select({ to: messageLog.recipient }).from(messageLog).where(and(eq(messageLog.outboxId, row.id), inArray(messageLog.status, ['enviado', 'entregue'])))).map((r) => r.to));
    let lastError: string | null = null;
    let retry = false;
    for (const r of list) {
      if (done.has(r.to)) continue;
      const body = render(template, { ...vars, ...r.vars, nome: vars.nome ? String(vars.nome).split(' ')[0] : r.vars.nome });
      const res = await this.provider.send(channel, r.to, body);
      await tx.insert(messageLog).values({ id: uuidv7(), orgId: row.orgId, outboxId: row.id, channel, template: row.template, recipient: r.to, memberId: r.memberId, body, status: res.ok ? 'enviado' : 'falhou', providerRef: res.ok ? res.ref : null, error: res.ok ? null : res.error });
      if (!res.ok) {
        lastError = res.error;
        retry ||= res.retry;
      }
    }
    if (!lastError) return this.finish(tx, row, 'enviado');
    if (!retry) {
      await tx.update(outbox).set({ status: 'falhou', attempts: row.attempts + 1, lastError }).where(eq(outbox.id, row.id));
      return 'falhou';
    }
    return this.retry(tx, row, lastError);
  }
}
