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
  /** Lembretes e envio do outbox dentro da API (desligado nos testes). */
  WORKER_ENABLED: z.enum(['true', 'false']).optional(),
  WORKER_INTERVAL_SECONDS: z.coerce.number().int().min(5).default(30),
  /** Fornecedor de SMS/WhatsApp: "registo" só escreve no log (desenvolvimento). */
  MESSAGE_PROVIDER: z.enum(['registo']).default('registo'),
});

export type Env = Omit<z.infer<typeof schema>, 'WORKER_ENABLED'> & { WORKER_ENABLED: boolean };

/** Lê e valida a configuração. Em produção, os segredos por omissão são recusados. */
export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const raw = schema.parse(source);
  const env: Env = { ...raw, WORKER_ENABLED: raw.WORKER_ENABLED === undefined ? raw.NODE_ENV !== 'test' : raw.WORKER_ENABLED === 'true' };
  if (env.NODE_ENV === 'production') {
    for (const k of ['JWT_SECRET', 'QR_SECRET', 'WEBHOOK_SECRET'] as const) {
      if (env[k].startsWith(DEV_SECRET)) throw new Error(`${k} tem de ser definido em produção.`);
    }
    if (!env.DATABASE_URL.startsWith('postgres')) throw new Error('Em produção, DATABASE_URL tem de apontar para PostgreSQL.');
  }
  return env;
}

export const ENV = Symbol('ENV');
