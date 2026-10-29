import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { toneColor, useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { GYM, LEDGER, ST, type LedgerRow } from '../../data/sample';
import { kn, kzSigned } from '../../lib/format';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/notify';
import { Area, Btn, Cell, Chips, KV, Note, Page, PageHeader, Section, Sheet, StatBand, Status, T, Table } from '../../ui';

const MEIOS = ['Todos', 'Dinheiro', 'Multicaixa Express', 'TPA', 'Transferência'] as const;

export function Tesouraria() {
  const { c, g, bp, compact } = useTheme();
  const [meio, setMeio] = useState<(typeof MEIOS)[number]>('Todos');
  const [sel, setSel] = useState<number | null>(null);
  const rows = LEDGER.filter((r) => meio === 'Todos' || r.m === meio);
  const selR = LEDGER.find((r) => r.id === sel) ?? null;

  const table = (
    <Section>
      <Table
        rows={rows}
        rowKey={(r) => r.id}
        selected={sel}
        onRowPress={(r) => setSel(r.id)}
        empty="Sem movimentos com este meio hoje."
        minWidth={bp === 'medium' ? 640 : undefined}
        cols={[
          { key: 'h', label: 'Hora', w: 48, render: (r) => <Cell muted>{r.h}</Cell>, compact: 'secondary', text: (r) => r.h },
          { key: 'd', label: 'Movimento', flex: 1.3, render: (r) => <Cell>{r.d}</Cell>, compact: 'primary' },
          { key: 'o', label: 'Origem', flex: 1.2, render: (r) => <Cell color={c.brandDeep}>{r.o}</Cell>, compact: 'secondary', text: (r) => r.o },
          { key: 'm', label: 'Meio', flex: 0.8, render: (r) => <Cell muted>{r.m}</Cell>, compact: 'hidden' },
          { key: 'v', label: 'Valor', w: 130, align: 'right', render: (r) => <Cell strong right>{kzSigned(r.v)}</Cell>, compact: 'end' },
          { key: 's', label: 'Estado', w: 150, render: (r) => <Status s={r.st} />, compact: 'end' },
        ]}
      />
    </Section>
  );

  return (
    <Page>
      <PageHeader
        eyebrow="Livro razão · nada se apaga"
        title="Tesouraria"
        actions={
          compact ? undefined : <Chips options={MEIOS} value={meio} onChange={(v) => { setMeio(v); setSel(null); }} label="Filtrar por meio" />
        }
      />
      {compact ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: g, paddingBottom: 20 }}>
          <Chips options={MEIOS} value={meio} onChange={(v) => { setMeio(v); setSel(null); }} label="Filtrar por meio" scroll />
        </ScrollView>
      ) : null}
      <StatBand
        hero={{ label: 'Kz · Saldo do dia', value: kn(124000) }}
        stats={[
          { value: kn(166500), label: 'Kz · Entradas' },
          { value: kn(42500), label: 'Kz · Saídas' },
          { value: '08', label: 'Movimentos' },
        ]}
      />
      {bp === 'wide' ? (
        <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
          <View style={{ flex: 1, minWidth: 0 }}>{table}</View>
          {selR ? (
            <View style={{ width: 340, borderLeftWidth: 1, borderColor: c.line, padding: 32, gap: 16 }}>
              <Detail r={selR} onClose={() => setSel(null)} inline />
            </View>
          ) : null}
        </View>
      ) : (
        <>
          {table}
          <Sheet visible={!!selR} onClose={() => setSel(null)} eyebrow={selR ? `Movimento · ${selR.h}` : ''} title={selR?.d}>
            {selR ? <Detail r={selR} onClose={() => setSel(null)} /> : null}
          </Sheet>
        </>
      )}
    </Page>
  );
}

function Detail({ r, onClose, inline }: { r: LedgerRow; onClose: () => void; inline?: boolean }) {
  const { c } = useTheme();
  const notify = useNotify();
  const addApproval = useMuntu((s) => s.addApproval);
  const [est, setEst] = useState<'none' | 'form' | 'sent'>('none');
  const [motivo, setMotivo] = useState('');
  const tone = toneColor(c, ST[r.st].tone);
  const canEst = r.st === 'ok' && r.v > 0;
  return (
    <View style={{ gap: 16 }}>
      {inline ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <T v="eyebrow">Movimento · {r.h}</T>
          <Btn kind="ghost" size="sm" label="Fechar ✕" onPress={onClose} />
        </View>
      ) : null}
      <T v="num" size={36}>{kzSigned(r.v)}</T>
      {inline ? <T v="bodyStrong" size={15}>{r.d}</T> : null}
      <KV items={[['Origem', r.o], ['Meio', r.m], ['Operador', GYM.operador], ['Factura AGT', r.fac]]} />
      {r.note ? <Note bg={tone.bg} color={tone.fg}>{r.note}</Note> : null}
      {canEst && est === 'none' ? <Btn kind="danger" full label="Estornar" onPress={() => setEst('form')} /> : null}
      {canEst && est === 'form' ? (
        <View style={{ gap: 10 }}>
          <Area label="Motivo · obrigatório" value={motivo} onChangeText={setMotivo} placeholder="Ex.: cobrança duplicada no TPA" />
          <Btn
            full
            label="Pedir aprovação"
            haptic="warning"
            disabled={!motivo.trim()}
            onPress={() => {
              addApproval({ id: 'est-' + r.id, kind: 'estorno', k: `Estorno · Talatona · ${r.h}`, t: `${r.d} · ${r.o.split(' · ')[0]} · ${motivo.trim()}`, v: -r.v });
              setEst('sent');
              notify('Pedido de estorno enviado ao dono', 'warn');
            }}
          />
          <T v="small">O original fica no livro razão. O estorno entra como novo movimento depois de aprovado.</T>
        </View>
      ) : null}
      {est === 'sent' ? <Note bg={c.warnBg} color={c.warn}>Pedido enviado ao dono por SMS. A aguardar aprovação com biometria.</Note> : null}
    </View>
  );
}
