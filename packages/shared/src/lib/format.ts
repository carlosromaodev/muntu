/** 184500 → "184 500" (separador de milhares com espaço, como no desenho). */
export const kn = (v: number) => String(Math.round(Math.abs(v))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
/** 184500 → "184 500,00" */
export const kz2 = (v: number) => `${v < 0 ? '−' : ''}${kn(v)},00`;
/** 30000 → "30 000 Kz" */
export const kz = (v: number) => `${v < 0 ? '−' : ''}${kn(v)} Kz`;
/** Com sinal: +45 000,00 Kz / −30 000,00 Kz */
export const kzSigned = (v: number) => `${v < 0 ? '−' : '+'}${kn(v)},00 Kz`;
/** Kz com cêntimos quando os há: 12434.5 → "12 434,50". */
export const knc = (v: number) => {
  const c = Math.round(Math.abs(v) * 100) % 100;
  return c ? `${kn(Math.trunc(Math.abs(v)))},${String(c).padStart(2, '0')}` : kn(v);
};
/** Lê um valor escrito à mão: "12 434,50" → 12434.5 (vírgula = decimal, espaços e pontos de milhar ignorados). */
export const pKz = (t: string | number | null | undefined) => {
  let s = String(t ?? '').replace(/\s/g, '');
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  return Math.round((parseFloat(s) || 0) * 100) / 100;
};
/** Deixa só algarismos, espaços, vírgula e ponto (campos de valor). */
export const moneyInput = (t: string) => t.replace(/[^\d\s,.]/g, '');
export const pad2 = (n: number) => String(n).padStart(2, '0');
export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');
export const onlyDigits = (s: string) => s.replace(/\D/g, '');
/** "923481220" → "923 481 220" */
export const phone = (s: string) => onlyDigits(s).slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ').trim();
