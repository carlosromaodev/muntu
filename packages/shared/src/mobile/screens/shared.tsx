import React, { useEffect, useRef, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ACT_KIND, ActivityKind, CAP, GOOD_RESULTS, NOTICES, OCC, OCC_NOW, lotLevel, PRESENT, RENEW_REASONS, RENEW_RESULTS, RENEWALS, RISK, RISK_REASONS, RISK_RESULTS, Role, ROLE_INFO, SHIFT_WEEK, STAFF, ST } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { initials, kn } from '../../lib/format';
import { unreadCount, useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { M, Avatar, Badge, Bars, Button, Chip, ChipGroup, CountUp, Field, Note, Progress, Reveal, Row, Segmented, Select, TextArea, Txt, useToast, Press, Dot } from '../../ui';
import { Footer, Page, Section, StackScreen, TabScreen, useHome } from '../Layout';
import { home } from '../nav';

/** e1 · Avisos recebidos pela equipa. */
export function Avisos({ role }: { role: Role }) {
  const router = useRouter();
  const { readNotices, markRead } = useMuntu();
  const un = unreadCount(readNotices);
  return (
    <TabScreen role={role} eyebrow={un ? `${un} por ler` : 'Tudo lido'} title="Avisos" titleRight={<Button label="+ Ocorrência" kind="outline" size="sm" onPress={() => router.push('/ocorrencia')} />}>
      <Section first>
        {NOTICES.map((a, i) => {
          const rd = !!readNotices[a.id];
          return (
            <Reveal key={a.id} i={i}>
              <Animated.View layout={M.layout()}>
              <View style={{ paddingVertical: 16, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 10, opacity: rd ? 0.6 : 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Badge label={ST[a.p][0]} tone={ST[a.p][1]} />
                  <Txt v="small" c={C.muted}>
                    {a.h}
                  </Txt>
                </View>
                <Txt style={[type(15, 400), { lineHeight: 21 }]}>{a.t}</Txt>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <Txt v="small" c={C.muted} style={{ flex: 1 }}>
                    {a.de} · para {a.to}
                  </Txt>
                  {rd ? (
                    <Animated.View entering={M.fade()}>
                      <Txt style={[type(10, 600, 0.14, true), { color: C.ok }]}>Lido ✓</Txt>
                    </Animated.View>
                  ) : (
                    <Button label="Marcar como lido" kind="outline" size="sm" feedback="success" onPress={() => markRead(a.id)} />
                  )}
                </View>
              </View>
              </Animated.View>
            </Reveal>
          );
        })}
      </Section>
    </TabScreen>
  );
}

/** e2 · O meu turno (equipa). */
export function Turno({ role }: { role: Role }) {
  const router = useRouter();
  const { onShift, setShift, signOut } = useMuntu();
  const info = ROLE_INFO[role];
  const passa = role === 'rececao' || role === 'financas';
  const max = 8.2;
  return (
    <TabScreen role={role} eyebrow={`${info.name} · ${info.filial}`} title="Turno">
      <Animated.View layout={M.layout()} style={{ backgroundColor: onShift ? C.accent : C.sand, padding: GUTTER, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Dot size={8} color={onShift ? C.ink : C.faint} />
          <Txt v="label">{onShift ? 'Em turno desde 06:58' : 'Fora de turno'}</Txt>
        </View>
        <Txt style={type(44, 300)}>{onShift ? '2h 43m' : '—'}</Txt>
        <Button
          label={onShift ? (passa ? 'Passar turno' : 'Terminar turno') : 'Iniciar turno'}
          size="lg"
          full
          feedback="press"
          onPress={() => (onShift && passa ? router.push('/passar-turno') : setShift(!onShift))}
        />
      </Animated.View>
      <Section title="Esta semana · 29h 24m">
        <Bars data={SHIFT_WEEK.map(([, h]) => Math.max(0.35, h))} max={max} height={96} gap={6} colors={(i) => (i === 3 ? C.accent : SHIFT_WEEK[i]![1] ? C.ink : C.line)} labels={SHIFT_WEEK.map(([l]) => l)} />
      </Section>
      <Section>
        {[
          ['Perfil', info.label],
          ['Telemóvel', info.tel],
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
        <Press onPress={() => {}} style={{ flexDirection: 'row', paddingVertical: 13, borderTopWidth: 1, borderTopColor: C.line }}>
          <Txt v="body" style={{ flex: 1 }}>
            Alterar senha
          </Txt>
          <Txt v="body">→</Txt>
        </Press>
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
    </TabScreen>
  );
}

/** e3 · Passar turno (entrega da caixa e pendências). */
export function PassarTurno() {
  const router = useRouter();
  const role = useMuntu((s) => s.role) ?? 'rececao';
  const { setShift, signOut } = useMuntu();
  const [cash, setCash] = useState('');
  const [just, setJust] = useState('');
  const [occ, setOcc] = useState<string[]>([]);
  const [occT, setOccT] = useState('');
  const [to, setTo] = useState('Teresa Lunda');
  const [err, setErr] = useState('');
  const [st, setSt] = useState<'form' | 'wait' | 'done'>('form');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);
  const exp = 108000;
  const n = parseInt(cash.replace(/\D/g, ''), 10);
  const has = !isNaN(n);
  const dif = has ? n - exp : 0;
  const name = ROLE_INFO[role].name;
  const submit = () => {
    if (!has) return fail('Conte o dinheiro em caixa antes de entregar.');
    if (dif !== 0 && just.trim().length < 5) return fail('Há diferença. Escreva a justificação.');
    setErr('');
    setSt('wait');
    haptic('press');
    timer.current = setTimeout(() => {
      setSt('done');
      setShift(false);
      haptic(dif ? 'warning' : 'success');
    }, 2500);
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  return (
    <StackScreen back="Turno" eyebrow={`${role === 'financas' ? 'Rede' : 'Talatona'} · Manhã · 06:58–14:00`} title="Passar turno" footer={st === 'form' ? <Footer label="Entregar turno" onPress={submit} /> : undefined}>
      {st === 'form' ? (
        <>
          <Section title="Caixa do turno" first>
            <View style={{ flexDirection: 'row', paddingBottom: 6 }}>
              {['Meio', 'Esperado', 'Contado'].map((h, i) => (
                <Txt key={h} v="label" c={C.muted} style={{ flex: i ? 0.9 : 1.2, textAlign: i ? 'right' : 'left' }}>
                  {h}
                </Txt>
              ))}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
              <View style={{ flex: 1.2 }}>
                <Txt v="bodyStrong">Dinheiro</Txt>
                <Txt v="tiny" c={C.muted}>
                  inclui fundo 20 000
                </Txt>
              </View>
              <Txt v="body" numberOfLines={1} style={{ flex: 0.9, textAlign: 'right' }}>
                {kn(exp)}
              </Txt>
              <TextInput
                value={cash}
                onChangeText={(v) => (setCash(v), setErr(''))}
                placeholder="Contar"
                keyboardType="number-pad"
                placeholderTextColor={C.faint}
                accessibilityLabel="Dinheiro contado"
                style={[type(14, 500), { flex: 0.9, marginLeft: 8, textAlign: 'right', borderBottomWidth: 1, borderBottomColor: C.ink, paddingVertical: 6, color: C.ink, outlineStyle: 'none' } as any]}
              />
            </View>
            {[
              ['TPA', 22000],
              ['Multicaixa Express', 64500],
              ['Transferência', 10000],
            ].map(([l, v]) => (
              <View key={l} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
                <Txt v="body" style={{ flex: 1.2 }}>
                  {l}
                </Txt>
                <Txt v="body" numberOfLines={1} style={{ flex: 0.9, textAlign: 'right' }}>
                  {kn(v as number)}
                </Txt>
                <Txt numberOfLines={1} style={[type(10, 600, 0.1), { flex: 0.9, textAlign: 'right', color: C.ok }]}>Confirmado ✓</Txt>
              </View>
            ))}
            <Animated.View layout={M.layout()} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, marginTop: 6, backgroundColor: !has ? C.sand : dif === 0 ? C.okBg : C.badBg }}>
              <Txt v="bodyStrong">Diferença</Txt>
              <Txt v="bodyStrong" c={!has ? C.grey : dif === 0 ? C.ok : C.bad}>
                {has ? `${dif > 0 ? '+' : dif < 0 ? '−' : ''}${kn(Math.abs(dif))} Kz` : 'Conte o dinheiro'}
              </Txt>
            </Animated.View>
            {has && dif !== 0 ? (
              <Animated.View entering={M.enter()} style={{ marginTop: 12, gap: 8 }}>
                <Txt v="eyebrow" c={C.muted}>
                  Justificação · obrigatória
                </Txt>
                <TextArea value={just} onChangeText={(v) => (setJust(v), setErr(''))} placeholder="O que aconteceu" />
              </Animated.View>
            ) : null}
          </Section>
          <Section title="Pendências que passam">
            {[
              ['2 cobranças por fazer', 'Mário Sebastião · Celso Pedro'],
              ['1 factura por emitir', 'Bar · venda #1094 · 3 500 Kz'],
            ].map(([t, d], i) => (
              <Row key={t} first={i === 0}>
                <View style={{ gap: 2 }}>
                  <Txt v="bodyStrong">{t}</Txt>
                  <Txt v="small" c={C.muted}>
                    {d}
                  </Txt>
                </View>
              </Row>
            ))}
          </Section>
          <Section title="Ocorrências">
            {[
              { l: 'Avaria', tone: 'bad' as const, t: 'Catraca 2 em manutenção', d: 'Reportado às 07:10 · técnico chega às 11:00' },
              { l: 'Reclamação', tone: 'warn' as const, t: 'Ar condicionado da sala 2 fraco', d: 'Reclamação de Ana Domingos · 08:30' },
              ...occ.map((t) => ({ l: 'Nota', tone: 'neutral' as const, t, d: `Agora · ${name}` })),
            ].map((o, i) => (
              <Reveal key={o.t + i} i={i}>
                <Row first={i === 0} style={{ alignItems: 'flex-start' }}>
                  <Badge label={o.l} tone={o.tone} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{o.t}</Txt>
                    <Txt v="small" c={C.muted}>
                      {o.d}
                    </Txt>
                  </View>
                </Row>
              </Reveal>
            ))}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, alignItems: 'flex-end' }}>
              <Field style={{ flex: 1 }} value={occT} onChangeText={setOccT} placeholder="Nova ocorrência ou avaria" onSubmitEditing={() => occT.trim() && (setOcc([...occ, occT.trim()]), setOccT(''))} />
              <Button label="Juntar" kind="outline" size="sm" disabled={!occT.trim()} onPress={() => (setOcc([...occ, occT.trim()]), setOccT(''))} />
            </View>
          </Section>
          <Section>
            <Select label="Entregar a" value={to} onChange={setTo} options={['Teresa Lunda', 'Rui Manuel'].map((v) => ({ v, l: v }))} />
            {err ? <Note tone="bad" text={err} style={{ marginTop: 12 }} /> : null}
          </Section>
        </>
      ) : st === 'wait' ? (
        <Animated.View entering={M.fade()} style={{ padding: GUTTER, gap: 10 }}>
          <View style={{ backgroundColor: C.sand, padding: 18, gap: 8 }}>
            <Txt v="label">A aguardar confirmação</Txt>
            <Txt v="body">{to} confirma a contagem e as pendências na app dela.</Txt>
            <Progress value={1} color={C.accent} style={{ marginTop: 8 }} />
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={M.pop()} style={{ padding: GUTTER, gap: 14 }}>
          <View style={{ backgroundColor: dif ? C.warnBg : C.okBg, padding: 18, gap: 8 }}>
            <Txt v="label" c={dif ? C.warn : C.ok}>
              Turno entregue
            </Txt>
            <Txt v="body">
              Confirmado por {to} às 14:02.{dif ? ` A diferença de ${kn(Math.abs(dif))} Kz fica no turno de ${name}, com a justificação, e vai para aprovação do dono.` : ' Sem diferenças.'}
            </Txt>
          </View>
          <Button
            label="Terminar sessão"
            size="lg"
            full
            onPress={() => {
              signOut();
              router.replace('/');
            }}
          />
        </Animated.View>
      )}
    </StackScreen>
  );
}

/** Quem está dentro agora (só a equipa vê). Primeiros 5, com pesquisa e "Ver todos". */
function PresentList() {
  const [q, setQ] = useState('');
  const [all, setAll] = useState(false);
  // No telemóvel a lista mostra os 10 check-ins mais recentes, com a zona sem o prefixo "Aula ·".
  const list = PRESENT.slice(0, 10).map((p) => ({ ...p, z: p.z.replace('Aula · ', ''), pl: p.pl.replace('visita ', '') }));
  const ql = q.trim().toLowerCase();
  const shown = (all || ql ? list : list.slice(0, 5)).filter((p) => !ql || p.n.toLowerCase().includes(ql));
  return (
    <Section title="Membros presentes" right={<Txt v="label" c={C.muted}>{`${list.length} com check-in`}</Txt>}>
      <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, backgroundColor: C.sand, marginBottom: 6 }}>
        <View style={{ width: 11, height: 11, borderWidth: 1.5, borderColor: C.grey, borderRadius: 6 }} />
        <TextInput value={q} onChangeText={(t) => (setQ(t), setAll(true))} placeholder="Procurar quem está dentro" placeholderTextColor={C.faint} accessibilityLabel="Procurar membro presente" style={[type(14, 400), { flex: 1, minWidth: 0, color: C.ink, paddingVertical: 0 }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null]} />
      </View>
      {shown.map((p) => (
        <View key={p.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.line }}>
          <View>
            <Avatar initials={initials(p.n)} size={34} />
            <View style={{ position: 'absolute', right: -2, bottom: -2, width: 9, height: 9, borderRadius: 5, backgroundColor: C.ok }} />
          </View>
          <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
            <Txt numberOfLines={1} style={type(14, 500)}>
              {p.n}
            </Txt>
            <Txt v="small" c={C.muted}>
              {p.pl} · {p.z}
            </Txt>
          </View>
          <Txt tabular style={[type(13, 400), { color: C.grey }]}>
            {p.h}
          </Txt>
        </View>
      ))}
      {!shown.length ? (
        <Txt v="small" c={C.muted} style={{ paddingVertical: 12 }}>
          Ninguém com esse nome lá dentro.
        </Txt>
      ) : null}
      {!all && !ql ? (
        <Press feedback="select" onPress={() => setAll(true)} style={{ height: 44, justifyContent: 'center', borderTopWidth: 1, borderTopColor: C.line }}>
          <Txt style={type(10, 600, 0.18, true)}>Ver todos →</Txt>
        </Press>
      ) : null}
    </Section>
  );
}

/** m6 · Ginásio agora (lotação ao vivo). */
export function GinasioAgora() {
  const router = useRouter();
  const back = useHome();
  const now = OCC[OCC_NOW]!;
  const onFloor = STAFF.filter((p) => p.on && p.f === 'Talatona');
  const pct = Math.round((now / CAP) * 100);
  return (
    <StackScreen back={back.label} eyebrow="MWANGOLÉ FIT · Talatona · 09:41" title="Ginásio agora">
      <Section first>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <View>
            <CountUp value={now} style={type(64, 300)} />
            <Txt v="label" c={C.muted}>
              Pessoas · por check-in
            </Txt>
          </View>
          <Badge label={lotLevel(now)} tone="ok" dot />
        </View>
        <Progress value={pct / 100} color={C.accent} track={C.sand} height={6} style={{ marginTop: 14 }} />
        <Txt v="small" c={C.muted} style={{ marginTop: 6 }}>
          {pct}% da lotação · máximo {CAP} pessoas
        </Txt>
      </Section>
      <Section title="Hoje, hora a hora">
        <Bars data={OCC} max={92} height={110} gap={4} colors={(i) => (i === OCC_NOW ? C.accent : i < OCC_NOW ? C.ink : C.lineStrong)} labels={OCC.map((_, i) => String(6 + i).padStart(2, '0'))} labelEvery={4} />
        <Txt v="small" style={{ marginTop: 10 }}>
          Mais calmo entre as 11:00 e as 14:00. Mais cheio às 19:00.
        </Txt>
      </Section>
      {back.role !== 'membro' ? <PresentList /> : null}
      <Section title="Equipa presente" right={<Txt v="label" c={C.muted}>{`${onFloor.length} na Talatona`}</Txt>}>
        {onFloor.map((p, i) => (
          <Reveal key={p.i} i={i}>
            <Row first={i === 0}>
              <Avatar initials={p.i} />
              <View style={{ flex: 1, gap: 2 }}>
                <Txt v="bodyStrong">{p.n}</Txt>
                <Txt v="small" c={C.muted}>
                  {p.r} · desde {p.since}
                </Txt>
              </View>
              {p.r === 'PT' && back.role === 'membro' ? <Button label="Reservar" kind="outline" size="sm" onPress={() => router.navigate('/membro/pt')} /> : null}
            </Row>
          </Reveal>
        ))}
      </Section>
    </StackScreen>
  );
}

/** k1 · Recuperação (membros em risco e renovações). */
export function Recuperacao() {
  const back = useHome();
  const router = useRouter();
  const role = (back.role === 'membro' || back.role === 'financas' ? 'rececao' : back.role) as 'rececao' | 'pt' | 'dono';
  const { outcomes, saveOutcome } = useMuntu();
  const [tab, setTab] = useState<'risk' | 'ren'>('risk');
  const [lim, setLim] = useState(7);
  const [rlim, setRlim] = useState(7);
  const [open, setOpen] = useState<string | null>(null);
  const [mot, setMot] = useState('');
  const [res, setRes] = useState('');
  const mine = RISK.filter((r) => role === 'dono' || (role === 'pt' ? r.by === 'pt' && r.resp === 'Nuno Sebastião' : r.by === 'rececao'));
  const risk = mine.filter((r) => r.days >= lim);
  const ren = (role === 'pt' ? [] : RENEWALS).filter((r) => r.days <= rlim);
  const recCount = 9 + Object.values(outcomes).filter((d) => GOOD_RESULTS.has(d.r)).length;
  const recKz = 312000 + Object.entries(outcomes).filter(([, d]) => d.r === 'Renovou').reduce((a, [id]) => a + (RENEWALS.find((r) => r.id === id)?.v ?? 0), 0);
  const kicker = { rececao: 'Recepção · Talatona', pt: 'Os teus clientes', dono: 'Toda a rede' }[role];
  const tabs = [
    { v: 'risk' as const, l: 'Em risco', n: mine.length },
    ...(role === 'pt' ? [] : [{ v: 'ren' as const, l: 'Renovações', n: RENEWALS.length }]),
  ];

  const outcomeUi = (id: string, reasons: string[], results: string[]) => {
    const d = outcomes[id];
    if (open !== id) return null;
    return (
      <Animated.View entering={M.enter()} exiting={M.fadeOut(120)} style={{ backgroundColor: C.canvas, padding: 14, gap: 10, marginTop: 10 }}>
        <Txt v="label" c={C.muted}>
          Motivo
        </Txt>
        <ChipGroup size="sm" options={reasons.map((x) => [x, x] as const)} value={mot} onChange={setMot} />
        <Txt v="label" c={C.muted}>
          Resultado
        </Txt>
        <ChipGroup size="sm" options={results.map((x) => [x, x] as const)} value={res} onChange={setRes} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button label="Cancelar" kind="outline" size="sm" style={{ flex: 1 }} onPress={() => setOpen(null)} />
          <Button
            label="Guardar"
            size="sm"
            style={{ flex: 1 }}
            disabled={!res}
            feedback="success"
            onPress={() => {
              saveOutcome(id, { r: res, m: mot });
              setOpen(null);
            }}
          />
        </View>
        {d ? null : null}
      </Animated.View>
    );
  };
  const statusBadge = (id: string) => {
    const d = outcomes[id];
    return d ? <Badge label={d.r} tone={GOOD_RESULTS.has(d.r) ? 'ok' : 'neutral'} /> : <Badge label="Por contactar" tone="neutral" />;
  };
  const toggle = (id: string) => {
    setOpen(open === id ? null : id);
    setMot('');
    setRes('');
  };

  return (
    <StackScreen
      back={back.label}
      eyebrow={kicker}
      title="Recuperação"
      headerExtra={
        <View style={{ backgroundColor: C.accent, paddingVertical: 16, paddingHorizontal: GUTTER, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1, gap: 4 }}>
            <Txt v="eyebrow">Recuperados em Outubro</Txt>
            <Txt v="small">{recCount} membros voltaram ou renovaram · de 23 contactados</Txt>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <CountUp value={recKz} format={kn} style={type(28, 300)} />
            <Txt style={type(10, 600, 0.16, true)}>Kz recebidos</Txt>
          </View>
        </View>
      }
    >
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 14 }}>
        <Segmented options={tabs} value={tab} onChange={setTab} />
      </View>
      {tab === 'risk' ? (
        <Section first>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Txt v="label" c={C.muted} style={{ width: 70 }}>
              Sem entradas há
            </Txt>
            <ChipGroup size="sm" options={[7, 14, 30].map((v) => [String(v), `${v} dias`] as const)} value={String(lim)} onChange={(v) => setLim(+v)} />
          </View>
          <Txt v="small" c={C.muted} style={{ marginBottom: 6 }}>
            Comparado com o padrão habitual de cada membro. Excluídos 4 membros com plano congelado ou pausa autorizada.
          </Txt>
          {risk.map((r, i) => (
            <Reveal key={r.id} i={i}>
              <View style={{ paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{r.n}</Txt>
                    <Txt v="small" c={C.muted}>
                      Última entrada há {r.days} dias · <Txt v="small" c={C.bad}>{r.freq}</Txt>
                    </Txt>
                    <Txt v="tiny" c={C.faint}>
                      {r.plan} · resp. {r.resp.split(' ')[0]} ({r.by === 'pt' ? 'PT' : 'recepção'})
                    </Txt>
                  </View>
                  {outcomes[r.id] ? statusBadge(r.id) : <Button label={open === r.id ? 'Fechar' : 'Contactar'} size="sm" onPress={() => toggle(r.id)} />}
                </View>
                {outcomeUi(r.id, RISK_REASONS, RISK_RESULTS)}
              </View>
            </Reveal>
          ))}
          {!risk.length ? (
            <Txt v="small" c={C.muted} style={{ paddingVertical: 16 }}>
              Ninguém em risco com este filtro.
            </Txt>
          ) : null}
        </Section>
      ) : (
        <Section first>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Txt v="label" c={C.muted} style={{ width: 70 }}>
              Vencem em
            </Txt>
            <ChipGroup size="sm" options={[3, 7, 15].map((v) => [String(v), `${v} dias`] as const)} value={String(rlim)} onChange={(v) => setRlim(+v)} />
          </View>
          {ren.map((r, i) => (
            <Reveal key={r.id} i={i}>
              <View style={{ paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyStrong">{r.n}</Txt>
                    <Txt v="small" c={C.muted}>
                      {r.plan} · vence em {r.days} dias · {kn(r.v)} Kz
                    </Txt>
                    <Txt v="tiny" c={r.late ? C.bad : C.muted}>
                      {r.hist}
                    </Txt>
                  </View>
                  {outcomes[r.id] ? (
                    statusBadge(r.id)
                  ) : (
                    <View style={{ gap: 6 }}>
                      <Button label={open === r.id ? 'Fechar' : 'Contactar'} size="sm" onPress={() => toggle(r.id)} />
                      {role === 'rececao' ? <Button label="Cobrar" kind="outline" size="sm" onPress={() => router.navigate({ pathname: '/rececao/cobrar', params: { m: 'MS' } } as any)} /> : null}
                    </View>
                  )}
                </View>
                {outcomeUi(r.id, RENEW_REASONS, RENEW_RESULTS)}
              </View>
            </Reveal>
          ))}
        </Section>
      )}
    </StackScreen>
  );
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const fmtD = (v: string) => {
  const [, mo, d] = v.split('-');
  return mo && d ? `${+d} ${MONTHS[+mo - 1]}` : v;
};

/** x1 · Nova actividade (PT propõe, dono publica). */
export function NovaActividade() {
  const router = useRouter();
  const toast = useToast();
  const role = useMuntu((s) => s.role) ?? 'pt';
  const addActivity = useMuntu((s) => s.addActivity);
  const isPT = role !== 'dono';
  const [tipo, setTipo] = useState<ActivityKind>('desafio');
  const [t, setT] = useState('');
  const [d, setD] = useState('');
  const [ini, setIni] = useState('2026-11-04');
  const [fim, setFim] = useState('2026-11-30');
  const [hora, setHora] = useState('18:00');
  const [cap, setCap] = useState('20');
  const [unit, setUnit] = useState('treinos');
  const [premio, setPremio] = useState('');
  const [fil, setFil] = useState('Talatona');
  const [err, setErr] = useState('');
  const des = tipo === 'desafio';
  const submit = () => {
    if (t.trim().length < 4) return fail('Dá um título à actividade.');
    if (!cap) return fail(des ? 'Indica a meta.' : 'Indica o número de vagas.');
    const when = `${des ? `${fmtD(ini)} – ${fmtD(fim)}` : `${fmtD(ini)} · ${hora}`} · ${fil === 'Todas' ? 'Todas as filiais' : fil}`;
    addActivity({ id: `n${Date.now()}`, tipo, t: t.trim(), when, meta: des ? `Meta ${cap} ${unit}` : `${cap} vagas`, by: isPT ? 'Nuno Sebastião' : 'Paulo Neto', st: isPT ? 'pendente' : 'publicado' });
    toast(isPT ? `"${t.trim()}" enviada ao dono` : `"${t.trim()}" publicada`);
    router.back();
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  return (
    <StackScreen back="Actividades" eyebrow={isPT ? 'Proposta · vai para aprovação do dono' : 'Publica directamente aos membros'} title="Nova actividade" footer={<Footer label={isPT ? 'Enviar para aprovação' : 'Publicar'} onPress={submit} />}>
      <Section first title="Tipo">
        <Segmented
          value={tipo}
          onChange={(v) => (setTipo(v), setErr(''))}
          options={(['aula', 'desafio', 'evento'] as const).map((v) => ({ v, l: ACT_KIND[v] }))}
        />
      </Section>
      <Section>
        <View style={{ gap: 18 }}>
          <Field label="Título" value={t} onChangeText={(v) => (setT(v), setErr(''))} placeholder={{ aula: 'Ex. Treino funcional ao ar livre', desafio: 'Ex. 30 dias de mobilidade', evento: 'Ex. Corrida da Marginal' }[tipo]} />
          <View style={{ gap: 8 }}>
            <Txt v="eyebrow" c={C.muted}>
              Descrição
            </Txt>
            <TextArea value={d} onChangeText={setD} placeholder="O que é, para quem, o que conta para o progresso" />
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Field style={{ flex: 1 }} label={des ? 'Início' : tipo === 'aula' ? 'Primeira aula' : 'Data'} value={ini} onChangeText={setIni} placeholder="AAAA-MM-DD" />
            {des ? <Field style={{ flex: 1 }} label="Fim" value={fim} onChangeText={setFim} placeholder="AAAA-MM-DD" /> : <Select style={{ flex: 1 }} label="Hora" value={hora} onChange={setHora} options={['06:30', '07:00', '07:30', '12:00', '18:00', '19:00', '20:00'].map((v) => ({ v, l: v }))} />}
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Field style={{ flex: 1 }} label={des ? 'Meta' : 'Vagas'} value={cap} onChangeText={(v) => setCap(v.replace(/\D/g, ''))} keyboardType="number-pad" />
            {des ? <Select style={{ flex: 1 }} label="Conta por" value={unit} onChange={setUnit} options={['treinos', 'check-ins', 'sessões', 'avaliações'].map((v) => ({ v, l: v }))} /> : <View style={{ flex: 1 }} />}
          </View>
          <Field label="Prémio · opcional" value={premio} onChangeText={setPremio} placeholder="Ex. 1 mês grátis para os 3 primeiros" />
          <View style={{ gap: 8 }}>
            <Txt v="eyebrow" c={C.muted}>
              Filial
            </Txt>
            <ChipGroup options={['Talatona', 'Kilamba', 'Maianga', 'Todas'].map((v) => [v, v] as const)} value={fil} onChange={setFil} />
          </View>
          <Note tone={isPT ? 'warn' : 'neutral'} text={isPT ? 'Fica pendente até o dono aprovar em Aprovações. Só depois aparece aos membros.' : 'Publicada de imediato. Os membros da filial recebem notificação na app.'} />
          {err ? <Note tone="bad" text={err} /> : null}
        </View>
      </Section>
    </StackScreen>
  );
}
