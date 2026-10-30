import React from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { C, type } from '../theme/tokens';
import { HapticKind } from '../lib/haptics';
import { Press } from './Press';
import { Txt } from './Txt';

export type ButtonKind = 'solid' | 'outline' | 'accent' | 'ghost' | 'soft' | 'danger' | 'light';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const H: Record<ButtonSize, number> = { xs: 28, sm: 34, md: 42, lg: 52 };
const FS: Record<ButtonSize, number> = { xs: 9, sm: 10, md: 10, lg: 11 };
const PADX: Record<ButtonSize, number> = { xs: 10, sm: 12, md: 16, lg: 20 };

function colors(kind: ButtonKind, hovered: boolean) {
  switch (kind) {
    case 'solid':
      return { bg: hovered ? '#34322e' : C.ink, fg: C.paper, bd: hovered ? '#34322e' : C.ink };
    case 'accent':
      return { bg: hovered ? '#b55a0a' : C.accent, fg: C.ink, bd: hovered ? '#b55a0a' : C.accent };
    case 'outline':
      return { bg: hovered ? C.canvas : 'transparent', fg: C.ink, bd: C.ink };
    case 'ghost':
      return { bg: hovered ? C.canvas : 'transparent', fg: C.ink, bd: 'transparent' };
    case 'soft':
      return { bg: hovered ? C.sand : C.canvas, fg: C.ink, bd: C.lineStrong };
    case 'danger':
      return { bg: hovered ? '#f2d3cf' : C.badBg, fg: C.bad, bd: C.bad };
    case 'light':
      return { bg: hovered ? '#ffffff' : C.paper, fg: C.ink, bd: C.paper };
  }
}

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  kind?: ButtonKind;
  size?: ButtonSize;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  feedback?: HapticKind | false;
  style?: StyleProp<ViewStyle>;
  left?: React.ReactNode;
  right?: React.ReactNode;
  accessibilityLabel?: string;
};

/** Botão rectangular em maiúsculas espaçadas, como nos desenhos. */
export function Button({ label, onPress, kind = 'solid', size = 'md', full, disabled, loading, feedback = 'tap', style, left, right, accessibilityLabel }: ButtonProps) {
  return (
    <Press
      onPress={onPress}
      disabled={disabled || loading}
      feedback={feedback}
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ hovered }) => {
        const c = colors(kind, hovered && !disabled);
        return [
          {
            height: H[size],
            paddingHorizontal: PADX[size],
            backgroundColor: c.bg,
            borderWidth: 1,
            borderColor: c.bd,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
          },
          full ? { alignSelf: 'stretch' } : null,
          style,
        ];
      }}
    >
      {({ hovered }) => {
        const c = colors(kind, hovered && !disabled);
        return loading ? (
          <ActivityIndicator size="small" color={c.fg} />
        ) : (
          <>
            {left}
            <Txt numberOfLines={1} style={[type(FS[size], 600, 0.14, true), { color: c.fg }]}>
              {label}
            </Txt>
            {right ? <View>{right}</View> : null}
          </>
        );
      }}
    </Press>
  );
}
