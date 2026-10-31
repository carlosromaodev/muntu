import React, { createContext, useContext } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

/**
 * Responsividade do desktop.
 *
 * Pontos de quebra (largura da janela):
 * - ≥ 1280  menu lateral 256 px, margens 40 px (o desenho)
 * - 1024–1279  menu lateral 224 px, margens 28 px
 * - 640–1023  menu em gaveta (botão no cabeçalho), margens 20 px
 * - < 640  gaveta, margens 16 px
 */
export type DeskSize = 'xl' | 'lg' | 'md' | 'sm';

export const sizeOf = (w: number): DeskSize => (w >= 1280 ? 'xl' : w >= 1024 ? 'lg' : w >= 640 ? 'md' : 'sm');
export const RAIL_W: Record<DeskSize, number> = { xl: 256, lg: 224, md: 0, sm: 0 };
export const GUT_PX: Record<DeskSize, number> = { xl: 40, lg: 28, md: 20, sm: 16 };

/**
 * Margem lateral das páginas. Na web é uma variável CSS que muda com a largura da janela
 * (sem re-render); fora da web fica nos 40 px do desenho.
 */
export const GUT: number = Platform.OS === 'web' ? ('var(--gut, 40px)' as unknown as number) : 40;

if (Platform.OS === 'web' && typeof document !== 'undefined' && !document.getElementById('muntu-desk-gut')) {
  const s = document.createElement('style');
  s.id = 'muntu-desk-gut';
  s.textContent = [
    ':root{--gut:40px}',
    '@media (max-width:1279px){:root{--gut:28px}}',
    '@media (max-width:1023px){:root{--gut:20px}}',
    '@media (max-width:639px){:root{--gut:16px}}',
  ].join('');
  document.head.appendChild(s);
}

type Layout = { size: DeskSize; window: number; content: number; gut: number; drawer: boolean };

const Ctx = createContext<Layout | null>(null);

export function DeskLayoutProvider({ value, children }: { value: Layout; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Medidas da área de conteúdo (janela menos o menu lateral). */
export function useDeskLayout(): Layout {
  const ctx = useContext(Ctx);
  const { width } = useWindowDimensions();
  if (ctx) return ctx;
  const size = sizeOf(width);
  return { size, window: width, content: width, gut: GUT_PX[size], drawer: false };
}

/** Largura útil dentro das margens da página. */
export const useInner = () => {
  const l = useDeskLayout();
  return l.content - 2 * l.gut;
};
