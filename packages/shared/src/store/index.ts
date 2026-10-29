import { create } from 'zustand';
import { APPROVALS, type Approval } from '../data/sample';
import type { HapticKind } from '../lib/haptics';

/** Papel na app mobile (o desktop é sempre a gestão do ginásio). */
export type Role = 'membro' | 'dono';
export type ThemePref = 'system' | 'light' | 'dark';
export type Filial = 'todas' | 'talatona' | 'kilamba' | 'maianga';

export type Toast = { id: number; text: string; tone: 'ok' | 'warn' | 'bad' | 'info' };

type State = {
  role: Role;
  themePref: ThemePref;
  filial: Filial;
  offline: boolean;
  caixaAberto: boolean;
  approvals: Approval[];
  smsDone: Record<string, string>;
  reservas: Record<string, boolean>;
  toasts: Toast[];
  setRole: (r: Role) => void;
  setThemePref: (t: ThemePref) => void;
  setFilial: (f: Filial) => void;
  setOffline: (v: boolean) => void;
  setCaixa: (v: boolean) => void;
  addApproval: (a: Approval) => void;
  decide: (id: string, status: 'aprovado' | 'recusado') => void;
  markSms: (who: string, at: string) => void;
  toggleReserva: (id: string) => void;
  toast: (text: string, tone?: Toast['tone']) => void;
  dismiss: (id: number) => void;
};

let toastId = 1;

export const useMuntu = create<State>((set) => ({
  role: 'membro',
  // O desenho é claro; o tema escuro fica disponível na Conta / no avatar.
  themePref: 'light',
  filial: 'todas',
  offline: false,
  caixaAberto: true,
  approvals: APPROVALS,
  smsDone: {},
  reservas: { a2: true },
  toasts: [],
  setRole: (role) => set({ role }),
  setThemePref: (themePref) => set({ themePref }),
  setFilial: (filial) => set({ filial }),
  setOffline: (offline) => set({ offline }),
  setCaixa: (caixaAberto) => set({ caixaAberto }),
  addApproval: (a) => set((s) => ({ approvals: [a, ...s.approvals.filter((x) => x.id !== a.id)] })),
  decide: (id, status) => set((s) => ({ approvals: s.approvals.map((a) => (a.id === id ? { ...a, status } : a)) })),
  markSms: (who, at) => set((s) => ({ smsDone: { ...s.smsDone, [who]: at } })),
  toggleReserva: (id) => set((s) => ({ reservas: { ...s.reservas, [id]: !s.reservas[id] } })),
  toast: (text, tone = 'info') => {
    const id = toastId++;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, text, tone }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3600);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const pendingCount = (s: State) => s.approvals.filter((a) => !a.status).length;

export const toneHaptic: Record<Toast['tone'], HapticKind> = { ok: 'success', warn: 'warning', bad: 'error', info: 'tap' };
