import React, { useEffect, useMemo, useState } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { C, type } from '../theme/tokens';
import { EASE } from './motion';
import { Press } from './Press';

const H = 52;
const LIN = Easing.linear;
/** Nível "cheio": a crista da onda fica uns pixéis abaixo do topo, sempre visível. */
const FULL = 0.84;

/** Onda periódica: comprimento `lambda`, amplitude `amp`, desenhada em `width` (o dobro do botão, para rodar sem emendas). */
function wavePath(width: number, height: number, lambda: number, amp: number, phase = 0) {
  const top = amp + 2;
  let d = `M 0 ${top + (phase ? amp : 0)}`;
  const half = lambda / 2;
  let up = !phase;
  for (let x = 0; x < width + lambda; x += half) {
    const cx = x + half / 2;
    const y = up ? top - amp : top + amp;
    d += ` Q ${cx} ${y} ${x + half} ${top}`;
    up = !up;
  }
  return `${d} L ${width + lambda} ${height} L 0 ${height} Z`;
}

/** Bolha que sobe dentro da água enquanto o rato está por cima. */
function Bubble({ on, x, size, delay, dur }: { on: boolean; x: number; size: number; delay: number; dur: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = on ? withDelay(delay, withRepeat(withTiming(1, { duration: dur, easing: LIN }), -1, false)) : withTiming(0, { duration: 200 });
  }, [on, t, delay, dur]);
  const st = useAnimatedStyle(() => ({
    opacity: on ? interpolate(t.value, [0, 0.15, 0.8, 1], [0, 0.55, 0.35, 0]) : 0,
    transform: [{ translateY: interpolate(t.value, [0, 1], [H, 6]) }, { translateX: Math.sin(t.value * Math.PI * 2) * 3 }],
  }));
  return <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: x, top: 0, width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: 'rgba(251,250,247,0.9)' }, st]} />;
}

/**
 * Botão "água laranja" (entrar no desktop): ao passar o rato a água sobe com
 * ondas e bolhas; ao clicar, uma onda circular parte do ponto do clique e a
 * água enche de repente. O texto passa de papel a tinta quando fica submerso.
 */
export function WaterButton({ label, onPress, style, minWidth = 220 }: { label: string; onPress?: () => void; style?: StyleProp<ViewStyle>; minWidth?: number }) {
  const [w, setW] = useState(minWidth);
  const [hover, setHover] = useState(false);
  const level = useSharedValue(0); // 0 vazio · 1 cheio
  const drift = useSharedValue(0);
  const ripple = useSharedValue(0);
  const rx = useSharedValue(0);
  const ry = useSharedValue(0);

  // As ondas correm sempre; só se vêem quando há água.
  useEffect(() => {
    drift.value = 0;
    drift.value = withRepeat(withTiming(1, { duration: 2400, easing: LIN }), -1, false);
  }, [drift]);

  useEffect(() => {
    level.value = withTiming(hover ? FULL : 0, { duration: hover ? 900 : 650, easing: EASE });
  }, [hover, level]);

  const lambda = Math.max(60, Math.round(w / 3));
  const WW = w * 2 + lambda;
  const front = useMemo(() => wavePath(WW, H + 24, lambda, 4), [WW, lambda]);
  const back = useMemo(() => wavePath(WW, H + 24, lambda * 1.3, 5, 1), [WW, lambda]);

  // Nível da água: começa abaixo do botão (H + 10) e sobe até tapar o texto.
  const waterY = (v: number) => interpolate(v, [0, 1], [H + 10, -12]);
  const frontSt = useAnimatedStyle(() => ({ transform: [{ translateY: waterY(level.value) }, { translateX: -drift.value * lambda }] }));
  const backSt = useAnimatedStyle(() => ({ transform: [{ translateY: waterY(level.value) - 4 }, { translateX: -lambda * 1.3 + drift.value * lambda * 1.3 }] }));
  const rippleSt = useAnimatedStyle(() => {
    const R = w * 1.6;
    return {
      opacity: interpolate(ripple.value, [0, 0.1, 1], [0, 0.32, 0]),
      transform: [{ translateX: rx.value - R }, { translateY: ry.value - R }, { scale: ripple.value }],
      width: R * 2,
      height: R * 2,
      borderRadius: R,
    };
  });
  const textSt = useAnimatedStyle(() => ({ color: interpolateColor(level.value, [0.35, 0.6], [C.paper, C.ink]) }));
  const arrowSt = useAnimatedStyle(() => ({ color: interpolateColor(level.value, [0.35, 0.6], [C.paper, C.ink]), transform: [{ translateX: interpolate(level.value, [0, 1], [-4, 4]) }], opacity: interpolate(level.value, [0, 0.5, 1], [0.55, 0.8, 1]) }));

  const onPressIn = (e: GestureResponderEvent) => {
    rx.value = e.nativeEvent.locationX ?? w / 2;
    ry.value = e.nativeEvent.locationY ?? H / 2;
    ripple.value = 0;
    ripple.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });
    // Golfada: a água enche de uma vez e assenta.
    level.value = withSequence(withTiming(1.08, { duration: 260, easing: EASE }), withTiming(FULL, { duration: 420, easing: EASE }));
  };

  return (
    <Press
      feedback="press"
      scaleTo={0.98}
      onPress={onPress}
      onPressIn={onPressIn}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      accessibilityLabel={label}
      onLayout={(e: LayoutChangeEvent) => setW(Math.round(e.nativeEvent.layout.width))}
      style={[{ height: H, minWidth, backgroundColor: C.ink, overflow: 'hidden', justifyContent: 'center' }, style]}
    >
      {/* Água: onda de trás (laranja escuro) e da frente (laranja MUNTU). */}
      <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, top: 0, width: WW, height: H + 24 }, backSt]}>
        <Svg width={WW} height={H + 24}>
          <Path d={back} fill={C.accentDeep} />
        </Svg>
      </Animated.View>
      <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, top: 0, width: WW, height: H + 24 }, frontSt]}>
        <Svg width={WW} height={H + 24}>
          <Path d={front} fill={C.accent} />
        </Svg>
      </Animated.View>
      {[
        [0.18, 5, 0, 1700],
        [0.42, 4, 500, 1500],
        [0.66, 6, 250, 1900],
        [0.84, 3, 800, 1400],
      ].map(([fx, s, d, du], i) => (
        <Bubble key={i} on={hover} x={w * fx!} size={s!} delay={d!} dur={du!} />
      ))}
      {/* Onda circular do clique. */}
      <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, top: 0, backgroundColor: C.paper }, rippleSt]} />
      <View pointerEvents="none" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 28 }}>
        <Animated.Text style={[type(12, 600, 0.18, true), textSt]}>{label}</Animated.Text>
        <Animated.Text style={[type(14, 400), arrowSt]}>→</Animated.Text>
      </View>
    </Press>
  );
}
