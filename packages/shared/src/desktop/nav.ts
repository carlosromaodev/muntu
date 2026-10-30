import type { Role } from '../data/mobile';

export type DRole = Exclude<Role, 'membro'>;

/** Ecrãs do desktop (rota → rótulo). */
export const ROUTES = {
  rececao: 'Recepção',
  inscricao: 'Inscrição',
  membros: 'Membros',
  cobrar: 'Cobrar',
  caixa: 'Caixa',
  pendencias: 'Pendências',
  recuperacao: 'Recuperação',
  avisos: 'Avisos',
  tesouraria: 'Tesouraria',
  agenda: 'Agenda',
  actividades: 'Actividades',
  painel: 'Painel',
  equipa: 'Equipa',
  'receitas-perdidas': 'Receitas perdidas',
  filiais: 'Filiais',
  planos: 'Planos',
  gestao: 'Gestão',
  rede: 'Rede',
  'avisos-sms': 'Avisos SMS',
  'ginasio-agora': 'Ginásio agora',
} as const;
export type DRoute = keyof typeof ROUTES;

/** Menu lateral de cada papel (igual ao desenho "MUNTU Desktop v8"). */
export const NAVS: Record<DRole, [DRoute, string][]> = {
  rececao: [['rececao', 'Recepção'], ['inscricao', 'Inscrição'], ['membros', 'Membros'], ['cobrar', 'Cobrar'], ['caixa', 'Caixa'], ['pendencias', 'Pendências'], ['recuperacao', 'Recuperação'], ['avisos', 'Avisos']],
  financas: [['tesouraria', 'Tesouraria'], ['caixa', 'Caixa'], ['cobrar', 'Facturas'], ['recuperacao', 'Renovações'], ['avisos', 'Avisos']],
  pt: [['agenda', 'Agenda'], ['actividades', 'Actividades'], ['recuperacao', 'Clientes em risco'], ['avisos', 'Avisos']],
  dono: [['painel', 'Painel'], ['pendencias', 'Pendências'], ['equipa', 'Equipa'], ['actividades', 'Actividades'], ['receitas-perdidas', 'Receitas perdidas'], ['recuperacao', 'Recuperação'], ['filiais', 'Filiais'], ['planos', 'Planos'], ['gestao', 'Gestão'], ['rede', 'Rede'], ['avisos-sms', 'Avisos SMS']],
};

/** Papel por omissão quando se abre um ecrã directamente pelo endereço. */
export const DEFAULT_ROLE: Partial<Record<DRoute, DRole>> = {
  tesouraria: 'financas',
  agenda: 'pt',
  painel: 'dono',
  equipa: 'dono',
  'receitas-perdidas': 'dono',
  filiais: 'dono',
  planos: 'dono',
  gestao: 'dono',
  rede: 'dono',
  'avisos-sms': 'dono',
  actividades: 'dono',
};

export const HOME: Record<DRole, DRoute> = { rececao: 'rececao', financas: 'tesouraria', pt: 'agenda', dono: 'painel' };

export const WHO: Record<DRole, { i: string; n: string; r: string }> = {
  rececao: { i: 'TL', n: 'Teresa Lunda', r: 'Recepção' },
  financas: { i: 'JA', n: 'Jorge Afonso', r: 'Finanças' },
  pt: { i: 'NS', n: 'Nuno Sebastião', r: 'Personal trainer' },
  dono: { i: 'PN', n: 'Paulo Neto', r: 'Dono' },
};
