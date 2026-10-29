import React from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { Dot, T, em } from '../ui';

/** Margem lateral do desenho mobile. */
export const PAD = 24;

/** Contentor de tela com scroll. */
export function MScreen({ children }: { children: React.ReactNode }) {
  const { c } = useTheme();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

/** Rótulo pequeno em maiúsculas (10 px, +22%). */
export function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  const { c } = useTheme();
  return (
    <T size={10} w={600} color={color ?? c.muted} style={{ letterSpacing: em(10, 0.22), textTransform: 'uppercase', lineHeight: 14 }}>
      {children}
    </T>
  );
}

/** Título de tela: Regular 30, maiúsculas, +18%. */
export function MTitle({ children, color }: { children: React.ReactNode; color?: string }) {
  const { c } = useTheme();
  return (
    <T size={30} w={400} color={color ?? c.ink} accessibilityRole="header" style={{ letterSpacing: em(30, 0.18), textTransform: 'uppercase', lineHeight: 32 }}>
      {children}
    </T>
  );
}

/** Topo padrão (M2, O2): rótulo + título, com divisória. */
export function MHeader({ eyebrow, title, right }: { eyebrow: string; title: string; right?: React.ReactNode }) {
  const { c } = useTheme();
  return (
    <View style={{ paddingTop: 12, paddingHorizontal: PAD, paddingBottom: 24, gap: 6, borderBottomWidth: 1, borderColor: c.line }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        {right}
      </View>
      <MTitle>{title}</MTitle>
    </View>
  );
}

/** Cabeçalho de secção: SemiBold 12, +20%, com ponto opcional. */
export function MSection({ children, dot, style }: { children: React.ReactNode; dot?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 10 }, style]}>
      {dot ? <Dot color={dot} /> : null}
      <T size={12} w={600} style={{ letterSpacing: em(12, 0.2), textTransform: 'uppercase' }}>
        {children}
      </T>
    </View>
  );
}

/** Linha de lista com divisória superior e padding 14. */
export function MRow({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return <View style={[{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 14, borderTopWidth: 1, borderColor: c.line }, style]}>{children}</View>;
}

/** Número grande em Light. */
export function Big({ children, size = 36, color, right }: { children: React.ReactNode; size?: number; color?: string; right?: boolean }) {
  const { c } = useTheme();
  return (
    <T v="num" size={size} color={color ?? c.ink} right={right} numberOfLines={1} adjustsFontSizeToFit style={{ lineHeight: size * 1.05 }}>
      {children}
    </T>
  );
}

/** Etiqueta de valor/rótulo dentro da faixa creme (10 px, +20%). */
export function StatLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  const { c } = useTheme();
  return (
    <T size={10} w={600} color={color ?? c.ink} style={{ letterSpacing: em(10, 0.2), textTransform: 'uppercase', lineHeight: 14 }}>
      {children}
    </T>
  );
}
