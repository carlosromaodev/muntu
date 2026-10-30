import React, { useCallback, useState } from 'react';
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
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
export function Press({ style, children, feedback = 'tap', scaleTo = 0.97, onPress, onPressIn, onPressOut, disabled, ...rest }: PressProps) {
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
        if (scaleTo !== 1) scale.value = withTiming(scaleTo, { duration: 90 });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        scale.value = withSpring(1, { damping: 14, stiffness: 260 });
        onPressOut?.(e);
      }}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
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
