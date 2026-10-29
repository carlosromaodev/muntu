import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { TURNO, TURNO_PAGAMENTOS, TURNO_PENDENCIAS, TURNO_TRILHA } from '../../data/sample';
import { kn, kz, nowHM, parseKz } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Area, Btn, Check, Dot, Field, HoldButton, ListRow, Note, Page, PageHeader, Section, Split, StatBand, Status, T } from '../../ui';

export function Turno() {
  const { c, g, compact } = useTheme();
  const { go, bottomInset } = useNav();
  const notify = useNotify();
  const addApproval = useMuntu((s) => s.addApproval);
  const [cnt, setCnt] = useState({ dinheiro: '', tpa: '' });
  const [compared, setCompared] = useState(false);
  const [nota, setNota] = useState('');
  const [pays, setPays] = useState<Record<string, boolean>>({});
  const [pend, setPend] = useState<Record<string, boolean>>({});
  const [trilha, setTrilha] = useState(TURNO_TRILHA);
  const [done, setDone] = useState(false);

  const dDin = parseKz(cnt.dinheiro) - TURNO.declarado.dinheiro;
  const dTpa = parseKz(cnt.tpa) - TURNO.declarado.tpa;
  const dif = dDin + dTpa;
  const allPays = TURNO_PAGAMENTOS.every((p) => pays[p.id]);
  const allPend = TURNO_PENDENCIAS.every((p) => pend[p.id]);
  const ready = compared && allPays && allPend && (dif === 0 || nota.trim().length > 0) && !done;
  const log = (t: string) => setTrilha((x) => [{ h: nowHM(), q: TURNO.entra.n, t }, ...x]);

  const comparar = () => {
    setCompared(true);
    const msg = `Contou ${kn(parseKz(cnt.dinheiro))} em dinheiro e ${kn(parseKz(cnt.tpa))} em TPA`;
    if (dif === 0) {
      haptic('success');
      log(msg + ' · sem diferença');
    } else {
      haptic('warning');
      log(msg + ` · divergência de ${kn(dif)} registada (dados do turno anterior mantidos)`);
    }
  };

  const receber = () => {
    setDone(true);
    log('Recebeu o turno com ' + TURNO_PENDENCIAS.length + ' pendências');
    if (dif !== 0) {
      addApproval({ id: 'turno-tal', kind: 'turno', k: 'Passagem de turno · Talatona · agora', t: `Divergência de ${kn(dif)} entre ${TURNO.sai.n} e ${TURNO.entra.n}. ${nota.trim()}`, v: dif });
      notify('Turno recebido com divergência. Dono avisado.', 'warn');
    } else notify('Turno recebido. Caixa certo.', 'ok');
  };

  const step = (n: string, title: string, doneFlag: boolean) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: doneFlag ? c.ink : 'transparent', borderWidth: 1, borderColor: c.ink }}>
        <T size={12} w={600} color={doneFlag ? c.bg : c.ink}>{doneFlag ? '✓' : n}</T>
      </View>
      <T v="section">{title}</T>
    </View>
  );

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader eyebrow="Talatona · Quinta, 29 Outubro · 14:00" title="Passagem de turno" actions={<Btn kind="outline" label="Fecho de caixa" onPress={() => go('caixa')} />} />
      <StatBand
        hero={{
          label: 'Kz · Diferença na passagem',
          value: compared ? kn(dif) : '••••',
          bg: !compared ? c.surface : dif === 0 ? c.okBg : c.brand,
          fg: !compared || dif === 0 ? c.ink : '#1D1C1A',
          sub: !compared ? 'Oculta até contar' : dif === 0 ? 'Caixa certo' : 'Divergência registada',
        }}
        stats={[
          { value: `${Object.values(pays).filter(Boolean).length}/${TURNO_PAGAMENTOS.length}`, label: 'Pagamentos conferidos' },
          { value: `${Object.values(pend).filter(Boolean).length}/${TURNO_PENDENCIAS.length}`, label: 'Pendências recebidas' },
          { value: done ? 'Recebido' : 'Em curso', label: 'Estado' },
        ]}
      />
      <View style={{ flexDirection: compact ? 'column' : 'row', borderBottomWidth: 1, borderColor: c.line }}>
        {[
          { k: 'Entrega', p: TURNO.sai },
          { k: 'Recebe', p: TURNO.entra },
        ].map((x, i) => (
          <View key={x.k} style={{ flex: 1, paddingHorizontal: g, paddingVertical: 18, gap: 4, borderLeftWidth: !compact && i ? 1 : 0, borderTopWidth: compact && i ? 1 : 0, borderColor: c.line }}>
            <T v="eyebrow">{x.k} · Turno da {x.p.turno.toLowerCase()} · {x.p.h}</T>
            <T v="title" size={18}>{x.p.n}</T>
          </View>
        ))}
      </View>
      <Split ratio={[1.5, 1]} minRight={320}>
        <View>
          <Section>
            {step('1', 'Contar o caixa sem ver o declarado', compared)}
            <T size={14} color={c.ink2}>Quem recebe conta primeiro. O valor declarado por {TURNO.sai.n.split(' ')[0]} só aparece depois de comparar.</T>
            <View style={{ flexDirection: compact ? 'column' : 'row', gap: 20 }}>
              <Field style={{ flex: 1 }} big label="Dinheiro contado (Kz)" value={cnt.dinheiro} editable={!compared} onChangeText={(v) => setCnt((x) => ({ ...x, dinheiro: v }))} keyboardType="numeric" placeholder="0" />
              <Field style={{ flex: 1 }} big label="TPA · talões (Kz)" value={cnt.tpa} editable={!compared} onChangeText={(v) => setCnt((x) => ({ ...x, tpa: v }))} keyboardType="numeric" placeholder="0" />
            </View>
            {!compared ? (
              <Btn label="Comparar com o declarado" haptic={false} disabled={!cnt.dinheiro || !cnt.tpa} onPress={comparar} />
            ) : (
              <View style={{ gap: 12 }}>
                <View style={{ backgroundColor: c.surface, padding: 16, gap: 8 }}>
                  <Row l="Dinheiro" a={parseKz(cnt.dinheiro)} b={TURNO.declarado.dinheiro} />
                  <Row l="TPA" a={parseKz(cnt.tpa)} b={TURNO.declarado.tpa} />
                </View>
                {dif !== 0 ? (
                  <>
                    <Note bg={c.warnBg} color={c.warn}>
                      A divergência fica registada na trilha. Os valores declarados por {TURNO.sai.n} não são alterados.
                    </Note>
                    <Area label="Nota da divergência · obrigatória" value={nota} onChangeText={setNota} placeholder="Ex.: falta uma nota de 2 000, Celma confirma por telefone" />
                  </>
                ) : null}
              </View>
            )}
          </Section>
          <Section style={{ borderTopWidth: 1, borderColor: c.line }}>
            {step('2', 'Conferir pagamentos do turno', allPays)}
            <View>
              {TURNO_PAGAMENTOS.map((p) => (
                <Check key={p.id} value={!!pays[p.id]} onChange={(v) => setPays((x) => ({ ...x, [p.id]: v }))} label={`${p.n} · ${kz(p.v)}`} sub={`${p.h} · ${p.d}`} />
              ))}
            </View>
          </Section>
          <Section style={{ borderTopWidth: 1, borderColor: c.line }}>
            {step('3', 'Receber pendências', allPend)}
            <View>
              {TURNO_PENDENCIAS.map((p) => (
                <Check key={p.id} value={!!pend[p.id]} onChange={(v) => setPend((x) => ({ ...x, [p.id]: v }))} label={p.t} sub={p.d} />
              ))}
            </View>
            <View style={{ gap: 8, maxWidth: 440, paddingTop: 8 }}>
              {done ? (
                <Status s={dif === 0 ? 'recebido' : 'divergencia'} label={dif === 0 ? 'Turno recebido' : 'Recebido com divergência · dono avisado'} />
              ) : ready ? (
                <HoldButton label="Segurar para receber turno" reason="Confirmar recepção do turno" onConfirm={receber} />
              ) : (
                <T v="small">Conte o caixa, confira os pagamentos e receba as pendências para assinar a passagem.</T>
              )}
            </View>
          </Section>
        </View>
        <Section title="Trilha de auditoria" right={<T v="eyebrow">Só acrescenta</T>}>
          <View>
            {trilha.map((r, i) => (
              <ListRow key={i + r.h} style={{ alignItems: 'flex-start' }}>
                <View style={{ paddingTop: 6 }}>
                  <Dot color={i === 0 && trilha.length > TURNO_TRILHA.length ? c.brand : c.line2} square />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <T size={14}>{r.t}</T>
                  <T v="small">{r.h} · {r.q}</T>
                </View>
              </ListRow>
            ))}
          </View>
          <T v="small">Cada entrada fica com hora e autor. Correcções entram como novas linhas.</T>
        </Section>
      </Split>
    </Page>
  );
}

function Row({ l, a, b }: { l: string; a: number; b: number }) {
  const { c } = useTheme();
  const d = a - b;
  return (
    <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
      <T v="label" size={10} style={{ width: 80 }}>{l}</T>
      <T size={14} style={{ flex: 1, minWidth: 140 }}>Contado {kn(a)} · declarado {kn(b)}</T>
      <T size={14} w={500} color={d === 0 ? c.ok : c.bad}>{d === 0 ? 'Certo' : kn(d)}</T>
    </View>
  );
}
