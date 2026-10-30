import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DUR, timing } from './motion';
import { C, type } from '../theme/tokens';
import { Txt, TxtProps } from './Txt';

/** Número que conta até ao valor (cabeçalhos de KPI). */
export function CountUp({ value, format = (v: number) => String(Math.round(v)), duration = 420, ...txt }: { value: number; format?: (v: number) => string; duration?: number } & TxtProps) {
  const [shown, setShown] = useState(value);
  // Só anima quando o valor muda (não conta a partir de zero ao abrir o ecrã).
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    const t0 = Date.now();
    let raf = 0;
    const tick = () => {
      const k = Math.min(1, (Date.now() - t0) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setShown(start + (value - start) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return (
    <Txt tabular {...txt}>
      {format(shown)}
    </Txt>
  );
}

/** Gráfico de barras simples (lotação por hora, semana do turno). */
export function Bars({ data, height = 110, colors, gap = 3, labels, labelEvery = 1, max: maxV, style, values }: { data: number[]; height?: number; colors: (i: number) => string; gap?: number; labels?: string[]; labelEvery?: number; max?: number; style?: StyleProp<ViewStyle>; values?: (i: number) => string | null }) {
  const max = maxV ?? Math.max(1, ...data);
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height, gap }}>
        {data.map((v, i) => (
          <Bar key={i} i={i} h={(v / max) * height} color={colors(i)} label={values?.(i) ?? null} />
        ))}
      </View>
      {labels ? (
        <View style={{ flexDirection: 'row', gap, marginTop: 6 }}>
          {labels.map((l, i) => (
            <Txt key={i} style={[type(9, 500, 0.06), { flex: 1, textAlign: 'center', color: C.muted }]} numberOfLines={1}>
              {i % labelEvery === 0 ? l : ''}
            </Txt>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function Bar({ h, color, i, label }: { h: number; color: string; i: number; label: string | null }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withTiming(h, timing(DUR.bar));
  }, [h, i, p]);
  const st = useAnimatedStyle(() => ({ height: p.value }));
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
      {label ? <Txt style={[type(9, 500), { color: C.muted, marginBottom: 3 }]}>{label}</Txt> : null}
      <Animated.View style={[{ width: '100%', backgroundColor: color }, st]} />
    </View>
  );
}

/** Mini gráfico do "no ginásio agora" (barra lateral desktop). */
export function Spark({ data, now, height = 18, color = '#3a3833', hot = C.sidebarInk, style }: { data: number[]; now: number; height?: number; color?: string; hot?: string; style?: StyleProp<ViewStyle> }) {
  const max = Math.max(...data);
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, height }, style]}>
      {data.map((v, i) => (
        <View key={i} style={{ width: 3, height: Math.max(2, (v / max) * height), backgroundColor: i <= now ? hot : color, opacity: i <= now ? 1 : 0.9 }} />
      ))}
    </View>
  );
}

/** Código QR desenhado (o mesmo padrão do desenho). */
export function QR({ size = 168, cells }: { size?: number; cells: boolean[] }) {
  const n = Math.round(Math.sqrt(cells.length));
  const c = size / n;
  return (
    <View style={{ width: size, height: size, flexDirection: 'row', flexWrap: 'wrap' }}>
      {cells.map((on, i) => (
        <View key={i} style={{ width: c, height: c, backgroundColor: on ? C.ink : 'transparent' }} />
      ))}
    </View>
  );
}

export function qrCells(seed = 0) {
  const out: boolean[] = [];
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      const ex = x >= 14 ? x - 14 : x;
      const ey = y >= 14 ? y - 14 : y;
      const fin = (x < 7 || x >= 14) && (y < 7 || y >= 14) && !(x >= 14 && y >= 14);
      out.push(fin ? ex === 0 || ex === 6 || ey === 0 || ey === 6 || (ex >= 2 && ex <= 4 && ey >= 2 && ey <= 4) : (x * 7 + y * 13 + x * y * 3 + seed) % 5 < 2);
    }
  return out;
}
