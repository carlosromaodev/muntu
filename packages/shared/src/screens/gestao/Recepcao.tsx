import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { CHECKINS, DIVIDA, VENCER, type StatusKey } from '../../data/sample';
import { kn, kz, nowHM } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Btn, Cell, Dot, ListRow, Page, PageHeader, Section, Split, StatBand, Status, T, Table } from '../../ui';

export function Recepcao() {
  const { c, g, compact } = useTheme();
  const { go, bottomInset } = useNav();
  const notify = useNotify();
  const caixa = useMuntu((s) => s.caixaAberto);
  const setCaixa = useMuntu((s) => s.setCaixa);
  const smsDone = useMuntu((s) => s.smsDone);
  const markSms = useMuntu((s) => s.markSms);

  const sms = (n: string) => {
    markSms(n, nowHM());
    notify(`SMS enviado a ${n.split(' ')[0]}`, 'ok');
  };

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader
        eyebrow="Quinta, 29 Outubro · Turno da manhã · Talatona"
        title="Recepção"
        actions={
          <>
            <Btn kind="outline" label="Check-in manual" onPress={() => go('membro', { estado: 'normal' })} />
            <Btn label="Nova inscrição" haptic="press" onPress={() => go('inscricao')} />
          </>
        }
      />
      <StatBand
        hero={
          caixa
            ? { label: 'Kz · Em caixa desde 07:00', value: kn(184500), action: <Btn kind="outline" size="sm" label="Fechar caixa" onPress={() => go('caixa')} style={{ borderColor: '#1D1C1A' }} /> }
            : {
                label: 'Caixa fechado',
                value: '—',
                action: (
                  <Btn
                    kind="onBrand"
                    size="sm"
                    haptic="press"
                    label="Abrir caixa"
                    onPress={() => {
                      setCaixa(true);
                      notify('Caixa aberto com 20 000,00 Kz', 'ok');
                    }}
                  />
                ),
              }
        }
        stats={[
          { value: '42', label: 'Check-ins hoje' },
          { value: '18', label: 'Dentro agora' },
          { value: '02', label: 'Em dívida' },
          { value: '03', label: 'A vencer' },
        ]}
      />
      <Pressable
        accessibilityRole="button"
        onPress={() => { haptic('tap'); go('avisos'); }}
        style={(st: any) => ({ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14, paddingHorizontal: g, borderBottomWidth: 1, borderColor: c.line, backgroundColor: st.hovered ? c.surface2 : 'transparent' })}
      >
        <Dot color={c.brand} square />
        {!compact ? <T v="label" size={10}>Avisos automáticos</T> : null}
        <T size={14} color={c.ink2} numberOfLines={compact ? 2 : 1} style={{ flex: 1 }}>
          Hoje às 10:00 seguem 24 SMS de vencimento. 3 avisos de dívida entregues às 08:00.
        </T>
        <T v="label" size={10}>{compact ? '→' : 'Ver avisos →'}</T>
      </Pressable>
      <Split ratio={[1.6, 1]}>
        <Section title="Check-ins recentes">
          <Table
            rows={CHECKINS}
            rowKey={(r) => r.h + r.n}
            onRowPress={(r) => go('membro', { estado: r.s === 'bloq' ? 'divida' : r.s === 'rede' ? 'rede' : 'normal', nome: r.n })}
            cols={[
              { key: 'h', label: 'Hora', w: 52, render: (r) => <Cell muted>{r.h}</Cell>, compact: 'secondary', text: (r) => r.h },
              { key: 'n', label: 'Membro', flex: 1.3, render: (r) => <Cell strong>{r.n}</Cell>, compact: 'primary' },
              { key: 'p', label: 'Plano', render: (r) => <Cell muted>{r.p}</Cell>, compact: 'secondary', text: (r) => r.p },
              { key: 'f', label: 'Filial', flex: 0.9, render: (r) => <Cell muted>{r.f}</Cell>, compact: 'hidden' },
              { key: 's', label: 'Estado', w: 170, render: (r) => <Status s={r.s as StatusKey} sub={r.why || undefined} />, compact: 'end' },
            ]}
          />
        </Section>
        <View>
          <Section title="Em dívida" dot={c.bad} style={{ borderBottomWidth: 1, borderColor: c.line }}>
            <View>
              {DIVIDA.map((r) => (
                <ListRow key={r.n}>
                  <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
                    <T v="bodyStrong">{r.n}</T>
                    <T v="small">{r.d} · {kz(r.v)}</T>
                    {smsDone[r.n] ? <T v="small" size={11} color={c.ok}>SMS entregue às {smsDone[r.n]}</T> : null}
                  </View>
                  <Btn kind="outline" size="sm" label="SMS" disabled={!!smsDone[r.n]} onPress={() => sms(r.n)} />
                  <Btn size="sm" label="Cobrar" haptic="press" onPress={() => go('membro', { estado: 'divida', nome: r.n })} />
                </ListRow>
              ))}
            </View>
          </Section>
          <Section title="A vencer" dot={c.warnDot}>
            <View>
              {VENCER.map((r) => (
                <ListRow key={r.n}>
                  <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
                    <T v="bodyStrong">{r.n}</T>
                    <T v="small">{r.d} · {kz(r.v)}</T>
                    {smsDone[r.n] ? <T v="small" size={11} color={c.ok}>Lembrete entregue às {smsDone[r.n]}</T> : null}
                  </View>
                  <Btn kind="outline" size="sm" label="Lembrar" disabled={!!smsDone[r.n]} onPress={() => sms(r.n)} />
                </ListRow>
              ))}
            </View>
          </Section>
        </View>
      </Split>
    </Page>
  );
}
