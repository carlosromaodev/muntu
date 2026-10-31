import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { cents, parse, uuid } from '../common/zod.js';
import { CashService } from './cash.service.js';

const Open = z.object({ filialId: uuid, turno: z.enum(['manha', 'tarde', 'dia']), fundoCentimos: cents });
const Movement = z.object({ tipo: z.enum(['sangria', 'reforco', 'despesa']), valorCentimos: cents, motivo: z.string().trim().min(3), comprovativoUrl: z.string().url().optional() });
const Count = z.object({
  /** Quantidade por denominação, em kwanzas: { "5000": 10, "200": 3, "100": 8 } */
  quantidades: z.record(z.string(), z.number().int().nonnegative()).default({}),
  /** Moedas soltas, cêntimos e valores avulsos, em cêntimos. */
  avulsoCentimos: cents.default(0),
  decisao: z.enum(['ressalva', 'revisao']).optional(),
  justificacao: z.string().optional(),
});
const Receive = Count.extend({ turno: z.enum(['manha', 'tarde', 'dia']).default('tarde'), senha: z.string().optional(), semColega: z.boolean().default(false), motivoSemColega: z.string().optional() });

@Roles('gerente', 'rececao', 'financas')
@Controller('caixa')
export class CashController {
  constructor(private readonly cash: CashService) {}

  @Post('turnos')
  open(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Open, body);
    return this.cash.open(ctx, { branchId: b.filialId, kind: b.turno, openingFloatCents: b.fundoCentimos });
  }

  @Get('turnos/actual')
  current(@Ctx() ctx: AuthCtx, @Query('filialId') filialId: string) {
    return this.cash.current(ctx, parse(uuid, filialId));
  }

  @Get('turnos')
  history(@Ctx() ctx: AuthCtx, @Query('filialId') filialId: string) {
    return this.cash.history(ctx, parse(uuid, filialId));
  }

  @Post('turnos/:id/movimentos')
  movement(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Movement, body);
    return this.cash.movement(ctx, parse(uuid, id), { kind: b.tipo, amountCents: b.valorCentimos, reason: b.motivo, receiptUrl: b.comprovativoUrl });
  }

  /** Fecho cego do caixa. */
  @HttpCode(200)
  @Post('turnos/:id/fecho')
  close(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Count, body);
    return this.cash.count(ctx, parse(uuid, id), 'fecho', { quantities: b.quantidades, looseCents: b.avulsoCentimos, decision: b.decisao, justification: b.justificacao });
  }

  /** Receber o turno: contagem às cegas, assinatura e abertura do turno seguinte. */
  @HttpCode(200)
  @Post('turnos/:id/receber')
  receive(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    const b = parse(Receive, body);
    return this.cash.count(ctx, parse(uuid, id), 'recepcao', { quantities: b.quantidades, looseCents: b.avulsoCentimos, decision: b.decisao, justification: b.justificacao, kind: b.turno, password: b.senha, withoutColleague: b.semColega, withoutColleagueReason: b.motivoSemColega });
  }
}
