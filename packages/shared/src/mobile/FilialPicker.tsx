import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme';
import { useMuntu, type Filial } from '../store';
import { haptic } from '../lib/haptics';
import { Sheet, T, em } from '../ui';

const OPTS: { v: Filial; l: string; long: string }[] = [
  { v: 'todas', l: 'Todas as filiais', long: 'Rede inteira · 3 filiais' },
  { v: 'talatona', l: 'Talatona', long: 'Base · 612 activos' },
  { v: 'kilamba', l: 'Kilamba', long: '428 activos' },
  { v: 'maianga', l: 'Maianga', long: '244 activos' },
];

/** "TODAS AS FILIAIS ▾" do painel mobile; abre uma folha com as filiais. */
export function FilialPicker() {
  const { c } = useTheme();
  const filial = useMuntu((s) => s.filial);
  const setFilial = useMuntu((s) => s.setFilial);
  const [open, setOpen] = useState(false);
  const cur = OPTS.find((o) => o.v === filial)!;
  return (
    <>
      <Pressable accessibilityRole="button" accessibilityLabel={`Filial: ${cur.l}`} hitSlop={10} onPress={() => { haptic('select'); setOpen(true); }}>
        <T size={10} w={600} color={c.muted} style={{ letterSpacing: em(10, 0.2), textTransform: 'uppercase' }}>
          {cur.l} ▾
        </T>
      </Pressable>
      <Sheet visible={open} onClose={() => setOpen(false)} eyebrow="Mostrar dados de" title="Filial">
        <View>
          {OPTS.map((o, i) => (
            <Pressable
              key={o.v}
              accessibilityRole="radio"
              accessibilityState={{ selected: o.v === filial }}
              onPress={() => {
                haptic('select');
                setFilial(o.v);
                setOpen(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderColor: c.line }}
            >
              <View style={{ width: 14, height: 14, borderWidth: 1, borderColor: c.ink, backgroundColor: o.v === filial ? c.brand : 'transparent' }} />
              <View style={{ flex: 1, gap: 2 }}>
                <T v="label" size={11}>{o.l}</T>
                <T v="small">{o.long}</T>
              </View>
            </Pressable>
          ))}
        </View>
      </Sheet>
    </>
  );
}
