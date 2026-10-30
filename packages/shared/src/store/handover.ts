import { create } from 'zustand';
import { DENOMS, SHIFT_EXPECTED_CASH, SHIFT_PAYS, SHIFT_PENDING } from '../data/mobile';
import { kn } from '../lib/format';

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
  pend: Record<string, string>;
  exc: boolean;
  excMot: string;
  done: boolean;
  setQ: (k: string, v: number) => void;
  reveal: () => void;
  setOpt: (o: Opt) => void;
  setJust: (s: string) => void;
  setPay: (k: string, v: string) => void;
  setPend: (k: string, v: string) => void;
  toggleExc: () => void;
  setExcMot: (s: string) => void;
  finish: () => void;
  reset: () => void;
};

const initial = { q: { n5000: 0, n2000: 0, n1000: 0, n500: 0, n200: 0, coin: 0 }, revealed: false, opt: '' as Opt, just: '', pays: {}, pend: {}, exc: false, excMot: '', done: false };

export const useHandover = create<Handover>((set) => ({
  ...initial,
  setQ: (k, v) => set((s) => ({ q: { ...s.q, [k]: Math.max(0, v) } })),
  reveal: () => set({ revealed: true }),
  setOpt: (opt) => set(opt === 'recount' ? { revealed: false, opt: '' } : { opt }),
  setJust: (just) => set({ just }),
  setPay: (k, v) => set((s) => ({ pays: { ...s.pays, [k]: v } })),
  setPend: (k, v) => set((s) => ({ pend: { ...s.pend, [k]: v } })),
  toggleExc: () => set((s) => ({ exc: !s.exc })),
  setExcMot: (excMot) => set({ excMot }),
  finish: () => set({ done: true }),
  reset: () => set(initial),
}));

/** Valores derivados da conferência. */
export function handoverView(h: Handover) {
  const counted = DENOMS.reduce((a, d) => a + (h.q[d.k] ?? 0) * d.v, 0);
  const dif = counted - SHIFT_EXPECTED_CASH;
  const cashDone = h.revealed && (dif === 0 || (!!h.opt && h.opt !== 'recount'));
  const payDone = SHIFT_PAYS.every((p) => h.pays[p.k]);
  const pendDone = SHIFT_PENDING.every((p) => h.pend[p.id]);
  const pendLeft = SHIFT_PENDING.length - Object.keys(h.pend).length;
  const difL = `${dif > 0 ? '+' : dif < 0 ? '−' : ''}${kn(Math.abs(dif))} Kz`;
  const tiles = [
    { l: 'Caixa', v: cashDone ? (dif === 0 ? 'Conferido' : 'Com ressalva') : 'Por conferir', tone: cashDone ? (dif === 0 ? 'ok' : 'warn') : 'ink' },
    { l: 'Pagamentos', v: payDone ? 'Conferidos' : 'Por conferir', tone: payDone ? 'ok' : 'ink' },
    { l: 'Pendências', v: pendDone ? 'Revistas' : `${pendLeft} por rever`, tone: pendDone ? 'ok' : 'ink' },
    { l: 'Ocorrências', v: '1 registada', tone: 'ink' },
  ] as const;
  const next = !cashDone ? 'dinheiro' : !payDone ? 'pagamentos' : !pendDone ? 'pendencias' : 'assumir';
  const started = h.revealed || Object.keys(h.pays).length > 0 || Object.keys(h.pend).length > 0;
  return { counted, dif, difL, cashDone, payDone, pendDone, tiles, next, started };
}
