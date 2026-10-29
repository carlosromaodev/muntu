import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { CLIENTE_BI, PAY_METHODS, PLANS, RULES, SAMPLE_VARS } from '../../data/sample';
import { fill, kn, mmss } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/notify';
import { Btn, Chips, Cols, Field, LinkBtn, Note, OptionRow, Page, PageHeader, QR, Status, Steps, T } from '../../ui';

type PayState = 'idle' | 'waiting' | 'failed' | 'ok';

export function Inscricao() {
  const { c, g, compact, bp } = useTheme();
  const { go } = useNav();
  const notify = useNotify();
  const [step, setStep] = useState(0);
  const [secs, setSecs] = useState(0);
  const [plan, setPlan] = useState('rede');
  const [pay, setPay] = useState('express');
  const [payState, setPayState] = useState<PayState>('idle');
  const [sendCh, setSendCh] = useState<'SMS' | 'WhatsApp'>('SMS');
  const [sent, setSent] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sent) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [sent]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const p = PLANS.find((x) => x.id === plan)!;
  const cobrar = () => {
    haptic('press');
    setPayState('waiting');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPayState((s) => {
        if (s !== 'waiting') return s;
        haptic('success');
        setStep(3);
        return 'ok';
      });
    }, 3000);
  };
  const falhar = () => {
    if (timer.current) clearTimeout(timer.current);
    setPayState('failed');
    notify('Pagamento não confirmado', 'bad');
  };
  const nextDisabled = step === 2 && payState !== 'ok';
  const welcome = fill(RULES[0].tpl, { ...SAMPLE_VARS, data: '26/11' });

  return (
    <Page>
      <PageHeader
        eyebrow="Talatona · Uma tarefa, um ecrã"
        title="Nova inscrição"
        actions={
          <View style={{ alignItems: compact ? 'flex-start' : 'flex-end', gap: 6 }}>
            <T v="num" size={compact ? 32 : 40}>{mmss(secs)}</T>
            <T v="eyebrow">Meta 03:00</T>
          </View>
        }
      />
      <View style={{ paddingHorizontal: g, paddingBottom: compact ? 20 : 32 }}>
        <Steps labels={['Cliente', 'Plano', 'Pagamento', 'Acesso']} current={step} />
      </View>
      <View style={{ padding: g, paddingVertical: compact ? 24 : 40, borderTopWidth: 1, borderColor: c.line, minHeight: compact ? 0 : 440 }}>
        {step === 0 ? (
          <Cols cols={{ compact: 1, medium: 2, wide: 2 }} divide={false}>
            <View style={{ paddingRight: compact ? 0 : 24, paddingBottom: compact ? 24 : 0 }}>
              <View style={{ backgroundColor: '#1D1C1A', minHeight: compact ? 200 : 300, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
                <View style={{ width: '72%', aspectRatio: 1.58, borderWidth: 2, borderColor: c.brand, justifyContent: 'flex-end', padding: 12 }}>
                  <T v="eyebrow" color="#E68A3A">Bilhete de identidade</T>
                </View>
                <T size={13} color="#D9D4C4">BI lido pela câmara</T>
              </View>
            </View>
            <View style={{ paddingLeft: compact ? 0 : 24, gap: 18 }}>
              <T v="eyebrow" color={c.ok}>Preenchido a partir do BI · confirme</T>
              {CLIENTE_BI.map((f) => (
                <Field key={f.l} label={f.l} value={f.v} editable={false} big />
              ))}
            </View>
          </Cols>
        ) : null}

        {step === 1 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderLeftWidth: 1, borderColor: c.line }}>
            {PLANS.map((x) => {
              const on = plan === x.id;
              const cols = bp === 'wide' ? 4 : 2;
              return (
                <Pressable
                  key={x.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on, disabled: !!x.disabled }}
                  disabled={!!x.disabled}
                  onPress={() => { haptic('select'); setPlan(x.id); }}
                  style={{
                    width: `${100 / cols}%` as any,
                    minHeight: compact ? 190 : 240,
                    padding: compact ? 16 : 24,
                    gap: 10,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: c.line,
                    backgroundColor: on ? c.card : c.bg,
                    opacity: x.disabled ? 0.5 : 1,
                  }}
                >
                  {on ? <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 6, backgroundColor: c.brand }} /> : null}
                  {on ? <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderWidth: 2, borderColor: c.ink }} /> : null}
                  <T v="eyebrow">{x.scope}</T>
                  <T v="title" size={compact ? 18 : 22}>{x.n}</T>
                  <T size={13} color={c.ink2}>{x.d}</T>
                  <View style={{ flex: 1 }} />
                  <T v="num" size={compact ? 18 : 22}>{(x.p ? kn(x.p) : '0,00') + ' Kz'}</T>
                  {x.note ? <T size={12} color={c.bad}>{x.note}</T> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {step === 2 ? (
          <Cols cols={{ compact: 1, medium: 2, wide: 2 }} divide={false}>
            <View style={{ paddingRight: compact ? 0 : 24, paddingBottom: compact ? 24 : 0 }}>
              <T v="eyebrow" style={{ paddingBottom: 12 }}>Meio de pagamento</T>
              {PAY_METHODS.map((m) => (
                <OptionRow key={m.id} label={m.l} sub={m.d} selected={pay === m.id} onPress={() => { setPay(m.id); setPayState('idle'); }} />
              ))}
            </View>
            <View style={{ marginLeft: compact ? 0 : 24, backgroundColor: c.brand, padding: compact ? 24 : 32, gap: 16 }}>
              <T v="eyebrow" color="#1D1C1A">Kz · A cobrar · {p.n}</T>
              <T v="num" size={compact ? 40 : 52} color="#1D1C1A">{kn(p.p)}</T>
              <T size={13} color="#1D1C1A">A subscrição só fica activa com o pagamento confirmado.</T>
              {payState === 'idle' ? <Btn kind="onBrand" label="Cobrar agora" onPress={cobrar} haptic={false} /> : null}
              {payState === 'waiting' ? (
                <View accessibilityRole="alert" style={{ backgroundColor: c.bg, padding: 16, gap: 8 }}>
                  <T v="section" color={c.warn}>À espera do Multicaixa Express</T>
                  <T size={13} color={c.ink2}>Pedido enviado para 923 456 789. O cliente confirma no telemóvel.</T>
                  <LinkBtn label="Simular falha" onPress={falhar} />
                </View>
              ) : null}
              {payState === 'failed' ? (
                <View accessibilityRole="alert" style={{ backgroundColor: c.bg, padding: 16, gap: 10 }}>
                  <T v="section" color={c.bad}>Pagamento não confirmado</T>
                  <T size={13} color={c.ink2}>O cliente recusou ou não tinha saldo. Tente de novo ou troque o meio.</T>
                  <Btn size="sm" label="Tentar de novo" onPress={cobrar} haptic={false} />
                </View>
              ) : null}
            </View>
          </Cols>
        ) : null}

        {step === 3 ? (
          <View style={{ flexDirection: compact ? 'column' : 'row', gap: compact ? 24 : 48, alignItems: compact ? 'stretch' : 'flex-start' }}>
            <QR size={compact ? 168 : 189} />
            <View style={{ flex: 1, gap: 16, maxWidth: 560 }}>
              <Status s="ativo" label="Pago e activo" />
              <T v="title" size={compact ? 24 : 32}>Kátia Muondo</T>
              <T size={14} color={c.ink2}>{p.n} · {kn(p.p)} Kz · Factura AGT FR TAL/2026/1202</T>
              <View style={{ gap: 10, borderTopWidth: 1, borderColor: c.line, paddingTop: 16 }}>
                <T v="eyebrow">Enviar acesso por</T>
                <Chips options={['SMS', 'WhatsApp'] as const} value={sendCh} onChange={setSendCh} />
                <Note>{welcome}</Note>
              </View>
              {!sent ? (
                <Btn label="Enviar QR e factura" haptic="press" onPress={() => { setSent(true); notify(`Acesso enviado por ${sendCh}`, 'ok'); }} />
              ) : (
                <T size={14} color={c.ok} accessibilityRole="alert">
                  Enviado por {sendCh} para 923 456 789. Inscrição feita em {mmss(secs)}.
                </T>
              )}
            </View>
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16, paddingHorizontal: g, paddingVertical: 24, borderTopWidth: 1, borderColor: c.line }}>
        <Btn
          kind="outline"
          label={step === 0 ? 'Cancelar' : 'Voltar'}
          onPress={() => {
            if (step === 0) go('recepcao');
            else {
              setStep(step - 1);
              setPayState('idle');
            }
          }}
        />
        <Btn
          label={['Confirmar dados', 'Continuar', 'Continuar', 'Concluir'][step]!}
          disabled={nextDisabled}
          onPress={() => {
            if (step === 3) {
              notify('Inscrição concluída', 'ok');
              go('recepcao');
            } else setStep(step + 1);
          }}
        />
      </View>
    </Page>
  );
}
