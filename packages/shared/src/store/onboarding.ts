import { create } from 'zustand';

/** Criar conta do ginásio (5 passos), partilhado pelo telemóvel e pelo desktop. */
type Ob = {
  nome: string; tel: string; email: string; pw: string; gym: string; nif: string; city: string; fils: string[]; ok: boolean;
  imported: Record<string, boolean>; merge: Record<string, boolean>; imDone: boolean;
  aud: Record<string, boolean>; text: string | null; when: 'now' | 'tom'; smSt: 'form' | 'sending' | 'done'; smSent: number; retry: boolean;
  set: (p: Partial<Ob>) => void;
};
export const useOnboarding = create<Ob>((set) => ({
  nome: 'Paulo Neto', tel: '927 220 001', email: '', pw: '', gym: 'Mwangolé Fit', nif: '5417 2290 11', city: 'Luanda', fils: ['Talatona', 'Kilamba', 'Maianga'], ok: false,
  imported: {}, merge: { mem: true, stf: true }, imDone: false,
  aud: { mem: true, stf: true }, text: null, when: 'now', smSt: 'form', smSent: 0, retry: false,
  set: (p) => set(p),
}));

export const IMPORT_KINDS = [
  { k: 'mem', l: 'Membros', d: 'Nome, telefone, plano e data de fim', f: 'membros_', lines: '1 243 linhas', cols: [['Nome', 1], ['Telefone', 1], ['Plano', 1], ['Data de fim', 1], ['NIF', 1], ['Notas', 0]] as [string, number][], ok: 1214, dup: 23, bad: 6, errs: [['118', 'Joana K.', 'Telefone com 8 dígitos'], ['402', '—', 'Nome em falta'], ['977', 'Rui Pinto', 'Plano “Promo 2023” não existe']] },
  { k: 'stf', l: 'Funcionários', d: 'Nome, telefone e função', f: 'equipa_', lines: '9 linhas', cols: [['Nome', 1], ['Telefone', 1], ['Função', 1], ['Filial', 1]] as [string, number][], ok: 9, dup: 0, bad: 0, errs: [] as string[][] },
];

export function onboardingCounts(o: Ob) {
  const memN = o.imported.mem ? 1214 + (o.merge.mem ? 23 : 0) : 0;
  const stfN = o.imported.stf ? 9 : 0;
  const total = (o.aud.mem ? memN : 0) + (o.aud.stf ? stfN : 0);
  const slug = (o.gym || 'ginasio').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '_');
  const defText = `${(o.gym || 'O teu ginásio').toUpperCase()} está agora na MUNTU. Entra na app com o teu número e a senha temporária {senha}: muntu.ao/app`;
  return { memN, stfN, total, slug, text: o.text ?? defText };
}
