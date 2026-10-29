import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { MEMBRO } from '../../data/sample';
import { kn } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNotify } from '../../shell/notify';
import { Btn, LinkBtn, Sheet, Status, T, em } from '../../ui';
import { Big, Eyebrow, MHeader, MRow, MScreen, MSection, PAD } from '../parts';

/** M2 · Membro · Plano — próxima mensalidade, pagamentos e filiais. */
export function Plano() {
  const { c } = useTheme();
  const notify = useNotify();
  const [pay, setPay] = useState<'idle' | 'waiting' | 'ok' | 'failed'>('idle');
  const [paid, setPaid] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);

  const pagar = () => {
    haptic('press');
    setPay('waiting');
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => {
      setPay((s) => {
        if (s !== 'waiting') return s;
        haptic('success');
        return 'ok';
      });
    }, 2500);
  };

  const fechar = () => {
    if (pay === 'ok') {
      setPaid(true);
      notify('Pagamento recebido. Factura enviada por SMS.', 'ok');
    }
    if (t.current) clearTimeout(t.current);
    setPay('idle');
  };

  const pagamentos = paid ? [{ t: 'Novembro', d: 'Hoje · Express', v: MEMBRO.valor }, ...MEMBRO.pagamentos] : MEMBRO.pagamentos;

  return (
    <MScreen>
      <MHeader eyebrow={MEMBRO.plano} title="O meu plano" />
      <View style={{ backgroundColor: c.brand, padding: PAD, gap: 14 }}>
        <Eyebrow color="#1D1C1A">{paid ? 'Próxima mensalidade · 13 Dez' : `Próxima mensalidade · ${MEMBRO.prox}`}</Eyebrow>
        <Big size={40} color="#1D1C1A">{kn(MEMBRO.valor)}</Big>
        {paid ? (
          <T size={12} w={600} color="#1D1C1A" style={{ letterSpacing: em(12, 0.18), textTransform: 'uppercase', height: 48, lineHeight: 48 }}>
            Novembro pago · obrigado
          </T>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={pagar}
            style={(st: any) => ({ height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: st.pressed || st.hovered ? '#3A3732' : '#1D1C1A' })}
          >
            <T size={12} w={600} color="#FBFAF7" style={{ letterSpacing: em(12, 0.18), textTransform: 'uppercase' }}>
              Pagar com Multicaixa Express
            </T>
          </Pressable>
        )}
      </View>
      <View style={{ padding: PAD, gap: 10 }}>
        <MSection>Pagamentos</MSection>
        <View>
          {pagamentos.map((p) => (
            <MRow key={p.t}>
              <View style={{ gap: 2 }}>
                <T size={14} w={500}>{p.t}</T>
                <T size={12} color={c.muted}>{p.d}</T>
              </View>
              <T size={14} right>{kn(p.v)}</T>
            </MRow>
          ))}
        </View>
        <MSection style={{ paddingTop: 12 }}>Filiais</MSection>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {MEMBRO.filiais.map((f) => (
            <View key={f} style={{ paddingVertical: 6, paddingHorizontal: 10, backgroundColor: c.surface }}>
              <T size={11} w={600} style={{ letterSpacing: em(11, 0.12), textTransform: 'uppercase' }}>{f}</T>
            </View>
          ))}
        </View>
      </View>

      <Sheet visible={pay !== 'idle'} onClose={fechar} eyebrow="Multicaixa Express" title={pay === 'ok' ? 'Pagamento recebido' : pay === 'failed' ? 'Pagamento recusado' : 'Confirme no telemóvel'}>
        <Big size={40}>{kn(MEMBRO.valor)} Kz</Big>
        {pay === 'waiting' ? (
          <>
            <Status s="aguarda" label="À espera de confirmação" />
            <T size={14} color={c.ink2}>Enviámos um pedido para 923 456 789. Abra a app Multicaixa Express e confirme.</T>
            <LinkBtn label="Simular recusa" onPress={() => { if (t.current) clearTimeout(t.current); setPay('failed'); haptic('error'); }} />
          </>
        ) : null}
        {pay === 'ok' ? (
          <>
            <Status s="pago" />
            <T size={14} color={c.ink2}>Mensalidade de Novembro paga. Plano activo até 13 Dez.</T>
            <Btn full label="Concluir" onPress={fechar} />
          </>
        ) : null}
        {pay === 'failed' ? (
          <>
            <Status s="recusado" label="Não confirmado" />
            <T size={14} color={c.ink2}>Recusado ou sem saldo. Tente de novo ou pague por referência.</T>
            <Btn full label="Tentar de novo" onPress={pagar} haptic={false} />
          </>
        ) : null}
      </Sheet>
    </MScreen>
  );
}
