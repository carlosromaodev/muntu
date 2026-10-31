import { Module, type OnModuleInit } from '@nestjs/common';
import { ApprovalsModule } from '../approvals/approvals.module.js';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { DomainError } from '../common/errors.js';
import { TasksModule } from '../tasks/tasks.module.js';
import { CashController } from './cash.controller.js';
import { CashService } from './cash.service.js';

@Module({
  imports: [AuthModule, ApprovalsModule, TasksModule],
  controllers: [CashController],
  providers: [CashService],
  exports: [CashService],
})
export class CashModule implements OnModuleInit {
  constructor(
    private readonly approvals: ApprovalsService,
    private readonly cash: CashService,
  ) {}

  onModuleInit() {
    // RN-22 · despesas: finanças até ao limite, acima disso o dono.
    this.approvals.register('despesa', {
      requiredRole: ({ amountCents }, s) => ((amountCents ?? 0) <= s.expenseLimitFinancasCents ? 'financas' : 'dono'),
      validate: async (_tx, _ctx, p) => {
        if (typeof p.shiftId !== 'string' || typeof p.amountCents !== 'number') throw new DomainError('DADOS_INVALIDOS', 'Indique o turno e o valor da despesa.');
      },
      execute: (tx, approver, req) => this.cash.executeExpense(tx, approver, req),
    });
    // RN-17 · reabrir um caixa fechado: só o dono.
    this.approvals.register('reabrir_caixa', {
      requiredRole: () => 'dono',
      validate: async (_tx, _ctx, p) => {
        if (typeof p.shiftId !== 'string') throw new DomainError('DADOS_INVALIDOS', 'Indique o turno a reabrir.');
      },
      execute: (tx, approver, req) => this.cash.reopen(tx, approver, String(req.payload.shiftId)),
    });
  }
}
