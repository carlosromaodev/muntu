import { Body, Controller, Get, Headers, HttpCode, Param, Post, Query } from '@nestjs/common';
import { z } from 'zod';
import { Ctx, Public, type AuthCtx } from '../auth/context.js';
import { cents, parse, uuid } from '../common/zod.js';
import { InvoicesService } from '../invoices/invoices.service.js';
import { PaymentsService } from './payments.service.js';

const Create = z.object({
  filialId: uuid,
  membroId: uuid.optional(),
  subscricaoId: uuid.optional(),
  meio: z.enum(['dinheiro', 'tpa', 'express', 'referencia', 'transferencia']),
  valorCentimos: cents.refine((v) => v > 0, 'O valor tem de ser maior que zero.'),
  /** Gerada pela app (também sem rede). Repetir a mesma chave não duplica o pagamento. */
  chaveIdempotencia: z.string().min(8).max(100),
  descontoPct: z.number().int().min(0).max(100).optional(),
  referenciaExterna: z.string().max(100).optional(),
});
const Confirm = z.object({ referenciaExterna: z.string().min(3) });
const Webhook = z.object({ orgId: uuid, paymentId: uuid, status: z.enum(['confirmado', 'falhado']), amountCents: z.number().int().positive(), externalRef: z.string().optional() });

@Controller()
export class PaymentsController {
  constructor(
    private readonly payments: PaymentsService,
    private readonly invoices: InvoicesService,
  ) {}

  @Post('pagamentos')
  create(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Create, body);
    return this.payments.create(ctx, { branchId: b.filialId, memberId: b.membroId, subscriptionId: b.subscricaoId, method: b.meio, amountCents: b.valorCentimos, idempotencyKey: b.chaveIdempotencia, discountPct: b.descontoPct, externalRef: b.referenciaExterna });
  }

  @Get('pagamentos')
  list(@Ctx() ctx: AuthCtx, @Query('filialId') filialId: string) {
    return this.payments.list(ctx, parse(uuid, filialId));
  }

  @HttpCode(200)
  @Post('pagamentos/:id/confirmar')
  confirm(@Ctx() ctx: AuthCtx, @Param('id') id: string, @Body() body: unknown) {
    return this.payments.confirmManual(ctx, parse(uuid, id), parse(Confirm, body).referenciaExterna);
  }

  @Public()
  @HttpCode(200)
  @Post('integracoes/pagamentos/webhook')
  webhook(@Body() body: unknown, @Headers('x-muntu-assinatura') signature = '') {
    return this.payments.webhook(parse(Webhook, body), signature);
  }

  @Get('facturas')
  listInvoices(@Ctx() ctx: AuthCtx, @Query('filialId') filialId?: string) {
    return this.invoices.list(ctx, filialId ? parse(uuid, filialId) : undefined);
  }
}
