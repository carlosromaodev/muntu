import React, { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { fonts, useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { CAIXA_ESPERADO, CAIXA_MEIOS } from '../../data/sample';
import { kn, kz, nowHM, parseKz } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Area, Btn, Dot, HoldButton, Page, PageHeader, StatBand, T } from '../../ui';

type Stage = 'count' | 'revealed' | 'pending' | 'closed';

export function Caixa() {
  const { c, g, compact } = useTheme();
  const { go, bottomInset } = useNav();
  const notify = useNotify();
  const setCaixa = useMuntu((s) => s.setCaixa);
  const addApproval = useMuntu((s) => s.addApproval);
  const [counts, setCounts] = useState<Record<string, string>>({ dinheiro: '86 000', express: '64 500', tpa: '22 000', transf: '10 000' });
  const [stage, setStage] = useState<Stage>('count');
  const [just, setJust] = useState('');
  const [closedAt, setClosedAt] = useState('');

  const revealed = stage !== 'count';
  let tc = 0;
  let te = 0;
  const rows = CAIXA_MEIOS.map((m) => {
    const ct = parseKz(counts[m.k] ?? '');
    const e = CAIXA_ESPERADO[m.k];
    tc += ct;
    te += e;
    return { ...m, ct, e, d: ct - e };
  });
  const td = tc - te;

  const reveal = () => {
    const at = nowHM();
    setClosedAt(at);
    if (td === 0) {
      setStage('closed');
      setCaixa(false);
      notify('Caixa certo. Fechado às ' + at, 'ok');
    } else {
      setStage('revealed');
      haptic('warning');
    }
  };

  const heroBg = !revealed ? c.surface : td === 0 ? c.okBg : c.brand;
  const heroFg = !revealed || td === 0 ? c.ink : '#1D1C1A';
  const colW = compact ? undefined : 1;

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader eyebrow="Talatona · Turno da manhã · Celma Bento" title="Fecho de caixa" actions={<Btn kind="outline" label="Passagem de turno" onPress={() => go('turno')} />} />
      <StatBand
        hero={{
          label: 'Kz · Diferença',
          bg: heroBg,
          fg: heroFg,
          value: revealed ? kn(td) : '••••',
          sub: <T v="label" color={heroFg}>{revealed ? (td === 0 ? 'Caixa certo' : 'Precisa de justificação') : 'Oculta até fechar'}</T>,
        }}
        stats={[
          { value: kn(tc), label: 'Kz · Contado' },
          { value: '23', label: 'Movimentos' },
          { value: '07:00–14:00', label: 'Turno' },
        ]}
      />
      <View style={{ paddingHorizontal: g, paddingVertical: compact ? 24 : 32, gap: 24, maxWidth: 1000 }}>
        <T size={15} color={c.ink2} style={{ maxWidth: 620 }}>
          {revealed ? 'O valor esperado só aparece depois da contagem. Diferenças precisam de justificação e vão para aprovação do dono.' : 'Conte o caixa sem ver o valor esperado. Só depois de fechar vê a diferença.'}
        </T>
        <View>
          {!compact ? (
            <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 10 }}>
              <T v="eyebrow" style={{ flex: 1.3 }}>Meio</T>
              <T v="eyebrow" style={{ flex: 1 }}>Contado (Kz)</T>
              <T v="eyebrow" style={{ flex: 1 }}>{revealed ? 'Esperado' : 'Esperado · oculto'}</T>
              <T v="eyebrow" style={{ flex: 1 }} right>{revealed ? 'Diferença' : ''}</T>
            </View>
          ) : null}
          {rows.map((r) => (
            <View key={r.k} style={{ flexDirection: compact ? 'column' : 'row', gap: compact ? 8 : 16, alignItems: compact ? 'stretch' : 'center', paddingVertical: compact ? 14 : 10, borderTopWidth: 1, borderColor: c.line }}>
              <T v="bodyStrong" size={15} style={{ flex: compact ? undefined : 1.3 }}>{r.l}</T>
              <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', flex: compact ? undefined : 3 }}>
                <TextInput
                  accessibilityLabel={`Contado em ${r.l}`}
                  value={counts[r.k]}
                  editable={!revealed}
                  keyboardType="numeric"
                  inputMode="numeric"
                  onChangeText={(v) => setCounts((x) => ({ ...x, [r.k]: v }))}
                  style={{ flex: colW ?? 1.2, height: 44, borderBottomWidth: 1, borderColor: c.ink, fontSize: 22, fontFamily: fonts[300], color: c.ink, padding: 0, minWidth: 0, ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null) }}
                />
                <T color={c.ink2} style={{ flex: 1 }} numberOfLines={1}>{revealed ? kz(r.e) : '••••'}</T>
                <T w={500} right color={r.d < 0 ? c.bad : c.ok} style={{ flex: 1 }} numberOfLines={1}>
                  {revealed ? (r.d === 0 ? '—' : kz(r.d)) : ''}
                </T>
              </View>
            </View>
          ))}
          <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 16, borderTopWidth: 2, borderColor: c.ink, alignItems: 'center' }}>
            <T v="label" style={{ flex: compact ? undefined : 1.3, width: compact ? 60 : undefined }}>Total</T>
            <View style={{ flexDirection: 'row', gap: 16, flex: compact ? 1 : 3 }}>
              <T w={600} style={{ flex: compact ? 2.4 : 1.2 }} numberOfLines={1}>{kz(tc)}</T>
              <T w={600} style={{ flex: 1 }} numberOfLines={1}>{revealed ? kz(te) : '••••'}</T>
              <T w={600} right color={td < 0 ? c.bad : c.ok} style={{ flex: 1 }} numberOfLines={1}>{revealed ? kz(td) : ''}</T>
            </View>
          </View>
        </View>

        {stage === 'count' ? (
          <View style={{ gap: 8, maxWidth: 420 }}>
            <HoldButton label="Segurar para fechar e revelar" reason="Confirmar fecho de caixa" onConfirm={reveal} />
            <T v="small">Depois de revelar, a contagem fica bloqueada.</T>
          </View>
        ) : null}
        {stage === 'closed' ? (
          <View accessibilityRole="alert" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Dot color={c.ok} />
            <T w={500} size={15} color={c.ok}>Sem diferença. Caixa fechado às {closedAt}.</T>
          </View>
        ) : null}
        {stage === 'revealed' ? (
          <View style={{ gap: 16, maxWidth: 620 }}>
            <Area label="Justificação · obrigatória" value={just} onChangeText={setJust} placeholder="Explique o que aconteceu" />
            <Btn
              label="Pedir aprovação ao dono"
              haptic="warning"
              disabled={!just.trim()}
              onPress={() => {
                addApproval({ id: 'cx-tal', kind: 'caixa', k: 'Fecho de caixa · Talatona · agora', t: 'Justificação: ' + just.trim(), v: td });
                setCaixa(false);
                setStage('pending');
                notify('Diferença enviada ao dono por SMS e na app', 'warn');
              }}
            />
          </View>
        ) : null}
        {stage === 'pending' ? (
          <View accessibilityRole="alert" style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Dot color={c.warnDot} />
            <T w={500} size={15} color={c.warn} style={{ flex: 1 }}>Diferença de {kz(td)} enviada ao dono por SMS e na app. Caixa fechado às {closedAt}.</T>
            <Btn kind="outline" size="sm" label="Ver aprovações" onPress={() => go('aprovacoes')} />
          </View>
        ) : null}
      </View>
    </Page>
  );
}
