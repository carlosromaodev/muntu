import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module.js';
import { RetentionController } from './retention.controller.js';
import { RetentionService } from './retention.service.js';

@Module({ imports: [TasksModule], controllers: [RetentionController], providers: [RetentionService] })
export class RetentionModule {}
