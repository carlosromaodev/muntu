import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { INCIDENT_STEPS, INCIDENT_TYPES, INCIDENT_ZONES, INCIDENTS_SEED, ROLE_INFO } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { canPickImage, pickImage } from '../../lib/pickImage';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { M, Button, Field, Note, Press, Segmented, Select, TextArea, Toggle, Txt, useToast } from '../../ui';
import { Footer, Section, StackScreen } from '../Layout';

type Urg = 'baixa' | 'media' | 'alta';
const TO = ['Manutenção', 'Gestão', 'Recepção'] as const;
const WHO: Record<string, string> = { rececao: 'Celma Bento', financas: 'Jorge Afonso', pt: 'Nuno Sebastião', dono: 'Paulo Neto' };

/** Chips de escolha única (tipo, encaminhar para). */
function Pick<T extends string>({ options, value, onPick, danger }: { options: readonly T[]; value: T | ''; onPick: (v: T) => void; danger?: T }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
      {options.map((o) => {
        const on = value === o;
        const bg = on ? (o === danger ? C.bad : C.ink) : 'transparent';
        return (
          <Press key={o} feedback="select" onPress={() => onPick(o)} accessibilityState={{ selected: on }} style={{ height: 36, paddingHorizontal: 12, justifyContent: 'center', borderWidth: 1, borderColor: on ? bg : C.lineStrong, backgroundColor: bg }}>
            <Txt style={[type(10, 600, 0.12, true), { color: on ? C.paper : C.ink }]}>{o}</Txt>
          </Press>
        );
      })}
    </View>
  );
}

function SwitchRow({ label, sub, on, onChange, color }: { label: string; sub: string; on: boolean; onChange: () => void; color?: string }) {
  return (
    <Press feedback="select" scaleTo={1} accessibilityRole="switch" accessibilityState={{ checked: on }} onPress={onChange} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.line }}>
      <View style={{ flex: 1, gap: 2 }}>
        <Txt v="body">{label}</Txt>
        <Txt v="small" c={C.muted}>
          {sub}
        </Txt>
      </View>
      <Toggle on={on} onChange={onChange} color={color} />
    </Press>
  );
}

/** e4 · Ocorrência: membros reportam problemas; a equipa regista o que acontece no turno. */
export function Ocorrencia() {
  const router = useRouter();
  const toast = useToast();
  const role = useMuntu((s) => s.role) ?? 'membro';
  const isM = role === 'membro';
  const who = isM ? 'm' : 's';
  const mine = useMuntu((s) => s.incidents[who]);
  const total = useMuntu((s) => s.incidents.m.length + s.incidents.s.length);
  const addIncident = useMuntu((s) => s.addIncident);
  const list = [...mine, ...INCIDENTS_SEED[who]];

  const [tab, setTab] = useState<'new' | 'list'>('new');
  const [t, setT] = useState('');
  const [zone, setZone] = useState('');
  const [eq, setEq] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState('');
  const [hurt, setHurt] = useState(false);
  const [anon, setAnon] = useState(false);
  const [urg, setUrg] = useState<Urg>('media');
  const [to, setTo] = useState<(typeof TO)[number]>('Manutenção');
  const [err, setErr] = useState('');
  const [done, setDone] = useState<{ id: string; t: string; z: string; alta: boolean } | null>(null);

  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };
  const send = () => {
    if (!t) return fail('Escolhe o tipo de ocorrência.');
    if (!zone) return fail('Indica onde aconteceu.');
    if (desc.trim().length < 10) return fail('Descreve o que aconteceu em pelo menos 10 caracteres.');
    const id = `OC-0${142 + total}`;
    const title = `${t}${eq ? ` · ${eq}` : ''} · ${desc.trim().slice(0, 40)}`;
    addIncident(who, [id, title, `${zone} · agora`, 0]);
    haptic('success');
    setDone({ id, t: title, z: zone, alta: (!isM && urg === 'alta') || hurt });
    setT('');
    setZone('');
    setEq('');
    setDesc('');
    setPhoto('');
    setHurt(false);
    setErr('');
  };
  const addPhoto = async () => {
    if (!canPickImage) return toast('Anexar fotos fica disponível na próxima versão da app.', 'info');
    const r = await pickImage('image/*', 5 * 1024 * 1024);
    if (r === 'too-big') return toast('A foto tem mais de 5 MB.', 'bad');
    if (r) setPhoto(r);
  };
  const msg = done ? (done.alta ? 'Marcada como urgente. A recepção e o gestor foram avisados agora.' : isM ? 'A equipa responde em até 24 horas. Recebes um SMS quando houver novidades.' : `Encaminhada a ${to}. Fica nas pendências até ser resolvida.`) : '';

  const form = tab === 'new' && !done;
  return (
    <StackScreen
      back={isM ? 'Conta' : 'Avisos'}
      eyebrow={isM ? 'Algo não está bem no ginásio?' : `Registo do turno · ${WHO[role] ?? ROLE_INFO[role].name}`}
      title="Ocorrência"
      headerInner={
        <Segmented
          style={{ marginTop: 8 }}
          value={tab}
          onChange={(v) => (setTab(v), setDone(null))}
          options={[
            { v: 'new', l: 'Nova' },
            { v: 'list', l: `Acompanhar · ${list.length}` },
          ]}
        />
      }
      footer={form ? <Footer label="Enviar ocorrência" onPress={send} /> : undefined}
    >
      {form ? (
        <View style={{ paddingHorizontal: GUTTER, paddingTop: 18, gap: 22 }}>
          <View style={{ gap: 10 }}>
            <Txt v="eyebrow" c={C.muted}>
              Tipo
            </Txt>
            <Pick options={INCIDENT_TYPES[who]} value={t} onPick={(v) => (setT(v), setErr(''))} />
          </View>
          <Select label="Onde aconteceu" title="Onde aconteceu" placeholder="Escolher zona" big value={zone} onChange={(v) => (setZone(v), setErr(''))} options={INCIDENT_ZONES.map((z) => ({ v: z, l: z }))} />
          {t === 'Equipamento' ? (
            <Animated.View entering={M.enter()}>
              <Field label="Qual equipamento" big value={eq} onChangeText={setEq} placeholder="Ex. Passadeira 4" />
            </Animated.View>
          ) : null}
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Txt v="eyebrow" c={C.muted}>
                O que aconteceu
              </Txt>
              <Txt style={[type(10, 400), { color: C.muted }]}>{desc.length} / 400</Txt>
            </View>
            <TextArea value={desc} onChangeText={(x) => (setDesc(x.slice(0, 400)), setErr(''))} maxLength={400} placeholder="Descreve o problema com o máximo de detalhe" accessibilityLabel="O que aconteceu" />
          </View>
          <View style={{ gap: 10 }}>
            <Txt v="eyebrow" c={C.muted}>
              Foto · opcional
            </Txt>
            {photo ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Image source={{ uri: photo }} style={{ width: 64, height: 64 }} resizeMode="cover" accessibilityLabel="Foto anexada" />
                <Txt v="small" style={{ flex: 1 }}>
                  Foto anexada
                </Txt>
                <Button label="Remover" kind="outline" size="sm" onPress={() => setPhoto('')} />
              </View>
            ) : (
              <Press feedback="select" scaleTo={0.99} onPress={addPhoto} style={({ hovered }) => ({ height: 64, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderStyle: 'dashed', borderColor: hovered ? C.ink : C.faint, backgroundColor: '#fff' })}>
                <Txt style={type(14, 500)}>Tirar ou escolher foto</Txt>
              </Press>
            )}
          </View>
          {isM ? (
            <View>
              <SwitchRow label="Alguém se magoou?" sub="Marca para avisar a recepção de imediato" on={hurt} onChange={() => setHurt(!hurt)} color={C.bad} />
              <SwitchRow label="Enviar sem o meu nome" sub="A equipa não vê quem reportou" on={anon} onChange={() => setAnon(!anon)} />
            </View>
          ) : (
            <View style={{ gap: 18 }}>
              <View style={{ gap: 10 }}>
                <Txt v="eyebrow" c={C.muted}>
                  Urgência
                </Txt>
                <View style={{ flexDirection: 'row', gap: 4, padding: 4, backgroundColor: C.sand }}>
                  {(
                    [
                      ['baixa', 'Baixa'],
                      ['media', 'Média'],
                      ['alta', 'Alta'],
                    ] as const
                  ).map(([k, l]) => {
                    const on = urg === k;
                    return (
                      <Press key={k} feedback="select" scaleTo={1} onPress={() => setUrg(k)} accessibilityState={{ selected: on }} style={{ flex: 1, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? (k === 'alta' ? C.bad : C.ink) : 'transparent' }}>
                        <Txt style={[type(10, 600, 0.16, true), { color: on ? C.paper : C.ink }]}>{l}</Txt>
                      </Press>
                    );
                  })}
                </View>
                {urg === 'alta' ? (
                  <Txt v="small" c={C.bad}>
                    Alta urgência avisa a recepção e o gestor de imediato.
                  </Txt>
                ) : null}
              </View>
              <View style={{ gap: 10 }}>
                <Txt v="eyebrow" c={C.muted}>
                  Encaminhar para
                </Txt>
                <Pick options={TO} value={to} onPick={setTo} />
              </View>
            </View>
          )}
          {err ? <Note tone="bad" text={err} /> : null}
          <View style={{ height: 8 }} />
        </View>
      ) : tab === 'new' && done ? (
        <View style={{ paddingHorizontal: GUTTER, paddingTop: 28, gap: 18 }}>
          <Animated.View entering={M.pop()} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} accessibilityRole="alert">
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: C.ok }} />
            <Txt style={[type(13, 600), { color: C.ok }]}>Ocorrência enviada</Txt>
          </Animated.View>
          <Txt style={[type(44, 300), { lineHeight: 46 }]}>{done.id}</Txt>
          <Txt style={[type(15, 400), { lineHeight: 21 }]}>{done.t}</Txt>
          <Txt v="small" c={C.muted}>
            {done.z}
          </Txt>
          <View style={{ padding: 16, backgroundColor: C.sand }}>
            <Txt style={[type(14, 400), { lineHeight: 21 }]}>{msg}</Txt>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, paddingTop: 12 }}>
            <Button label="Reportar outra" kind="outline" style={{ flex: 1 }} onPress={() => setDone(null)} />
            <Button label="Acompanhar" style={{ flex: 1 }} onPress={() => (setTab('list'), setDone(null))} />
          </View>
          {isM ? null : <Button label="Voltar aos avisos" kind="ghost" onPress={() => router.back()} />}
        </View>
      ) : (
        <Section first>
          {list.map(([id, title, w, st], i) => (
            <Animated.View key={id} entering={M.enter(i * 20)} style={{ paddingVertical: 16, gap: 10, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Txt tabular style={[type(12, 400), { color: C.muted }]}>
                  {id}
                </Txt>
                {(() => {
                  const s = Math.min(st, 2);
                  const [fg, bg] = s === 2 ? [C.ok, C.okBg] : s === 1 ? [C.warn, C.warnBg] : [C.ink, C.sand];
                  return (
                    <View style={{ paddingVertical: 3, paddingHorizontal: 7, backgroundColor: bg }}>
                      <Txt style={[type(9, 600, 0.12, true), { color: fg }]}>{INCIDENT_STEPS[s]}</Txt>
                    </View>
                  );
                })()}
              </View>
              <Txt style={[type(15, 500), { lineHeight: 20 }]}>{title}</Txt>
              <Txt v="small" c={C.muted}>
                {w}
              </Txt>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {INCIDENT_STEPS.map((l, k) => (
                  <View key={l} style={{ flex: 1, gap: 5 }}>
                    <View style={{ height: 3, backgroundColor: k <= st ? C.ink : C.lineStrong }} />
                    <Txt style={[type(10, 400), { color: k <= st ? C.ink : C.faint }]}>{l}</Txt>
                  </View>
                ))}
              </View>
            </Animated.View>
          ))}
        </Section>
      )}
    </StackScreen>
  );
}
