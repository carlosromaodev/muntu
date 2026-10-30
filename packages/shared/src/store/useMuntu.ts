import { create } from 'zustand';
import { ACTIVITIES, Activity, NOTICE_TARGETS, NOTICES, Role } from '../data/mobile';

export type Doc = { doc: string; n: string; h: string; v: number; st: string; tone: 'ok' | 'warn' };
export type SentNotice = { p: 'urgente' | 'normal'; t: string; h: string; to: keyof typeof NOTICE_TARGETS; r: number; n: number };
export type Outcome = { r: string; m: string };

type State = {
  /* sessão */
  role: Role | null;
  signIn: (r: Role) => void;
  signOut: () => void;

  /* recepção */
  manual: string[];
  paidCheckins: Record<string, true>;
  refusedCheckins: Record<string, true>;
  docs: Doc[];
  seq: number;
  addManualEntry: (name: string) => void;
  refuseCheckin: (id: string) => void;
  issueDoc: (d: Omit<Doc, 'doc'> & { prefix: 'FR' | 'FT' }, paidCheckin?: string) => string;

  /* avisos */
  readNotices: Record<string, true>;
  sentNotices: SentNotice[];
  markRead: (id: string) => void;
  sendNotice: (n: Omit<SentNotice, 'h' | 'r' | 'n'>) => void;

  /* actividades */
  activities: Activity[];
  setActivityState: (id: string, st: Activity['st']) => void;
  addActivity: (a: Activity) => void;

  /* recuperação, receitas perdidas, cobranças */
  outcomes: Record<string, Outcome>;
  saveOutcome: (id: string, o: Outcome) => void;
  lostState: Record<string, 'pot' | 'conf' | 'res'>;
  lostSent: Record<string, true>;
  setLost: (id: string, st: 'pot' | 'conf' | 'res') => void;
  sendLost: (id: string) => void;
  smsDone: Record<string, string>;
  sendSms: (names: string[]) => void;

  /* aprovações */
  approvals: Record<string, 'ok' | 'no'>;
  decide: (id: string, d: 'ok' | 'no') => void;

  /* PT */
  ptMarked: Record<string, true>;
  ptRequests: Record<string, 'aceite' | 'recusado'>;
  markSession: (id: string) => void;
  answerRequest: (id: string, a: 'aceite' | 'recusado') => void;

  /* turno */
  onShift: boolean;
  setShift: (v: boolean) => void;

  /* membro */
  reservations: Record<string, true>;
  waitlist: Record<string, number>;
  joinedChallenges: Record<string, boolean>;
  joinedEvents: Record<string, boolean>;
  toggleReservation: (key: string) => void;
  toggleWait: (key: string) => void;
  toggleChallenge: (id: string) => void;
  toggleEvent: (id: string) => void;
  prefs: Record<string, boolean>;
  togglePref: (k: string) => void;
};

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Estado partilhado da operação (o que um ecrã muda, os outros vêem). */
export const useMuntu = create<State>((set, get) => ({
  role: null,
  signIn: (role) => set({ role }),
  signOut: () => set({ role: null }),

  manual: [],
  paidCheckins: {},
  refusedCheckins: {},
  docs: [],
  seq: 1204,
  addManualEntry: (name) => set((s) => (s.manual.includes(name) ? s : { manual: [name, ...s.manual] })),
  refuseCheckin: (id) => set((s) => ({ refusedCheckins: { ...s.refusedCheckins, [id]: true } })),
  issueDoc: ({ prefix, ...d }, paidCheckin) => {
    const s = get();
    const doc = `${prefix} TAL/2026/${prefix === 'FR' ? s.seq : '0089'}`;
    set({
      seq: prefix === 'FR' ? s.seq + 1 : s.seq,
      docs: [{ ...d, doc }, ...s.docs],
      paidCheckins: paidCheckin ? { ...s.paidCheckins, [paidCheckin]: true } : s.paidCheckins,
    });
    return doc;
  },

  readNotices: {},
  sentNotices: [],
  markRead: (id) => set((s) => ({ readNotices: { ...s.readNotices, [id]: true } })),
  sendNotice: (n) => set((s) => ({ sentNotices: [{ ...n, h: 'Agora', r: 0, n: NOTICE_TARGETS[n.to] }, ...s.sentNotices] })),

  activities: ACTIVITIES,
  setActivityState: (id, st) => set((s) => ({ activities: s.activities.map((a) => (a.id === id ? { ...a, st } : a)) })),
  addActivity: (a) => set((s) => ({ activities: [a, ...s.activities] })),

  outcomes: {},
  saveOutcome: (id, o) => set((s) => ({ outcomes: { ...s.outcomes, [id]: o } })),
  lostState: {},
  lostSent: {},
  setLost: (id, st) => set((s) => ({ lostState: { ...s.lostState, [id]: st } })),
  sendLost: (id) => set((s) => ({ lostSent: { ...s.lostSent, [id]: true } })),
  smsDone: {},
  sendSms: (names) =>
    set((s) => {
      const o = { ...s.smsDone };
      names.forEach((n) => {
        if (!o[n]) o[n] = now();
      });
      return { smsDone: o };
    }),

  approvals: {},
  decide: (id, d) => set((s) => ({ approvals: { ...s.approvals, [id]: d } })),

  ptMarked: {},
  ptRequests: {},
  markSession: (id) => set((s) => ({ ptMarked: { ...s.ptMarked, [id]: true } })),
  answerRequest: (id, a) => set((s) => ({ ptRequests: { ...s.ptRequests, [id]: a } })),

  onShift: true,
  setShift: (onShift) => set({ onShift }),

  reservations: { '0-1': true },
  waitlist: { '0-4': 1 },
  joinedChallenges: { d1: true },
  joinedEvents: {},
  toggleReservation: (key) =>
    set((s) => {
      const r = { ...s.reservations };
      if (r[key]) delete r[key];
      else r[key] = true;
      return { reservations: r };
    }),
  toggleWait: (key) => set((s) => ({ waitlist: { ...s.waitlist, [key]: s.waitlist[key] ? 0 : 2 } })),
  toggleChallenge: (id) => set((s) => ({ joinedChallenges: { ...s.joinedChallenges, [id]: !s.joinedChallenges[id] } })),
  toggleEvent: (id) => set((s) => ({ joinedEvents: { ...s.joinedEvents, [id]: !s.joinedEvents[id] } })),
  prefs: { sms: true, wa: false, bio: true, fug: true },
  togglePref: (k) => set((s) => ({ prefs: { ...s.prefs, [k]: !s.prefs[k] } })),
}));

export const unreadCount = (read: Record<string, true>) => NOTICES.filter((n) => !read[n.id]).length;
