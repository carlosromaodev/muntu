import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { cents, parse, phone, uuid } from '../common/zod.js';
import { DATABASE, type Database } from '../db/database.js';
import { MembersService, type MemberStatus } from './members.service.js';
import { PlansService } from './plans.service.js';

const CreateMember = z.object({
  nome: z.string().trim().min(2),
  telefone: phone,
  bi: z.string().trim().min(5).optional(),
  nif: z.string().trim().min(5).optional(),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  filialId: uuid,
  consentimento: z.literal(true, { message: 'O membro tem de aceitar o tratamento dos dados.' }),
  criarConta: z.boolean().default(true),
});
const Subscribe = z.object({ planoId: uuid, filialId: uuid.optional() });
const CreatePlan = z.object({
  nome: z.string().trim().min(2),
  precoCentimos: cents,
  dias: z.number().int().positive(),
  ambito: z.enum(['local', 'rede', 'hibrido', 'horario']),
  filialId: uuid.nullable().optional(),
  entradasNoutrasFiliais: z.number().int().nonnegative().optional(),
  horaInicio: z.number().int().min(0).max(23).nullable().optional(),
  horaFim: z.number().int().min(1).max(24).nullable().optional(),
  descontoMaximo: z.number().int().min(0).max(100).optional(),
  teste: z.boolean().optional(),
});
const Price = z.object({ precoCentimos: cents, motivo: z.string().trim().min(5) });

@Controller()
export class MembersController {
  constructor(
    private readonly members: MembersService,
    private readonly plans: PlansService,
    private readonly approvals: ApprovalsService,
    @Inject(DATABASE) private readonly database: Database,
  ) {}

  @Roles('gerente', 'rececao', 'financas', 'vigilante')
  @Get('membros')
  search(@Ctx() ctx: AuthCtx, @Query('q') q = '', @Query('estado') estado?: MemberStatus) {
    return this.members.search(ctx, q, estado);
  }

  @Roles('gerente', 'rececao')
  @Post('membros')
  create(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(CreateMember, body);
    return this.members.create(ctx, { name: b.nome, phone: b.telefone, bi: b.bi, nif: b.nif, birthDate: b.dataNascimento, baseBranchId: b.filialId, consent: b.consentimento, createAccount: b.criarConta });
  }

  @Get('membros/:id')
  get(@Ctx() ctx: AuthCtx, @Param('id') id: string) {
    return this.members.get(ctx, parse(uuid, id));
  }

  @Roles('gerente', 'rececao')
  @Post('membros/:id/subscricoes')
  subscribe(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Subscribe, body);
    return this.members.subscribe(ctx, parse(uuid, id), { planId: b.planoId, branchId: b.filialId });
  }

  @Get('planos')
  listPlans(@Ctx() ctx: AuthCtx) {
    return this.plans.list(ctx);
  }

  @Roles('gerente')
  @Post('planos')
  createPlan(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(CreatePlan, body);
    return this.plans.create(ctx, { name: b.nome, priceCents: b.precoCentimos, periodDays: b.dias, scope: b.ambito, branchId: b.filialId, otherEntriesMonth: b.entradasNoutrasFiliais, hoursFrom: b.horaInicio, hoursTo: b.horaFim, maxDiscountPct: b.descontoMaximo, isTrial: b.teste });
  }

  /** RN-23 · preço de plano com membros activos: pede aprovação ao dono; sem activos, muda já (só gerente/dono). */
  @Roles('gerente')
  @Patch('planos/:id/preco')
  async price(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Price, body);
    const planId = parse(uuid, id);
    return this.database.withOrg(ctx, async (tx) => {
      const active = await this.plans.activeCount(tx, planId);
      if (active === 0) return { aplicado: true, ...(await this.plans.setPrice(tx, ctx, planId, b.precoCentimos)) };
      const req = await this.approvals.requestInTx(tx, ctx, { kind: 'preco', payload: { planId, priceCents: b.precoCentimos, activeMembers: active }, amountCents: b.precoCentimos, reason: b.motivo });
      return { aplicado: false, aprovacao: req };
    });
  }
}
