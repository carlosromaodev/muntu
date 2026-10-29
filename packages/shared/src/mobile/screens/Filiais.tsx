import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { FIL, type FilialKey } from '../../data/sample';
import { kn } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { T, em } from '../../ui';
import { Big, MHeader, MScreen, PAD, StatLabel } from '../parts';

/** Dono · Filiais — comparativo por unidade; tocar abre o painel dessa filial. */
export function Filiais() {
  const { c } = useTheme();
  const { go } = useNav();
  const filial = useMuntu((s) => s.filial);
  const setFilial = useMuntu((s) => s.setFilial);
  const entries = Object.entries(FIL) as [FilialKey, (typeof FIL)[FilialKey]][];
  const total = entries.reduce((a, [, f]) => a + f.a, 0);

  return (
    <MScreen>
      <MHeader eyebrow={`Rede Mwangolé Fit · ${total} activos`} title="Filiais" />
      {entries.map(([k, f]) => {
        const pct = Math.round((f.r / f.e) * 100);
        const on = filial === k;
        return (
          <Pressable
            key={k}
            accessibilityRole="button"
            accessibilityHint="Ver o painel desta filial"
            onPress={() => {
              haptic('select');
              setFilial(k);
              go('dono');
            }}
            style={{ borderBottomWidth: 1, borderColor: c.line }}
          >
            <View style={{ paddingHorizontal: PAD, paddingTop: 20, paddingBottom: 16, gap: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <View style={{ gap: 6 }}>
                <T size={10} w={600} color={c.muted} style={{ letterSpacing: em(10, 0.22), textTransform: 'uppercase' }}>
                  {on ? 'A ver no painel' : `${f.a} activos`}
                </T>
                <T size={20} w={400} style={{ letterSpacing: em(20, 0.14), textTransform: 'uppercase' }}>{f.n}</T>
              </View>
              <T size={10} w={600} style={{ letterSpacing: em(10, 0.18), textTransform: 'uppercase' }}>Painel →</T>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: c.surface }}>
              <View style={{ flex: 1.4, paddingVertical: 16, paddingLeft: PAD, paddingRight: 12, gap: 6 }}>
                <Big size={20}>{kn(f.r, 0)}</Big>
                <StatLabel>Kz · {pct}% do esperado</StatLabel>
              </View>
              <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 12, gap: 6, borderLeftWidth: 1, borderColor: c.line2 }}>
                <Big size={20}>{f.ch}</Big>
                <StatLabel>Churn</StatLabel>
              </View>
              <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 12, gap: 6, borderLeftWidth: 1, borderColor: c.line2 }}>
                <Big size={20}>{f.o}</Big>
                <StatLabel>Ocupação</StatLabel>
              </View>
            </View>
            <View style={{ height: 4, backgroundColor: c.line }}>
              <View style={{ width: `${pct}%` as any, height: 4, backgroundColor: on ? c.brand : c.ink }} />
            </View>
          </Pressable>
        );
      })}
    </MScreen>
  );
}
