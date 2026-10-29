import { createContext, useContext } from 'react';

/** Ecrãs do desktop (D1–D9 do desenho) e do mobile (M = membro, O = dono). */
export type DesktopId = 'recepcao' | 'inscricao' | 'membro' | 'caixa' | 'tesouraria' | 'painel' | 'planos' | 'rede' | 'avisos';
export type MobileId = 'acesso' | 'plano' | 'aulas' | 'dono' | 'aprovacoes' | 'filiais' | 'conta';
export type ScreenId = DesktopId | MobileId;

/** desktop = web desktop; mobile = web mobile; auto = nativo (telemóvel → mobile, ecrã ≥ 1024 → desktop). */
export type UiMode = 'desktop' | 'mobile' | 'auto';

export type NavParams = Record<string, string | undefined>;

type Ctx = {
  screen: ScreenId;
  params: NavParams;
  go: (id: ScreenId, params?: NavParams) => void;
};

const NavContext = createContext<Ctx>({ screen: 'recepcao', params: {}, go: () => {} });
export const NavProvider = NavContext.Provider;
export const useNav = () => useContext(NavContext);

/** Navegação de topo do desktop — exactamente os 9 separadores do desenho. */
export const DESKTOP_NAV: { id: DesktopId; label: string; hint: string }[] = [
  { id: 'recepcao', label: 'Recepção', hint: 'Check-ins, caixa do turno, dívidas' },
  { id: 'inscricao', label: 'Inscrição', hint: 'Nova inscrição em 4 passos' },
  { id: 'membro', label: 'Membro', hint: 'Ficha, pagamentos, entradas e avisos' },
  { id: 'caixa', label: 'Caixa', hint: 'Fecho com contagem cega' },
  { id: 'tesouraria', label: 'Tesouraria', hint: 'Livro razão, estornos' },
  { id: 'painel', label: 'Painel', hint: 'Receita, aprovações, fugas, filiais' },
  { id: 'planos', label: 'Planos', hint: 'Planos, preços e regras' },
  { id: 'rede', label: 'Rede', hint: 'Acesso entre ginásios' },
  { id: 'avisos', label: 'Avisos SMS', hint: 'Automações SMS e WhatsApp' },
];

/** Barra inferior do mobile — 4 separadores por papel, como no desenho. */
export const MOBILE_TABS: Record<'membro' | 'dono', { id: MobileId; label: string }[]> = {
  membro: [
    { id: 'acesso', label: 'Acesso' },
    { id: 'plano', label: 'Plano' },
    { id: 'aulas', label: 'Aulas' },
    { id: 'conta', label: 'Conta' },
  ],
  dono: [
    { id: 'dono', label: 'Painel' },
    { id: 'aprovacoes', label: 'Aprovações' },
    { id: 'filiais', label: 'Filiais' },
    { id: 'conta', label: 'Conta' },
  ],
};

export const DESKTOP_IDS = DESKTOP_NAV.map((r) => r.id) as DesktopId[];
export const MOBILE_IDS: MobileId[] = ['acesso', 'plano', 'aulas', 'dono', 'aprovacoes', 'filiais', 'conta'];
export const isScreenId = (s: unknown): s is ScreenId => typeof s === 'string' && ((DESKTOP_IDS as string[]).includes(s) || (MOBILE_IDS as string[]).includes(s));
export const isDesktopId = (s: string): s is DesktopId => (DESKTOP_IDS as string[]).includes(s);
export const isMobileId = (s: string): s is MobileId => (MOBILE_IDS as string[]).includes(s);
