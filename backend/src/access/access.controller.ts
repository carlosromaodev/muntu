import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Roles, type AuthCtx } from '../auth/context.js';
import { parse, uuid } from '../common/zod.js';
import { AccessService } from './access.service.js';

const Validate = z.object({ filialId: uuid, qr: z.string().optional(), membroId: uuid.optional(), origem: z.enum(['qr', 'catraca']).default('qr') }).refine((b) => b.qr || b.membroId, 'Indique o QR ou o membro.');
const Manual = z.object({ filialId: uuid, membroId: uuid, motivo: z.string().trim().min(5) });

@Controller('acessos')
export class AccessController {
  constructor(private readonly access: AccessService) {}

  @Roles('membro')
  @Get('qr')
  qr(@Ctx() ctx: AuthCtx) {
    return this.access.myQr(ctx);
  }

  @Roles('rececao', 'vigilante', 'gerente')
  @Post('validar')
  validate(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Validate, body);
    return this.access.validate(ctx, { branchId: b.filialId, qr: b.qr, memberId: b.membroId, method: b.origem });
  }

  @Roles('rececao', 'gerente')
  @Post('manual')
  manual(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Manual, body);
    return this.access.manual(ctx, { branchId: b.filialId, memberId: b.membroId, reason: b.motivo });
  }

  @Get('lotacao/:filialId')
  occupancy(@Ctx() ctx: AuthCtx, @Param('filialId') filialId: string) {
    return this.access.occupancy(ctx, parse(uuid, filialId));
  }

  @Get('presentes')
  present(@Ctx() ctx: AuthCtx, @Query('filialId') filialId: string) {
    return this.access.present(ctx, parse(uuid, filialId));
  }
}
