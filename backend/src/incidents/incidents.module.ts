import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module.js';
import { IncidentsController } from './incidents.controller.js';
import { IncidentsService } from './incidents.service.js';

@Module({ imports: [TasksModule], controllers: [IncidentsController], providers: [IncidentsService] })
export class IncidentsModule {}
