import React from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { T } from './T';

/** Contentor de ecrã com scroll; respeita a margem do breakpoint. */
export function Page({ children, bottomInset = 0 }: { children: React.ReactNode; bottomInset?: number }) {
  const { c } = useTheme();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingBottom: 48 + bottomInset }} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

/** Cabeçalho de ecrã: rótulo pequeno, título em maiúsculas e acções à direita (em baixo no telemóvel). */
export function PageHeader({ eyebrow, title, actions }: { eyebrow?: string; title: string; actions?: React.ReactNode }) {
  const { g, compact } = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: g,
        paddingTop: compact ? 20 : 40,
        paddingBottom: compact ? 20 : 32,
        flexDirection: compact ? 'column' : 'row',
        alignItems: compact ? 'stretch' : 'flex-end',
        justifyContent: 'space-between',
        gap: compact ? 16 : 24,
        flexWrap: 'wrap',
      }}
    >
      <View style={{ gap: 10, flexShrink: 1, minWidth: 0 }}>
        {eyebrow ? <T v="eyebrow">{eyebrow}</T> : null}
        <T v="display" accessibilityRole="header">
          {title}
        </T>
      </View>
      {actions ? <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{actions}</View> : null}
    </View>
  );
}

export type Stat = { value: React.ReactNode; label: string };
export type Hero = { label: string; value: React.ReactNode; sub?: React.ReactNode; action?: React.ReactNode; bg?: string; fg?: string };

/** Faixa de números: bloco laranja de destaque + números em creme. */
export function StatBand({ hero, stats }: { hero?: Hero; stats: Stat[] }) {
  const { c, g, compact, bp } = useTheme();
  const heroFs = compact ? 40 : bp === 'medium' ? 48 : 56;
  const statFs = compact ? 26 : bp === 'medium' ? 28 : 34;
  // Tablet: destaque em largura total, números numa linha por baixo.
  const stackHero = bp !== 'wide';
  return (
    <View style={{ flexDirection: stackHero ? 'column' : 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
      {hero ? (
        <View
          style={{
            flex: stackHero ? undefined : 1.4,
            minWidth: stackHero ? undefined : 260,
            backgroundColor: hero.bg ?? c.brand,
            paddingVertical: compact ? 22 : 28,
            paddingLeft: g,
            paddingRight: stackHero ? g : 32,
            gap: compact ? 14 : 20,
            justifyContent: 'space-between',
          }}
        >
          <T v="eyebrow" color={hero.fg ?? c.onBrand}>
            {hero.label}
          </T>
          {typeof hero.value === 'string' ? (
            <T v="num" size={heroFs} color={hero.fg ?? c.onBrand} numberOfLines={1} adjustsFontSizeToFit>
              {hero.value}
            </T>
          ) : (
            hero.value
          )}
          {hero.sub ? (typeof hero.sub === 'string' ? <T v="small" size={13} color={hero.fg ?? c.onBrand}>{hero.sub}</T> : hero.sub) : null}
          {hero.action}
        </View>
      ) : null}
      <View style={{ flex: stackHero ? undefined : stats.length, flexDirection: 'row', flexWrap: compact ? 'wrap' : 'nowrap' }}>
        {stats.map((s, i) => (
          <View
            key={s.label}
            style={{
              width: compact ? (stats.length % 2 === 1 && i === stats.length - 1 ? '100%' : '50%') : undefined,
              flex: compact ? undefined : 1,
              minWidth: 0,
              backgroundColor: c.surface,
              paddingVertical: compact ? 18 : 28,
              paddingHorizontal: compact ? (i % 2 === 0 ? g : 18) : bp === 'medium' && i === 0 ? g : 24,
              justifyContent: 'flex-end',
              gap: 8,
              borderLeftWidth: compact ? (i % 2 === 1 ? 1 : 0) : bp === 'medium' && i === 0 ? 0 : 1,
              borderTopWidth: (compact && (hero || i > 1)) || (bp === 'medium' && hero) ? 1 : 0,
              borderColor: c.line2,
            }}
          >
            {typeof s.value === 'string' || typeof s.value === 'number' ? (
              <T v="num" size={statFs} numberOfLines={1} adjustsFontSizeToFit>
                {s.value}
              </T>
            ) : (
              s.value
            )}
            <T v="eyebrow" color={c.ink} numberOfLines={2}>
              {s.label}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}

/** Secção com cabeçalho; `dot` mostra o ponto de estado antes do título. */
export function Section({
  title,
  dot,
  right,
  children,
  style,
  pad = true,
}: {
  title?: string;
  dot?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  pad?: boolean;
}) {
  const { g, compact } = useTheme();
  return (
    <View style={[{ paddingHorizontal: pad ? g : 0, paddingVertical: compact ? 24 : 32, gap: 14, minWidth: 0 }, style]}>
      {title || right ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, minHeight: 24, flexWrap: 'wrap' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 }}>
            {dot ? <Dot color={dot} /> : null}
            {title ? (
              <T v="section" accessibilityRole="header">
                {title}
              </T>
            ) : null}
          </View>
          {right ? <View style={{ flexShrink: 1, maxWidth: '100%' }}>{right}</View> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

export const Dot = ({ color, size = 8, square }: { color: string; size?: number; square?: boolean }) => (
  <View style={{ width: size, height: size, borderRadius: square ? 0 : size / 2, backgroundColor: color, flexShrink: 0 }} />
);

/**
 * Colunas responsivas com divisórias. `cols` por breakpoint.
 * No telemóvel empilham com divisória horizontal.
 */
export function Cols({
  children,
  cols = { compact: 1, medium: 2, wide: 2 },
  divide = true,
  style,
}: {
  children: React.ReactNode;
  cols?: { compact: number; medium: number; wide: number };
  divide?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { c, bp } = useTheme();
  const n = cols[bp];
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {items.map((child, i) => {
        const col = i % n;
        return (
          <View
            key={i}
            style={{
              width: `${100 / n}%` as any,
              minWidth: 0,
              borderLeftWidth: divide && col > 0 ? 1 : 0,
              borderTopWidth: divide && i >= n ? 1 : 0,
              borderColor: c.line,
            }}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
}

/** Divisão horizontal com proporções (ex.: 1.6 / 1). Empilha no telemóvel. */
export function Split({
  children,
  ratio = [1.6, 1],
  minRight = 320,
  stackAt = 'medium',
  divide = true,
  style,
}: {
  children: [React.ReactNode, React.ReactNode];
  ratio?: [number, number];
  minRight?: number;
  stackAt?: 'compact' | 'medium';
  divide?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { c, bp } = useTheme();
  const stacked = bp === 'compact' || (stackAt === 'medium' && bp === 'medium');
  if (stacked)
    return (
      <View style={style}>
        {children[0]}
        <View style={{ borderTopWidth: divide ? 1 : 0, borderColor: c.line }}>{children[1]}</View>
      </View>
    );
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'stretch' }, style]}>
      <View style={{ flex: ratio[0], minWidth: 0 }}>{children[0]}</View>
      <View style={{ flex: ratio[1], minWidth: minRight, borderLeftWidth: divide ? 1 : 0, borderColor: c.line }}>{children[1]}</View>
    </View>
  );
}

export const Divider = ({ color, mv = 0 }: { color?: string; mv?: number }) => {
  const { c } = useTheme();
  return <View style={{ height: 1, backgroundColor: color ?? c.line, marginVertical: mv }} />;
};

/** Linha de lista com divisória superior (padrão das listas do MUNTU). */
export function ListRow({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: 1, borderColor: c.line }, style]}>{children}</View>;
}

/** Pares rótulo/valor (dl). */
export function KV({ items }: { items: [string, React.ReactNode][] }) {
  const { c } = useTheme();
  return (
    <View>
      {items.map(([k, v]) => (
        <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, borderTopWidth: 1, borderColor: c.line, paddingVertical: 9 }}>
          <T v="small" size={13}>
            {k}
          </T>
          {typeof v === 'string' || typeof v === 'number' ? (
            <T size={13} right style={{ flexShrink: 1 }}>
              {v}
            </T>
          ) : (
            v
          )}
        </View>
      ))}
    </View>
  );
}

/** Aviso em faixa (estado, sem rede, bloqueio). */
export function Banner({ tone, children, style }: { tone: { fg: string; bg: string; dot: string }; children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { g } = useTheme();
  return (
    <View accessibilityRole="alert" style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: g, backgroundColor: tone.bg }, style]}>
      <Dot color={tone.dot} />
      <T v="bodyStrong" color={tone.fg} style={{ flex: 1 }}>
        {children}
      </T>
    </View>
  );
}

/** Caixa de nota (creme ou tom de estado). */
export function Note({ children, bg, color, style }: { children: React.ReactNode; bg?: string; color?: string; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return (
    <View style={[{ backgroundColor: bg ?? c.surface, padding: 14 }, style]}>
      {typeof children === 'string' ? (
        <T size={13} color={color ?? c.ink} style={{ lineHeight: 20 }}>
          {children}
        </T>
      ) : (
        children
      )}
    </View>
  );
}
