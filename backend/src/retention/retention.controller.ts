import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { RetentionService } from './retention.service.js';

const Contact = z.object({
  membroId: uuid,
  canal: z.enum(['telefone', 'sms', 'whatsapp', 'presencial']),
  motivo: z.enum(['viagem', 'lesao', 'insatisfacao', 'falta_de_tempo', 'preco', 'mudou_de_zona', 'outro']).optional(),
  resultado: z.enum(['sem_resposta', 'vai_voltar', 'voltou', 'cancelou', 'vai_renovar', 'renovou', 'nao_renova']),
  nota: z.string().trim().max(1000).optional(),
});

/** Retenção e recuperação (RF-RET-01/03). */
@Roles('gerente', 'rececao', 'financas', 'pt')
@Controller('retencao')
export class RetentionController {
  constructor(private readonly retention: RetentionService) {}

  @Get('risco')
  atRisk(@Ctx() ctx: AuthCtx, @Query('filialId') filialId?: string) {
    return this.retention.atRisk(ctx, { branchId: filialId ? parse(uuid, filialId) : undefined });
  }

  @Post('contactos')
  contact(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Contact, body);
    return this.retention.contact(ctx, { memberId: b.membroId, channel: b.canal, reason: b.motivo, outcome: b.resultado, note: b.nota });
  }

  @Get('contactos/:membroId')
  contacts(@Ctx() ctx: AuthCtx, @Param('membroId') id: string) {
    return this.retention.contacts(ctx, parse(uuid, id));
  }
}
