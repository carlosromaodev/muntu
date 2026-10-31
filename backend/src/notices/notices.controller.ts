import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { AUDIENCES, NoticesService } from './notices.service.js';

const Create = z.object({
  texto: z.string().trim().min(3, 'Escreva o aviso.').max(600),
  prioridade: z.enum(['urgente', 'normal']).default('normal'),
  para: z.array(z.enum(AUDIENCES)).min(1, 'Escolha a quem enviar.'),
  filialId: uuid.nullish(),
});

/** Avisos à equipa (RF-AVI-01). */
@Roles('gerente', 'rececao', 'financas', 'pt', 'vigilante')
@Controller('avisos')
export class NoticesController {
  constructor(private readonly notices: NoticesService) {}

  @Get()
  list(@Ctx() ctx: AuthCtx, @Query('porLer') unread?: string) {
    return this.notices.list(ctx, { unread: unread === 'true' });
  }

  @Roles('gerente')
  @Post()
  create(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Create, body);
    return this.notices.create(ctx, { body: b.texto, priority: b.prioridade, audience: b.para, branchId: b.filialId });
  }

  @HttpCode(200)
  @Post('lidos')
  readAll(@Ctx() ctx: AuthCtx) {
    return this.notices.markAllRead(ctx);
  }

  @HttpCode(200)
  @Post(':id/lido')
  read(@Ctx() ctx: AuthCtx, @Param('id') id: string) {
    return this.notices.markRead(ctx, parse(uuid, id));
  }

  @Get(':id/leituras')
  reads(@Ctx() ctx: AuthCtx, @Param('id') id: string) {
    return this.notices.reads(ctx, parse(uuid, id));
  }
}
