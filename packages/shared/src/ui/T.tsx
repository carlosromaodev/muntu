import React from 'react';
import { Text, type TextProps, type TextStyle, type StyleProp } from 'react-native';
import { fonts, useTheme, type Weight } from '../theme';

/** letterSpacing em "em", como no guia (RN usa px absolutos). */
export const em = (size: number, e: number) => Math.round(size * e * 100) / 100;

export type Variant =
  | 'display' // títulos de ecrã — Regular, maiúsculas, +18%
  | 'title' // títulos de cartão — Regular, maiúsculas, +14%
  | 'section' // cabeçalho de secção — SemiBold 12, +20%
  | 'eyebrow' // rótulos pequenos — SemiBold 10, +22%
  | 'label' // rótulos de botão / estado — SemiBold 11, +16%
  | 'body'
  | 'bodyStrong'
  | 'small'
  | 'num' // números grandes — Light
  | 'mono';

type Props = TextProps & {
  v?: Variant;
  size?: number;
  w?: Weight;
  color?: string;
  upper?: boolean;
  center?: boolean;
  right?: boolean;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export function T({ v = 'body', size, w, color, upper, center, right, style, children, ...rest }: Props) {
  const { c, compact } = useTheme();
  let s: TextStyle;
  switch (v) {
    case 'display': {
      const fs = size ?? (compact ? 28 : 40);
      s = { fontSize: fs, lineHeight: fs * 1.08, letterSpacing: em(fs, 0.16), textTransform: 'uppercase', fontFamily: fonts[w ?? 400], color: c.ink };
      break;
    }
    case 'title': {
      const fs = size ?? 22;
      s = { fontSize: fs, lineHeight: fs * 1.15, letterSpacing: em(fs, 0.14), textTransform: 'uppercase', fontFamily: fonts[w ?? 400], color: c.ink };
      break;
    }
    case 'section': {
      const fs = size ?? 12;
      s = { fontSize: fs, lineHeight: fs * 1.4, letterSpacing: em(fs, 0.2), textTransform: 'uppercase', fontFamily: fonts[w ?? 600], color: c.ink };
      break;
    }
    case 'eyebrow': {
      const fs = size ?? 10;
      s = { fontSize: fs, lineHeight: fs * 1.5, letterSpacing: em(fs, 0.22), textTransform: 'uppercase', fontFamily: fonts[w ?? 600], color: c.muted };
      break;
    }
    case 'label': {
      const fs = size ?? 11;
      s = { fontSize: fs, lineHeight: fs * 1.4, letterSpacing: em(fs, 0.16), textTransform: 'uppercase', fontFamily: fonts[w ?? 600], color: c.ink };
      break;
    }
    case 'num': {
      const fs = size ?? 36;
      s = { fontSize: fs, lineHeight: fs * 1.05, fontFamily: fonts[w ?? 300], color: c.ink, fontVariant: ['tabular-nums'] };
      break;
    }
    case 'small': {
      const fs = size ?? 12;
      s = { fontSize: fs, lineHeight: fs * 1.45, fontFamily: fonts[w ?? 400], color: c.muted };
      break;
    }
    case 'bodyStrong': {
      const fs = size ?? 14;
      s = { fontSize: fs, lineHeight: fs * 1.45, fontFamily: fonts[w ?? 500], color: c.ink };
      break;
    }
    case 'mono': {
      const fs = size ?? 14;
      s = { fontSize: fs, lineHeight: fs * 1.45, fontFamily: fonts[w ?? 400], color: c.ink, fontVariant: ['tabular-nums'] };
      break;
    }
    default: {
      const fs = size ?? 14;
      s = { fontSize: fs, lineHeight: fs * 1.5, fontFamily: fonts[w ?? 400], color: c.ink };
    }
  }
  return (
    <Text
      {...rest}
      style={[
        s,
        color ? { color } : null,
        upper ? { textTransform: 'uppercase' } : null,
        center ? { textAlign: 'center' } : null,
        right ? { textAlign: 'right' } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}
