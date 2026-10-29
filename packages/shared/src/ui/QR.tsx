import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useTheme } from '../theme';

/**
 * QR de acesso (representação visual). O QR real é gerado no servidor e
 * renovado a cada 30 s — aqui `seed` muda o padrão para simular a renovação.
 */
export function QR({ size = 189, seed = 0 }: { size?: number; seed?: number }) {
  const { c } = useTheme();
  const n = 21;
  const cell = size / n;
  const cells = useMemo(() => {
    const out: [number, number][] = [];
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const ex = x >= 14 ? x - 14 : x;
        const ey = y >= 14 ? y - 14 : y;
        const finder = (x < 7 || x >= 14) && (y < 7 || y >= 14) && !(x >= 14 && y >= 14);
        const on = finder
          ? ex === 0 || ex === 6 || ey === 0 || ey === 6 || (ex >= 2 && ex <= 4 && ey >= 2 && ey <= 4)
          : (x * 7 + y * 13 + x * y * 3 + seed * 11) % 5 < 2;
        if (on) out.push([x, y]);
      }
    return out;
  }, [seed]);
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: c.line, padding: 14, alignSelf: 'center' }} accessibilityRole="image" accessibilityLabel="Código QR de acesso">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map(([x, y]) => (
          <Rect key={x + '-' + y} x={x * cell} y={y * cell} width={cell + 0.3} height={cell + 0.3} fill="#1D1C1A" />
        ))}
      </Svg>
    </View>
  );
}
