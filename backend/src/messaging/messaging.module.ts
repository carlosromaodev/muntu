import { Module } from '@nestjs/common';
import { ENV, type Env } from '../config/env.js';
import { DispatcherService } from './dispatcher.service.js';
import { MessagingController, NotificationsController } from './messaging.controller.js';
import { MessagingService } from './messaging.service.js';
import { LogProvider, MESSAGE_PROVIDER } from './providers.js';
import { RemindersService } from './reminders.service.js';
import { WorkerService } from './worker.service.js';

@Module({
  controllers: [MessagingController, NotificationsController],
  providers: [
    { provide: MESSAGE_PROVIDER, inject: [ENV], useFactory: (env: Env) => new LogProvider(env.NODE_ENV === 'development') },
    DispatcherService,
    RemindersService,
    MessagingService,
    WorkerService,
  ],
  exports: [DispatcherService, RemindersService, MESSAGE_PROVIDER],
})
export class MessagingModule {}
