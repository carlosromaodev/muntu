import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ACC, AGE, CON, DEV, LEDGER, PAG, ST } from '../../data/desk';
import { ACT_KIND, ACT_STATE, ActivityKind, PT_AGENDA, PT_REQUESTS } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { kn } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, type } from '../../theme/tokens';
import { M, Avatar, Button, Chip, ChipGroup, Field, Note, Press, Progress, Segmented, Select, Tabs, TextArea, Txt, useToast } from '../../ui';
import { Cols, DPage, GUT, KpiRow, Muted, PageHead, Panel, Status, Strong, Table, Tag, Wrap } from '../kit';
import { useDRole } from '../Shell';
import { useDesk } from '../session';

const kz = (v: number) => `${v < 0 ? '−' : ''}${kn(v)},00 Kz`;

/** dp · Agenda do PT. */
export function DAgenda() {
  const { ptMarked, markSession, ptRequests, answerRequest } = useMuntu();
  const open = PT_REQUESTS.filter((r) => !ptRequests[r.id]).length;
  return (
    <DPage>
      <PageHead title="Agenda" sub="Nuno Sebastião · Talatona" />
      <KpiRow
        tiles={[
          { v: '18', l: 'Sessões esta semana', sub: '4 por realizar' },
          { v: '9', l: 'Clientes activos', sub: '2 em risco' },
          { v: '78%', l: 'Horas ocupadas', sub: 'De 30 h disponíveis' },
          { v: '184 000', l: 'Kz · comissões', sub: '32 000 por confirmar' },
        ]}
      />
      <Cols flex={[1.4, 1]}>
        <Panel title="Hoje">
          {PT_AGENDA.map((a, i) => {
            const done = !!ptMarked[a.id] || a.k === 'concl';
            return (
              <Animated.View key={a.id} entering={M.enter(i * 40)} style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                <Txt tabular style={[type(22, 300), { width: 70 }]}>
                  {a.h}
                </Txt>
                <View style={{ flex: 1 }}>
                  <Strong>{a.n}</Strong>
                  <Muted size={12}>{a.d}</Muted>
                </View>
                {done ? (
                  <Animated.View entering={M.fade()}>
                    <Tag l={ptMarked[a.id] ? 'Presente' : 'Concluída'} c={ptMarked[a.id] ? C.ok : C.grey} bg={ptMarked[a.id] ? C.okBg : C.sand} />
                  </Animated.View>
                ) : (
                  <Button label="Presente" size="sm" feedback="success" onPress={() => markSession(a.id)} />
                )}
              </Animated.View>
            );
          })}
        </Panel>
        <Panel title="Pedidos de reserva" right={<Muted size={12}>{`${open} por responder`}</Muted>}>
          {PT_REQUESTS.map((r, i) => {
            const st = ptRequests[r.id];
            return (
              <Animated.View key={r.id} layout={M.layout()} style={{ paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Strong>{r.n}</Strong>
                    <Muted size={12}>{r.plan}</Muted>
                  </View>
                  <Strong>{kn(r.v)} Kz</Strong>
                </View>
                <View style={{ backgroundColor: C.sand, padding: 10 }}>
                  <Txt style={type(13, 400)}>
                    {r.dias} · {r.hora}
                  </Txt>
                </View>
                {st ? (
                  <Tag l={st === 'aceite' ? 'Aceite' : 'Recusado'} c={st === 'aceite' ? C.ok : C.bad} bg={st === 'aceite' ? C.okBg : C.badBg} />
                ) : (
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Button label="Recusar" kind="outline" size="xs" onPress={() => answerRequest(r.id, 'recusado')} />
                    <Button label="Aceitar" size="xs" feedback="success" onPress={() => answerRequest(r.id, 'aceite')} />
                  </View>
                )}
              </Animated.View>
            );
          })}
        </Panel>
      </Cols>
    </DPage>
  );
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const fmtD = (v: string) => {
  const [, mo, d] = v.split('-');
  return mo && d ? `${+d} ${MONTHS[+mo - 1]}` : v;
};

/** dx · Actividades (aulas, desafios e eventos). */
export function DActividades() {
  const role = useDRole();
  const toast = useToast();
  const { activities, setActivityState, addActivity } = useMuntu();
  const isPT = role === 'pt';
  const me = isPT ? 'Nuno Sebastião' : 'Paulo Neto';
  const mine = isPT ? activities.filter((a) => a.by === me) : activities;
  const [tipo, setTipo] = useState<ActivityKind>('desafio');
  const [t, setT] = useState('');
  const [d, setD] = useState('');
  const [ini, setIni] = useState('2026-11-04');
  const [fim, setFim] = useState('2026-11-30');
  const [cap, setCap] = useState('20');
  const [extra, setExtra] = useState('');
  const [fil, setFil] = useState('Talatona');
  const [err, setErr] = useState('');
  const des = tipo === 'desafio';
  const group = (title: string, list: typeof activities, approve: boolean) => (
    <Panel title={title}>
      {list.map((a, i) => (
        <Animated.View key={a.id} entering={M.enter(i * 30)} layout={M.layout()} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 16, rowGap: 8, paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
          <Muted size={12}>{ACT_KIND[a.tipo]}</Muted>
          <View style={{ flexGrow: 1.6, flexShrink: 1, flexBasis: 200 }}>
            <Strong size={13}>{a.t}</Strong>
            <Muted size={11}>
              {a.when} · {a.meta}
            </Muted>
          </View>
          <Muted size={11}>Criado por {a.by}</Muted>
          {approve && a.st === 'pendente' ? (
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <Button label="Recusar" kind="outline" size="xs" onPress={() => (setActivityState(a.id, 'recusado'), toast('Recusado. O PT foi avisado.', 'info'))} />
              <Button label="Aprovar" size="xs" feedback="success" onPress={() => (setActivityState(a.id, 'aprovado'), toast('Aprovado. Já aparece aos membros.'))} />
            </View>
          ) : (
            <Tag l={ACT_STATE[a.st][0]} c={{ ok: C.ok, bad: C.bad, warn: C.warn }[ACT_STATE[a.st][1] as 'ok']} bg={{ ok: C.okBg, bad: C.badBg, warn: C.warnBg }[ACT_STATE[a.st][1] as 'ok']} />
          )}
        </Animated.View>
      ))}
      {!list.length ? <Muted>Nada aqui.</Muted> : null}
    </Panel>
  );
  const submit = () => {
    if (t.trim().length < 4) return (haptic('error'), setErr('Dá um título à actividade.'));
    addActivity({ id: `n${Date.now()}`, tipo, t: t.trim(), when: `${des ? `${fmtD(ini)} – ${fmtD(fim)}` : `${fmtD(ini)}${extra ? ` · ${extra}` : ''}`} · ${fil}`, meta: des ? `Meta ${cap}` : `${cap} vagas`, by: me, st: isPT ? 'pendente' : 'publicado' });
    toast(isPT ? `"${t.trim()}" enviada ao dono.` : `"${t.trim()}" publicada.`);
    setT('');
    setD('');
    setExtra('');
    setErr('');
  };
  return (
    <DPage>
      <PageHead title="Actividades" sub={isPT ? `Propostas ao dono · ${me}` : 'Aulas, desafios e eventos'} />
      <Cols flex={[1.6, 1]}>
        <View style={{ gap: 20 }}>
          {group(isPT ? 'À espera de aprovação' : 'Propostas dos PT · aprovar', mine.filter((a) => a.st === 'pendente'), !isPT)}
          {group('Publicadas', mine.filter((a) => a.st === 'aprovado' || a.st === 'publicado'), false)}
          {mine.some((a) => a.st === 'recusado') ? group('Recusadas', mine.filter((a) => a.st === 'recusado'), false) : null}
        </View>
        <Panel title={isPT ? 'Propor actividade' : 'Nova actividade'}>
          <Segmented value={tipo} onChange={setTipo} options={(['aula', 'desafio', 'evento'] as const).map((v) => ({ v, l: ACT_KIND[v] }))} />
          <Field label="Título" value={t} onChangeText={(x) => (setT(x), setErr(''))} placeholder={{ aula: 'Ex. Treino funcional ao ar livre', desafio: 'Ex. 30 dias de mobilidade', evento: 'Ex. Corrida da Marginal' }[tipo]} />
          <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Descrição</Txt>
          <TextArea value={d} onChangeText={setD} />
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Field style={{ flex: 1 }} label={des ? 'Início' : 'Data'} value={ini} onChangeText={setIni} />
            {des ? <Field style={{ flex: 1 }} label="Fim" value={fim} onChangeText={setFim} /> : <View style={{ flex: 1 }} />}
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Field style={{ flex: 1 }} label={des ? 'Meta' : 'Vagas'} value={cap} onChangeText={(x) => setCap(x.replace(/\D/g, ''))} />
            <Field style={{ flex: 1 }} label={des ? 'Prémio · opcional' : 'Hora'} value={extra} onChangeText={setExtra} placeholder={des ? 'Ex. 1 mês grátis' : '18:00'} />
          </View>
          <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Filial</Txt>
          <ChipGroup size="sm" options={['Talatona', 'Kilamba', 'Maianga', 'Todas'].map((v) => [v, v] as const)} value={fil} onChange={setFil} />
          <Note tone={isPT ? 'warn' : 'neutral'} text={isPT ? 'Fica pendente até o dono aprovar. Só depois aparece aos membros.' : 'Publicada de imediato. Os membros recebem notificação na app.'} />
          {err ? <Note tone="bad" text={err} /> : null}
          <Button label={isPT ? 'Enviar para aprovação' : 'Publicar'} onPress={submit} style={{ alignSelf: 'flex-start' }} />
        </Panel>
      </Cols>
    </DPage>
  );
}

const RISK = [
  ['k1', 'Edson Mateus', 'Local Mensal', '923 554 017', 12, '−60%', 'Celma Bento', 'rececao', 'Viagem'],
  ['k2', 'Joana Kiala', 'Híbrido', '925 902 118', 9, '−45%', 'Nuno Sebastião', 'pt', 'Lesão'],
  ['k3', 'Bruno Lopes', 'Rede Mensal', '924 118 330', 16, '−80%', 'Celma Bento', 'rececao', 'Preço'],
  ['k4', 'Sara Domingos', 'Local Mensal', '931 440 812', 23, 'sem entradas', 'Teresa Lunda', 'rececao', 'Falta de tempo'],
  ['k5', 'Hélder Pinto', 'Rede Mensal', '923 870 552', 31, 'sem entradas', 'Leonor Paím', 'pt', 'Insatisfação'],
  ['k6', 'Marta Neto', 'Local Mensal', '926 300 141', 8, '−50%', 'Nuno Sebastião', 'pt', 'Mudou de zona'],
] as const;
const REN = [
  ['n1', 'Ana Domingos', 'Rede Mensal', '923 118 402', 3, 45000, 'Sem atrasos', 'Preço'],
  ['n2', 'Joana Kiala', 'Híbrido', '925 902 118', 3, 38000, '1 atraso em 6 meses', 'Falta de tempo'],
  ['n3', 'Celso Pedro', 'Rede Mensal', '927 004 611', 6, 45000, '3 atrasos em 6 meses', 'Preço'],
  ['n4', 'Luísa Tomás', 'Híbrido', '923 667 290', 11, 38000, 'Sem atrasos', 'Mudou de zona'],
  ['n5', 'Paulo Jorge', 'Local Mensal', '924 330 908', 14, 30000, '2 atrasos', 'Insatisfação'],
] as const;
const OFF: Record<string, [string, string, string][]> = {
  Viagem: [['cong', 'Congelar o plano até 30 dias', 'Sem custo. O plano retoma quando voltar.'], ['rede', 'Acesso à rede durante a viagem', 'Treina num ginásio parceiro da MUNTU.']],
  Lesão: [['pausa', 'Pausa médica', 'Até 60 dias, com declaração médica.'], ['aval', 'Avaliação gratuita com PT', 'Plano de regresso adaptado à lesão.']],
  Preço: [['down', 'Mudar para Local Mensal', '30 000 Kz por mês, só na filial de inscrição.'], ['desc', '15% durante 2 meses', 'Dentro do limite de desconto da recepção.']],
  'Falta de tempo': [['hor', 'Plano por horário', 'Mais barato, só nas horas que lhe convêm.'], ['curto', 'Treinos de 30 minutos', 'Plano de treino curto preparado pelo PT.']],
  Insatisfação: [['gest', 'Conversa com o gestor', 'O dono liga em 24 horas.'], ['ptfree', 'Sessão de PT grátis', 'Para recomeçar com acompanhamento.']],
  'Mudou de zona': [['trans', 'Transferir para outra filial', 'Sem taxa de transferência.'], ['planrede', 'Passar para Rede Mensal', 'Treina em qualquer filial.']],
};
const REPLY: Record<string, string> = { Viagem: 'Estou fora de Luanda até ao fim do mês, por trabalho.', Lesão: 'Magoei o joelho, o médico mandou parar 3 semanas.', Preço: 'Está difícil pagar o plano este mês.', 'Falta de tempo': 'Mudei de horário no trabalho, não consigo ir à tarde.', Insatisfação: 'As máquinas estão sempre ocupadas à hora que vou.', 'Mudou de zona': 'Mudei-me para o Kilamba, fica longe.' };
const TPL: [string, string, (n: string) => string][] = [
  ['falta', 'Sentimos a tua falta', (n) => `Olá ${n}, sentimos a tua falta no Mwangolé Fit. Está tudo bem? Se quiseres, ajudamos-te a voltar ao ritmo.`],
  ['motivo', 'Perguntar o motivo', (n) => `Olá ${n}, notámos que deixaste de vir. Podes dizer-nos porquê? Responde 1 Viagem, 2 Lesão, 3 Preço, 4 Falta de tempo, 5 Não estou satisfeito.`],
  ['renov', 'Lembrar a renovação', (n) => `Olá ${n}, o teu plano está a terminar. Queres renovar? Se algo não está a funcionar, diz-nos e ajustamos.`],
  ['volta', 'Convite para voltar', (n) => `Olá ${n}, esta semana tens uma sessão de PT grátis para recomeçar. Queres marcar?`],
];
const GOOD = new Set(['Voltou', 'Vai voltar', 'Renovou']);
type Msg = { me: boolean; t: string; h: string; auto?: boolean };

/** dk · Recuperação (contactar, perceber o motivo, propor solução). */
export function DRecuperacao() {
  const role = useDRole();
  const [tabS, setTab] = useState<'risk' | 'ren'>('risk');
  const tab = role === 'financas' ? 'ren' : role === 'pt' ? 'risk' : tabS;
  const [lim, setLim] = useState(7);
  const [rlim, setRlim] = useState(7);
  const [sel, setSel] = useState<string | null>(null);
  const [thr, setThr] = useState<Record<string, Msg[]>>({});
  const [why, setWhy] = useState<Record<string, string>>({});
  const [off, setOff] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);
  const mine = (r: (typeof RISK)[number]) => role === 'dono' || role === 'financas' || (role === 'pt' ? r[6] === 'Nuno Sebastião' : r[7] === 'rececao');
  const list =
    tab === 'risk'
      ? RISK.filter(mine)
          .filter((r) => r[4] >= lim)
          .map((r) => ({ id: r[0], n: r[1], plan: r[2], tel: r[3], a: `Última entrada há ${r[4]} dias`, b: r[5], resp: r[6], why: r[8] }))
      : REN.filter((r) => r[4] <= rlim).map((r) => ({ id: r[0], n: r[1], plan: r[2], tel: r[3], a: `Vence em ${r[4]} dias · ${kn(r[5])} Kz`, b: r[6], resp: 'Recepção', why: r[7] }));
  const cur = list.find((x) => x.id === sel) ?? list[0];
  const first = cur?.n.split(' ')[0] ?? '';
  const thread: Msg[] = cur ? thr[cur.id] ?? [{ me: true, auto: true, t: tab === 'risk' ? `Lembrete automático: "${first}, o teu treino de hoje está à tua espera."` : 'Aviso automático de vencimento enviado.', h: 'Há 5 dias · SMS' }] : [];
  const push = (id: string, m: Msg[]) => setThr((x) => ({ ...x, [id]: [...(x[id] ?? thread), ...m] }));
  const reason = cur ? why[cur.id] ?? '' : '';
  const recN = 9 + Object.values(done).filter((v) => GOOD.has(v)).length;
  const send = () => {
    if (!cur || !draft.trim()) return;
    const ask = /Responde 1|porquê|Está tudo bem|algo não está/.test(draft);
    push(cur.id, [{ me: true, t: draft.trim(), h: 'Agora · SMS' }]);
    setDraft('');
    haptic('success');
    if (ask && !reason) {
      const id = cur.id;
      const w = cur.why;
      timer.current = setTimeout(() => {
        setThr((x) => ({ ...x, [id]: [...(x[id] ?? []), { me: false, t: REPLY[w]!, h: 'Agora · resposta' }] }));
        setWhy((x) => ({ ...x, [id]: w }));
        haptic('select');
      }, 1400);
    }
  };
  const status = (id: string) => (done[id] ? { l: done[id]!, c: GOOD.has(done[id]!) ? C.ok : C.grey, bg: GOOD.has(done[id]!) ? C.okBg : C.sand } : why[id] ? { l: why[id]!, c: C.warn, bg: C.warnBg } : thr[id] ? { l: 'Em conversa', c: C.ink, bg: C.sand } : { l: 'Por contactar', c: C.bad, bg: C.badBg });
  const kick = { rececao: 'Recepção · Talatona', pt: 'Os teus clientes', dono: 'Toda a rede', financas: 'Renovações da rede' }[role];
  const tabs = ([['risk', 'Em risco', RISK.filter(mine).length], ['ren', 'Renovações', REN.length]] as const).filter((t) => role === 'dono' || role === 'rececao' || (role === 'pt' ? t[0] === 'risk' : t[0] === 'ren'));
  return (
    <DPage>
      <PageHead title="Recuperação" sub={`${kick} · contactar, perceber o motivo e propor uma solução`} />
      <KpiRow
        tiles={[
          { v: kn(312000 + Object.entries(done).filter(([, v]) => v === 'Renovou').reduce((a, [id]) => a + (REN.find((r) => r[0] === id)?.[5] ?? 0), 0)), l: 'Kz recuperados em Outubro', sub: `${recN} membros voltaram ou renovaram` },
          { v: String(RISK.filter(mine).length), l: 'Em risco', sub: 'Sem entradas ou com quebra de frequência' },
          { v: String(REN.length), l: 'Renovações em 15 dias', sub: 'Precisam de contacto' },
        ]}
      />
      <Cols flex={[0.75, 1.25, 0.9]} gap={0}>
        <View style={{ backgroundColor: C.paper, borderWidth: 1, borderColor: C.line }}>
          <View style={{ paddingHorizontal: 16 }}>
            <Tabs options={tabs.map(([v, l, n]) => ({ v, l, n }))} value={tab} onChange={(v) => (setTab(v), setSel(null), setDraft(''))} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 }}>
              <Muted size={11}>{tab === 'risk' ? 'Sem vir há' : 'Vence em'}</Muted>
              {tab === 'risk' ? <ChipGroup size="sm" options={[7, 14, 30].map((v) => [String(v), `${v}+ dias`] as const)} value={String(lim)} onChange={(v) => setLim(+v)} /> : <ChipGroup size="sm" options={[3, 7, 15].map((v) => [String(v), `Até ${v} dias`] as const)} value={String(rlim)} onChange={(v) => setRlim(+v)} />}
            </View>
          </View>
          {list.map((r) => {
            const on = r.id === cur?.id;
            const s = status(r.id);
            return (
              <Press key={r.id} feedback="select" scaleTo={1} onPress={() => (setSel(r.id), setDraft(''))} style={({ hovered }) => ({ padding: 14, borderTopWidth: 1, borderTopColor: C.line, borderLeftWidth: 3, borderLeftColor: on ? C.accent : 'transparent', backgroundColor: on ? '#fff' : hovered ? C.canvas : 'transparent', gap: 4 })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                  <Strong size={13}>{r.n}</Strong>
                  <Tag l={s.l} c={s.c} bg={s.bg} />
                </View>
                <Muted size={11}>
                  {r.plan} · {r.a}
                </Muted>
              </Press>
            );
          })}
          {!list.length ? (
            <View style={{ padding: 16 }}>
              <Muted>Ninguém com este filtro.</Muted>
            </View>
          ) : null}
        </View>
        {cur ? (
          <Animated.View key={cur.id} entering={M.fade()} style={{ backgroundColor: C.canvas, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line, padding: 16, gap: 12, minHeight: 460 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar initials={cur.n.split(' ').map((w) => w[0]).slice(0, 2).join('')} size={36} />
              <View style={{ flex: 1 }}>
                <Strong>{cur.n}</Strong>
                <Muted size={11}>
                  {cur.plan} · {cur.tel} · {cur.b}
                </Muted>
              </View>
              <Button label="Ligar" kind="outline" size="xs" />
              <Button label="WhatsApp" kind="outline" size="xs" />
            </View>
            <View style={{ flex: 1, gap: 8, justifyContent: 'flex-end' }}>
              {thread.map((m, i) => (
                <Animated.View key={i} entering={M.enter()} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '80%', backgroundColor: m.me ? (m.auto ? C.sand : C.ink) : '#fff', borderWidth: m.me ? 0 : 1, borderColor: C.line, padding: 12, gap: 4 }}>
                  <Txt style={[type(13, 400), { color: m.me && !m.auto ? C.paper : C.ink }]}>{m.t}</Txt>
                  <Txt style={[type(10, 400), { color: m.me && !m.auto ? C.sand : C.muted }]}>{m.h}</Txt>
                </Animated.View>
              ))}
            </View>
            <Muted size={11}>Mensagens prontas</Muted>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {TPL.filter((tp) => (tab === 'risk' ? tp[0] !== 'renov' : tp[0] !== 'falta')).map(([k, l, fn]) => (
                <Chip key={k} size="sm" label={l} onPress={() => setDraft(fn(first))} />
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
              <TextArea value={draft} onChangeText={setDraft} placeholder="Escreve uma mensagem ou escolhe uma pronta" style={{ flex: 1, minHeight: 60 }} />
              <Button label="Enviar" disabled={!draft.trim()} onPress={send} />
            </View>
          </Animated.View>
        ) : (
          <View />
        )}
        {cur ? (
          <View style={{ backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 16, gap: 10 }}>
            <Strong size={13}>1 · Motivo</Strong>
            {!reason ? <Muted size={12}>Pergunta o motivo com uma mensagem pronta ou marca-o depois de falares com o cliente.</Muted> : null}
            <ChipGroup size="sm" options={Object.keys(OFF).map((x) => [x, x] as const)} value={reason} onChange={(v) => setWhy({ ...why, [cur.id]: v })} />
            {reason ? (
              <Animated.View entering={M.enter()} style={{ gap: 8 }}>
                <Strong size={13}>2 · Proposta</Strong>
                {OFF[reason]!.map(([k, l, d]) => {
                  const on = off[cur.id] === k;
                  return (
                    <Press key={k} feedback="select" scaleTo={0.99} onPress={() => setOff({ ...off, [cur.id]: k })} style={{ padding: 10, borderWidth: on ? 2 : 1, borderColor: on ? C.ink : C.line, backgroundColor: on ? '#fff' : C.paper, gap: 2 }}>
                      <Strong size={13}>{l}</Strong>
                      <Muted size={11}>{d}</Muted>
                    </Press>
                  );
                })}
                <Button
                  label="Enviar proposta"
                  size="sm"
                  disabled={!off[cur.id]}
                  onPress={() => {
                    const o = OFF[reason]!.find((x) => x[0] === off[cur.id]);
                    if (o) push(cur.id, [{ me: true, t: `${first}, temos uma proposta para ti: ${o[1].toLowerCase()}. ${o[2]} Respondes SIM para activar.`, h: 'Agora · SMS' }]);
                  }}
                />
              </Animated.View>
            ) : null}
            <Strong size={13}>Resultado</Strong>
            <ChipGroup size="sm" options={['Vai voltar', 'Voltou', 'Renovou', 'Cancelou', 'Sem resposta'].map((x) => [x, x] as const)} value={done[cur.id] ?? ''} onChange={(v) => (setDone({ ...done, [cur.id]: v }), haptic(GOOD.has(v) ? 'success' : 'select'))} />
          </View>
        ) : (
          <View />
        )}
      </Cols>
    </DPage>
  );
}

/** d5 · Tesouraria (livro razão, contas, a receber, a pagar, conciliação). */
export function DTesouraria() {
  const toast = useToast();
  const { turno } = useDesk();
  const { smsDone, sendSms } = useMuntu();
  const [tab, setTab] = useState('mov');
  const [per, setPer] = useState('Hoje');
  const [meio, setMeio] = useState('Todos');
  const [cat, setCat] = useState('Todas');
  const [sel, setSel] = useState<number | null>(null);
  const [trf, setTrf] = useState(false);
  const [de, setDe] = useState('cxm');
  const [para, setPara] = useState('cof');
  const [val, setVal] = useState('');
  const [trfs, setTrfs] = useState<{ de: string; para: string; v: number }[]>([]);
  const [trfMsg, setTrfMsg] = useState('');
  const [pagos, setPagos] = useState<Record<string, boolean>>({});
  const [recon, setRecon] = useState<Record<string, boolean>>({});
  const tk = turno;
  const L2 = LEDGER.filter((r) => (per === 'Mês' || r.dia === per) && (tk === 'dia' || r.turno === tk) && (meio === 'Todos' || r.m === meio) && (cat === 'Todas' || r.cat === cat));
  const ent = L2.reduce((a, r) => a + (r.v > 0 ? r.v : 0), 0);
  const sai = L2.reduce((a, r) => a + (r.v < 0 ? -r.v : 0), 0);
  const accs = ACC.map((a) => ({ ...a, v: a.v + trfs.reduce((x, t) => x + (t.para === a.id ? t.v : 0) - (t.de === a.id ? t.v : 0), 0) }));
  const saldo = accs.reduce((a, x) => a + x.v, 0);
  const pagar = PAG.map((p) => ({ ...p, st: pagos[p.id] ? 'pago' : p.st }));
  const porPagar = pagar.reduce((a, p) => a + (p.st === 'pago' ? 0 : p.v), 0);
  const maxAge = Math.max(...AGE.map((a) => a[2] as number));
  const selL = LEDGER.find((r) => r.id === sel);
  const TS: Record<string, string> = { manha: 'Manhã', tarde: 'Tarde' };
  return (
    <DPage>
      <PageHead title="Tesouraria" sub="Livro razão · nada se apaga · Turno da manhã" actions={[{ label: 'Exportar', kind: 'outline', onPress: () => toast('Extracto exportado', 'info') }, { label: 'Novo movimento', onPress: () => (setTab('contas'), setTrf(true)) }]} />
      <KpiRow
        hero={{ label: 'Kz · Saldo consolidado', value: saldo, format: (v) => `${kn(v)},00`, sub: 'Caixas, cofre, banco e valores a liquidar' }}
        tiles={[
          { v: kn(ent), l: 'Kz · Entradas' },
          { v: kn(sai), l: 'Kz · Saídas' },
          { v: '1 859 000', l: 'Kz · A receber' },
          { v: kn(porPagar), l: 'Kz · A pagar' },
        ]}
      />
      <View style={{ paddingHorizontal: GUT, paddingBottom: 20 }}>
        <Tabs options={[{ v: 'mov', l: 'Movimentos' }, { v: 'contas', l: 'Contas' }, { v: 'rec', l: 'A receber' }, { v: 'pag', l: 'A pagar' }, { v: 'con', l: 'Conciliação' }]} value={tab} onChange={setTab} />
      </View>
      {tab === 'mov' ? (
        <View style={{ paddingHorizontal: GUT, gap: 16 }}>
          <View style={{ flexDirection: 'row', gap: 32, flexWrap: 'wrap' }}>
            <View style={{ gap: 6 }}>
              <Muted size={11}>Período</Muted>
              <ChipGroup size="sm" options={['Hoje', 'Ontem', 'Mês'].map((v) => [v, v] as const)} value={per} onChange={(v) => (setPer(v), setSel(null))} />
            </View>
            <View style={{ gap: 6 }}>
              <Muted size={11}>Meio</Muted>
              <ChipGroup size="sm" options={['Todos', 'Dinheiro', 'Multicaixa Express', 'TPA', 'Transferência'].map((v) => [v, v] as const)} value={meio} onChange={(v) => (setMeio(v), setSel(null))} />
            </View>
          </View>
          <View style={{ gap: 6 }}>
            <Muted size={11}>Categoria</Muted>
            <ChipGroup size="sm" options={['Todas', 'Mensalidades', 'Inscrições', 'Bar', 'Despesas', 'Estornos', 'Caixa'].map((v) => [v, v] as const)} value={cat} onChange={(v) => (setCat(v), setSel(null))} />
          </View>
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'flex-start' }}>
            <View style={{ flex: 1.8 }}>
              <Panel>
                <Table
                  cols={[{ l: 'Hora', w: 70 }, { l: 'Turno', w: 70 }, { l: 'Movimento', flex: 1.4 }, { l: 'Origem', flex: 1.3 }, { l: 'Meio' }, { l: 'Valor', align: 'right' }, { l: 'Estado', w: 150 }]}
                  rows={L2}
                  onRow={(r) => setSel(r.id)}
                  selected={(r) => r.id === sel}
                  empty={tk === 'tarde' && per === 'Hoje' ? 'O turno da tarde abre às 14:00 com Rui Manuel. Ainda sem movimentos.' : 'Sem movimentos com estes filtros.'}
                  render={(r) => [<Muted>{`${r.dia === 'Hoje' ? '' : `${r.dia} `}${r.h}`}</Muted>, <Txt style={type(10, 600, 0.12, true)}>{TS[r.turno]}</Txt>, r.d, <Txt numberOfLines={1} style={[type(13, 400), { color: C.accentDeep }]}>{r.o}</Txt>, <Muted>{r.m}</Muted>, <Txt style={[type(14, 400), { color: r.v < 0 ? C.bad : C.ink }]}>{`${r.v > 0 ? '+' : ''}${kz(r.v)}`}</Txt>, <Status l={ST[r.st]!.l} c={ST[r.st]!.c} />]}
                />
              </Panel>
            </View>
            {selL ? (
              <Animated.View key={selL.id} entering={M.fade()} style={{ flex: 1 }}>
                <Panel title="Movimento">
                  <Txt style={type(26, 300)}>{`${selL.v > 0 ? '+' : ''}${kz(selL.v)}`}</Txt>
                  <Status l={ST[selL.st]!.l} c={ST[selL.st]!.c} />
                  {[
                    ['Descrição', selL.d],
                    ['Origem', selL.o],
                    ['Meio', selL.m],
                    ['Documento', selL.fac],
                    ['Hora', `${selL.dia} · ${selL.h}`],
                  ].map(([k, v]) => (
                    <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: C.line, gap: 12 }}>
                      <Muted size={12}>{k}</Muted>
                      <Txt style={[type(13, 400), { flexShrink: 1, textAlign: 'right' }]}>{v}</Txt>
                    </View>
                  ))}
                  {selL.note ? <Note tone="warn" text={selL.note} /> : null}
                  <Muted size={11}>Os movimentos não se apagam. Correcções geram um novo registo de estorno.</Muted>
                </Panel>
              </Animated.View>
            ) : null}
          </View>
        </View>
      ) : tab === 'contas' ? (
        <View style={{ paddingHorizontal: GUT, gap: 16 }}>
          <Wrap min={220} max={3}>
            {accs.map((a, i) => (
              <Animated.View key={a.id} entering={M.enter(i * 30)} layout={M.layout()} style={{ flex: 1, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 20, gap: 8 }}>
                <Muted size={11}>{a.t}</Muted>
                <Strong>{a.n}</Strong>
                <Txt style={type(26, 300)}>{kn(a.v)}</Txt>
                <Muted size={11}>{a.meta}</Muted>
                <Button label="Transferir" kind="outline" size="xs" style={{ alignSelf: 'flex-start' }} onPress={() => (setTrf(true), setDe(a.id), setPara(a.id === 'cof' ? 'bai' : 'cof'), setTrfMsg(''))} />
              </Animated.View>
            ))}
          </Wrap>
          {trf ? (
            <Animated.View entering={M.enter()}>
              <Panel title="Transferência entre contas">
                <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-end' }}>
                  <Select style={{ flex: 1 }} label="De" value={de} onChange={setDe} options={accs.map((a) => ({ v: a.id, l: a.n }))} />
                  <Select style={{ flex: 1 }} label="Para" value={para} onChange={setPara} options={accs.map((a) => ({ v: a.id, l: a.n }))} />
                  <Field style={{ flex: 0.7 }} label="Valor (Kz)" value={val} onChangeText={setVal} keyboardType="number-pad" />
                  <Button label="Cancelar" kind="outline" onPress={() => setTrf(false)} />
                  <Button
                    label="Registar"
                    onPress={() => {
                      const v = parseFloat(val.replace(/\s/g, '').replace(',', '.')) || 0;
                      if (!v || de === para) return setTrfMsg('Indique um valor e duas contas diferentes.');
                      setTrfs([...trfs, { de, para, v }]);
                      setVal('');
                      haptic('success');
                      setTrfMsg(v > 100000 ? 'Registada. Acima de 100 000 Kz fica a aguardar aprovação do dono.' : 'Transferência registada no livro razão.');
                    }}
                  />
                </View>
                {trfMsg ? <Note tone={trfMsg.startsWith('Indique') ? 'bad' : 'ok'} text={trfMsg} /> : null}
              </Panel>
            </Animated.View>
          ) : null}
        </View>
      ) : tab === 'rec' ? (
        <Cols flex={[1, 1.3]}>
          <Panel title="Antiguidade da dívida">
            {AGE.map(([l, n, v, c]) => (
              <View key={l as string} style={{ gap: 6, paddingVertical: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Txt style={type(13, 400)}>
                    {l as string} · {n as number} membros
                  </Txt>
                  <Strong size={13}>{kn(v as number)} Kz</Strong>
                </View>
                <Progress value={(v as number) / maxAge} color={c as string} height={8} track={C.sand} />
              </View>
            ))}
          </Panel>
          <Panel title="Maiores devedores">
            {DEV.map(([n, d, v, u]) => (
              <View key={n as string} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
                <View style={{ flex: 1 }}>
                  <Strong size={13}>{n as string}</Strong>
                  <Muted size={11}>
                    {d as string} · {u as string}
                  </Muted>
                  {smsDone[n as string] ? <Txt style={[type(11, 400), { color: C.ok }]}>SMS entregue às {smsDone[n as string]}</Txt> : null}
                </View>
                <Strong c={C.bad}>{kz(v as number)}</Strong>
                <Button label="SMS" kind="outline" size="xs" disabled={!!smsDone[n as string]} onPress={() => sendSms([n as string])} />
              </View>
            ))}
          </Panel>
        </Cols>
      ) : tab === 'pag' ? (
        <View style={{ paddingHorizontal: GUT }}>
          <Panel title="Contas a pagar">
            <Table
              cols={[{ l: 'Descrição', flex: 1.6 }, { l: 'Categoria' }, { l: 'Vencimento' }, { l: 'Valor', align: 'right' }, { l: 'Estado', w: 120 }, { l: '', w: 90 }]}
              rows={pagar}
              render={(p) => [<Strong size={13}>{p.d}</Strong>, <Muted>{p.c}</Muted>, <Muted>{p.st === 'pago' ? 'Pago' : p.ve}</Muted>, kz(p.v), <Status l={ST[p.st]!.l} c={ST[p.st]!.c} />, p.st === 'porpagar' ? <Button label="Pagar" size="xs" onPress={() => (setPagos({ ...pagos, [p.id]: true }), haptic('success'))} /> : '']}
            />
          </Panel>
        </View>
      ) : (
        <View style={{ paddingHorizontal: GUT }}>
          <Panel title="Conciliação bancária">
            <Table
              cols={[{ l: 'Data', w: 60 }, { l: 'Origem', flex: 1.3 }, { l: 'Referência' }, { l: 'Sistema', align: 'right' }, { l: 'Extracto', align: 'right' }, { l: 'Diferença', align: 'right' }, { l: 'Estado', w: 170 }, { l: '', w: 140 }]}
              rows={CON}
              render={(c) => {
                const d = recon[c.id];
                const st = d ? 'conciliado' : c.st;
                return [<Muted>{c.d}</Muted>, c.o, <Muted>{c.r}</Muted>, kz(c.sis), kz(c.ext), <Txt style={[type(14, 400), { color: c.ext < c.sis ? C.bad : C.ink }]}>{c.ext === c.sis ? '—' : kz(c.ext - c.sis)}</Txt>, <Status l={ST[st]!.l} c={ST[st]!.c} why={d ? 'Resolvido agora' : c.why} />, st !== 'conciliado' ? <Button label={c.act ?? 'Conciliar'} size="xs" kind="outline" onPress={() => setRecon({ ...recon, [c.id]: true })} /> : ''];
              }}
            />
          </Panel>
        </View>
      )}
    </DPage>
  );
}
