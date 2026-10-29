import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { kz } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Btn, HoldButton, ListRow, Page, PageHeader, Section, Split, Status, T } from '../../ui';

const KIND_LABEL = { estorno: 'Estorno', caixa: 'Diferença de caixa', preco: 'Mudança de preço', retro: 'Data passada', turno: 'Passagem de turno' } as const;

export function Aprovacoes() {
  const { c, g, compact } = useTheme();
  const { bottomInset } = useNav();
  const notify = useNotify();
  const approvals = useMuntu((s) => s.approvals);
  const decide = useMuntu((s) => s.decide);
  const open = approvals.filter((a) => !a.status);
  const done = approvals.filter((a) => a.status);
  const [focusId, setFocusId] = useState<string | null>(null);
  const focus = open.find((a) => a.id === focusId) ?? open[0];

  const recusar = (id: string) => {
    decide(id, 'recusado');
    notify('Pedido recusado. A recepção foi avisada.', 'bad');
  };
  const aprovar = (id: string) => {
    decide(id, 'aprovado');
    notify('Aprovado com biometria. Registado na trilha.', 'ok');
  };

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader eyebrow={open.length ? `${open.length} ${open.length === 1 ? 'pedido' : 'pedidos'} à espera` : 'Nada à espera'} title="Aprovações" />
      <Split ratio={[1.2, 1]} minRight={340} style={{ borderTopWidth: 1, borderColor: c.line }}>
        <View>
          {focus ? (
            <View style={{ backgroundColor: c.surface, padding: g, paddingVertical: compact ? 24 : 32, gap: 14 }}>
              <T v="eyebrow" color={c.ink}>{focus.k}</T>
              <T v="num" size={compact ? 36 : 48}>{kz(focus.v)}</T>
              <T size={15} style={{ lineHeight: 22, maxWidth: 560 }}>{focus.t}</T>
              <T v="small">{KIND_LABEL[focus.kind]} · não se desfaz depois de aprovado. O original mantém-se no livro razão.</T>
              <View style={{ flexDirection: compact ? 'column' : 'row', gap: 8, paddingTop: 6, maxWidth: 560 }}>
                <Btn kind="outline" label="Recusar" haptic="error" onPress={() => recusar(focus.id)} style={{ flex: compact ? undefined : 1, height: 52, alignSelf: 'stretch' }} />
                <HoldButton key={focus.id} label="Segurar para aprovar" reason={`Aprovar ${KIND_LABEL[focus.kind].toLowerCase()}`} onConfirm={() => aprovar(focus.id)} style={{ flex: compact ? undefined : 1.4 }} />
              </View>
            </View>
          ) : (
            <View style={{ padding: g, paddingVertical: 40, gap: 8 }}>
              <Status s="aprovado" label="Tudo em dia" />
              <T size={15} color={c.ink2}>Não há pedidos à espera. Os novos chegam por SMS e aparecem aqui.</T>
            </View>
          )}
          {open.length > 1 ? (
            <Section title="Também à espera">
              <View>
                {open
                  .filter((a) => a.id !== focus?.id)
                  .map((a) => (
                    <Pressable key={a.id} accessibilityRole="button" onPress={() => { haptic('select'); setFocusId(a.id); }}>
                      {(st: any) => (
                        <ListRow style={{ backgroundColor: st.hovered ? c.surface2 : 'transparent' }}>
                          <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
                            <T v="eyebrow">{a.k}</T>
                            <T size={14} numberOfLines={2}>{a.t}</T>
                          </View>
                          <T v="bodyStrong" style={{ flexShrink: 0 }}>{kz(a.v)}</T>
                          {!compact ? <T v="label" size={10}>Rever →</T> : null}
                        </ListRow>
                      )}
                    </Pressable>
                  ))}
              </View>
            </Section>
          ) : null}
        </View>
        <Section title="Decididos hoje">
          <View>
            {done.map((a) => (
              <ListRow key={a.id} style={{ alignItems: 'flex-start' }}>
                <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
                  <T v="eyebrow">{a.k}</T>
                  <T size={14} numberOfLines={2}>{a.t}</T>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <T v="bodyStrong">{kz(a.v)}</T>
                  <Status s={a.status!} />
                </View>
              </ListRow>
            ))}
            {!done.length ? <ListRow><T v="small" size={14}>Ainda nenhuma decisão hoje.</T></ListRow> : null}
          </View>
          <T v="small">Cada decisão pede Face ID ou impressão digital e fica na trilha de auditoria.</T>
        </Section>
      </Split>
    </Page>
  );
}
