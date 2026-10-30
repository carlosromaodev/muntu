import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { DENOMS, PENDING_KIND, SHIFT_EXPECTED_CASH, SHIFT_PAYS, SHIFT_PENDING } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn, knc } from '../../lib/format';
import { handoverView, useHandover } from '../../store/handover';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, TONES, type } from '../../theme/tokens';
import { M, Badge, Button, Field, MoneyInput, Note, Press, Reveal, Row, TextArea, Txt } from '../../ui';
import { BackLink, Footer, Page, Section, Steps, TopBar } from '../Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STEP_L = ['', 'Contar dinheiro', 'Outros meios de pagamento', 'Rever pendências', 'Assinar a passagem'];
const STEP_R = ['', 'dinheiro', 'pagamentos', 'pendencias', 'assumir'];

function FlowHeader({ step, title }: { step: number; title: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 4, paddingHorizontal: GUTTER, paddingBottom: 16, gap: 10, borderBottomWidth: 1, borderBottomColor: C.line }}>
      <BackLink label={step === 1 ? 'Resumo' : 'Voltar'} onPress={() => router.back()} right={<Txt v="eyebrow" c={C.muted}>Receber turno</Txt>} />
      <Steps total={4} current={step} />
      <Txt v="eyebrow" c={C.muted}>
        Passo {step} de 4 · {STEP_L[step]}
      </Txt>
      <Txt accessibilityRole="header" style={type(28, 400, 0.18, true)}>
        {title}
      </Txt>
    </View>
  );
}

/** Botões de três estados (Conferido / Sem comprovativo / Problema…). */
function Tri({ value, options, onPick }: { value?: string; options: [string, string, string][]; onPick: (k: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {options.map(([k, l, c]) => {
        const on = value === k;
        return (
          <Press key={k} feedback="select" onPress={() => onPick(k)} accessibilityState={{ selected: on }} style={{ flex: 1, minHeight: 34, paddingHorizontal: 6, borderWidth: 1, borderColor: on ? c : C.lineStrong, backgroundColor: on ? c : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <Txt numberOfLines={2} align="center" style={[type(9, 600, 0.12, true), { color: on ? C.paper : C.ink }]}>
              {l}
            </Txt>
          </Press>
        );
      })}
    </View>
  );
}

/** t0 · Receber turno (resumo da conferência). */
export function ReceberTurno() {
  const router = useRouter();
  const h = useHandover();
  const v = handoverView(h);
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <TopBar role="rececao" right={<View style={{ height: 26, paddingHorizontal: 8, backgroundColor: C.ink, justifyContent: 'center' }}><Txt style={[type(9, 600, 0.2, true), { color: C.paper }]}>Recepção</Txt></View>} />
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 8, paddingBottom: 16, gap: 6 }}>
        <Txt v="eyebrow" c={C.muted}>
          Quinta-feira · Turno da tarde
        </Txt>
        <Txt accessibilityRole="header" style={type(30, 400, 0.18, true)}>
          Receber turno
        </Txt>
      </View>
      <Page
        footer={
          <Footer label={v.started ? 'Continuar conferência' : 'Iniciar conferência'} onPress={() => (v.next === 'assumir' && h.done ? router.replace('/rececao/entradas') : router.push(`/receber-turno/${v.next}` as any))}>
            <Press onPress={h.toggleExc} feedback="select" style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
              <Txt v="small">{h.exc ? 'Recebimento sem conferência conjunta' : 'A Celma já saiu?'}</Txt>
              <Txt style={[type(12, 500), { color: '#9a4c08' }]}>{h.exc ? 'Anular' : 'Receber sem ela →'}</Txt>
            </Press>
          </Footer>
        }
      >
        <View style={{ marginHorizontal: GUTTER, backgroundColor: C.sand, padding: 14, gap: 4 }}>
          <Txt v="label" c={C.muted}>
            Turno anterior
          </Txt>
          <Txt style={type(18, 400, 0.04)}>Manhã · 07:00–14:00</Txt>
          <Txt v="small" c={C.muted}>
            Entregue por Celma Bento · {h.exc ? 'já saiu' : 'confirmou às 14:01'}
          </Txt>
          <Txt v="small" c={C.muted}>
            Recebido por Teresa Lunda · tu
          </Txt>
        </View>
        <View style={{ marginHorizontal: GUTTER, marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: C.line }}>
          {v.tiles.map((t, i) => (
            <Animated.View key={t.l} layout={M.layout()} style={{ width: '50%', padding: 14, gap: 4, borderLeftWidth: i % 2 ? 1 : 0, borderTopWidth: i > 1 ? 1 : 0, borderColor: C.line }}>
              <Txt v="label" c={C.muted}>
                {t.l}
              </Txt>
              <Txt style={[type(16, 400), { color: t.tone === 'ok' ? C.ok : t.tone === 'warn' ? C.warn : C.ink }]}>{t.v}</Txt>
            </Animated.View>
          ))}
        </View>
        <Section>
          <Txt v="bodyStrong">O que precisas de fazer?</Txt>
          <Txt v="small" c={C.muted} style={{ marginTop: 4 }}>
            Conferir o dinheiro, verificar os pagamentos e rever as pendências antes de assumir o turno. O progresso fica guardado.
          </Txt>
        </Section>
      </Page>
    </View>
  );
}

/** t1 · Contar dinheiro (às cegas: o esperado só aparece depois). */
export function ContarDinheiro() {
  const router = useRouter();
  const h = useHandover();
  const v = handoverView(h);
  const [err, setErr] = useState('');
  const next = () => {
    if (!h.revealed) {
      if (!v.counted) return fail('Introduz a contagem antes de submeter.');
      haptic(v.dif === 0 ? 'success' : 'warning');
      setErr('');
      return h.reveal();
    }
    if (v.dif !== 0 && !h.opt) return fail('Escolhe como proceder com a diferença.');
    if (v.dif !== 0 && h.just.trim().length < 5) return fail('Escreve uma justificação curta.');
    setErr('');
    router.push('/receber-turno/pagamentos');
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <FlowHeader step={1} title="Contar dinheiro" />
      <Page footer={<Footer label={h.revealed ? 'Continuar' : 'Submeter contagem'} onPress={next} />}>
        {!h.revealed ? (
          <Section first>
            <Note text="Conta a caixa por denominação. O valor esperado só aparece depois de submeteres a contagem." />
          </Section>
        ) : null}
        <Section first={h.revealed}>
          {DENOMS.map((d, i) => {
            const q = h.q[d.k] ?? 0;
            const step = 1;
            return (
              <Row key={d.k} first={i === 0} pad={10}>
                <Txt v="body" style={{ flex: 1 }}>
                  {d.l}
                </Txt>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: h.revealed ? C.line : C.ink }}>
                  <Press disabled={h.revealed} feedback="select" onPress={() => h.setQ(d.k, q - step)} style={{ width: 30, height: 32, alignItems: 'center', justifyContent: 'center' }}>
                    <Txt style={type(14, 400)}>−</Txt>
                  </Press>
                  <TextInput
                    editable={!h.revealed}
                    value={String(q)}
                    onChangeText={(t) => h.setQ(d.k, parseInt(t.replace(/\D/g, ''), 10) || 0)}
                    keyboardType="number-pad"
                    accessibilityLabel={d.l}
                    selectTextOnFocus
                    style={[type(14, 500), { width: 52, textAlign: 'center', color: C.ink, paddingVertical: 4, outlineStyle: 'none' } as any]}
                  />
                  <Press disabled={h.revealed} feedback="select" onPress={() => h.setQ(d.k, q + step)} style={{ width: 30, height: 32, alignItems: 'center', justifyContent: 'center' }}>
                    <Txt style={type(14, 400)}>+</Txt>
                  </Press>
                </View>
                <Txt tabular v="body" style={{ width: 70, textAlign: 'right' }}>
                  {kn(q * d.v)}
                </Txt>
              </Row>
            );
          })}
          <View style={{ gap: 8, paddingTop: 12, paddingBottom: 14, borderTopWidth: 1, borderTopColor: C.line }}>
            <Txt v="body">Moedas, cêntimos e outros valores</Txt>
            <MoneyInput value={h.coin} onChangeText={(t) => (h.setCoin(t), setErr(''))} editable={!h.revealed} placeholder="Ex. 12 434,50" accessibilityLabel="Moedas, cêntimos e outros valores" />
            <Txt v="small" c={C.muted}>
              Escreve o valor total em Kz. Aceita milhares e cêntimos.
            </Txt>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.ink }}>
            <Txt v="label" c={C.muted}>
              Dinheiro contado
            </Txt>
            <Txt style={type(24, 300)}>{knc(v.counted)} Kz</Txt>
          </View>
        </Section>
        {h.revealed ? (
          <Animated.View entering={M.enter()}>
            <Section first>
              <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
                {[
                  ['Saldo esperado', SHIFT_EXPECTED_CASH],
                  ['Contado', v.counted],
                ].map(([l, x], i) => (
                  <View key={l as string} style={{ flex: 1, padding: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
                    <Txt v="label" c={C.muted}>
                      {l as string}
                    </Txt>
                    <Txt style={type(22, 300)}>{knc(x as number)} Kz</Txt>
                  </View>
                ))}
              </View>
              <Txt v="tiny" c={C.muted} style={{ marginTop: 8 }}>
                20 000 inicial + 68 000 entradas em dinheiro − 0 reembolsos − 3 000 saídas autorizadas
              </Txt>
              <Animated.View entering={M.pop()} style={{ marginTop: 10, padding: 14, backgroundColor: v.dif === 0 ? C.okBg : C.badBg, gap: 2 }}>
                <Txt v="label" c={v.dif === 0 ? C.ok : C.bad}>
                  {v.dif === 0 ? 'Sem diferença' : 'Diferença por apurar'}
                </Txt>
                <Txt style={[type(30, 300), { color: v.dif === 0 ? C.ok : C.bad }]}>{v.difL}</Txt>
              </Animated.View>
              {v.dif !== 0 ? (
                <View style={{ marginTop: 14, gap: 8 }}>
                  <Txt v="small" c={C.muted}>
                    A diferença não prova, por si só, que houve fraude ou que alguém é responsável.
                  </Txt>
                  <Txt v="bodyStrong">Como pretendes proceder?</Txt>
                  {(
                    [
                      ['recount', 'Recontar o dinheiro', 'Voltar às denominações e corrigir a contagem.'],
                      ['reg', 'Registar divergência', 'Guardar a diferença e receber o turno com ressalva.'],
                      ['rev', 'Pedir revisão do responsável', 'Encaminhar ao dono ou supervisor, sem apagar os registos.'],
                    ] as const
                  ).map(([k, l, d]) => {
                    const on = h.opt === k;
                    return (
                      <Press key={k} feedback="select" scaleTo={0.99} onPress={() => (h.setOpt(k), setErr(''))} style={{ flexDirection: 'row', gap: 12, padding: 12, borderWidth: on ? 2 : 1, borderColor: on ? C.ink : C.line, backgroundColor: on ? '#fff' : 'transparent' }}>
                        <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: C.ink, alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{on ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.ink }} /> : null}</View>
                        <View style={{ flex: 1 }}>
                          <Txt v="bodyStrong">{l}</Txt>
                          <Txt v="small" c={C.muted}>
                            {d}
                          </Txt>
                        </View>
                      </Press>
                    );
                  })}
                  {h.opt === 'reg' || h.opt === 'rev' ? (
                    <Animated.View entering={M.enter()} style={{ gap: 8 }}>
                      <Txt v="eyebrow" c={C.muted}>
                        Justificação
                      </Txt>
                      <TextArea value={h.just} onChangeText={(t) => (h.setJust(t), setErr(''))} placeholder="O que verificaste" />
                    </Animated.View>
                  ) : null}
                </View>
              ) : null}
            </Section>
          </Animated.View>
        ) : null}
        {err ? <Note tone="bad" text={err} style={{ marginHorizontal: GUTTER, marginTop: 12 }} /> : null}
      </Page>
    </View>
  );
}

/** t2 · Outros meios de pagamento. */
export function ConferirPagamentos() {
  const router = useRouter();
  const h = useHandover();
  const v = handoverView(h);
  const [err, setErr] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <FlowHeader step={2} title="Pagamentos" />
      <Page footer={<Footer label="Continuar" onPress={() => (v.payDone ? router.push('/receber-turno/pendencias') : (haptic('error'), setErr('Confere todos os meios de pagamento.')))} />}>
        <Section first>
          <Txt v="small" c={C.muted}>
            Confere cada meio com o registo e os comprovativos. Pagamentos por confirmar não contam como dinheiro em caixa.
          </Txt>
        </Section>
        <Section first>
          {SHIFT_PAYS.map((p, i) => (
            <Reveal key={p.k} i={i}>
              <View style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Txt v="bodyStrong">{p.l}</Txt>
                    <Txt v="small" c={C.muted}>
                      {p.d}
                    </Txt>
                    <Txt v="small" c={C.grey}>
                      Origem · {p.src}
                    </Txt>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 2 }}>
                    <Txt style={[type(11, 400), { color: C.muted }]}>No sistema</Txt>
                    <Txt style={type(15, 400)}>{kn(p.v)} Kz</Txt>
                  </View>
                </View>
                <View style={{ gap: 6 }}>
                  <MoneyInput value={h.payV[p.k] ?? ''} onChangeText={(t) => (h.setPayV(p.k, t), setErr(''))} placeholder="Valor contado" accessibilityLabel={`Valor confirmado de ${p.l}`} height={40} size={15} />
                  {(() => {
                    const ln = v.payLine(p.k);
                    return <Txt style={[type(12, 500), { color: ln.tone === 'ok' ? C.ok : ln.tone === 'bad' ? C.bad : C.muted }]}>{ln.l}</Txt>;
                  })()}
                </View>
                <Tri
                  value={h.pays[p.k]}
                  onPick={(k) => (h.setPay(p.k, k), setErr(''))}
                  options={
                    p.k === 'pen'
                      ? [
                          ['pend', 'Fica pendente', TONES.warn.fg],
                          ['ok', 'Confirmado', TONES.ok.fg],
                          ['prob', 'Problema', TONES.bad.fg],
                        ]
                      : [
                          ['ok', 'Conferido', TONES.ok.fg],
                          ['pend', 'Sem comprovativo', TONES.warn.fg],
                          ['prob', 'Problema', TONES.bad.fg],
                        ]
                  }
                />
              </View>
            </Reveal>
          ))}
          {err ? <Note tone="bad" text={err} style={{ marginTop: 8 }} /> : null}
        </Section>
      </Page>
    </View>
  );
}

/** t3 · Rever pendências. */
export function ReverPendencias() {
  const router = useRouter();
  const h = useHandover();
  const v = handoverView(h);
  const [err, setErr] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <FlowHeader step={3} title="Pendências" />
      <Page footer={<Footer label="Continuar" onPress={() => (v.pendDone ? router.push('/receber-turno/assumir') : (haptic('error'), setErr('Marca todas as pendências.')))} />}>
        <Section first>
          <Txt v="small" c={C.muted}>
            Marca cada caso como recebido, resolvido ou problema. Os que recebes passam a ser teus.
          </Txt>
        </Section>
        <Section first>
          {SHIFT_PENDING.map((p, i) => (
            <Reveal key={p.id} i={i}>
              <View style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                  <Badge label={PENDING_KIND[p.k]![0]} tone={PENDING_KIND[p.k]![1]} />
                  <View style={{ flex: 1 }}>
                    <Txt v="bodyStrong">{p.t}</Txt>
                    <Txt v="small" c={C.muted}>
                      {p.d}
                    </Txt>
                  </View>
                </View>
                <Tri
                  value={h.pend[p.id]}
                  onPick={(k) => (h.setPend(p.id, k), setErr(''))}
                  options={[
                    ['rec', 'Recebido', C.ink],
                    ['res', 'Resolvido', TONES.ok.fg],
                    ['prob', 'Problema', TONES.bad.fg],
                  ]}
                />
              </View>
            </Reveal>
          ))}
          {err ? <Note tone="bad" text={err} style={{ marginTop: 8 }} /> : null}
        </Section>
      </Page>
    </View>
  );
}

/** t4 · Assumir turno (assinatura). */
export function AssumirTurno() {
  const router = useRouter();
  const signIn = useMuntu((s) => s.signIn);
  const h = useHandover();
  const v = handoverView(h);
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const pays = Object.values(h.pays);
  const pv = Object.values(h.pend);
  const sum = [
    { l: 'Dinheiro', d: `${kn(v.counted)} Kz contados · esperado ${kn(SHIFT_EXPECTED_CASH)}`, s: !v.cashDone ? (['Por conferir', 'neutral'] as const) : v.dif === 0 ? (['Conferido', 'ok'] as const) : h.opt === 'rev' ? (['Em revisão', 'bad'] as const) : (['Com ressalva', 'warn'] as const) },
    { l: 'Outros meios', d: '111 500 Kz em TPA, Express e referências', s: !v.payDone ? (['Por conferir', 'neutral'] as const) : pays.includes('prob') ? (['Com problema', 'bad'] as const) : (['Conferidos', 'ok'] as const) },
    { l: 'Pendências', d: `${pv.filter((x) => x === 'rec').length} recebidas · ${pv.filter((x) => x === 'res').length} resolvidas · ${pv.filter((x) => x === 'prob').length} problema`, s: !v.pendDone ? (['Por rever', 'neutral'] as const) : (['Revistas', 'ok'] as const) },
    { l: 'Ocorrências', d: 'Catraca 2 em manutenção', s: ['1 aberta', 'warn'] as const },
  ];
  const confirm = () => {
    if (busy || h.done) return;
    if (!v.cashDone || !v.payDone || !v.pendDone) return fail('Há passos por concluir.');
    if (h.exc && h.excMot.trim().length < 4) return fail('Indica o motivo da ausência da Celma.');
    if (pw.length < 6) return fail('Confirma com a tua senha.');
    setBusy(true);
    setErr('');
    haptic('heavy');
    setTimeout(() => {
      setBusy(false);
      setPw('');
      h.finish();
      haptic(v.dif ? 'warning' : 'success');
    }, 900);
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <FlowHeader step={4} title="Assumir turno" />
      <Page
        footer={
          h.done ? (
            <Footer
              label="Abrir painel da recepção"
              onPress={() => {
                signIn('rececao');
                router.dismissAll?.();
                router.replace('/rececao/entradas');
              }}
            />
          ) : (
            <Footer label={busy ? 'A registar…' : v.cashDone && v.dif !== 0 ? 'Receber com ressalva' : 'Assumir turno'} loading={busy} onPress={confirm} />
          )
        }
      >
        {h.done ? (
          <Animated.View entering={M.pop()} style={{ margin: GUTTER, padding: 18, gap: 8, backgroundColor: v.dif ? C.warnBg : C.okBg }}>
            <Txt v="label" c={v.dif ? C.warn : C.ok}>
              {v.dif ? 'Turno recebido com ressalva' : 'Turno assumido'}
            </Txt>
            <Txt v="body">
              Registado às 14:03 pela hora do servidor. {v.dif ? `A diferença de ${kn(Math.abs(v.dif))} Kz fica associada ao turno da manhã${h.opt === 'rev' ? ' e foi enviada ao dono para revisão.' : ', com a tua justificação.'}` : 'Sem diferenças.'}
              {h.exc ? ' Recebimento sem conferência conjunta, a aguardar o supervisor.' : ''}
            </Txt>
          </Animated.View>
        ) : (
          <>
            <Section first>
              {sum.map((x, i) => (
                <Row key={x.l} first={i === 0}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{x.l}</Txt>
                    <Txt v="small" c={C.muted}>
                      {x.d}
                    </Txt>
                  </View>
                  <Badge label={x.s[0]} tone={x.s[1]} />
                </Row>
              ))}
            </Section>
            {v.cashDone && v.dif !== 0 ? (
              <Section first>
                <Note tone="warn" text="Recebes o turno com ressalva: confirmas que recebeste, mas não que o caixa está correcto. A diferença fica aberta até ser resolvida." />
              </Section>
            ) : null}
            <Section title="Assinaturas">
              <View style={{ backgroundColor: h.exc ? C.warnBg : C.okBg, padding: 12, gap: 4 }}>
                <Txt v="label" c={C.muted}>
                  Entrega · Celma Bento
                </Txt>
                <Txt v="small" c={h.exc ? C.warn : C.ok}>
                  {h.exc ? 'Já saiu. Recebimento sem conferência conjunta, com aprovação do supervisor.' : 'Confirmou os valores declarados às 14:01 ✓'}
                </Txt>
              </View>
              {h.exc ? <Field style={{ marginTop: 12 }} value={h.excMot} onChangeText={h.setExcMot} placeholder="Motivo · obrigatório" /> : null}
              <Field style={{ marginTop: 18 }} label="Recebe · Teresa Lunda · confirma com a tua senha" value={pw} onChangeText={(t) => (setPw(t), setErr(''))} placeholder="••••••••" secureTextEntry textContentType="password" onSubmitEditing={confirm} />
              <Txt v="tiny" c={C.muted} style={{ marginTop: 8 }}>
                A hora é registada pelo servidor. Depois de assumido, os valores não podem ser editados; correcções geram um novo registo.
              </Txt>
              {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
            </Section>
          </>
        )}
      </Page>
    </View>
  );
}
