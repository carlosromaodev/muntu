import { useColorScheme, useWindowDimensions } from 'react-native';
import { useMuntu } from '../store';
import { bpFor, dark, gutter, light, type Bp, type Palette } from './tokens';

export * from './tokens';

export type Theme = {
  c: Palette;
  dark: boolean;
  bp: Bp;
  w: number;
  h: number;
  g: number; // margem lateral
  compact: boolean;
  wide: boolean;
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const pref = useMuntu((s) => s.themePref);
  const { width: w, height: h } = useWindowDimensions();
  const isDark = pref === 'system' ? scheme === 'dark' : pref === 'dark';
  const bp = bpFor(w);
  return { c: isDark ? dark : light, dark: isDark, bp, w, h, g: gutter(bp), compact: bp === 'compact', wide: bp === 'wide' };
}

export const toneColor = (c: Palette, tone: 'ok' | 'warn' | 'bad' | 'neutral' | 'ink') =>
  tone === 'ok'
    ? { fg: c.ok, dot: c.ok, bg: c.okBg }
    : tone === 'warn'
      ? { fg: c.warn, dot: c.warnDot, bg: c.warnBg }
      : tone === 'bad'
        ? { fg: c.bad, dot: c.bad, bg: c.badBg }
        : tone === 'ink'
          ? { fg: c.ink, dot: c.ink, bg: c.surface }
          : { fg: c.ink2, dot: c.ink2, bg: c.surface };
