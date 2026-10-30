#!/usr/bin/env node
/**
 * Gera os ficheiros de rota do Expo Router nas três apps a partir de um único mapa.
 * Cada rota é uma linha fina que importa o ecrã de @muntu/shared.
 *   node tools/gen-routes.mjs
 */
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Mobile (iOS, Android e web mobile). Valor: "Componente" ou "Componente:papel". */
const MOBILE = {
  _layout: '@layout',
  index: 'Login',
  '+not-found': '@notfound',
  'criar-conta/index': 'ObConta',
  'criar-conta/ginasio': 'ObGinasio',
  'criar-conta/importar': 'ObImportar',
  'criar-conta/confirmar': 'ObConfirmar',
  'criar-conta/avisar': 'ObAvisar',
  'receber-turno/index': 'ReceberTurno',
  'receber-turno/dinheiro': 'ContarDinheiro',
  'receber-turno/pagamentos': 'ConferirPagamentos',
  'receber-turno/pendencias': 'ReverPendencias',
  'receber-turno/assumir': 'AssumirTurno',
  'membro/_layout': '@tabs:membro',
  'membro/acesso': 'Acesso',
  'membro/actividades': 'ActividadesMembro',
  'membro/pt': 'ReservarPT',
  'membro/plano': 'Plano',
  'membro/conta': 'ContaMembro',
  'rececao/_layout': '@tabs:rececao',
  'rececao/entradas': 'Entradas',
  'rececao/membros': 'Membros',
  'rececao/inscrever': 'Inscrever',
  'rececao/cobrar': 'Cobrar',
  'rececao/avisos': 'Avisos:rececao',
  'rececao/turno': 'Turno:rececao',
  'financas/_layout': '@tabs:financas',
  'financas/resumo': 'Resumo',
  'financas/cobrancas': 'Cobrancas',
  'financas/avisos': 'Avisos:financas',
  'financas/turno': 'Turno:financas',
  'pt/_layout': '@tabs:pt',
  'pt/agenda': 'Agenda',
  'pt/pedidos': 'Pedidos',
  'pt/actividades': 'ActividadesEquipa:pt',
  'pt/avisos': 'Avisos:pt',
  'pt/turno': 'Turno:pt',
  'dono/_layout': '@tabs:dono',
  'dono/painel': 'Painel',
  'dono/equipa': 'EquipaDono',
  'dono/actividades': 'ActividadesEquipa:dono',
  'dono/aprovacoes': 'Aprovacoes',
  'dono/conta': 'ContaDono',
  'ginasio-agora': 'GinasioAgora',
  recuperacao: 'Recuperacao',
  'passar-turno': 'PassarTurno',
  'nova-actividade': 'NovaActividade',
  pagamento: 'Pagamento',
  indica: 'Indica',
  filiais: 'Filiais',
  'avisos-equipa': 'AvisosEquipa',
  'receitas-perdidas': 'ReceitasPerdidas',
  'nova-filial': 'NovaFilial',
  cofre: 'Cofre',
  regras: 'Regras',
  indicacoes: 'Indicacoes',
  importar: 'Importar',
  ocorrencia: 'Ocorrencia',
  marca: 'Marca',
};

/** Desktop (web). As rotas dentro de (app) têm a barra lateral. */
const DESKTOP = {
  _layout: '@dlayout',
  index: 'DLogin',
  '+not-found': '@notfound',
  'criar-conta': 'DCriarConta',
  'receber-turno': 'DReceberTurno',
  '(app)/_layout': '@shell',
  '(app)/rececao': 'DRececao',
  '(app)/inscricao': 'DInscricao',
  '(app)/membros': 'DMembros',
  '(app)/cobrar': 'DCobrar',
  '(app)/caixa': 'DCaixa',
  '(app)/pendencias': 'DPendencias',
  '(app)/recuperacao': 'DRecuperacao',
  '(app)/avisos': 'DAvisos',
  '(app)/tesouraria': 'DTesouraria',
  '(app)/agenda': 'DAgenda',
  '(app)/actividades': 'DActividades',
  '(app)/painel': 'DPainel',
  '(app)/equipa': 'DEquipa',
  '(app)/receitas-perdidas': 'DReceitasPerdidas',
  '(app)/filiais': 'DFiliais',
  '(app)/planos': 'DPlanos',
  '(app)/gestao': 'DGestao',
  '(app)/rede': 'DRede',
  '(app)/avisos-sms': 'DAvisosSms',
  '(app)/marca': 'DMarca',
  '(app)/ginasio-agora': 'DGinasioAgora',
};

const header = '// Gerado por tools/gen-routes.mjs — não editar à mão.\n';

function file(kind, spec) {
  const pkg = kind === 'mobile' ? '@muntu/shared/mobile' : '@muntu/shared/desktop';
  if (spec === '@layout')
    return `${header}import { RootProviders } from '@muntu/shared';\nimport { MobileStack } from '@muntu/shared/mobile';\n\nexport default function Layout() {\n  return (\n    <RootProviders>\n      <MobileStack />\n    </RootProviders>\n  );\n}\n`;
  if (spec === '@dlayout')
    return `${header}import { Slot } from 'expo-router';\nimport { RootProviders } from '@muntu/shared';\n\nexport default function Layout() {\n  return (\n    <RootProviders>\n      <Slot />\n    </RootProviders>\n  );\n}\n`;
  if (spec === '@shell') return `${header}import { DesktopShell } from '@muntu/shared/desktop';\n\nexport default DesktopShell;\n`;
  if (spec === '@notfound') return `${header}import { Redirect } from 'expo-router';\n\nexport default function NotFound() {\n  return <Redirect href="/" />;\n}\n`;
  if (spec.startsWith('@tabs:')) {
    const r = spec.slice(6);
    return `${header}import { RoleTabs } from '@muntu/shared/mobile';\n\nexport default function Layout() {\n  return <RoleTabs role="${r}" />;\n}\n`;
  }
  const [comp, role] = spec.split(':');
  if (role) return `${header}import { ${comp} } from '${pkg}';\n\nexport default function Screen() {\n  return <${comp} role="${role}" />;\n}\n`;
  return `${header}export { ${comp} as default } from '${pkg}';\n`;
}

function write(appDir, kind, map) {
  const dir = join(root, 'apps', appDir, 'app');
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  for (const [route, spec] of Object.entries(map)) {
    const p = join(dir, `${route}.tsx`);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, file(kind, spec));
  }
  console.log(`${appDir}: ${Object.keys(map).length} rotas`);
}

write('ios-android', 'mobile', MOBILE);
write('web-mobile', 'mobile', MOBILE);
write('web-desktop', 'desktop', DESKTOP);
