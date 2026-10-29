import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { GYM, MEMBRO } from '../../data/sample';
import { pad2 } from '../../lib/format';
import { haptic } from '../../lib/haptics';
import { Dot, Logo, QR, T, em } from '../../ui';
import { Big, Eyebrow, MScreen, MTitle, PAD, StatLabel } from '../parts';

/** M1 · Membro · Acesso — QR dinâmico que renova a cada 30 s. */
export function Acesso() {
  const { c } = useTheme();
  const [left, setLeft] = useState(24);
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

  return (
    <MScreen>
      <View style={{ backgroundColor: c.brand, paddingTop: 12, paddingHorizontal: PAD, paddingBottom: 28, gap: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size={20} color="#1D1C1A" />
          <T size={10} w={600} color="#1D1C1A" style={{ letterSpacing: em(10, 0.2), textTransform: 'uppercase' }}>
            {GYM.nome}
          </T>
        </View>
        <View style={{ gap: 6 }}>
          <Eyebrow color="#1D1C1A">Olá, {MEMBRO.primeiro}</Eyebrow>
          <MTitle color="#1D1C1A">O teu acesso</MTitle>
        </View>
      </View>
      <View style={{ paddingVertical: 28, paddingHorizontal: PAD, gap: 20, alignItems: 'center' }}>
        <QR size={189} seed={seed} />
        <T size={11} w={600} color={c.ink2} center accessibilityLiveRegion="polite" style={{ letterSpacing: em(11, 0.16), textTransform: 'uppercase' }}>
          QR renova em 00:{pad2(left)} · aproxima da catraca
        </T>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', backgroundColor: c.surface }}>
          <View style={{ flex: 1, padding: 18, gap: 6 }}>
            <Big size={36}>{MEMBRO.dias}</Big>
            <StatLabel>Dias restantes</StatLabel>
          </View>
          <View style={{ flex: 1, padding: 18, gap: 6, borderLeftWidth: 1, borderColor: c.line2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Dot color={c.ok} />
              <T size={11} w={600} color={c.ok} style={{ letterSpacing: em(11, 0.14), textTransform: 'uppercase' }}>
                Pago
              </T>
            </View>
            <T size={14} w={500}>{MEMBRO.plano}</T>
          </View>
        </View>
      </View>
    </MScreen>
  );
}
