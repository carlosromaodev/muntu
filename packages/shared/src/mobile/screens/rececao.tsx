import React, { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { CHARGE_MEMBERS, CHECKINS, MEMBERS, OCC, OCC_NOW, lotLevel, PAY_MEANS, PLANS, ST, StKey, RISK, RENEWALS } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn, onlyDigits, phone } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { M, Avatar, Badge, Button, Checkbox, Chip, ChipGroup, Field, Note, Press, Reveal, Row, Select, Segmented, Txt, useToast } from '../../ui';
import { LinkCard, Section, TabScreen } from '../Layout';

const stBadge = (k: StKey) => <Badge label={ST[k][0]} tone={ST[k][1]} />;

/** Número de contactos de recuperação por fazer (recepção). */
export function useRecoveryTodo(role: 'rececao' | 'pt' | 'dono') {
  const outcomes = useMuntu((s) => s.outcomes);
  const mine = RISK.filter((r) => role === 'dono' || (role === 'pt' ? r.by === 'pt' && r.resp === 'Nuno Sebastião' : r.by === 'rececao'));
  return mine.filter((r) => !outcomes[r.id]).length + (role === 'pt' ? 0 : RENEWALS.filter((r) => r.days <= 7 && !outcomes[r.id]).length);
}

/** r1 · Entradas ao vivo. */
export function Entradas() {
  const router = useRouter();
  const toast = useToast();
  const { manual, paidCheckins, refusedCheckins, refuseCheckin } = useMuntu();
  const todo = useRecoveryTodo('rececao');
  const now = OCC[OCC_NOW]!;
  const list = [
    ...manual.map((n) => ({ id: `m-${n}`, h: '09:41', n, p: 'Entrada manual', k: 'pago' as StKey, v: 0 })),
    ...CHECKINS,
  ].map((c) => {
    const k: StKey = paidCheckins[c.id] ? 'pago' : refusedCheckins[c.id] ? 'recusou' : c.k;
    return { ...c, k, p: paidCheckins[c.id] ? 'Pago no TPA · entrou' : c.p };
  });
  return (
    <TabScreen role="rececao" eyebrow="Talatona · Turno da manhã" title="Entradas">
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 14, gap: 8 }}>
        <Reveal i={0}>
          <LinkCard dot={C.ok} label="Agora no ginásio" value={`${now} pessoas · ${lotLevel(now)}`} onPress={() => router.push('/ginasio-agora')} />
        </Reveal>
        <Reveal i={1}>
          <LinkCard dot={C.accent} label="Recuperação" value={`${todo} contactos por fazer`} onPress={() => router.push('/recuperacao')} />
        </Reveal>
      </View>
      <Section title={`Ao vivo · ${168 + manual.length} hoje`} right={<Button label="+ Entrada manual" kind="outline" size="sm" onPress={() => router.navigate('/rececao/membros')} />}>
        {list.map((c, i) => (
          <Reveal key={c.id} i={i + 2}>
            <View style={{ paddingVertical: 13, borderTopWidth: 1, borderTopColor: C.line, gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Txt tabular style={[type(15, 300), { width: 44 }]}>
                  {c.h}
                </Txt>
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="bodyStrong">{c.n}</Txt>
                  <Txt v="small" c={C.muted}>
                    {c.p}
                  </Txt>
                </View>
                {stBadge(c.k)}
              </View>
              {c.k === 'divida' ? (
                <Animated.View entering={M.enter()} style={{ flexDirection: 'row', gap: 6, paddingLeft: 56 }}>
                  <Button label={`Cobrar ${kn(c.v)}`} size="sm" style={{ flex: 1, height: 38 }} feedback="press" onPress={() => router.navigate({ pathname: '/rececao/cobrar', params: { m: 'MS', checkin: c.id } } as any)} />
                  <Button
                    label="Não entra"
                    kind="outline"
                    size="sm"
                    style={{ flex: 1, height: 38 }}
                    feedback="warning"
                    onPress={() => {
                      refuseCheckin(c.id);
                      toast(`${c.n} não entrou`, 'info');
                    }}
                  />
                </Animated.View>
              ) : null}
            </View>
          </Reveal>
        ))}
      </Section>
    </TabScreen>
  );
}

/** r2 · Membros (pesquisa + entrada manual). */
export function Membros() {
  const router = useRouter();
  const toast = useToast();
  const [q, setQ] = useState('');
  const { manual, addManualEntry } = useMuntu();
  const list = MEMBERS.filter((m) => !q.trim() || `${m.n} ${m.d}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <TabScreen role="rececao" eyebrow="Talatona · 612 membros" title="Membros">
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 44, paddingHorizontal: 14, backgroundColor: C.sand }}>
          <Txt style={[type(14, 400), { color: C.muted }]}>○</Txt>
          <TextInput value={q} onChangeText={setQ} placeholder="Nome, telefone ou nº de membro" placeholderTextColor={C.faint} style={[type(14, 400), { flex: 1, color: C.ink, outlineStyle: 'none' } as any]} returnKeyType="search" clearButtonMode="while-editing" />
        </View>
      </View>
      <Section first>
        {list.map((p, i) => {
          const can = p.k === 'pago' || p.k === 'vencer';
          const done = manual.includes(p.n);
          return (
            <Reveal key={p.i} i={i}>
              <Row first={i === 0}>
                <Avatar initials={p.i} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="bodyStrong">{p.n}</Txt>
                  <Txt v="small" c={C.muted}>
                    {p.d} · {p.dias}
                  </Txt>
                </View>
                {can ? (
                  <Button
                    label={done ? 'Entrou ✓' : 'Registar entrada'}
                    size="sm"
                    kind={done ? 'soft' : 'solid'}
                    style={done ? { backgroundColor: C.okBg, borderColor: C.okBg } : undefined}
                    feedback={done ? false : 'success'}
                    onPress={() => {
                      if (done) return;
                      addManualEntry(p.n);
                      toast(`Entrada de ${p.n.split(' ')[0]} registada`);
                    }}
                  />
                ) : p.k === 'divida' ? (
                  <Button label="Cobrar" size="sm" kind="danger" onPress={() => router.navigate({ pathname: '/rececao/cobrar', params: { m: p.i } } as any)} />
                ) : (
                  <View style={{ height: 34, paddingHorizontal: 12, borderWidth: 1, borderColor: C.ink, backgroundColor: C.sand, justifyContent: 'center' }}>
                    <Txt style={type(10, 600, 0.14, true)}>{ST[p.k][0]}</Txt>
                  </View>
                )}
              </Row>
            </Reveal>
          );
        })}
        {!list.length ? (
          <Txt v="small" c={C.muted} style={{ paddingVertical: 20 }}>
            Nenhum membro encontrado.
          </Txt>
        ) : null}
      </Section>
    </TabScreen>
  );
}

/** r3 · Inscrever novo membro e cobrar o 1º mês. */
export function Inscrever() {
  const router = useRouter();
  const issueDoc = useMuntu((s) => s.issueDoc);
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [bi, setBi] = useState('');
  const [ref, setRef] = useState('');
  const [plan, setPlan] = useState<(typeof PLANS)[number]['v']>('rede');
  const [meio, setMeio] = useState<(typeof PAY_MEANS)[number]>('TPA');
  const [sms, setSms] = useState(true);
  const [err, setErr] = useState('');
  const [res, setRes] = useState<null | { nome: string; plan: string; doc: string; v: number; sent: boolean; tel: string; sms: string }>(null);
  const p = PLANS.find((x) => x.v === plan)!;
  const refU = ref.trim().toUpperCase();
  const refOk = refU === 'KATIA-4822';
  const selfRef = refOk && onlyDigits(tel) === '923481220';
  const refMsg = !refU ? '' : selfRef ? 'Não elegível: o número é o mesmo do indicador.' : refOk ? 'Indicado por Kátia Muondo · elegível. A recompensa sai quando pagar 2 mensalidades.' : 'Código não encontrado.';

  const submit = () => {
    if (nome.trim().split(/\s+/).length < 2) return fail('Indica o nome e o apelido.');
    if (onlyDigits(tel).length !== 9) return fail('O telemóvel tem 9 dígitos.');
    const first = nome.trim().split(/\s+/)[0];
    const doc = issueDoc({ prefix: 'FR', n: nome.trim(), h: 'Agora', v: p.p, st: 'SMS entregue', tone: 'ok' });
    haptic('success');
    setRes({ nome: nome.trim(), plan: p.l, doc, v: p.p, sent: sms, tel, sms: `MWANGOLÉ FIT: Bem-vindo(a), ${first}! Plano ${p.l} activo até 29 Nov. Factura ${doc} de ${kn(p.p)} Kz: muntu.ao/f/7QX4. Senha temporária: 4821-KM.` });
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };

  if (res)
    return (
      <TabScreen role="rececao" eyebrow="Talatona · novo membro" title="Inscrever">
        <Animated.View entering={M.fade()} style={{ paddingHorizontal: GUTTER, paddingTop: 20, gap: 14 }}>
          <Animated.View entering={M.pop()} style={{ backgroundColor: C.okBg, padding: 18, gap: 8 }}>
            <Txt v="label" c={C.ok}>
              Membro inscrito
            </Txt>
            <Txt style={type(20, 500)}>{res.nome}</Txt>
            <Txt v="small" c={C.muted}>
              Membro #4823 · {res.plan}
            </Txt>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <Txt v="bodyStrong">{res.doc}</Txt>
              <Txt v="bodyStrong">{kn(res.v)} Kz</Txt>
            </View>
          </Animated.View>
          {res.sent ? (
            <View style={{ backgroundColor: C.sand, padding: 14, gap: 6 }}>
              <Txt v="label" c={C.muted}>
                SMS enviado para {res.tel}
              </Txt>
              <Txt v="small">{res.sms}</Txt>
            </View>
          ) : null}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              label="Nova inscrição"
              kind="outline"
              style={{ flex: 1 }}
              onPress={() => {
                setRes(null);
                setNome('');
                setTel('');
                setBi('');
                setRef('');
              }}
            />
            <Button label="Concluir" style={{ flex: 1 }} onPress={() => router.navigate('/rececao/entradas')} />
          </View>
        </Animated.View>
      </TabScreen>
    );

  return (
    <TabScreen role="rececao" eyebrow="Talatona · novo membro" title="Inscrever">
      <Section title="Dados" first>
        <View style={{ gap: 18 }}>
          <Field label="Nome completo" placeholder="Ex. Kátia Muondo" value={nome} onChangeText={(v) => (setNome(v), setErr(''))} autoCapitalize="words" textContentType="name" />
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Field style={{ flex: 1 }} label="Telemóvel" placeholder="9xx xxx xxx" value={tel} onChangeText={(v) => (setTel(phone(v)), setErr(''))} keyboardType="phone-pad" />
            <Field style={{ flex: 1 }} label="BI ou NIF" placeholder="Opcional" value={bi} onChangeText={setBi} autoCapitalize="characters" />
          </View>
          <View>
            <Field label="Código de indicação · opcional" placeholder="Ex. KATIA-4822" value={ref} onChangeText={setRef} autoCapitalize="characters" />
            {refMsg ? (
              <Animated.View entering={M.enter()}>
                <Txt v="small" c={refOk && !selfRef ? C.ok : C.bad} style={{ marginTop: 6 }}>
                  {refMsg}
                </Txt>
              </Animated.View>
            ) : null}
          </View>
        </View>
      </Section>
      <Section title="Plano">
        {PLANS.map((x, i) => (
          <Press key={x.v} feedback="select" scaleTo={0.99} onPress={() => setPlan(x.v)} accessibilityState={{ selected: plan === x.v }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
            <View style={{ width: 18, height: 18, borderWidth: 1.5, borderColor: C.ink, alignItems: 'center', justifyContent: 'center' }}>{plan === x.v ? <Animated.View entering={M.fade(140)} style={{ width: 10, height: 10, backgroundColor: C.ink }} /> : null}</View>
            <View style={{ flex: 1 }}>
              <Txt v="bodyStrong">{x.l}</Txt>
              <Txt v="small" c={C.muted}>
                {x.d}
              </Txt>
            </View>
            <Txt v="bodyStrong">{kn(x.p)}</Txt>
          </Press>
        ))}
      </Section>
      <Section title="Pagamento do 1º mês">
        <ChipGroup options={PAY_MEANS.map((m) => [m, m] as const)} value={meio} onChange={setMeio} />
      </Section>
      <Section>
        <Checkbox on={sms} onChange={setSms} label="Enviar factura e senha por SMS" />
      </Section>
      <Section>
        <View style={{ backgroundColor: C.accent, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ gap: 4 }}>
            <Txt v="label">Kz · A cobrar agora</Txt>
            <Txt v="small">
              {p.l} · Novembro · {meio}
            </Txt>
          </View>
          <Txt style={type(28, 300)}>{kn(p.p)}</Txt>
        </View>
        {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
        <Button label="Inscrever e cobrar" size="lg" full onPress={submit} feedback="press" style={{ marginTop: 12 }} />
      </Section>
    </TabScreen>
  );
}

/** r4 · Cobrar e emitir factura / factura-recibo. */
export function Cobrar() {
  const params = useLocalSearchParams<{ m?: string; checkin?: string }>();
  const { docs, issueDoc } = useMuntu();
  const [mem, setMem] = useState(params.m && CHARGE_MEMBERS[params.m] ? params.m : 'MS');
  const cm = CHARGE_MEMBERS[mem]!;
  const items = useMemo(
    () => [
      { k: 'nov', l: 'Mensalidade Novembro', d: cm.d.split(' · ')[1]!, v: cm.v, late: false },
      ...(cm.k === 'divida' ? [{ k: 'out', l: 'Mensalidade Outubro', d: 'Em atraso há 12 dias', v: cm.v, late: true }] : []),
      { k: 'pt', l: 'Pacote PT · 8 sessões', d: 'Nuno Sebastião', v: 64000, late: false },
      { k: 'cartao', l: '2ª via do cartão de acesso', d: 'Cartão com QR', v: 2500, late: false },
    ],
    [cm],
  );
  const [sel, setSel] = useState<string[] | null>(null);
  const cs = sel ?? (cm.k === 'divida' ? ['out'] : ['nov']);
  const [docT, setDocT] = useState<'fr' | 'ft'>('fr');
  const [meio, setMeio] = useState<(typeof PAY_MEANS)[number]>('TPA');
  const [ch, setCh] = useState<string[]>(['SMS']);
  const [err, setErr] = useState('');
  const [res, setRes] = useState<null | { title: string; doc: string; n: string; v: number; meio: string; tel: string; sms: string; again: boolean }>(null);
  const total = items.filter((i) => cs.includes(i.k)).reduce((a, i) => a + i.v, 0);
  const payNow = docT === 'fr';
  const hist = [
    ...docs,
    { doc: 'FR TAL/2026/1201', n: 'Ana Domingos', h: '09:12', v: 45000, st: 'SMS entregue', tone: 'ok' as const },
    { doc: 'FT TAL/2026/0088', n: 'Celso Pedro', h: '08:47', v: 45000, st: 'Por pagar · SMS entregue', tone: 'warn' as const },
    { doc: 'FR TAL/2026/1199', n: 'Kátia Muondo', h: '08:21', v: 30000, st: 'SMS entregue', tone: 'ok' as const },
  ];

  const submit = () => {
    if (!cs.length) {
      haptic('error');
      return setErr('Escolhe pelo menos um item.');
    }
    const first = cm.n.split(' ')[0];
    const doc = issueDoc({ prefix: payNow ? 'FR' : 'FT', n: cm.n, h: 'Agora', v: total, st: payNow ? 'SMS entregue' : 'Por pagar · SMS entregue', tone: payNow ? 'ok' : 'warn' }, cm.k === 'divida' && payNow ? (params.checkin ?? 'c3') : undefined);
    haptic('success');
    setErr('');
    setRes({
      title: payNow ? 'Pago e enviado' : 'Factura emitida e enviada',
      doc,
      n: cm.n,
      v: total,
      meio: payNow ? meio : 'Por pagar',
      tel: `${cm.tel} · ${ch.join(' e ') || 'sem envio'}`,
      sms: `MWANGOLÉ FIT: Olá ${first}, ${payNow ? `recebemos ${kn(total)} Kz. Factura-recibo ` : 'tens a factura '}${doc}${payNow ? '' : ` de ${kn(total)} Kz para pagar até 6 Nov. Paga no Multicaixa Express ou na recepção`}. Ver: muntu.ao/f/3HT9`,
      again: false,
    });
  };

  return (
    <TabScreen role="rececao" eyebrow="Cobranças e facturas" title="Cobrar">
      {res ? (
        <Animated.View entering={M.fade()} style={{ paddingHorizontal: GUTTER, paddingTop: 20, gap: 12 }}>
          <Animated.View entering={M.pop()} style={{ backgroundColor: payNow ? C.okBg : C.warnBg, padding: 18, gap: 8 }}>
            <Txt v="label" c={payNow ? C.ok : C.warn}>
              {res.title}
            </Txt>
            <Txt style={type(18, 500)}>{res.doc}</Txt>
            <Txt v="small" c={C.muted}>
              {res.n} · {kn(res.v)} Kz · {res.meio}
            </Txt>
          </Animated.View>
          <View style={{ backgroundColor: C.sand, padding: 14, gap: 6 }}>
            <Txt v="label" c={C.muted}>
              SMS enviado para {res.tel}
            </Txt>
            <Txt v="small">{res.sms}</Txt>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button label={res.again ? 'Reenviado ✓' : 'Reenviar SMS'} kind="outline" style={{ flex: 1 }} disabled={res.again} onPress={() => setRes({ ...res, again: true })} />
            <Button
              label="Nova cobrança"
              style={{ flex: 1 }}
              onPress={() => {
                setRes(null);
                setSel(null);
              }}
            />
          </View>
        </Animated.View>
      ) : (
        <>
          <Section first>
            <Select
              label="Membro"
              value={mem}
              onChange={(v) => {
                setMem(v);
                setSel(null);
                setErr('');
              }}
              options={Object.entries(CHARGE_MEMBERS).map(([v, m]) => ({ v, l: m.n + (m.k === 'divida' ? ' · em dívida' : ''), sub: m.d }))}
            />
            <Animated.View key={mem} entering={M.fade()} style={{ marginTop: 12, backgroundColor: C.sand, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{cm.n}</Txt>
                <Txt v="small" c={C.muted}>
                  {cm.d} · {cm.tel}
                </Txt>
              </View>
              {stBadge(cm.k)}
            </Animated.View>
          </Section>
          <Section title="O que cobrar">
            {items.map((it, i) => {
              const on = cs.includes(it.k);
              return (
                <View key={it.k} style={{ paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
                  <Checkbox
                    on={on}
                    onChange={() => {
                      setSel(on ? cs.filter((x) => x !== it.k) : [...cs, it.k]);
                      setErr('');
                    }}
                    label={it.l}
                    sub={it.d}
                    right={<Txt v="bodyStrong">{kn(it.v)}</Txt>}
                  />
                </View>
              );
            })}
          </Section>
          <Section title="Documento">
            <Segmented
              value={docT}
              onChange={setDocT}
              options={[
                { v: 'fr', l: 'Factura-recibo' },
                { v: 'ft', l: 'Factura' },
              ]}
            />
            <Txt v="small" c={C.muted} style={{ marginTop: 8 }}>
              {payNow ? 'Pago agora' : 'Paga depois · prazo 8 dias'}
            </Txt>
          </Section>
          {payNow ? (
            <Section title="Meio de pagamento">
              <ChipGroup options={PAY_MEANS.map((m) => [m, m] as const)} value={meio} onChange={setMeio} />
            </Section>
          ) : null}
          <Section title="Enviar ao cliente">
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {['SMS', 'WhatsApp'].map((c) => (
                <Chip key={c} label={c} on={ch.includes(c)} onPress={() => setCh(ch.includes(c) ? ch.filter((x) => x !== c) : [...ch, c])} />
              ))}
            </View>
          </Section>
          <Section>
            <View style={{ backgroundColor: C.accent, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ gap: 4 }}>
                <Txt v="label">Kz · Total</Txt>
                <Txt v="small">
                  {cs.length} {cs.length === 1 ? 'item' : 'itens'} · {payNow ? meio : 'a pagar até 6 Nov'}
                </Txt>
              </View>
              <Txt style={type(28, 300)}>{kn(total)}</Txt>
            </View>
            {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
            <Button label={payNow ? 'Cobrar e emitir factura-recibo' : 'Emitir factura'} size="lg" full onPress={submit} feedback="press" style={{ marginTop: 12 }} />
          </Section>
        </>
      )}
      <Section title="Documentos de hoje" right={<Txt v="small" c={C.muted}>{`${hist.length} emitidos`}</Txt>}>
        {hist.map((h, i) => (
          <Reveal key={h.doc + i} i={i}>
            <Row first={i === 0}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{h.doc}</Txt>
                <Txt v="small" c={C.muted}>
                  {h.n} · {h.h}
                </Txt>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 2 }}>
                <Txt v="bodyStrong">{kn(h.v)}</Txt>
                <Txt style={[type(9, 600, 0.12, true), { color: h.tone === 'ok' ? C.ok : C.warn }]}>{h.st}</Txt>
              </View>
            </Row>
          </Reveal>
        ))}
      </Section>
    </TabScreen>
  );
}
