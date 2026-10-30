import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, LinearTransition, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, ZoomIn } from 'react-native-reanimated';
import { CHALLENGES, CLASSES, EVENTS, INCLUDED, OCC, OCC_NOW, lotLevel, PAY_METHODS, PAYMENTS, PT_DAYS, PT_HOURS, REFERRAL_STATE, REFERRALS_MINE, TRAINERS, WEEK_DAYS, WEEK_NUMS } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn, phone } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { Avatar, Badge, Button, Chip, Dot, Field, Note, Press, Progress, QR, qrCells, Reveal, Row, Segmented, Toggle, Txt, useToast } from '../../ui';
import { Footer, LinkCard, Page, Section, StackScreen, TabScreen, TitleBlock, TopBar } from '../Layout';

const CELLS = qrCells();

/** m1 · O teu acesso (QR dinâmico). */
export function Acesso() {
  const router = useRouter();
  const now = OCC[OCC_NOW]!;
  const [secs, setSecs] = useState(24);
  const [seed, setSeed] = useState(0);
  const pulse = useSharedValue(1);
  useEffect(() => {
    const t = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          setSeed((x) => x + 1);
          haptic('select');
          return 30;
        }
        return s - 1;
      });
    }, 1000);
    pulse.value = withRepeat(withSequence(withTiming(0.97, { duration: 900 }), withTiming(1, { duration: 900 })), -1);
    return () => clearInterval(t);
  }, [pulse]);
  const qrStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <TopBar role="membro" bg={C.accent} right={<Txt style={type(10, 600, 0.2, true)}>MWANGOLÉ FIT</Txt>} />
      <TitleBlock eyebrow="Olá, Kátia" eyebrowColor={C.ink} title="O teu acesso" style={{ backgroundColor: C.accent, borderBottomWidth: 0 }} />
      <Page>
        <View style={{ alignItems: 'center', paddingTop: 24, gap: 14 }}>
          <Animated.View key={seed} entering={FadeIn.duration(400)} style={[{ padding: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: C.line }, qrStyle]}>
            <QR size={168} cells={seed ? qrCells(seed) : CELLS} />
          </Animated.View>
          <Txt v="label" c={C.muted}>
            QR renova em 00:{String(secs).padStart(2, '0')} · aproxima da catraca
          </Txt>
        </View>
        <View style={{ paddingHorizontal: GUTTER, paddingTop: 20, gap: 8 }}>
          <Reveal i={1}>
            <LinkCard dot={C.ok} label="Agora no ginásio" value={`${now} pessoas · ${lotLevel(now)}`} onPress={() => router.push('/ginasio-agora')} />
          </Reveal>
          <Reveal i={2}>
            <Press onPress={() => router.navigate('/membro/plano')} style={{ flexDirection: 'row', backgroundColor: C.sand }}>
              <View style={{ flex: 1, padding: 16, gap: 4, borderRightWidth: 1, borderRightColor: C.paper }}>
                <Txt style={type(40, 300)}>18</Txt>
                <Txt v="label" c={C.muted}>
                  Dias restantes
                </Txt>
              </View>
              <View style={{ flex: 1, padding: 16, gap: 6, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Dot size={6} color={C.ok} />
                  <Txt style={[type(10, 600, 0.16, true), { color: C.ok }]}>Pago</Txt>
                </View>
                <Txt v="bodyStrong">Rede · Mensal</Txt>
              </View>
            </Press>
          </Reveal>
        </View>
      </Page>
    </View>
  );
}

/** m3 · Actividades (aulas, desafios e eventos). */
export function ActividadesMembro() {
  const toast = useToast();
  const { reservations, waitlist, joinedChallenges, joinedEvents, toggleReservation, toggleWait, toggleChallenge, toggleEvent } = useMuntu();
  const [tab, setTab] = useState<'aulas' | 'des' | 'evt'>('aulas');
  const [day, setDay] = useState(0);
  const [offer, setOffer] = useState(true);
  return (
    <TabScreen role="membro" eyebrow="MWANGOLÉ FIT · Talatona" title="Actividades">
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 14 }}>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { v: 'aulas', l: 'Aulas', n: CLASSES.length },
            { v: 'des', l: 'Desafios', n: CHALLENGES.length },
            { v: 'evt', l: 'Eventos', n: EVENTS.length },
          ]}
        />
      </View>
      {tab === 'aulas' ? (
        <>
          {offer && day === 0 ? (
            <Animated.View entering={FadeInDown} exiting={FadeIn} style={{ marginHorizontal: GUTTER, marginTop: 14, backgroundColor: C.accent, padding: 14, gap: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <Txt v="label" style={{ flex: 1 }}>
                  Vagou um lugar para ti
                </Txt>
                <Txt v="small">Aceita até 10:12 · 14 min</Txt>
              </View>
              <Txt v="bodyStrong">Cross training · hoje 19:00 · Box</Txt>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Button
                  label="Passar"
                  kind="outline"
                  size="sm"
                  style={{ flex: 1 }}
                  onPress={() => {
                    setOffer(false);
                    if (waitlist['0-4']) toggleWait('0-4');
                    toast('A vaga passou ao próximo da fila', 'info');
                  }}
                />
                <Button
                  label="Aceitar vaga"
                  size="sm"
                  style={{ flex: 1 }}
                  feedback="success"
                  onPress={() => {
                    setOffer(false);
                    if (!reservations['0-4']) toggleReservation('0-4');
                    if (waitlist['0-4']) toggleWait('0-4');
                    toast('Vaga confirmada. Cross training às 19:00.');
                  }}
                />
              </View>
            </Animated.View>
          ) : null}
          <View style={{ flexDirection: 'row', gap: 4, paddingHorizontal: GUTTER, paddingTop: 14 }}>
            {WEEK_DAYS.map((w, i) => (
              <Press key={w} feedback="select" onPress={() => setDay(i)} accessibilityState={{ selected: i === day }} style={{ flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: i === day ? C.ink : C.sand }}>
                <Txt style={[type(9, 600, 0.1, true), { color: i === day ? C.paper : C.ink }]}>{w}</Txt>
                <Txt style={[type(18, 300), { color: i === day ? C.paper : C.ink }]}>{WEEK_NUMS[i]}</Txt>
              </Press>
            ))}
          </View>
          <Section first>
            {CLASSES.map((a, i) => {
              const key = `${day}-${i}`;
              const on = !!reservations[key];
              const wq = waitlist[key];
              const left = Math.max(0, ((a.cap * 7 + i * 5 + day * 3) % (a.cap + 1)) - (i === 4 && day === 0 ? 99 : 0)) - (on ? 1 : 0);
              const full = left <= 0 && !on;
              return (
                <Reveal key={key} i={i}>
                  <Row first={i === 0}>
                    <Txt tabular style={[type(16, 300), { width: 50 }]}>
                      {a.h}
                    </Txt>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Txt v="bodyStrong">{a.n}</Txt>
                      <Txt v="small" c={C.muted}>
                        {a.d} · {full ? (wq ? `lotada · és o #${wq + 1} na fila` : 'lotada · lista de espera') : `${left} vagas`}
                      </Txt>
                    </View>
                    <Button
                      label={on ? 'Reservado' : full ? (wq ? 'Na fila' : 'Lista de espera') : 'Reservar'}
                      size="sm"
                      kind={on ? 'accent' : full && wq ? 'soft' : 'outline'}
                      feedback={on ? 'select' : 'success'}
                      onPress={() => (full && !on ? toggleWait(key) : toggleReservation(key))}
                    />
                  </Row>
                </Reveal>
              );
            })}
          </Section>
        </>
      ) : tab === 'des' ? (
        <Section first>
          {CHALLENGES.map((d, i) => {
            const j = d.auto || !!joinedChallenges[d.id];
            const people = d.people + (!d.auto && j && d.id !== 'd1' ? 1 : 0) - (!d.auto && !j && d.id === 'd1' ? 1 : 0);
            return (
              <Reveal key={d.id} i={i}>
                <Animated.View layout={LinearTransition} style={{ borderWidth: 1, borderColor: j ? C.ink : C.line, backgroundColor: j ? '#fff' : 'transparent', padding: 16, gap: 10, marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                    <Txt style={[type(16, 500), { flex: 1 }]}>{d.t}</Txt>
                    <Badge label={j ? 'A participar' : 'Aberto'} tone={j ? 'ok' : 'warn'} />
                  </View>
                  <Txt v="small" c={C.muted}>
                    {d.d}
                  </Txt>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Txt v="bodyStrong">
                      {kn(d.prog)} / {kn(d.goal)} {d.unit}
                    </Txt>
                    <Txt v="small" c={C.muted}>
                      {j ? (d.auto ? 'Talatona lidera' : d.prog > 0 ? `#14 de ${people}` : 'Novo') : `${people} a participar`}
                    </Txt>
                  </View>
                  <Progress value={d.prog / d.goal} color={C.accent} height={4} />
                  <Txt v="small">{d.prize}</Txt>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Txt v="tiny" c={C.muted}>
                      Termina a {d.end}
                    </Txt>
                    {!d.auto ? <Button label={j ? 'Sair' : 'Participar'} size="sm" kind={j ? 'outline' : 'solid'} onPress={() => toggleChallenge(d.id)} /> : null}
                  </View>
                </Animated.View>
              </Reveal>
            );
          })}
        </Section>
      ) : (
        <Section first>
          {EVENTS.map((e, i) => {
            const j = !!joinedEvents[e.id];
            const left = e.cap ? e.cap - e.taken - (j ? 1 : 0) : null;
            return (
              <Reveal key={e.id} i={i}>
                <Row first={i === 0} style={{ alignItems: 'flex-start' }}>
                  <View style={{ width: 52, alignItems: 'center', backgroundColor: C.sand, paddingVertical: 8 }}>
                    <Txt style={type(22, 300)}>{e.d}</Txt>
                    <Txt style={type(9, 600, 0.14, true)}>{e.m}</Txt>
                  </View>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Txt v="label" c={C.muted}>
                      {e.w}
                    </Txt>
                    <Txt v="bodyStrong">{e.t}</Txt>
                    <Txt v="small" c={C.muted}>
                      {e.l}
                    </Txt>
                    <Txt v="tiny" c={C.muted}>
                      {left !== null ? `${left} vagas de ${e.cap}` : 'Sem limite de vagas'}
                    </Txt>
                  </View>
                  <Button label={j ? 'Inscrito ✓' : 'Inscrever'} size="sm" kind={j ? 'soft' : 'solid'} style={j ? { backgroundColor: C.okBg, borderColor: C.ok } : undefined} feedback={j ? 'select' : 'success'} onPress={() => toggleEvent(e.id)} />
                </Row>
              </Reveal>
            );
          })}
        </Section>
      )}
    </TabScreen>
  );
}

/** m7 · Reservar PT (4 semanas). */
export function ReservarPT() {
  const [sel, setSel] = useState(0);
  const [freq, setFreq] = useState(2);
  const [days, setDays] = useState<string[]>(['ter', 'qui']);
  const [hour, setHour] = useState('18:00');
  const [sent, setSent] = useState(false);
  const P = TRAINERS[sel]!;
  const ready = days.length === freq && !!hour;
  const sess = freq * 4;
  const dayL = (k: string) => PT_DAYS.find((d) => d[0] === k)![1];
  if (sent)
    return (
      <TabScreen role="membro" eyebrow="Personal trainer · 4 semanas" title="Reservar PT">
        <Animated.View entering={ZoomIn.springify().damping(14)} style={{ margin: GUTTER, backgroundColor: C.okBg, padding: 18, gap: 10 }}>
          <Txt v="label" c={C.ok}>
            Pedido enviado
          </Txt>
          <Txt v="body">
            Pedido enviado a {P.n}: {sess} sessões, {days.map(dayL).join(' e ')} às {hour}. Recebes a confirmação aqui e por SMS.
          </Txt>
          <Button label="Fazer outro pedido" kind="outline" onPress={() => setSent(false)} />
        </Animated.View>
      </TabScreen>
    );
  return (
    <TabScreen
      role="membro"
      eyebrow="Personal trainer · 4 semanas"
      title="Reservar PT"
      footer={
        <Footer label="Enviar pedido" disabled={!ready} onPress={() => setSent(true)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Txt v="bodyStrong">
                {sess} sessões · {P.n.split(' ')[0]}
              </Txt>
              <Txt v="small" c={C.muted}>
                {days.map(dayL).join(', ') || 'Escolhe os dias'} · {hour}
              </Txt>
            </View>
            <Txt style={type(22, 300)}>{kn(sess * P.price)} Kz</Txt>
          </View>
        </Footer>
      }
    >
      <Section title="Treinador" first>
        <View style={{ gap: 8 }}>
          {TRAINERS.map((t, k) => (
            <Press key={t.i} feedback="select" scaleTo={0.99} onPress={() => setSel(k)} accessibilityState={{ selected: k === sel }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: k === sel ? 2 : 1, borderColor: k === sel ? C.ink : C.line, backgroundColor: k === sel ? '#fff' : 'transparent' }}>
              <Avatar initials={t.i} bg={C.ink} fg={C.paper} />
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{t.n}</Txt>
                <Txt v="small" c={C.muted}>
                  {t.e}
                </Txt>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Dot size={6} color={t.on ? C.ok : C.faint} />
                  <Txt v="tiny" c={C.muted}>
                    {t.on ? 'No ginásio agora' : 'Entra às 17:00'}
                  </Txt>
                </View>
              </View>
              <Txt v="bodyStrong">{kn(t.price)} Kz</Txt>
            </Press>
          ))}
        </View>
      </Section>
      <Section title="Vezes por semana">
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {[1, 2, 3].map((f) => (
            <Chip key={f} label={`${f}×`} on={freq === f} onPress={() => (setFreq(f), setDays((d) => d.slice(-f)))} />
          ))}
        </View>
      </Section>
      <Section title="Dias" right={<Txt v="small" c={C.muted}>{`${days.length} de ${freq} escolhidos`}</Txt>}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {PT_DAYS.map(([k, l]) => (
            <Chip
              key={k}
              label={l}
              on={days.includes(k)}
              onPress={() =>
                setDays((d) => {
                  let n = d.includes(k) ? d.filter((y) => y !== k) : [...d, k];
                  if (n.length > freq) n = n.slice(-freq);
                  return n;
                })
              }
            />
          ))}
        </View>
      </Section>
      <Section title="Hora">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {PT_HOURS.map((h) => (
            <Chip key={h} label={h} on={hour === h} onPress={() => setHour(h)} />
          ))}
        </View>
      </Section>
    </TabScreen>
  );
}

/** m2 · O meu plano. */
export function Plano() {
  const router = useRouter();
  return (
    <TabScreen role="membro" eyebrow="Rede · Mensal" title="O meu plano">
      <View style={{ backgroundColor: C.accent, padding: GUTTER, gap: 12 }}>
        <Txt v="label">Próxima mensalidade · 13 Nov</Txt>
        <Txt style={type(44, 300)}>45 000,00</Txt>
        <Button label="Pagar com Multicaixa Express" size="lg" full feedback="press" onPress={() => router.push('/pagamento')} />
      </View>
      <Section title="Incluído no plano" right={<Txt v="small" c={C.muted}>até 13 Nov</Txt>}>
        {INCLUDED.map((x, i) => (
          <Reveal key={x.l} i={i}>
            <View style={{ paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Txt v="bodyStrong">{x.l}</Txt>
                <Txt v="bodyStrong">{x.v}</Txt>
              </View>
              <Progress value={x.w} color={x.c} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Txt v="small" c={x.dc}>
                  {x.d}
                </Txt>
                {x.a ? (
                  <Press onPress={() => router.navigate(x.go === 'pt' ? '/membro/pt' : '/membro/actividades')} hitSlop={8}>
                    <Txt style={[type(12, 500), { color: '#9a4c08' }]}>{x.a}</Txt>
                  </Press>
                ) : null}
              </View>
            </View>
          </Reveal>
        ))}
      </Section>
      <Section title="Pagamentos">
        {PAYMENTS.map((p, i) => (
          <Row key={p.t} first={i === 0}>
            <View style={{ flex: 1, gap: 2 }}>
              <Txt v="bodyStrong">{p.t}</Txt>
              <Txt v="small" c={C.muted}>
                {p.d}
              </Txt>
            </View>
            <Txt v="bodyStrong">{p.v}</Txt>
          </Row>
        ))}
      </Section>
      <Section title="Filiais">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {['Talatona · base', 'Kilamba', 'Maianga'].map((f, i) => (
            <Badge key={f} label={f} tone={i ? 'neutral' : 'ink'} />
          ))}
        </View>
      </Section>
    </TabScreen>
  );
}

/** m5 · Pagamento da mensalidade. */
export function Pagamento() {
  const [meio, setMeio] = useState<(typeof PAY_METHODS)[number]['v']>('express');
  const [tel, setTel] = useState('923 481 220');
  const [st, setSt] = useState<'idle' | 'waiting' | 'done'>('idle');
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (t.current && clearTimeout(t.current)), []);
  const cta = { express: 'Pedir pagamento', ref: 'Gerar referência', tpa: 'Avisar a recepção' }[meio];
  const wait = meio === 'express' ? `Abre o Multicaixa Express no ${tel} e confirma 45 000,00 Kz.` : meio === 'ref' ? 'Entidade 11 024 · Referência 482 210 931. Válida 48 horas.' : 'A recepção da Talatona foi avisada. Paga no TPA ao entrar.';
  const pagar = () => {
    setSt('waiting');
    haptic('press');
    if (meio === 'express')
      t.current = setTimeout(() => {
        setSt('done');
        haptic('success');
      }, 3000);
  };
  return (
    <StackScreen back="O meu plano" title="Pagamento" footer={st === 'idle' ? <Footer label={cta} onPress={pagar} /> : undefined}>
      <View style={{ backgroundColor: C.accent, padding: GUTTER, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ gap: 4, flex: 1 }}>
          <Txt v="label">Kz · Rede Mensal</Txt>
          <Txt v="small">Novembro · vence a 13 Nov</Txt>
        </View>
        <Txt style={type(34, 300)}>45 000,00</Txt>
      </View>
      {st === 'idle' ? (
        <>
          <Section title="Meio de pagamento">
            {PAY_METHODS.map((m, i) => (
              <Press key={m.v} feedback="select" scaleTo={0.99} onPress={() => setMeio(m.v)} accessibilityState={{ selected: meio === m.v }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
                <View style={{ width: 18, height: 18, borderWidth: 1.5, borderColor: C.ink, alignItems: 'center', justifyContent: 'center' }}>{meio === m.v ? <Animated.View entering={ZoomIn.duration(140)} style={{ width: 10, height: 10, backgroundColor: C.ink }} /> : null}</View>
                <View>
                  <Txt v="bodyStrong">{m.l}</Txt>
                  <Txt v="small" c={C.muted}>
                    {m.d}
                  </Txt>
                </View>
              </Press>
            ))}
          </Section>
          {meio === 'express' ? (
            <Section>
              <Field label="Telemóvel Express" value={tel} onChangeText={(v) => setTel(phone(v))} keyboardType="phone-pad" big />
            </Section>
          ) : null}
        </>
      ) : (
        <Animated.View entering={FadeInDown} style={{ padding: GUTTER, gap: 12 }}>
          {st === 'waiting' ? (
            <View style={{ backgroundColor: C.sand, padding: 18, gap: 10 }}>
              <Txt v="label">{meio === 'express' ? 'A aguardar confirmação' : 'Pronto'}</Txt>
              <Txt v="body">{wait}</Txt>
              {meio === 'express' ? <Progress value={1} color={C.accent} /> : null}
            </View>
          ) : (
            <Animated.View entering={ZoomIn.springify().damping(14)} style={{ backgroundColor: C.okBg, padding: 18, gap: 8 }}>
              <Txt v="label" c={C.ok}>
                Pagamento confirmado
              </Txt>
              <Txt v="body">45 000,00 Kz recebidos. O teu plano fica activo até 13 Dez. Factura enviada por SMS.</Txt>
            </Animated.View>
          )}
          <Button label="Escolher outro meio" kind="outline" onPress={() => setSt('idle')} />
        </Animated.View>
      )}
    </StackScreen>
  );
}

/** m4 · Conta do membro. */
export function ContaMembro() {
  const router = useRouter();
  const { prefs, togglePref, signOut } = useMuntu();
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <TopBar role="membro" right={<Txt style={type(10, 600, 0.2, true)}>MWANGOLÉ FIT</Txt>} />
      <Page>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: GUTTER, paddingVertical: 18 }}>
          <Avatar initials="KM" size={52} bg={C.ink} fg={C.paper} />
          <View style={{ gap: 2 }}>
            <Txt style={type(22, 400, 0.12, true)}>Kátia Muondo</Txt>
            <Txt v="small" c={C.muted}>
              Membro #4822 · desde Mar 2025
            </Txt>
          </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
          {[
            ['14', 'Entradas · Out'],
            ['6', 'Aulas · Out'],
            ['Talatona', 'Filial base'],
          ].map(([v, l], i) => (
            <View key={l} style={{ flex: 1, padding: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
              <Txt style={type(i === 2 ? 15 : 26, i === 2 ? 500 : 300)}>{v}</Txt>
              <Txt v="label" c={C.muted}>
                {l}
              </Txt>
            </View>
          ))}
        </View>
        <Section first>
          {[
            ['Telemóvel', '923 481 220'],
            ['Email', 'katia.muondo@gmail.com'],
          ].map(([k, v], i) => (
            <Row key={k} first={i === 0}>
              <Txt v="body" style={{ flex: 1 }}>
                {k}
              </Txt>
              <Txt v="body" c={C.muted}>
                {v}
              </Txt>
            </Row>
          ))}
          {[
            ['sms', 'Avisos por SMS'],
            ['wa', 'Avisos por WhatsApp'],
          ].map(([k, l]) => (
            <Row key={k}>
              <Txt v="body" style={{ flex: 1 }}>
                {l}
              </Txt>
              <Toggle on={!!prefs[k!]} onChange={() => togglePref(k!)} />
            </Row>
          ))}
          {[
            ['Indica e ganha', '1 mês grátis →', () => router.push('/indica'), true],
            ['Congelar plano', 'Até 30 dias por ano →', undefined, false],
            ['Histórico de entradas', '→', undefined, false],
            ['Ajuda e termos', '→', undefined, false],
          ].map(([k, v, fn, hot]) => (
            <Press key={k as string} onPress={fn as any} style={{ flexDirection: 'row', paddingVertical: 13, borderTopWidth: 1, borderTopColor: C.line }}>
              <Txt v="body" style={{ flex: 1 }}>
                {k as string}
              </Txt>
              <Txt v="body" c={hot ? '#9a4c08' : C.ink}>
                {v as string}
              </Txt>
            </Press>
          ))}
          <Button
            label="Terminar sessão"
            kind="outline"
            size="lg"
            full
            style={{ marginTop: 24 }}
            onPress={() => {
              signOut();
              router.replace('/');
            }}
          />
        </Section>
      </Page>
    </View>
  );
}

/** m8 · Indica e ganha. */
export function Indica() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  return (
    <StackScreen back="Conta" eyebrow="Programa de indicação" title="Indica e ganha">
      <View style={{ backgroundColor: C.accent, padding: GUTTER, gap: 8 }}>
        <Txt v="label">O teu código</Txt>
        <Txt style={type(32, 400, 0.12)}>KATIA-4822</Txt>
        <Txt v="small">muntu.ao/i/KATIA-4822</Txt>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
          <Button label="WhatsApp" size="sm" style={{ flex: 1 }} onPress={() => (setCopied(false), toast('A abrir o WhatsApp…', 'info'))} />
          <Button label="SMS" size="sm" kind="outline" style={{ flex: 1 }} onPress={() => (setCopied(false), toast('A abrir as mensagens…', 'info'))} />
          <Button label={copied ? 'Copiado ✓' : 'Copiar'} size="sm" kind="outline" style={{ flex: 1 }} feedback="success" onPress={() => setCopied(true)} />
        </View>
      </View>
      <Section first>
        <Txt v="bodyStrong">Ganhas 1 mês grátis quando quem indicaste pagar 2 mensalidades.</Txt>
        <Txt v="small" c={C.muted} style={{ marginTop: 6 }}>
          Quem indicas tem de ser novo no ginásio. A recompensa é libertada quando o pagamento for confirmado.
        </Txt>
      </Section>
      <Section title="As tuas indicações" right={<Txt v="small" c={C.muted}>1 mês ganho</Txt>}>
        {REFERRALS_MINE.map((r, i) => (
          <Reveal key={r.n} i={i}>
            <View style={{ paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="bodyStrong">{r.n}</Txt>
                  <Txt v="small" c={C.muted}>
                    {r.d}
                  </Txt>
                </View>
                <Badge label={REFERRAL_STATE[r.k]![0]} tone={REFERRAL_STATE[r.k]![1]} />
              </View>
              <Progress value={r.p / 2} color={C.accent} />
            </View>
          </Reveal>
        ))}
      </Section>
    </StackScreen>
  );
}
