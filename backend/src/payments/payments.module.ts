import { Module, type OnModuleInit } from '@nestjs/common';
import { ApprovalsModule } from '../approvals/approvals.module.js';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { CashModule } from '../cash/cash.module.js';
import { InvoicesService } from '../invoices/invoices.service.js';
import { MembersModule } from '../members/members.module.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';

@Module({
  imports: [ApprovalsModule, CashModule, MembersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, InvoicesService],
  exports: [PaymentsService, InvoicesService],
})
export class PaymentsModule implements OnModuleInit {
  constructor(
    private readonly approvals: ApprovalsService,
    private readonly payments: PaymentsService,
  ) {}

  onModuleInit() {
    // RN-21 · estornos: a recepção pede, nunca aprova; finanças até ao limite; acima disso o dono.
    this.approvals.register('estorno', {
      requiredRole: ({ amountCents }, s) => (s.refundLimitFinancasCents > 0 && amountCents !== null && amountCents <= s.refundLimitFinancasCents ? 'financas' : 'dono'),
      validate: async (tx, _ctx, payload) => {
        const mov = await this.payments.validateRefund(tx, payload);
        payload.amountCents = mov.amountCents;
      },
      execute: (tx, approver, req) => this.payments.executeRefund(tx, approver, req),
    });
  }
}
