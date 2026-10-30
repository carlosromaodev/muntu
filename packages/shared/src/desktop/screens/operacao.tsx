import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { CX_HIST, FIL, LEDGER, ST } from '../../data/desk';
import { NOTICES, OCC, OCC_NOW, STAFF } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, type } from '../../theme/tokens';
import { Avatar, Bars, Button, Chip, ChipGroup, Field, Note, Press, Select, Tabs, TextArea, Txt, useToast } from '../../ui';
import { Cols, DPage, KpiRow, Muted, PageHead, Panel, Status, Strong, Table, Tag } from '../kit';
import { useDRole } from '../Shell';
import { useDesk } from '../session';

const kz = (v: number) => `${v < 0 ? '−' : ''}${kn(v)},00 Kz`;
const NOTAS = [5000, 2000, 1000, 500, 200, 100, 50];
const FORML = { sangria: 'Sangria · para o cofre', reforco: 'Reforço de troco', despesa: 'Despesa paga em dinheiro' } as const;

/** d4 · Caixa (turno actual e histórico). */
export function DCaixa() {
  const toast = useToast();
  const { turno, filial } = useDesk();
  const hasT = true;
  const [tab, setTab] = useState('atual');
  const [notas, setNotas] = useState<Record<number, string>>({ 5000: '12', 2000: '8', 1000: '6', 500: '4', 200: '5', 100: '8', 50: '4' });
  const [close, setClose] = useState<'count' | 'revealed' | 'pending'>('count');
  const [movs, setMovs] = useState<{ h: string; d: string; m: string; v: number }[]>([]);
  const [form, setForm] = useState<keyof typeof FORML | null>(null);
  const [val, setVal] = useState('');
  const [mot, setMot] = useState('');
  const [just, setJust] = useState('');
  const [passado, setPassado] = useState(false);
  const revealed = close !== 'count';
  const cash = NOTAS.reduce((a, v) => a + (parseInt(notas[v] ?? '', 10) || 0) * v, 0);
  const movEff = movs.reduce((a, m) => a + m.v, 0);
  const exp = 88000 + movEff;
  const dif = cash - exp;
  const base = LEDGER.filter((r) => r.dia === 'Hoje' && r.turno === 'manha');
  const turnoMovs = [...movs, ...base];
  const TS = { manha: 'Manhã', tarde: 'Tarde' } as const;
  const hist = CX_HIST.filter((r) => (turno === 'dia' || r[3] === TS[turno as 'manha']) && (filial === 'todas' || r[1] === FIL[filial].n));
  const registar = () => {
    const v = parseFloat(val.replace(/\s/g, '').replace(',', '.')) || 0;
    if (!v || !form) return;
    const sign = form === 'reforco' ? 1 : -1;
    setMovs([{ h: `09:${45 + movs.length}`, d: FORML[form] + (mot ? ` · ${mot}` : ''), m: 'Dinheiro', v: sign * v }, ...movs]);
    setForm(null);
    setVal('');
    setMot('');
    haptic('success');
  };
  return (
    <DPage>
      <PageHead title="Caixa" sub="Talatona · Turno da manhã · Celma Bento" />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <Tabs options={[{ v: 'atual', l: hasT ? 'Turno actual' : 'Caixa de hoje' }, { v: 'hist', l: hasT ? 'Histórico de turnos' : 'Histórico' }]} value={tab} onChange={setTab} />
      </View>
      {tab === 'atual' ? (
        <>
          <View style={{ flexDirection: 'row', gap: 16, paddingHorizontal: 40, paddingBottom: 20 }}>
            <Animated.View layout={LinearTransition} style={{ flex: 1.4, padding: 22, gap: 14, backgroundColor: !revealed ? C.sand : dif === 0 ? C.okBg : C.accent }}>
              <Txt style={type(13, 500)}>Kz · Diferença do turno</Txt>
              <Txt style={type(44, 300)}>{revealed ? kn(dif) : '••••'}</Txt>
              <Txt style={type(10, 600, 0.18, true)}>{revealed ? (dif === 0 ? 'Caixa certo' : 'Precisa de justificação') : 'Oculta até fechar'}</Txt>
            </Animated.View>
            {[
              ['20 000,00', 'Kz · Fundo de troco'],
              [String(turnoMovs.length).padStart(2, '0'), 'Movimentos do turno'],
              ['96 500,00', 'Kz · Electrónico conciliado'],
            ].map(([v, l], i) => (
              <Animated.View key={l} entering={FadeInDown.delay(40 * (i + 1))} style={{ flex: 1, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 22, gap: 8, justifyContent: 'space-between' }}>
                <Txt style={type(32, 300)}>{v}</Txt>
                <Txt style={[type(13, 500), { color: C.grey }]}>{l}</Txt>
              </Animated.View>
            ))}
          </View>
          <Cols flex={[1, 1]}>
            <Panel
              title="Movimentos do turno"
              i={0}
              right={
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  {(['sangria', 'reforco', 'despesa'] as const).map((k) => (
                    <Button key={k} label={{ sangria: 'Sangria', reforco: 'Reforço', despesa: 'Despesa' }[k]} size="xs" kind="outline" onPress={() => (setForm(k), setVal(''), setMot(''))} />
                  ))}
                </View>
              }
            >
              {form ? (
                <Animated.View entering={FadeInDown} style={{ backgroundColor: C.canvas, padding: 14, gap: 12 }}>
                  <Strong>{FORML[form]}</Strong>
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Field style={{ flex: 1 }} label="Valor (Kz)" value={val} onChangeText={setVal} keyboardType="number-pad" />
                    <Field style={{ flex: 2 }} label="Motivo" value={mot} onChangeText={setMot} />
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
                    <Button label="Cancelar" kind="outline" size="sm" onPress={() => setForm(null)} />
                    <Button label="Registar" size="sm" onPress={registar} />
                  </View>
                </Animated.View>
              ) : null}
              <Table cols={[{ l: 'Hora', w: 52 }, { l: 'Descrição', flex: 2 }, { l: 'Meio' }, { l: 'Valor', align: 'right' }]} rows={turnoMovs} render={(r) => [<Muted>{r.h}</Muted>, <Txt numberOfLines={1} style={type(14, 400)}>{r.d}</Txt>, <Muted>{r.m}</Muted>, <Txt style={[type(14, 400), { color: r.v < 0 ? C.bad : C.ink }]}>{`${r.v > 0 ? '+' : ''}${kz(r.v)}`}</Txt>]} />
            </Panel>
            <Panel title="Contagem do dinheiro" i={1}>
              <Muted>{revealed ? 'O valor esperado só aparece depois da contagem. Diferenças precisam de justificação.' : 'Conte o caixa sem ver o valor esperado. Só depois de fechar vê a diferença.'}</Muted>
              <View style={{ flexDirection: 'row', paddingBottom: 6 }}>
                {['Nota', 'Quantidade', 'Subtotal'].map((h, i) => (
                  <Txt key={h} style={[type(12, 500), { color: C.muted, flex: 1, textAlign: i === 2 ? 'right' : 'left' }]}>
                    {h}
                  </Txt>
                ))}
              </View>
              {NOTAS.map((v) => {
                const q = parseInt(notas[v] ?? '', 10) || 0;
                return (
                  <View key={v} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: C.line }}>
                    <Txt style={[type(14, 400), { flex: 1 }]}>{kn(v)} Kz</Txt>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        editable={!revealed}
                        value={notas[v]}
                        onChangeText={(t) => setNotas({ ...notas, [v]: t.replace(/\D/g, '') })}
                        keyboardType="number-pad"
                        accessibilityLabel={`Notas de ${kn(v)}`}
                        style={[type(14, 400), { width: 80, borderBottomWidth: 1, borderBottomColor: revealed ? C.line : C.ink, paddingVertical: 4, color: C.ink, outlineStyle: 'none' } as any]}
                      />
                    </View>
                    <Txt tabular style={[type(14, 400), { flex: 1, textAlign: 'right' }]}>
                      {kz(q * v)}
                    </Txt>
                  </View>
                );
              })}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.ink }}>
                <Strong>Dinheiro contado</Strong>
                <Strong>{kz(cash)}</Strong>
              </View>
              {[
                ['Multicaixa Express', 64500],
                ['TPA', 22000],
                ['Transferência', 10000],
              ].map(([l, v]) => (
                <View key={l as string} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: C.line, gap: 10 }}>
                  <Txt style={[type(14, 400), { flex: 1 }]}>{l as string}</Txt>
                  <Tag l="Conciliado" c={C.ok} bg={C.okBg} />
                  <Txt style={type(14, 400)}>{kz(v as number)}</Txt>
                </View>
              ))}
              {revealed ? (
                <Animated.View entering={FadeInDown} style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1, backgroundColor: C.canvas, padding: 12 }}>
                    <Muted size={12}>Dinheiro esperado</Muted>
                    <Strong size={18}>{kz(exp)}</Strong>
                  </View>
                  <View style={{ flex: 1, backgroundColor: C.canvas, padding: 12 }}>
                    <Muted size={12}>Diferença</Muted>
                    <Strong size={18} c={dif < 0 ? C.bad : C.ok}>
                      {kz(dif)}
                    </Strong>
                  </View>
                </Animated.View>
              ) : null}
              {close === 'count' ? (
                <Button label="Fechar e revelar diferença" size="lg" feedback="heavy" onPress={() => (setClose('revealed'), haptic(dif === 0 ? 'success' : 'warning'))} />
              ) : close === 'revealed' && dif === 0 ? (
                <Note tone="ok" text="Sem diferença. Caixa fechado às 14:02." />
              ) : close === 'revealed' ? (
                <Animated.View entering={FadeInDown} style={{ gap: 10 }}>
                  <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Justificação · obrigatória</Txt>
                  <TextArea value={just} onChangeText={setJust} placeholder="Explique o que aconteceu" />
                  <Button label="Pedir aprovação ao dono" disabled={!just.trim()} onPress={() => (setClose('pending'), toast('Pedido enviado ao dono', 'info'))} />
                </Animated.View>
              ) : (
                <Note tone="warn" text={`Diferença de ${kz(dif)} enviada ao dono por SMS e na app.`} />
              )}
            </Panel>
          </Cols>
          {close === 'pending' || (close === 'revealed' && dif === 0) ? (
            <View style={{ paddingHorizontal: 40 }}>
              <Panel title="Passagem de turno">
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Txt style={type(14, 400)}>
                      Fundo de troco a entregar ao turno da tarde: <Txt style={type(14, 600)}>20 000,00 Kz</Txt>
                    </Txt>
                    <Muted size={12}>Recebe Rui Manuel · abertura às 14:00 · contagem confirmada pelos dois</Muted>
                  </View>
                  {passado ? <Note tone="ok" text="Entregue a Rui Manuel às 14:02. Turno da tarde aberto." /> : <Button label="Confirmar entrega" onPress={() => (setPassado(true), haptic('success'))} />}
                </View>
              </Panel>
            </View>
          ) : null}
        </>
      ) : (
        <View style={{ paddingHorizontal: 40 }}>
          <Panel title="Histórico de turnos">
            <Table
              cols={[{ l: 'Data', w: 60 }, { l: 'Filial' }, { l: 'Operador' }, { l: 'Turno' }, { l: 'Horário' }, { l: 'Esperado', align: 'right' }, { l: 'Contado', align: 'right' }, { l: 'Diferença', align: 'right' }, { l: 'Estado', w: 160 }]}
              rows={hist}
              empty="Sem turnos com estes filtros."
              render={(r) => {
                const [d, f, op, t, hr, e, c, st, why] = r as [string, string, string, string, string, number, number, string, string];
                return [<Muted>{d}</Muted>, f, op, <Muted>{`Turno da ${t.toLowerCase()}`}</Muted>, <Muted>{hr}</Muted>, kz(e), kz(c), <Txt style={[type(14, 400), { color: c < e ? C.bad : C.ink }]}>{c === e ? '—' : kz(c - e)}</Txt>, <Status l={ST[st]!.l} c={ST[st]!.c} why={why} />];
              }}
            />
          </Panel>
        </View>
      )}
    </DPage>
  );
}

const QK: Record<string, [string, string, string]> = { cob: ['Cobrança', '#7a5800', '#f5ecd0'], doc: ['Documento', '#55524b', '#ebe6d6'], rec: ['Reclamação', '#b42318', '#f7e1de'], res: ['Reserva', '#1d1c1a', '#ebe6d6'], oco: ['Ocorrência', '#b42318', '#f7e1de'] };
const Q0 = [
  ['q1', 'cob', 'Cobrar Mário Sebastião', '30 000 Kz · 12 dias em atraso. Prometeu pagar hoje à tarde.', 'Manhã · Celma Bento', 'Teresa Lunda', 'Hoje 18:00', 2],
  ['q2', 'doc', 'Emitir factura da venda #1094', 'Bar · 3 500 Kz. O cliente pediu factura com NIF.', 'Manhã · Celma Bento', 'Teresa Lunda', 'Hoje', 1],
  ['q3', 'rec', 'Ar condicionado da sala 2', 'Ana Domingos queixou-se duas vezes esta semana.', 'Manhã · Celma Bento', 'Paulo Neto', 'Amanhã', 3],
  ['q4', 'res', 'Confirmar reserva PT de Kátia Muondo', 'Quinta 18:00 com Nuno Sebastião.', 'Manhã · Celma Bento', 'Teresa Lunda', 'Hoje 17:00', 1],
  ['q5', 'oco', 'Catraca 2 em manutenção', 'Técnico chega às 15:00. Validar entradas manualmente.', 'Manhã · Celma Bento', 'Teresa Lunda', 'Hoje 15:00', 2],
  ['q6', 'cob', 'Transferência por confirmar · 15 000 Kz', 'Délcio Ngola enviou comprovativo. Falta ver no extracto.', 'Ontem tarde · Rui Manuel', 'Jorge Afonso', 'Hoje', 4],
  ['q7', 'doc', 'Contrato de Joana Kiala por assinar', 'Inscrição feita ontem sem assinatura.', 'Ontem tarde · Teresa Lunda', 'Teresa Lunda', 'Sexta', 2],
].map(([id, k, t, d, orig, own, due, turns]) => ({ id: id as string, k: k as string, t: t as string, d: d as string, orig: orig as string, own: own as string, due: due as string, turns: turns as number }));
const OWNERS = ['Teresa Lunda', 'Celma Bento', 'Jorge Afonso', 'Nuno Sebastião', 'Paulo Neto'];

/** dq · Pendências (passam de turno em turno até alguém resolver). */
export function DPendencias() {
  const role = useDRole();
  const me = { rececao: 'Teresa Lunda', financas: 'Jorge Afonso', pt: 'Nuno Sebastião', dono: 'Paulo Neto' }[role];
  const [extra, setExtra] = useState<typeof Q0>([]);
  const [st, setSt] = useState<Record<string, 'open' | 'res'>>({});
  const [own, setOwn] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string[]>>({});
  const [tab, setTab] = useState('open');
  const [kind, setKind] = useState('all');
  const [sel, setSel] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [nt, setNt] = useState('');
  const [nk, setNk] = useState('oco');
  const all = [...extra, ...Q0];
  const isOpen = (q: (typeof Q0)[number]) => (st[q.id] ?? 'open') !== 'res';
  const owner = (q: (typeof Q0)[number]) => own[q.id] ?? q.own;
  const list = all.filter((q) => (tab === 'res' ? !isOpen(q) : isOpen(q) && (tab !== 'mine' || owner(q) === me))).filter((q) => kind === 'all' || q.k === kind);
  const cur = all.find((q) => q.id === (list.find((q) => q.id === sel) ? sel : list[0]?.id));
  const hist = cur ? [{ t: `Criada no turno ${cur.orig.split(' · ')[0]!.toLowerCase()}`, w: cur.orig.split(' · ')[1], h: cur.orig.startsWith('Ontem') ? 'Ontem · 19:40' : 'Hoje · 09:12' }, { t: 'Recebida na troca de turno', w: 'Teresa Lunda', h: 'Hoje · 14:03' }, ...(notes[cur.id] ?? []).map((n) => ({ t: n, w: me, h: 'Agora' }))] : [];
  const addNote = (id: string, t: string) => setNotes((n) => ({ ...n, [id]: [...(n[id] ?? []), t] }));
  return (
    <DPage>
      <PageHead title="Pendências" sub="Passam de turno em turno até alguém as resolver" actions={[{ label: showNew ? 'Fechar' : 'Nova pendência', onPress: () => setShowNew(!showNew) }]} />
      {showNew ? (
        <Animated.View entering={FadeInDown} style={{ marginHorizontal: 40, marginBottom: 20, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 20, flexDirection: 'row', gap: 16, alignItems: 'flex-end' }}>
          <Field style={{ flex: 2 }} label="Pendência" value={nt} onChangeText={setNt} placeholder="O que fica por fazer" />
          <Select style={{ flex: 1 }} label="Tipo" value={nk} onChange={setNk} options={Object.entries(QK).map(([v, x]) => ({ v, l: x[0] }))} />
          <Button
            label="Criar"
            disabled={nt.trim().length < 3}
            onPress={() => {
              const q = { id: `x${Date.now()}`, k: nk, t: nt.trim(), d: 'Criada agora.', orig: `Tarde · ${me}`, own: me, due: 'Hoje', turns: 1 };
              setExtra([q, ...extra]);
              setShowNew(false);
              setNt('');
              setSel(q.id);
              setTab('open');
              setKind('all');
              haptic('success');
            }}
          />
        </Animated.View>
      ) : null}
      <Cols flex={[1, 1.1]}>
        <Panel i={0} pad={0} style={{ paddingVertical: 0 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Tabs
              options={[
                { v: 'open', l: 'Abertas', n: all.filter(isOpen).length },
                { v: 'mine', l: 'Minhas', n: all.filter((q) => isOpen(q) && owner(q) === me).length },
                { v: 'res', l: 'Resolvidas', n: all.filter((q) => !isOpen(q)).length },
              ]}
              value={tab}
              onChange={(v) => (setTab(v), setSel(null))}
            />
            <ChipGroup size="sm" style={{ paddingVertical: 12 }} options={[['all', 'Todas'], ...Object.entries(QK).map(([k, v]) => [k, v[0]] as [string, string])]} value={kind} onChange={(v) => (setKind(v), setSel(null))} />
          </View>
          {list.map((q, i) => {
            const on = q.id === cur?.id;
            return (
              <Animated.View key={q.id} entering={FadeInDown.delay(i * 25)} layout={LinearTransition}>
                <Press feedback="select" scaleTo={1} onPress={() => setSel(q.id)} style={({ hovered }) => ({ paddingVertical: 14, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: on ? '#fff' : hovered ? C.canvas : 'transparent', borderLeftWidth: 3, borderLeftColor: on ? C.accent : 'transparent', gap: 6 })}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Tag l={QK[q.k]![0]} c={QK[q.k]![1]} bg={QK[q.k]![2]} />
                    <Muted size={12}>{q.due}</Muted>
                  </View>
                  <Strong>{q.t}</Strong>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Muted size={12}>{owner(q)}</Muted>
                    {q.turns > 1 ? <Txt style={[type(12, 400), { color: q.turns > 2 ? C.bad : C.muted }]}>Passou {q.turns} turnos</Txt> : null}
                  </View>
                </Press>
              </Animated.View>
            );
          })}
          {!list.length ? (
            <View style={{ padding: 20 }}>
              <Muted>Nada nesta lista.</Muted>
            </View>
          ) : null}
        </Panel>
        {cur ? (
          <Animated.View key={cur.id} entering={FadeIn.duration(220)}>
            <Panel>
              <Tag l={QK[cur.k]![0]} c={QK[cur.k]![1]} bg={QK[cur.k]![2]} />
              <Txt style={type(20, 500)}>{cur.t}</Txt>
              <Muted>{cur.d}</Muted>
              <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line }}>
                <View style={{ flex: 1, paddingVertical: 12, gap: 4 }}>
                  <Muted size={11}>Origem</Muted>
                  <Txt style={type(13, 400)}>{cur.orig}</Txt>
                </View>
                <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, gap: 4, borderLeftWidth: 1, borderLeftColor: C.line }}>
                  <Muted size={11}>Prazo</Muted>
                  <Txt style={type(13, 400)}>
                    {cur.due} · {cur.turns} {cur.turns === 1 ? 'turno' : 'turnos'}
                  </Txt>
                </View>
                <View style={{ flex: 1.2, paddingVertical: 4, paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: C.line }}>
                  <Select label="Responsável" value={owner(cur)} onChange={(v) => setOwn({ ...own, [cur.id]: v })} options={OWNERS.map((v) => ({ v, l: v }))} />
                </View>
              </View>
              <Strong size={13}>Histórico</Strong>
              {hist.map((h, i) => (
                <Animated.View key={i} entering={FadeInDown} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <View style={{ width: 6, height: 6, backgroundColor: C.ink }} />
                  <Txt style={[type(13, 400), { flex: 1 }]}>
                    {h.t} · {h.w}
                  </Txt>
                  <Muted size={12}>{h.h}</Muted>
                </Animated.View>
              ))}
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
                <Field style={{ flex: 1 }} value={note} onChangeText={setNote} placeholder="Acrescentar nota para o próximo turno" />
                <Button label="Anotar" kind="outline" size="sm" disabled={!note.trim()} onPress={() => (addNote(cur.id, note.trim()), setNote(''))} />
              </View>
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
                {isOpen(cur) ? (
                  <>
                    <Button label="Encaminhar ao dono" kind="outline" size="sm" onPress={() => (setOwn({ ...own, [cur.id]: 'Paulo Neto' }), addNote(cur.id, 'Encaminhada ao dono'))} />
                    <Button label="Marcar como resolvida" size="sm" feedback="success" onPress={() => (setSt({ ...st, [cur.id]: 'res' }), addNote(cur.id, 'Resolvida'))} />
                  </>
                ) : (
                  <Button label="Reabrir" kind="outline" size="sm" onPress={() => setSt({ ...st, [cur.id]: 'open' })} />
                )}
              </View>
            </Panel>
          </Animated.View>
        ) : (
          <Panel>
            <Muted>Escolha uma pendência.</Muted>
          </Panel>
        )}
      </Cols>
    </DPage>
  );
}

/** da · Avisos internos (equipa). */
export function DAvisos() {
  const { readNotices, markRead } = useMuntu();
  const [f, setF] = useState('all');
  const list = NOTICES.filter((a) => f === 'all' || (f === 'unread' ? !readNotices[a.id] : a.p === 'urgente'));
  const un = NOTICES.filter((a) => !readNotices[a.id]).length;
  return (
    <DPage>
      <PageHead title="Avisos" sub={`${un ? `${un} por ler` : 'Tudo lido'} · enviados pela gestão`} actions={[{ label: 'Marcar todos como lidos', kind: 'outline', onPress: () => NOTICES.forEach((n) => markRead(n.id)) }]} />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20, flexDirection: 'row' }}>
        <ChipGroup
          size="sm"
          options={[
            { v: 'all', l: 'Todos', n: NOTICES.length },
            { v: 'unread', l: 'Por ler', n: un },
            { v: 'urg', l: 'Urgentes', n: NOTICES.filter((a) => a.p === 'urgente').length },
          ]}
          value={f}
          onChange={setF}
        />
      </View>
      <View style={{ paddingHorizontal: 40, gap: 12, maxWidth: 900 }}>
        {list.map((a, i) => {
          const rd = !!readNotices[a.id];
          const s = ST[a.p === 'urgente' ? 'divida' : 'congelado']!;
          return (
            <Animated.View key={a.id} entering={FadeInDown.delay(i * 50)} layout={LinearTransition}>
            <View style={{ backgroundColor: rd ? 'transparent' : C.paper, borderWidth: 1, borderColor: rd ? C.line : C.lineStrong, padding: 20, gap: 12, opacity: rd ? 0.6 : 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar initials={a.de.split(' ').map((w) => w[0]).join('')} size={32} bg={C.ink} fg={C.paper} />
                <View style={{ flex: 1 }}>
                  <Strong size={13}>{a.de}</Strong>
                  <Muted size={11}>
                    {a.h} · para {a.to}
                  </Muted>
                </View>
                <Tag l={a.p === 'urgente' ? 'Urgente' : 'Informação'} c={a.p === 'urgente' ? C.bad : C.grey} bg={a.p === 'urgente' ? C.badBg : C.sand} />
              </View>
              <Txt style={type(15, rd ? 400 : 500)}>{a.t}</Txt>
              <View style={{ alignItems: 'flex-end' }}>{rd ? <Txt style={[type(10, 600, 0.14, true), { color: C.ok }]}>Lido ✓</Txt> : <Button label="Marcar como lido" kind="outline" size="sm" feedback="success" onPress={() => markRead(a.id)} />}</View>
            </View>
            </Animated.View>
          );
        })}
        {!list.length ? <Muted>Nada nesta lista.</Muted> : null}
      </View>
    </DPage>
  );
}

/** dz · Ginásio agora (lotação ao vivo). */
export function DGinasioAgora() {
  const now = OCC[OCC_NOW]!;
  const segs = Math.round((now / 120) * 24);
  const staff = STAFF.filter((p) => p.on && p.f === 'Talatona');
  return (
    <DPage>
      <PageHead title="Ginásio agora" sub="Talatona · actualizado às 09:41 pelos check-ins" />
      <Cols flex={[0.6, 1.4]}>
        <Animated.View entering={FadeInDown} style={{ backgroundColor: C.ink, padding: 24, gap: 18 }}>
          <Txt style={[type(12, 500), { color: C.sand }]}>Pessoas dentro agora</Txt>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
            <Txt style={[type(96, 300), { color: C.paper, lineHeight: 92 }]}>{now}</Txt>
            <Txt style={[type(14, 400), { color: C.sand, marginBottom: 12 }]}>de 120</Txt>
          </View>
          <View style={{ flexDirection: 'row', gap: 2 }}>
            {Array.from({ length: 24 }, (_, i) => (
              <Animated.View key={i} entering={ZoomIn.delay(i * 20)} style={{ flex: 1, height: 12, backgroundColor: i < segs ? C.accent : '#3a3834' }} />
            ))}
          </View>
          <Txt style={[type(12, 400), { color: C.sand }]}>{Math.round((now / 120) * 100)}% da lotação · máximo 120 pessoas</Txt>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#3a3834', paddingTop: 14 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Txt style={[type(11, 400), { color: C.stone }]}>Estado</Txt>
              <Txt style={[type(15, 400), { color: C.paper }]}>Tranquilo</Txt>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Txt style={[type(11, 400), { color: C.stone }]}>Mais calmo</Txt>
              <Txt style={[type(15, 400), { color: C.paper }]}>11:00–14:00</Txt>
            </View>
          </View>
        </Animated.View>
        <Panel title="Hoje, hora a hora" i={1} right={<View style={{ flexDirection: 'row', gap: 12 }}>{[['Já passou', C.ink], ['Agora', C.accent], ['Habitual', C.lineStrong]].map(([l, c]) => <View key={l} style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><View style={{ width: 8, height: 8, backgroundColor: c }} /><Muted size={11}>{l}</Muted></View>)}</View>}>
          <Bars data={OCC} max={92} height={190} gap={6} colors={(i) => (i === OCC_NOW ? C.accent : i < OCC_NOW ? C.ink : C.lineStrong)} labels={OCC.map((_, i) => String(6 + i).padStart(2, '0'))} values={(i) => (i <= OCC_NOW ? String(OCC[i]) : null)} />
          <Muted size={12}>Pico habitual às 19:00 · 92 pessoas. Os valores futuros são a média das últimas 4 semanas.</Muted>
        </Panel>
      </Cols>
      <View style={{ paddingHorizontal: 40 }}>
        <Panel title="Equipa presente">
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {staff.map((p) => (
              <View key={p.i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: 1, borderColor: C.line, minWidth: 220 }}>
                <Avatar initials={p.i} size={32} />
                <View>
                  <Strong size={13}>{p.n}</Strong>
                  <Muted size={11}>
                    {p.r} · desde {p.since}
                  </Muted>
                </View>
              </View>
            ))}
          </View>
        </Panel>
      </View>
    </DPage>
  );
}
