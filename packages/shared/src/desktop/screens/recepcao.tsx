import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { MuntuLogo } from '../../brand/Logo';
import { MuntuSelo } from '../../brand/Selo';
import { AV, BAN, fill, MEMBERS, Member, PLANS, RULES, SAMPLE, ST } from '../../data/desk';
import { CHARGE_MEMBERS, PAY_MEANS } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn, onlyDigits, phone } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, type } from '../../theme/tokens';
import { Avatar, Button, Checkbox, Chip, ChipGroup, Field, Note, Press, QR, qrCells, Select, Tabs, TextArea, Txt, useToast } from '../../ui';
import { Cols, DPage, KpiRow, Muted, PageHead, Panel, Status, Strong, Table, Tag } from '../kit';
import { HOME, DRole } from '../nav';

const kz = (v: number) => `${v < 0 ? '−' : ''}${kn(v)},00 Kz`;
const ini = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');

const LOGIN_ROLE: Record<string, DRole> = { '924': 'rececao', '925': 'financas', '926': 'pt', '927': 'dono' };

/** d0 · Entrar (equipa). */
export function DLogin() {
  const router = useRouter();
  const signIn = useMuntu((s) => s.signIn);
  const [tel, setTel] = useState('924 310 115');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [forgot, setForgot] = useState(false);
  const entrar = () => {
    const t = onlyDigits(tel);
    if (t.length !== 9) return fail('O número tem 9 dígitos.');
    if (pw.length < 6) return fail('A senha tem pelo menos 6 caracteres.');
    if (t.startsWith('923')) return fail('Membros entram pela app no telemóvel.');
    const r = LOGIN_ROLE[t.slice(0, 3)] ?? 'rececao';
    haptic('success');
    signIn(r);
    setPw('');
    router.replace((r === 'rececao' ? '/receber-turno' : `/${HOME[r]}`) as any);
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  return (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: C.paper, minWidth: 1024 }}>
      <View style={{ flex: 1, paddingHorizontal: 48, paddingVertical: 40, justifyContent: 'space-between', maxWidth: 560 }}>
        <MuntuLogo size={22} />
        <Animated.View entering={FadeInDown.duration(500)} style={{ gap: 26, maxWidth: 380 }}>
          <View style={{ gap: 10 }}>
            <Txt style={[type(10, 600, 0.22, true), { color: C.muted }]}>Recepção, finanças, PT e gestão</Txt>
            <Txt accessibilityRole="header" style={type(40, 400, 0.18, true)}>
              Entrar
            </Txt>
          </View>
          <Field label="Número de telemóvel" prefix="+244" value={tel} onChangeText={(v) => (setTel(phone(v)), setErr(''))} keyboardType="phone-pad" />
          <Field
            label="Senha"
            value={pw}
            placeholder="••••••••"
            secureTextEntry={!show}
            onChangeText={(v) => (setPw(v), setErr(''))}
            onSubmitEditing={entrar}
            right={
              <Press feedback="select" onPress={() => setShow(!show)}>
                <Txt style={[type(10, 600, 0.18, true), { color: C.muted }]}>{show ? 'Ocultar' : 'Mostrar'}</Txt>
              </Press>
            }
          />
          {err ? <Note tone="bad" text={err} /> : null}
          {forgot ? <Note text="Peça ao dono para repor a senha. Recebe uma senha temporária por SMS." /> : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button label="Entrar" size="lg" onPress={entrar} feedback="press" style={{ paddingHorizontal: 28 }} />
            <Press feedback="select" onPress={() => setForgot(!forgot)}>
              <Txt style={[type(13, 400), { color: '#9a4c08' }]}>Esqueci a senha</Txt>
            </Press>
          </View>
          <Muted size={12}>Na recepção, o turno da tarde abre primeiro a conferência do turno anterior.</Muted>
          <Muted size={11}>Protótipo: 924 recepção · 925 finanças · 926 PT · 927 dono</Muted>
        </Animated.View>
        <Press onPress={() => router.push('/criar-conta')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, borderTopWidth: 1, borderTopColor: C.line }}>
          <Txt style={type(13, 400)}>Tens um ginásio?</Txt>
          <Txt style={[type(13, 400), { color: '#9a4c08' }]}>Criar conta na MUNTU →</Txt>
        </Press>
      </View>
      <View style={{ flex: 1.2, backgroundColor: C.accent, padding: 40, justifyContent: 'space-between' }}>
        <Txt style={[type(10, 600, 0.22, true), { alignSelf: 'flex-end' }]}>Gestão de ginásios · Angola</Txt>
        <Animated.View entering={ZoomIn.duration(900).springify().damping(18)} style={{ alignSelf: 'center' }}>
          <MuntuSelo size={300} color={C.ink} grayColor={C.accentDeep} markColor={C.ink} />
        </Animated.View>
        <Txt style={type(10, 600, 0.22, true)}>Copyright ©2026</Txt>
      </View>
    </View>
  );
}

/** d1 · Recepção (painel do turno). */
export function DRececao() {
  const router = useRouter();
  const { smsDone, sendSms } = useMuntu();
  const checkins = [
    ['07:42', 'Ana Domingos', 'Rede · Mensal', 'Talatona', 'pago', ''],
    ['07:38', 'Edson Mateus', 'Local · Mensal', 'Talatona', 'pago', ''],
    ['07:31', 'Joana Kiala', 'Híbrido', 'Kilamba → Talatona', 'rede', '2 de 4 entradas noutra filial'],
    ['07:25', 'Mário Sebastião', 'Local · Trimestral', 'Talatona', 'vencer', 'Vence amanhã · SMS às 10:00'],
    ['07:12', 'Yola Fernandes', 'Local · Mensal', 'Talatona', 'bloq', 'Expirou há 3 dias'],
    ['07:04', 'Nelson Kapinga', 'Rede · Anual', 'Talatona', 'pago', ''],
  ];
  const divida = [
    ['Yola Fernandes', 'Expirou há 3 dias', 30000],
    ['Délcio Ngola', 'Por pagar há 12 dias', 45000],
  ] as const;
  const vencer = [
    ['Mário Sebastião', 'Vence amanhã', 30000],
    ['Paulina Muxima', 'Vence em 3 dias', 45000],
    ['Wilson Tchiyaka', 'Vence em 5 dias', 38000],
  ] as const;
  const byName = (n: string) => MEMBERS.find((m) => m.n === n)?.id ?? '4821';
  const row = (n: string, d: string, v: number, kind: 'cobrar' | 'lembrar') => (
    <View key={n} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
      <View style={{ flex: 1, gap: 2 }}>
        <Strong>{n}</Strong>
        <Muted size={12}>
          {d} · {kz(v).replace(',00', ' 000').replace(' 000 Kz', ',00 Kz')}
        </Muted>
        {smsDone[n] ? <Txt style={[type(11, 400), { color: C.ok }]}>SMS entregue às {smsDone[n]}</Txt> : null}
      </View>
      {kind === 'cobrar' ? (
        <>
          <Button label="SMS" kind="outline" size="xs" disabled={!!smsDone[n]} onPress={() => sendSms([n])} />
          <Button label="Cobrar" size="xs" onPress={() => router.navigate({ pathname: '/cobrar', params: { m: byName(n) } } as any)} />
        </>
      ) : (
        <Button label="Lembrar" kind="outline" size="xs" disabled={!!smsDone[n]} feedback="success" onPress={() => sendSms([n])} />
      )}
    </View>
  );
  return (
    <DPage>
      <PageHead
        title="Recepção"
        sub="Segunda, 26 Outubro · Turno da manhã · Talatona"
        actions={[
          { label: 'Check-in manual', kind: 'outline', onPress: () => router.navigate('/membros') },
          { label: 'Nova inscrição', onPress: () => router.navigate('/inscricao') },
        ]}
      />
      <KpiRow
        hero={{ label: 'Kz · Em caixa desde 07:00', value: 184500, format: (v) => `${kn(v)},00`, action: { label: 'Fechar caixa', onPress: () => router.navigate('/caixa') } }}
        tiles={[
          { v: '42', l: 'Check-ins hoje' },
          { v: '18', l: 'Dentro agora' },
          { v: '02', l: 'Em dívida' },
          { v: '03', l: 'A vencer' },
        ]}
      />
      <Cols flex={[1.6, 1]}>
        <Panel title="Check-ins recentes" i={0}>
          <Table
            cols={[{ l: 'Hora', w: 52 }, { l: 'Membro', flex: 1.3 }, { l: 'Plano' }, { l: 'Filial', flex: 0.9 }, { l: 'Estado', w: 150 }]}
            rows={checkins}
            onRow={(r) => router.navigate({ pathname: '/membros', params: { id: byName(r[1]!) } } as any)}
            render={(r) => [<Muted>{r[0]}</Muted>, <Strong>{r[1]}</Strong>, <Muted>{r[2]}</Muted>, <Muted>{r[3]}</Muted>, <Status l={ST[r[4]!]!.l} c={ST[r[4]!]!.c} why={r[5]} />]}
          />
        </Panel>
        <View style={{ gap: 20 }}>
          <Panel title="Em dívida" dot={C.bad} i={1}>
            {divida.map(([n, d, v]) => row(n, d, v, 'cobrar'))}
          </Panel>
          <Panel title="A vencer" dot={C.amber} i={2}>
            {vencer.map(([n, d, v]) => row(n, d, v, 'lembrar'))}
          </Panel>
        </View>
      </Cols>
    </DPage>
  );
}

/** d2 · Nova inscrição (4 passos com cronómetro). */
export function DInscricao() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [secs, setSecs] = useState(0);
  const [cli, setCli] = useState({ nome: 'Kátia Domingos Muondo', tel: '923 456 789', nasc: '14/08/1996', nif: '' });
  const [plan, setPlan] = useState('rede');
  const [pay, setPay] = useState('express');
  const [payState, setPayState] = useState<'idle' | 'waiting' | 'ok' | 'failed'>('idle');
  const [sent, setSent] = useState(false);
  const [ch, setCh] = useState('SMS');
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (sent) return;
    const i = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [sent]);
  useEffect(() => () => void (t.current && clearTimeout(t.current)), []);
  const p = PLANS.find((x) => x.id === plan)!;
  const steps = ['Cliente', 'Plano', 'Pagamento', 'Acesso'];
  const timer = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  const cobrar = () => {
    setPayState('waiting');
    haptic('press');
    t.current = setTimeout(() => {
      setPayState('ok');
      haptic('success');
      setStep(3);
    }, 3000);
  };
  const welcome = fill(RULES[0]!.tpl, { ...SAMPLE, data: '26/11' });
  const nextDisabled = step === 2 && payState !== 'ok';
  return (
    <DPage>
      <PageHead title="Nova inscrição" sub="Talatona · Uma tarefa, um ecrã">
        <View />
      </PageHead>
      <View style={{ position: 'absolute', right: 40, top: 32, alignItems: 'flex-end' }}>
        <Txt tabular style={type(36, 300)}>
          {timer}
        </Txt>
        <Muted size={11}>Meta 03:00</Muted>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 40, paddingBottom: 20 }}>
        {steps.map((l, i) => (
          <View key={l} style={{ flex: 1, gap: 8 }}>
            <Animated.View layout={LinearTransition} style={{ height: 3, backgroundColor: i < step ? C.ink : i === step ? C.accent : C.line }} />
            <Txt style={[type(10, 600, 0.16, true), { color: i <= step ? C.ink : C.muted }]}>
              0{i + 1} · {l}
            </Txt>
          </View>
        ))}
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <Panel i={0} style={{ minHeight: 340 }}>
          {step === 0 ? (
            <Animated.View key="s0" entering={FadeInDown} style={{ gap: 20 }}>
              <Muted>Dados do cliente</Muted>
              <View style={{ flexDirection: 'row', gap: 32 }}>
                <Field style={{ flex: 1 }} label="Nome completo" value={cli.nome} onChangeText={(v) => setCli({ ...cli, nome: v })} placeholder="Nome e apelido" />
                <Field style={{ flex: 1 }} label="Telefone" value={cli.tel} onChangeText={(v) => setCli({ ...cli, tel: phone(v) })} placeholder="9 dígitos" />
              </View>
              <View style={{ flexDirection: 'row', gap: 32 }}>
                <Field style={{ flex: 1 }} label="Data de nascimento" value={cli.nasc} onChangeText={(v) => setCli({ ...cli, nasc: v })} placeholder="dd/mm/aaaa" />
                <Field style={{ flex: 1 }} label="NIF" value={cli.nif} onChangeText={(v) => setCli({ ...cli, nif: v })} placeholder="Opcional" />
              </View>
              <Muted size={12}>O telefone é o acesso do membro à app. Recebe a senha temporária por SMS no fim da inscrição.</Muted>
            </Animated.View>
          ) : step === 1 ? (
            <Animated.View key="s1" entering={FadeInDown} style={{ flexDirection: 'row', gap: 12 }}>
              {PLANS.map((x) => {
                const on = plan === x.id;
                return (
                  <Press key={x.id} disabled={!!x.disabled} feedback="select" scaleTo={0.98} onPress={() => setPlan(x.id)} style={{ flex: 1, padding: 18, gap: 8, backgroundColor: on ? '#fff' : C.paper, borderWidth: on ? 2 : 1, borderColor: on ? C.ink : C.line, borderTopWidth: on ? 6 : 1, borderTopColor: on ? C.accent : C.line }}>
                    <Txt style={type(11, 600, 0.16, true)}>{x.scope}</Txt>
                    <Txt style={type(20, 500)}>{x.n}</Txt>
                    <Muted size={12}>{x.d}</Muted>
                    <Txt style={type(22, 300)}>{x.p ? `${kn(x.p)} Kz` : '0,00 Kz'}</Txt>
                    {x.note ? <Txt style={[type(11, 400), { color: C.bad }]}>{x.note}</Txt> : null}
                  </Press>
                );
              })}
            </Animated.View>
          ) : step === 2 ? (
            <Animated.View key="s2" entering={FadeInDown} style={{ flexDirection: 'row', gap: 28 }}>
              <View style={{ flex: 1, gap: 8 }}>
                {[
                  ['express', 'Multicaixa Express', 'Push no telemóvel'],
                  ['tpa', 'TPA', 'Cartão'],
                  ['ref', 'Transferência', 'Por referência'],
                  ['dinheiro', 'Dinheiro', 'Conta no caixa'],
                ].map(([id, l, d]) => (
                  <Press key={id} feedback="select" scaleTo={0.99} onPress={() => (setPay(id!), setPayState('idle'))} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderWidth: 1, borderColor: C.line, backgroundColor: pay === id ? C.canvas : 'transparent' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: pay === id ? C.accent : 'transparent', borderWidth: 1, borderColor: C.ink }} />
                    <View>
                      <Strong>{l}</Strong>
                      <Muted size={12}>{d}</Muted>
                    </View>
                  </Press>
                ))}
              </View>
              <View style={{ flex: 1, backgroundColor: C.sand, padding: 20, gap: 12, justifyContent: 'space-between' }}>
                <Muted>
                  {p.n} · Novembro
                </Muted>
                <Txt style={type(40, 300)}>{kn(p.p)} Kz</Txt>
                {payState === 'idle' ? <Button label={`Cobrar ${kn(p.p)} Kz`} size="lg" onPress={cobrar} /> : null}
                {payState === 'waiting' ? (
                  <View style={{ gap: 8 }}>
                    <Note text={`A aguardar confirmação no telemóvel ${cli.tel}…`} />
                    <Button label="Simular falha" kind="outline" size="sm" onPress={() => (t.current && clearTimeout(t.current), setPayState('failed'), haptic('error'))} />
                  </View>
                ) : null}
                {payState === 'failed' ? (
                  <View style={{ gap: 8 }}>
                    <Note tone="bad" text="Pagamento recusado. Tente outro meio ou peça ao cliente para confirmar." />
                    <Button label="Tentar de novo" size="sm" onPress={cobrar} />
                  </View>
                ) : null}
              </View>
            </Animated.View>
          ) : (
            <Animated.View key="s3" entering={FadeInDown} style={{ flexDirection: 'row', gap: 28 }}>
              <View style={{ alignItems: 'center', gap: 10 }}>
                <View style={{ padding: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: C.line }}>
                  <QR size={150} cells={qrCells()} />
                </View>
                <Muted size={12}>QR de acesso activo</Muted>
              </View>
              <View style={{ flex: 1, gap: 12 }}>
                <Strong size={16}>Credenciais da área do cliente</Strong>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  {['SMS', 'WhatsApp'].map((c) => (
                    <Chip key={c} label={c} on={ch === c} onPress={() => setCh(c)} />
                  ))}
                </View>
                <View style={{ backgroundColor: C.sand, padding: 14 }}>
                  <Txt style={type(14, 400)}>{welcome}</Txt>
                </View>
                {sent ? <Note tone="ok" text={`Enviadas por ${ch} · aguarda primeiro acesso`} /> : <Button label={`Enviar por ${ch}`} onPress={() => (setSent(true), haptic('success'))} style={{ alignSelf: 'flex-start' }} />}
              </View>
            </Animated.View>
          )}
        </Panel>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <Button label={step === 0 ? 'Cancelar' : 'Voltar'} kind="outline" onPress={() => (step === 0 ? router.navigate('/rececao') : (setStep(step - 1), setPayState('idle')))} />
          <Button
            label={['Confirmar dados', 'Continuar', 'Continuar', 'Concluir'][step]!}
            disabled={nextDisabled}
            onPress={() => {
              if (step === 3) {
                toast(`${cli.nome.split(' ')[0]} inscrita · ${timer}`);
                router.navigate('/rececao');
              } else setStep(step + 1);
            }}
          />
        </View>
      </View>
    </DPage>
  );
}

const MF: Record<string, string[] | null> = { Todos: null, Activos: ['pago'], 'Em dívida': ['divida', 'bloq'], 'A vencer': ['vencer'], Congelados: ['congelado'], Rede: ['rede'] };

/** d3 · Membros (lista + ficha). */
export function DMembros() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [f, setF] = useState('Todos');
  const [sel, setSel] = useState(params.id && MEMBERS.some((m) => m.id === params.id) ? params.id : '4821');
  const [tab, setTab] = useState('resumo');
  const [cred, setCred] = useState<Record<string, string>>({});
  const [sms, setSms] = useState<{ mid: string; n: string }[]>([]);
  const [comp, setComp] = useState(false);
  const [tpl, setTpl] = useState(0);
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    if (params.id) setSel(params.id);
  }, [params.id]);
  const list = MEMBERS.filter((m) => (!MF[f] || MF[f]!.includes(m.st)) && (!q.trim() || `${m.n} ${m.tel} ${m.id}`.toLowerCase().includes(q.trim().toLowerCase())));
  const M = MEMBERS.find((m) => m.id === sel) ?? MEMBERS[0]!;
  const isRede = M.st === 'rede';
  const late = M.st === 'divida' || M.st === 'bloq';
  const first = M.n.split(' ')[0]!;
  const last = M.n.split(' ').slice(-1)[0]!;
  const strip = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const months = [['01/10', 'Outubro'], ['01/09', 'Setembro'], ['01/08', 'Agosto'], ['01/07', 'Julho'], ['01/06', 'Junho'], ['01/05', 'Maio']];
  const meios = ['Express', 'Express', 'Dinheiro', 'TPA', 'Express', 'Transferência'];
  const pays = isRede ? [] : months.map(([d, mo], i) => ({ d, desc: `${M.plano.includes('Anual') ? 'Prestação ' : 'Mensalidade '}${mo}`, m: meios[i]!, f: `FR TAL/2026/${1184 - i * 203}`, v: kz(M.valor), s: ST[i === 0 && late ? 'divida' : 'pago']! }));
  const tN = M.turno === 'Tarde' ? ['18:40', '19:05', '18:12', '19:30', '18:55', '18:20'] : ['07:15', '06:58', '07:32', '07:05', '06:50', '07:40'];
  const dts = late ? ['26/10', '14/10', '12/10', '10/10', '08/10', '06/10'] : ['26/10', '24/10', '23/10', '21/10', '19/10', '17/10'];
  const entradas = dts.map((d, i) => ({ d: `${d} · ${tN[i]}`, t: isRede ? 'Manhã' : M.turno, f: isRede ? 'Talatona · visita' : i === 2 && M.plano.includes('Rede') ? 'Kilamba' : M.base, m: i === 0 && late ? 'Recusada · pagamento em falta' : i % 3 === 1 ? 'Reconhecimento facial' : 'QR dinâmico', bad: i === 0 && late })).slice(0, isRede ? 3 : 6);
  const avisos = [...sms.filter((x) => x.mid === M.id).map((x) => ({ d: 'Agora', n: x.n, ch: 'SMS', k: 'entregue' })), ...(AV as any)[M.st].map(([d, n, c, k]: string[]) => ({ d, n, ch: c, k }))];
  const prox = { pago: '13/11', vencer: M.d === '01' ? 'Amanhã' : `Em ${Number(M.d)} dias`, divida: 'Em atraso', bloq: 'Expirou 23/10', congelado: '10/11', rede: '—' }[M.st as 'pago'];
  const appL = M.app === 'activa' ? 'Activa' : M.app === 'pendente' ? (cred[M.id] ? 'Enviada' : 'Por activar') : '—';
  const appTxt = M.app === 'activa' ? 'App activa. Último acesso hoje às 07:10. O membro vê o QR, o plano e os pagamentos.' : M.app === 'pendente' ? 'Ainda não entrou na área do cliente. Envie as credenciais para activar o acesso ao QR, plano e pagamentos.' : 'Gerida pelo ginásio de origem.';
  const filiais = isRede ? ['Talatona · visita'] : M.plano.includes('Rede') ? [`${M.base} · base`, ...['Talatona', 'Kilamba', 'Maianga'].filter((x) => x !== M.base)] : [`${M.base} · base`];
  const cobrar = () => router.navigate({ pathname: '/cobrar', params: { m: M.id } } as any);
  const acts: [string, boolean, (() => void) | undefined][] = ({
    pago: [['Check-in', true, () => toast(`Entrada de ${first} registada`)], ['Cobrar', false, cobrar], ['Congelar', false, undefined]],
    vencer: [['Renovar', true, cobrar], ['Check-in', false, () => toast(`Entrada de ${first} registada`)], ['Lembrar por SMS', false, () => toast('Lembrete enviado por SMS')]],
    divida: [[`Cobrar ${kz(M.valor)}`, true, cobrar], ['Pedir excepção', false, () => toast('Pedido enviado ao dono', 'info')]],
    bloq: [['Renovar', true, cobrar], ['Pedir excepção', false, () => toast('Pedido enviado ao dono', 'info')]],
    congelado: [['Descongelar', true, () => toast('Plano reactivado')], ['Ver pedido', false, undefined]],
    rede: [['Libertar acesso', true, () => toast('Acesso libertado')], ['Ver auditoria', false, undefined]],
  } as any)[M.st];
  const TPLS = [['Lembrete', RULES[3]!.tpl], ['Referência', '{ginasio}: {nome}, paga {valor} com a referência {referencia} no Multicaixa Express ou ATM.'], ['Livre', '']];
  const MV = { nome: first, valor: kz(M.valor).replace(',00', ''), data: '01/10', referencia: `00512 884 ${M.id.replace(/\D/g, '').slice(-3)}`, ginasio: 'Mwangolé Fit' };
  const compText = text ?? fill(TPLS[tpl]![1]!, MV);
  const tabs = isRede ? [['resumo', 'Resumo'], ['entradas', 'Entradas']] : [['resumo', 'Resumo'], ['pagamentos', 'Pagamentos'], ['entradas', 'Entradas'], ['avisos', 'Avisos'], ['dados', 'Dados']];
  const curTab = tabs.some(([k]) => k === tab) ? tab : 'resumo';
  return (
    <DPage>
      <PageHead title="Membros" sub="Todas as filiais · base de membros" actions={[{ label: 'Exportar', kind: 'outline', onPress: () => toast('Exportação CSV preparada', 'info') }, { label: 'Nova inscrição', onPress: () => router.navigate('/inscricao') }]} />
      <KpiRow
        hero={{ label: 'Membros activos', value: 1284, format: kn, sub: '+38 novos este mês' }}
        tiles={[
          { v: '46', l: 'Em dívida' },
          { v: '92', l: 'Vencem em 7 dias' },
          { v: '81%', l: 'Retenção 90 dias' },
        ]}
      />
      <Cols flex={[0.55, 1.45]}>
        <View style={{ gap: 12 }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: C.ink }}>
            <TextInput value={q} onChangeText={setQ} placeholder="Nome, telefone ou n.º" placeholderTextColor={C.faint} style={[type(14, 400), { height: 40, color: C.ink, outlineStyle: 'none' } as any]} />
          </View>
          <ChipGroup size="sm" options={Object.keys(MF).map((k) => [k, k] as const)} value={f} onChange={setF} />
          <Muted size={11}>
            {list.length} {list.length === 1 ? 'membro' : 'membros'}
          </Muted>
          <View>
            {list.map((m, i) => (
              <Animated.View key={m.id} entering={FadeInDown.delay(Math.min(i, 10) * 25)} layout={LinearTransition}>
                <Press feedback="select" scaleTo={1} onPress={() => setSel(m.id)} style={({ hovered }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, backgroundColor: sel === m.id ? C.sand : hovered ? C.paper : 'transparent' })}>
                  <Avatar initials={ini(m.n)} size={30} bg={C.paper} />
                  <View style={{ flex: 1 }}>
                    <Strong size={13}>{m.n}</Strong>
                    <Muted size={11}>
                      {m.plano} · {m.base}
                    </Muted>
                  </View>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ST[m.st]!.c }} />
                </Press>
              </Animated.View>
            ))}
            {!list.length ? <Muted>Nenhum membro encontrado.</Muted> : null}
          </View>
        </View>
        <Animated.View key={M.id} entering={FadeIn.duration(260)} style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'flex-start' }}>
            <View style={{ width: 72, height: 72, backgroundColor: C.sand, alignItems: 'center', justifyContent: 'center' }}>
              <Txt style={type(24, 300, 0.1)}>{ini(M.n)}</Txt>
            </View>
            <View style={{ flex: 1, gap: 6 }}>
              <Muted size={12}>
                N.º {M.id} · desde {M.since} · base {M.base}
              </Muted>
              <Txt style={type(26, 400, 0.14, true)}>{M.n}</Txt>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <Status l={ST[M.st]!.l} c={ST[M.st]!.c} />
                <Muted>{M.plano}</Muted>
              </View>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                {acts.map(([l, primary, fn]) => (
                  <Button key={l} label={l} kind={primary ? 'solid' : 'outline'} size="sm" onPress={fn} />
                ))}
              </View>
            </View>
          </View>
          {(BAN as any)[M.st] ? <Note tone={M.st === 'divida' || M.st === 'bloq' ? 'bad' : 'neutral'} text={(BAN as any)[M.st]} /> : null}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {[
              [M.d, isRede ? 'Visitas restantes' : M.st === 'congelado' ? 'Dias em pausa' : 'Dias restantes'],
              [prox, 'Próxima mensalidade'],
              [M.e, 'Entradas este mês'],
              [appL, 'Área do cliente'],
            ].map(([v, l]) => (
              <View key={l} style={{ flex: 1, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 16, gap: 6 }}>
                <Txt numberOfLines={1} adjustsFontSizeToFit style={type(28, 300)}>
                  {v}
                </Txt>
                <Muted size={12}>{l}</Muted>
              </View>
            ))}
          </View>
          <Tabs options={tabs.map(([v, l]) => ({ v: v!, l: l! }))} value={curTab} onChange={setTab} />
          {curTab === 'resumo' ? (
            <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
              <Panel title="Últimos pagamentos" style={{ flex: 1, minWidth: 280 }} pad={20}>
                {pays.slice(0, 3).map((r) => (
                  <View key={r.f} style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line, alignItems: 'center' }}>
                    <Muted size={12}>{r.d}</Muted>
                    <View style={{ flex: 1 }}>
                      <Txt style={type(13, 400)}>{r.desc}</Txt>
                      <Txt style={[type(10, 600, 0.12, true), { color: r.s.c }]}>{r.s.l}</Txt>
                    </View>
                    <Txt style={type(13, 400)}>{r.v}</Txt>
                  </View>
                ))}
                {isRede ? <Muted>Pagamentos e dados ficam no ginásio de origem.</Muted> : null}
              </Panel>
              <Panel title="Últimas entradas" style={{ flex: 1, minWidth: 280 }} pad={20}>
                {entradas.slice(0, 3).map((r) => (
                  <View key={r.d} style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
                    <Muted size={12}>{r.d}</Muted>
                    <View style={{ flex: 1 }}>
                      <Txt style={type(13, 400)}>{r.f}</Txt>
                      <Txt style={[type(12, 400), { color: r.bad ? C.bad : C.muted }]}>{r.m}</Txt>
                    </View>
                  </View>
                ))}
              </Panel>
              <Panel title="Filiais com acesso" style={{ flex: 1, minWidth: 280 }} pad={20}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {filiais.map((x) => (
                    <Tag key={x} l={x} c={C.ink} bg={C.sand} />
                  ))}
                </View>
              </Panel>
              <Panel title="Área do cliente" style={{ flex: 1, minWidth: 280 }} pad={20}>
                <Txt style={type(13, 400)}>{appTxt}</Txt>
                {M.app === 'pendente' && !cred[M.id] ? <Button label="Enviar credenciais por SMS" size="sm" feedback="success" style={{ alignSelf: 'flex-start' }} onPress={() => setCred({ ...cred, [M.id]: '09:52' })} /> : null}
                {cred[M.id] ? <Note tone="ok" text={`Credenciais enviadas por SMS às ${cred[M.id]}. Código válido 24 h.`} /> : null}
              </Panel>
            </View>
          ) : curTab === 'pagamentos' ? (
            <Panel title="Pagamentos · últimos 6 meses" pad={20}>
              <Table cols={[{ l: 'Data', w: 70 }, { l: 'Descrição', flex: 2 }, { l: 'Valor', align: 'right' }, { l: 'Estado', w: 110 }]} rows={pays} render={(r) => [<Muted>{r.d}</Muted>, <View><Txt style={type(14, 400)}>{r.desc}</Txt><Muted size={12}>{`${r.m} · ${r.f}`}</Muted></View>, r.v, <Status l={r.s.l} c={r.s.c} />]} />
            </Panel>
          ) : curTab === 'entradas' ? (
            <Panel title="Entradas · últimos 30 dias" pad={20}>
              <Table cols={[{ l: 'Data' }, { l: 'Turno', flex: 0.6 }, { l: 'Filial' }, { l: 'Método', flex: 1.4 }]} rows={entradas} render={(r) => [<Muted>{r.d}</Muted>, r.t, r.f, <Txt style={[type(14, 400), { color: r.bad ? C.bad : C.grey }]}>{r.m}</Txt>]} />
            </Panel>
          ) : curTab === 'avisos' ? (
            <Panel title="Avisos ao membro" right={<Button label={comp ? 'Cancelar' : 'Enviar SMS'} size="sm" kind={comp ? 'outline' : 'solid'} onPress={() => (setComp(!comp), setText(null))} />} pad={20}>
              {comp ? (
                <Animated.View entering={FadeInDown} style={{ gap: 10, backgroundColor: C.canvas, padding: 14 }}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    {TPLS.map(([l], i) => (
                      <Chip key={l} label={l!} size="sm" on={tpl === i} onPress={() => (setTpl(i), setText(null))} />
                    ))}
                  </View>
                  <TextArea value={compText} onChangeText={setText} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Muted size={12}>
                      {compText.length} caracteres · {Math.max(1, Math.ceil(compText.length / 160))} SMS
                    </Muted>
                    <Button label="Enviar SMS" size="sm" disabled={!compText.trim()} feedback="success" onPress={() => (setSms([{ mid: M.id, n: TPLS[tpl]![0] === 'Livre' ? 'Mensagem livre' : TPLS[tpl]![0]! }, ...sms]), setComp(false), setText(null))} />
                  </View>
                </Animated.View>
              ) : null}
              {avisos.map((r: any, i: number) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
                  <View style={{ flex: 1 }}>
                    <Txt style={type(14, 400)}>{r.n}</Txt>
                    <Muted size={12}>
                      {r.d} · {r.ch}
                    </Muted>
                  </View>
                  <Tag l={ST[r.k]!.l} c={ST[r.k]!.c} bg={ST[r.k]!.bg} />
                </View>
              ))}
              {!avisos.length ? <Muted>Sem avisos.</Muted> : null}
            </Panel>
          ) : (
            <Panel title="Dados pessoais" right={<Button label="Editar" kind="outline" size="sm" />} pad={20}>
              {[
                ['Telefone', M.tel],
                ['NIF', isRede ? '—' : `00${M.id.replace(/\D/g, '')}7LA04`],
                ['Email', isRede ? '—' : `${strip(first)}.${strip(last)}@gmail.com`],
                ['Nascimento', isRede ? '—' : '14/08/1993'],
                ['Contacto de emergência', isRede ? '—' : `Família ${last} · 923 000 112`],
                ['Turno habitual', M.turno],
              ].map(([k, v]) => (
                <View key={k} style={{ flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
                  <Muted>{k}</Muted>
                  <View style={{ flex: 1 }} />
                  <Txt style={type(14, 400)}>{v}</Txt>
                </View>
              ))}
            </Panel>
          )}
        </Animated.View>
      </Cols>
    </DPage>
  );
}

/** dc · Cobrar e facturar (desktop). */
export function DCobrar() {
  const params = useLocalSearchParams<{ m?: string }>();
  const { docs, issueDoc } = useMuntu();
  const fromDesk = params.m ? MEMBERS.find((x) => x.id === params.m) : undefined;
  const opts = useMemo(() => {
    const base = Object.entries(CHARGE_MEMBERS).map(([v, m]) => ({ v, l: m.n + (m.k === 'divida' ? ' · em dívida' : ''), sub: m.d }));
    return fromDesk ? [{ v: `m:${fromDesk.id}`, l: fromDesk.n + (['divida', 'bloq'].includes(fromDesk.st) ? ' · em dívida' : ''), sub: `#${fromDesk.id} · ${fromDesk.plano}` }, ...base] : base;
  }, [fromDesk]);
  const [mem, setMem] = useState(fromDesk ? `m:${fromDesk.id}` : 'MS');
  const cm = mem.startsWith('m:') && fromDesk ? { n: fromDesk.n, d: `#${fromDesk.id} · ${fromDesk.plano}`, tel: fromDesk.tel, k: (['divida', 'bloq'].includes(fromDesk.st) ? 'divida' : fromDesk.st === 'vencer' ? 'vencer' : 'pago') as 'divida', v: fromDesk.valor } : CHARGE_MEMBERS[mem]!;
  const items = [
    { k: 'nov', l: 'Mensalidade Novembro', d: cm.d.split(' · ').slice(1).join(' · '), v: cm.v },
    ...(cm.k === 'divida' ? [{ k: 'out', l: 'Mensalidade Outubro', d: 'Em atraso há 12 dias', v: cm.v }] : []),
    { k: 'pt', l: 'Pacote PT · 8 sessões', d: 'Nuno Sebastião', v: 64000 },
    { k: 'cartao', l: '2ª via do cartão', d: 'Cartão com QR', v: 2500 },
  ];
  const [sel, setSel] = useState<string[] | null>(null);
  const cs = sel ?? (cm.k === 'divida' ? ['out'] : ['nov']);
  const [docT, setDocT] = useState('fr');
  const [meio, setMeio] = useState('TPA');
  const [ch, setCh] = useState(['SMS']);
  const [err, setErr] = useState('');
  const [res, setRes] = useState<null | { title: string; doc: string; v: number; meio: string; tel: string; sms: string; again: boolean }>(null);
  const total = items.filter((i) => cs.includes(i.k)).reduce((a, i) => a + i.v, 0);
  const payNow = docT === 'fr';
  const st = { pago: ST.pago!, divida: ST.divida!, vencer: ST.vencer! }[cm.k as 'pago'] ?? ST.pago!;
  const hist = [...docs, { doc: 'FR TAL/2026/1201', n: 'Ana Domingos', h: '09:12', v: 45000, st: 'SMS entregue', tone: 'ok' as const }, { doc: 'FT TAL/2026/0088', n: 'Celso Pedro', h: '08:47', v: 45000, st: 'Por pagar · SMS entregue', tone: 'warn' as const }, { doc: 'FR TAL/2026/1199', n: 'Kátia Muondo', h: '08:21', v: 30000, st: 'SMS entregue', tone: 'ok' as const }];
  const submit = () => {
    if (!cs.length) return (haptic('error'), setErr('Escolhe pelo menos um item.'));
    const doc = issueDoc({ prefix: payNow ? 'FR' : 'FT', n: cm.n, h: 'Agora', v: total, st: payNow ? 'SMS entregue' : 'Por pagar · SMS entregue', tone: payNow ? 'ok' : 'warn' });
    haptic('success');
    const first = cm.n.split(' ')[0];
    setRes({ title: payNow ? 'Pago e enviado' : 'Factura enviada', doc, v: total, meio: payNow ? meio : 'Por pagar', tel: `${cm.tel} · ${ch.join(' e ') || 'sem envio'}`, sms: `MWANGOLÉ FIT: Olá ${first}, ${payNow ? `recebemos ${kn(total)} Kz. Factura-recibo ${doc}` : `tens a factura ${doc} de ${kn(total)} Kz para pagar até 6 Nov`}. Ver: muntu.ao/f/3HT9`, again: false });
  };
  return (
    <DPage>
      <PageHead title="Cobrar e facturar" sub="Talatona · recepção" />
      <Cols flex={[1.4, 1]}>
        <Panel title="Nova cobrança" i={0}>
          {res ? (
            <Animated.View entering={ZoomIn.springify().damping(16)} style={{ gap: 12 }}>
              <View style={{ backgroundColor: payNow ? C.okBg : C.warnBg, padding: 18, gap: 6 }}>
                <Txt style={[type(10, 600, 0.2, true), { color: payNow ? C.ok : C.warn }]}>{res.title}</Txt>
                <Txt style={type(20, 500)}>{res.doc}</Txt>
                <Muted>
                  {cm.n} · {kn(res.v)} Kz · {res.meio}
                </Muted>
              </View>
              <View style={{ backgroundColor: C.sand, padding: 14, gap: 6 }}>
                <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>SMS enviado para {res.tel}</Txt>
                <Txt style={type(13, 400)}>{res.sms}</Txt>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Button label={res.again ? 'Reenviado ✓' : 'Reenviar SMS'} kind="outline" disabled={res.again} onPress={() => setRes({ ...res, again: true })} />
                <Button label="Nova cobrança" onPress={() => (setRes(null), setSel(null))} />
              </View>
            </Animated.View>
          ) : (
            <View style={{ gap: 18 }}>
              <Select label="Membro" value={mem} onChange={(v) => (setMem(v), setSel(null), setErr(''))} options={opts} />
              <Animated.View key={mem} entering={FadeIn} style={{ backgroundColor: C.sand, padding: 14, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Strong>{cm.n}</Strong>
                  <Muted size={12}>
                    {cm.d} · {cm.tel}
                  </Muted>
                </View>
                <Tag l={st.l} c={st.c} bg={st.bg} />
              </Animated.View>
              <View>
                {items.map((it, i) => {
                  const on = cs.includes(it.k);
                  return (
                    <View key={it.k} style={{ paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
                      <Checkbox on={on} onChange={() => (setSel(on ? cs.filter((x) => x !== it.k) : [...cs, it.k]), setErr(''))} label={it.l} sub={it.d} right={<Txt style={type(14, 400)}>{kn(it.v)} Kz</Txt>} />
                    </View>
                  );
                })}
              </View>
              <View style={{ flexDirection: 'row', gap: 32 }}>
                <View style={{ gap: 8 }}>
                  <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Documento</Txt>
                  <ChipGroup options={[['fr', 'Factura-recibo'], ['ft', 'Factura · paga depois']]} value={docT} onChange={setDocT} />
                </View>
                <View style={{ gap: 8 }}>
                  <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Enviar por</Txt>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    {['SMS', 'WhatsApp'].map((c) => (
                      <Chip key={c} label={c} on={ch.includes(c)} onPress={() => setCh(ch.includes(c) ? ch.filter((x) => x !== c) : [...ch, c])} />
                    ))}
                  </View>
                </View>
              </View>
              {payNow ? (
                <View style={{ gap: 8 }}>
                  <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Meio de pagamento</Txt>
                  <ChipGroup options={PAY_MEANS.map((m) => [m, m] as const)} value={meio as any} onChange={setMeio} />
                </View>
              ) : null}
              <View style={{ backgroundColor: C.accent, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Txt style={type(13, 500)}>Kz · Total</Txt>
                  <Txt style={type(12, 400)}>
                    {cs.length} {cs.length === 1 ? 'item' : 'itens'} · {payNow ? meio : 'a pagar até 6 Nov'}
                  </Txt>
                </View>
                <Txt style={type(36, 300)}>{kn(total)}</Txt>
              </View>
              {err ? <Note tone="bad" text={err} /> : null}
              <Button label={payNow ? 'Cobrar e emitir factura-recibo' : 'Emitir factura e enviar'} size="lg" onPress={submit} feedback="press" />
            </View>
          )}
        </Panel>
        <Panel title="Documentos de hoje" right={<Muted size={12}>{`${hist.length} emitidos`}</Muted>} i={1}>
          {hist.map((h, i) => (
            <Animated.View key={h.doc + i} entering={FadeInDown.delay(i * 30)} style={{ flexDirection: 'row', paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
              <View style={{ flex: 1 }}>
                <Strong size={13}>{h.doc}</Strong>
                <Muted size={12}>
                  {h.n} · {h.h}
                </Muted>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Txt style={type(13, 400)}>{kn(h.v)}</Txt>
                <Txt style={[type(9, 600, 0.12, true), { color: h.tone === 'ok' ? C.ok : C.warn }]}>{h.st}</Txt>
              </View>
            </Animated.View>
          ))}
        </Panel>
      </Cols>
    </DPage>
  );
}
