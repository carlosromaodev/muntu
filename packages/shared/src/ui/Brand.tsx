import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { fonts } from '../theme';
import { T } from './T';

/** Símbolo MUNTU (variante C): anel central com oito raios em forma de pessoa. */
export function Mark({ size = 32, color = '#C8640C' }: { size?: number; color?: string }) {
  const P = (a: number, r: number) => [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const;
  const lines: { x1: number; y1: number; x2: number; y2: number; w: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const [x1, y1] = P(a, 28);
    const [bx, by] = P(a, 38);
    lines.push({ x1, y1, x2: bx, y2: by, w: 7 });
    for (const o of [-0.6, 0.6]) lines.push({ x1: bx, y1: by, x2: bx + 9 * Math.cos(a + o), y2: by + 9 * Math.sin(a + o), w: 6 });
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" accessibilityLabel="Símbolo MUNTU">
      <Circle cx={50} cy={50} r={17} fill="none" stroke={color} strokeWidth={8} />
      {lines.map((l, i) => (
        <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={l.w} strokeLinecap="round" />
      ))}
    </Svg>
  );
}

/** Logo horizontal: símbolo + logotipo MUNTU em Outfit Medium. */
export function Logo({ size = 22, color = '#1D1C1A', tagline }: { size?: number; color?: string; tagline?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: size * 0.24 }} accessibilityRole="image" accessibilityLabel="MUNTU">
      <Mark size={size} color={color} />
      <View style={{ gap: size * 0.16 }}>
        <T style={{ fontFamily: fonts[500], fontSize: size * 0.72, lineHeight: size * 0.8, letterSpacing: size * 0.72 * 0.02, color }}>MUNTU</T>
        {tagline ? (
          <T style={{ fontFamily: fonts[500], fontSize: Math.max(9, size * 0.15), letterSpacing: Math.max(9, size * 0.15) * 0.24, color, opacity: 0.8, textTransform: 'uppercase' }}>
            Gestão de ginásios
          </T>
        ) : null}
      </View>
    </View>
  );
}
