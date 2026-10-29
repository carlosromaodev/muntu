import React, { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { fonts, useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { CAIXA_ESPERADO, CAIXA_MEIOS } from '../../data/sample';
import { kn, kz, nowHM, parseKz } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNotify } from '../../shell/notify';
import { Area, Btn, Dot, Page, PageHeader, StatBand, T } from '../../ui';

type Stage = 'count' | 'revealed' | 'pending' | 'closed';

export function Caixa() {
  const { c, g } = useTheme();
  const notify = useNotify();
  const setCaixa = useMuntu((s) => s.setCaixa);
  const addApproval = useMuntu((s) => s.addApproval);
  const [counts, setCounts] = useState<Record<string, string>>({ dinheiro: '86000', express: '64500', tpa: '22000', transf: '10000' });
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
  const col = { flex: 1, minWidth: 0 } as const;

  return (
    <Page>
      <PageHeader eyebrow="Talatona · Turno da manhã · Celma Bento" title="Fecho de caixa" />
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
      <View style={{ paddingHorizontal: g, paddingVertical: 32, gap: 24, maxWidth: 1000 }}>
        <T size={15} color={c.ink2} style={{ maxWidth: 620 }}>
          {revealed ? 'O valor esperado só aparece depois da contagem. Diferenças precisam de justificação.' : 'Conte o caixa sem ver o valor esperado. Só depois de fechar vê a diferença.'}
        </T>
        <View>
          <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 10 }}>
            <T v="eyebrow" style={{ flex: 1.3 }}>Meio</T>
            <T v="eyebrow" style={col}>Contado (Kz)</T>
            <T v="eyebrow" style={col}>{revealed ? 'Esperado' : 'Esperado · oculto'}</T>
            <T v="eyebrow" style={col} right>{revealed ? 'Diferença' : ''}</T>
          </View>
          {rows.map((r) => (
            <View key={r.k} style={{ flexDirection: 'row', gap: 16, alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderColor: c.line }}>
              <T v="bodyStrong" size={15} style={{ flex: 1.3 }}>{r.l}</T>
              <TextInput
                accessibilityLabel={`Contado em ${r.l}`}
                value={counts[r.k]}
                editable={!revealed}
                keyboardType="numeric"
                inputMode="numeric"
                onChangeText={(v) => setCounts((x) => ({ ...x, [r.k]: v }))}
                style={{ ...col, height: 44, borderBottomWidth: 1, borderColor: c.ink, fontSize: 22, fontFamily: fonts[300], color: c.ink, padding: 0, ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null) }}
              />
              <T color={c.ink2} style={col} numberOfLines={1}>{revealed ? kz(r.e) : '••••'}</T>
              <T w={500} right color={r.d < 0 ? c.bad : c.ok} style={col} numberOfLines={1}>
                {revealed ? (r.d === 0 ? '—' : kz(r.d)) : ''}
              </T>
            </View>
          ))}
          <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 16, borderTopWidth: 2, borderColor: c.ink, alignItems: 'center' }}>
            <T v="label" style={{ flex: 1.3 }}>Total</T>
            <T w={600} size={15} style={col} numberOfLines={1}>{kz(tc)}</T>
            <T w={600} size={15} style={col} numberOfLines={1}>{revealed ? kz(te) : '••••'}</T>
            <T w={600} size={15} right color={td < 0 ? c.bad : c.ok} style={col} numberOfLines={1}>{revealed ? kz(td) : ''}</T>
          </View>
        </View>

        {stage === 'count' ? <Btn size="lg" label="Fechar e revelar diferença" haptic="press" onPress={reveal} style={{ height: 48 }} /> : null}
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
              size="lg"
              style={{ height: 48 }}
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
          <View accessibilityRole="alert" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Dot color={c.warnDot} />
            <T w={500} size={15} color={c.warn} style={{ flex: 1 }}>Diferença de {kz(td)} enviada ao dono por SMS e na app. Caixa fechado.</T>
          </View>
        ) : null}
      </View>
    </Page>
  );
}
