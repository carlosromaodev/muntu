import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { C, Preset, PRESETS, T, type, Weight } from '../theme/tokens';

export type TxtProps = TextProps & {
  /** Estilo pré-definido do desenho (eyebrow, title, body…). */
  v?: Preset;
  /** Tamanho em px (sobrepõe o preset). */
  size?: number;
  w?: Weight;
  /** Espaçamento entre letras em em. */
  track?: number;
  up?: boolean;
  c?: string;
  align?: TextStyle['textAlign'];
  tabular?: boolean;
};

/** Texto do MUNTU: Outfit, cor tinta, presets dos desenhos. */
export function Txt({ v = 'body', size, w, track, up, c, align, tabular, style, ...rest }: TxtProps) {
  const [ps, pw, pt, pu] = PRESETS[v];
  const custom = size !== undefined || w !== undefined || track !== undefined || up !== undefined;
  return (
    <Text
      {...rest}
      style={[
        { color: c ?? C.ink },
        custom ? type(size ?? ps, w ?? pw, track ?? pt, up ?? pu) : T[v],
        align ? { textAlign: align } : null,
        tabular ? { fontVariant: ['tabular-nums'] } : null,
        style,
      ]}
    />
  );
}

/** Rótulo pequeno em maiúsculas, espaçado (o "eyebrow" dos desenhos). */
export const Eyebrow = (p: TxtProps) => <Txt v="eyebrow" c={C.muted} {...p} />;
