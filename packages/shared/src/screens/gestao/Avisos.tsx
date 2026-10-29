import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { RULES, SAMPLE_VARS, SMS_LOG, type StatusKey } from '../../data/sample';
import { fill, int } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Area, Btn, Cell, Chips, Field, Page, PageHeader, Section, Sheet, Split, StatBand, Status, T, Table, Toggle } from '../../ui';

type RuleState = { on: boolean; tpl: string; hora: string; ch: string };
const LOG_F = { Todos: null, Agendados: 'agendado', Entregues: 'entregue', Falharam: 'falhou' } as const;

export function Avisos() {
  const { c, g, bp, compact } = useTheme();
  const { bottomInset } = useNav();
  const notify = useNotify();
  const [rules, setRules] = useState<RuleState[]>(RULES.map((r) => ({ on: r.on, tpl: r.tpl, hora: r.hora, ch: r.ch })));
  const [ri, setRi] = useState(1);
  const [editorOpen, setEditorOpen] = useState(false);
  const [logF, setLogF] = useState<keyof typeof LOG_F>('Todos');
  const [resent, setResent] = useState<Record<number, boolean>>({});
  const upd = (i: number, patch: Partial<RuleState>) => setRules((x) => x.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const sentTotal = RULES.reduce((a, r, i) => a + (rules[i]!.on ? r.sent : 0), 0);
  const log = SMS_LOG.map((r) => (resent[r.id] ? { ...r, st: 'agendado' as StatusKey, why: 'Reenvio às 10:15' } : r)).filter((r) => !LOG_F[logF] || r.st === LOG_F[logF]);
  const sideEditor = bp === 'wide';

  const select = (i: number) => {
    haptic('select');
    setRi(i);
    if (!sideEditor) setEditorOpen(true);
  };

  const editor = <Editor i={ri} r={rules[ri]!} upd={upd} onSaved={() => { notify('Aviso guardado', 'ok'); if (!sideEditor) setEditorOpen(false); }} onTest={() => notify('Teste enviado para 923 456 789', 'ok')} />;

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader
        eyebrow="Automações · SMS e WhatsApp"
        title="Avisos"
        actions={
          <>
            <Btn kind="outline" label="Comprar SMS" onPress={() => notify('Pacotes de SMS: em breve', 'info')} />
            <Btn label="Novo aviso" haptic="press" onPress={() => notify('Novo aviso: em breve', 'info')} />
          </>
        }
      />
      <StatBand
        hero={{ label: 'SMS disponíveis', value: '4 820', sub: 'Cerca de 21 dias ao ritmo actual' }}
        stats={[
          { value: int(sentTotal), label: 'Enviados em Outubro' },
          { value: '97,8%', label: 'Taxa de entrega' },
          { value: '62%', label: 'Pagam após aviso' },
        ]}
      />
      <Split ratio={[1.2, 1]} minRight={380} stackAt="medium" divide={sideEditor}>
        <Section title="Jornada do membro">
          <View>
            {RULES.map((r, i) => {
              const st = rules[i]!;
              const sel = i === ri && sideEditor;
              return (
                <View key={r.n} style={{ flexDirection: 'row', alignItems: 'center', gap: compact ? 10 : 16, borderTopWidth: 1, borderColor: c.line, backgroundColor: sel ? c.surface : 'transparent' }}>
                  <T size={13} w={300} numberOfLines={1} style={{ width: compact ? 28 : 34, paddingLeft: 6 }}>{String(i + 1).padStart(2, '0')}</T>
                  <Pressable accessibilityRole="button" accessibilityLabel={`Editar ${r.n}`} onPress={() => select(i)} style={{ flex: 1, paddingVertical: 14, gap: 3, minWidth: 0 }}>
                    <T v="bodyStrong" numberOfLines={1}>{r.n}</T>
                    <T v="small" color={c.ink2} numberOfLines={1}>{r.trig} · {st.hora}{compact ? ` · ${st.ch}` : ''}</T>
                  </Pressable>
                  {!compact ? <T v="label" size={10} style={{ width: 100 }}>{st.ch}</T> : null}
                  {!compact ? <T right color={st.on ? c.ink : c.muted} style={{ width: 70 }}>{st.on ? String(r.sent) : 'Desligado'}</T> : null}
                  <View style={{ paddingRight: 8 }}>
                    <Toggle value={st.on} onChange={(v) => upd(i, { on: v })} label={`Activar ${r.n}`} />
                  </View>
                </View>
              );
            })}
          </View>
        </Section>
        {sideEditor ? <View style={{ backgroundColor: c.surface2, padding: g, paddingVertical: 32, gap: 18 }}>{editor}</View> : <View />}
      </Split>
      {!sideEditor ? (
        <Sheet visible={editorOpen} onClose={() => setEditorOpen(false)} eyebrow={`Aviso ${String(ri + 1).padStart(2, '0')} · editar`} title={RULES[ri]!.n}>
          {editor}
        </Sheet>
      ) : null}
      <Section title="Fila e histórico" right={<Chips options={Object.keys(LOG_F) as (keyof typeof LOG_F)[]} value={logF} onChange={setLogF} label="Filtrar envios" />} style={{ borderTopWidth: 1, borderColor: c.line }}>
        <Table
          rows={log}
          rowKey={(r) => r.id}
          empty="Sem envios com este filtro."
          minWidth={bp === 'medium' ? 760 : undefined}
          cols={[
            { key: 'h', label: 'Hora', w: 60, render: (r) => <Cell muted>{r.h}</Cell>, compact: 'secondary', text: (r) => r.h },
            { key: 'n', label: 'Membro', flex: 1, render: (r) => <View style={{ gap: 2 }}><Cell strong>{r.n}</Cell><T v="small">{r.tel}</T></View>, compact: 'primary' },
            { key: 'a', label: 'Aviso', flex: 1, render: (r) => <Cell>{r.a}</Cell>, compact: 'secondary', text: (r) => r.a },
            { key: 'ch', label: 'Canal', w: 90, render: (r) => <T v="label" size={10}>{r.ch}</T>, compact: 'hidden' },
            { key: 's', label: 'Estado', w: 190, render: (r) => <Status s={r.st} sub={r.why || undefined} />, compact: 'end' },
            {
              key: 'x',
              label: '',
              w: 100,
              align: 'right',
              render: (r) => (r.st === 'falhou' ? <Btn kind="outline" size="sm" label="Reenviar" onPress={() => { setResent((x) => ({ ...x, [r.id]: true })); notify('Reenvio agendado para as 10:15', 'ok'); }} /> : null),
              compact: 'end',
            },
          ]}
        />
      </Section>
    </Page>
  );
}

function Editor({ i, r, upd, onSaved, onTest }: { i: number; r: RuleState; upd: (i: number, p: Partial<RuleState>) => void; onSaved: () => void; onTest: () => void }) {
  const { c, wide } = useTheme();
  const prev = fill(r.tpl, SAMPLE_VARS);
  const parts = Math.max(1, Math.ceil(prev.length / 160));
  return (
    <View style={{ gap: 18 }}>
      {wide ? (
        <>
          <T v="eyebrow">Aviso {String(i + 1).padStart(2, '0')} · editar</T>
          <T v="title">{RULES[i]!.n}</T>
        </>
      ) : null}
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <View style={{ flex: 1, gap: 6 }}>
          <T v="eyebrow">Quando</T>
          <View style={{ height: 42, justifyContent: 'center', borderBottomWidth: 1, borderColor: c.ink }}>
            <T size={15} numberOfLines={1}>{RULES[i]!.trig}</T>
          </View>
        </View>
        <Field label="Hora" value={r.hora} onChangeText={(v) => upd(i, { hora: v })} style={{ width: 110 }} />
      </View>
      <View style={{ gap: 8 }}>
        <T v="eyebrow">Canal</T>
        <Chips options={['SMS', 'WhatsApp', 'SMS + WhatsApp'] as const} value={r.ch as any} onChange={(v) => upd(i, { ch: v })} />
      </View>
      <Area label="Mensagem" value={r.tpl} onChangeText={(v) => upd(i, { tpl: v })} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap', flex: 1 }}>
          {['{nome}', '{valor}', '{data}', '{referencia}', '{ginasio}'].map((v) => (
            <Pressable key={v} accessibilityLabel={`Inserir ${v}`} onPress={() => { haptic('select'); upd(i, { tpl: r.tpl + ' ' + v }); }} style={(st: any) => ({ height: 28, paddingHorizontal: 8, justifyContent: 'center', borderWidth: 1, borderColor: st.hovered ? c.ink : c.line2, backgroundColor: c.bg })}>
              <T size={12}>{v}</T>
            </Pressable>
          ))}
        </View>
        <T v="small" color={parts > 1 ? c.bad : c.ink2}>{prev.length} caracteres · {parts} SMS por envio</T>
      </View>
      <View style={{ gap: 8 }}>
        <T v="eyebrow">Pré-visualização · Kátia Muondo</T>
        <View style={{ backgroundColor: c.bg, borderWidth: 1, borderColor: c.line, padding: 16 }}>
          <View style={{ backgroundColor: c.surface, paddingVertical: 12, paddingHorizontal: 14, maxWidth: 320 }}>
            <T size={14} style={{ lineHeight: 21 }}>{prev}</T>
          </View>
        </View>
      </View>
      <T v="small" color={c.ink2}>Não envia entre 21:00 e 08:00. O membro pode responder PARAR para deixar de receber.</T>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Btn kind="outline" size="sm" label="Enviar teste" onPress={onTest} />
        <Btn size="sm" label="Guardar" haptic="success" onPress={onSaved} />
      </View>
    </View>
  );
}
