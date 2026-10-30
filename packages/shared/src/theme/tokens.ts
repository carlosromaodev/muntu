import { Platform, TextStyle } from 'react-native';

/** Cores do MUNTU, tal como nos ficheiros de desenho. */
export const C = {
  ink: '#1d1c1a',
  paper: '#fbfaf7',
  canvas: '#f4f1ea',
  sand: '#ebe6d6',
  sand2: '#f3ecd9',
  line: '#e4e0d6',
  lineStrong: '#d9d4c4',
  muted: '#6b675f',
  faint: '#9a958b',
  grey: '#55524b',
  stone: '#8a867d',
  accent: '#c8640c',
  accentDeep: '#7a3a06',
  sidebar: '#1d1c1a',
  sidebarInk: '#ebe6d6',
  ok: '#2e7d4f',
  okBg: '#e3efe6',
  bad: '#b42318',
  badBg: '#f7e1de',
  warn: '#7a5800',
  warnBg: '#f5ecd0',
  amber: '#e0b23c',
  neutralBg: '#ebe6d6',
} as const;

export type Tone = 'ok' | 'bad' | 'warn' | 'neutral' | 'accent' | 'ink';
export const TONES: Record<Tone, { fg: string; bg: string }> = {
  ok: { fg: C.ok, bg: C.okBg },
  bad: { fg: C.bad, bg: C.badBg },
  warn: { fg: C.warn, bg: C.warnBg },
  neutral: { fg: C.grey, bg: C.neutralBg },
  accent: { fg: C.ink, bg: C.accent },
  ink: { fg: C.paper, bg: C.ink },
};

/** Família Outfit por peso (as quatro carregadas pela app). */
export const F = {
  300: 'Outfit_300Light',
  400: 'Outfit_400Regular',
  500: 'Outfit_500Medium',
  600: 'Outfit_600SemiBold',
} as const;
export type Weight = keyof typeof F;

/**
 * Estilo de texto a partir dos valores do desenho:
 * tamanho em px, peso e espaçamento em em (como no CSS).
 */
export function type(size: number, weight: Weight = 400, trackingEm = 0, upper = false): TextStyle {
  return {
    fontFamily: F[weight],
    fontSize: size,
    letterSpacing: trackingEm ? +(size * trackingEm).toFixed(2) : 0,
    ...(upper ? { textTransform: 'uppercase' as const } : null),
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : null),
  };
}

/** Presets tipográficos dos desenhos: [tamanho px, peso, espaçamento em, maiúsculas]. */
export const PRESETS = {
  eyebrow: [10, 600, 0.22, true],
  label: [10, 600, 0.2, true],
  tab: [9, 600, 0.12, true],
  button: [10, 600, 0.14, true],
  badge: [10, 600, 0.12, true],
  title: [30, 400, 0.18, true],
  titleDesk: [26, 400, 0.18, true],
  h2: [15, 500, 0, false],
  body: [14, 400, 0, false],
  bodyStrong: [14, 500, 0, false],
  small: [12, 400, 0, false],
  tiny: [11, 400, 0, false],
} as const satisfies Record<string, readonly [number, Weight, number, boolean]>;
export type Preset = keyof typeof PRESETS;

export const T = Object.fromEntries(
  Object.entries(PRESETS).map(([k, [sz, w, tr, up]]) => [k, type(sz, w, tr, up)]),
) as Record<Preset, TextStyle>;

export const S = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

/** Margem lateral dos ecrãs mobile (24 px no desenho). */
export const GUTTER = 24;
