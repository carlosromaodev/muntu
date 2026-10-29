import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { FIL, FUGAS, type FilialKey } from '../../data/sample';
import { kn } from '../../lib/format';
import { Logo, T } from '../../ui';
import { FilialPicker } from '../FilialPicker';
import { Big, MRow, MScreen, MSection, MTitle, PAD, StatLabel } from '../parts';

/** O1 · Dono · Painel — receita esperada, recebida, diferença e fugas. */
export function DonoPainel() {
  const { c } = useTheme();
  const filial = useMuntu((s) => s.filial);
  const all = filial === 'todas';
  const fk = filial as FilialKey;
  const sel = all ? Object.values(FIL).reduce((a, f) => ({ e: a.e + f.e, r: a.r + f.r }), { e: 0, r: 0 }) : FIL[fk];
  const fugas = FUGAS.filter((f) => all || f.f === fk);

  return (
    <MScreen>
      <View style={{ paddingTop: 12, paddingHorizontal: PAD, paddingBottom: 24, gap: 18, borderBottomWidth: 1, borderColor: c.line }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size={20} color={c.ink} />
          <FilialPicker />
        </View>
        <MTitle>Outubro</MTitle>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: c.surface }}>
        <View style={{ width: '50%', paddingVertical: 18, paddingHorizontal: PAD, gap: 6 }}>
          <Big size={22}>{kn(sel.e, 0)}</Big>
          <StatLabel>Kz · Esperada</StatLabel>
        </View>
        <View style={{ width: '50%', paddingVertical: 18, paddingHorizontal: PAD, gap: 6, borderLeftWidth: 1, borderColor: c.line2 }}>
          <Big size={22}>{kn(sel.r, 0)}</Big>
          <StatLabel>Kz · Recebida</StatLabel>
        </View>
        <View style={{ width: '100%', backgroundColor: c.brand, paddingVertical: 20, paddingHorizontal: PAD, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <StatLabel color="#1D1C1A">Kz · Diferença</StatLabel>
          <View style={{ flexShrink: 1 }}>
            <Big size={34} color="#1D1C1A" right>{kn(sel.e - sel.r)}</Big>
          </View>
        </View>
      </View>
      <View style={{ padding: PAD }}>
        <MSection dot={c.bad} style={{ paddingBottom: 10 }}>Fugas detectadas</MSection>
        {fugas.map((f) => (
          <MRow key={f.t} style={{ flexDirection: 'column', gap: 3 }}>
            <T size={14}>{f.t}</T>
            <T size={12} color={c.muted}>{FIL[f.f].n} · {f.h}</T>
          </MRow>
        ))}
        {!fugas.length ? (
          <MRow>
            <T size={14} color={c.muted}>Sem fugas nesta filial.</T>
          </MRow>
        ) : null}
      </View>
    </MScreen>
  );
}
