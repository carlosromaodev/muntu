import { Module, type OnModuleInit } from '@nestjs/common';
import { ApprovalsModule } from '../approvals/approvals.module.js';
import { ApprovalsService } from '../approvals/approvals.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { DomainError } from '../common/errors.js';
import { OutboxService } from '../core/outbox.service.js';
import { SettingsService } from '../core/settings.service.js';
import { MembersController } from './members.controller.js';
import { MembersService } from './members.service.js';
import { PlansService } from './plans.service.js';

@Module({
  imports: [AuthModule, ApprovalsModule],
  controllers: [MembersController],
  providers: [MembersService, PlansService],
  exports: [MembersService, PlansService],
})
export class MembersModule implements OnModuleInit {
  constructor(
    private readonly approvals: ApprovalsService,
    private readonly members: MembersService,
    private readonly plans: PlansService,
    private readonly outbox: OutboxService,
    private readonly settings: SettingsService,
  ) {}

  onModuleInit() {
    // RN-20 · desconto acima do limite do perfil: gerente até ao seu limite, acima disso o dono.
    this.approvals.register('desconto', {
      requiredRole: ({ payload }, s) => (Number(payload.pct) <= s.discountLimits.gerente ? 'gerente' : 'dono'),
      validate: async (_tx, _ctx, p) => {
        if (typeof p.subscriptionId !== 'string' || typeof p.pct !== 'number' || p.pct <= 0 || p.pct > 100) throw new DomainError('DADOS_INVALIDOS', 'Indique a subscrição e a percentagem de desconto.');
      },
      execute: (tx, _ctx, req) => this.members.setDiscount(tx, String(req.payload.subscriptionId), Number(req.payload.pct)),
    });
    // RN-01 · activar subscrição sem pagamento: só o dono.
    this.approvals.register('activar_sem_pagamento', {
      requiredRole: () => 'dono',
      validate: async (_tx, _ctx, p) => {
        if (typeof p.subscriptionId !== 'string') throw new DomainError('DADOS_INVALIDOS', 'Indique a subscrição.');
      },
      execute: (tx, _ctx, req) => this.members.activate(tx, String(req.payload.subscriptionId), 'aprovacao', req.id),
    });
    // RN-23 · preço com membros activos: só o dono; aviso por SMS com antecedência.
    this.approvals.register('preco', {
      requiredRole: () => 'dono',
      execute: async (tx, ctx, req) => {
        const r = await this.plans.setPrice(tx, ctx, String(req.payload.planId), Number(req.payload.priceCents));
        const s = await this.settings.get(tx, ctx.orgId);
        await this.outbox.enqueue(tx, ctx.orgId, 'sms', `plano:${r.planId}`, 'plano.novo_preco', { priceCents: r.priceCents, diasAviso: s.priceNoticeDays }, `preco:${req.id}`);
        return r;
      },
    });
  }
}
