import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { ACT_KIND, ACT_STATE, APPROVALS, BRANCHES, COMPARE, DOCUMENTS, GOOD_RESULTS, LEAKS, LOST, NOTICE_TARGETS, NOTICES, OCC, OCC_NOW, lotLevel, RENEWALS, REFERRAL_REVIEW, REWARDS, STAFF, ST } from '../../data/mobile';
import { confirmBiometric } from '../../lib/auth';
import { haptic } from '../../lib/haptics';
import { kn } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { Avatar, Badge, Button, Checkbox, Chip, ChipGroup, CountUp, Dot, Field, Note, Press, Progress, Reveal, Row, Segmented, Select, Stepper, TextArea, Toggle, Txt, useToast } from '../../ui';
import { Footer, LinkCard, Page, Section, StackScreen, TabScreen, TopBar } from '../Layout';

const lostTotal = (st: Record<string, 'pot' | 'conf' | 'res'>, k: string) => LOST.filter((l) => (st[l.id] ?? l.st) === k).reduce((a, l) => a + l.v, 0);

/** o1 · Painel do dono. */
export function Painel() {
  const router = useRouter();
  const { outcomes, lostState } = useMuntu();
  const now = OCC[OCC_NOW]!;
  const recKz = 312000 + Object.entries(outcomes).filter(([, d]) => d.r === 'Renovou').reduce((a, [id]) => a + (RENEWALS.find((r) => r.id === id)?.v ?? 0), 0);
  const pot = lostTotal(lostState, 'pot') + lostTotal(lostState, 'conf');
  const pres = STAFF.filter((p) => p.on).length;
  return (
    <TabScreen role="dono" title="Outubro">
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 14, gap: 8 }}>
        <Reveal i={0}>
          <LinkCard dot={C.ok} label="Agora no ginásio" value={`${now} pessoas · ${lotLevel(now)}`} onPress={() => router.push('/ginasio-agora')} />
        </Reveal>
        <Reveal i={1} style={{ flexDirection: 'row', gap: 8 }}>
          {[
            ['Recuperação', `${kn(recKz)} Kz →`, '/recuperacao'],
            ['Receitas perdidas', `${kn(pot)} Kz →`, '/receitas-perdidas'],
          ].map(([l, v, to]) => (
            <Press key={l} onPress={() => router.push(to as any)} style={({ hovered }) => ({ flex: 1, padding: 14, borderWidth: 1, borderColor: C.ink, gap: 4, backgroundColor: hovered ? C.canvas : 'transparent' })}>
              <Txt v="label" c={C.muted}>
                {l}
              </Txt>
              <Txt style={type(15, 500)}>{v}</Txt>
            </Press>
          ))}
        </Reveal>
      </View>
      <Reveal i={2} style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
          {[
            ['2 450 000', 'Kz · Esperada'],
            ['2 302 000', 'Kz · Recebida'],
          ].map(([v, l], i) => (
            <View key={l} style={{ flex: 1, paddingHorizontal: GUTTER, paddingVertical: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
              <Txt style={type(24, 300)}>{v}</Txt>
              <Txt v="label" c={C.muted}>
                {l}
              </Txt>
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: C.accent, paddingHorizontal: GUTTER, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Txt v="label">Kz · Diferença</Txt>
          <CountUp value={148000} format={(v) => `${kn(v)},00`} style={type(34, 300)} />
        </View>
      </Reveal>
      <Press onPress={() => router.navigate('/dono/equipa')} style={{ marginHorizontal: GUTTER, marginTop: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.line, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Dot color={C.ok} />
        <Txt style={[type(12, 600, 0.18, true), { flex: 1 }]}>{`Equipa presente · ${pres} de ${STAFF.length}`}</Txt>
        <Txt style={[type(12, 500), { color: '#9a4c08' }]}>Ver →</Txt>
      </Press>
      <Section title="Fugas detectadas">
        {LEAKS.map((f, i) => (
          <Reveal key={f.t} i={i + 3}>
            <Row first={i === 0}>
              <Dot color={C.bad} size={6} />
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="body">{f.t}</Txt>
                <Txt v="small" c={C.muted}>
                  {f.d}
                </Txt>
              </View>
            </Row>
          </Reveal>
        ))}
      </Section>
    </TabScreen>
  );
}

/** o2 · Aprovações (estornos, caixas, preços e actividades). */
export function Aprovacoes() {
  const toast = useToast();
  const { approvals, decide, activities, setActivityState } = useMuntu();
  const open = APPROVALS.filter((a) => !approvals[a.id]);
  const acts = activities.filter((a) => a.st === 'pendente');
  const [head, ...rest] = open;
  const approve = async (id: string, label: string) => {
    haptic('heavy');
    const ok = await confirmBiometric(`Aprovar: ${label}`);
    if (!ok) {
      haptic('error');
      return toast('Aprovação cancelada', 'bad');
    }
    decide(id, 'ok');
    toast('Aprovado');
  };
  return (
    <TabScreen role="dono" eyebrow={`${open.length + acts.length} pedidos à espera`} title="Aprovações">
      {head ? (
        <Animated.View key={head.id} entering={FadeInDown} exiting={FadeOut} style={{ backgroundColor: C.sand, padding: GUTTER, gap: 10 }}>
          <Txt v="label" c={C.muted}>
            {head.k}
          </Txt>
          <Txt style={type(38, 300)}>{`${head.v < 0 ? '−' : ''}${kn(head.v)},00`}</Txt>
          <Txt v="body">{head.t}</Txt>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            <Button label="Recusar" kind="outline" style={{ flex: 1 }} feedback="warning" onPress={() => (decide(head.id, 'no'), toast('Recusado', 'info'))} />
            <Button label="Aprovar · Face ID" style={{ flex: 1.4 }} onPress={() => approve(head.id, head.k)} />
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={ZoomIn} style={{ margin: GUTTER, backgroundColor: C.okBg, padding: 16 }}>
          <Txt v="bodyStrong" c={C.ok}>
            Sem pedidos financeiros à espera.
          </Txt>
        </Animated.View>
      )}
      {acts.length ? (
        <Section title="Actividades propostas pelos PT">
          {acts.map((a, i) => (
            <Reveal key={a.id} i={i}>
              <Animated.View layout={LinearTransition} style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Txt v="label" c={C.muted}>
                    {ACT_KIND[a.tipo]}
                  </Txt>
                  <Badge label={ACT_STATE[a.st][0]} tone={ACT_STATE[a.st][1]} />
                </View>
                <Txt style={type(16, 500)}>{a.t}</Txt>
                <Txt v="small" c={C.muted}>
                  {a.when} · {a.meta}
                </Txt>
                <Txt v="tiny" c={C.faint}>
                  Criado por {a.by}
                </Txt>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                  <Button label="Recusar" kind="outline" style={{ flex: 1 }} onPress={() => (setActivityState(a.id, 'recusado'), toast('Recusado. O PT foi avisado.', 'info'))} />
                  <Button label="Aprovar" style={{ flex: 1 }} feedback="success" onPress={() => (setActivityState(a.id, 'aprovado'), toast('Aprovado. Já aparece aos membros.'))} />
                </View>
              </Animated.View>
            </Reveal>
          ))}
        </Section>
      ) : null}
      {rest.length ? (
        <Section title="Outros pedidos">
          {rest.map((p, i) => (
            <Reveal key={p.id} i={i}>
              <Row first={i === 0}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="label" c={C.muted}>
                    {p.k}
                  </Txt>
                  <Txt v="body">{p.t}</Txt>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <Txt v="bodyStrong">{`${p.v < 0 ? '−' : ''}${kn(p.v)},00`}</Txt>
                  <Button label="Aprovar" size="xs" onPress={() => approve(p.id, p.k)} />
                </View>
              </Row>
            </Reveal>
          ))}
        </Section>
      ) : null}
    </TabScreen>
  );
}

/** o5 · Equipa (presentes e estatísticas). */
export function EquipaDono() {
  const router = useRouter();
  const [tab, setTab] = useState<'now' | 'stats'>('now');
  const pres = STAFF.filter((p) => p.on).length;
  return (
    <TabScreen role="dono" eyebrow={`MWANGOLÉ FIT · ${pres} de ${STAFF.length} presentes`} title="Equipa" footer={<Footer label="Enviar aviso à equipa" onPress={() => router.push('/avisos-equipa')} />}>
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 14 }}>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { v: 'now', l: 'Presentes' },
            { v: 'stats', l: 'Estatísticas · Out' },
          ]}
        />
      </View>
      {tab === 'now' ? (
        <Section first>
          {STAFF.map((p, i) => (
            <Reveal key={p.i} i={i}>
              <Row first={i === 0}>
                <Avatar initials={p.i} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt v="bodyStrong">{p.n}</Txt>
                  <Txt v="small" c={C.muted}>
                    {p.r} · {p.f}
                  </Txt>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Dot size={6} color={p.on ? C.ok : C.faint} />
                  <Txt style={[type(12, p.on ? 600 : 400), { color: p.on ? C.ok : C.muted }]}>{p.since}</Txt>
                </View>
              </Row>
            </Reveal>
          ))}
        </Section>
      ) : (
        <>
          <View style={{ flexDirection: 'row', backgroundColor: C.sand, marginTop: 14 }}>
            {[
              ['249h', 'Horas no mês'],
              ['94%', 'Assiduidade'],
              ['104', 'Sessões PT'],
            ].map(([v, l], i) => (
              <View key={l} style={{ flex: 1, padding: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
                <Txt style={type(24, 300)}>{v}</Txt>
                <Txt v="label" c={C.muted}>
                  {l}
                </Txt>
              </View>
            ))}
          </View>
          <Section first>
            {STAFF.map((p, i) => (
              <Reveal key={p.i} i={i}>
                <Row first={i === 0}>
                  <Avatar initials={p.i} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{p.n}</Txt>
                    <Txt v="small" c={p.warn ? C.bad : C.muted}>
                      {p.k}
                    </Txt>
                    <Progress value={parseInt(p.ass, 10) / 100} color={p.warn ? C.bad : C.ink} style={{ marginTop: 4 }} />
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Txt v="bodyStrong">{p.h}</Txt>
                    <Txt v="tiny" c={C.muted}>
                      {p.ass} assiduidade
                    </Txt>
                  </View>
                </Row>
              </Reveal>
            ))}
          </Section>
        </>
      )}
    </TabScreen>
  );
}

/** o4 · Conta do dono (gestão do ginásio). */
export function ContaDono() {
  const router = useRouter();
  const { prefs, togglePref, signOut } = useMuntu();
  const links: [string, string, string][] = [
    ['Abrir nova filial', 'Copia planos, regras e permissões', '/nova-filial'],
    ['Regras de aprovação', 'Descontos, estornos, despesas e preços', '/regras'],
    ['Cofre de documentos', 'Contratos, comprovativos, manutenção', '/cofre'],
    ['Importar dados', 'Membros e funcionários de planilhas', '/importar'],
    ['Programa de indicação', '1 mês grátis após 2 mensalidades', '/indicacoes'],
  ];
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <TopBar role="dono" />
      <Page>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: GUTTER, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: C.line }}>
          <Avatar initials="PN" size={52} bg={C.accent} fg={C.ink} />
          <View style={{ gap: 2 }}>
            <Txt style={type(22, 400, 0.12, true)}>Paulo Neto</Txt>
            <Txt v="small" c={C.muted}>
              Dono · Mwangolé Fit
            </Txt>
          </View>
        </View>
        <Section title="Equipa" right={<Txt style={[type(10, 600, 0.16, true), { color: '#9a4c08' }]}>+ Convidar</Txt>}>
          {STAFF.slice(0, 3).map((p, i) => (
            <Row key={p.i} first={i === 0}>
              <Avatar initials={p.i} />
              <View style={{ gap: 2 }}>
                <Txt v="bodyStrong">{p.n}</Txt>
                <Txt v="small" c={C.muted}>
                  {p.r} · {p.f}
                </Txt>
              </View>
            </Row>
          ))}
        </Section>
        <Section title="Gestão do ginásio">
          {links.map(([t, d, to], i) => (
            <Press key={t} onPress={() => router.push(to as any)} style={({ hovered }) => ({ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, backgroundColor: hovered ? C.canvas : 'transparent' })}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{t}</Txt>
                <Txt v="small" c={C.muted}>
                  {d}
                </Txt>
              </View>
              <Txt v="body">→</Txt>
            </Press>
          ))}
        </Section>
        <Section title="Controlo">
          {[
            ['bio', 'Aprovar com Face ID'],
            ['fug', 'Alertas de fugas por SMS'],
          ].map(([k, l], i) => (
            <Row key={k} first={i === 0}>
              <Txt v="body" style={{ flex: 1 }}>
                {l}
              </Txt>
              <Toggle on={!!prefs[k!]} onChange={() => togglePref(k!)} />
            </Row>
          ))}
          {[
            ['Desconto máximo · recepção', '10%'],
            ['Tolerância antes de bloquear', '7 dias'],
          ].map(([k, v]) => (
            <Row key={k}>
              <Txt v="body" style={{ flex: 1 }}>
                {k}
              </Txt>
              <Txt v="body" c={C.muted}>
                {v}
              </Txt>
            </Row>
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

/** o3 · Filiais e comparação. */
export function Filiais() {
  const router = useRouter();
  const [m, setM] = useState('ret');
  const M = COMPARE[m]!;
  const mx = Math.max(...M.rows.map((r) => r[1]));
  return (
    <StackScreen back="Painel" eyebrow="Outubro · 3 filiais" title="Filiais" footer={<Footer label="+ Nova filial" onPress={() => router.push('/nova-filial')} />}>
      <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
        {[
          ['1 284', 'Membros activos'],
          ['94%', 'Cobrado · rede'],
        ].map(([v, l], i) => (
          <View key={l} style={{ flex: 1, paddingHorizontal: GUTTER, paddingVertical: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
            <Txt style={type(26, 300)}>{v}</Txt>
            <Txt v="label" c={C.muted}>
              {l}
            </Txt>
          </View>
        ))}
      </View>
      <Section title="Comparar" right={<Txt v="small" c={C.muted}>últimos 90 dias</Txt>}>
        <ChipGroup size="sm" options={Object.entries(COMPARE).map(([k, v]) => [k, v.l] as const)} value={m} onChange={setM} />
        <View style={{ marginTop: 12, gap: 10 }}>
          {M.rows.map(([n, v], i) => (
            <View key={n} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Txt v="small" style={{ width: 70 }}>
                {n}
              </Txt>
              <Progress value={v / mx} color={i === 0 ? C.ink : C.stone} track={C.sand} height={10} style={{ flex: 1 }} />
              <Txt v="small" style={{ width: 56, textAlign: 'right' }}>
                {M.unit === '%' ? `${v}%` : `${(v / 1e6).toFixed(2).replace('.', ',')} M`}
              </Txt>
            </View>
          ))}
        </View>
        <Txt v="tiny" c={C.muted} style={{ marginTop: 10 }}>
          Mesmos critérios em todas as filiais. {M.note}
        </Txt>
      </Section>
      {BRANCHES.map((b, i) => (
        <Reveal key={b.n} i={i}>
          <Section>
            <View style={{ borderTopWidth: 1, borderTopColor: C.ink, paddingTop: 14, gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Txt style={type(13, 600, 0.2, true)}>{b.n}</Txt>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Dot size={6} color={b.al ? C.bad : C.ok} />
                  <Txt style={[type(10, 600, 0.14, true), { color: b.al ? C.bad : C.ok }]}>{b.al || `${Math.round((b.r / b.e) * 100)}% cobrado`}</Txt>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Txt style={type(26, 300)}>{kn(b.r)}</Txt>
                <Txt v="small" c={C.muted}>
                  de {kn(b.e)} Kz
                </Txt>
              </View>
              <Progress value={b.r / b.e} color={C.accent} />
              <View style={{ flexDirection: 'row' }}>
                {[
                  [String(b.a), 'Activos'],
                  [b.o, 'Ocupação agora'],
                  [String(b.ch), 'Check-ins hoje'],
                ].map(([v, l]) => (
                  <View key={l} style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{v}</Txt>
                    <Txt v="tiny" c={C.muted}>
                      {l}
                    </Txt>
                  </View>
                ))}
              </View>
            </View>
          </Section>
        </Reveal>
      ))}
    </StackScreen>
  );
}

/** o6 · Avisos à equipa. */
export function AvisosEquipa() {
  const { sentNotices, sendNotice } = useMuntu();
  const [to, setTo] = useState<keyof typeof NOTICE_TARGETS>('Todos');
  const [pri, setPri] = useState<'normal' | 'urgente'>('normal');
  const [text, setText] = useState('');
  const list = [...sentNotices, ...NOTICES.map((n) => ({ p: n.p, t: n.t, h: n.h, to: n.to as keyof typeof NOTICE_TARGETS, r: n.r, n: n.n }))];
  return (
    <StackScreen back="Equipa" eyebrow="Enviados por SMS e na app" title="Avisos">
      <Section first title="Para">
        <ChipGroup options={(Object.keys(NOTICE_TARGETS) as (keyof typeof NOTICE_TARGETS)[]).map((k) => [k, k] as const)} value={to} onChange={setTo} />
      </Section>
      <Section title="Prioridade">
        <ChipGroup
          options={[
            ['normal', 'Informação'],
            ['urgente', 'Urgente'],
          ]}
          value={pri}
          onChange={setPri}
        />
        <TextArea value={text} onChangeText={setText} placeholder="Escreve o aviso…" style={{ marginTop: 14 }} />
        <Button
          label={`Enviar a ${to === 'Todos' ? 'toda a equipa' : to} · ${NOTICE_TARGETS[to]}`}
          size="lg"
          full
          disabled={!text.trim()}
          feedback="success"
          style={{ marginTop: 12 }}
          onPress={() => {
            sendNotice({ p: pri, t: text.trim(), to });
            setText('');
          }}
        />
      </Section>
      <Section title="Enviados">
        {list.map((a, i) => (
          <Reveal key={a.t + i} i={i}>
            <View style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Badge label={ST[a.p][0]} tone={ST[a.p][1]} />
                <Txt v="small" c={C.muted}>
                  {a.h} · {a.to}
                </Txt>
              </View>
              <Txt v="body">{a.t}</Txt>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Progress value={a.r / a.n} color={C.ok} style={{ flex: 1 }} />
                <Txt v="tiny" c={C.muted}>
                  Lido por {a.r} de {a.n}
                </Txt>
              </View>
            </View>
          </Reveal>
        ))}
      </Section>
    </StackScreen>
  );
}

/** o8 · Receitas perdidas. */
export function ReceitasPerdidas() {
  const { lostState, lostSent, setLost, sendLost } = useMuntu();
  const [tab, setTab] = useState<'pot' | 'conf' | 'res'>('pot');
  const st = (id: string, def: 'pot' | 'conf' | 'res') => lostState[id] ?? def;
  const list = LOST.filter((l) => st(l.id, l.st) === tab);
  return (
    <StackScreen back="Painel" eyebrow="MWANGOLÉ FIT · Outubro" title="Receitas perdidas">
      <View style={{ flexDirection: 'row', backgroundColor: C.sand }}>
        {(
          [
            ['pot', 'Por rever', C.ink],
            ['conf', 'Confirmado', C.bad],
            ['res', 'Resolvido', C.ok],
          ] as const
        ).map(([k, l, c], i) => (
          <View key={k} style={{ flex: 1, padding: 14, gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: C.paper }}>
            <CountUp value={lostTotal(lostState, k)} format={kn} style={[type(22, 300), { color: c }]} />
            <Txt v="label" c={C.muted}>
              {l}
            </Txt>
          </View>
        ))}
      </View>
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 14 }}>
        <Segmented
          value={tab}
          onChange={setTab}
          options={(['pot', 'conf', 'res'] as const).map((k) => ({ v: k, l: { pot: 'Por rever', conf: 'Confirmadas', res: 'Resolvidas' }[k], n: LOST.filter((x) => st(x.id, x.st) === k).length }))}
        />
        <Txt v="small" c={C.muted} style={{ marginTop: 10 }}>
          Indícios para rever. Uma suspeita só passa a perda depois de confirmada.
        </Txt>
      </View>
      <Section first>
        {list.map((l, i) => {
          const sent = !!lostSent[l.id];
          const s = st(l.id, l.st);
          return (
            <Reveal key={l.id} i={i}>
              <Animated.View layout={LinearTransition} style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Txt v="label" c={C.muted}>
                    {l.cat}
                  </Txt>
                  <Txt v="bodyStrong">{l.v ? `${kn(l.v)} Kz` : 'Sem valor'}</Txt>
                </View>
                <Txt v="bodyStrong">{l.t}</Txt>
                <Txt v="small" c={C.muted}>
                  {l.o} · resp. {l.r}
                </Txt>
                {s !== 'res' ? (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                    {l.a ? <Button label={l.a} size="sm" disabled={sent} onPress={() => sendLost(l.id)} /> : null}
                    {s === 'pot' ? <Button label="Confirmar perda" kind="outline" size="sm" feedback="warning" onPress={() => setLost(l.id, 'conf')} /> : null}
                    <Button label="Resolvido" kind="outline" size="sm" feedback="success" onPress={() => setLost(l.id, 'res')} />
                  </View>
                ) : null}
                {sent ? (
                  <Txt v="tiny" c={C.muted}>
                    Pedido enviado a {l.r.split(' ')[0]} · aguarda resposta
                  </Txt>
                ) : null}
              </Animated.View>
            </Reveal>
          );
        })}
        {!list.length ? (
          <Txt v="small" c={C.muted} style={{ paddingVertical: 16 }}>
            Nada nesta lista.
          </Txt>
        ) : null}
      </Section>
    </StackScreen>
  );
}

const NFX = [
  ['planos', 'Planos e preços', '5 planos'],
  ['horarios', 'Horários e turnos', 'Manhã 06–14 · Tarde 14–22'],
  ['regras', 'Regras de aprovação', 'Limites de desconto, estornos, despesas'],
  ['perm', 'Permissões da equipa', 'Recepção, finanças e PT'],
  ['avisos', 'Avisos automáticos', '12 SMS da jornada do membro'],
] as const;

/** o9 · Nova filial (copia uma existente). */
export function NovaFilial() {
  const router = useRouter();
  const [n, setN] = useState('Viana');
  const [c, setC] = useState('Luanda');
  const [from, setFrom] = useState('Talatona');
  const [x, setX] = useState<Record<string, boolean>>({ planos: true, horarios: true, regras: true, perm: true, avisos: true });
  const [team, setTeam] = useState<string[]>(['Celma Bento']);
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);
  if (done)
    return (
      <StackScreen back="Filiais" eyebrow="Replica uma filial existente" title="Nova filial">
        <Animated.View entering={ZoomIn.springify().damping(14)} style={{ margin: GUTTER, backgroundColor: C.okBg, padding: 18, gap: 10 }}>
          <Txt v="label" c={C.ok}>
            Filial criada
          </Txt>
          <Txt v="body">
            Filial {n || 'nova'} criada a partir de {from}. Copiado: {NFX.filter(([k]) => x[k]).map(([, l]) => l.toLowerCase()).join(', ')}. Equipa: {team.join(', ') || 'por atribuir'}.
          </Txt>
          <Button label="Ver filiais" onPress={() => router.back()} />
        </Animated.View>
      </StackScreen>
    );
  return (
    <StackScreen
      back="Filiais"
      eyebrow="Replica uma filial existente"
      title="Nova filial"
      footer={
        <Footer
          label="Criar filial"
          onPress={() => {
            if (n.trim().length < 3) {
              haptic('error');
              return setErr('Dá um nome à filial.');
            }
            haptic('success');
            setDone(true);
          }}
        />
      }
    >
      <Section first>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Field style={{ flex: 1 }} label="Nome" value={n} onChangeText={(v) => (setN(v), setErr(''))} />
          <Field style={{ flex: 1 }} label="Cidade" value={c} onChangeText={setC} />
        </View>
        <Select style={{ marginTop: 18 }} label="Copiar de" value={from} onChange={setFrom} options={['Talatona', 'Kilamba', 'Maianga'].map((v) => ({ v, l: v }))} />
      </Section>
      <Section title="O que copiar">
        {NFX.map(([k, l, d], i) => (
          <View key={k} style={{ paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
            <Checkbox on={!!x[k]} onChange={() => setX({ ...x, [k]: !x[k] })} label={l} sub={d} />
          </View>
        ))}
        <Note text="Membros, pagamentos, caixas e documentos pessoais não são copiados." style={{ marginTop: 8 }} />
      </Section>
      <Section title="Equipa inicial">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {['Celma Bento', 'Teresa Lunda', 'Rui Manuel', 'Hélio Matias'].map((p) => (
            <Chip key={p} label={p.split(' ')[0]!} on={team.includes(p)} onPress={() => setTeam(team.includes(p) ? team.filter((y) => y !== p) : [...team, p])} />
          ))}
        </View>
        {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
      </Section>
    </StackScreen>
  );
}

/** o10 · Cofre de documentos. */
export function Cofre() {
  const toast = useToast();
  const [cat, setCat] = useState('Todos');
  const [extra, setExtra] = useState(0);
  const all = [
    ...Array.from({ length: extra }, (_, i) => ({ n: `Documento carregado ${extra - i}`, cat: 'Comprovativos', f: 'Talatona', dt: 'Agora', keep: 'Conservar até 2036', perm: 'Dono · Finanças', ext: 'PDF', al: false })),
    ...DOCUMENTS,
  ];
  const list = all.filter((d) => cat === 'Todos' || d.cat === cat);
  return (
    <StackScreen
      back="Conta"
      eyebrow={`MWANGOLÉ FIT · ${all.length} documentos`}
      title="Cofre"
      footer={
        <Footer
          label="+ Carregar documento"
          onPress={() => {
            setExtra(extra + 1);
            setCat('Todos');
            toast('Documento guardado no cofre');
          }}
        />
      }
    >
      <Section first>
        <ChipGroup size="sm" options={['Todos', 'Contratos', 'Comprovativos', 'Manutenção', 'Licenças'].map((v) => [v, v] as const)} value={cat} onChange={setCat} />
        <Note tone="bad" text="Licença de actividade da Kilamba expira em 21 dias." style={{ marginTop: 12 }} />
      </Section>
      <Section first>
        {list.map((d, i) => (
          <Reveal key={d.n + i} i={i}>
            <Row first={i === 0} style={{ alignItems: 'flex-start' }}>
              <View style={{ width: 36, height: 44, backgroundColor: C.sand, alignItems: 'center', justifyContent: 'center' }}>
                <Txt style={type(8, 600, 0.1)}>{d.ext}</Txt>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{d.n}</Txt>
                <Txt v="small" c={C.muted}>
                  {d.cat} · {d.f} · {d.dt}
                </Txt>
                <Txt v="small" c={d.al ? C.bad : C.muted}>
                  {d.keep}
                </Txt>
                <Txt v="tiny" c={C.faint}>
                  Acesso: {d.perm}
                </Txt>
              </View>
            </Row>
          </Reveal>
        ))}
      </Section>
    </StackScreen>
  );
}

/** o11 · Regras de aprovação. */
export function Regras() {
  const toast = useToast();
  const [v, setV] = useState({ dRec: 10, dGes: 25, dFin: 20000, eFin: 0 });
  const [bio, setBio] = useState(true);
  const kz = (x: number) => (x ? `${kn(x)} Kz` : 'Nenhum');
  const set = (k: keyof typeof v) => (x: number) => setV({ ...v, [k]: x });
  const block = (n: string, d: string, rows: React.ReactNode) => (
    <Section title={n}>
      <Txt v="small" c={C.muted} style={{ marginTop: -4, marginBottom: 6 }}>
        {d}
      </Txt>
      {rows}
    </Section>
  );
  const tier = (who: string, right: React.ReactNode, first?: boolean) => (
    <Row first={first} pad={10}>
      <Txt v="body" style={{ flex: 1 }}>
        {who}
      </Txt>
      {right}
    </Row>
  );
  return (
    <StackScreen back="Conta" eyebrow="Quem pode autorizar o quê" title="Regras" footer={<Footer label="Guardar regras" onPress={() => toast('Regras guardadas')} />}>
      {block(
        'Descontos',
        'Acima do limite vai para o nível seguinte',
        <>
          {tier('Recepção até', <Stepper value={v.dRec} step={5} max={50} onChange={set('dRec')} format={(x) => `${x}%`} />, true)}
          {tier('Gestor até', <Stepper value={v.dGes} step={5} max={100} onChange={set('dGes')} format={(x) => `${x}%`} />)}
          {tier('Acima disso', <Txt v="body" c={C.muted}>Dono</Txt>)}
        </>,
      )}
      {block(
        'Estornos',
        'Recepção pede, nunca aprova',
        <>
          {tier('Finanças aprova até', <Stepper value={v.eFin} step={5000} max={100000} onChange={set('eFin')} format={kz} width={140} />, true)}
          {tier('Acima disso', <Txt v="body" c={C.muted}>Dono</Txt>)}
        </>,
      )}
      {block(
        'Despesas',
        'Com recibo anexado',
        <>
          {tier('Finanças até', <Stepper value={v.dFin} step={5000} max={500000} onChange={set('dFin')} format={kz} width={140} />, true)}
          {tier('Acima disso', <Txt v="body" c={C.muted}>Dono</Txt>)}
        </>,
      )}
      {block('Alteração de preços', 'Membros avisados por SMS 30 dias antes', tier('Quem aprova', <Txt v="body" c={C.muted}>Só o dono</Txt>, true))}
      <Section>
        <Row first>
          <Txt v="body" style={{ flex: 1 }}>
            Aprovar com Face ID
          </Txt>
          <Toggle on={bio} onChange={setBio} />
        </Row>
      </Section>
    </StackScreen>
  );
}

/** o12 · Programa de indicações (gestão). */
export function Indicacoes() {
  const toast = useToast();
  const [rew, setRew] = useState<keyof typeof REWARDS>('mes');
  const [cond, setCond] = useState(2);
  const [rev, setRev] = useState<Record<string, 'ok' | 'no'>>({});
  const pending = REFERRAL_REVIEW.filter((r) => !rev[r.id]);
  return (
    <StackScreen back="Conta" eyebrow="Membros que trazem membros" title="Indicações">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: C.sand }}>
        {[
          ['18', 'Inscrições por indicação · Out'],
          ['684 000', 'Kz recebidos dos indicados'],
          ['135 000', 'Kz em recompensas'],
          ['5,1×', 'Retorno'],
        ].map(([v, l], i) => (
          <View key={l} style={{ width: '50%', padding: 14, gap: 4, borderLeftWidth: i % 2 ? 1 : 0, borderTopWidth: i > 1 ? 1 : 0, borderColor: C.paper }}>
            <Txt style={type(22, 300)}>{v}</Txt>
            <Txt v="label" c={C.muted}>
              {l}
            </Txt>
          </View>
        ))}
      </View>
      <Section title="A validar">
        {pending.map((r, i) => (
          <Animated.View key={r.id} entering={FadeInDown} exiting={FadeOut} layout={LinearTransition} style={{ paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 8 }}>
            <Txt v="bodyStrong">{r.t}</Txt>
            <Txt v="small" c={C.bad}>
              {r.why}
            </Txt>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button label="Não elegível" kind="outline" size="sm" style={{ flex: 1 }} onPress={() => setRev({ ...rev, [r.id]: 'no' })} />
              <Button label="Validar" size="sm" style={{ flex: 1 }} feedback="success" onPress={() => setRev({ ...rev, [r.id]: 'ok' })} />
            </View>
          </Animated.View>
        ))}
        {!pending.length ? (
          <Txt v="small" c={C.muted}>
            Nada por validar.
          </Txt>
        ) : null}
      </Section>
      <Section title="Regras">
        <Txt v="label" c={C.muted} style={{ marginBottom: 8 }}>
          Recompensa do membro
        </Txt>
        <ChipGroup size="sm" options={(Object.keys(REWARDS) as (keyof typeof REWARDS)[]).map((k) => [k, REWARDS[k]] as const)} value={rew} onChange={setRew} />
        <Txt v="label" c={C.muted} style={{ marginTop: 14, marginBottom: 8 }}>
          Liberta após
        </Txt>
        <ChipGroup size="sm" options={[1, 2, 3].map((n) => [String(n), `${n} ${n === 1 ? 'mensalidade' : 'mensalidades'}`] as const)} value={String(cond)} onChange={(v) => setCond(+v)} />
        <Note text={`${REWARDS[rew]} após ${cond} ${cond === 1 ? 'mensalidade' : 'mensalidades'}.`} style={{ marginTop: 14 }} />
        <Button label="Guardar" size="lg" full style={{ marginTop: 12 }} onPress={() => toast('Programa actualizado')} />
      </Section>
    </StackScreen>
  );
}
