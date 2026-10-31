import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { Clock } from './common/clock.js';
import { ErrorFilter } from './common/error.filter.js';
import type { Env } from './config/env.js';
import { Database } from './db/database.js';

/** Cria a aplicação (usado pelo arranque e pelos testes). */
export async function createApp(env: Env, opts: { database?: Database; clock?: Clock; logger?: boolean } = {}) {
  const database = opts.database ?? (await Database.connect(env.DATABASE_URL));
  await database.migrate();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule.forRoot({ env, database, clock: opts.clock }), new FastifyAdapter({ trustProxy: true, bodyLimit: 1_048_576 }), {
    logger: opts.logger === false ? false : ['log', 'warn', 'error'],
  });
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new ErrorFilter());
  app.enableCors({ origin: true, credentials: false });
  app.enableShutdownHooks();
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  return { app, database };
}
