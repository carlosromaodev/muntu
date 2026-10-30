import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, StyleProp, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DUR, fade, timing } from './motion';
import { C, type } from '../theme/tokens';
import { Press } from './Press';
import { Txt } from './Txt';

const SLIDE = timing(250);

/** Valor 0→1 que segue `on` com a curva da MUNTU (sem dependências de hook, que o nativo ignora). */
function useTimed(on: boolean, ms: number = DUR.color) {
  const v = useSharedValue(on ? 1 : 0);
  useEffect(() => {
    v.value = withTiming(on ? 1 : 0, timing(ms));
  }, [on, ms, v]);
  return v;
}

/** Botão-chip seleccionável (filtros, opções). Preto quando activo. */
export function Chip({ label, on, onPress, size = 'md', style, count }: { label: string; on?: boolean; onPress?: () => void; size?: 'sm' | 'md'; style?: StyleProp<ViewStyle>; count?: number | string }) {
  const p = useTimed(!!on);
  const bg = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(p.value, [0, 1], ['rgba(29,28,26,0)', C.ink]),
    borderColor: interpolateColor(p.value, [0, 1], [C.lineStrong, C.ink]),
  }));
  return (
    <Press feedback="select" onPress={onPress} accessibilityState={{ selected: !!on }} style={style}>
      <Animated.View style={[{ height: size === 'sm' ? 28 : 34, paddingHorizontal: size === 'sm' ? 10 : 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }, bg]}>
        <Txt numberOfLines={1} style={[type(size === 'sm' ? 9 : 10, 600, 0.14, true), { color: on ? C.paper : C.ink }]}>
          {label}
        </Txt>
        {count !== undefined ? <Txt style={[type(9, 600, 0.1), { color: on ? C.sand : C.muted }]}>{count}</Txt> : null}
      </Animated.View>
    </Press>
  );
}

export function ChipGroup<T extends string>({ options, value, onChange, size, style, wrap = true }: { options: readonly (readonly [T, string])[] | readonly { v: T; l: string; n?: number | string }[]; value: T; onChange: (v: T) => void; size?: 'sm' | 'md'; style?: StyleProp<ViewStyle>; wrap?: boolean }) {
  const list = (options as any[]).map((o) => (Array.isArray(o) ? { v: o[0], l: o[1] } : o)) as { v: T; l: string; n?: number | string }[];
  return (
    <View style={[{ flexDirection: 'row', flexWrap: wrap ? 'wrap' : 'nowrap', gap: 6 }, style]}>
      {list.map((o) => (
        <Chip key={o.v} label={o.l} count={o.n} on={o.v === value} onPress={() => onChange(o.v)} size={size} />
      ))}
    </View>
  );
}

/**
 * Controlo segmentado com indicador que desliza (fundo areia, segmento activo papel).
 */
export function Segmented<T extends string>({ options, value, onChange, style, dark }: { options: readonly { v: T; l: string; n?: number | string }[]; value: T; onChange: (v: T) => void; style?: StyleProp<ViewStyle>; dark?: boolean }) {
  const [w, setW] = useState(0);
  const idx = Math.max(0, options.findIndex((o) => o.v === value));
  const x = useSharedValue(0);
  const seg = options.length ? (w - 8) / options.length : 0;
  useEffect(() => {
    x.value = w ? withTiming(idx * seg, SLIDE) : idx * seg;
  }, [idx, seg, w, x]);
  const ind = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  return (
    <View onLayout={(e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width)} style={[{ flexDirection: 'row', backgroundColor: dark ? C.ink : C.sand, padding: 4 }, style]}>
      {w > 0 ? <Animated.View style={[{ position: 'absolute', top: 4, bottom: 4, left: 4, width: seg, backgroundColor: dark ? C.accent : C.paper }, ind]} /> : null}
      {options.map((o) => {
        const on = o.v === value;
        return (
          <Press key={o.v} feedback="select" scaleTo={1} onPress={() => onChange(o.v)} accessibilityState={{ selected: on }} style={{ flex: 1, height: 36, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }}>
            <Txt numberOfLines={1} style={[type(10, 600, 0.14, true), { color: dark ? (on ? C.ink : C.sand) : C.ink, opacity: on ? 1 : 0.75 }]}>
              {o.l}
            </Txt>
            {o.n !== undefined ? <Txt style={[type(10, 500), { color: C.muted }]}>{o.n}</Txt> : null}
          </Press>
        );
      })}
    </View>
  );
}

/** Separadores sublinhados (laranja, 3 px) com indicador animado. */
export function Tabs<T extends string>({ options, value, onChange, style }: { options: readonly { v: T; l: string; n?: number | string }[]; value: T; onChange: (v: T) => void; style?: StyleProp<ViewStyle> }) {
  const [lay, setLay] = useState<Record<string, { x: number; w: number }>>({});
  const x = useSharedValue(0);
  const w = useSharedValue(0);
  useEffect(() => {
    const l = lay[value];
    if (l) {
      x.value = withTiming(l.x, SLIDE);
      w.value = withTiming(l.w, SLIDE);
    }
  }, [lay, value, x, w]);
  const ind = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }], width: w.value }));
  return (
    <View style={[{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.line }, style]}>
      {options.map((o) => (
        <Press
          key={o.v}
          feedback="select"
          scaleTo={1}
          onPress={() => onChange(o.v)}
          accessibilityRole="tab"
          accessibilityState={{ selected: o.v === value }}
          onLayout={(e) => {
            const { x: lx, width } = e.nativeEvent.layout;
            setLay((p) => (p[o.v]?.x === lx && p[o.v]?.w === width ? p : { ...p, [o.v]: { x: lx, w: width } }));
          }}
          style={{ paddingHorizontal: 10, paddingVertical: 12, flexDirection: 'row', gap: 6, alignItems: 'center' }}
        >
          <Txt style={[type(10, 600, 0.16, true), { color: o.v === value ? C.ink : C.muted }]}>{o.l}</Txt>
          {o.n !== undefined ? <Txt style={[type(10, 500), { color: C.muted }]}>{o.n}</Txt> : null}
        </Press>
      ))}
      <Animated.View style={[{ position: 'absolute', left: 0, bottom: -1, height: 3, backgroundColor: C.accent }, ind]} />
    </View>
  );
}

/** Campo de texto sublinhado com rótulo, como nos formulários do desenho. */
export function Field({ label, prefix, right, error, style, inputStyle, big, ...input }: TextInputProps & { label?: string; prefix?: string; right?: React.ReactNode; error?: string; style?: StyleProp<ViewStyle>; inputStyle?: any; big?: boolean }) {
  const [focus, setFocus] = useState(false);
  const f = useTimed(focus);
  const line = useAnimatedStyle(() => ({ backgroundColor: interpolateColor(f.value, [0, 1], [error ? C.bad : C.lineStrong, C.ink]), height: 1 + f.value }));
  return (
    <View style={style}>
      {label ? (
        <Txt v="eyebrow" c={C.muted} style={{ marginBottom: 8 }}>
          {label}
        </Txt>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: big ? 44 : 38 }}>
        {prefix ? <Txt style={[type(big ? 16 : 15, 400), { color: C.faint }]}>{prefix}</Txt> : null}
        <TextInput
          placeholderTextColor={C.faint}
          selectionColor={C.accent}
          {...input}
          onFocus={(e) => {
            setFocus(true);
            input.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            input.onBlur?.(e);
          }}
          style={[type(big ? 16 : 15, 400), { flex: 1, color: C.ink, paddingVertical: 8 }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null, inputStyle]}
        />
        {right}
      </View>
      <Animated.View style={line} />
      {error ? (
        <Txt v="small" c={C.bad} style={{ marginTop: 6 }}>
          {error}
        </Txt>
      ) : null}
    </View>
  );
}

/** Caixa de texto com contorno (mensagens, descrições). */
export function TextArea({ style, ...input }: TextInputProps & { style?: StyleProp<ViewStyle> }) {
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      multiline
      placeholderTextColor={C.faint}
      selectionColor={C.accent}
      textAlignVertical="top"
      {...input}
      onFocus={(e) => {
        setFocus(true);
        input.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocus(false);
        input.onBlur?.(e);
      }}
      style={[type(14, 400), { minHeight: 92, borderWidth: 1, borderColor: focus ? C.ink : C.lineStrong, backgroundColor: C.paper, padding: 12, color: C.ink, lineHeight: 20 }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null, style as any]}
    />
  );
}

/** Caixa de selecção quadrada. */
export function Checkbox({ on, onChange, label, sub, style, right }: { on: boolean; onChange?: (v: boolean) => void; label?: string; sub?: string; style?: StyleProp<ViewStyle>; right?: React.ReactNode }) {
  return (
    <Press feedback="select" scaleTo={0.99} onPress={() => onChange?.(!on)} accessibilityRole="checkbox" accessibilityState={{ checked: on }} style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, style]}>
      <View style={{ width: 18, height: 18, borderWidth: 1.5, borderColor: C.ink, backgroundColor: on ? C.ink : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
        {on ? (
          <Animated.View entering={fade(140)}>
            <Txt style={[type(11, 600), { color: C.paper, lineHeight: 13 }]}>✓</Txt>
          </Animated.View>
        ) : null}
      </View>
      {label ? (
        <View style={{ flex: 1 }}>
          <Txt v="bodyStrong">{label}</Txt>
          {sub ? (
            <Txt v="small" c={C.muted}>
              {sub}
            </Txt>
          ) : null}
        </View>
      ) : null}
      {right}
    </Press>
  );
}

/** Interruptor rectangular (preto/areia), com o botão a deslizar. */
export function Toggle({ on, onChange, accent, color = C.ink }: { on: boolean; onChange?: (v: boolean) => void; accent?: boolean; color?: string }) {
  const p = useTimed(!!on);
  const track = useAnimatedStyle(() => ({ backgroundColor: interpolateColor(p.value, [0, 1], [C.lineStrong, color]) }));
  const knob = useAnimatedStyle(() => ({ transform: [{ translateX: 3 + p.value * 16 }], backgroundColor: accent ? interpolateColor(p.value, [0, 1], [C.paper, C.accent]) : C.paper }));
  return (
    <Press feedback="select" scaleTo={1} onPress={() => onChange?.(!on)} accessibilityRole="switch" accessibilityState={{ checked: on }}>
      <Animated.View style={[{ width: 38, height: 22, justifyContent: 'center' }, track]}>
        <Animated.View style={[{ width: 16, height: 16 }, knob]} />
      </Animated.View>
    </Press>
  );
}

/** Contador − valor + (notas, limites, descontos). */
export function Stepper({ value, onChange, step = 1, min = 0, max = Infinity, format = (v: number) => String(v), width = 120 }: { value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number; format?: (v: number) => string; width?: number }) {
  const btn = (label: string, d: number) => (
    <Press feedback="select" onPress={() => onChange(Math.min(max, Math.max(min, value + d)))} disabled={(d < 0 && value <= min) || (d > 0 && value >= max)} style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
      <Txt style={type(14, 400)}>{label}</Txt>
    </Press>
  );
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.ink, width, justifyContent: 'space-between' }}>
      {btn('−', -step)}
      <Txt tabular style={[type(13, 500), { flex: 1, textAlign: 'center' }]}>
        {format(value)}
      </Txt>
      {btn('+', step)}
    </View>
  );
}

/** Barra de progresso fina, anima até ao valor. */
export function Progress({ value, color = C.ink, track = C.line, height = 3, style }: { value: number; color?: string; track?: string; height?: number; style?: StyleProp<ViewStyle> }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withTiming(Math.max(0, Math.min(1, value)), timing(DUR.fill));
  }, [value, p]);
  const bar = useAnimatedStyle(() => ({ width: `${p.value * 100}%` }));
  return (
    <View style={[{ height, backgroundColor: track, overflow: 'hidden' }, style]}>
      <Animated.View style={[{ height: '100%', backgroundColor: color }, bar]} />
    </View>
  );
}

/** Caixa de valor em Kz (contorno preto, "Kz" à direita). Aceita milhares e cêntimos. */
export function MoneyInput({ value, onChangeText, placeholder, editable = true, height = 44, size = 16, accessibilityLabel, style }: { value: string; onChangeText: (t: string) => void; placeholder?: string; editable?: boolean; height?: number; size?: number; accessibilityLabel?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8, height, paddingHorizontal: 12, borderWidth: 1, borderColor: editable ? C.ink : C.line, backgroundColor: '#fff' }, style]}>
      <TextInput
        value={value}
        editable={editable}
        onChangeText={(t) => onChangeText(t.replace(/[^\d\s,.]/g, ''))}
        placeholder={placeholder}
        placeholderTextColor={C.faint}
        keyboardType="decimal-pad"
        inputMode="decimal"
        accessibilityLabel={accessibilityLabel ?? placeholder}
        style={[type(size, 400), { flex: 1, minWidth: 0, color: C.ink, paddingVertical: 0, fontVariant: ['tabular-nums'] }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null]}
      />
      <Txt style={[type(size - 3, 400), { color: C.muted }]}>Kz</Txt>
    </View>
  );
}
