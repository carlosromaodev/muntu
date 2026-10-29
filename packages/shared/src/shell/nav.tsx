import React, { createContext, useContext } from 'react';

export type ScreenId =
  | 'recepcao' | 'inscricao' | 'membro' | 'caixa' | 'turno' | 'tesouraria'
  | 'painel' | 'aprovacoes' | 'retencao' | 'planos' | 'rede' | 'avisos'
  | 'acesso' | 'plano';

export type NavMode = 'top' | 'bottom' | 'auto';

export type NavParams = Record<string, string | undefined>;

type Ctx = {
  screen: ScreenId;
  params: NavParams;
  go: (id: ScreenId, params?: NavParams) => void;
  /** Espaço inferior ocupado pela barra de navegação (para o scroll). */
  bottomInset: number;
};

const NavContext = createContext<Ctx>({ screen: 'recepcao', params: {}, go: () => {}, bottomInset: 0 });

export const NavProvider = NavContext.Provider;
export const useNav = () => useContext(NavContext);

export type RouteMeta = { id: ScreenId; label: string; short: string; group: 'gestao' | 'membro'; hint: string };

export const ROUTES: RouteMeta[] = [
  { id: 'recepcao', label: 'Recepção', short: 'Recepção', group: 'gestao', hint: 'Check-ins, caixa do turno, dívidas' },
  { id: 'inscricao', label: 'Inscrição', short: 'Inscrição', group: 'gestao', hint: 'Nova inscrição em 4 passos' },
  { id: 'membro', label: 'Membro', short: 'Membro', group: 'gestao', hint: 'Ficha, pagamentos, entradas e avisos' },
  { id: 'caixa', label: 'Caixa', short: 'Caixa', group: 'gestao', hint: 'Fecho com contagem cega' },
  { id: 'turno', label: 'Turno', short: 'Turno', group: 'gestao', hint: 'Passagem de turno e pendências' },
  { id: 'tesouraria', label: 'Tesouraria', short: 'Tesouraria', group: 'gestao', hint: 'Livro razão, estornos' },
  { id: 'painel', label: 'Painel', short: 'Painel', group: 'gestao', hint: 'Receita, fugas, filiais' },
  { id: 'aprovacoes', label: 'Aprovações', short: 'Aprovar', group: 'gestao', hint: 'Pedidos à espera do dono' },
  { id: 'retencao', label: 'Retenção', short: 'Retenção', group: 'gestao', hint: 'Membros em risco e tarefas' },
  { id: 'planos', label: 'Planos', short: 'Planos', group: 'gestao', hint: 'Planos, preços e regras' },
  { id: 'rede', label: 'Rede', short: 'Rede', group: 'gestao', hint: 'Acesso entre ginásios' },
  { id: 'avisos', label: 'Avisos SMS', short: 'Avisos', group: 'gestao', hint: 'Automações SMS e WhatsApp' },
  { id: 'acesso', label: 'Acesso', short: 'Acesso', group: 'membro', hint: 'QR de entrada' },
  { id: 'plano', label: 'O meu plano', short: 'Plano', group: 'membro', hint: 'Mensalidade e pagamentos' },
];

export const isScreenId = (s: unknown): s is ScreenId => typeof s === 'string' && ROUTES.some((r) => r.id === s);

/** Separadores principais da barra inferior (o resto fica em "Mais"). */
export const BOTTOM_TABS: Record<'gestao' | 'membro', ScreenId[]> = {
  gestao: ['recepcao', 'caixa', 'painel', 'aprovacoes'],
  membro: ['acesso', 'plano'],
};
