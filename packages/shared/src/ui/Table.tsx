import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTheme } from '../theme';
import { haptic } from '../lib/haptics';
import { T } from './T';

export type Col<R> = {
  key: string;
  label: string;
  /** Proporção da coluna (grid). */
  flex?: number;
  /** Largura fixa em px. */
  w?: number;
  align?: 'left' | 'right';
  render: (r: R) => React.ReactNode;
  /**
   * Papel no telemóvel, onde a linha vira um cartão:
   * primary = linha principal; secondary = juntam-se por baixo em texto pequeno;
   * end = à direita; hidden = não aparece.
   */
  compact?: 'primary' | 'secondary' | 'end' | 'hidden';
  /** Texto simples para o modo compacto (quando render devolve um nó). */
  text?: (r: R) => string;
};

type Props<R> = {
  cols: Col<R>[];
  rows: R[];
  rowKey: (r: R) => string | number;
  onRowPress?: (r: R) => void;
  selected?: string | number | null;
  empty?: string;
  /** Largura mínima no desktop/tablet antes de fazer scroll horizontal. */
  minWidth?: number;
};

/**
 * Tabela completa no desktop (todas as colunas) e cartões empilhados no telemóvel.
 */
export function Table<R>({ cols, rows, rowKey, onRowPress, selected, empty = 'Sem resultados.', minWidth }: Props<R>) {
  const { c, compact } = useTheme();

  if (!rows.length)
    return (
      <View style={{ paddingVertical: 24, borderTopWidth: 1, borderColor: c.line }}>
        <T v="small" size={14}>
          {empty}
        </T>
      </View>
    );

  if (compact) {
    const primary = cols.filter((k) => k.compact === 'primary');
    const secondary = cols.filter((k) => k.compact === 'secondary');
    const end = cols.filter((k) => k.compact === 'end');
    return (
      <View>
        {rows.map((r) => {
          const key = rowKey(r);
          const sel = selected === key;
          const body = (
            <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 14, alignItems: 'center' }}>
              <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
                {primary.map((k) => (
                  <View key={k.key}>{k.render(r)}</View>
                ))}
                {secondary.length ? (
                  <T v="small" numberOfLines={2}>
                    {secondary.map((k) => (k.text ? k.text(r) : String(k.render(r) ?? ''))).filter(Boolean).join(' · ')}
                  </T>
                ) : null}
              </View>
              {end.length ? <View style={{ alignItems: 'flex-end', gap: 4, flexShrink: 0, maxWidth: '50%' }}>{end.map((k) => <View key={k.key}>{k.render(r)}</View>)}</View> : null}
            </View>
          );
          return onRowPress ? (
            <Pressable
              key={key}
              accessibilityRole="button"
              onPress={() => {
                haptic('tap');
                onRowPress(r);
              }}
              style={(st: any) => ({ borderTopWidth: 1, borderColor: c.line, backgroundColor: sel ? c.surface : st.pressed ? c.surface2 : 'transparent' })}
            >
              {body}
            </Pressable>
          ) : (
            <View key={key} style={{ borderTopWidth: 1, borderColor: c.line }}>
              {body}
            </View>
          );
        })}
      </View>
    );
  }

  const cell = (k: Col<R>) => ({ flex: k.w ? undefined : (k.flex ?? 1), width: k.w, minWidth: 0, alignItems: k.align === 'right' ? ('flex-end' as const) : ('flex-start' as const) });

  const grid = (
    <View style={{ minWidth }}>
      <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 10 }}>
        {cols.map((k) => (
          <View key={k.key} style={cell(k)}>
            <T v="eyebrow" numberOfLines={1}>
              {k.label}
            </T>
          </View>
        ))}
      </View>
      {rows.map((r) => {
        const key = rowKey(r);
        const sel = selected === key;
        const inner = cols.map((k) => (
          <View key={k.key} style={cell(k)}>
            {k.render(r)}
          </View>
        ));
        return onRowPress ? (
          <Pressable
            key={key}
            accessibilityRole="button"
            onPress={() => {
              haptic('tap');
              onRowPress(r);
            }}
            style={(st: any) => ({
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              paddingVertical: 14,
              borderTopWidth: 1,
              borderColor: c.line,
              backgroundColor: sel ? c.surface : st.hovered ? c.surface2 : 'transparent',
            })}
          >
            {inner}
          </Pressable>
        ) : (
          <View key={key} style={{ flexDirection: 'row', gap: 16, alignItems: 'center', paddingVertical: 14, borderTopWidth: 1, borderColor: c.line }}>
            {inner}
          </View>
        );
      })}
    </View>
  );

  return minWidth ? (
    <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>{grid}</View>
    </ScrollView>
  ) : (
    grid
  );
}

/** Texto de célula: corta com reticências. */
export function Cell({ children, strong, muted, right, color }: { children: React.ReactNode; strong?: boolean; muted?: boolean; right?: boolean; color?: string }) {
  const { c } = useTheme();
  return (
    <T v={strong ? 'bodyStrong' : 'body'} color={color ?? (muted ? c.ink2 : c.ink)} numberOfLines={1} right={right} style={{ maxWidth: '100%' }}>
      {children}
    </T>
  );
}
