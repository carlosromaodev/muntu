import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { haptic, type HapticKind } from '../lib/haptics';
import { T } from './T';

export type BtnKind = 'primary' | 'outline' | 'ghost' | 'danger' | 'onBrand';

type Props = {
  label: string;
  onPress?: () => void;
  kind?: BtnKind;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  haptic?: HapticKind | false;
  full?: boolean;
  right?: React.ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

/** Botão rectangular da marca: preto cheio, contorno, ou fantasma. Sem cantos arredondados. */
export function Btn({ label, onPress, kind = 'primary', size = 'md', disabled, haptic: h = 'tap', full, right, accessibilityLabel, style }: Props) {
  const { c } = useTheme();
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const px = size === 'sm' ? 14 : 20;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        if (h) haptic(h);
        onPress?.();
      }}
      style={(st: any) => {
        const active = st.pressed || st.hovered;
        const base: ViewStyle = {
          height,
          paddingHorizontal: px,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: disabled ? 0.35 : 1,
          alignSelf: full ? 'stretch' : 'flex-start',
          ...(st.focused ? { outlineWidth: 2, outlineColor: c.ink, outlineStyle: 'solid', outlineOffset: 2 } as any : null),
        };
        if (kind === 'primary') return [base, { backgroundColor: active && !disabled ? c.brandDeep : c.invBg }, style];
        if (kind === 'onBrand') return [base, { backgroundColor: active && !disabled ? '#3A3732' : '#1D1C1A' }, style];
        if (kind === 'danger') return [base, { borderWidth: 1, borderColor: c.bad, backgroundColor: active && !disabled ? c.badBg : 'transparent' }, style];
        if (kind === 'ghost') return [base, { paddingHorizontal: 4, backgroundColor: 'transparent' }, style];
        return [base, { borderWidth: 1, borderColor: kind === 'outline' ? c.ink : c.ink, backgroundColor: active && !disabled ? c.invBg : 'transparent' }, style];
      }}
    >
      {(st: any) => {
        const active = (st.pressed || st.hovered) && !disabled;
        const color =
          kind === 'primary' ? c.invInk : kind === 'onBrand' ? '#FBFAF7' : kind === 'danger' ? c.bad : kind === 'outline' && active ? c.invInk : c.ink;
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <T v="label" size={size === 'sm' ? 10 : 11} color={color} numberOfLines={1} style={kind === 'ghost' && active ? { textDecorationLine: 'underline' } : null}>
              {label}
            </T>
            {right}
          </View>
        );
      }}
    </Pressable>
  );
}

/** Botão só com texto sublinhado, para acções secundárias ("Simular falha"). */
export function LinkBtn({ label, onPress, color }: { label: string; onPress?: () => void; color?: string }) {
  const { c } = useTheme();
  return (
    <Pressable accessibilityRole="button" onPress={() => { haptic('tap'); onPress?.(); }} hitSlop={8}>
      <T v="small" color={color ?? c.ink2} style={{ textDecorationLine: 'underline' }}>
        {label}
      </T>
    </Pressable>
  );
}
