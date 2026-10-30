import React, { useCallback, useState } from 'react';
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DUR, timing } from './motion';
import { haptic, HapticKind } from '../lib/haptics';

const APressable = Animated.createAnimatedComponent(Pressable);

export type PressProps = Omit<PressableProps, 'style' | 'children'> & {
  style?: StyleProp<ViewStyle> | ((s: { hovered: boolean; pressed: boolean }) => StyleProp<ViewStyle>);
  children?: React.ReactNode | ((s: { hovered: boolean; pressed: boolean }) => React.ReactNode);
  /** Vibração ao tocar (nativo). false para desligar. */
  feedback?: HapticKind | false;
  /** Escala ao premir (1 = sem escala). */
  scaleTo?: number;
};

/**
 * Superfície tocável com resposta física: encolhe ligeiramente ao premir,
 * vibra no nativo e mostra estado de hover/foco na web.
 */
export function Press({ style, children, feedback = 'tap', scaleTo = 0.97, onPress, onPressIn, onPressOut, onHoverIn, onHoverOut, disabled, ...rest }: PressProps) {
  const scale = useSharedValue(1);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const handlePress = useCallback(
    (e: any) => {
      if (feedback) haptic(feedback);
      onPress?.(e);
    },
    [feedback, onPress],
  );
  const st = { hovered, pressed };
  return (
    <APressable
      accessibilityRole="button"
      {...rest}
      disabled={disabled}
      onPress={handlePress}
      onPressIn={(e) => {
        setPressed(true);
        if (scaleTo !== 1) scale.value = withTiming(scaleTo, timing(DUR.press));
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        scale.value = withTiming(1, timing(DUR.press));
        onPressOut?.(e);
      }}
      onHoverIn={(e) => {
        setHovered(true);
        onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        setHovered(false);
        onHoverOut?.(e);
      }}
      style={[
        typeof style === 'function' ? style(st) : style,
        anim,
        disabled ? { opacity: 0.45 } : null,
        Platform.OS === 'web' ? ({ cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none' } as any) : null,
      ]}
    >
      {typeof children === 'function' ? children(st) : children}
    </APressable>
  );
}
