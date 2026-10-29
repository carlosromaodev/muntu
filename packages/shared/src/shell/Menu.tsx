import React, { useRef, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useTheme } from '../theme';
import { haptic } from '../lib/haptics';
import { T } from '../ui';

/** Menu suspenso ancorado ao botão (filial). */
export function Menu<V extends string>({ label, value, options, onChange }: { label: string; value: V; options: { v: V; l: string }[]; onChange: (v: V) => void }) {
  const { c } = useTheme();
  const ref = useRef<View>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const current = options.find((o) => o.v === value)?.l ?? '';
  const open = () => {
    haptic('select');
    ref.current?.measureInWindow((x, y, _w, h) => setPos({ x, y: y + h + 4 }));
  };
  return (
    <>
      <Pressable ref={ref} accessibilityRole="button" accessibilityLabel={`${label}: ${current}`} onPress={open} hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 36 }}>
        <T v="eyebrow">{label}</T>
        <T v="label" size={11}>
          {current} ▾
        </T>
      </Pressable>
      <Modal visible={!!pos} transparent animationType="fade" onRequestClose={() => setPos(null)}>
        <Pressable style={{ flex: 1 }} onPress={() => setPos(null)} accessibilityLabel="Fechar menu">
          {pos ? (
            <View style={{ position: 'absolute', left: pos.x, top: pos.y, minWidth: 200, backgroundColor: c.bg, borderWidth: 1, borderColor: c.ink, paddingVertical: 4 }}>
              {options.map((o) => (
                <Pressable
                  key={o.v}
                  accessibilityRole="menuitem"
                  onPress={() => {
                    haptic('select');
                    onChange(o.v);
                    setPos(null);
                  }}
                  style={(st: any) => ({ paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: st.hovered || st.pressed ? c.surface2 : 'transparent' })}
                >
                  <View style={{ width: 8, height: 8, backgroundColor: o.v === value ? c.brand : 'transparent' }} />
                  <T v="label" size={11}>
                    {o.l}
                  </T>
                </Pressable>
              ))}
            </View>
          ) : null}
        </Pressable>
      </Modal>
    </>
  );
}
