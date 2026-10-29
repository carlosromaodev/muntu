import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { pendingCount, useMuntu } from '../../store';
import { FIL, FUGAS, LINES, OCC, type FilialKey } from '../../data/sample';
import { kn, kz } from '../../lib/format';
import { useNotify } from '../../shell/notify';
import { Btn, Cell, Cols, ListRow, Page, PageHeader, Section, StatBand, Status, T, Table } from '../../ui';

/** D6 · Painel do dono. */
export function Painel() {
  const { c } = useTheme();
  const notify = useNotify();
  const filial = useMuntu((s) => s.filial);
  const pend = useMuntu(pendingCount);
  const approvals = useMuntu((s) => s.approvals);
  const decide = useMuntu((s) => s.decide);
  const all = filial === 'todas';
  const fk = filial as FilialKey;
  const sel = all ? Object.values(FIL).reduce((a, f) => ({ e: a.e + f.e, r: a.r + f.r }), { e: 0, r: 0 }) : FIL[fk];
  const lines = LINES.filter((l) => all || l.f === fk);
  const fugas = FUGAS.filter((l) => all || l.f === fk);
  const mx = Math.max(...OCC);

  return (
    <Page>
      <PageHeader eyebrow={`${all ? 'Todas as filiais' : FIL[fk].n} · Outubro 2026`} title="Painel do dono" />
      <StatBand
        hero={{ label: 'Kz · Diferença', value: kn(sel.e - sel.r) }}
        stats={[
          { value: kn(sel.e), label: 'Kz · Esperada' },
          { value: kn(sel.r), label: 'Kz · Recebida' },
          { value: '1 180 000', label: 'Kz · Recuperado após SMS' },
        ]}
      />
      <Section title={`Aprovações · ${pend} pendentes`} style={{ borderBottomWidth: 1, borderColor: c.line }}>
        <View>
          {approvals.map((a) => (
            <ListRow key={a.id} style={{ gap: 16, paddingVertical: 16 }}>
              <View style={{ flex: 1, gap: 4, minWidth: 0 }}>
                <T v="eyebrow">{a.k}</T>
                <T size={14}>{a.t}</T>
              </View>
              <T v="bodyStrong" size={16} style={{ flexShrink: 0 }}>{kz(a.v)}</T>
              {a.status ? (
                <Status s={a.status} />
              ) : (
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <Btn kind="outline" size="sm" label="Recusar" haptic="error" onPress={() => { decide(a.id, 'recusado'); notify('Pedido recusado. A recepção foi avisada.', 'bad'); }} />
                  <Btn size="sm" label="Aprovar" haptic="success" onPress={() => { decide(a.id, 'aprovado'); notify('Aprovado. Registado na trilha de auditoria.', 'ok'); }} />
                </View>
              )}
            </ListRow>
          ))}
        </View>
      </Section>
      <Cols cols={{ compact: 1, medium: 2, wide: 2 }}>
        <Section title="A diferença, linha a linha">
          <Table
            rows={lines}
            rowKey={(l) => l.t}
            empty="Sem diferenças nesta filial."
            hideHeader
            cols={[
              { key: 't', label: 'Origem', flex: 1, render: (l) => <T size={14}>{l.t}</T> },
              { key: 'f', label: 'Filial', w: 72, render: (l) => <T v="label" size={10} color={c.muted}>{FIL[l.f].n}</T> },
              { key: 'v', label: 'Valor', w: 110, align: 'right', render: (l) => <Cell strong right>{kz(l.v)}</Cell> },
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
          <View accessibilityRole="image" accessibilityLabel="Pico de ocupação às 19h" style={{ height: 200, flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
            {OCC.map((v, i) => (
              <View key={i} style={{ flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
                <View style={{ width: '100%', height: `${Math.round((v / mx) * 88)}%` as any, backgroundColor: v === mx ? c.brand : c.ink }} />
                <T size={10} color={c.muted} style={{ height: 12, lineHeight: 12 }}>{i % 2 === 0 ? String(6 + i).padStart(2, '0') : ''}</T>
              </View>
            ))}
          </View>
        </Section>
        <Section title="Comparativo de filiais">
          <Table
            rows={Object.entries(FIL) as [FilialKey, (typeof FIL)[FilialKey]][]}
            rowKey={([k]) => k}
            selected={all ? null : fk}
            cols={[
              { key: 'n', label: 'Filial', flex: 1, render: ([k, f]) => <Cell strong={!all && k === fk}>{f.n}</Cell> },
              { key: 'r', label: 'Recebido', flex: 1.3, align: 'right', render: ([, f]) => <Cell right>{kz(f.r)}</Cell> },
              { key: 'a', label: 'Activos', w: 60, align: 'right', render: ([, f]) => <Cell right>{f.a}</Cell> },
              { key: 'ch', label: 'Churn', w: 56, align: 'right', render: ([, f]) => <Cell right>{f.ch}</Cell> },
              { key: 'o', label: 'Ocup.', w: 72, align: 'right', render: ([, f]) => <Cell right>{f.o}</Cell> },
            ]}
          />
        </Section>
      </Cols>
    </Page>
  );
}
