import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeInDown, LinearTransition } from 'react-native-reanimated';
import { C, Tone, TONES, type } from '../theme/tokens';
import { Txt } from './Txt';

/** Etiqueta de estado (Pago, Em dívida, Urgente…). */
export function Badge({ label, tone = 'neutral', fg, bg, dot, style }: { label: string; tone?: Tone; fg?: string; bg?: string; dot?: boolean; style?: StyleProp<ViewStyle> }) {
  const t = TONES[tone];
  const color = fg ?? t.fg;
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: bg ?? t.bg, alignSelf: 'flex-start' }, style]}>
      {dot ? <Dot color={color} size={6} /> : null}
      <Txt numberOfLines={1} style={[type(10, 600, 0.12, true), { color }]}>
        {label}
      </Txt>
    </View>
  );
}

/** Estado só com ponto colorido + texto (● PAGO). */
export function StatusText({ label, color, size = 10 }: { label: string; color: string; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Dot color={color} size={6} />
      <Txt numberOfLines={1} style={[type(size, 600, 0.14, true), { color }]}>
        {label}
      </Txt>
    </View>
  );
}

export function Dot({ color, size = 8, style }: { color: string; size?: number; style?: StyleProp<ViewStyle> }) {
  return <View style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }, style]} />;
}

export function Divider({ color = C.line, style }: { color?: string; style?: StyleProp<ViewStyle> }) {
  return <View style={[{ height: 1, backgroundColor: color, alignSelf: 'stretch' }, style]} />;
}

/** Quadrado com iniciais (avatar dos desenhos). */
export function Avatar({ initials, size = 36, bg = C.sand, fg = C.ink, style }: { initials: string; size?: number; bg?: string; fg?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ width: size, height: size, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Txt style={[type(Math.max(9, size * 0.3), 600, 0.06), { color: fg }]}>{initials}</Txt>
    </View>
  );
}

/** Painel com fundo papel e contorno fino. */
export function Card({ children, style, pad = 20, tone = 'paper' }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; pad?: number; tone?: 'paper' | 'sand' | 'canvas' | 'ink' | 'accent' }) {
  const bg = { paper: C.paper, sand: C.sand, canvas: C.canvas, ink: C.ink, accent: C.accent }[tone];
  return <View style={[{ backgroundColor: bg, borderWidth: tone === 'paper' ? 1 : 0, borderColor: C.line, padding: pad }, style]}>{children}</View>;
}

/**
 * Aparece com um pequeno deslize vertical. `i` escalona listas
 * (cada item entra 35 ms depois do anterior, até 10 itens).
 */
export function Reveal({ children, i = 0, style, from = 'down' }: { children: React.ReactNode; i?: number; style?: StyleProp<ViewStyle>; from?: 'down' | 'fade' }) {
  const delay = Math.min(i, 10) * 35;
  const entering = from === 'fade' ? FadeIn.duration(260).delay(delay) : FadeInDown.duration(320).delay(delay).springify().damping(18).stiffness(180);
  return (
    <Animated.View entering={entering} layout={LinearTransition.springify().damping(20)} style={style}>
      {children}
    </Animated.View>
  );
}

/** Linha de lista com separador superior. */
export function Row({ children, style, first, pad = 13 }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; first?: boolean; pad?: number }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: pad, borderTopWidth: first ? 0 : 1, borderTopColor: C.line }, style]}>{children}</View>
  );
}

/** Par rótulo / valor alinhado à direita. */
export function KV({ k, v, vColor, sub, style, strong }: { k: string; v: string; vColor?: string; sub?: string; style?: StyleProp<ViewStyle>; strong?: boolean }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, gap: 12 }, style]}>
      <View style={{ flexShrink: 1 }}>
        <Txt v="small" c={C.muted}>
          {k}
        </Txt>
        {sub ? (
          <Txt v="tiny" c={C.faint}>
            {sub}
          </Txt>
        ) : null}
      </View>
      <Txt v={strong ? 'bodyStrong' : 'small'} c={vColor ?? C.ink} style={{ textAlign: 'right' }}>
        {v}
      </Txt>
    </View>
  );
}

export const Spacer = ({ h = 0, w = 0 }: { h?: number; w?: number }) => <View style={{ height: h, width: w }} />;

/** Caixa de mensagem (erro, informação, sucesso) com entrada animada. */
export function Note({ text, tone = 'neutral', children, style }: { text?: string; tone?: 'bad' | 'ok' | 'warn' | 'neutral' | 'ink'; children?: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const map = { bad: [C.badBg, C.bad], ok: [C.okBg, C.ok], warn: [C.warnBg, C.warn], neutral: [C.sand, C.ink], ink: [C.ink, C.sand] } as const;
  const [bg, fg] = map[tone];
  return (
    <Animated.View entering={FadeInDown.duration(220)} style={[{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: bg }, style]}>
      {tone === 'bad' || tone === 'ok' ? <Dot color={fg} size={8} style={{ marginTop: 5 }} /> : null}
      <View style={{ flex: 1 }}>
        {text ? <Txt style={[type(13, tone === 'neutral' || tone === 'ink' ? 400 : 500), { color: fg, lineHeight: 18 }]}>{text}</Txt> : null}
        {children}
      </View>
    </Animated.View>
  );
}
