/** 184500 → "184 500" (separador de milhares com espaço, como no desenho). */
export const kn = (v: number) => String(Math.round(Math.abs(v))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
/** 184500 → "184 500,00" */
export const kz2 = (v: number) => `${v < 0 ? '−' : ''}${kn(v)},00`;
/** 30000 → "30 000 Kz" */
export const kz = (v: number) => `${v < 0 ? '−' : ''}${kn(v)} Kz`;
/** Com sinal: +45 000,00 Kz / −30 000,00 Kz */
export const kzSigned = (v: number) => `${v < 0 ? '−' : '+'}${kn(v)},00 Kz`;
export const pad2 = (n: number) => String(n).padStart(2, '0');
export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');
export const onlyDigits = (s: string) => s.replace(/\D/g, '');
/** "923481220" → "923 481 220" */
export const phone = (s: string) => onlyDigits(s).slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ').trim();
