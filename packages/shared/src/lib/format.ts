/** Formata kwanzas: 45000 → "45 000,00". Sinal de menos tipográfico (−). */
export const kn = (n: number, decimals = 2): string => {
  const [i, d] = Math.abs(n).toFixed(decimals).split('.');
  const int = i.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0'); // espaço inseparável: o valor nunca parte a meio
  return (n < 0 ? '−' : '') + int + (decimals ? ',' + d : '');
};

/** Com sufixo: 45000 → "45 000,00 Kz". */
export const kz = (n: number): string => kn(n) + '\u00A0Kz';

/** Com sinal explícito para movimentos: +45 000,00 / −30 000,00. */
export const kzSigned = (n: number): string => (n > 0 ? '+' : '') + kz(n);

/** Inteiro com espaço de milhares: 4820 → "4 820". */
export const int = (n: number): string => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

/** "86 000" → 86000 (aceita espaços e vírgula decimal). */
export const parseKz = (s: string): number => parseFloat(String(s).replace(/\s/g, '').replace(',', '.')) || 0;

export const pad2 = (n: number) => String(n).padStart(2, '0');

export const mmss = (secs: number) => pad2(Math.floor(secs / 60)) + ':' + pad2(secs % 60);

/** Substitui {variaveis} num modelo de mensagem. */
export const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : m));

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('');

export const nowHM = () => {
  const d = new Date();
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
};
