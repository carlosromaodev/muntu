import { Global, Module, type DynamicModule } from '@nestjs/common';
import { Clock } from '../common/clock.js';
import { ENV, type Env } from '../config/env.js';
import { DATABASE, type Database } from '../db/database.js';
import { AuditService } from './audit.service.js';
import { CountersService } from './counters.service.js';
import { OutboxService } from './outbox.service.js';
import { SettingsService } from './settings.service.js';

export type CoreOptions = { env: Env; database: Database; clock?: Clock };

/** Configuração, base de dados, relógio e serviços transversais, disponíveis a todos os módulos. */
@Global()
@Module({})
export class CoreModule {
  static forRoot(opts: CoreOptions): DynamicModule {
    const providers = [
      { provide: ENV, useValue: opts.env },
      { provide: DATABASE, useValue: opts.database },
      { provide: Clock, useValue: opts.clock ?? new Clock() },
      AuditService,
      SettingsService,
      CountersService,
      OutboxService,
    ];
    return { module: CoreModule, providers, exports: providers.map((p) => ('provide' in p ? p.provide : p)) };
  }
}
