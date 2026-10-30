import { Role } from '../data/mobile';

/** Separadores de cada papel no telemóvel (iguais ao desenho). */
export const TABS: Record<Role, { route: string; label: string }[]> = {
  membro: [
    { route: 'acesso', label: 'Acesso' },
    { route: 'actividades', label: 'Actividades' },
    { route: 'pt', label: 'PT' },
    { route: 'plano', label: 'Plano' },
    { route: 'conta', label: 'Conta' },
  ],
  rececao: [
    { route: 'entradas', label: 'Entradas' },
    { route: 'membros', label: 'Membros' },
    { route: 'inscrever', label: 'Inscrever' },
    { route: 'cobrar', label: 'Cobrar' },
    { route: 'avisos', label: 'Avisos' },
  ],
  financas: [
    { route: 'resumo', label: 'Resumo' },
    { route: 'cobrancas', label: 'Cobranças' },
    { route: 'avisos', label: 'Avisos' },
    { route: 'turno', label: 'Turno' },
  ],
  pt: [
    { route: 'agenda', label: 'Agenda' },
    { route: 'pedidos', label: 'Pedidos' },
    { route: 'actividades', label: 'Actividades' },
    { route: 'avisos', label: 'Avisos' },
    { route: 'turno', label: 'Turno' },
  ],
  dono: [
    { route: 'painel', label: 'Painel' },
    { route: 'equipa', label: 'Equipa' },
    { route: 'actividades', label: 'Actividades' },
    { route: 'aprovacoes', label: 'Aprovações' },
    { route: 'conta', label: 'Conta' },
  ],
};

/** Ecrã inicial de cada papel. */
export const home = (r: Role) => `/${r}/${TABS[r][0]!.route}` as const;

export const HOME_LABEL: Record<Role, string> = { membro: 'Acesso', rececao: 'Entradas', financas: 'Resumo', pt: 'Agenda', dono: 'Painel' };
