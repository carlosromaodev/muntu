import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { APPR, FIL, FUGAS, LINES, LIQ, LOG, OPS, PARC, PLANOS, PV, REDE_REG, RULES, SAMPLE, ST, TREND, VIS, fill } from '../../data/desk';
import { COMPARE, DOCUMENTS, LOST, NOTICE_TARGETS, NOTICES, OCC, REFERRAL_REVIEW, REWARDS, STAFF } from '../../data/mobile';
import { confirmBiometric } from '../../lib/auth';
import { haptic } from '../../lib/haptics';
import { kn } from '../../lib/format';
import { IMPORT_KINDS, useOnboarding } from '../../store/onboarding';
import { useMuntu } from '../../store/useMuntu';
import { C, type } from '../../theme/tokens';
import { Avatar, Bars, Button, Checkbox, Chip, ChipGroup, Field, Note, Press, Progress, Select, Stepper, Tabs, TextArea, Toggle, Txt, useToast } from '../../ui';
import { Cols, DPage, KpiRow, Muted, PageHead, Panel, Status, Strong, Table, Tag } from '../kit';
import { useDesk } from '../session';

const kz = (v: number) => `${v < 0 ? '−' : ''}${kn(v)},00 Kz`;
const rnd = (x: number) => Math.round(x / 500) * 500;

/** d6 · Painel do dono. */
export function DPainel() {
  const toast = useToast();
  const { filial, turno } = useDesk();
  const { approvals, decide } = useMuntu();
  const [per, setPer] = useState('Mês');
  const F = { Semana: 0.24, Mês: 1, Trimestre: 2.9 }[per]!;
  const all = filial === 'todas';
  const base = all ? Object.values(FIL).reduce((a, f) => ({ e: a.e + f.e, r: a.r + f.r }), { e: 0, r: 0 }) : FIL[filial];
  const de = rnd(base.e * F);
  const dr = rnd(base.r * F);
  const perL = { Semana: '19 a 25 de Outubro', Mês: 'Outubro 2026', Trimestre: 'Agosto a Outubro 2026' }[per];
  const TR = [
    { k: 'manha', l: 'Manhã', h: '06:00–14:00', sh: 0.58, ci: 1540, nv: 22, dc: -6000 },
    { k: 'tarde', l: 'Tarde', h: '14:00–22:00', sh: 0.42, ci: 1120, nv: 16, dc: -10000 },
  ];
  const approve = async (id: string, k: string) => {
    haptic('heavy');
    if (!(await confirmBiometric(`Aprovar: ${k}`))) return toast('Aprovação cancelada', 'bad');
    decide(id, 'ok');
    toast('Aprovado');
  };
  const open = APPR.filter((a) => !approvals[a.id]).length;
  const mx = Math.max(...OCC);
  return (
    <DPage>
      <PageHead title="Painel do dono" sub={`${all ? 'Todas as filiais' : FIL[filial].n} · ${perL}`} actions={[<ChipGroup key="p" size="sm" options={['Semana', 'Mês', 'Trimestre'].map((v) => [v, v] as const)} value={per} onChange={setPer} />]} />
      <KpiRow
        hero={{ label: 'Kz · Diferença', value: de - dr, format: (v) => `${kn(v)},00`, sub: 'O que devia ter entrado e não entrou' }}
        tiles={[
          { v: kn(de), l: 'Kz · Esperada' },
          { v: kn(dr), l: 'Kz · Recebida' },
          { v: `${(Math.round((dr / de) * 1000) / 10).toFixed(1).replace('.', ',')}%`, l: 'Taxa de cobrança' },
          { v: kn(rnd(1180000 * F * (all ? 1 : FIL[filial].r / 2302000))), l: 'Kz · Recuperado por SMS' },
        ]}
      />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <Panel title={`Aprovações · ${open} pendentes`}>
          {APPR.map((a, i) => {
            const st = approvals[a.id];
            return (
              <Animated.View key={a.id} layout={LinearTransition} style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Muted size={12}>{a.k}</Muted>
                  <Txt style={type(14, 400)}>{a.t}</Txt>
                </View>
                <Strong size={16}>{kz(a.v)}</Strong>
                {st ? (
                  <Animated.View entering={ZoomIn}>
                    <Tag l={st === 'ok' ? 'Aprovado' : 'Recusado'} c={st === 'ok' ? C.ok : C.bad} bg={st === 'ok' ? C.okBg : C.badBg} />
                  </Animated.View>
                ) : (
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Button label="Recusar" kind="outline" size="xs" onPress={() => decide(a.id, 'no')} />
                    <Button label="Aprovar" size="xs" onPress={() => approve(a.id, a.k)} />
                  </View>
                )}
              </Animated.View>
            );
          })}
        </Panel>
      </View>
      <Cols flex={[1, 1]}>
        <Panel title="Receita por turno" i={1}>
          {TR.map((t) => (
            <View key={t.k} style={{ gap: 8, paddingVertical: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Txt style={type(12, 600, 0.16, true)}>
                  {t.l} <Txt style={[type(11, 400), { color: C.muted }]}>{t.h}</Txt>
                </Txt>
                <Txt style={type(22, 300)}>{kz(rnd(dr * t.sh))}</Txt>
              </View>
              <Progress value={t.sh} color={turno === t.k || (turno === 'dia' && t.k === 'manha') ? C.accent : C.ink} height={4} />
              <Muted size={12}>
                {Math.round(t.ci * F)} check-ins · {Math.round(t.nv * F)} novos membros · diferenças de caixa {kz(rnd(t.dc * F))}
              </Muted>
            </View>
          ))}
        </Panel>
        <Panel title="Membros" i={2}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
            {[
              ['1 284', 'Activos · +38'],
              ['3,1%', 'Churn mensal'],
              ['81%', 'Retenção 90 dias'],
              ['3,6%', 'Inadimplência'],
            ].map(([v, l]) => (
              <View key={l} style={{ width: '49%', backgroundColor: C.sand, padding: 14, gap: 4 }}>
                <Txt style={type(26, 300)}>{v}</Txt>
                <Txt style={[type(10, 600, 0.16, true), { color: C.muted }]}>{l}</Txt>
              </View>
            ))}
          </View>
        </Panel>
      </Cols>
      <Cols flex={[1, 1]}>
        <Panel title="Esperada e recebida · 6 meses" i={3}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 160, gap: 14 }}>
            {TREND.map(([m, e, r], i) => (
              <View key={m} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 130, gap: 3 }}>
                  <Bars data={[e as number - 1.6]} max={0.9} height={130} colors={() => C.lineStrong} style={{ width: 14 }} />
                  <Bars data={[r as number - 1.6]} max={0.9} height={130} colors={() => (i === TREND.length - 1 ? C.accent : C.ink)} style={{ width: 14 }} />
                </View>
                <Muted size={11}>{m as string}</Muted>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {[
              ['Esperada', C.lineStrong],
              ['Recebida', C.ink],
            ].map(([l, c]) => (
              <View key={l} style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <View style={{ width: 10, height: 10, backgroundColor: c }} />
                <Muted size={12}>{l}</Muted>
              </View>
            ))}
          </View>
        </Panel>
        <Panel title="Ocupação por hora" i={4}>
          <Bars data={OCC} height={150} gap={4} colors={(i) => (OCC[i] === mx ? C.accent : C.ink)} labels={OCC.map((_, i) => (i % 2 === 0 ? String(6 + i).padStart(2, '0') : ''))} />
        </Panel>
      </Cols>
      <Cols flex={[1, 1]}>
        <Panel title="A diferença, linha a linha" i={5}>
          {LINES.filter((l) => all || l.f === filial).map((l) => (
            <View key={l.t} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
              <View style={{ flex: 1 }}>
                <Txt style={type(14, 400)}>{l.t}</Txt>
                <Muted size={12}>{FIL[l.f as 'talatona'].n}</Muted>
              </View>
              <Strong>{kz(rnd(l.v * F))}</Strong>
            </View>
          ))}
        </Panel>
        <Panel title="Fugas detectadas" dot={C.bad} i={6}>
          {FUGAS.filter((l) => all || l.f === filial).map((l) => (
            <View key={l.t} style={{ paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line, gap: 2 }}>
              <Txt style={type(14, 400)}>{l.t}</Txt>
              <Muted size={12}>
                {FIL[l.f as 'talatona'].n} · {l.h}
              </Muted>
            </View>
          ))}
        </Panel>
      </Cols>
      <Cols flex={[1.3, 1]}>
        <Panel title="Operadores" i={7}>
          <Table
            cols={[{ l: 'Operador', flex: 1.2 }, { l: 'Turno · filial', flex: 1.2 }, { l: 'Cobranças', align: 'right' }, { l: 'Descontos', align: 'right' }, { l: 'Estornos', align: 'right' }, { l: 'Dif. caixa', align: 'right' }, { l: '', w: 50 }]}
            rows={OPS.filter((o) => turno === 'dia' || o[2] === turno)}
            render={(o) => [<Strong>{o[0]}</Strong>, <Muted>{o[1]}</Muted>, String(Math.round((o[3] as number) * F)), o[4] as string, String(o[5]), <Txt style={[type(14, 400), { color: o[7] ? C.bad : C.ink }]}>{o[6] === 0 ? '—' : kz(rnd((o[6] as number) * F))}</Txt>, o[7] ? <Tag l={o[7] as string} c={C.bad} bg={C.badBg} /> : ''] as any}
          />
        </Panel>
        <Panel title="Comparativo de filiais" i={8}>
          <Table
            cols={[{ l: 'Filial' }, { l: 'Recebido', flex: 1.3, align: 'right' }, { l: 'Activos', align: 'right' }, { l: 'Churn', align: 'right' }, { l: 'Ocup.', align: 'right' }]}
            rows={Object.entries(FIL)}
            selected={([k]) => !all && k === filial}
            render={([, f]) => [<Strong>{f.n}</Strong>, kz(f.r), String(f.a), f.ch, f.o]}
          />
        </Panel>
      </Cols>
    </DPage>
  );
}

/** d7 · Planos e regras. */
export function DPlanos() {
  const toast = useToast();
  const [edit, setEdit] = useState<number | null>(null);
  return (
    <DPage>
      <PageHead title="Planos e regras" sub="Rede Mwangolé Fit · 3 filiais" actions={[{ label: 'Novo plano', onPress: () => toast('Novo plano · rascunho criado', 'info') }]} />
      <View style={{ paddingHorizontal: 40, flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        {PLANOS.map((p, i) => {
          const on = edit === p.id;
          return (
            <Animated.View key={p.id} entering={FadeInDown.delay(i * 40)} layout={LinearTransition} style={{ width: '31.8%', minWidth: 260, backgroundColor: on ? C.canvas : C.paper, borderWidth: 1, borderColor: C.line, padding: 24, gap: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Muted size={12}>{String(i + 1).padStart(2, '0')}</Muted>
                <Tag l={p.scope} c={C.ink} bg={C.sand} />
              </View>
              <Txt style={type(18, 500, 0.16, true)}>{p.n}</Txt>
              <Txt style={type(30, 300)}>{kn(p.p)},00</Txt>
              {[
                ['Acesso', p.acesso],
                ['Horário', p.hor],
                ['Desconto máximo', p.desc],
                ['Membros', p.ativos ? `${p.ativos} activos` : 'Sem membros'],
              ].map(([k, v]) => (
                <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTopWidth: 1, borderTopColor: C.line }}>
                  <Muted size={12}>{k}</Muted>
                  <Txt style={type(12, 400)}>{v}</Txt>
                </View>
              ))}
              {on ? <Note tone={p.ativos ? 'warn' : 'neutral'} text={p.ativos ? `Tem ${p.ativos} membros activos. A alteração vai para aprovação do dono e cada membro recebe SMS 30 dias antes.` : 'Sem membros activos. Pode alterar o preço directamente.'} /> : null}
              <Button
                label={on ? 'Pedir aprovação' : 'Alterar preço'}
                kind="outline"
                size="sm"
                style={{ alignSelf: 'flex-start' }}
                onPress={() => {
                  if (on) toast('Pedido de alteração enviado ao dono');
                  setEdit(on ? null : p.id);
                }}
              />
            </Animated.View>
          );
        })}
      </View>
    </DPage>
  );
}

/** d8 · Rede MUNTU (acesso entre ginásios). */
export function DRede() {
  const toast = useToast();
  const [tab, setTab] = useState('parc');
  const [sel, setSel] = useState(0);
  const parcs = PARC.map((p, i) => ({ ...p, v: (p.rec - p.env) * PV, i }));
  const ps = parcs[sel]!;
  const rec = parcs.reduce((a, p) => a + p.rec, 0);
  const env = parcs.reduce((a, p) => a + p.env, 0);
  const sgn = (v: number) => (v === 0 ? '—' : `${v > 0 ? '+' : ''}${kz(v)}`);
  const visRow = (v: (typeof VIS)[number]) => ({ h: v[0], n: v[1], dir: v[3] === 'in' ? `${v[2]} → Talatona` : `Talatona → ${v[2]}`, p: v[4], v: v[5] === 'validada' ? kz(PV) : '—', s: ST[v[5]]!, why: v[6] || (v[3] === 'in' ? 'Recebida' : 'Enviada') });
  const acts = { ativo: ['Ver extracto', 'Suspender'], convite: ['Reenviar convite'], suspenso: ['Cobrar liquidação', 'Reactivar'] }[ps.st as 'ativo'];
  return (
    <DPage>
      <PageHead title="Rede MUNTU" sub="Acesso entre ginásios · Outubro 2026" actions={[{ label: 'Ver extracto', kind: 'outline', onPress: () => setTab('liq') }, { label: 'Convidar ginásio', onPress: () => toast('Convite enviado', 'info') }]} />
      <KpiRow
        hero={{ label: 'Kz · Saldo do mês', value: (rec - env) * PV, format: (v) => `${kn(v)},00`, sub: 'Liquidação automática a 31/10' }}
        tiles={[
          { v: kn(rec * PV), l: 'Kz · A receber' },
          { v: kn(env * PV), l: 'Kz · A pagar' },
          { v: String(rec), l: 'Visitas recebidas' },
          { v: String(env), l: 'Visitas enviadas' },
        ]}
      />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <Tabs options={[{ v: 'parc', l: 'Parceiros' }, { v: 'vis', l: 'Visitas' }, { v: 'liq', l: 'Liquidações' }, { v: 'reg', l: 'Regras' }]} value={tab} onChange={setTab} />
      </View>
      {tab === 'parc' ? (
        <Cols flex={[1.6, 1]}>
          <Panel title="Ginásios parceiros">
            <Table
              cols={[{ l: 'Ginásio · cidade', flex: 1.6 }, { l: 'Receb.', align: 'right' }, { l: 'Envia.', align: 'right' }, { l: 'Saldo', flex: 1.2, align: 'right' }, { l: 'Estado', w: 150 }]}
              rows={parcs}
              onRow={(p) => setSel(p.i)}
              selected={(p) => p.i === sel}
              render={(p) => [<View><Strong>{p.n}</Strong><Muted size={12}>{p.c}</Muted></View>, String(p.rec), String(p.env), sgn(p.v), <Status l={ST[p.st]!.l} c={ST[p.st]!.c} />]}
            />
            <Muted size={12}>Os parceiros só vêem acesso válido, nome e foto. Pagamentos, dados pessoais e avisos ficam no ginásio de origem.</Muted>
          </Panel>
          <Animated.View key={ps.n} entering={FadeIn}>
            <Panel>
              <Muted size={12}>Parceiro desde {ps.since}</Muted>
              <Txt style={type(22, 400, 0.14, true)}>{ps.n}</Txt>
              <Status l={ST[ps.st]!.l} c={ST[ps.st]!.c} />
              <Txt style={type(36, 300)}>{sgn(ps.v)}</Txt>
              {ps.why ? <Note tone={ps.st === 'suspenso' ? 'bad' : 'warn'} text={ps.why} /> : null}
              {[
                ['Cidade', ps.c],
                ['Preço por visita', kz(PV)],
                ['Visitas recebidas', String(ps.rec)],
                ['Visitas enviadas', String(ps.env)],
                ['Contacto', ps.tel],
              ].map(([k, v]) => (
                <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: C.line }}>
                  <Muted size={12}>{k}</Muted>
                  <Txt style={type(13, 400)}>{v}</Txt>
                </View>
              ))}
              <Strong>Últimas visitas</Strong>
              {VIS.filter((v) => v[2] === ps.n)
                .slice(0, 3)
                .map(visRow)
                .map((v) => (
                  <View key={v.h + v.n} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Muted size={12}>
                      {v.n} · {v.h}
                    </Muted>
                    <Txt style={[type(10, 600, 0.12, true), { color: v.s.c }]}>{v.s.l}</Txt>
                  </View>
                ))}
              {!VIS.some((v) => v[2] === ps.n) ? <Muted size={12}>Sem visitas este mês.</Muted> : null}
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {acts.map((l, i) => (
                  <Button key={l} label={l} size="sm" kind={i ? 'outline' : 'solid'} onPress={() => toast(`${l} · ${ps.n}`, 'info')} />
                ))}
              </View>
            </Panel>
          </Animated.View>
        </Cols>
      ) : tab === 'vis' ? (
        <View style={{ paddingHorizontal: 40 }}>
          <Panel title="Visitas">
            <Table cols={[{ l: 'Hora', w: 100 }, { l: 'Membro' }, { l: 'Direcção', flex: 1.5 }, { l: 'Plano' }, { l: 'Valor', align: 'right' }, { l: 'Estado', w: 170 }]} rows={VIS.map(visRow)} render={(v) => [<Muted>{v.h}</Muted>, <Strong>{v.n}</Strong>, v.dir, <Muted>{v.p}</Muted>, v.v, <Status l={v.s.l} c={v.s.c} why={v.why} />]} />
          </Panel>
        </View>
      ) : tab === 'liq' ? (
        <View style={{ paddingHorizontal: 40 }}>
          <Panel title="Liquidações">
            <Table cols={[{ l: 'Mês' }, { l: 'Parceiro', flex: 1.5 }, { l: 'Receb.', align: 'right' }, { l: 'Envia.', align: 'right' }, { l: 'Saldo', align: 'right', flex: 1.3 }, { l: 'Estado', w: 140 }, { l: 'Data', w: 60 }]} rows={LIQ} render={(l) => [l[0] as string, <Strong>{l[1]}</Strong>, String(l[2]), String(l[3]), sgn(((l[2] as number) - (l[3] as number)) * PV), <Status l={ST[l[4] as string]!.l} c={ST[l[4] as string]!.c} />, <Muted>{l[5]}</Muted>]} />
          </Panel>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 40, maxWidth: 820 }}>
          <Panel title="Regras da rede">
            {REDE_REG.map(([n, v]) => (
              <View key={n} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line }}>
                <Muted>{n}</Muted>
                <Txt style={type(14, 400)}>{v}</Txt>
              </View>
            ))}
          </Panel>
        </View>
      )}
    </DPage>
  );
}

/** d9 · Avisos SMS (jornada automática do membro). */
export function DAvisosSms() {
  const toast = useToast();
  const [rules, setRules] = useState(RULES.map((r) => ({ on: r.on, tpl: r.tpl, hora: r.hora, ch: r.ch })));
  const [ri, setRi] = useState(1);
  const [logF, setLogF] = useState('Todos');
  const [resent, setResent] = useState<Record<number, boolean>>({});
  const upd = (i: number, p: Partial<(typeof rules)[number]>) => setRules(rules.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const rs = rules[ri]!;
  const prev = fill(rs.tpl, SAMPLE);
  const parts = Math.max(1, Math.ceil(prev.length / 160));
  const LF: Record<string, string | null> = { Todos: null, Agendados: 'agendado', Entregues: 'entregue', Falharam: 'falhou' };
  const log = LOG.map((r) => (resent[r.id] ? { ...r, st: 'agendado', why: 'Reenvio às 10:15' } : r)).filter((r) => !LF[logF] || r.st === LF[logF]);
  return (
    <DPage>
      <PageHead title="Avisos" sub="Automações · SMS & WhatsApp" actions={[{ label: 'Comprar SMS', kind: 'outline', onPress: () => toast('Pacote de 5 000 SMS · pedido enviado', 'info') }, { label: 'Novo aviso', onPress: () => toast('Novo aviso · rascunho', 'info') }]} />
      <KpiRow
        hero={{ label: 'SMS disponíveis', value: 4820, format: kn, sub: 'Cerca de 21 dias ao ritmo actual' }}
        tiles={[
          { v: '1 261', l: 'Enviados em Outubro' },
          { v: '97,8%', l: 'Taxa de entrega' },
          { v: '62%', l: 'Pagam após aviso' },
        ]}
      />
      <Cols flex={[1.3, 1]}>
        <Panel title="Jornada do membro">
          <Table
            cols={[{ l: 'N.º', w: 36 }, { l: 'Aviso · quando', flex: 2 }, { l: 'Canal' }, { l: 'Mês', align: 'right', w: 50 }, { l: '', w: 50 }]}
            rows={RULES.map((r, i) => ({ r, i }))}
            onRow={({ i }) => setRi(i)}
            selected={({ i }) => i === ri}
            render={({ r, i }) => [
              <Muted>{`0${i + 1}`}</Muted>,
              <View><Strong size={13}>{r.n}</Strong><Muted size={11}>{`${r.trig} · ${rules[i]!.hora}`}</Muted></View>,
              <Txt style={type(10, 600, 0.12, true)}>{rules[i]!.ch}</Txt>,
              <Txt style={[type(13, 400), { color: rules[i]!.on ? C.ink : C.muted }]}>{rules[i]!.on ? String(r.sent) : 'Desligado'}</Txt>,
              <Toggle on={rules[i]!.on} accent onChange={() => upd(i, { on: !rules[i]!.on })} />,
            ]}
          />
        </Panel>
        <Animated.View key={ri} entering={FadeIn}>
          <Panel>
            <Muted size={12}>Aviso 0{ri + 1} · editar</Muted>
            <Txt style={type(20, 400, 0.14, true)}>{RULES[ri]!.n}</Txt>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Field style={{ flex: 2 }} label="Quando" value={RULES[ri]!.trig} editable={false} />
              <Field style={{ flex: 1 }} label="Hora" value={rs.hora} onChangeText={(v) => upd(ri, { hora: v })} />
            </View>
            <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Canal</Txt>
            <ChipGroup size="sm" options={['SMS', 'WhatsApp', 'SMS + WhatsApp'].map((v) => [v, v] as const)} value={rs.ch} onChange={(v) => upd(ri, { ch: v })} />
            <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Mensagem</Txt>
            <TextArea value={rs.tpl} onChangeText={(v) => upd(ri, { tpl: v })} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {['{nome}', '{valor}', '{data}', '{referencia}', '{ginasio}'].map((v) => (
                <Chip key={v} size="sm" label={v} onPress={() => upd(ri, { tpl: `${rs.tpl} ${v}` })} />
              ))}
            </View>
            <Txt style={[type(12, 400), { color: parts > 1 ? C.bad : C.grey }]}>
              {prev.length} caracteres · {parts} SMS por envio
            </Txt>
            <Muted size={12}>Pré-visualização · Kátia Muondo</Muted>
            <View style={{ backgroundColor: C.sand, padding: 14 }}>
              <Txt style={type(14, 400)}>{prev}</Txt>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button label="Enviar teste" kind="outline" size="sm" onPress={() => toast('Teste enviado para 927 220 001')} />
              <Button label="Guardar" size="sm" onPress={() => toast('Aviso guardado')} />
            </View>
          </Panel>
        </Animated.View>
      </Cols>
      <View style={{ paddingHorizontal: 40 }}>
        <Panel title="Registo de envios" right={<ChipGroup size="sm" options={Object.keys(LF).map((k) => [k, k] as const)} value={logF} onChange={setLogF} />}>
          <Table
            cols={[{ l: 'Hora', w: 60 }, { l: 'Membro' }, { l: 'Telefone' }, { l: 'Aviso' }, { l: 'Canal', w: 90 }, { l: 'Estado', w: 170 }, { l: '', w: 90 }]}
            rows={log}
            empty="Sem envios com este filtro."
            render={(r) => [<Muted>{r.h}</Muted>, <Strong size={13}>{r.n}</Strong>, <Muted>{r.tel}</Muted>, r.a, <Txt style={type(10, 600, 0.12, true)}>{r.ch}</Txt>, <Status l={ST[r.st]!.l} c={ST[r.st]!.c} why={r.why} />, r.st === 'falhou' ? <Button label="Reenviar" size="xs" kind="outline" onPress={() => setResent({ ...resent, [r.id]: true })} /> : '']}
          />
        </Panel>
      </View>
    </DPage>
  );
}

/** de · Equipa (presença, estatísticas e avisos). */
export function DEquipa() {
  const { sentNotices, sendNotice } = useMuntu();
  const [to, setTo] = useState<keyof typeof NOTICE_TARGETS>('Todos');
  const [pri, setPri] = useState<'normal' | 'urgente'>('normal');
  const [text, setText] = useState('');
  const sent = [...sentNotices, ...NOTICES.map((n) => ({ p: n.p, t: n.t, h: n.h, to: n.to as keyof typeof NOTICE_TARGETS, r: n.r, n: n.n }))];
  const pres = STAFF.filter((p) => p.on).length;
  return (
    <DPage>
      <PageHead title="Equipa" sub={`${pres} de ${STAFF.length} presentes agora`} />
      <KpiRow
        tiles={[
          { v: `${pres} de 7`, l: 'Presentes agora', sub: 'Por registo de turno' },
          { v: '249h', l: 'Horas em Outubro', sub: 'Toda a equipa' },
          { v: '94%', l: 'Assiduidade média', sub: 'Turnos cumpridos' },
          { v: '104', l: 'Sessões de PT', sub: '3 treinadores' },
        ]}
      />
      <Cols flex={[1.6, 1]}>
        <Panel title="Presença e estatísticas · Outubro">
          <Table
            cols={[{ l: 'Funcionário', flex: 1.6 }, { l: 'Agora' }, { l: 'Horas', w: 60 }, { l: 'Assiduidade', flex: 1.3 }, { l: 'Indicador', flex: 1.4 }]}
            rows={STAFF}
            render={(p) => [
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Avatar initials={p.i} size={32} /><View><Strong size={13}>{p.n}</Strong><Muted size={11}>{`${p.r} · ${p.f}`}</Muted></View></View>,
              <Status l={p.since} c={p.on ? C.ok : C.faint} />,
              p.h,
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%' }}><Progress value={parseInt(p.ass, 10) / 100} color={p.warn ? C.bad : C.ink} style={{ flex: 1 }} /><Muted size={12}>{p.ass}</Muted></View>,
              <Txt style={[type(12, 400), { color: p.warn ? C.bad : C.grey }]}>{p.k}</Txt>,
            ]}
          />
        </Panel>
        <View style={{ gap: 20 }}>
          <Panel title="Enviar aviso à equipa">
            <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Para</Txt>
            <ChipGroup size="sm" options={(Object.keys(NOTICE_TARGETS) as (keyof typeof NOTICE_TARGETS)[]).map((k) => [k, k] as const)} value={to} onChange={setTo} />
            <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Prioridade</Txt>
            <ChipGroup size="sm" options={[['normal', 'Informação'], ['urgente', 'Urgente']]} value={pri} onChange={setPri} />
            <TextArea value={text} onChangeText={setText} placeholder="Escreve o aviso…" />
            <Button label={`Enviar a ${to === 'Todos' ? 'toda a equipa' : to} · ${NOTICE_TARGETS[to]}`} disabled={!text.trim()} feedback="success" onPress={() => (sendNotice({ p: pri, t: text.trim(), to }), setText(''))} />
          </Panel>
          <Panel title="Enviados">
            {sent.map((a, i) => (
              <Animated.View key={a.t + i} entering={FadeInDown} style={{ paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: C.line, gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Tag l={a.p === 'urgente' ? 'Urgente' : 'Informação'} c={a.p === 'urgente' ? C.bad : C.grey} bg={a.p === 'urgente' ? C.badBg : C.sand} />
                  <Muted size={11}>
                    {a.h} · {a.to}
                  </Muted>
                </View>
                <Txt style={type(13, 400)}>{a.t}</Txt>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Progress value={a.r / a.n} color={C.ok} style={{ flex: 1 }} />
                  <Muted size={11}>
                    Lido por {a.r} de {a.n}
                  </Muted>
                </View>
              </Animated.View>
            ))}
          </Panel>
        </View>
      </Cols>
    </DPage>
  );
}

/** dl · Receitas perdidas. */
export function DReceitasPerdidas() {
  const { lostState, lostSent, setLost, sendLost } = useMuntu();
  const [tab, setTab] = useState<'pot' | 'conf' | 'res'>('pot');
  const st = (l: (typeof LOST)[number]) => lostState[l.id] ?? l.st;
  const sum = (k: string) => LOST.filter((l) => st(l) === k).reduce((a, l) => a + l.v, 0);
  const list = LOST.filter((l) => st(l) === tab);
  return (
    <DPage>
      <PageHead title="Receitas perdidas" sub="Rede Mwangolé Fit · Outubro" />
      <View style={{ flexDirection: 'row', gap: 16, paddingHorizontal: 40, paddingBottom: 20 }}>
        {(
          [
            ['pot', 'Kz · por rever', C.ink, 'Indícios ainda não confirmados'],
            ['conf', 'Kz · confirmado', C.bad, 'Perda verificada'],
            ['res', 'Kz · resolvido', C.ok, 'Recuperado ou justificado'],
          ] as const
        ).map(([k, l, c, d], i) => (
          <Animated.View key={k} entering={FadeInDown.delay(i * 40)} style={{ flex: 1, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 22, gap: 6 }}>
            <Muted size={12}>{l}</Muted>
            <Txt style={[type(36, 300), { color: c }]}>{kn(sum(k))}</Txt>
            <Muted size={12}>{d}</Muted>
          </Animated.View>
        ))}
      </View>
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <Tabs options={(['pot', 'conf', 'res'] as const).map((k) => ({ v: k, l: { pot: 'Por rever', conf: 'Confirmadas', res: 'Resolvidas' }[k], n: LOST.filter((x) => st(x) === k).length }))} value={tab} onChange={setTab} />
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <Panel>
          <Muted>Indícios para rever. Uma suspeita só passa a perda depois de confirmada.</Muted>
          <Table
            cols={[{ l: 'Categoria', w: 110 }, { l: 'Ocorrência', flex: 1.6 }, { l: 'Valor', align: 'right' }, { l: 'Origem', flex: 1.2 }, { l: 'Responsável' }, { l: '', w: 280, align: 'right' }]}
            rows={list}
            empty="Nada nesta lista."
            render={(l) => [
              <Muted>{l.cat}</Muted>,
              <Txt style={type(14, 400)}>{l.t}</Txt>,
              <Strong>{l.v ? `${kn(l.v)} Kz` : 'Sem valor'}</Strong>,
              <Muted size={12}>{l.o}</Muted>,
              l.r,
              st(l) === 'res' ? (
                <Tag l="Resolvido" c={C.ok} bg={C.okBg} />
              ) : (
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    {l.a ? <Button label={l.a} size="xs" disabled={!!lostSent[l.id]} onPress={() => sendLost(l.id)} /> : null}
                    {st(l) === 'pot' ? <Button label="Confirmar" size="xs" kind="outline" onPress={() => setLost(l.id, 'conf')} /> : null}
                    <Button label="Resolvido" size="xs" kind="outline" onPress={() => setLost(l.id, 'res')} />
                  </View>
                  {lostSent[l.id] ? <Muted size={11}>{`Pedido enviado a ${l.r.split(' ')[0]}`}</Muted> : null}
                </View>
              ),
            ]}
          />
        </Panel>
      </View>
    </DPage>
  );
}

const NFX = [
  ['planos', 'Planos e preços', '5 planos'],
  ['horarios', 'Horários e turnos', 'Manhã 06–14 · Tarde 14–22'],
  ['regras', 'Regras de aprovação', 'Limites de desconto, estornos, despesas'],
  ['perm', 'Permissões da equipa', 'Recepção, finanças e PT'],
  ['avisos', 'Avisos automáticos', '12 SMS da jornada'],
] as const;

/** df · Filiais. */
export function DFiliais() {
  const [m, setM] = useState('ret');
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [n, setN] = useState('Viana');
  const [from, setFrom] = useState('Talatona');
  const [x, setX] = useState<Record<string, boolean>>({ planos: true, horarios: true, regras: true, perm: true, avisos: true });
  const M = COMPARE[m]!;
  const mx = Math.max(...M.rows.map((r) => r[1]));
  const cards = Object.values(FIL).map((f, i) => ({ ...f, ch: [184, 121, 76][i], al: ['', '2 alertas', ''][i] }));
  return (
    <DPage>
      <PageHead title="Filiais" sub="Rede Mwangolé Fit · 3 filiais" actions={[{ label: show ? 'Fechar' : 'Nova filial', onPress: () => (setShow(!show), setDone(false)) }]} />
      <View style={{ flexDirection: 'row', gap: 16, paddingHorizontal: 40, paddingBottom: 20 }}>
        {cards.map((f, i) => {
          const pct = Math.round((f.r / f.e) * 100);
          return (
            <Animated.View key={f.n} entering={FadeInDown.delay(i * 50)} style={{ flex: 1, backgroundColor: C.paper, borderWidth: 1, borderColor: C.line, padding: 22, gap: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Txt style={type(13, 600, 0.2, true)}>{f.n}</Txt>
                <Txt style={[type(11, 500), { color: f.al ? C.bad : C.ok }]}>{f.al || `${pct}% cobrado`}</Txt>
              </View>
              <Txt style={type(28, 300)}>
                {kn(f.r)} <Txt style={[type(12, 400), { color: C.muted }]}>{`de ${kn(f.e)} Kz`}</Txt>
              </Txt>
              <Progress value={pct / 100} color={C.accent} height={4} />
              <View style={{ flexDirection: 'row' }}>
                {[
                  [String(f.a), 'Activos'],
                  [f.o, 'Ocupação'],
                  [String(f.ch), 'Check-ins hoje'],
                ].map(([v, l]) => (
                  <View key={l} style={{ flex: 1 }}>
                    <Strong size={13}>{v}</Strong>
                    <Muted size={11}>{l}</Muted>
                  </View>
                ))}
              </View>
            </Animated.View>
          );
        })}
      </View>
      <Cols flex={[1.4, 1]}>
        <Panel title="Comparar · últimos 90 dias">
          <ChipGroup size="sm" options={Object.entries(COMPARE).map(([k, v]) => [k, v.l] as const)} value={m} onChange={setM} />
          {M.rows.map(([nn, v], i) => (
            <View key={nn} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Txt style={[type(13, 400), { width: 80 }]}>{nn}</Txt>
              <Progress value={v / mx} color={i === 0 ? C.ink : C.stone} track={C.sand} height={12} style={{ flex: 1 }} />
              <Txt style={[type(13, 400), { width: 90, textAlign: 'right' }]}>{M.unit === '%' ? `${v}%` : `${(v / 1e6).toFixed(2).replace('.', ',')} M Kz`}</Txt>
            </View>
          ))}
          <Muted size={12}>Mesmos critérios em todas as filiais. {M.note}</Muted>
        </Panel>
        <Panel title="Abrir nova filial">
          {!show ? (
            <>
              <Muted>Copia planos, horários, regras de aprovação, permissões e avisos automáticos de uma filial existente. Os dados pessoais ficam onde estão.</Muted>
              <Button label="Começar" kind="outline" size="sm" style={{ alignSelf: 'flex-start' }} onPress={() => setShow(true)} />
            </>
          ) : done ? (
            <Animated.View entering={ZoomIn}>
              <Note tone="ok" text={`Filial ${n} criada a partir de ${from}. Copiado: ${NFX.filter(([k]) => x[k]).map(([, l]) => l.toLowerCase()).join(', ')}.`} />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown} style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <Field style={{ flex: 1 }} label="Nome" value={n} onChangeText={setN} />
                <Select style={{ flex: 1 }} label="Copiar de" value={from} onChange={setFrom} options={['Talatona', 'Kilamba', 'Maianga'].map((v) => ({ v, l: v }))} />
              </View>
              {NFX.map(([k, l, d]) => (
                <Checkbox key={k} on={!!x[k]} onChange={() => setX({ ...x, [k]: !x[k] })} label={l} sub={d} />
              ))}
              <Button label="Criar filial" disabled={n.trim().length < 3} onPress={() => (setDone(true), haptic('success'))} />
            </Animated.View>
          )}
        </Panel>
      </Cols>
    </DPage>
  );
}

/** dg · Gestão (regras, cofre, importação e indicações). */
export function DGestao() {
  const toast = useToast();
  const [tab, setTab] = useState('reg');
  const [v, setV] = useState({ dRec: 10, dGes: 25, dFin: 20000, eFin: 0 });
  const [saved, setSaved] = useState(false);
  const [cat, setCat] = useState('Todos');
  const [extra, setExtra] = useState(0);
  const [rew, setRew] = useState<keyof typeof REWARDS>('mes');
  const [cond, setCond] = useState(2);
  const [rev, setRev] = useState<Record<string, boolean>>({});
  const ob = useOnboarding();
  const [impDone, setImpDone] = useState(false);
  const docs = [...Array.from({ length: extra }, (_, i) => ({ n: `Documento carregado ${extra - i}`, cat: 'Comprovativos', f: 'Talatona', dt: 'Agora', keep: 'Conservar até 2036', perm: 'Dono · Finanças', ext: 'PDF', al: false })), ...DOCUMENTS];
  const kzN = (x: number) => (x ? `${kn(x)} Kz` : 'Nenhum');
  const set = (k: keyof typeof v) => (x: number) => (setV({ ...v, [k]: x }), setSaved(false));
  const rule = (n: string, d: string, tiers: [string, React.ReactNode][]) => (
    <Panel title={n} style={{ flex: 1, minWidth: 380 }}>
      <Muted size={12}>{d}</Muted>
      {tiers.map(([who, r], i) => (
        <View key={who} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
          <Txt style={type(14, 400)}>{who}</Txt>
          {r}
        </View>
      ))}
    </Panel>
  );
  return (
    <DPage>
      <PageHead title="Gestão" sub="Configuração do ginásio" />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <Tabs options={[{ v: 'reg', l: 'Regras de aprovação' }, { v: 'cof', l: 'Cofre de documentos', n: docs.length }, { v: 'imp', l: 'Importar dados' }, { v: 'ind', l: 'Indicações' }]} value={tab} onChange={setTab} />
      </View>
      {tab === 'reg' ? (
        <View style={{ paddingHorizontal: 40, gap: 16 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {rule('Descontos', 'Acima do limite vai para o nível seguinte', [
              ['Recepção até', <Stepper value={v.dRec} step={5} max={50} onChange={set('dRec')} format={(x) => `${x}%`} />],
              ['Gestor até', <Stepper value={v.dGes} step={5} max={100} onChange={set('dGes')} format={(x) => `${x}%`} />],
              ['Acima disso', <Muted>Dono</Muted>],
            ])}
            {rule('Estornos', 'Recepção pede, nunca aprova', [
              ['Finanças aprova até', <Stepper value={v.eFin} step={5000} max={100000} onChange={set('eFin')} format={kzN} width={150} />],
              ['Acima disso', <Muted>Dono</Muted>],
            ])}
            {rule('Despesas', 'Com recibo anexado', [
              ['Finanças até', <Stepper value={v.dFin} step={5000} max={500000} onChange={set('dFin')} format={kzN} width={150} />],
              ['Acima disso', <Muted>Dono</Muted>],
            ])}
            {rule('Alteração de preços', 'Membros avisados por SMS 30 dias antes', [['Quem aprova', <Muted>Só o dono · Face ID</Muted>]])}
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Button label="Guardar regras" onPress={() => (setSaved(true), haptic('success'))} />
            {saved ? <Txt style={[type(13, 500), { color: C.ok }]}>Regras guardadas ✓</Txt> : null}
          </View>
        </View>
      ) : tab === 'cof' ? (
        <View style={{ paddingHorizontal: 40 }}>
          <Panel right={<Button label="Carregar documento" size="sm" onPress={() => (setExtra(extra + 1), setCat('Todos'), toast('Documento guardado no cofre'))} />} title="Cofre de documentos">
            <ChipGroup size="sm" options={['Todos', 'Contratos', 'Comprovativos', 'Manutenção', 'Licenças'].map((c) => [c, c] as const)} value={cat} onChange={setCat} />
            <Note tone="bad" text="Licença de actividade da Kilamba expira em 21 dias." />
            <Table
              cols={[{ l: '', w: 40 }, { l: 'Documento', flex: 1.6 }, { l: 'Categoria' }, { l: 'Filial' }, { l: 'Data' }, { l: 'Conservação', flex: 1.4 }, { l: 'Acesso' }]}
              rows={docs.filter((d) => cat === 'Todos' || d.cat === cat)}
              render={(d) => [<View style={{ width: 30, height: 36, backgroundColor: C.sand, alignItems: 'center', justifyContent: 'center' }}><Txt style={type(8, 600)}>{d.ext}</Txt></View>, <Strong size={13}>{d.n}</Strong>, <Muted>{d.cat}</Muted>, d.f, <Muted>{d.dt}</Muted>, <Txt style={[type(13, 400), { color: d.al ? C.bad : C.grey }]}>{d.keep}</Txt>, <Muted size={12}>{d.perm}</Muted>]}
            />
          </Panel>
        </View>
      ) : tab === 'imp' ? (
        <View style={{ paddingHorizontal: 40, gap: 16 }}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {IMPORT_KINDS.map((k) => {
              const ld = !!ob.imported[k.k];
              return (
                <Panel key={k.k} title={k.l} style={{ flex: 1, borderColor: ld ? C.ink : C.line }} right={!ld ? <Button label="Carregar" size="sm" onPress={() => ob.set({ imported: { ...ob.imported, [k.k]: true } })} /> : <Tag l="Carregado" c={C.ok} bg={C.okBg} />}>
                  <Muted size={12}>{k.d}</Muted>
                  {ld ? (
                    <Animated.View entering={FadeInDown} style={{ gap: 10 }}>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                        {k.cols.filter(([, ok]) => ok).map(([n]) => (
                          <Tag key={n} l={`${n} ✓`} c={C.ok} bg={C.okBg} />
                        ))}
                      </View>
                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        {[
                          [kn(k.ok + k.dup), 'Válidos', C.ok],
                          [String(k.dup), 'Duplicados', C.warn],
                          [String(k.bad), 'Com erro', k.bad ? C.bad : C.grey],
                        ].map(([val, l, c]) => (
                          <View key={l} style={{ flex: 1, backgroundColor: C.canvas, padding: 10 }}>
                            <Txt style={[type(20, 400), { color: c }]}>{val}</Txt>
                            <Muted size={11}>{l}</Muted>
                          </View>
                        ))}
                      </View>
                    </Animated.View>
                  ) : (
                    <View style={{ height: 70, borderWidth: 1, borderStyle: 'dashed', borderColor: C.lineStrong, alignItems: 'center', justifyContent: 'center' }}>
                      <Muted size={12}>Arrasta ou escolhe · .xlsx · .csv</Muted>
                    </View>
                  )}
                </Panel>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Button label={impDone ? 'Importado ✓' : 'Confirmar importação'} disabled={impDone || !Object.keys(ob.imported).length} onPress={() => (setImpDone(true), haptic('success'))} />
            <Muted size={12}>{impDone ? 'Membros importados. Podes enviar as credenciais em Avisos SMS.' : 'Nada é gravado antes de confirmares.'}</Muted>
          </View>
        </View>
      ) : (
        <View style={{ gap: 0 }}>
          <KpiRow
            tiles={[
              { v: '18', l: 'Inscrições por indicação', sub: 'Outubro' },
              { v: '684 000', l: 'Kz dos indicados', sub: 'Recebidos' },
              { v: '135 000', l: 'Kz em recompensas', sub: 'Custo' },
              { v: '5,1×', l: 'Retorno', c: C.ok, sub: 'Receita sobre custo' },
            ]}
          />
          <Cols flex={[1, 1]}>
            <Panel title="A validar">
              {REFERRAL_REVIEW.filter((r) => !rev[r.id]).map((r) => (
                <Animated.View key={r.id} entering={FadeInDown} layout={LinearTransition} style={{ paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.line, gap: 8 }}>
                  <Strong>{r.t}</Strong>
                  <Txt style={[type(12, 400), { color: C.bad }]}>{r.why}</Txt>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Button label="Não elegível" kind="outline" size="xs" onPress={() => setRev({ ...rev, [r.id]: true })} />
                    <Button label="Validar" size="xs" onPress={() => setRev({ ...rev, [r.id]: true })} />
                  </View>
                </Animated.View>
              ))}
              {REFERRAL_REVIEW.every((r) => rev[r.id]) ? <Muted>Nada por validar.</Muted> : null}
              <Strong>Quem mais indica</Strong>
              {[
                ['Kátia Muondo', '4 indicações · 3 pagas', 152000],
                ['Edson Mateus', '3 indicações · 2 pagas', 90000],
                ['Ana Domingos', '2 indicações · 2 pagas', 90000],
              ].map(([n, d, val]) => (
                <View key={n as string} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: C.line }}>
                  <View>
                    <Strong size={13}>{n as string}</Strong>
                    <Muted size={11}>{d as string}</Muted>
                  </View>
                  <Txt style={type(13, 400)}>{kn(val as number)} Kz</Txt>
                </View>
              ))}
            </Panel>
            <Panel title="Regras do programa">
              <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Recompensa</Txt>
              <ChipGroup size="sm" options={(Object.keys(REWARDS) as (keyof typeof REWARDS)[]).map((k) => [k, REWARDS[k]] as const)} value={rew} onChange={setRew} />
              <Txt style={[type(10, 600, 0.2, true), { color: C.muted }]}>Liberta após</Txt>
              <ChipGroup size="sm" options={[1, 2, 3].map((n) => [String(n), `${n} ${n === 1 ? 'mensalidade' : 'mensalidades'}`] as const)} value={String(cond)} onChange={(x) => setCond(+x)} />
              <Note text={`${REWARDS[rew]} após ${cond} ${cond === 1 ? 'mensalidade' : 'mensalidades'}.`} />
              <Button label="Guardar" size="sm" style={{ alignSelf: 'flex-start' }} onPress={() => toast('Programa actualizado')} />
            </Panel>
          </Cols>
        </View>
      )}
    </DPage>
  );
}
