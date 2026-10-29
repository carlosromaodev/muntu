import React from 'react';
import { Platform, Pressable, TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
import { fonts, toneColor, useTheme } from '../theme';
import { ST, type StatusKey, type Tone } from '../data/sample';
import { haptic } from '../lib/haptics';
import { Dot } from './layout';
import { T, em } from './T';

/** Estado com ponto colorido: "● PAGO". */
export function Status({ s, label, tone, sub }: { s?: StatusKey; label?: string; tone?: Tone; sub?: string }) {
  const { c } = useTheme();
  const st = s ? ST[s] : { l: label ?? '', tone: tone ?? 'neutral' };
  const col = toneColor(c, tone ?? st.tone);
  return (
    <View style={{ gap: 3, minWidth: 0 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Dot color={col.dot} />
        <T v="label" color={col.fg} numberOfLines={1}>
          {label ?? st.l}
        </T>
      </View>
      {sub ? (
        <T v="small" size={11} numberOfLines={1}>
          {sub}
        </T>
      ) : null}
    </View>
  );
}

/** Etiqueta creme (filiais, âmbito do plano). */
export function Tag({ children }: { children: string }) {
  const { c } = useTheme();
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 6, backgroundColor: c.surface }}>
      <T v="label" size={10} style={{ letterSpacing: em(10, 0.12) }}>
        {children}
      </T>
    </View>
  );
}

/** Grupo de chips de selecção única (filtros, canal, modelos). */
export function Chips<V extends string>({
  options,
  value,
  onChange,
  label,
  scroll,
}: {
  options: readonly (V | { v: V; l: string })[];
  value: V;
  onChange: (v: V) => void;
  label?: string;
  scroll?: boolean;
}) {
  const { c } = useTheme();
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={{ flexDirection: 'row', gap: 6, flexWrap: scroll ? 'nowrap' : 'wrap' }}>
      {options.map((o) => {
        const v = (typeof o === 'string' ? o : o.v) as V;
        const l = typeof o === 'string' ? o : o.l;
        const on = v === value;
        return (
          <Pressable
            key={v}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => {
              haptic('select');
              onChange(v);
            }}
            style={(st: any) => ({
              height: 32,
              paddingHorizontal: 12,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: c.ink,
              backgroundColor: on ? c.invBg : st.hovered ? c.surface2 : 'transparent',
            })}
          >
            <T v="label" size={10} color={on ? c.invInk : c.ink} numberOfLines={1}>
              {l}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Segmentado com contorno único (pré-visualizar estado). */
export function Segmented<V extends string>({ options, value, onChange }: { options: { v: V; l: string }[]; value: V; onChange: (v: V) => void }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: c.ink, alignSelf: 'flex-start', flexWrap: 'wrap' }}>
      {options.map((o) => {
        const on = o.v === value;
        return (
          <Pressable
            key={o.v}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => {
              haptic('select');
              onChange(o.v);
            }}
            style={{ height: 32, paddingHorizontal: 12, justifyContent: 'center', backgroundColor: on ? c.invBg : 'transparent' }}
          >
            <T v="label" size={10} color={on ? c.invInk : c.ink}>
              {o.l}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Interruptor quadrado da marca. */
export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      hitSlop={8}
      onPress={() => {
        haptic('select');
        onChange(!value);
      }}
      style={{ width: 40, height: 22, padding: 2, borderWidth: 1, borderColor: c.ink, backgroundColor: value ? c.invBg : 'transparent', flexDirection: 'row', justifyContent: value ? 'flex-end' : 'flex-start' }}
    >
      <View style={{ width: 16, height: 16, backgroundColor: value ? c.brand : c.ink }} />
    </Pressable>
  );
}

/** Caixa de selecção quadrada. */
export function Check({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      onPress={() => {
        haptic('select');
        onChange(!value);
      }}
      style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start', paddingVertical: 14, borderTopWidth: 1, borderColor: c.line }}
    >
      <View style={{ width: 20, height: 20, marginTop: 1, borderWidth: 1, borderColor: c.ink, backgroundColor: value ? c.brand : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
        {value ? <View style={{ width: 8, height: 8, backgroundColor: '#1D1C1A' }} /> : null}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <T v="bodyStrong" style={value ? { textDecorationLine: 'line-through', color: c.ink2 } : null}>
          {label}
        </T>
        {sub ? <T v="small">{sub}</T> : null}
      </View>
    </Pressable>
  );
}

/** Campo com rótulo e linha inferior (padrão dos formulários). */
export function Field({
  label,
  big,
  style,
  ...input
}: TextInputProps & { label: string; big?: boolean; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return (
    <View style={[{ gap: 6 }, style]}>
      <T v="eyebrow">{label}</T>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={c.muted}
        {...input}
        style={{
          height: big ? 48 : 42,
          borderBottomWidth: 1,
          borderColor: c.ink,
          paddingHorizontal: 0,
          paddingVertical: 0,
          fontSize: big ? 22 : 16,
          fontFamily: fonts[300],
          color: c.ink,
          opacity: input.editable === false ? 0.8 : 1,
          ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null),
        }}
      />
    </View>
  );
}

/** Área de texto com contorno. */
export function Area({ label, style, ...input }: TextInputProps & { label?: string; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return (
    <View style={[{ gap: 8 }, style]}>
      {label ? <T v="eyebrow">{label}</T> : null}
      <TextInput
        multiline
        accessibilityLabel={label}
        placeholderTextColor={c.muted}
        textAlignVertical="top"
        {...input}
        style={{ minHeight: 92, borderWidth: 1, borderColor: c.ink, backgroundColor: c.card, padding: 12, fontSize: 15, lineHeight: 21, fontFamily: fonts[400], color: c.ink }}
      />
    </View>
  );
}

/** Opção de lista seleccionável (meio de pagamento). */
export function OptionRow({ label, sub, selected, onPress }: { label: string; sub?: string; selected: boolean; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => {
        haptic('select');
        onPress();
      }}
      style={(st: any) => ({
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: c.line,
        backgroundColor: selected || st.hovered ? c.surface2 : 'transparent',
      })}
    >
      <View style={{ width: 14, height: 14, borderWidth: 1, borderColor: c.ink, backgroundColor: selected ? c.brand : 'transparent' }} />
      <T v="bodyStrong" size={15} style={{ flex: 1 }}>
        {label}
      </T>
      {sub ? <T v="small">{sub}</T> : null}
    </Pressable>
  );
}

/** Barra de passos (inscrição). */
export function Steps({ labels, current }: { labels: string[]; current: number }) {
  const { c, compact } = useTheme();
  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: labels.length, now: current + 1 }} style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {labels.map((l, i) => (
          <View key={l} style={{ flex: 1, gap: 10 }}>
            <View style={{ height: 4, backgroundColor: i < current ? c.ink : i === current ? c.brand : c.line }} />
            {!compact ? (
              <T v="eyebrow" color={i <= current ? c.ink : c.muted} numberOfLines={1}>
                {`0${i + 1} · ${l}`}
              </T>
            ) : null}
          </View>
        ))}
      </View>
      {compact ? (
        <T v="eyebrow" color={c.ink}>
          Passo {current + 1} de {labels.length} · {labels[current]}
        </T>
      ) : null}
    </View>
  );
}
