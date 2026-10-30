import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, Platform, StyleProp, View, ViewStyle } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { ClipPath, Defs, G, Path, Rect, Text as SvgText } from 'react-native-svg';
import { C, F } from '../theme/tokens';
import { Press } from './Press';

const H = 52;
const COLS = 44; // colunas da simulação da superfície
const TENSION = 0.028;
const DAMP = 0.045;
const SPREAD = 0.22;

/** Superfície suave a partir das alturas (curvas quadráticas pelos pontos médios). */
function surface(xs: number[], ys: number[], w: number) {
  let d = `M 0 ${H + 4} L 0 ${ys[0]!.toFixed(2)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const mx = (xs[i]! + xs[i + 1]!) / 2;
    const my = (ys[i]! + ys[i + 1]!) / 2;
    d += ` Q ${xs[i]!.toFixed(2)} ${ys[i]!.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  d += ` L ${w} ${ys[ys.length - 1]!.toFixed(2)} L ${w} ${H + 4} Z`;
  return d;
}

type Sim = { h: number[]; v: number[]; base: number; surge: number; mx: number | null; lastX: number; lastY: number; t: number; bubbles: { x: number; y: number; r: number; s: number }[] };

/**
 * Botão "água laranja" do desktop. A água é uma superfície simulada (molas entre
 * colunas): segue o rato e sobe em monte por baixo dele, ondula quando o rato se
 * mexe, espirra no clique e nunca fica parada enquanto o rato está por cima.
 * O texto muda de cor exactamente na linha da água.
 */
export function WaterButton({ label, onPress, style, minWidth = 240 }: { label: string; onPress?: () => void; style?: StyleProp<ViewStyle>; minWidth?: number }) {
  const [w, setW] = useState(minWidth);
  const [, setFrame] = useState(0);
  const host = useRef<any>(null);
  const hover = useRef(false);
  const raf = useRef<number | null>(null);
  const sim = useRef<Sim>({ h: Array(COLS).fill(-10), v: Array(COLS).fill(0), base: -10, surge: 0, mx: null, lastX: 0, lastY: 0, t: 0, bubbles: [] });

  // Onda circular do clique.
  const ripple = useSharedValue(0);
  const rx = useSharedValue(0);
  const ry = useSharedValue(0);

  const step = useCallback(() => {
    const s = sim.current;
    s.t += 1 / 60;
    const colW = w / (COLS - 1);
    const target = hover.current ? 22 + s.surge : -10;
    s.base += (target - s.base) * 0.06;
    s.surge *= 0.94;
    // Molas: cada coluna procura o nível (mais alto por baixo do rato).
    for (let i = 0; i < COLS; i++) {
      const x = i * colW;
      const mound = s.mx === null ? 0 : 11 * Math.exp(-((x - s.mx) ** 2) / (2 * 34 ** 2));
      const goal = s.base + (hover.current ? mound : 0);
      s.v[i] += -TENSION * (s.h[i]! - goal) - DAMP * s.v[i]!;
      // Movimento ambiente: nunca fica parada com o rato por cima.
      if (hover.current) s.v[i] += (Math.random() - 0.5) * 0.06;
    }
    for (let i = 0; i < COLS; i++) s.h[i] = s.h[i]! + s.v[i]!;
    // Propagação das ondas para os vizinhos.
    for (let k = 0; k < 2; k++) {
      const l = Array(COLS).fill(0);
      const r = Array(COLS).fill(0);
      for (let i = 0; i < COLS; i++) {
        if (i > 0) {
          l[i] = SPREAD * (s.h[i]! - s.h[i - 1]!);
          s.v[i - 1] += l[i];
        }
        if (i < COLS - 1) {
          r[i] = SPREAD * (s.h[i]! - s.h[i + 1]!);
          s.v[i + 1] += r[i];
        }
      }
      for (let i = 0; i < COLS; i++) {
        if (i > 0) s.h[i - 1] += l[i];
        if (i < COLS - 1) s.h[i + 1] += r[i];
      }
    }
    // Bolhas a subir dentro da água.
    if (hover.current && Math.random() < 0.08) s.bubbles.push({ x: Math.random() * w, y: H + 4, r: 1.5 + Math.random() * 2.5, s: 0.35 + Math.random() * 0.5 });
    s.bubbles = s.bubbles.filter((b) => {
      b.y -= b.s;
      b.x += Math.sin((s.t + b.r) * 4) * 0.25;
      const col = Math.min(COLS - 1, Math.max(0, Math.round(b.x / colW)));
      return b.y > H - s.h[col]! + 2;
    });
    setFrame((f) => (f + 1) % 1_000_000);
    const calm = !hover.current && s.h.every((h, i) => h < -6 && Math.abs(s.v[i]!) < 0.05) && !s.bubbles.length;
    raf.current = calm ? null : requestAnimationFrame(step);
  }, [w]);

  const wake = useCallback(() => {
    if (raf.current === null) raf.current = requestAnimationFrame(step);
  }, [step]);
  useEffect(() => () => void (raf.current !== null && cancelAnimationFrame(raf.current)), []);

  /** Posição do rato dentro do botão (web). */
  const local = (e: any) => {
    const el = host.current as HTMLElement | null;
    const ne = e?.nativeEvent ?? e;
    if (el?.getBoundingClientRect && typeof ne?.clientX === 'number') {
      const r = el.getBoundingClientRect();
      return { x: ne.clientX - r.left, y: ne.clientY - r.top };
    }
    return { x: ne?.locationX ?? w / 2, y: ne?.locationY ?? H / 2 };
  };

  const onMove = (e: any) => {
    const s = sim.current;
    const { x, y } = local(e);
    const dx = x - s.lastX;
    const dy = y - s.lastY;
    s.mx = x;
    // O rato a passar agita a água por baixo dele.
    const col = Math.round(x / (w / (COLS - 1)));
    for (let i = Math.max(0, col - 2); i <= Math.min(COLS - 1, col + 2); i++) s.v[i] += Math.max(-2.2, Math.min(2.2, Math.abs(dx) * 0.06 - dy * 0.05));
    s.lastX = x;
    s.lastY = y;
    wake();
  };

  const enter = (e: any) => {
    hover.current = true;
    const { x, y } = local(e);
    sim.current.mx = x;
    sim.current.lastX = x;
    sim.current.lastY = y;
    wake();
  };
  const leave = () => {
    hover.current = false;
    sim.current.mx = null;
    wake();
  };

  const onPressIn = (e: GestureResponderEvent) => {
    const { x, y } = local(e);
    rx.value = x;
    ry.value = y;
    ripple.value = 0;
    ripple.value = withTiming(1, { duration: 750, easing: Easing.out(Easing.cubic) });
    const s = sim.current;
    // Espirro: afunda no ponto do clique e a água sobe de repente.
    const col = Math.round(x / (w / (COLS - 1)));
    for (let i = Math.max(0, col - 3); i <= Math.min(COLS - 1, col + 3); i++) s.v[i] -= 7 * (1 - Math.abs(i - col) / 4);
    s.surge = 16;
    if (!hover.current) {
      hover.current = true;
      setTimeout(() => (hover.current = false), 900);
    }
    wake();
  };

  const rippleSt = useAnimatedStyle(() => {
    const R = w * 1.4;
    return {
      opacity: interpolate(ripple.value, [0, 0.08, 1], [0, 0.22, 0]),
      transform: [{ translateX: rx.value - R }, { translateY: ry.value - R }, { scale: ripple.value }],
      width: R * 2,
      height: R * 2,
      borderRadius: R,
    };
  });

  // Geometria do frame actual.
  const s = sim.current;
  const colW = w / (COLS - 1);
  const xs = s.h.map((_, i) => i * colW);
  const front = s.h.map((h, i) => H - (h + 1.6 * Math.sin(i * 0.45 + s.t * 2.2)));
  const back = s.h.map((h, i) => H - (h + 3 + 2.2 * Math.sin(i * 0.3 - s.t * 1.7)));
  const frontD = surface(xs, front, w);
  const backD = surface(xs, back, w);
  const text = `${label.toUpperCase()}  →`;
  const textProps = { x: w / 2, y: H / 2 + 4.5, fontSize: 12, fontFamily: F[600], letterSpacing: 2.2, textAnchor: 'middle' as const };

  const webPointer = Platform.OS === 'web' ? ({ onPointerMove: onMove, onPointerEnter: enter, onPointerLeave: leave } as any) : {};

  return (
    <View ref={host} {...webPointer} style={[{ minWidth, height: H }, style]} onLayout={(e: LayoutChangeEvent) => setW(Math.round(e.nativeEvent.layout.width))}>
      <Press
        feedback="press"
        scaleTo={0.985}
        onPress={onPress}
        onPressIn={onPressIn}
        onFocus={enter}
        onBlur={leave}
        accessibilityLabel={label}
        style={{ flex: 1, backgroundColor: C.ink, overflow: 'hidden' }}
      >
        <Svg width={w} height={H} style={{ position: 'absolute', left: 0, top: 0 }} pointerEvents="none">
          <Defs>
            <ClipPath id="muntu-agua">
              <Path d={frontD} />
            </ClipPath>
          </Defs>
          <SvgText {...textProps} fill={C.paper}>
            {text}
          </SvgText>
          <Path d={backD} fill={C.accentDeep} />
          <Path d={frontD} fill={C.accent} />
          {s.bubbles.map((b, i) => (
            <Rect key={i} x={b.x - b.r} y={b.y - b.r} width={b.r * 2} height={b.r * 2} rx={b.r} fill="none" stroke="rgba(251,250,247,0.75)" strokeWidth={1} />
          ))}
          <G clipPath="url(#muntu-agua)">
            <SvgText {...textProps} fill={C.ink}>
              {text}
            </SvgText>
          </G>
        </Svg>
        <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, top: 0, backgroundColor: C.paper }, rippleSt]} />
      </Press>
    </View>
  );
}
