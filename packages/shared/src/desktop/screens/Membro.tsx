import React, { useState } from 'react';
import { View } from 'react-native';
import { toneColor, useTheme } from '../../theme';
import { RULES, ST, type StatusKey } from '../../data/sample';
import { fill, kz } from '../../lib/format';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/notify';
import { Area, Banner, Btn, Cell, Chips, ListRow, Note, Page, PageHeader, Section, Segmented, StatBand, Status, T, Table, Tag } from '../../ui';

type MState = 'normal' | 'divida' | 'congelado' | 'rede';

const MS: Record<MState, { s: StatusKey; banner: string; dias: string; diasLabel: string; plano: string; prox: string; ent: string }> = {
  normal: { s: 'pago', banner: '', dias: '18', diasLabel: 'Dias restantes', plano: 'Rede · Mensal', prox: '13/11', ent: '09' },
  divida: { s: 'divida', banner: 'Mensalidade de Outubro por pagar há 12 dias. Acesso bloqueado até pagar. 4 avisos SMS entregues.', dias: '00', diasLabel: 'Dias restantes', plano: 'Rede · Mensal', prox: 'Em atraso', ent: '02' },
  congelado: { s: 'congelado', banner: 'Plano congelado até 10/11/2026 a pedido do membro. Aviso de reactivação agendado.', dias: '15', diasLabel: 'Dias em pausa', plano: 'Rede · Mensal', prox: '10/11', ent: '00' },
  rede: { s: 'rede', banner: 'Membro do Kianda Fitness. Acesso válido pela Rede MUNTU: 3 de 6 visitas este mês.', dias: '03', diasLabel: 'Visitas restantes', plano: 'Rede · Kianda', prox: '—', ent: '03' },
};

const AVISOS: Record<MState, [string, string, string, StatusKey][]> = {
  normal: [['13/10 · 07:51', 'Pagamento confirmado', 'SMS', 'entregue'], ['10/10 · 10:00', 'Vence em 3 dias', 'SMS', 'entregue']],
  divida: [['08/10 · 10:00', 'Acesso bloqueado', 'SMS', 'entregue'], ['04/10 · 10:00', 'Em atraso', 'SMS', 'entregue'], ['01/10 · 08:00', 'Vence hoje', 'SMS', 'entregue'], ['28/09 · 10:00', 'Vence em 3 dias', 'SMS', 'entregue']],
  congelado: [['09/11 · 09:00', 'Fim de congelamento', 'SMS', 'agendado'], ['26/09 · 11:20', 'Plano congelado', 'SMS', 'entregue']],
  rede: [],
};

export function Membro() {
  const { c, g, compact, bp } = useTheme();
  const { params, go } = useNav();
  const notify = useNotify();
  const initial = (params.estado as MState) || 'divida';
  const [st, setSt] = useState<MState>(MS[initial] ? initial : 'divida');
  const [composer, setComposer] = useState(false);
  const [tpl, setTpl] = useState<'Lembrete' | 'Referência' | 'Livre'>('Lembrete');
  const [text, setText] = useState<string | null>(null);
  const [sentSms, setSentSms] = useState<{ d: string; n: string; ch: string; s: StatusKey }[]>([]);
  const nome = params.nome && params.nome !== 'Délcio Ngola' ? params.nome : 'Délcio Ngola';
  const m = MS[st];
  const tone = toneColor(c, ST[m.s].tone);

  const MV = { nome: nome.split(' ')[0]!, valor: '45 000 Kz', data: '01/10', referencia: '00512 884 117', ginasio: 'Mwangolé Fit' };
  const TPLS = { Lembrete: RULES[3]!.tpl, Referência: '{ginasio}: {nome}, paga {valor} com a referência {referencia} no Multicaixa Express ou ATM.', Livre: '' };
  const msg = text ?? fill(TPLS[tpl], MV);
  const parts = Math.max(1, Math.ceil(msg.length / 160));

  const cobrar = () => go('inscricao');
  const actions: { l: string; primary?: boolean; on?: () => void }[] = {
    normal: [{ l: 'Check-in', primary: true, on: () => notify(`Check-in de ${nome.split(' ')[0]} registado`, 'ok') }, { l: 'Cobrar', on: cobrar }, { l: 'Renovar', on: cobrar }, { l: 'Congelar', on: () => setSt('congelado') }],
    divida: [{ l: 'Cobrar 45 000,00 Kz', primary: true, on: cobrar }, { l: 'Renovar', on: cobrar }, { l: 'Pedir excepção', on: () => notify('Pedido de excepção enviado ao dono', 'warn') }],
    congelado: [{ l: 'Descongelar', primary: true, on: () => { setSt('normal'); notify('Plano reactivado', 'ok'); } }, { l: 'Cobrar', on: cobrar }, { l: 'Renovar', on: cobrar }],
    rede: [{ l: 'Libertar acesso', primary: true, on: () => notify('Acesso libertado · visita 4 de 6', 'ok') }, { l: 'Ver auditoria' }],
  }[st];

  const pays = [
    { d: '01/10', desc: 'Mensalidade Outubro', m: 'Express', f: 'FR TAL/2026/1184', v: 45000, s: (st === 'divida' ? 'divida' : 'pago') as StatusKey },
    { d: '01/09', desc: 'Mensalidade Setembro', m: 'Express', f: 'FR TAL/2026/0977', v: 45000, s: 'pago' as StatusKey },
    { d: '01/08', desc: 'Mensalidade Agosto', m: 'Dinheiro', f: 'FR TAL/2026/0802', v: 45000, s: 'pago' as StatusKey },
  ];
  const entradas = [
    { d: '26/10 · 07:15', f: 'Talatona', m: 'QR dinâmico' },
    { d: '24/10 · 18:40', f: 'Kilamba', m: 'QR · outra filial' },
    { d: '23/10 · 06:58', f: 'Talatona', m: 'Reconhecimento facial' },
    { d: '21/10 · 19:02', f: 'Talatona', m: 'QR dinâmico' },
  ];
  const avisos = (st === 'rede' ? [] : sentSms).concat(AVISOS[st].map(([d, n, ch, s]) => ({ d, n, ch, s })));
  const filiais = st === 'rede' ? ['Talatona · visita'] : ['Talatona · base', 'Kilamba', 'Maianga'];
  const ini = nome.split(' ').map((p) => p[0]).slice(0, 2).join('');

  const left = (
    <View style={{ flexDirection: compact ? 'row' : 'column', gap: 20, padding: compact ? g : 0, paddingLeft: g, paddingTop: compact ? 24 : 32, paddingBottom: compact ? 0 : 32, alignItems: compact ? 'center' : 'stretch' }}>
      <View accessibilityRole="image" accessibilityLabel="Foto do membro" style={{ width: compact ? 88 : '100%', aspectRatio: 1, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }}>
        <T v="num" size={compact ? 32 : 56} color={c.ink2} style={{ letterSpacing: 4 }}>{ini}</T>
      </View>
      <View style={{ gap: 10, flex: compact ? 1 : undefined }}>
        <T v="section">Filiais</T>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {filiais.map((f) => <Tag key={f}>{f}</Tag>)}
        </View>
      </View>
    </View>
  );

  const middle = (
    <View>
      {st !== 'rede' ? (
        <Section title="Pagamentos">
          <Table
            rows={pays}
            rowKey={(r) => r.f}
            cols={[
              { key: 'd', label: 'Data', w: 64, render: (r) => <Cell muted>{r.d}</Cell>, compact: 'secondary', text: (r) => r.d },
              { key: 'desc', label: 'Descrição', flex: 1.4, render: (r) => <View style={{ gap: 2 }}><Cell>{r.desc}</Cell><T v="small" numberOfLines={1}>{r.m} · {r.f}</T></View>, compact: 'primary' },
              { key: 'v', label: 'Valor', w: 120, align: 'right', render: (r) => <Cell right>{kz(r.v)}</Cell>, compact: 'end' },
              { key: 's', label: 'Estado', w: 110, align: 'right', render: (r) => <Status s={r.s} />, compact: 'end' },
            ]}
          />
        </Section>
      ) : (
        <Note style={{ marginHorizontal: g, marginTop: 32 }}>
          Membro de outro ginásio da Rede MUNTU. Só vê se o acesso é válido, o nome e a foto. Pagamentos, dados e avisos ficam no ginásio de origem.
        </Note>
      )}
      <Section title="Entradas">
        <Table
          rows={entradas}
          rowKey={(r) => r.d}
          cols={[
            { key: 'd', label: 'Quando', w: 120, render: (r) => <Cell muted>{r.d}</Cell>, compact: 'primary' },
            { key: 'f', label: 'Filial', render: (r) => <Cell>{r.f}</Cell>, compact: 'secondary', text: (r) => r.f },
            { key: 'm', label: 'Meio', render: (r) => <Cell muted>{r.m}</Cell>, compact: 'secondary', text: (r) => r.m },
          ]}
        />
      </Section>
    </View>
  );

  const right = (
    <Section
      title="Avisos ao membro"
      right={st !== 'rede' ? <Btn kind="outline" size="sm" label={composer ? 'Cancelar' : 'Enviar SMS'} onPress={() => { setComposer(!composer); setText(null); }} /> : null}
    >
      {composer ? (
        <View style={{ gap: 12, padding: 16, backgroundColor: c.surface }}>
          <Chips options={['Lembrete', 'Referência', 'Livre'] as const} value={tpl} onChange={(v) => { setTpl(v); setText(null); }} />
          <Area value={msg} onChangeText={setText} placeholder="Escreva a mensagem" />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <T v="small" color={parts > 1 ? c.bad : c.ink2}>{msg.length} caracteres · {parts} SMS</T>
            <Btn
              size="sm"
              label="Enviar SMS"
              haptic="press"
              disabled={!msg.trim()}
              onPress={() => {
                setSentSms((x) => [{ d: 'Agora', n: tpl === 'Livre' ? 'Mensagem livre' : tpl, ch: 'SMS', s: 'entregue' as StatusKey }, ...x]);
                setComposer(false);
                setText(null);
                notify('SMS enviado para 924 663 091', 'ok');
              }}
            />
          </View>
        </View>
      ) : null}
      <View>
        {avisos.map((r, i) => (
          <ListRow key={r.d + r.n + i} style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
              <T v="bodyStrong">{r.n}</T>
              <T v="small">{r.d} · {r.ch}</T>
            </View>
            <Status s={r.s} />
          </ListRow>
        ))}
        {!avisos.length ? (
          <ListRow>
            <T v="small" size={13}>Sem avisos. O ginásio de origem trata da comunicação.</T>
          </ListRow>
        ) : null}
      </View>
    </Section>
  );

  return (
    <Page>
      <PageHeader
        eyebrow={`Membro #4821 · ${st === 'rede' ? 'Kianda Fitness' : 'Desde Fev 2024 · base Talatona'}`}
        title={nome}
        actions={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <T v="eyebrow">Pré-visualizar</T>
            <Segmented
              value={st}
              onChange={(v) => { setSt(v); setComposer(false); }}
              options={[
                { v: 'normal', l: 'Activo' },
                { v: 'divida', l: 'Em dívida' },
                { v: 'congelado', l: 'Congelado' },
                { v: 'rede', l: 'Rede' },
              ]}
            />
          </View>
        }
      />
      <StatBand
        hero={{ label: m.diasLabel, value: m.dias, sub: <T v="label" color="#1D1C1A">{ST[m.s].l}</T> }}
        stats={[
          { value: <T v="bodyStrong" size={compact ? 16 : 18} numberOfLines={1}>{m.plano}</T>, label: 'Plano' },
          { value: m.prox, label: 'Próxima mensalidade' },
          { value: m.ent, label: 'Entradas este mês' },
        ]}
      />
      {m.banner ? <Banner tone={tone} style={{ borderBottomWidth: 1, borderColor: c.line }}>{m.banner}</Banner> : null}
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', paddingVertical: 20, paddingHorizontal: g, borderBottomWidth: 1, borderColor: c.line }}>
        {actions.map((a) => (
          <Btn key={a.l} kind={a.primary ? 'primary' : 'outline'} size="sm" label={a.l} haptic={a.primary ? 'press' : 'tap'} onPress={a.on} style={{ height: 40, paddingHorizontal: 16 }} />
        ))}
      </View>
      {bp === 'wide' ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 220 }}>{left}</View>
          <View style={{ flex: 1.3, minWidth: 0 }}>{middle}</View>
          <View style={{ flex: 1, minWidth: 300, borderLeftWidth: 1, borderColor: c.line }}>{right}</View>
        </View>
      ) : bp === 'medium' ? (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 200 }}>{left}</View>
            <View style={{ flex: 1, minWidth: 0 }}>{middle}</View>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: c.line }}>{right}</View>
        </View>
      ) : (
        <View>
          {left}
          {middle}
          <View style={{ borderTopWidth: 1, borderColor: c.line }}>{right}</View>
        </View>
      )}
    </Page>
  );
}
