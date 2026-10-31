import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, type AuthCtx } from '../auth/context.js';
import { cents, parse, uuid } from '../common/zod.js';
import { ApprovalsService } from './approvals.service.js';

const Create = z.object({
  tipo: z.enum(['estorno', 'desconto', 'activar_sem_pagamento', 'despesa', 'preco', 'reabrir_caixa', 'data_passada', 'entrada_manual']),
  filialId: uuid.optional(),
  dados: z.record(z.string(), z.unknown()),
  valorCentimos: cents.optional(),
  motivo: z.string().trim().min(5, 'Escreva o motivo (pelo menos 5 caracteres).'),
});
const Decide = z.object({ aprovar: z.boolean(), senha: z.string().min(1), motivo: z.string().optional() });

@Controller('aprovacoes')
export class ApprovalsController {
  constructor(private readonly approvals: ApprovalsService) {}

  @Get()
  list(@Ctx() ctx: AuthCtx, @Query('estado') estado?: string) {
    return this.approvals.list(ctx, estado === 'todos' ? 'todos' : 'pendente');
  }

  @Post()
  create(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Create, body);
    return this.approvals.request(ctx, { kind: b.tipo, branchId: b.filialId, payload: b.dados, amountCents: b.valorCentimos, reason: b.motivo });
  }

  @HttpCode(200)
  @Post(':id/decisao')
  decide(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Decide, body);
    return this.approvals.decide(ctx, parse(uuid, id), { approve: b.aprovar, password: b.senha, reason: b.motivo });
  }
}
