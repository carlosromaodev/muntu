import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { MessagingService } from './messaging.service.js';
import { RULE_KINDS } from './templates.js';

const Rule = z.object({
  ligada: z.boolean().optional(),
  canal: z.enum(['sms', 'whatsapp']).optional(),
  modelo: z.string().trim().min(5).max(480).optional(),
  hora: z.number().int().min(0).max(23).optional(),
  repor: z.boolean().optional(),
});
const Log = z.object({ estado: z.enum(['enviado', 'entregue', 'falhou']).optional(), membroId: uuid.optional(), limite: z.coerce.number().int().positive().max(500).optional() });
const Send = z.object({ segmento: z.enum(['activos', 'em_divida', 'bloqueados', 'plano']), planoId: uuid.optional(), texto: z.string().trim().min(5, 'Escreva a mensagem.').max(480) });

/** Mensagens automáticas a membros e registo de envios (RF-AVI-02/03/04). */
@Roles('gerente')
@Controller('mensagens')
export class MessagingController {
  constructor(private readonly messaging: MessagingService) {}

  @Get('regras')
  rules(@Ctx() ctx: AuthCtx) {
    return this.messaging.rules(ctx);
  }

  @Roles('dono')
  @Put('regras/:tipo')
  updateRule(@Ctx() ctx: AuthCtx, @Param('tipo') tipo: string, @Body() body: unknown) {
    const kind = parse(z.enum(RULE_KINDS), tipo);
    const b = parse(Rule, body);
    if (b.repor) return this.messaging.resetRule(ctx, kind);
    return this.messaging.updateRule(ctx, kind, { enabled: b.ligada, channel: b.canal, template: b.modelo, sendHour: b.hora });
  }

  @Get('envios')
  log(@Ctx() ctx: AuthCtx, @Query() query: unknown) {
    const q = parse(Log, query);
    return this.messaging.log(ctx, { status: q.estado, memberId: q.membroId, limit: q.limite });
  }

  @Post('enviar')
  send(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Send, body);
    return this.messaging.send(ctx, { segment: b.segmento, planId: b.planoId, text: b.texto });
  }
}

/** Notificações na app de quem tem sessão (equipa e membros). */
@Controller('notificacoes')
export class NotificationsController {
  constructor(private readonly messaging: MessagingService) {}

  @Get()
  list(@Ctx() ctx: AuthCtx, @Query('porLer') unread?: string) {
    return this.messaging.notifications(ctx, unread === 'true');
  }

  @HttpCode(200)
  @Post('lidas')
  readAll(@Ctx() ctx: AuthCtx) {
    return this.messaging.readNotification(ctx, 'todas');
  }

  @HttpCode(200)
  @Post(':id/lida')
  read(@Ctx() ctx: AuthCtx, @Param('id') id: string) {
    return this.messaging.readNotification(ctx, parse(uuid, id));
  }
}
