import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { MEMBRO } from '../../data/sample';
import { kn } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Btn, LinkBtn, ListRow, Page, Section, Sheet, Status, T, Tag } from '../../ui';

export function Plano() {
  const { c, g, compact } = useTheme();
  const { bottomInset } = useNav();
  const notify = useNotify();
  const [pay, setPay] = useState<'idle' | 'waiting' | 'ok' | 'failed'>('idle');
  const [paid, setPaid] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);

  const pagar = () => {
    haptic('press');
    setPay('waiting');
    t.current = setTimeout(() => {
      setPay((s) => (s === 'waiting' ? 'ok' : s));
      haptic('success');
    }, 2500);
  };

  return (
    <Page bottomInset={bottomInset}>
      <View style={{ maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <View style={{ paddingHorizontal: g, paddingTop: compact ? 16 : 40, paddingBottom: 24, gap: 6, borderBottomWidth: 1, borderColor: c.line }}>
          <T v="eyebrow">{MEMBRO.plano}</T>
          <T v="display" size={compact ? 30 : 40}>O meu plano</T>
        </View>
        <View style={{ backgroundColor: c.brand, padding: g, paddingVertical: 24, gap: 14 }}>
          <T v="eyebrow" color="#1D1C1A">{paid ? 'Próxima mensalidade · 13 Dez' : `Próxima mensalidade · ${MEMBRO.prox}`}</T>
          <T v="num" size={40} color="#1D1C1A">{kn(MEMBRO.valor)}</T>
          {paid ? (
            <T v="label" color="#1D1C1A">Novembro pago · obrigado</T>
          ) : (
            <Btn kind="onBrand" size="lg" full label="Pagar com Multicaixa Express" haptic={false} onPress={pagar} />
          )}
        </View>
        <Section title="Pagamentos">
          <View>
            {paid ? (
              <ListRow>
                <View style={{ flex: 1, gap: 2 }}>
                  <T v="bodyStrong">Novembro</T>
                  <T v="small">Agora · Express</T>
                </View>
                <T>{kn(MEMBRO.valor)}</T>
              </ListRow>
            ) : null}
            {MEMBRO.pagamentos.map((p) => (
              <ListRow key={p.t}>
                <View style={{ flex: 1, gap: 2 }}>
                  <T v="bodyStrong">{p.t}</T>
                  <T v="small">{p.d}</T>
                </View>
                <T>{kn(p.v)}</T>
              </ListRow>
            ))}
          </View>
        </Section>
        <Section title="Filiais" style={{ paddingTop: 0 }}>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            {MEMBRO.filiais.map((f) => <Tag key={f}>{f}</Tag>)}
          </View>
        </Section>
      </View>
      <Sheet
        visible={pay !== 'idle'}
        onClose={() => {
          if (pay === 'ok') {
            setPaid(true);
            notify('Pagamento recebido. Factura enviada por SMS.', 'ok');
          }
          if (t.current) clearTimeout(t.current);
          setPay('idle');
        }}
        eyebrow="Multicaixa Express"
        title={pay === 'ok' ? 'Pagamento recebido' : pay === 'failed' ? 'Pagamento recusado' : 'Confirme no telemóvel'}
      >
        <T v="num" size={40}>{kn(MEMBRO.valor)} Kz</T>
        {pay === 'waiting' ? (
          <>
            <Status s="aguarda" label="À espera de confirmação" />
            <T size={14} color={c.ink2}>Enviámos um pedido para 923 456 789. Abra a app Multicaixa Express e confirme.</T>
            <LinkBtn label="Simular recusa" onPress={() => { if (t.current) clearTimeout(t.current); setPay('failed'); haptic('error'); }} />
          </>
        ) : null}
        {pay === 'ok' ? (
          <>
            <Status s="pago" label="Pago" />
            <T size={14} color={c.ink2}>Mensalidade de Novembro paga. Plano activo até 13 Dez.</T>
          </>
        ) : null}
        {pay === 'failed' ? (
          <>
            <Status s="recusado" label="Não confirmado" />
            <T size={14} color={c.ink2}>Recusado ou sem saldo. Pode tentar de novo ou pagar por referência.</T>
            <Btn label="Tentar de novo" onPress={pagar} haptic={false} />
          </>
        ) : null}
      </Sheet>
    </Page>
  );
}
