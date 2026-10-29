import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { haptic } from '../lib/haptics';
import { T } from './T';

/**
 * Folha: no telemóvel sobe de baixo; no tablet/desktop abre como painel lateral direito.
 */
export function Sheet({
  visible,
  onClose,
  title,
  eyebrow,
  children,
  footer,
}: {
  visible: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { c, compact, h } = useTheme();
  const insets = useSafeAreaInsets();
  const close = () => {
    haptic('select');
    onClose();
  };
  return (
    <Modal visible={visible} transparent animationType={compact ? 'slide' : 'fade'} onRequestClose={close} statusBarTranslucent>
      <View style={{ flex: 1, flexDirection: compact ? 'column' : 'row', justifyContent: compact ? 'flex-end' : 'flex-end' }}>
        <Pressable accessibilityLabel="Fechar" onPress={close} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: c.overlay }} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={
            compact
              ? { maxHeight: h * 0.9, backgroundColor: c.bg, borderTopWidth: 4, borderColor: c.brand }
              : { width: 440, maxWidth: '100%', height: '100%', backgroundColor: c.bg, borderLeftWidth: 1, borderColor: c.line }
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, paddingHorizontal: 24, paddingTop: compact ? 20 : 32 + insets.top, paddingBottom: 16, borderBottomWidth: 1, borderColor: c.line }}>
            <View style={{ flex: 1, gap: 8 }}>
              {eyebrow ? <T v="eyebrow">{eyebrow}</T> : null}
              {title ? <T v="title" size={20}>{title}</T> : null}
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={close} hitSlop={12} style={{ paddingVertical: 4 }}>
              <T v="label" size={10}>
                Fechar ✕
              </T>
            </Pressable>
          </View>
          <ScrollView style={{ flexGrow: 0, flexShrink: 1 }} contentContainerStyle={{ padding: 24, gap: 16 }} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
          {footer ? <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 + insets.bottom, borderTopWidth: 1, borderColor: c.line, gap: 8 }}>{footer}</View> : <View style={{ height: insets.bottom }} />}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
