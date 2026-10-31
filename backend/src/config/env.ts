import { z } from 'zod';

const DEV_SECRET = 'muntu-segredo-de-desenvolvimento-nao-usar-em-producao';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().default('pglite://./.data/muntu'),
  JWT_SECRET: z.string().min(32).default(DEV_SECRET),
  QR_SECRET: z.string().min(32).default(DEV_SECRET + '-qr'),
  WEBHOOK_SECRET: z.string().min(16).default(DEV_SECRET + '-webhook'),
  ACCESS_TOKEN_MINUTES: z.coerce.number().int().positive().default(15),
  REFRESH_TOKEN_DAYS: z.coerce.number().int().positive().default(30),
});

export type Env = z.infer<typeof schema>;

/** Lê e valida a configuração. Em produção, os segredos por omissão são recusados. */
export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const env = schema.parse(source);
  if (env.NODE_ENV === 'production') {
    for (const k of ['JWT_SECRET', 'QR_SECRET', 'WEBHOOK_SECRET'] as const) {
      if (env[k].startsWith(DEV_SECRET)) throw new Error(`${k} tem de ser definido em produção.`);
    }
    if (!env.DATABASE_URL.startsWith('postgres')) throw new Error('Em produção, DATABASE_URL tem de apontar para PostgreSQL.');
  }
  return env;
}

export const ENV = Symbol('ENV');
