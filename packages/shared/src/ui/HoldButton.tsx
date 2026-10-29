import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { haptic } from '../lib/haptics';
import { confirmBiometric } from '../lib/auth';
import { T } from './T';

type Props = {
  label: string;
  /** Texto pedido pelo Face ID / impressão digital. */
  reason: string;
  onConfirm: () => void;
  onFail?: () => void;
  duration?: number;
  onBrand?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Segurar para confirmar. A barra enche com vibração a cada passo; no fim pede
 * biometria e só então confirma. Soltar antes cancela. Usado em acções que não
 * se desfazem: aprovar estorno, diferença de caixa, preço, receber turno.
 */
export function HoldButton({ label, reason, onConfirm, onFail, duration = 1200, onBrand, height = 52, style }: Props) {
  const { c } = useTheme();
  const p = useRef(new Animated.Value(0)).current;
  const step = useRef(0);
  const [phase, setPhase] = useState<'idle' | 'holding' | 'auth' | 'done'>('idle');

  useEffect(() => {
    const id = p.addListener(({ value }) => {
      const s = Math.floor(value * 5);
      if (s > step.current && s < 5) {
        step.current = s;
        haptic('select');
      }
    });
    return () => p.removeListener(id);
  }, [p]);

  const start = () => {
    if (phase === 'auth' || phase === 'done') return;
    step.current = 0;
    setPhase('holding');
    Animated.timing(p, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: false }).start(async ({ finished }) => {
      if (!finished) return;
      haptic('heavy');
      setPhase('auth');
      const r = await confirmBiometric(reason);
      if (r === 'ok' || r === 'unavailable') {
        haptic('success');
        setPhase('done');
        onConfirm();
      } else {
        haptic('error');
        setPhase('idle');
        Animated.timing(p, { toValue: 0, duration: 200, useNativeDriver: false }).start();
        onFail?.();
      }
    });
  };

  const cancel = () => {
    if (phase !== 'holding') return;
    p.stopAnimation();
    setPhase('idle');
    Animated.timing(p, { toValue: 0, duration: 180, useNativeDriver: false }).start();
  };

  const bg = onBrand ? '#1D1C1A' : c.invBg;
  const fg = onBrand ? '#FBFAF7' : c.invInk;
  const width = p.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const text = phase === 'holding' ? 'Continue a segurar…' : phase === 'auth' ? 'A confirmar identidade…' : phase === 'done' ? 'Confirmado' : label;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Segure até a barra encher para confirmar"
      onPressIn={start}
      onPressOut={cancel}
      onLongPress={() => {}}
      delayLongPress={duration + 2000}
      style={[{ height, backgroundColor: bg, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }, style]}
    >
      <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width, backgroundColor: c.brand }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 }}>
        <T v="label" color={phase === 'idle' ? fg : '#1D1C1A'} numberOfLines={1}>
          {text}
        </T>
      </View>
    </Pressable>
  );
}
