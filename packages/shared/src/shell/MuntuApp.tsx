import React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { EnvCtx } from '../design/runtime';
import { MuntuDesktop } from '../design/generated/MuntuDesktop';
import { MuntuMobile } from '../design/generated/MuntuMobile';

/** desktop = web desktop · mobile = web mobile · auto = nativo (telemóvel → mobile, ecrã ≥ 1024 px → desktop). */
export type UiMode = 'desktop' | 'mobile' | 'auto';

/** Largura mínima do desenho desktop (MUNTU Desktop v8). */
export const DESKTOP_MIN = 1024;
/** Coluna máxima do desenho mobile quando aberto num ecrã largo. */
export const MOBILE_MAX = 480;

type Props = {
  ui: UiMode;
  /** Ecrã inicial do protótipo (ex.: d1, d6, m1, r1). Sem valor, abre no ecrã de entrada do desenho. */
  screen?: string;
  /** Papel inicial: rececao | financas | pt | dono. */
  role?: string;
};

const defined = (o: Record<string, unknown>) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== ''));

/**
 * Raiz partilhada pelas três apps. Desenha os ficheiros de desenho do projecto
 * (design/*.dc.html, convertidos por tools/dc2rn.py): desktop e mobile são
 * desenhos diferentes, cada um com a sua navegação.
 */
export function MuntuApp({ ui, screen, role }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const kind = ui === 'auto' ? (width >= DESKTOP_MIN ? 'desktop' : 'mobile') : ui;
  const props = defined({ screen, role });

  if (kind === 'desktop') {
    const w = Math.max(width, DESKTOP_MIN);
    const h = height - insets.top - insets.bottom;
    const page = (
      <EnvCtx.Provider value={{ width: w, height: h }}>
        <MuntuDesktop key={`${screen ?? ''}|${role ?? ''}`} {...props} __vh={`${h}px`} />
      </EnvCtx.Provider>
    );
    return (
      <View style={{ flex: 1, backgroundColor: '#fbfaf7', paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <StatusBar style="dark" />
        {width < DESKTOP_MIN ? (
          <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={{ width: DESKTOP_MIN }}>
            <ScrollView style={{ width: DESKTOP_MIN }} contentContainerStyle={{ minHeight: h }}>
              {page}
            </ScrollView>
          </ScrollView>
        ) : (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ minHeight: h }}>
            {page}
          </ScrollView>
        )}
      </View>
    );
  }

  const wide = width > MOBILE_MAX;
  return (
    <View style={{ flex: 1, backgroundColor: wide ? '#ebe6d6' : '#fbfaf7', alignItems: 'center' }}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, width: Math.min(width, MOBILE_MAX), backgroundColor: '#fbfaf7', paddingBottom: insets.bottom }}>
        <MuntuMobile key={`${screen ?? ''}|${role ?? ''}`} {...props} __safeTop={`${insets.top}px`} />
      </View>
    </View>
  );
}
