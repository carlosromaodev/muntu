import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { kn } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNotify } from '../../shell/notify';
import { Dot, HoldButton, Status, T, em } from '../../ui';
import { Big, Eyebrow, MHeader, MScreen, MSection, PAD } from '../parts';

/** O2 · Dono · Aprovações — segurar para aprovar, depois Face ID. */
export function Aprovacoes() {
  const { c } = useTheme();
  const notify = useNotify();
  const approvals = useMuntu((s) => s.approvals);
  const decide = useMuntu((s) => s.decide);
  const open = approvals.filter((a) => !a.status);
  const done = approvals.filter((a) => a.status);
  const [focusId, setFocusId] = useState<string | null>(null);
  const focus = open.find((a) => a.id === focusId) ?? open[0];
  const rest = open.filter((a) => a.id !== focus?.id);

  return (
    <MScreen>
      <MHeader eyebrow={open.length ? `${open.length} ${open.length === 1 ? 'pedido' : 'pedidos'} à espera` : 'Nada à espera'} title="Aprovações" />
      {focus ? (
        <View style={{ backgroundColor: c.surface, padding: PAD, gap: 14 }}>
          <Eyebrow color={c.ink}>{focus.k}</Eyebrow>
          <Big size={36}>{kn(focus.v)}</Big>
          <T size={14} style={{ lineHeight: 20 }}>{focus.t}</T>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                haptic('error');
                decide(focus.id, 'recusado');
                notify('Pedido recusado. A recepção foi avisada.', 'bad');
              }}
              style={(st: any) => ({ flex: 1, height: 48, borderWidth: 1, borderColor: c.ink, alignItems: 'center', justifyContent: 'center', backgroundColor: st.pressed ? c.line2 : 'transparent' })}
            >
              <T size={11} w={600} style={{ letterSpacing: em(11, 0.18), textTransform: 'uppercase' }}>Recusar</T>
            </Pressable>
            <HoldButton
              key={focus.id}
              height={48}
              label="Aprovar · Face ID"
              reason="Aprovar pedido"
              onConfirm={() => {
                decide(focus.id, 'aprovado');
                notify('Aprovado com biometria. Registado na trilha.', 'ok');
              }}
              style={{ flex: 1 }}
            />
          </View>
          <T size={11} color={c.ink2}>Segure até a barra encher. Soltar antes cancela.</T>
        </View>
      ) : (
        <View style={{ padding: PAD, gap: 10, backgroundColor: c.surface }}>
          <Status s="aprovado" label="Tudo em dia" />
          <T size={14} color={c.ink2}>Não há pedidos à espera. Os novos chegam por SMS e aparecem aqui.</T>
        </View>
      )}
      <View style={{ paddingTop: 8, paddingHorizontal: PAD, paddingBottom: PAD }}>
        {rest.map((p) => (
          <Pressable
            key={p.id}
            accessibilityRole="button"
            accessibilityHint="Abrir este pedido"
            onPress={() => {
              haptic('select');
              setFocusId(p.id);
            }}
            style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 16, borderTopWidth: 1, borderColor: c.line }}
          >
            <View style={{ flex: 1, gap: 3 }}>
              <T size={10} w={600} color={c.muted} style={{ letterSpacing: em(10, 0.2), textTransform: 'uppercase' }}>{p.k}</T>
              <T size={14}>{p.s ?? p.t.split('.')[0]}</T>
            </View>
            <T size={14} w={500} style={{ flexShrink: 0 }}>{kn(p.v)}</T>
          </Pressable>
        ))}
        {done.length ? (
          <View style={{ paddingTop: 16 }}>
            <MSection style={{ paddingBottom: 10 }}>Decididos hoje</MSection>
            {done.map((p) => (
              <View key={p.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: 1, borderColor: c.line }}>
                <View style={{ flex: 1, gap: 3 }}>
                  <T size={10} w={600} color={c.muted} style={{ letterSpacing: em(10, 0.2), textTransform: 'uppercase' }}>{p.k}</T>
                  <T size={14} w={500}>{kn(p.v)}</T>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Dot color={p.status === 'aprovado' ? c.ok : c.bad} />
                  <T size={11} w={600} color={p.status === 'aprovado' ? c.ok : c.bad} style={{ letterSpacing: em(11, 0.14), textTransform: 'uppercase' }}>
                    {p.status === 'aprovado' ? 'Aprovado' : 'Recusado'}
                  </T>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </MScreen>
  );
}
