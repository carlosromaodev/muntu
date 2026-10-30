import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Modal, PanResponder, Platform, Pressable, ScrollView, StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import Animated, { FadeInUp, FadeOutUp, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, type } from '../theme/tokens';
import { haptic } from '../lib/haptics';
import { Press } from './Press';
import { Txt } from './Txt';

/**
 * Folha que sobe do fundo (telemóvel) ou janela centrada (ecrã largo).
 * Fecha ao tocar fora, com o botão "voltar" do Android, ou arrastando para baixo.
 */
export function Sheet({ open, onClose, title, children, width = 520, style }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; width?: number; style?: StyleProp<ViewStyle> }) {
  const { width: W, height: Hh } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const wide = W >= 768;
  const [mounted, setMounted] = useState(open);
  const y = useSharedValue(Hh);
  const fade = useSharedValue(0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      y.value = Hh;
      fade.value = withTiming(1, { duration: 200 });
      y.value = withSpring(0, { damping: 22, stiffness: 240, mass: 0.9 });
    } else if (mounted) {
      fade.value = withTiming(0, { duration: 180 });
      y.value = withTiming(Hh, { duration: 220 }, (done) => {
        if (done) runOnJS(setMounted)(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open || Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [open, onClose]);

  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => !wide && g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderMove: (_, g) => {
          y.value = Math.max(0, g.dy);
        },
        onPanResponderRelease: (_, g) => {
          if (g.dy > 120 || g.vy > 1.1) {
            haptic('select');
            onClose();
          } else y.value = withSpring(0, { damping: 22, stiffness: 240 });
        },
      }),
    [wide, onClose, y],
  );

  const back = useAnimatedStyle(() => ({ opacity: fade.value }));
  const panel = useAnimatedStyle(() => (wide ? { opacity: fade.value, transform: [{ translateY: y.value * 0.08 }, { scale: 0.97 + fade.value * 0.03 }] } : { transform: [{ translateY: y.value }] }));

  if (!mounted) return null;
  return (
    <Modal transparent visible statusBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: wide ? 'center' : 'flex-end', alignItems: wide ? 'center' : 'stretch' }}>
        <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(29,28,26,0.45)' }, back]}>
          <Pressable accessibilityLabel="Fechar" style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View
          {...pan.panHandlers}
          style={[
            { backgroundColor: C.paper, maxHeight: Hh * (wide ? 0.86 : 0.9), paddingBottom: wide ? 0 : insets.bottom },
            wide ? { width: Math.min(width, W - 48), borderWidth: 1, borderColor: C.line } : null,
            panel,
            style,
          ]}
        >
          {!wide ? <View style={{ alignSelf: 'center', width: 36, height: 4, backgroundColor: C.lineStrong, marginTop: 8 }} /> : null}
          {title ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.line }}>
              <Txt style={type(13, 600, 0.18, true)}>{title}</Txt>
              <Press onPress={onClose} feedback="select" accessibilityLabel="Fechar" style={{ padding: 6 }}>
                <Txt style={type(18, 300)}>×</Txt>
              </Press>
            </View>
          ) : null}
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24 }}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

/** Lista de opções dentro de uma folha (substitui o <select> do desenho). */
export function OptionList<T extends string>({ options, value, onPick }: { options: readonly { v: T; l: string; sub?: string }[]; value?: T; onPick: (v: T) => void }) {
  return (
    <View>
      {options.map((o, i) => (
        <Press key={o.v} feedback="select" scaleTo={0.99} onPress={() => onPick(o.v)} style={({ hovered }) => ({ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 4, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, backgroundColor: hovered ? C.canvas : 'transparent' })}>
          <View style={{ flex: 1 }}>
            <Txt v="bodyStrong">{o.l}</Txt>
            {o.sub ? (
              <Txt v="small" c={C.muted}>
                {o.sub}
              </Txt>
            ) : null}
          </View>
          {o.v === value ? <Txt style={type(14, 600)}>✓</Txt> : null}
        </Press>
      ))}
    </View>
  );
}

/** Campo de escolha: mostra o valor e abre uma folha com as opções. */
export function Select<T extends string>({ label, value, options, onChange, style, big, title }: { label?: string; value: T; options: readonly { v: T; l: string; sub?: string }[]; onChange: (v: T) => void; style?: StyleProp<ViewStyle>; big?: boolean; title?: string }) {
  const [open, setOpen] = useState(false);
  const cur = options.find((o) => o.v === value);
  return (
    <View style={style}>
      {label ? (
        <Txt v="eyebrow" c={C.muted} style={{ marginBottom: 8 }}>
          {label}
        </Txt>
      ) : null}
      <Press feedback="select" scaleTo={0.99} onPress={() => setOpen(true)} accessibilityLabel={label ?? title} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: big ? 44 : 38, borderBottomWidth: 1, borderBottomColor: C.lineStrong }}>
        <Txt numberOfLines={1} style={[type(big ? 16 : 15, 400), { flex: 1 }]}>
          {cur?.l ?? ''}
        </Txt>
        <Txt style={[type(12, 400), { color: C.ink }]}>⌄</Txt>
      </Press>
      <Sheet open={open} onClose={() => setOpen(false)} title={title ?? label}>
        <OptionList
          options={options}
          value={value}
          onPick={(v) => {
            onChange(v);
            setOpen(false);
          }}
        />
      </Sheet>
    </View>
  );
}

/* ---------------------------------------------------------------- toasts */

type ToastT = { id: number; text: string; tone: 'ok' | 'bad' | 'info' };
const ToastCtx = createContext<(text: string, tone?: ToastT['tone']) => void>(() => {});

/** Confirmações breves no topo do ecrã ("Entrada registada", "Aviso enviado"). */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastT[]>([]);
  const n = useRef(0);
  const insets = useSafeAreaInsets();
  const push = useCallback((text: string, tone: ToastT['tone'] = 'ok') => {
    const id = ++n.current;
    haptic(tone === 'bad' ? 'warning' : 'success');
    setItems((l) => [...l.slice(-2), { id, text, tone }]);
    setTimeout(() => setItems((l) => l.filter((t) => t.id !== id)), 2600);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <View pointerEvents="none" style={{ position: 'absolute', top: insets.top + 10, left: 0, right: 0, alignItems: 'center', gap: 8, zIndex: 1000 }}>
        {items.map((t) => (
          <Animated.View key={t.id} entering={FadeInUp.springify().damping(16)} exiting={FadeOutUp.duration(180)} style={{ backgroundColor: C.ink, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10, maxWidth: 440, marginHorizontal: 16 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.tone === 'bad' ? '#e5533d' : t.tone === 'info' ? C.amber : '#5fbf86' }} />
            <Txt style={[type(13, 500), { color: C.paper, flexShrink: 1 }]}>{t.text}</Txt>
          </Animated.View>
        ))}
      </View>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
