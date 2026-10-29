import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toneHaptic, useMuntu } from '../store';
import { haptic } from '../lib/haptics';
import { Dot, T } from '../ui';

/** Mostra uma notificação com a vibração correspondente ao tom. */
export function useNotify() {
  const toast = useMuntu((s) => s.toast);
  return (text: string, tone: 'ok' | 'warn' | 'bad' | 'info' = 'info') => {
    haptic(toneHaptic[tone]);
    toast(text, tone);
  };
}

/** Notificações em barra preta, por cima da navegação. */
export function Toasts({ bottomOffset }: { bottomOffset: number }) {
  const insets = useSafeAreaInsets();
  const toasts = useMuntu((s) => s.toasts);
  const dismiss = useMuntu((s) => s.dismiss);
  if (!toasts.length) return null;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: bottomOffset + insets.bottom, alignItems: 'center', gap: 8, paddingHorizontal: 16 }}>
      {toasts.map((t) => {
        const dot = t.tone === 'ok' ? '#62C08A' : t.tone === 'warn' ? '#E0B23C' : t.tone === 'bad' ? '#F07A63' : '#C8640C';
        return (
          <Pressable key={t.id} accessibilityRole="alert" onPress={() => dismiss(t.id)} style={{ maxWidth: 520, width: '100%', backgroundColor: '#1D1C1A', paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Dot color={dot} />
            <T size={14} color="#F3ECD9" style={{ flex: 1 }}>
              {t.text}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}
