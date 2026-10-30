import React, { memo } from 'react';
import { SvgXml } from 'react-native-svg';

/**
 * Ícones de linha dos protótipos (viewBox 24, traço 1,6, pontas rectas).
 * A chave é o rótulo do separador / item de menu, como no desenho.
 */
const P: Record<string, string> = {
  Acesso: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  Actividades: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  PT: '<path d="M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11"/>',
  Plano: '<rect x="3" y="6" width="18" height="12"/><path d="M3 10h18M7 15h4"/>',
  Conta: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.9-3.8 3.6-6 7-6s6.1 2.2 7 6"/>',
  Entradas: '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M18 12H9"/>',
  Membros: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.7-3.3 3-5 6-5s5.3 1.7 6 5"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 15.3c1.5.7 2.6 2.3 3 4.7"/>',
  Inscrever: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.8-3.6 3.4-5.5 6.5-5.5 1.4 0 2.7.4 3.8 1.1"/><path d="M18 14v6M15 17h6"/>',
  Receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  Avisos: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  Resumo: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  Turno: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  Agenda: '<rect x="3.5" y="5" width="17" height="15"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  Pedidos: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
  Painel: '<rect x="4" y="4" width="7" height="9"/><rect x="13" y="4" width="7" height="5"/><rect x="13" y="11" width="7" height="9"/><rect x="4" y="15" width="7" height="5"/>',
  Equipa: '<circle cx="7" cy="9" r="2.6"/><circle cx="17" cy="9" r="2.6"/><circle cx="12" cy="7" r="2.6"/><path d="M2.5 19c.5-2.6 2.2-4 4.5-4M21.5 19c-.5-2.6-2.2-4-4.5-4M7.5 20c.6-3 2.3-4.6 4.5-4.6s3.9 1.6 4.5 4.6"/>',
  Aprovações: '<path d="M4 12.5l5 5L20 6.5"/>',
  // Menu do desktop
  Recepção: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/>',
  Card: '<rect x="3" y="6" width="18" height="12"/><path d="M3 10h18M7 15h4"/>',
  Caixa: '<rect x="3" y="9" width="18" height="11"/><path d="M7 9V5h10v4M12 13v3"/>',
  Pendências: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="17" r="3"/>',
  Recuperação: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>',
  'Clientes em risco': '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17v.5"/>',
  Tesouraria: '<path d="M3 10 12 4l9 6"/><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"/>',
  'Receitas perdidas': '<path d="M3 6l6 6 4-4 8 8"/><path d="M15 16h6v-6"/>',
  Filiais: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  Planos: '<path d="M4 7l8-4 8 4-8 4z"/><path d="M4 12l8 4 8-4M4 17l8 4 8-4"/>',
  Gestão: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  Marca: '<path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.7 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  Rede: '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M11 7 6 16M13 7l5 9M7.2 18h9.6"/>',
  'Avisos SMS': '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
};

/** Rótulos que partilham desenho, por contexto (mobile ou desktop). */
const MOBILE_ALIAS: Record<string, string> = { Cobrar: 'Receipt', Cobranças: 'Receipt' };
const DESK_ALIAS: Record<string, string> = { Cobrar: 'Card', Facturas: 'Receipt', Renovações: 'Recuperação', Inscrição: 'Inscrever' };

const FALLBACK = '<circle cx="12" cy="12" r="3"/>';

export function iconXml(name: string, desk = false) {
  const key = (desk ? DESK_ALIAS[name] : MOBILE_ALIAS[name]) ?? name;
  const body = P[key] ?? FALLBACK;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">${body}</svg>`;
}

export const Icon = memo(function Icon({ name, size = 22, color, desk }: { name: string; size?: number; color: string; desk?: boolean }) {
  return <SvgXml xml={iconXml(name, desk)} width={size} height={size} color={color} />;
});
