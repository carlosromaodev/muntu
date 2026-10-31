/**
 * Dinheiro em cêntimos inteiros (RNF-21): 30 000,00 Kz = 3 000 000.
 * Nunca vírgula flutuante em somas.
 */
export const kz = (cents: number) => {
  const neg = cents < 0;
  const abs = Math.abs(cents);
  const int = Math.trunc(abs / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const dec = String(abs % 100).padStart(2, '0');
  return `${neg ? '−' : ''}${int},${dec} Kz`;
};

/** Notas e moedas aceites na contagem (RN-15), em kwanzas. */
export const NOTAS = [5000, 2000, 1000, 500, 200] as const;
export const MOEDAS = [100, 50, 20, 10, 5, 1] as const;

/** Total contado em cêntimos: quantidades por denominação + valor avulso em cêntimos. */
export function countTotal(qty: Record<string, number>, looseCents = 0): number {
  let total = 0;
  for (const v of [...NOTAS, ...MOEDAS]) total += Math.max(0, Math.trunc(qty[String(v)] ?? 0)) * v * 100;
  return total + Math.max(0, Math.trunc(looseCents));
}

/** Aplica um desconto percentual (arredondado ao cêntimo). */
export const applyDiscount = (cents: number, pct: number) => Math.round(cents * (1 - pct / 100));
