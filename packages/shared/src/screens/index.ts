import type React from 'react';
import type { ScreenId } from '../shell/nav';
import { Recepcao } from './gestao/Recepcao';
import { Inscricao } from './gestao/Inscricao';
import { Membro } from './gestao/Membro';
import { Caixa } from './gestao/Caixa';
import { Turno } from './gestao/Turno';
import { Tesouraria } from './gestao/Tesouraria';
import { Painel } from './gestao/Painel';
import { Aprovacoes } from './gestao/Aprovacoes';
import { Retencao } from './gestao/Retencao';
import { Planos } from './gestao/Planos';
import { Rede } from './gestao/Rede';
import { Avisos } from './gestao/Avisos';
import { Acesso } from './membro/Acesso';
import { Plano } from './membro/Plano';

/** As 14 telas: 12 de gestão + 2 da app do membro. */
export const SCREENS: Record<ScreenId, React.ComponentType> = {
  recepcao: Recepcao,
  inscricao: Inscricao,
  membro: Membro,
  caixa: Caixa,
  turno: Turno,
  tesouraria: Tesouraria,
  painel: Painel,
  aprovacoes: Aprovacoes,
  retencao: Retencao,
  planos: Planos,
  rede: Rede,
  avisos: Avisos,
  acesso: Acesso,
  plano: Plano,
};
