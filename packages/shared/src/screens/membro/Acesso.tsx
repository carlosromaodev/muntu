import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { MEMBRO } from '../../data/sample';
import { pad2 } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { Dot, ListRow, Page, QR, Section, T } from '../../ui';

/** QR de acesso do membro: renova a cada 30 s. */
export function Acesso() {
  const { c, g, compact, w } = useTheme();
  const { bottomInset } = useNav();
  const [left, setLeft] = useState(30);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setSeed((x) => x + 1);
          haptic('select');
          return 30;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const qrSize = Math.min(compact ? w - 2 * g - 30 : 240, 240);

  return (
    <Page bottomInset={bottomInset}>
      <View style={{ backgroundColor: c.brand, paddingHorizontal: g, paddingTop: compact ? 8 : 40, paddingBottom: 28, gap: 6 }}>
        <T v="eyebrow" color="#1D1C1A">Olá, {MEMBRO.primeiro}</T>
        <T v="display" color="#1D1C1A" size={compact ? 30 : 40}>O teu acesso</T>
      </View>
      <View style={{ maxWidth: 760, width: '100%', alignSelf: 'center', flexDirection: compact ? 'column' : 'row', gap: compact ? 20 : 40, padding: g, paddingVertical: compact ? 28 : 40, alignItems: compact ? 'stretch' : 'flex-start' }}>
        <View style={{ alignItems: 'center', gap: 16 }}>
          <QR size={qrSize} seed={seed} />
          <T v="label" size={11} color={c.ink2} center accessibilityLiveRegion="polite">
            QR renova em 00:{pad2(left)} · aproxima da catraca
          </T>
        </View>
        <View style={{ flex: compact ? undefined : 1, gap: 20 }}>
          <View style={{ flexDirection: 'row', backgroundColor: c.surface }}>
            <View style={{ flex: 1, padding: 18, gap: 6 }}>
              <T v="num" size={36}>{MEMBRO.dias}</T>
              <T v="eyebrow" color={c.ink}>Dias restantes</T>
            </View>
            <View style={{ flex: 1, padding: 18, gap: 6, borderLeftWidth: 1, borderColor: c.line2, justifyContent: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Dot color={c.ok} />
                <T v="label" color={c.ok}>Pago</T>
              </View>
              <T v="bodyStrong">{MEMBRO.plano}</T>
            </View>
          </View>
          <Section title="Últimas entradas" pad={false} style={{ paddingVertical: 0 }}>
            <View>
              {MEMBRO.entradas.map((e) => (
                <ListRow key={e.d}>
                  <T size={14} style={{ flex: 1 }}>{e.d}</T>
                  <T v="small">{e.f}</T>
                </ListRow>
              ))}
            </View>
          </Section>
        </View>
      </View>
    </Page>
  );
}
