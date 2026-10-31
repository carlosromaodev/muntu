import { z } from 'zod';
import pt from 'zod/v4/locales/pt.js';

// Mensagens de validação em português (RNF-60).
z.config(pt());

/** Valida um corpo/consulta com zod; erros viram 400 DADOS_INVALIDOS no filtro global. */
export const parse = <T extends z.ZodType>(schema: T, value: unknown): z.infer<T> => schema.parse(value);

export const uuid = z.string().uuid();
/** Valor em cêntimos de kwanza (inteiro, ≥ 0). */
export const cents = z.number().int().nonnegative();
export const phone = z
  .string()
  .transform((s) => s.replace(/\D/g, '').replace(/^244/, ''))
  .refine((s) => /^9\d{8}$/.test(s), 'O número tem 9 dígitos e começa por 9.');
