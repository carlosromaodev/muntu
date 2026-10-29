import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { pendingCount, useMuntu } from '../../store';
import { FIL, FUGAS, LINES, OCC, type FilialKey } from '../../data/sample';
import { kn, kz } from '../../lib/format';
import { useNav } from '../../shell/nav';
import { Btn, Cell, Cols, ListRow, Page, PageHeader, Section, StatBand, T, Table } from '../../ui';

export function Painel() {
  const { c, g, compact } = useTheme();
  const { go, bottomInset } = useNav();
  const filial = useMuntu((s) => s.filial);
  const pend = useMuntu(pendingCount);
  const approvals = useMuntu((s) => s.approvals).filter((a) => !a.status);
  const all = filial === 'todas';
  const fk = filial as FilialKey;
  const sel = all ? Object.values(FIL).reduce((a, f) => ({ e: a.e + f.e, r: a.r + f.r }), { e: 0, r: 0 }) : FIL[fk];
  const lines = LINES.filter((l) => all || l.f === fk);
  const fugas = FUGAS.filter((l) => all || l.f === fk);
  const mx = Math.max(...OCC);

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader eyebrow={`${all ? 'Todas as filiais' : FIL[fk].n} · Outubro 2026`} title="Painel do dono" actions={<Btn kind="outline" label="Membros em risco" onPress={() => go('retencao')} />} />
      <StatBand
        hero={{ label: 'Kz · Diferença', value: kn(sel.e - sel.r), sub: 'Entre o esperado e o recebido este mês' }}
        stats={[
          { value: kn(sel.e, 0), label: 'Kz · Esperada' },
          { value: kn(sel.r, 0), label: 'Kz · Recebida' },
          { value: '1 180 000', label: 'Kz · Recuperado após SMS' },
        ]}
      />
      <Section title={`Aprovações · ${pend} pendentes`} right={<Btn kind="outline" size="sm" label="Abrir aprovações" onPress={() => go('aprovacoes')} />} style={{ borderBottomWidth: 1, borderColor: c.line }}>
        <View>
          {approvals.slice(0, 3).map((a) => (
            <ListRow key={a.id}>
              <View style={{ flex: 1, gap: 4, minWidth: 0 }}>
                <T v="eyebrow">{a.k}</T>
                <T size={14} numberOfLines={compact ? 2 : 1}>{a.t}</T>
              </View>
              <T v="bodyStrong" size={16} style={{ flexShrink: 0 }}>{kz(a.v)}</T>
            </ListRow>
          ))}
          {!approvals.length ? <ListRow><T v="small" size={14}>Sem pedidos à espera. Tudo aprovado.</T></ListRow> : null}
        </View>
      </Section>
      <Cols cols={{ compact: 1, medium: 2, wide: 2 }}>
        <Section title="A diferença, linha a linha">
          <Table
            rows={lines}
            rowKey={(l) => l.t}
            empty="Sem diferenças nesta filial."
            cols={[
              { key: 't', label: 'Origem', flex: 1, render: (l) => <T size={14}>{l.t}</T>, compact: 'primary' },
              { key: 'f', label: 'Filial', w: 80, render: (l) => <T v="eyebrow">{FIL[l.f].n}</T>, compact: 'secondary', text: (l) => FIL[l.f].n },
              { key: 'v', label: 'Valor', w: 120, align: 'right', render: (l) => <Cell strong right>{kz(l.v)}</Cell>, compact: 'end' },
            ]}
          />
        </Section>
        <Section title="Fugas detectadas" dot={c.bad}>
          <View>
            {fugas.map((l) => (
              <ListRow key={l.t} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
                <T size={14}>{l.t}</T>
                <T v="small">{FIL[l.f].n} · {l.h}</T>
              </ListRow>
            ))}
            {!fugas.length ? <ListRow><T v="small" size={14}>Sem fugas nesta filial.</T></ListRow> : null}
          </View>
        </Section>
        <Section title="Ocupação por hora">
          <View accessibilityRole="image" accessibilityLabel="Ocupação por hora, pico às 19h" style={{ height: compact ? 160 : 200, flexDirection: 'row', alignItems: 'flex-end', gap: compact ? 3 : 4 }}>
            {OCC.map((v, i) => (
              <View key={i} style={{ flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
                <View style={{ width: '100%', height: `${Math.round((v / mx) * 82)}%` as any, backgroundColor: v === mx ? c.brand : c.ink }} />
                <T size={10} color={c.muted} style={{ height: 12 }}>{i % 2 === 0 ? String(6 + i).padStart(2, '0') : ''}</T>
              </View>
            ))}
          </View>
          <T v="small">Pico às 19:00 · 92% da capacidade em Talatona.</T>
        </Section>
        <Section title="Comparativo de filiais">
          <Table
            rows={Object.entries(FIL) as [FilialKey, (typeof FIL)[FilialKey]][]}
            rowKey={([k]) => k}
            selected={all ? null : fk}
            cols={[
              { key: 'n', label: 'Filial', flex: 1, render: ([k, f]) => <Cell strong={!all && k === fk}>{f.n}</Cell>, compact: 'primary' },
              { key: 'r', label: 'Recebido', flex: 1.3, align: 'right', render: ([, f]) => <Cell right>{kz(f.r)}</Cell>, compact: 'end' },
              { key: 'a', label: 'Activos', w: 64, align: 'right', render: ([, f]) => <Cell right>{f.a}</Cell>, compact: 'secondary', text: ([, f]) => f.a + ' activos' },
              { key: 'ch', label: 'Churn', w: 56, align: 'right', render: ([, f]) => <Cell right>{f.ch}</Cell>, compact: 'secondary', text: ([, f]) => 'churn ' + f.ch },
              { key: 'o', label: 'Ocup.', w: 56, align: 'right', render: ([, f]) => <Cell right>{f.o}</Cell>, compact: 'secondary', text: ([, f]) => 'ocupação ' + f.o },
            ]}
          />
        </Section>
      </Cols>
      <View style={{ paddingHorizontal: g }} />
    </Page>
  );
}
