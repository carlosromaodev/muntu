import type React from 'react';
import type { DesktopId, MobileId } from './shell/nav';
import { Recepcao } from './desktop/screens/Recepcao';
import { Inscricao } from './desktop/screens/Inscricao';
import { Membro } from './desktop/screens/Membro';
import { Caixa } from './desktop/screens/Caixa';
import { Tesouraria } from './desktop/screens/Tesouraria';
import { Painel } from './desktop/screens/Painel';
import { Planos } from './desktop/screens/Planos';
import { Rede } from './desktop/screens/Rede';
import { Avisos } from './desktop/screens/Avisos';
import { Acesso } from './mobile/screens/Acesso';
import { Plano } from './mobile/screens/Plano';
import { Aulas } from './mobile/screens/Aulas';
import { DonoPainel } from './mobile/screens/DonoPainel';
import { Aprovacoes } from './mobile/screens/Aprovacoes';
import { Filiais } from './mobile/screens/Filiais';
import { Conta } from './mobile/screens/Conta';

/** Desktop (MUNTU Desktop v4): D1–D9. */
export const DESKTOP_SCREENS: Record<DesktopId, React.ComponentType> = {
  recepcao: Recepcao,
  inscricao: Inscricao,
  membro: Membro,
  caixa: Caixa,
  tesouraria: Tesouraria,
  painel: Painel,
  planos: Planos,
  rede: Rede,
  avisos: Avisos,
};

/** Mobile (MUNTU Mobile): M1 Acesso, M2 Plano, O1 Painel, O2 Aprovações + Aulas, Filiais, Conta. */
export const MOBILE_SCREENS: Record<MobileId, React.ComponentType> = {
  acesso: Acesso,
  plano: Plano,
  aulas: Aulas,
  dono: DonoPainel,
  aprovacoes: Aprovacoes,
  filiais: Filiais,
  conta: Conta,
};
