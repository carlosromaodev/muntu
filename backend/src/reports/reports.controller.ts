import { Controller, Get, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { ReportsService } from './reports.service.js';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data no formato AAAA-MM-DD.');
const Period = z.object({ filialId: uuid.optional(), de: date.optional(), ate: date.optional() });
const Finance = z.object({ filialId: uuid.optional(), dia: date.optional() });
const Renewals = z.object({ filialId: uuid.optional(), dias: z.enum(['7', '15', '30']).default('7') });

/** Painel e relatórios (RF-REL, RF-PER-03, RF-RET-02). */
@Controller('relatorios')
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Roles('gerente', 'financas')
  @Get('painel')
  dashboard(@Ctx() ctx: AuthCtx, @Query() query: unknown) {
    const q = parse(Period, query);
    return this.reports.dashboard(ctx, { branchId: q.filialId, from: q.de, to: q.ate });
  }

  @Roles('gerente', 'financas')
  @Get('esperado-recebido')
  difference(@Ctx() ctx: AuthCtx, @Query() query: unknown) {
    const q = parse(Period, query);
    return this.reports.difference(ctx, { branchId: q.filialId, from: q.de, to: q.ate });
  }

  @Roles('gerente', 'financas')
  @Get('financeiro')
  finance(@Ctx() ctx: AuthCtx, @Query() query: unknown) {
    const q = parse(Finance, query);
    return this.reports.finance(ctx, { branchId: q.filialId, date: q.dia });
  }

  @Roles('gerente', 'financas', 'rececao')
  @Get('renovacoes')
  renewals(@Ctx() ctx: AuthCtx, @Query() query: unknown) {
    const q = parse(Renewals, query);
    return this.reports.renewals(ctx, { days: Number(q.dias), branchId: q.filialId });
  }
}
