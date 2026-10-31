import { Module, type OnModuleInit } from '@nestjs/common';
import { ApprovalsModule } from '../approvals/approvals.module.js';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { AccessController } from './access.controller.js';
import { AccessService } from './access.service.js';

@Module({
  imports: [ApprovalsModule],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule implements OnModuleInit {
  constructor(
    private readonly approvals: ApprovalsService,
    private readonly access: AccessService,
  ) {}

  onModuleInit() {
    // RN-08 · entrada manual de quem seria recusado: aprova o gerente (ou o dono).
    this.approvals.register('entrada_manual', {
      requiredRole: () => 'gerente',
      execute: async (tx, approver, req) => ({ checkinId: await this.access.recordManual(tx, { ...approver, userId: req.requestedBy }, String(req.payload.memberId), String(req.payload.branchId), `${req.reason} (aprovado)`) }),
    });
  }
}
