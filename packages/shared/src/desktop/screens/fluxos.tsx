import React, { useState } from 'react';
import { ScrollView, TextInput, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { MuntuLogo } from '../../brand/Logo';
import { DENOMS, PENDING_KIND, SHIFT_EXPECTED_CASH, SHIFT_PAYS, SHIFT_PENDING } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn, knc, onlyDigits, phone } from '../../lib/format';
import { handoverView, useHandover } from '../../store/handover';
import { IMPORT_KINDS, onboardingCounts, useOnboarding } from '../../store/onboarding';
import { useMuntu } from '../../store/useMuntu';
import { C, TONES, type } from '../../theme/tokens';
import { M, Avatar, Button, Checkbox, Chip, Field, MoneyInput, Note, Press, Select, TextArea, Txt } from '../../ui';
import { Muted, Strong, Tag } from '../kit';

const TONE = { ok: [C.ok, C.okBg], warn: [C.warn, C.warnBg], bad: [C.bad, C.badBg], neutral: [C.grey, C.sand] } as const;

function Tri({ value, options, onPick }: { value?: string; options: [string, string, string][]; onPick: (k: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {options.map(([k, l, c]) => {
        const on = value === k;
        return (
          <Press key={k} feedback="select" onPress={() => onPick(k)} style={{ height: 34, paddingHorizontal: 12, borderWidth: 1, borderColor: on ? c : C.lineStrong, backgroundColor: on ? c : 'transparent', justifyContent: 'center' }}>
            <Txt style={[type(10, 600, 0.12, true), { color: on ? C.paper : C.ink }]}>{l}</Txt>
          </Press>
        );
      })}
    </View>
  );
}

/** dt · Receber turno (desktop, passo a passo). */
export function DReceberTurno() {
  const router = useRouter();
  const signIn = useMuntu((s) => s.signIn);
  const h = useHandover();
  const v = handoverView(h);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const fail = (m: string) => (haptic('error'), setErr(m));
  const go = (n: number) => (setStep(n), setErr(''));
  const { width } = useWindowDimensions();
  const narrow = width < 900; // passos em faixa horizontal por cima do conteúdo
  const pad = width < 640 ? 20 : width < 1100 ? 28 : 40;
  const badge = (doneS: boolean, warn: boolean) => (doneS ? (warn ? { l: 'Com ressalva', t: 'warn' as const } : { l: 'Feito', t: 'ok' as const }) : { l: 'Por fazer', t: 'neutral' as const });
  const steps = [
    ['Resumo', null],
    ['Contar dinheiro', badge(v.cashDone, v.dif !== 0)],
    ['Pagamentos', badge(v.payDone, Object.values(h.pays).includes('prob'))],
    ['Pendências', badge(v.pendDone, Object.values(h.pend).includes('prob'))],
    ['Assumir turno', badge(h.done, v.dif !== 0)],
  ] as const;
  const confirm = () => {
    if (busy || h.done) return;
    if (!v.cashDone || !v.payDone || !v.pendDone) return fail('Há passos por concluir.');
    if (h.exc && h.excMot.trim().length < 4) return fail('Indica o motivo.');
    if (pw.length < 6) return fail('Confirma com a tua senha.');
    setBusy(true);
    haptic('heavy');
    setTimeout(() => (setBusy(false), setPw(''), h.finish(), haptic(v.dif ? 'warning' : 'success')), 900);
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: pad, borderBottomWidth: 1, borderBottomColor: C.line }}>
        <MuntuLogo size={22} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {width < 520 ? null : <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Recepção · Talatona</Txt>}
          <Avatar initials="TL" size={30} bg={C.ink} fg={C.paper} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: narrow ? 'column' : 'row' }}>
        {narrow ? (
          <View style={{ backgroundColor: C.canvas, borderBottomWidth: 1, borderBottomColor: C.line, paddingTop: 20, paddingHorizontal: pad, gap: 14 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
              <View style={{ gap: 6 }}>
                <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Quinta-feira · Turno da tarde</Txt>
                <Txt style={type(26, 400, 0.16, true)}>Receber turno</Txt>
              </View>
              <Press onPress={h.toggleExc} feedback="select">
                <Txt style={[type(13, 400), { color: '#9a4c08' }]}>{h.exc ? 'Anular recebimento sem conferência' : 'A Celma já saiu? Receber sem ela →'}</Txt>
              </Press>
            </View>
            <Txt style={[type(12, 400), { color: C.grey }]}>Manhã · 07:00–14:00 · entregue por Celma Bento · {h.exc ? 'já saiu' : 'confirmou às 14:01'}</Txt>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 4 }}>
              {steps.map(([l, b], i) => (
                <Press key={l} feedback="select" scaleTo={1} onPress={() => go(i)} accessibilityState={{ selected: step === i }} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 10, borderBottomWidth: 3, borderBottomColor: step === i ? C.accent : 'transparent' }}>
                  <Txt style={type(12, 300)}>0{i}</Txt>
                  <Txt style={type(11, 600, 0.14, true)}>{l}</Txt>
                  {b && b.t !== 'neutral' ? <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: TONE[b.t][0] }} /> : null}
                </Press>
              ))}
            </ScrollView>
          </View>
        ) : (
        <View style={{ width: width < 1100 ? 300 : 340, backgroundColor: C.canvas, borderRightWidth: 1, borderRightColor: C.line, padding: pad, gap: 24 }}>
          <View style={{ gap: 10 }}>
            <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Quinta-feira · Turno da tarde</Txt>
            <Txt style={type(34, 400, 0.18, true)}>Receber turno</Txt>
          </View>
          <View style={{ backgroundColor: C.paper, padding: 16, gap: 4 }}>
            <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Turno anterior</Txt>
            <Txt style={type(18, 400)}>Manhã · 07:00–14:00</Txt>
            <Txt style={[type(13, 400), { color: C.grey }]}>Entregue por Celma Bento · {h.exc ? 'já saiu' : 'confirmou às 14:01'}</Txt>
            <Txt style={[type(13, 400), { color: C.grey }]}>Recebido por Teresa Lunda</Txt>
          </View>
          <View>
            {steps.map(([l, b], i) => (
              <Press key={l} feedback="select" scaleTo={1} onPress={() => go(i)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line, borderLeftWidth: 3, borderLeftColor: step === i ? C.accent : 'transparent', paddingLeft: step === i ? 10 : 0 }}>
                <Txt style={[type(13, 300), { width: 28 }]}>0{i}</Txt>
                <Txt style={[type(12, 600, 0.16, true), { flex: 1 }]}>{l}</Txt>
                {b ? <Tag l={b.l} c={TONE[b.t][0]} bg={TONE[b.t][1]} /> : null}
              </Press>
            ))}
          </View>
          <View style={{ flex: 1 }} />
          <Press onPress={h.toggleExc} feedback="select" style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.line }}>
            <Txt style={type(13, 400)}>{h.exc ? 'Recebimento sem conferência conjunta' : 'A Celma já saiu?'}</Txt>
            <Txt style={[type(13, 400), { color: '#9a4c08' }]}>{h.exc ? 'Anular' : 'Receber sem ela →'}</Txt>
          </Press>
        </View>
        )}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: pad, gap: 20, maxWidth: 820 }}>
          <Animated.View key={step} entering={M.enter()} style={{ gap: 20 }}>
            {step === 0 ? (
              <>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderLeftWidth: 1, borderColor: C.line }}>
                  {v.tiles.map((t) => (
                    <View key={t.l} style={{ flexGrow: 1, flexBasis: 150, padding: 16, gap: 6, borderRightWidth: 1, borderBottomWidth: 1, borderColor: C.line }}>
                      <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>{t.l}</Txt>
                      <Txt style={[type(18, 400), { color: t.tone === 'ok' ? C.ok : t.tone === 'warn' ? C.warn : C.ink }]}>{t.v}</Txt>
                    </View>
                  ))}
                </View>
                <Strong>O que precisas de fazer?</Strong>
                <Muted>Conferir o dinheiro, verificar os pagamentos e rever as pendências antes de assumir o turno. O painel da recepção abre depois. O progresso fica guardado.</Muted>
                <Button label={v.started ? 'Continuar conferência' : 'Iniciar conferência'} size="lg" style={{ alignSelf: 'flex-start' }} onPress={() => go(!v.cashDone ? 1 : !v.payDone ? 2 : !v.pendDone ? 3 : 4)} />
              </>
            ) : step === 1 ? (
              <>
                <Txt style={type(26, 400, 0.16, true)}>Contar dinheiro</Txt>
                {!h.revealed ? <Note text="Conta a caixa por denominação. O valor esperado só aparece depois de submeteres a contagem." /> : null}
                <View>
                  {DENOMS.map((d) => {
                    const q = h.q[d.k] ?? 0;
                    const st = 1;
                    return (
                      <View key={d.k} style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
                        <Txt style={[type(14, 400), { flex: 1 }]}>{d.l}</Txt>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: h.revealed ? C.line : C.ink }}>
                          <Press disabled={h.revealed} feedback="select" onPress={() => h.setQ(d.k, q - st)} style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center' }}>
                            <Txt>−</Txt>
                          </Press>
                          <TextInput editable={!h.revealed} value={String(q)} onChangeText={(x) => h.setQ(d.k, parseInt(x.replace(/\D/g, ''), 10) || 0)} style={[type(14, 500), { width: 70, textAlign: 'center', color: C.ink, outlineStyle: 'none' } as any]} />
                          <Press disabled={h.revealed} feedback="select" onPress={() => h.setQ(d.k, q + st)} style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center' }}>
                            <Txt>+</Txt>
                          </Press>
                        </View>
                        <Txt tabular style={[type(14, 400), { width: 100, textAlign: 'right' }]}>
                          {kn(q * d.v)}
                        </Txt>
                      </View>
                    );
                  })}
                  <View style={{ gap: 8, paddingTop: 12, paddingBottom: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                    <Txt style={type(14, 400)}>Moedas, cêntimos e outros valores</Txt>
                    <MoneyInput value={h.coin} onChangeText={(x) => (h.setCoin(x), setErr(''))} editable={!h.revealed} placeholder="Ex. 12 434,50" accessibilityLabel="Moedas, cêntimos e outros valores" />
                    <Muted size={12}>Escreve o valor total em Kz. Aceita milhares e cêntimos.</Muted>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderTopWidth: 1, borderTopColor: C.ink }}>
                    <Strong>Dinheiro contado</Strong>
                    <Txt style={type(26, 300)}>{knc(v.counted)} Kz</Txt>
                  </View>
                </View>
                {h.revealed ? (
                  <Animated.View entering={M.enter()} style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                      <View style={{ flexGrow: 1, flexBasis: 200, backgroundColor: C.sand, padding: 16 }}>
                        <Muted size={12}>Saldo esperado</Muted>
                        <Txt style={type(24, 300)}>{kn(SHIFT_EXPECTED_CASH)} Kz</Txt>
                      </View>
                      <Animated.View entering={M.fade()} style={{ flexGrow: 1, flexBasis: 200, padding: 16, backgroundColor: v.dif === 0 ? C.okBg : C.badBg }}>
                        <Txt style={[type(12, 500), { color: v.dif === 0 ? C.ok : C.bad }]}>{v.dif === 0 ? 'Sem diferença' : 'Diferença por apurar'}</Txt>
                        <Txt style={[type(24, 300), { color: v.dif === 0 ? C.ok : C.bad }]}>{v.difL}</Txt>
                      </Animated.View>
                    </View>
                    <Muted size={12}>20 000 inicial + 68 000 entradas em dinheiro − 0 reembolsos − 3 000 saídas autorizadas</Muted>
                    {v.dif !== 0 ? (
                      <View style={{ gap: 8 }}>
                        <Muted size={12}>A diferença não prova, por si só, que houve fraude ou que alguém é responsável.</Muted>
                        {(
                          [
                            ['recount', 'Recontar o dinheiro', 'Voltar às denominações e corrigir a contagem.'],
                            ['reg', 'Registar divergência', 'Guardar a diferença e receber o turno com ressalva.'],
                            ['rev', 'Pedir revisão do responsável', 'Encaminhar ao dono, sem apagar os registos.'],
                          ] as const
                        ).map(([k, l, d]) => (
                          <Press key={k} feedback="select" scaleTo={0.99} onPress={() => (h.setOpt(k), setErr(''))} style={{ padding: 12, borderWidth: h.opt === k ? 2 : 1, borderColor: h.opt === k ? C.ink : C.line, backgroundColor: h.opt === k ? '#fff' : 'transparent' }}>
                            <Strong size={13}>{l}</Strong>
                            <Muted size={12}>{d}</Muted>
                          </Press>
                        ))}
                        {h.opt === 'reg' || h.opt === 'rev' ? <TextArea value={h.just} onChangeText={(x) => (h.setJust(x), setErr(''))} placeholder="O que verificaste" /> : null}
                      </View>
                    ) : null}
                  </Animated.View>
                ) : null}
                {err ? <Note tone="bad" text={err} /> : null}
                <Button
                  label={h.revealed ? 'Continuar' : 'Submeter contagem'}
                  size="lg"
                  style={{ alignSelf: 'flex-start' }}
                  onPress={() => {
                    if (!h.revealed) {
                      if (!v.counted) return fail('Introduz a contagem antes de submeter.');
                      haptic(v.dif === 0 ? 'success' : 'warning');
                      return h.reveal();
                    }
                    if (v.dif !== 0 && !h.opt) return fail('Escolhe como proceder com a diferença.');
                    if (v.dif !== 0 && h.just.trim().length < 5) return fail('Escreve uma justificação curta.');
                    go(2);
                  }}
                />
              </>
            ) : step === 2 ? (
              <>
                <Txt style={type(26, 400, 0.16, true)}>Pagamentos</Txt>
                <Muted>Confere cada meio com o registo e os comprovativos. Pagamentos por confirmar não contam como dinheiro em caixa.</Muted>
                {SHIFT_PAYS.map((p) => {
                  const ln = v.payLine(p.k);
                  return (
                  <View key={p.k} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', columnGap: 20, rowGap: 12, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                    <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 220, minWidth: 0, gap: 3 }}>
                      <Strong>{p.l}</Strong>
                      <Muted size={12}>{p.d}</Muted>
                      <Txt style={[type(12, 400), { color: C.grey }]}>Origem · {p.src}</Txt>
                    </View>
                    <View style={{ width: 130, alignItems: 'flex-end', gap: 2 }}>
                      <Muted size={11}>No sistema</Muted>
                      <Txt style={type(15, 400)}>{kn(p.v)} Kz</Txt>
                    </View>
                    <View style={{ width: 200, gap: 6 }}>
                      <MoneyInput value={h.payV[p.k] ?? ''} onChangeText={(x) => (h.setPayV(p.k, x), setErr(''))} placeholder="Valor contado" accessibilityLabel={`Valor confirmado de ${p.l}`} height={40} size={15} />
                      <Txt style={[type(12, 500), { color: ln.tone === 'ok' ? C.ok : ln.tone === 'bad' ? C.bad : C.muted }]}>{ln.l}</Txt>
                    </View>
                    <Tri value={h.pays[p.k]} onPick={(k) => (h.setPay(p.k, k), setErr(''))} options={p.k === 'pen' ? [['pend', 'Fica pendente', TONES.warn.fg], ['ok', 'Confirmado', TONES.ok.fg], ['prob', 'Problema', TONES.bad.fg]] : [['ok', 'Conferido', TONES.ok.fg], ['pend', 'Sem comprovativo', TONES.warn.fg], ['prob', 'Problema', TONES.bad.fg]]} />
                  </View>
                  );
                })}
                {err ? <Note tone="bad" text={err} /> : null}
                <Button label="Continuar" size="lg" style={{ alignSelf: 'flex-start' }} onPress={() => (v.payDone ? go(3) : fail('Confere todos os meios.'))} />
              </>
            ) : step === 3 ? (
              <>
                <Txt style={type(26, 400, 0.16, true)}>Pendências</Txt>
                {SHIFT_PENDING.map((p) => (
                  <View key={p.id} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 16, rowGap: 10, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                    <Tag l={PENDING_KIND[p.k]![0]} c={TONE[PENDING_KIND[p.k]![1] as 'ok'][0]} bg={TONE[PENDING_KIND[p.k]![1] as 'ok'][1]} />
                    <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 220 }}>
                      <Strong>{p.t}</Strong>
                      <Muted size={12}>{p.d}</Muted>
                    </View>
                    <Tri value={h.pend[p.id]} onPick={(k) => (h.setPend(p.id, k), setErr(''))} options={[['rec', 'Recebido', C.ink], ['res', 'Resolvido', TONES.ok.fg], ['prob', 'Problema', TONES.bad.fg]]} />
                  </View>
                ))}
                {err ? <Note tone="bad" text={err} /> : null}
                <Button label="Continuar" size="lg" style={{ alignSelf: 'flex-start' }} onPress={() => (v.pendDone ? go(4) : fail('Marca todas as pendências.'))} />
              </>
            ) : (
              <>
                <Txt style={type(26, 400, 0.16, true)}>Assumir turno</Txt>
                {h.done ? (
                  <Animated.View entering={M.pop()} style={{ gap: 14 }}>
                    <View style={{ padding: 20, backgroundColor: v.dif ? C.warnBg : C.okBg, gap: 8 }}>
                      <Txt style={[type(11, 600, 0.2, true), { color: v.dif ? C.warn : C.ok }]}>{v.dif ? 'Turno recebido com ressalva' : 'Turno assumido'}</Txt>
                      <Txt style={type(14, 400)}>Registado às 14:03 pela hora do servidor. {v.dif ? `A diferença de ${kn(Math.abs(v.dif))} Kz fica associada ao turno da manhã${h.opt === 'rev' ? ' e foi enviada ao dono.' : ', com a tua justificação.'}` : 'Sem diferenças.'}</Txt>
                    </View>
                    <Button label="Abrir painel da recepção" size="lg" style={{ alignSelf: 'flex-start' }} onPress={() => (signIn('rececao'), router.replace('/rececao'))} />
                  </Animated.View>
                ) : (
                  <>
                    {[
                      ['Dinheiro', `${kn(v.counted)} Kz contados · esperado ${kn(SHIFT_EXPECTED_CASH)}`, !v.cashDone ? ['Por conferir', 'neutral'] : v.dif === 0 ? ['Conferido', 'ok'] : h.opt === 'rev' ? ['Em revisão', 'bad'] : ['Com ressalva', 'warn']],
                      ['Outros meios', '111 500 Kz em TPA, Express e referências', !v.payDone ? ['Por conferir', 'neutral'] : ['Conferidos', 'ok']],
                      ['Pendências', `${Object.values(h.pend).filter((x) => x === 'prob').length} com problema`, !v.pendDone ? ['Por rever', 'neutral'] : ['Revistas', 'ok']],
                      ['Ocorrências', 'Catraca 2 em manutenção', ['1 aberta', 'warn']],
                    ].map(([l, d, s]) => (
                      <View key={l as string} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
                        <View style={{ flex: 1 }}>
                          <Strong>{l as string}</Strong>
                          <Muted size={12}>{d as string}</Muted>
                        </View>
                        <Tag l={(s as string[])[0]!} c={TONE[(s as string[])[1] as 'ok'][0]} bg={TONE[(s as string[])[1] as 'ok'][1]} />
                      </View>
                    ))}
                    {v.cashDone && v.dif !== 0 ? <Note tone="warn" text="Recebes o turno com ressalva: confirmas que recebeste, mas não que o caixa está correcto." /> : null}
                    <View style={{ backgroundColor: h.exc ? C.warnBg : C.okBg, padding: 14 }}>
                      <Muted size={11}>Entrega · Celma Bento</Muted>
                      <Txt style={[type(13, 400), { color: h.exc ? C.warn : C.ok }]}>{h.exc ? 'Já saiu. Recebimento sem conferência conjunta, com aprovação do supervisor.' : 'Confirmou os valores declarados às 14:01 ✓'}</Txt>
                    </View>
                    {h.exc ? <Field value={h.excMot} onChangeText={h.setExcMot} placeholder="Motivo · obrigatório" /> : null}
                    <Field label="Recebe · Teresa Lunda · confirma com a tua senha" value={pw} onChangeText={(x) => (setPw(x), setErr(''))} placeholder="••••••••" secureTextEntry onSubmitEditing={confirm} style={{ maxWidth: 420 }} />
                    {err ? <Note tone="bad" text={err} /> : null}
                    <Button label={busy ? 'A registar…' : v.cashDone && v.dif !== 0 ? 'Receber com ressalva' : 'Assumir turno'} loading={busy} size="lg" style={{ alignSelf: 'flex-start' }} onPress={confirm} />
                  </>
                )}
              </>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}

const NT = ['Responsável', 'Ginásio e filiais', 'Importar dados', 'Confirmar dados', 'Avisar membros e equipa'];

/** dn · Criar conta (desktop). */
export function DCriarConta() {
  const router = useRouter();
  const signIn = useMuntu((s) => s.signIn);
  const o = useOnboarding();
  const { memN, stfN, total, text } = onboardingCounts(o);
  const [n, setN] = useState(1);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const { width } = useWindowDimensions();
  const narrow = width < 900; // faixa laranja por cima em vez da coluna
  const pad = width < 640 ? 20 : width < 1100 ? 32 : 48;
  const fail = (m: string) => (haptic('error'), setErr(m));
  const next = () => {
    if (n === 1) {
      if (o.nome.trim().split(/\s+/).length < 2) return fail('Indica o nome e o apelido.');
      if (onlyDigits(o.tel).length !== 9) return fail('O telemóvel tem 9 dígitos.');
      if (o.pw.length < 8) return fail('A senha tem pelo menos 8 caracteres.');
    }
    if (n === 2 && o.gym.trim().length < 3) return fail('Indica o nome do ginásio.');
    if (n === 4 && !o.ok) return fail('Confirma os dados para continuar.');
    if (n === 5) {
      if (!sent && total) return (setSent(true), haptic('success'));
      signIn('dono');
      return router.replace('/painel');
    }
    setErr('');
    setN(n + 1);
  };
  const cta = n === 3 ? (Object.keys(o.imported).length ? 'Rever e confirmar' : 'Continuar sem importar') : n === 5 ? (sent ? 'Entrar no painel' : total ? `Enviar a ${kn(total)} pessoas` : 'Continuar sem enviar') : 'Continuar';
  return (
    <View style={{ flex: 1, flexDirection: narrow ? 'column' : 'row', backgroundColor: C.paper }}>
      {narrow ? (
        <View style={{ backgroundColor: C.accent, paddingTop: 20, paddingHorizontal: pad, paddingBottom: 18, gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <MuntuLogo size={20} descriptorColor={C.ink} descriptorInk={C.sand2} />
            <Press onPress={() => router.replace('/')}>
              <Txt style={type(12, 400)}>← Já tenho conta</Txt>
            </Press>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {NT.map((l, i) => (
              <Press key={l} feedback="select" scaleTo={1} onPress={() => i + 1 <= n && setN(i + 1)} accessibilityLabel={`Passo ${i + 1} · ${l}`} style={{ flex: 1, height: 4, backgroundColor: i + 1 <= n ? C.ink : 'rgba(29,28,26,.25)' }} />
            ))}
          </View>
        </View>
      ) : (
      <View style={{ width: width < 1100 ? 300 : 360, backgroundColor: C.accent, padding: width < 1100 ? 32 : 40, gap: 28 }}>
        <MuntuLogo size={22} descriptorColor={C.ink} descriptorInk={C.sand2} />
        <Txt style={type(34, 400, 0.18, true)}>Criar conta</Txt>
        <View>
          {NT.map((l, i) => (
            <Press key={l} feedback="select" scaleTo={1} onPress={() => i + 1 <= n && setN(i + 1)} style={{ flexDirection: 'row', gap: 14, paddingVertical: 14, borderTopWidth: 1, borderTopColor: 'rgba(29,28,26,.25)', opacity: i + 1 <= n ? 1 : 0.5 }}>
              <Txt style={[type(13, 300), { width: 28 }]}>0{i + 1}</Txt>
              <Txt style={[type(12, 600, 0.16, true), { flex: 1 }]}>{l}</Txt>
              <Txt style={type(12, 400)}>{i + 1 < n ? '✓' : ''}</Txt>
            </Press>
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <Press onPress={() => router.replace('/')}>
          <Txt style={type(12, 400)}>← Já tenho conta</Txt>
        </Press>
      </View>
      )}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: pad, gap: 24, maxWidth: 780 }}>
        <Animated.View key={n} entering={M.enter()} style={{ gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Passo {n} de 5</Txt>
            <Txt style={type(30, 400, 0.18, true)}>{NT[n - 1]}</Txt>
          </View>
          {n === 1 ? (
            <View style={{ gap: 20 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 32, rowGap: 20 }}>
                <Field style={{ flexGrow: 1, flexBasis: 240 }} label="Nome do responsável" value={o.nome} onChangeText={(x) => (o.set({ nome: x }), setErr(''))} />
                <Field style={{ flexGrow: 1, flexBasis: 240 }} label="Telemóvel" value={o.tel} onChangeText={(x) => (o.set({ tel: phone(x) }), setErr(''))} />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 32, rowGap: 20 }}>
                <Field style={{ flexGrow: 1, flexBasis: 240 }} label="Email" value={o.email} placeholder="Para facturas da MUNTU" onChangeText={(x) => o.set({ email: x })} />
                <Field style={{ flexGrow: 1, flexBasis: 240 }} label="Senha" value={o.pw} placeholder="Mínimo 8 caracteres" secureTextEntry onChangeText={(x) => (o.set({ pw: x }), setErr(''))} />
              </View>
            </View>
          ) : n === 2 ? (
            <View style={{ gap: 20 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 32, rowGap: 20 }}>
                <Field style={{ flexGrow: 2, flexBasis: 260 }} label="Nome do ginásio" value={o.gym} onChangeText={(x) => (o.set({ gym: x }), setErr(''))} />
                <Field style={{ flexGrow: 1, flexBasis: 140 }} label="NIF" value={o.nif} onChangeText={(x) => o.set({ nif: x })} />
                <Select style={{ flexGrow: 1, flexBasis: 140 }} label="Cidade" value={o.city} onChange={(x) => o.set({ city: x })} options={['Luanda', 'Benguela', 'Huambo', 'Lobito', 'Lubango', 'Cabinda'].map((x) => ({ v: x, l: x }))} />
              </View>
              <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Filiais</Txt>
              {o.fils.map((f, i) => (
                <Animated.View key={i} entering={M.enter()} layout={M.layout()} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Muted size={12}>{String(i + 1).padStart(2, '0')}</Muted>
                  <Field style={{ flex: 1 }} value={f} onChangeText={(x) => o.set({ fils: o.fils.map((y, j) => (j === i ? x : y)) })} />
                  {o.fils.length > 1 ? <Button label="Remover" kind="ghost" size="xs" onPress={() => o.set({ fils: o.fils.filter((_, j) => j !== i) })} /> : null}
                </Animated.View>
              ))}
              <Button label="+ Adicionar filial" kind="outline" size="sm" style={{ alignSelf: 'flex-start' }} onPress={() => o.set({ fils: [...o.fils, ''] })} />
            </View>
          ) : n === 3 ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
              {IMPORT_KINDS.map((k) => {
                const ld = !!o.imported[k.k];
                return (
                  <Animated.View key={k.k} layout={M.layout()} style={{ flexGrow: 1, flexBasis: 220, borderWidth: 1, borderColor: ld ? C.ink : C.line, backgroundColor: ld ? '#fff' : 'transparent', padding: 18, gap: 10 }}>
                    <Strong>{k.l}</Strong>
                    <Muted size={12}>{k.d}</Muted>
                    {ld ? (
                      <Animated.View entering={M.enter()} style={{ gap: 8 }}>
                        <Txt style={type(12, 400)}>{`${k.f}${onboardingCounts(o).slug}.xlsx · ${k.lines}`}</Txt>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                          {[
                            [kn(k.ok + k.dup), 'Válidos', C.ok],
                            [String(k.dup), 'Duplicados', C.warn],
                            [String(k.bad), 'Com erro', k.bad ? C.bad : C.grey],
                          ].map(([val, l, c]) => (
                            <View key={l} style={{ flex: 1, backgroundColor: C.canvas, padding: 8 }}>
                              <Txt style={[type(18, 400), { color: c }]}>{val}</Txt>
                              <Muted size={11}>{l}</Muted>
                            </View>
                          ))}
                        </View>
                      </Animated.View>
                    ) : (
                      <Button label="Carregar" size="sm" style={{ alignSelf: 'flex-start' }} onPress={() => o.set({ imported: { ...o.imported, [k.k]: true } })} />
                    )}
                  </Animated.View>
                );
              })}
            </View>
          ) : n === 4 ? (
            <View style={{ gap: 4 }}>
              {[
                ['Ginásio', `${o.gym || '—'} · NIF ${o.nif}`, o.city],
                ['Filiais', o.fils.filter(Boolean).join(', '), String(o.fils.filter(Boolean).length)],
                ['Membros a importar', o.imported.mem ? '23 duplicados fundidos' : 'Sem importação', kn(memN)],
                ['Funcionários', o.imported.stf ? 'Acesso pela função' : 'Sem importação', String(stfN)],
                ['Linhas com erro', o.imported.mem ? 'Ficam de fora · corriges depois' : '—', o.imported.mem ? '6' : '0'],
              ].map(([l, d, val]) => (
                <View key={l} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
                  <View style={{ flex: 1 }}>
                    <Txt style={type(14, 400)}>{l}</Txt>
                    <Muted size={12}>{d}</Muted>
                  </View>
                  <Txt style={type(20, 400)}>{val}</Txt>
                </View>
              ))}
              <View style={{ backgroundColor: C.sand, padding: 14, marginTop: 12 }}>
                <Checkbox on={o.ok} onChange={(x) => (o.set({ ok: x }), setErr(''))} label="Confirmo que os dados estão correctos e que os membros aceitaram ser contactados pelo ginásio." />
              </View>
            </View>
          ) : (
            <View style={{ gap: 14 }}>
              {[
                ['mem', 'Membros', memN ? `${kn(memN)} com telefone válido` : 'Nenhum importado'],
                ['stf', 'Funcionários', stfN ? `${stfN} pessoas` : 'Nenhum importado'],
              ].map(([k, l, d]) => (
                <Checkbox key={k} on={!!o.aud[k!]} onChange={() => o.set({ aud: { ...o.aud, [k!]: !o.aud[k!] } })} label={l} sub={d} />
              ))}
              <TextArea value={text} onChangeText={(x) => o.set({ text: x })} />
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <Chip label="Enviar agora" on={o.when === 'now'} onPress={() => o.set({ when: 'now' })} />
                <Chip label="Amanhã · 09:00" on={o.when === 'tom'} onPress={() => o.set({ when: 'tom' })} />
              </View>
              <Muted size={12}>Pré-visualização · Kátia Muondo</Muted>
              <View style={{ backgroundColor: C.sand, padding: 14 }}>
                <Txt style={type(14, 400)}>{text.replace('{senha}', 'KM-4821')}</Txt>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.accent, padding: 16 }}>
                <Txt style={type(10, 600, 0.2, true)}>SMS a enviar</Txt>
                <Txt style={type(30, 300)}>{kn(total)}</Txt>
              </View>
              {sent ? <Note tone="ok" text={o.when === 'now' ? `${kn(Math.max(0, total - 8))} entregues · 8 falharam (número inválido).` : 'Agendado para amanhã às 09:00.'} /> : null}
            </View>
          )}
          {err ? <Note tone="bad" text={err} /> : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {n > 1 ? <Button label="Voltar" kind="outline" size="lg" onPress={() => (setN(n - 1), setErr(''))} /> : null}
            <Button label={cta} size="lg" onPress={next} feedback="press" />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
