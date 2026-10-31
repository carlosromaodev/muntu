import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { canSeeBranch, hasRole, type AuthCtx } from '../auth/context.js';
import { DomainError, forbidden, notFound } from '../common/errors.js';
import { uuidv7 } from '../common/ids.js';
import { AuditService } from '../core/audit.service.js';
import { CountersService } from '../core/counters.service.js';
import { OutboxService } from '../core/outbox.service.js';
import { DATABASE, type Database } from '../db/database.js';
import { incidentEvents, incidents, members } from '../db/schema.js';
import { TasksService } from '../tasks/tasks.service.js';

export const MEMBER_TYPES = ['Equipamento', 'Limpeza', 'Segurança', 'Atendimento', 'Lesão', 'Outro'] as const;
export const STAFF_TYPES = ['Equipamento', 'Instalações', 'Segurança', 'Membro', 'Acidente', 'Sistema', 'Outro'] as const;
export const ZONES = ['Musculação', 'Cardio', 'Sala de aulas', 'Balneários', 'Recepção', 'Entrada e parque'] as const;

export type IncidentInput = { branchId: string; type: string; zone: string; equipment?: string; description: string; photoUrl?: string; hurt?: boolean; anonymous?: boolean; urgency?: 'baixa' | 'media' | 'alta'; routeTo?: 'manutencao' | 'gestao' | 'rececao' };

/** Ocorrências de membros e da equipa (RF-OCO, RN-60 a RN-64). */
@Injectable()
export class IncidentsService {
  constructor(
    @Inject(DATABASE) private readonly database: Database,
    private readonly audit: AuditService,
    private readonly counters: CountersService,
    private readonly outbox: OutboxService,
    private readonly tasks: TasksService,
  ) {}

  async create(ctx: AuthCtx, input: IncidentInput) {
    const isStaff = ctx.roles.some((r) => r !== 'membro');
    const types: readonly string[] = isStaff ? STAFF_TYPES : MEMBER_TYPES;
    if (!types.includes(input.type)) throw new DomainError('TIPO_INVALIDO', 'Escolha o tipo de ocorrência.');
    if (!(ZONES as readonly string[]).includes(input.zone)) throw new DomainError('ZONA_INVALIDA', 'Indique onde aconteceu.');
    if (input.type === 'Equipamento' && !input.equipment?.trim()) throw new DomainError('EQUIPAMENTO_EM_FALTA', 'Diga qual é o equipamento.');
    const desc = input.description.trim();
    if (desc.length < 10 || desc.length > 400) throw new DomainError('DESCRICAO_INVALIDA', 'Descreva o que aconteceu em 10 a 400 caracteres.');
    if (isStaff && !canSeeBranch(ctx, input.branchId)) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const number = await this.counters.next(tx, ctx.orgId, 'ocorrencia', 1);
      const code = `OC-${String(number).padStart(4, '0')}`;
      const urgency = isStaff ? (input.urgency ?? 'media') : input.hurt ? 'alta' : 'media';
      const urgent = urgency === 'alta' || !!input.hurt;
      const id = uuidv7();
      await tx.insert(incidents).values({ id, orgId: ctx.orgId, branchId: input.branchId, number, code, reporterKind: isStaff ? 'equipa' : 'membro', reporterUserId: ctx.userId, anonymous: !isStaff && !!input.anonymous, type: input.type, zone: input.zone, equipment: input.equipment?.trim() || null, description: desc, photoUrl: input.photoUrl ?? null, hurt: !!input.hurt, urgency, routeTo: isStaff ? (input.routeTo ?? 'manutencao') : null, status: 'recebida' });
      await tx.insert(incidentEvents).values({ id: uuidv7(), orgId: ctx.orgId, incidentId: id, status: 'recebida', byUser: ctx.userId });
      if (urgent) {
        // RN-60 · urgente: recepção e gestor avisados de imediato.
        for (const target of [`filial:${input.branchId}:rececao`, `filial:${input.branchId}:gerente`, 'perfil:dono']) await this.outbox.enqueue(tx, ctx.orgId, 'push', target, 'ocorrencia.urgente', { code, type: input.type, zone: input.zone, hurt: !!input.hurt });
      }
      // RN-64 · ocorrências da equipa ficam nas pendências até serem resolvidas.
      if (isStaff) await this.tasks.createInTx(tx, ctx, { branchId: input.branchId, kind: 'ocorrencia', title: `${code} · ${input.type} · ${input.zone}`, detail: desc, originType: 'incident', originId: id });
      await this.audit.record(tx, ctx, 'ocorrencia.criada', 'incident', id, { code, type: input.type, urgency });
      const message = urgent ? 'Marcada como urgente. A recepção e o gestor foram avisados agora.' : isStaff ? `Encaminhada a ${input.routeTo ?? 'manutencao'}. Fica nas pendências até ser resolvida.` : 'A equipa responde em até 24 horas. Recebes um SMS quando houver novidades.';
      return { id, code, urgency, status: 'recebida', mensagem: message };
    });
  }

  /** Membros vêem as suas; a equipa vê as das suas filiais (sem o autor das anónimas, RN-63). */
  list(ctx: AuthCtx) {
    return this.database.withOrg(ctx, async (tx) => {
      const isStaff = ctx.roles.some((r) => r !== 'membro');
      const rows = await tx
        .select()
        .from(incidents)
        .where(and(eq(incidents.orgId, ctx.orgId), isStaff ? undefined : eq(incidents.reporterUserId, ctx.userId)))
        .orderBy(desc(incidents.createdAt))
        .limit(200);
      return rows.filter((r) => !isStaff || canSeeBranch(ctx, r.branchId)).map((r) => (isStaff && r.anonymous && !ctx.roles.includes('dono') ? { ...r, reporterUserId: null } : r));
    });
  }

  /** RF-OCO-03 · muda o estado e avisa o membro por SMS. */
  async setStatus(ctx: AuthCtx, id: string, status: 'em_analise' | 'resolvida', note?: string) {
    if (!hasRole(ctx, 'rececao', 'gerente', 'financas')) throw forbidden();
    return this.database.withOrg(ctx, async (tx) => {
      const [inc] = await tx.select().from(incidents).where(eq(incidents.id, id));
      if (!inc) throw notFound('Ocorrência');
      if (!canSeeBranch(ctx, inc.branchId)) throw forbidden();
      await tx.update(incidents).set({ status }).where(eq(incidents.id, id));
      await tx.insert(incidentEvents).values({ id: uuidv7(), orgId: ctx.orgId, incidentId: id, status, note: note ?? null, byUser: ctx.userId });
      if (inc.reporterKind === 'membro') {
        const [m] = await tx.select({ phone: members.phone, name: members.name }).from(members).where(eq(members.userId, inc.reporterUserId));
        if (m) await this.outbox.enqueue(tx, ctx.orgId, 'sms', m.phone, 'ocorrencia.estado', { nome: m.name, code: inc.code, status }, `oc:${id}:${status}`);
      }
      if (status === 'resolvida') await this.tasks.resolveByOrigin(tx, ctx, 'incident', id, note?.trim() || `Ocorrência ${inc.code} resolvida.`);
      await this.audit.record(tx, ctx, 'ocorrencia.estado', 'incident', id, { status, note: note ?? null }, { status: inc.status });
      return { id, code: inc.code, status };
    });
  }
}
