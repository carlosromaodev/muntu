import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu, type Tarefa } from '../../store';
import { RISK, type RiskMember } from '../../data/sample';
import { kn, kz } from '../../lib/format';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Area, Btn, Chips, Dot, ListRow, Page, PageHeader, Section, Sheet, Split, StatBand, Status, T, Tag } from '../../ui';

const QUEM = ['Celma Bento', 'Rui Manuel', 'Treinador Abel'] as const;
const ACCAO = ['Ligar ao membro', 'Marcar sessão de PT', 'Oferecer congelamento', 'Enviar SMS'] as const;

export function Retencao() {
  const { c, compact } = useTheme();
  const { go, bottomInset } = useNav();
  const notify = useNotify();
  const tarefas = useMuntu((s) => s.tarefas);
  const addTarefa = useMuntu((s) => s.addTarefa);
  const updTarefa = useMuntu((s) => s.updTarefa);
  const [criar, setCriar] = useState<RiskMember | null>(null);
  const [quem, setQuem] = useState<(typeof QUEM)[number]>('Celma Bento');
  const [accao, setAccao] = useState<(typeof ACCAO)[number]>('Ligar ao membro');
  const [fechar, setFechar] = useState<Tarefa | null>(null);
  const [res, setRes] = useState('');

  const comTarefa = new Set(tarefas.map((t) => t.n));
  const emRisco = RISK.reduce((a, r) => a + r.valor, 0);

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader eyebrow="Detecção automática · actualizado às 06:00" title="Retenção" actions={<Btn kind="outline" label="Avisos automáticos" onPress={() => go('avisos')} />} />
      <StatBand
        hero={{ label: 'Kz · Receita em risco', value: kn(emRisco), sub: `${RISK.length} membros com sinais de desistência` }}
        stats={[
          { value: '18', label: 'Renovam em 7 dias' },
          { value: '41', label: 'Sessões de PT por realizar' },
          { value: '72%', label: 'Renovação · Setembro' },
        ]}
      />
      <Split ratio={[1.5, 1]} minRight={340}>
        <Section title="Membros em risco" dot={c.bad}>
          <View>
            {RISK.map((r) => (
              <View key={r.id} style={{ paddingVertical: 16, borderTopWidth: 1, borderColor: c.line, gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                  <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
                    <T v="bodyStrong" size={15}>{r.n}</T>
                    <T v="small">{r.plano} · {r.f} · renova a {r.renov} · {kz(r.valor)}</T>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 2 }}>
                    <T v="num" size={24} color={r.score >= 80 ? c.bad : r.score >= 65 ? c.warn : c.ink}>{r.score}</T>
                    <T v="eyebrow" size={9}>Risco</T>
                  </View>
                </View>
                <View style={{ gap: 6 }}>
                  {r.signals.map((s) => (
                    <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <Dot color={c.brand} size={6} square />
                      <T size={13} color={c.ink2} style={{ flex: 1 }}>{s}</T>
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                  {comTarefa.has(r.n) ? (
                    <Status s="emcurso" label="Tarefa criada" />
                  ) : (
                    <Btn size="sm" label="Criar tarefa" haptic="press" onPress={() => setCriar(r)} />
                  )}
                  <Btn kind="outline" size="sm" label="Ver ficha" onPress={() => go('membro', { estado: 'normal', nome: r.n })} />
                </View>
              </View>
            ))}
          </View>
        </Section>
        <Section title="Tarefas da equipa" right={<T v="eyebrow">{tarefas.filter((t) => t.st !== 'feito').length} em curso</T>}>
          <View>
            {tarefas.map((t) => (
              <ListRow key={t.id} style={{ alignItems: 'flex-start' }}>
                <View style={{ flex: 1, gap: 4, minWidth: 0 }}>
                  <T v="bodyStrong">{t.t}</T>
                  <T v="small">{t.n} · {t.quem}</T>
                  {t.res ? <T size={13} color={c.ok}>{t.res}</T> : null}
                </View>
                <View style={{ alignItems: 'flex-end', gap: 8 }}>
                  <Status s={t.st} />
                  {t.st !== 'feito' ? <Btn kind="outline" size="sm" label="Resultado" onPress={() => { setRes(''); setFechar(t); }} /> : null}
                </View>
              </ListRow>
            ))}
          </View>
          <T v="small">O resultado fica na ficha do membro. O conhecimento pertence ao ginásio, não a quem atendeu.</T>
        </Section>
      </Split>

      <Sheet
        visible={!!criar}
        onClose={() => setCriar(null)}
        eyebrow="Nova tarefa"
        title={criar?.n}
        footer={
          <Btn
            full
            size="lg"
            label="Criar tarefa"
            haptic="press"
            onPress={() => {
              if (!criar) return;
              addTarefa({ id: 't' + Date.now(), n: criar.n, t: accao, quem, st: 'emcurso', res: '' });
              notify(`Tarefa atribuída a ${quem}`, 'ok');
              setCriar(null);
            }}
          />
        }
      >
        {criar ? (
          <>
            <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
              {criar.signals.map((s) => <Tag key={s}>{s}</Tag>)}
            </View>
            <View style={{ gap: 10 }}>
              <T v="eyebrow">O que fazer</T>
              <Chips options={ACCAO} value={accao} onChange={setAccao} />
            </View>
            <View style={{ gap: 10 }}>
              <T v="eyebrow">Responsável</T>
              <Chips options={QUEM} value={quem} onChange={setQuem} />
            </View>
            <T v="small">Telefone {criar.tel}. Prazo: antes da renovação a {criar.renov}.</T>
          </>
        ) : null}
      </Sheet>

      <Sheet
        visible={!!fechar}
        onClose={() => setFechar(null)}
        eyebrow={fechar ? `${fechar.n} · ${fechar.quem}` : ''}
        title="Registar resultado"
        footer={
          <Btn
            full
            size="lg"
            label="Guardar e resolver"
            haptic="success"
            disabled={!res.trim()}
            onPress={() => {
              if (!fechar) return;
              updTarefa(fechar.id, { st: 'feito', res: res.trim() });
              notify('Resultado guardado na ficha do membro', 'ok');
              setFechar(null);
            }}
          />
        }
      >
        <T size={14}>{fechar?.t}</T>
        <Area label="O que aconteceu" value={res} onChangeText={setRes} placeholder="Ex.: renovou por 3 meses; marcou PT para segunda" />
        {compact ? null : <T v="small">Fica visível para toda a equipa.</T>}
      </Sheet>
    </Page>
  );
}
