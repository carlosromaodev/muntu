import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { TasksService } from './tasks.service.js';

const KIND = z.enum(['cobranca', 'documento', 'reclamacao', 'reserva', 'ocorrencia', 'retencao', 'outro']);
const Create = z.object({
  filialId: uuid,
  tipo: KIND,
  titulo: z.string().trim().min(3, 'Diga o que fica por fazer (pelo menos 3 caracteres).').max(160),
  detalhe: z.string().trim().max(1000).optional(),
  membroId: uuid.optional(),
  prazo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data no formato AAAA-MM-DD.').optional(),
  responsavelId: uuid.optional(),
});
const List = z.object({ filialId: uuid.optional(), estado: z.enum(['aberta', 'resolvida', 'cancelada']).optional(), minhas: z.enum(['true', 'false']).optional(), tipo: KIND.optional() });
const Note = z.object({ nota: z.string().trim().min(2).max(1000) });
const Transfer = z.object({ para: uuid, nota: z.string().trim().max(1000).optional() });
const Resolve = z.object({ resolucao: z.string().trim().min(3, 'Diga como ficou resolvida.').max(1000), cancelar: z.boolean().default(false) });

/** Pendências que passam de turno em turno (RF-PEN). */
@Roles('gerente', 'rececao', 'financas', 'pt')
@Controller('pendencias')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  list(@Ctx() ctx: AuthCtx, @Query() query: unknown) {
    const q = parse(List, query);
    return this.tasks.list(ctx, { branchId: q.filialId, status: q.estado, mine: q.minhas === 'true', kind: q.tipo });
  }

  @Post()
  create(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Create, body);
    return this.tasks.create(ctx, { branchId: b.filialId, kind: b.tipo, title: b.titulo, detail: b.detalhe, memberId: b.membroId, dueOn: b.prazo, ownerUserId: b.responsavelId });
  }

  @Get(':id')
  get(@Ctx() ctx: AuthCtx, @Param('id') id: string) {
    return this.tasks.get(ctx, parse(uuid, id));
  }

  @HttpCode(200)
  @Post(':id/notas')
  note(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    return this.tasks.note(ctx, parse(uuid, id), parse(Note, body).nota);
  }

  @HttpCode(200)
  @Post(':id/transferir')
  transfer(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Transfer, body);
    return this.tasks.transfer(ctx, parse(uuid, id), b.para, b.nota);
  }

  @HttpCode(200)
  @Post(':id/resolver')
  resolve(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Resolve, body);
    return this.tasks.resolve(ctx, parse(uuid, id), b.resolucao, b.cancelar);
  }

  @HttpCode(200)
  @Post(':id/reabrir')
  reopen(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    return this.tasks.reopen(ctx, parse(uuid, id), parse(Note, body).nota);
  }
}
