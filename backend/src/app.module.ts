import { Module, type DynamicModule } from '@nestjs/common';
import { AccessModule } from './access/access.module.js';
import { ApprovalsModule } from './approvals/approvals.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CashModule } from './cash/cash.module.js';
import { CoreModule, type CoreOptions } from './core/core.module.js';
import { HealthController } from './health.controller.js';
import { IncidentsModule } from './incidents/incidents.module.js';
import { MembersModule } from './members/members.module.js';
import { MessagingModule } from './messaging/messaging.module.js';
import { NoticesModule } from './notices/notices.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { RetentionModule } from './retention/retention.module.js';
import { TasksModule } from './tasks/tasks.module.js';

/** Módulos por domínio (RNF-70). Cada um só fala com os outros pelos seus serviços. */
@Module({})
export class AppModule {
  static forRoot(core: CoreOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [CoreModule.forRoot(core), AuthModule, ApprovalsModule, MembersModule, CashModule, PaymentsModule, AccessModule, IncidentsModule, TasksModule, NoticesModule, MessagingModule, ReportsModule, RetentionModule],
      controllers: [HealthController],
    };
  }
}
