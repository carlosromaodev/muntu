import React, { useState } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { C, type } from '../theme/tokens';
import { M, Button, ButtonProps, CountUp, Dot, Press, Txt } from '../ui';
import { GUT, useInner } from './layout';

export { GUT, useDeskLayout, useInner } from './layout';

/** Página do desktop: scroll vertical e entrada suave a cada mudança de ecrã. */
export function DPage({ children, contentStyle }: { children: React.ReactNode; contentStyle?: StyleProp<ViewStyle> }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.canvas }} contentContainerStyle={[{ paddingBottom: 48 }, contentStyle]} keyboardShouldPersistTaps="handled">
      <Animated.View entering={M.fade(220)}>{children}</Animated.View>
    </ScrollView>
  );
}

/** Título do ecrã (26 px, maiúsculas espaçadas) com subtítulo e acções. */
export function PageHead({ title, sub, actions, children }: { title: string; sub?: string; actions?: (ButtonProps | React.ReactElement)[]; children?: React.ReactNode }) {
  return (
    <Animated.View entering={M.enter()} style={{ paddingTop: 32, paddingHorizontal: GUT, paddingBottom: 24, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', columnGap: 24, rowGap: 16 }}>
      <View style={{ gap: 6, flexShrink: 1, flexGrow: 1, flexBasis: 280 }}>
        <Txt accessibilityRole="header" style={type(26, 500, 0.14, true)}>
          {title}
        </Txt>
        {sub ? <Txt style={[type(14, 400), { color: C.muted }]}>{sub}</Txt> : null}
        {children}
      </View>
      {actions?.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {actions.map((a, i) => (React.isValidElement(a) ? <React.Fragment key={i}>{a}</React.Fragment> : <Button key={i} size="md" {...(a as ButtonProps)} style={[{ height: 42, paddingHorizontal: 20 }, (a as ButtonProps).style]} />))}
        </View>
      ) : null}
    </Animated.View>
  );
}

/** Tamanho de letra que cabe: encolhe números longos em vez de os cortar. */
export const fit = (v: string, base: number, max: number) => (v.length <= max ? base : Math.max(base * 0.55, Math.round((base * max) / v.length)));

/**
 * Disposição de uma linha de indicadores: tudo numa linha enquanto cabe; senão o destaque ocupa
 * a linha inteira e os indicadores repartem-se em linhas equilibradas (4 → 2+2).
 */
export function kpiLayout(w: number, n: number, hero: boolean, g = 16) {
  const oneRow = w >= (hero ? 300 + g : 0) + n * 170 + (n - 1) * g;
  if (oneRow) return { oneRow, tileW: undefined as number | undefined };
  const perRow = Math.max(1, Math.min(n, Math.floor((w + g) / (150 + g))));
  const rows = Math.ceil(n / perRow);
  const cols = Math.ceil(n / rows);
  return { oneRow, tileW: Math.floor((w - (cols - 1) * g) / cols) as number | undefined };
}

/** Linha de indicadores: o primeiro em laranja (destaque), os restantes em papel. */
export function KpiRow({ hero, tiles, style }: { hero?: { label: string; value: number | string; format?: (v: number) => string; action?: { label: string; onPress: () => void }; sub?: string; dark?: boolean }; tiles: { v: string | number; l: string; c?: string; sub?: string }[]; style?: StyleProp<ViewStyle> }) {
  const g = 16;
  const { oneRow, tileW } = kpiLayout(useInner(), tiles.length, !!hero);
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: g, paddingHorizontal: GUT, paddingBottom: 20 }, style]}>
      {hero ? (
        <Animated.View entering={M.enter()} style={{ flex: oneRow ? 1.4 : undefined, width: oneRow ? undefined : '100%', minWidth: oneRow ? 300 : 0, backgroundColor: hero.dark ? C.ink : C.accent, paddingVertical: 22, paddingHorizontal: 24, gap: 14, justifyContent: 'space-between' }}>
          <Txt style={[type(13, 500), { color: hero.dark ? C.sand : C.ink }]}>{hero.label}</Txt>
          {typeof hero.value === 'number' ? (
            <CountUp value={hero.value} format={hero.format} numberOfLines={1} style={[type(fit((hero.format ?? String)(hero.value), 44, 10), 300), { color: hero.dark ? C.paper : C.ink }]} />
          ) : (
            <Txt numberOfLines={1} style={[type(fit(String(hero.value), 44, 10), 300), { color: hero.dark ? C.paper : C.ink }]}>
              {hero.value}
            </Txt>
          )}
          {hero.sub ? <Txt style={[type(13, 400), { color: hero.dark ? C.sand : C.ink }]}>{hero.sub}</Txt> : null}
          {hero.action ? <Button label={hero.action.label} kind="outline" size="sm" style={{ alignSelf: 'flex-start', height: 36 }} onPress={hero.action.onPress} /> : null}
        </Animated.View>
      ) : null}
      {tiles.map((t, i) => (
        <Animated.View key={t.l} entering={M.enter(40 * (i + 1))} style={{ flex: oneRow ? 1 : undefined, width: tileW, minWidth: 0, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, paddingVertical: 22, paddingHorizontal: 24, gap: 8, justifyContent: 'space-between' }}>
          <Txt numberOfLines={1} style={[type(fit(String(t.v), 32, tiles.length > 3 ? 7 : 10), 300), { color: t.c ?? C.ink }]}>
            {String(t.v)}
          </Txt>
          <View>
            <Txt style={[type(13, 500), { color: C.grey }]}>{t.l}</Txt>
            {t.sub ? <Txt style={[type(12, 400), { color: C.muted }]}>{t.sub}</Txt> : null}
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

/** Painel branco com título (secções do desenho). */
export function Panel({ title, right, children, style, dot, pad = 28, i = 0 }: { title?: string; right?: React.ReactNode; children?: React.ReactNode; style?: StyleProp<ViewStyle>; dot?: string; pad?: number; i?: number }) {
  return (
    <Animated.View entering={M.enter(60 + i * 50)} style={[{ backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, paddingVertical: 24, paddingHorizontal: pad, gap: 14 }, style]}>
      {title ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 12, rowGap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 }}>
            {dot ? <Dot color={dot} /> : null}
            <Txt accessibilityRole="header" style={type(15, 600, 0.01)}>
              {title}
            </Txt>
          </View>
          {right}
        </View>
      ) : null}
      {children}
    </Animated.View>
  );
}

/** Grelha de duas (ou mais) colunas com a margem do desenho. */
export function Cols({ children, flex = [1.6, 1], gap = 20, min = 340, style }: { children: React.ReactNode; flex?: number[]; gap?: number; min?: number; style?: StyleProp<ViewStyle> }) {
  const kids = React.Children.toArray(children);
  const w = useInner();
  // Colunas lado a lado quando cada uma tem pelo menos `min` px por unidade de flex; senão empilham.
  const need = kids.reduce<number>((a, _, i) => a + (flex[i] ?? 1) * min, 0) + gap * (kids.length - 1);
  const stack = w < need;
  return (
    <View style={[{ flexDirection: stack ? 'column' : 'row', gap, paddingHorizontal: GUT, paddingBottom: 20, alignItems: stack ? 'stretch' : 'flex-start' }, style]}>
      {kids.map((k, i) => (
        <View key={i} style={stack ? { minWidth: 0, gap } : { flex: flex[i] ?? 1, minWidth: 0, gap }}>
          {k}
        </View>
      ))}
    </View>
  );
}

export type Col = { l: string; flex?: number; w?: number; align?: 'left' | 'right' };

/** Tabela: cabeçalho e linhas com separador, opcionalmente clicáveis. */
export function Table<T>({ cols, rows, render, onRow, selected, empty, keyOf, minWidth }: { cols: Col[]; rows: T[]; render: (r: T, i: number) => React.ReactNode[]; onRow?: (r: T) => void; selected?: (r: T) => boolean; empty?: string; keyOf?: (r: T, i: number) => string; minWidth?: number }) {
  // Largura mínima legível: colunas fixas mais ~96 px por unidade de flex. Abaixo disso a tabela
  // desliza na horizontal em vez de espremer o texto.
  const min = minWidth ?? cols.reduce((a, c) => a + (c.w ?? (c.flex ?? 1) * 96), 0) + 16 * (cols.length - 1);
  const [avail, setAvail] = useState(0);
  const scroll = avail > 0 && avail < min;
  const cell = (c: Col, child: React.ReactNode, k: number) => (
    <View key={k} style={{ flex: c.w ? undefined : (c.flex ?? 1), width: c.w, minWidth: 0, alignItems: c.align === 'right' ? 'flex-end' : 'flex-start' }}>
      {typeof child === 'string' || typeof child === 'number' ? <Txt numberOfLines={2} style={type(14, 400)}>{child}</Txt> : child}
    </View>
  );
  const table = (
    <View style={scroll ? { width: min } : undefined}>
      <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 10 }}>
        {cols.map((c, i) => cell(c, <Txt style={[type(12, 500), { color: C.muted }]}>{c.l}</Txt>, i))}
      </View>
      {rows.map((r, i) => {
        const on = selected?.(r);
        const content = render(r, i);
        const inner = (hovered: boolean) => (
          <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 14, paddingHorizontal: onRow ? 8 : 0, marginHorizontal: onRow ? -8 : 0, borderTopWidth: 1, borderTopColor: C.line, alignItems: 'center', backgroundColor: on ? C.sand : hovered ? C.canvas : 'transparent' }}>{cols.map((c, k) => cell(c, content[k], k))}</View>
        );
        return (
          <Animated.View key={keyOf?.(r, i) ?? i} entering={M.enter(Math.min(i, 10) * 30)}>
            {onRow ? (
              <Press feedback="select" scaleTo={1} onPress={() => onRow(r)} accessibilityState={{ selected: !!on }}>
                {({ hovered }) => inner(hovered)}
              </Press>
            ) : (
              inner(false)
            )}
          </Animated.View>
        );
      })}
      {!rows.length && empty ? <Txt style={[type(13, 400), { color: C.muted, paddingVertical: 16 }]}>{empty}</Txt> : null}
    </View>
  );
  return (
    <View onLayout={(e) => setAvail(Math.round(e.nativeEvent.layout.width))} style={{ minWidth: 0 }}>
      {scroll ? (
        <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ paddingBottom: 6 }}>
          {table}
        </ScrollView>
      ) : (
        table
      )}
    </View>
  );
}

/** Estado com ponto colorido em maiúsculas (● PAGO). */
export function Status({ l, c, why }: { l: string; c: string; why?: string }) {
  return (
    <View style={{ gap: 3 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Dot color={c} size={8} />
        <Txt numberOfLines={1} style={[type(11, 600, 0.14, true), { color: c }]}>
          {l}
        </Txt>
      </View>
      {why ? (
        <Txt numberOfLines={1} style={[type(11, 400), { color: C.muted }]}>
          {why}
        </Txt>
      ) : null}
    </View>
  );
}

/** Etiqueta com fundo (o "pill" do desenho). */
export function Tag({ l, c, bg }: { l: string; c: string; bg: string }) {
  return (
    <View style={{ alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, backgroundColor: bg }}>
      <Txt numberOfLines={1} style={[type(10, 600, 0.12, true), { color: c }]}>
        {l}
      </Txt>
    </View>
  );
}

export const Muted = ({ children, size = 13 }: { children: React.ReactNode; size?: number }) => <Txt style={[type(size, 400), { color: C.muted }]}>{children}</Txt>;
export const Strong = ({ children, size = 14, c }: { children: React.ReactNode; size?: number; c?: string }) => <Txt style={[type(size, 500), { color: c ?? C.ink }]}>{children}</Txt>;

/**
 * Grelha que se adapta: tantas colunas quantas couberem com pelo menos `min` px cada
 * (no máximo `max`), todas com a mesma largura. Mede a própria largura.
 */
export function Wrap({ children, min = 260, max, gap = 16, style }: { children: React.ReactNode; min?: number; max?: number; gap?: number; style?: StyleProp<ViewStyle> }) {
  const kids = React.Children.toArray(children);
  const est = useInner();
  const [w, setW] = useState(0);
  const avail = w || est;
  const cols = Math.max(1, Math.min(max ?? kids.length, kids.length, Math.floor((avail + gap) / (min + gap))));
  const cw = Math.floor((avail - (cols - 1) * gap) / cols);
  return (
    <View onLayout={(e) => setW(Math.round(e.nativeEvent.layout.width))} style={[{ flexDirection: 'row', flexWrap: 'wrap', gap }, style]}>
      {kids.map((k, i) => (
        <View key={(k as React.ReactElement).key ?? i} style={{ width: cw, minWidth: 0 }}>
          {k}
        </View>
      ))}
    </View>
  );
}
