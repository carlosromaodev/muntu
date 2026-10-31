import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { sql } from 'drizzle-orm';
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { MIGRATIONS } from './migrations/index.js';

export type Schema = typeof schema;
export type Db = PgDatabase<PgQueryResultHKT, Schema>;
/** Transacção do Drizzle (o mesmo tipo que `db.transaction` entrega). */
export type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];

/** Contexto de quem faz o pedido; define o que a base de dados deixa ver. */
export type TenantContext = { orgId: string; userId: string };

/**
 * Ligação à base de dados.
 *  - `memory://` e `pglite://caminho`: PostgreSQL embutido (PGlite), para testes e desenvolvimento.
 *  - `postgres://…`: PostgreSQL real (produção).
 */
export class Database {
  private clock: { now(): Date } | null = null;

  private constructor(
    readonly db: Db,
    private readonly execRaw: (text: string) => Promise<void>,
    private readonly rowsRaw: (text: string) => Promise<Record<string, unknown>[]>,
    private readonly closeRaw: () => Promise<void>,
  ) {}

  static async connect(url: string): Promise<Database> {
    if (url.startsWith('postgres://') || url.startsWith('postgresql://')) {
      const client = postgres(url, { max: 10, onnotice: () => {} });
      const db = drizzlePostgres({ client, schema }) as unknown as Db;
      return new Database(db, async (t) => void (await client.unsafe(t)), async (t) => [...(await client.unsafe(t))] as Record<string, unknown>[], () => client.end());
    }
    let client: PGlite;
    if (url === 'memory://') client = new PGlite();
    else {
      const path = url.replace(/^pglite:\/\//, '');
      mkdirSync(dirname(path), { recursive: true });
      client = new PGlite(path);
    }
    await client.waitReady;
    const db = drizzlePglite({ client, schema }) as unknown as Db;
    return new Database(db, async (t) => void (await client.exec(t)), async (t) => (await client.query<Record<string, unknown>>(t)).rows, () => client.close());
  }

  /** Relógio da aplicação: dá a hora oficial aos registos (app.now → muntu_now()). */
  useClock(clock: { now(): Date }) {
    this.clock = clock;
  }

  private nowSetting() {
    return this.clock ? this.clock.now().toISOString() : '';
  }

  /** Aplica as migrações em falta, por ordem, cada uma numa transacção. */
  async migrate(): Promise<string[]> {
    await this.execRaw('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
    const done = new Set((await this.rowsRaw('SELECT name FROM schema_migrations')).map((r) => String(r.name)));
    const applied: string[] = [];
    for (const [name, text] of MIGRATIONS) {
      if (done.has(name)) continue;
      await this.execRaw(`BEGIN;\n${text}\nINSERT INTO schema_migrations(name) VALUES ('${name}');\nCOMMIT;`);
      applied.push(name);
    }
    return applied;
  }

  /**
   * Transacção no contexto de uma organização: papel `muntu_app` e
   * `app.org_id` definidos, por isso a Row-Level Security só deixa ver e
   * escrever dados dessa organização (RNF-01).
   */
  async withOrg<T>(ctx: TenantContext, fn: (tx: Tx) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SET LOCAL ROLE muntu_app`);
      await tx.execute(sql`SELECT set_config('app.org_id', ${ctx.orgId}, true), set_config('app.user_id', ${ctx.userId}, true), set_config('app.now', ${this.nowSetting()}, true)`);
      return fn(tx);
    });
  }

  /** Transacção do utilizador sem organização escolhida (ver as próprias ligações). */
  async withUser<T>(userId: string, fn: (tx: Tx) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SET LOCAL ROLE muntu_app`);
      await tx.execute(sql`SELECT set_config('app.org_id', '', true), set_config('app.user_id', ${userId}, true), set_config('app.now', ${this.nowSetting()}, true)`);
      return fn(tx);
    });
  }

  /** Transacção de sistema (só autenticação: users e refresh_tokens). */
  async system<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT set_config('app.now', ${this.nowSetting()}, true)`);
      return fn(tx);
    });
  }

  async close() {
    await this.closeRaw();
  }
}

export const DATABASE = Symbol('DATABASE');
