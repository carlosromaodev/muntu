/**
 * Relógio do servidor. A hora oficial dos registos é a do servidor (RNF-13);
 * as regras de "dia" (vencimentos, turnos) usam Africa/Luanda (RNF-54).
 * Substituível nos testes.
 */
export class Clock {
  constructor(private fixed?: Date) {}

  now(): Date {
    return this.fixed ? new Date(this.fixed) : new Date();
  }

  set(d: Date) {
    this.fixed = d;
  }

  /** Data de hoje em Luanda, AAAA-MM-DD. */
  today(): string {
    return luandaDate(this.now());
  }
}

export const luandaDate = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Luanda', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);

/** Soma dias a uma data AAAA-MM-DD. */
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Dias entre duas datas AAAA-MM-DD (b − a). */
export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** Hora local de Luanda em minutos desde a meia-noite. */
export function luandaMinutes(d: Date): number {
  const [h, m] = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Luanda', hour: '2-digit', minute: '2-digit', hour12: false }).format(d).split(':').map(Number);
  return (h! % 24) * 60 + m!;
}
