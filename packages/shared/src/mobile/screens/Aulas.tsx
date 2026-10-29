import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { AULAS, DIAS } from '../../data/sample';
import { haptic } from '../../lib/haptics';
import { useNotify } from '../../shell/notify';
import { T, em } from '../../ui';
import { MHeader, MScreen, PAD } from '../parts';

/** Membro · Aulas — reservar lugar numa aula da semana (mesma linguagem do M1/M2). */
export function Aulas() {
  const { c } = useTheme();
  const notify = useNotify();
  const reservas = useMuntu((s) => s.reservas);
  const toggle = useMuntu((s) => s.toggleReserva);
  const [dia, setDia] = useState<(typeof DIAS)[number]>('Qui 29');
  const list = AULAS.filter((a) => a.dia === dia);
  const n = Object.values(reservas).filter(Boolean).length;

  return (
    <MScreen>
      <MHeader eyebrow={`${n} ${n === 1 ? 'reserva' : 'reservas'} esta semana`} title="Aulas" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, borderBottomWidth: 1, borderColor: c.line }} contentContainerStyle={{ paddingHorizontal: PAD - 4 }}>
        {DIAS.map((d) => {
          const on = d === dia;
          const [wd, num] = d.split(' ');
          return (
            <Pressable
              key={d}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              onPress={() => { haptic('select'); setDia(d); }}
              style={{ width: 56, height: 64, alignItems: 'center', justifyContent: 'center', gap: 4 }}
            >
              <T size={20} w={300}>{num}</T>
              <T size={9} w={600} color={on ? c.ink : c.muted} style={{ letterSpacing: em(9, 0.18), textTransform: 'uppercase' }}>{wd}</T>
              {on ? <View style={{ position: 'absolute', left: 8, right: 8, bottom: 0, height: 3, backgroundColor: c.brand }} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={{ paddingHorizontal: PAD, paddingTop: 8 }}>
        {list.map((a) => {
          const res = !!reservas[a.id];
          const full = a.vagas === 0 && !res;
          return (
            <View key={a.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, borderTopWidth: 1, borderColor: c.line }}>
              <T size={20} w={300} numberOfLines={1} style={{ width: 66 }}>{a.h}</T>
              <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
                <T size={14} w={500} numberOfLines={1}>{a.n}</T>
                <T size={12} color={c.muted} numberOfLines={1}>{a.coach} · {a.f}</T>
                <T size={11} w={600} color={full ? c.bad : a.vagas <= 3 ? c.warn : c.ink2} style={{ letterSpacing: em(11, 0.12), textTransform: 'uppercase' }}>
                  {full ? 'Esgotada' : `${a.vagas} de ${a.total} vagas`}
                </T>
              </View>
              <Pressable
                accessibilityRole="button"
                disabled={full}
                onPress={() => {
                  haptic(res ? 'tap' : 'press');
                  toggle(a.id);
                  notify(res ? `Reserva de ${a.n} cancelada` : `${a.n} reservada · ${a.dia} às ${a.h}`, res ? 'info' : 'ok');
                }}
                style={{ height: 36, paddingHorizontal: 14, justifyContent: 'center', borderWidth: 1, borderColor: c.ink, backgroundColor: res ? c.invBg : 'transparent', opacity: full ? 0.35 : 1 }}
              >
                <T size={10} w={600} color={res ? c.invInk : c.ink} style={{ letterSpacing: em(10, 0.18), textTransform: 'uppercase' }}>
                  {res ? 'Reservada' : full ? 'Cheia' : 'Reservar'}
                </T>
              </Pressable>
            </View>
          );
        })}
        {!list.length ? (
          <View style={{ paddingVertical: 24, borderTopWidth: 1, borderColor: c.line }}>
            <T size={14} color={c.muted}>Sem aulas neste dia.</T>
          </View>
        ) : null}
      </View>
    </MScreen>
  );
}
