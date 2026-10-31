import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { IncidentsService } from './incidents.service.js';

const Create = z.object({
  filialId: uuid,
  tipo: z.string().min(2),
  zona: z.string().min(2),
  equipamento: z.string().trim().max(80).optional(),
  descricao: z.string().trim().min(10, 'Descreva o que aconteceu em pelo menos 10 caracteres.').max(400),
  fotoUrl: z.string().url().optional(),
  magoado: z.boolean().optional(),
  anonimo: z.boolean().optional(),
  urgencia: z.enum(['baixa', 'media', 'alta']).optional(),
  encaminhar: z.enum(['manutencao', 'gestao', 'rececao']).optional(),
});
const Status = z.object({ estado: z.enum(['em_analise', 'resolvida']), nota: z.string().max(400).optional() });

@Controller('ocorrencias')
export class IncidentsController {
  constructor(private readonly incidents: IncidentsService) {}

  @Post()
  create(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Create, body);
    return this.incidents.create(ctx, { branchId: b.filialId, type: b.tipo, zone: b.zona, equipment: b.equipamento, description: b.descricao, photoUrl: b.fotoUrl, hurt: b.magoado, anonymous: b.anonimo, urgency: b.urgencia, routeTo: b.encaminhar });
  }

  @Get()
  list(@Ctx() ctx: AuthCtx) {
    return this.incidents.list(ctx);
  }

  @Patch(':id/estado')
  status(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Status, body);
    return this.incidents.setStatus(ctx, parse(uuid, id), b.estado, b.nota);
  }
}
