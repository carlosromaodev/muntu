import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MuntuLogo } from '../../brand/Logo';
import { haptic } from '../../lib/haptics';
import { kn, onlyDigits, phone } from '../../lib/format';
import { IMPORT_KINDS, onboardingCounts, useOnboarding } from '../../store/onboarding';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { Button, Checkbox, Chip, Field, Note, Press, Progress, Reveal, Row, Select, TextArea, Txt } from '../../ui';
import { BackLink, Footer, Page, Section, StackScreen, Steps } from '../Layout';

const LABELS = ['Responsável', 'Ginásio e filiais', 'Importar dados', 'Confirmar dados', 'Enviar credenciais'];
const ROUTES = ['/criar-conta', '/criar-conta/ginasio', '/criar-conta/importar', '/criar-conta/confirmar', '/criar-conta/avisar'];

function ObHeader({ step, title }: { step: number; title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: C.line }}>
      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: GUTTER, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <BackLink label={step === 1 ? 'Entrar' : 'Voltar'} />
        <MuntuLogo size={18} />
      </View>
      <View style={{ paddingHorizontal: GUTTER, paddingBottom: 16, gap: 8 }}>
        <Steps total={5} current={step} />
        <Txt v="eyebrow" c={C.muted}>
          Passo {step} de 5 · {LABELS[step - 1]}
        </Txt>
      </View>
      <View style={{ paddingHorizontal: GUTTER, paddingBottom: 18 }}>
        <Txt accessibilityRole="header" style={type(28, 400, 0.18, true)}>
          {title}
        </Txt>
      </View>
    </View>
  );
}

function useStep(step: number) {
  const router = useRouter();
  const [err, setErr] = useState('');
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  const next = () => {
    setErr('');
    router.push(ROUTES[step] as any);
  };
  return { err, setErr, fail, next };
}

/** a1 · Criar conta · responsável. */
export function ObConta() {
  const o = useOnboarding();
  const { err, setErr, fail, next } = useStep(1);
  const go = () => {
    if (o.nome.trim().split(/\s+/).length < 2) return fail('Indica o nome e o apelido.');
    if (onlyDigits(o.tel).length !== 9) return fail('O telemóvel tem 9 dígitos.');
    if (o.pw.length < 8) return fail('A senha tem pelo menos 8 caracteres.');
    next();
  };
  const upd = (p: Partial<typeof o>) => (o.set(p), setErr(''));
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <ObHeader step={1} title="Criar conta" />
      <Page footer={<Footer label="Continuar" onPress={go} />}>
        <Section first>
          <View style={{ gap: 20 }}>
            <Txt v="body" c={C.grey}>
              A conta do dono do ginásio. Depois juntas filiais, equipa e membros.
            </Txt>
            <Field label="Nome do responsável" big value={o.nome} onChangeText={(v) => upd({ nome: v })} placeholder="Ex. Paulo Neto" autoCapitalize="words" />
            <Field label="Telemóvel" big prefix="+244" value={o.tel} onChangeText={(v) => upd({ tel: phone(v) })} keyboardType="phone-pad" />
            <Field label="Email" big value={o.email} onChangeText={(v) => upd({ email: v })} placeholder="Para facturas da MUNTU" keyboardType="email-address" autoCapitalize="none" />
            <Field label="Senha" big value={o.pw} onChangeText={(v) => upd({ pw: v })} placeholder="Mínimo 8 caracteres" secureTextEntry />
            {err ? <Note tone="bad" text={err} /> : null}
          </View>
        </Section>
      </Page>
    </View>
  );
}

/** a2 · O ginásio e as filiais. */
export function ObGinasio() {
  const o = useOnboarding();
  const { err, setErr, fail, next } = useStep(2);
  const go = () => {
    if (o.gym.trim().length < 3) return fail('Indica o nome do ginásio.');
    if (!o.fils.some((f) => f.trim())) return fail('Junta pelo menos uma filial.');
    next();
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <ObHeader step={2} title="O ginásio" />
      <Page footer={<Footer label="Continuar" onPress={go} />}>
        <Section first>
          <View style={{ gap: 18 }}>
            <Field label="Nome do ginásio" big value={o.gym} onChangeText={(v) => (o.set({ gym: v }), setErr(''))} />
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Field style={{ flex: 1 }} label="NIF" value={o.nif} onChangeText={(v) => o.set({ nif: v })} keyboardType="number-pad" />
              <Select style={{ flex: 1 }} label="Cidade" value={o.city} onChange={(v) => o.set({ city: v })} options={['Luanda', 'Benguela', 'Huambo', 'Lobito', 'Lubango', 'Cabinda'].map((v) => ({ v, l: v }))} />
            </View>
          </View>
        </Section>
        <Section title="Filiais" right={<Txt v="label" c={C.muted}>{`${o.fils.length} ${o.fils.length === 1 ? 'filial' : 'filiais'}`}</Txt>}>
          {o.fils.map((f, i) => (
            <Animated.View key={i} entering={FadeInDown} exiting={FadeOut} layout={LinearTransition} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, paddingVertical: 4 }}>
              <Txt v="small" c={C.muted} style={{ width: 22 }}>
                {String(i + 1).padStart(2, '0')}
              </Txt>
              <Field style={{ flex: 1 }} value={f} placeholder="Nome da filial" onChangeText={(v) => o.set({ fils: o.fils.map((x, j) => (j === i ? v : x)) })} />
              {o.fils.length > 1 ? (
                <Press feedback="select" accessibilityLabel={`Remover ${f}`} onPress={() => o.set({ fils: o.fils.filter((_, j) => j !== i) })} style={{ padding: 8 }}>
                  <Txt style={type(16, 300)}>×</Txt>
                </Press>
              ) : null}
            </Animated.View>
          ))}
          <Button label="+ Adicionar filial" kind="outline" full style={{ marginTop: 12 }} onPress={() => o.set({ fils: [...o.fils, ''] })} />
          {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
        </Section>
      </Page>
    </View>
  );
}

/** Lista de planilhas a importar (usada no onboarding e em Conta › Importar). */
function ImportKinds() {
  const o = useOnboarding();
  const { slug } = onboardingCounts(o);
  const [showErr, setShowErr] = useState<Record<string, boolean>>({});
  return (
    <>
      {IMPORT_KINDS.map((k, idx) => {
        const ld = !!o.imported[k.k];
        const mg = !!o.merge[k.k];
        return (
          <Reveal key={k.k} i={idx}>
            <Animated.View layout={LinearTransition} style={{ borderWidth: 1, borderColor: ld ? C.ink : C.line, backgroundColor: ld ? '#fff' : 'transparent', padding: 14, gap: 12, marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Txt v="bodyStrong">{k.l}</Txt>
                  <Txt v="small" c={C.muted}>
                    {k.d}
                  </Txt>
                </View>
                {!ld ? <Button label="Carregar" size="sm" feedback="success" onPress={() => o.set({ imported: { ...o.imported, [k.k]: true } })} /> : null}
              </View>
              {!ld ? (
                <View style={{ height: 52, borderWidth: 1, borderStyle: 'dashed', borderColor: C.lineStrong, alignItems: 'center', justifyContent: 'center' }}>
                  <Txt v="small" c={C.faint}>
                    Arrasta ou escolhe · .xlsx · .csv
                  </Txt>
                </View>
              ) : (
                <Animated.View entering={FadeInDown} style={{ gap: 10 }}>
                  <Txt v="small">
                    {k.f}
                    {slug}.xlsx · {k.lines}
                  </Txt>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                    {k.cols.map(([n, ok]) => (
                      <View key={n} style={{ paddingVertical: 3, paddingHorizontal: 6, backgroundColor: ok ? C.okBg : C.sand }}>
                        <Txt style={[type(10, 500), { color: ok ? C.ok : C.muted }]}>{n + (ok ? ' ✓' : ' · ignorar')}</Txt>
                      </View>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'row', backgroundColor: C.canvas }}>
                    {[
                      [kn(k.ok + (mg ? k.dup : 0)), 'Válidos', C.ok],
                      [String(k.dup), 'Duplicados', k.dup ? C.warn : C.grey],
                      [String(k.bad), 'Com erro', k.bad ? C.bad : C.grey],
                    ].map(([v, l, c]) => (
                      <View key={l} style={{ flex: 1, padding: 10, gap: 2 }}>
                        <Txt style={[type(18, 400), { color: c }]}>{v}</Txt>
                        <Txt v="label" c={C.muted}>
                          {l}
                        </Txt>
                      </View>
                    ))}
                  </View>
                  <Checkbox on={mg} onChange={() => o.set({ merge: { ...o.merge, [k.k]: !mg } })} label="Fundir duplicados pelo telefone" />
                  <Press disabled={!k.bad} feedback="select" onPress={() => setShowErr({ ...showErr, [k.k]: !showErr[k.k] })}>
                    <Txt v="small" c={k.bad ? C.bad : C.muted}>
                      {k.bad ? (showErr[k.k] ? 'Ocultar erros' : `Ver ${k.bad} erros · ficam de fora`) : 'Sem erros'}
                    </Txt>
                  </Press>
                  {showErr[k.k] && k.bad
                    ? k.errs.map(([l, n, p]) => (
                        <Animated.View key={l} entering={FadeInDown} style={{ backgroundColor: C.badBg, padding: 8 }}>
                          <Txt v="small">
                            Linha {l} · {n}
                          </Txt>
                          <Txt v="tiny" c={C.bad}>
                            {p}
                          </Txt>
                        </Animated.View>
                      ))
                    : null}
                </Animated.View>
              )}
            </Animated.View>
          </Reveal>
        );
      })}
    </>
  );
}

/** a3 · Importar dados (onboarding). */
export function ObImportar() {
  const o = useOnboarding();
  const { next } = useStep(3);
  const has = Object.keys(o.imported).length > 0;
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <ObHeader step={3} title="Importar dados" />
      <Page footer={<Footer label={has ? 'Rever e confirmar' : 'Continuar sem importar'} onPress={next} />}>
        <Section first>
          <Txt v="small" c={C.grey} style={{ marginBottom: 14 }}>
            Planilha Excel ou CSV, ou exportação do sistema antigo. Nada é gravado antes de confirmares.
          </Txt>
          <ImportKinds />
          <Txt v="small" c={C.muted}>
            Também podes começar sem importar e inscrever membros na recepção.
          </Txt>
        </Section>
      </Page>
    </View>
  );
}

/** Conta › Importar dados (dono já com conta). */
export function Importar() {
  const o = useOnboarding();
  const [err, setErr] = useState('');
  return (
    <StackScreen
      back="Conta"
      eyebrow="MWANGOLÉ FIT · importação assistida"
      title="Importar dados"
      footer={
        <Footer
          label={o.imDone ? 'Importado ✓' : 'Confirmar importação'}
          disabled={o.imDone}
          onPress={() => {
            if (!Object.keys(o.imported).length) {
              haptic('error');
              return setErr('Carrega pelo menos uma planilha.');
            }
            haptic('success');
            setErr('');
            o.set({ imDone: true });
          }}
        />
      }
    >
      <Section first>
        <Txt v="small" c={C.grey} style={{ marginBottom: 14 }}>
          Planilha Excel ou CSV, ou exportação do sistema antigo. Nada é gravado antes de confirmares.
        </Txt>
        <ImportKinds />
        {err ? <Note tone="bad" text={err} /> : null}
      </Section>
    </StackScreen>
  );
}

/** a4 · Confirmar dados. */
export function ObConfirmar() {
  const o = useOnboarding();
  const { memN, stfN } = onboardingCounts(o);
  const { err, setErr, fail, next } = useStep(4);
  const fils = o.fils.filter(Boolean);
  const rows = [
    ['Ginásio', `${o.gym || '—'} · NIF ${o.nif || '—'}`, o.city, C.ink],
    ['Filiais', fils.join(', ') || '—', String(fils.length), C.ink],
    ['Membros a importar', o.imported.mem ? (o.merge.mem ? '23 duplicados fundidos' : '23 duplicados por rever') : 'Sem importação', kn(memN), C.ink],
    ['Funcionários', o.imported.stf ? 'Recebem acesso pela função' : 'Sem importação', String(stfN), C.ink],
    ['Linhas com erro', o.imported.mem ? 'Ficam de fora · corriges depois' : '—', o.imported.mem ? '6' : '0', o.imported.mem ? C.bad : C.ink],
  ] as const;
  const plans = o.imported.mem
    ? [
        ['Local Mensal', 30000, 412],
        ['Rede Mensal', 45000, 286],
        ['Híbrido', 38000, 516],
      ]
    : [];
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <ObHeader step={4} title="Confirmar" />
      <Page footer={<Footer label="Confirmar dados" onPress={() => (o.ok ? next() : fail('Confirma os dados para continuar.'))} />}>
        <Section first>
          {rows.map(([l, d, v, c], i) => (
            <Row key={l} first={i === 0}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="body">{l}</Txt>
                <Txt v="tiny" c={C.muted}>
                  {d}
                </Txt>
              </View>
              <Txt style={[type(18, 400), { color: c }]}>{v}</Txt>
            </Row>
          ))}
        </Section>
        <Section title="Planos encontrados">
          {plans.length ? (
            plans.map(([n, v, m], i) => (
              <Row key={n} first={i === 0} pad={10}>
                <Txt v="body" style={{ flex: 1 }}>
                  {n}
                </Txt>
                <Txt v="small" c={C.muted}>
                  {kn(v as number)} Kz · {m} membros
                </Txt>
              </Row>
            ))
          ) : (
            <Txt v="small" c={C.muted}>
              Ainda sem planos · cria-os depois em Planos.
            </Txt>
          )}
        </Section>
        <Section>
          <View style={{ backgroundColor: C.sand, padding: 14 }}>
            <Checkbox on={o.ok} onChange={(v) => (o.set({ ok: v }), setErr(''))} label="Confirmo que os dados estão correctos e que os membros aceitaram ser contactados pelo ginásio." />
          </View>
          {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
        </Section>
      </Page>
    </View>
  );
}

/** a5 · Avisar todos (credenciais por SMS). */
export function ObAvisar() {
  const router = useRouter();
  const signIn = useMuntu((s) => s.signIn);
  const o = useOnboarding();
  const { memN, stfN, total, text } = onboardingCounts(o);
  const pv = text.replace('{senha}', 'KM-4821').replace('{nome}', 'Kátia');
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => void (t.current && clearInterval(t.current)), []);
  const send = () => {
    if (!total) return;
    haptic('press');
    if (o.when !== 'now') return o.set({ smSt: 'done' });
    o.set({ smSt: 'sending', smSent: 0 });
    let n = 0;
    t.current = setInterval(() => {
      n = Math.min(total, n + Math.ceil(total / 8));
      o.set({ smSent: n });
      if (n >= total) {
        clearInterval(t.current!);
        haptic('success');
        o.set({ smSt: 'done' });
      }
    }, 300);
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <ObHeader step={5} title="Avisar todos" />
      <Page
        footer={
          o.smSt === 'form' ? (
            <Footer label={total ? (o.when === 'now' ? `Enviar a ${kn(total)} pessoas` : 'Agendar para amanhã') : 'Ninguém seleccionado'} disabled={!total} onPress={send} />
          ) : o.smSt === 'done' ? (
            <Footer
              label="Entrar no painel"
              onPress={() => {
                signIn('dono');
                router.dismissAll?.();
                router.replace('/dono/painel');
              }}
            />
          ) : undefined
        }
      >
        {o.smSt === 'form' ? (
          <>
            <Section first>
              <Txt v="small" c={C.grey} style={{ marginBottom: 10 }}>
                Cada pessoa recebe uma SMS com o seu número de acesso e uma senha temporária.
              </Txt>
              {[
                ['mem', 'Membros', memN ? `${kn(memN)} com telefone válido` : 'Nenhum importado'],
                ['stf', 'Funcionários', stfN ? `${stfN} pessoas` : 'Nenhum importado'],
              ].map(([k, l, d], i) => (
                <View key={k} style={{ paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
                  <Checkbox on={!!o.aud[k!]} onChange={() => o.set({ aud: { ...o.aud, [k!]: !o.aud[k!] } })} label={l} sub={d} />
                </View>
              ))}
            </Section>
            <Section title="Mensagem">
              <TextArea value={text} onChangeText={(v) => o.set({ text: v })} />
              <View style={{ backgroundColor: C.sand, padding: 12, gap: 6, marginTop: 10 }}>
                <Txt v="label" c={C.muted}>
                  Pré-visualização · Kátia Muondo
                </Txt>
                <Txt v="small">{pv}</Txt>
              </View>
              <Txt v="tiny" c={C.muted} style={{ marginTop: 6 }}>
                {pv.length} caracteres · {pv.length > 160 ? '2 SMS por pessoa' : '1 SMS por pessoa'}
              </Txt>
            </Section>
            <Section title="Quando">
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <Chip label="Enviar agora" on={o.when === 'now'} onPress={() => o.set({ when: 'now' })} />
                <Chip label="Amanhã · 09:00" on={o.when === 'tom'} onPress={() => o.set({ when: 'tom' })} />
              </View>
              <View style={{ marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.accent, padding: 14 }}>
                <View>
                  <Txt v="label">SMS a enviar</Txt>
                  <Txt v="tiny">Incluídas 2 000 SMS no arranque · restam {kn(Math.max(0, 2000 - total))}</Txt>
                </View>
                <Txt style={type(28, 300)}>{kn(total)}</Txt>
              </View>
            </Section>
          </>
        ) : o.smSt === 'sending' ? (
          <Animated.View entering={FadeIn} style={{ padding: GUTTER, gap: 12 }}>
            <Txt v="label" c={C.muted}>
              A enviar
            </Txt>
            <Txt style={type(48, 300)}>
              {kn(o.smSent)} <Txt v="body" c={C.muted}>{`de ${kn(total)}`}</Txt>
            </Txt>
            <Progress value={total ? o.smSent / total : 0} color={C.accent} height={6} />
          </Animated.View>
        ) : (
          <Animated.View entering={ZoomIn.springify().damping(14)} style={{ padding: GUTTER, gap: 12 }}>
            <View style={{ backgroundColor: C.okBg, padding: 18, gap: 8 }}>
              <Txt v="label" c={C.ok}>
                Credenciais enviadas
              </Txt>
              <Txt v="body">{o.when === 'now' ? `${kn(Math.max(0, total - 8))} entregues. Cada pessoa já pode entrar na app.` : `Agendado para amanhã às 09:00 · ${kn(total)} pessoas.`}</Txt>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.sand, padding: 12 }}>
              <Txt v="small" style={{ flex: 1 }}>
                {o.retry ? '8 reenviadas · 3 entregues' : o.when === 'now' ? '8 falharam · número inválido' : 'Podes cancelar até lá'}
              </Txt>
              {!o.retry ? <Button label={o.when === 'now' ? 'Reenviar' : 'Cancelar'} kind="outline" size="sm" onPress={() => o.set({ retry: true })} /> : null}
            </View>
          </Animated.View>
        )}
      </Page>
    </View>
  );
}
