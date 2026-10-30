import { create } from 'zustand';
import { DENOMS, SHIFT_EXPECTED_CASH, SHIFT_PAYS, SHIFT_PENDING } from '../data/mobile';
import { knc, pKz } from '../lib/format';

type Opt = '' | 'recount' | 'reg' | 'rev';

/**
 * Receber turno (recepção): conferência do dinheiro, dos pagamentos e das
 * pendências antes de assumir. Partilhado entre o telemóvel e o desktop.
 */
type Handover = {
  q: Record<string, number>;
  revealed: boolean;
  opt: Opt;
  just: string;
  pays: Record<string, string>;
  /** Moedas, cêntimos e outros valores (texto livre em Kz). */
  coin: string;
  /** Valor confirmado de cada meio de pagamento (texto livre em Kz). */
  payV: Record<string, string>;
  pend: Record<string, string>;
  exc: boolean;
  excMot: string;
  done: boolean;
  setQ: (k: string, v: number) => void;
  reveal: () => void;
  setOpt: (o: Opt) => void;
  setJust: (s: string) => void;
  setPay: (k: string, v: string) => void;
  setCoin: (t: string) => void;
  setPayV: (k: string, t: string) => void;
  setPend: (k: string, v: string) => void;
  toggleExc: () => void;
  setExcMot: (s: string) => void;
  finish: () => void;
  reset: () => void;
};

const initial = { q: { n5000: 0, n2000: 0, n1000: 0, n500: 0, n200: 0 }, coin: '', payV: {} as Record<string, string>, revealed: false, opt: '' as Opt, just: '', pays: {} as Record<string, string>, pend: {}, exc: false, excMot: '', done: false };

export const useHandover = create<Handover>((set) => ({
  ...initial,
  setQ: (k, v) => set((s) => ({ q: { ...s.q, [k]: Math.max(0, v) } })),
  reveal: () => set({ revealed: true }),
  setOpt: (opt) => set(opt === 'recount' ? { revealed: false, opt: '' } : { opt }),
  setJust: (just) => set({ just }),
  setPay: (k, v) => set((s) => ({ pays: { ...s.pays, [k]: v } })),
  setCoin: (coin) => set({ coin }),
  setPayV: (k, t) =>
    set((s) => {
      const expected = SHIFT_PAYS.find((p) => p.k === k)?.v ?? 0;
      // Ao escrever o valor, o estado fica "Conferido" se bate certo, "Problema" se não.
      return { payV: { ...s.payV, [k]: t }, pays: t ? { ...s.pays, [k]: pKz(t) === expected ? 'ok' : 'prob' } : s.pays };
    }),
  setPend: (k, v) => set((s) => ({ pend: { ...s.pend, [k]: v } })),
  toggleExc: () => set((s) => ({ exc: !s.exc })),
  setExcMot: (excMot) => set({ excMot }),
  finish: () => set({ done: true }),
  reset: () => set(initial),
}));

/** Valores derivados da conferência. */
export function handoverView(h: Handover) {
  const coin = pKz(h.coin);
  const counted = DENOMS.reduce((a, d) => a + (h.q[d.k] ?? 0) * d.v, 0) + coin;
  const dif = counted - SHIFT_EXPECTED_CASH;
  const cashDone = h.revealed && (dif === 0 || (!!h.opt && h.opt !== 'recount'));
  const payDone = SHIFT_PAYS.every((p) => h.pays[p.k]);
  const pendDone = SHIFT_PENDING.every((p) => h.pend[p.id]);
  const pendLeft = SHIFT_PENDING.length - Object.keys(h.pend).length;
  const difL = `${dif > 0 ? '+' : dif < 0 ? '−' : ''}${knc(Math.abs(dif))} Kz`;
  const tiles = [
    { l: 'Caixa', v: cashDone ? (dif === 0 ? 'Conferido' : 'Com ressalva') : 'Por conferir', tone: cashDone ? (dif === 0 ? 'ok' : 'warn') : 'ink' },
    { l: 'Pagamentos', v: payDone ? 'Conferidos' : 'Por conferir', tone: payDone ? 'ok' : 'ink' },
    { l: 'Pendências', v: pendDone ? 'Revistas' : `${pendLeft} por rever`, tone: pendDone ? 'ok' : 'ink' },
    { l: 'Ocorrências', v: '1 registada', tone: 'ink' },
  ] as const;
  const next = !cashDone ? 'dinheiro' : !payDone ? 'pagamentos' : !pendDone ? 'pendencias' : 'assumir';
  const started = h.revealed || Object.keys(h.pays).length > 0 || Object.keys(h.pend).length > 0;
  /** Linha de estado por meio de pagamento (valor escrito vs. sistema). */
  const payLine = (k: string) => {
    const p = SHIFT_PAYS.find((x) => x.k === k)!;
    const raw = h.payV[k] ?? '';
    if (!raw) return { has: false, l: `Introduz o valor do ${p.proof}`, tone: 'muted' as const };
    const df = pKz(raw) - p.v;
    return df === 0 ? { has: true, l: 'Bate certo com o sistema', tone: 'ok' as const } : { has: true, l: `Diferença de ${df > 0 ? '+' : '−'}${knc(Math.abs(df))} Kz`, tone: 'bad' as const };
  };
  return { coin, payLine, counted, dif, difL, cashDone, payDone, pendDone, tiles, next, started };
}
