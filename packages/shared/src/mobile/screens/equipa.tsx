import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ACT_KIND, ACT_STATE, Activity, CASH_DESKS, DEBTORS, INCOME_TODAY, OCC, OCC_NOW, lotLevel, PT_AGENDA, PT_REQUESTS, Role, ST } from '../../data/mobile';
import { kn } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { M, Avatar, Badge, Button, CountUp, Progress, Reveal, Row, Txt, useToast } from '../../ui';
import { LinkCard, Section, TabScreen } from '../Layout';
import { useRecoveryTodo } from './rececao';

const total = INCOME_TODAY.reduce((a, [, v]) => a + v, 0);

/** f1 · Finanças · resumo do dia. */
export function Resumo() {
  const router = useRouter();
  const now = OCC[OCC_NOW]!;
  return (
    <TabScreen role="financas" eyebrow="Rede · Hoje, 29 Out" title="Finanças">
      <View style={{ paddingHorizontal: GUTTER, paddingVertical: 14 }}>
        <LinkCard dot={C.ok} label="Agora no ginásio" value={`${now} pessoas · ${lotLevel(now)}`} onPress={() => router.push('/ginasio-agora')} />
      </View>
      <View style={{ backgroundColor: C.accent, paddingHorizontal: GUTTER, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Txt v="label">Kz · recebido hoje</Txt>
        <CountUp value={total} format={kn} style={type(34, 300)} />
      </View>
      <Section title="Por meio de pagamento">
        {INCOME_TODAY.map(([l, v], i) => (
          <Reveal key={l} i={i}>
            <View style={{ paddingVertical: 10, gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Txt v="body">{l}</Txt>
                <Txt v="bodyStrong">{kn(v)}</Txt>
              </View>
              <Progress value={v / 88000} />
            </View>
          </Reveal>
        ))}
      </Section>
      <Section title="Outubro">
        <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
          {[
            ['2 450 000', 'Esperado'],
            ['2 302 000', 'Recebido'],
            ['94%', 'Cobrado'],
          ].map(([v, l], i) => (
            <View key={l} style={{ flex: 1, padding: 12, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
              <Txt style={type(17, 400)}>{v}</Txt>
              <Txt v="label" c={C.muted}>
                {l}
              </Txt>
            </View>
          ))}
        </View>
      </Section>
      <Section title="Caixas">
        {CASH_DESKS.map((c, i) => (
          <Reveal key={c.n} i={i}>
            <Row first={i === 0}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{c.n}</Txt>
                <Txt v="small" c={C.muted}>
                  {c.d}
                </Txt>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Txt v="bodyStrong">{kn(c.v)}</Txt>
                <Badge label={ST[c.k][0]} tone={ST[c.k][1]} />
              </View>
            </Row>
          </Reveal>
        ))}
      </Section>
    </TabScreen>
  );
}

/** f2 · Cobranças (membros em dívida). */
export function Cobrancas() {
  const toast = useToast();
  const { smsDone, sendSms } = useMuntu();
  const all = DEBTORS.every((d) => smsDone[d.n]);
  const sum = DEBTORS.reduce((a, d) => a + d.v, 0);
  return (
    <TabScreen role="financas" eyebrow={`${DEBTORS.length} membros em dívida`} title="Cobranças">
      <View style={{ backgroundColor: C.sand, paddingHorizontal: GUTTER, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Txt style={type(30, 300)}>{kn(sum)}</Txt>
          <Txt v="label" c={C.muted}>
            Kz · por cobrar
          </Txt>
        </View>
        <Button
          label="SMS a todos"
          size="sm"
          disabled={all}
          feedback="success"
          onPress={() => {
            sendSms(DEBTORS.map((d) => d.n));
            toast(`${DEBTORS.filter((d) => !smsDone[d.n]).length} SMS enviados`);
          }}
        />
      </View>
      <Section first>
        {DEBTORS.map((d, i) => {
          const done = smsDone[d.n];
          return (
            <Reveal key={d.n} i={i}>
              <Row first={i === 0}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="bodyStrong">{d.n}</Txt>
                  <Txt v="small" c={C.muted}>
                    {d.d}
                  </Txt>
                  {done ? (
                    <Animated.View entering={M.enter()}>
                      <Txt v="tiny" c={C.ok}>
                        SMS entregue às {done}
                      </Txt>
                    </Animated.View>
                  ) : null}
                </View>
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <Txt v="bodyStrong" c={C.bad}>
                    −{kn(d.v)}
                  </Txt>
                  <Button label="Enviar SMS" kind="outline" size="sm" disabled={!!done} feedback="success" onPress={() => sendSms([d.n])} />
                </View>
              </Row>
            </Reveal>
          );
        })}
      </Section>
    </TabScreen>
  );
}

/** p1 · Agenda do PT. */
export function Agenda() {
  const router = useRouter();
  const { ptMarked, markSession } = useMuntu();
  const todo = useRecoveryTodo('pt');
  const now = OCC[OCC_NOW]!;
  return (
    <TabScreen role="pt" eyebrow="Nuno Sebastião · Hoje" title="Agenda">
      <View style={{ paddingHorizontal: GUTTER, paddingVertical: 14, gap: 8 }}>
        <LinkCard dot={C.ok} label="Agora no ginásio" value={`${now} pessoas · ${lotLevel(now)}`} onPress={() => router.push('/ginasio-agora')} />
        <LinkCard dot={C.accent} label="Clientes em risco" value={`${todo} por contactar`} onPress={() => router.push('/recuperacao')} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
        {[
          ['18', 'Sessões esta semana'],
          ['9', 'Clientes activos'],
        ].map(([v, l], i) => (
          <View key={l} style={{ flex: 1, paddingHorizontal: GUTTER, paddingVertical: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
            <Txt style={type(28, 300)}>{v}</Txt>
            <Txt v="label" c={C.muted}>
              {l}
            </Txt>
          </View>
        ))}
      </View>
      <Section first>
        {PT_AGENDA.map((a, i) => {
          const k = ptMarked[a.id] ? 'entrou' : a.k;
          return (
            <Reveal key={a.id} i={i}>
              <Row first={i === 0}>
                <Txt tabular style={[type(16, 300), { width: 50 }]}>
                  {a.h}
                </Txt>
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="bodyStrong">{a.n}</Txt>
                  <Txt v="small" c={C.muted}>
                    {a.d}
                  </Txt>
                </View>
                {k === 'agend' ? (
                  <Button label="Presente" size="sm" feedback="success" onPress={() => markSession(a.id)} />
                ) : (
                  <Animated.View entering={M.fade()}>
                    <Badge label={ST[k as 'entrou' | 'concl'][0]} tone={ST[k as 'entrou' | 'concl'][1]} />
                  </Animated.View>
                )}
              </Row>
            </Reveal>
          );
        })}
      </Section>
    </TabScreen>
  );
}

/** p2 · Pedidos de reserva de PT. */
export function Pedidos() {
  const { ptRequests, answerRequest } = useMuntu();
  const open = PT_REQUESTS.filter((r) => !ptRequests[r.id]).length;
  return (
    <TabScreen role="pt" eyebrow={open ? `${open} por responder` : 'Tudo respondido'} title="Pedidos">
      <Section first>
        {PT_REQUESTS.map((r, i) => {
          const st = ptRequests[r.id];
          return (
            <Reveal key={r.id} i={i}>
              <Animated.View layout={M.layout()} style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={r.i} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{r.n}</Txt>
                    <Txt v="small" c={C.muted}>
                      {r.plan}
                    </Txt>
                  </View>
                  <Txt v="bodyStrong">{kn(r.v)} Kz</Txt>
                </View>
                <View style={{ backgroundColor: C.sand, padding: 12, gap: 2 }}>
                  <Txt v="body">{r.dias}</Txt>
                  <Txt v="small" c={C.muted}>
                    {r.hora}
                  </Txt>
                </View>
                {st ? (
                  <Animated.View entering={M.fade()}>
                    <Badge label={ST[st][0]} tone={ST[st][1]} />
                  </Animated.View>
                ) : (
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Button label="Recusar" kind="outline" style={{ flex: 1 }} feedback="warning" onPress={() => answerRequest(r.id, 'recusado')} />
                    <Button label="Aceitar" style={{ flex: 1 }} feedback="success" onPress={() => answerRequest(r.id, 'aceite')} />
                  </View>
                )}
              </Animated.View>
            </Reveal>
          );
        })}
      </Section>
    </TabScreen>
  );
}

function ActivityItem({ a, canApprove, i }: { a: Activity; canApprove: boolean; i: number }) {
  const { setActivityState } = useMuntu();
  const toast = useToast();
  const [l, tone] = ACT_STATE[a.st];
  return (
    <Reveal i={i}>
      <Animated.View layout={M.layout()} style={{ paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line, gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt v="label" c={C.muted}>
            {ACT_KIND[a.tipo]}
          </Txt>
          <Badge label={l} tone={tone} />
        </View>
        <Txt style={type(16, 500)}>{a.t}</Txt>
        <Txt v="small" c={C.muted}>
          {a.when} · {a.meta}
        </Txt>
        <Txt v="tiny" c={C.faint}>
          Criado por {a.by}
        </Txt>
        {canApprove ? (
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
            <Button
              label="Recusar"
              kind="outline"
              style={{ flex: 1 }}
              feedback="warning"
              onPress={() => {
                setActivityState(a.id, 'recusado');
                toast('Recusado. O PT foi avisado.', 'info');
              }}
            />
            <Button
              label="Aprovar"
              style={{ flex: 1 }}
              feedback="success"
              onPress={() => {
                setActivityState(a.id, 'aprovado');
                toast('Aprovado. Já aparece aos membros em Actividades.');
              }}
            />
          </View>
        ) : null}
      </Animated.View>
    </Reveal>
  );
}

/** p3 / o7 · Actividades (PT propõe, dono aprova). */
export function ActividadesEquipa({ role }: { role: Role }) {
  const router = useRouter();
  const acts = useMuntu((s) => s.activities);
  const dono = role === 'dono';
  const mine = dono ? acts : acts.filter((a) => a.by === 'Nuno Sebastião');
  const pend = (dono ? acts : mine).filter((a) => a.st === 'pendente');
  const pub = mine.filter((a) => a.st === 'aprovado' || a.st === 'publicado');
  const rec = mine.filter((a) => a.st === 'recusado');
  const group = (title: string, list: Activity[], empty: string) => (
    <Section title={title} right={<Txt v="small" c={C.muted}>{String(list.length)}</Txt>}>
      {list.map((a, i) => (
        <ActivityItem key={a.id} a={a} i={i} canApprove={dono && a.st === 'pendente'} />
      ))}
      {!list.length ? (
        <Txt v="small" c={C.muted} style={{ paddingVertical: 10 }}>
          {empty}
        </Txt>
      ) : null}
    </Section>
  );
  return (
    <TabScreen role={role} eyebrow={dono ? 'MWANGOLÉ FIT · aulas, desafios e eventos' : 'Propostas ao dono'} title="Actividades">
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 16 }}>
        <Button label="+ Nova actividade" size="lg" full feedback="press" onPress={() => router.push('/nova-actividade')} />
      </View>
      {group(dono ? 'Propostas dos PT' : 'À espera de aprovação', pend, 'Nada à espera.')}
      {group('Publicadas', pub, 'Ainda sem actividades publicadas.')}
      {group('Recusadas', rec, 'Nenhuma recusada.')}
    </TabScreen>
  );
}
