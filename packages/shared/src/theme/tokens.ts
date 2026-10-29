// Tokens da marca MUNTU (Guia de Marca v1.0). Laranja é a cor de marca;
// creme e preto dão estrutura; o branco quente é o fundo da aplicação.

export type Palette = {
  bg: string; // fundo da aplicação
  surface: string; // creme — faixas de números, chips
  surface2: string; // hover / painel lateral
  card: string; // cartões brancos (QR, inputs)
  line: string; // divisórias
  line2: string; // divisórias sobre creme
  ink: string; // texto principal
  ink2: string; // texto secundário
  muted: string; // rótulos
  brand: string; // laranja MUNTU
  brandDeep: string; // laranja escuro (hover, links)
  onBrand: string; // texto sobre laranja
  invBg: string; // botão primário
  invInk: string; // texto do botão primário
  ok: string;
  okBg: string;
  warn: string;
  warnDot: string;
  warnBg: string;
  bad: string;
  badBg: string;
  overlay: string;
};

export const light: Palette = {
  bg: '#FBFAF7',
  surface: '#EBE6D6',
  surface2: '#F4F1EA',
  card: '#FFFFFF',
  line: '#E4E0D6',
  line2: '#D9D4C4',
  ink: '#1D1C1A',
  ink2: '#55524B',
  muted: '#6B675F',
  brand: '#C8640C',
  brandDeep: '#9A4C08',
  onBrand: '#1D1C1A',
  invBg: '#1D1C1A',
  invInk: '#FBFAF7',
  ok: '#2E7D4F',
  okBg: '#E3EFE6',
  warn: '#7A5800',
  warnDot: '#C99A1B',
  warnBg: '#F5ECD0',
  bad: '#B42318',
  badBg: '#F7E1DE',
  overlay: 'rgba(29,28,26,0.45)',
};

export const dark: Palette = {
  bg: '#141311',
  surface: '#23211D',
  surface2: '#1B1A17',
  card: '#1D1C1A',
  line: '#2E2B27',
  line2: '#3A3732',
  ink: '#F3ECD9',
  ink2: '#C9C2B1',
  muted: '#9A9486',
  brand: '#C8640C',
  brandDeep: '#E68A3A',
  onBrand: '#1D1C1A',
  invBg: '#F3ECD9',
  invInk: '#1D1C1A',
  ok: '#62C08A',
  okBg: '#1C3125',
  warn: '#E0B23C',
  warnDot: '#E0B23C',
  warnBg: '#352C18',
  bad: '#F07A63',
  badBg: '#3A1E19',
  overlay: 'rgba(0,0,0,0.6)',
};

/** Outfit — uma só família geométrica. Light/Regular para texto, Medium para o logotipo. */
export const fonts = {
  300: 'Outfit_300Light',
  400: 'Outfit_400Regular',
  500: 'Outfit_500Medium',
  600: 'Outfit_600SemiBold',
} as const;

export type Weight = keyof typeof fonts;

export const breakpoints = { medium: 720, wide: 1100 } as const;

export type Bp = 'compact' | 'medium' | 'wide';

export const bpFor = (w: number): Bp => (w < breakpoints.medium ? 'compact' : w < breakpoints.wide ? 'medium' : 'wide');

/** Espaçamento lateral por breakpoint (24 no telemóvel, 40 no desktop). */
export const gutter = (bp: Bp) => (bp === 'compact' ? 20 : bp === 'medium' ? 28 : 40);
