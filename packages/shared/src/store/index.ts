import { create } from 'zustand';
import { APPROVALS, type Approval, TAREFAS_INICIAIS, type StatusKey } from '../data/sample';
import type { HapticKind } from '../lib/haptics';

export type Role = 'gestao' | 'membro';
export type ThemePref = 'system' | 'light' | 'dark';
export type Filial = 'todas' | 'talatona' | 'kilamba' | 'maianga';

export type Toast = { id: number; text: string; tone: 'ok' | 'warn' | 'bad' | 'info' };
export type Tarefa = { id: string; n: string; t: string; quem: string; st: StatusKey; res: string };

type State = {
  role: Role;
  themePref: ThemePref;
  filial: Filial;
  offline: boolean;
  caixaAberto: boolean;
  approvals: Approval[];
  tarefas: Tarefa[];
  smsDone: Record<string, string>;
  toasts: Toast[];
  setRole: (r: Role) => void;
  setThemePref: (t: ThemePref) => void;
  setFilial: (f: Filial) => void;
  setOffline: (v: boolean) => void;
  setCaixa: (v: boolean) => void;
  addApproval: (a: Approval) => void;
  decide: (id: string, status: 'aprovado' | 'recusado') => void;
  addTarefa: (t: Tarefa) => void;
  updTarefa: (id: string, patch: Partial<Tarefa>) => void;
  markSms: (who: string, at: string) => void;
  toast: (text: string, tone?: Toast['tone']) => void;
  dismiss: (id: number) => void;
};

let toastId = 1;

export const useMuntu = create<State>((set) => ({
  role: 'gestao',
  themePref: 'system',
  filial: 'todas',
  offline: false,
  caixaAberto: true,
  approvals: APPROVALS,
  tarefas: TAREFAS_INICIAIS,
  smsDone: {},
  toasts: [],
  setRole: (role) => set({ role }),
  setThemePref: (themePref) => set({ themePref }),
  setFilial: (filial) => set({ filial }),
  setOffline: (offline) => set({ offline }),
  setCaixa: (caixaAberto) => set({ caixaAberto }),
  addApproval: (a) => set((s) => ({ approvals: [a, ...s.approvals.filter((x) => x.id !== a.id)] })),
  decide: (id, status) => set((s) => ({ approvals: s.approvals.map((a) => (a.id === id ? { ...a, status } : a)) })),
  addTarefa: (t) => set((s) => ({ tarefas: [t, ...s.tarefas] })),
  updTarefa: (id, patch) => set((s) => ({ tarefas: s.tarefas.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
  markSms: (who, at) => set((s) => ({ smsDone: { ...s.smsDone, [who]: at } })),
  toast: (text, tone = 'info') => {
    const id = toastId++;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, text, tone }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3600);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const pendingCount = (s: State) => s.approvals.filter((a) => !a.status).length;

export const toneHaptic: Record<Toast['tone'], HapticKind> = { ok: 'success', warn: 'warning', bad: 'error', info: 'tap' };
