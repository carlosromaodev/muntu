import React, { memo } from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

export type MarkVariant = 'A' | 'B' | 'C';

type Seg = { x1: number; y1: number; x2: number; y2: number; w: number };

/** Geometria exacta do ficheiro "Muntu Mark.dc.html". */
function geometry(v: MarkVariant) {
  const P = (a: number, r: number) => [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const;
  const L = (a1: number, r1: number, a2: number, r2: number, w: number): Seg => {
    const [x1, y1] = P(a1, r1);
    const [x2, y2] = P(a2, r2);
    return { x1, y1, x2, y2, w };
  };
  const lines: Seg[] = [];
  const dots: { cx: number; cy: number; r: number }[] = [];
  let ringR = 18;
  const ringW = 8;
  if (v === 'A') {
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6 - Math.PI / 2;
      lines.push(L(a, 30, a, 45, 7));
    }
  } else if (v === 'B') {
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      lines.push(L(a, 30, a, 36, 7));
      const [cx, cy] = P(a, 44);
      dots.push({ cx, cy, r: 5 });
    }
  } else {
    ringR = 17;
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 - Math.PI / 2;
      lines.push(L(a, 28, a, 38, 7));
      const [bx, by] = P(a, 38);
      [-0.6, 0.6].forEach((o) =>
        lines.push({ x1: bx, y1: by, x2: bx + 9 * Math.cos(a + o), y2: by + 9 * Math.sin(a + o), w: 6 }),
      );
    }
  }
  return { lines, dots, ringR, ringW };
}

const CACHE: Partial<Record<MarkVariant, ReturnType<typeof geometry>>> = {};

/** Símbolo MUNTU (sol com raios). */
export const MuntuMark = memo(function MuntuMark({
  variant = 'A',
  color = '#c8640c',
  size = 64,
}: {
  variant?: MarkVariant;
  color?: string;
  size?: number;
}) {
  const g = (CACHE[variant] ??= geometry(variant));
  return (
    <Svg viewBox="0 0 100 100" width={size} height={size} accessibilityLabel="Símbolo MUNTU">
      <Circle cx={50} cy={50} r={g.ringR} fill="none" stroke={color} strokeWidth={g.ringW} />
      {g.lines.map((l, i) => (
        <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={l.w} strokeLinecap="round" />
      ))}
      {g.dots.map((d, i) => (
        <Circle key={`d${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={color} />
      ))}
    </Svg>
  );
});
