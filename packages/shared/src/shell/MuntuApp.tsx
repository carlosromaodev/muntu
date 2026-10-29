import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, Platform, useWindowDimensions } from 'react-native';
import { useMuntu } from '../store';
import { DesktopShell, DESKTOP_MIN } from '../desktop/DesktopShell';
import { MobileShell } from '../mobile/MobileShell';
import { DESKTOP_SCREENS, MOBILE_SCREENS } from '../screens';
import { MOBILE_TABS, NavProvider, isDesktopId, isMobileId, type NavParams, type ScreenId, type UiMode } from './nav';

type Props = {
  /** Ecrã actual (vem da rota). */
  screen?: string;
  /** desktop = web desktop · mobile = web mobile · auto = nativo (telemóvel → mobile, ≥ 1024 px → desktop). */
  ui: UiMode;
  /** Chamado ao navegar — cada app liga ao seu router. */
  onNavigate: (id: ScreenId) => void;
};

/**
 * Raiz partilhada pelas três apps. O desktop e o mobile são desenhos diferentes
 * (MUNTU Desktop v4 e MUNTU Mobile), com shells e telas próprias; partilham
 * o design system, os dados e as regras.
 */
export function MuntuApp({ screen, ui, onNavigate }: Props) {
  const { width } = useWindowDimensions();
  const role = useMuntu((s) => s.role);
  const setRole = useMuntu((s) => s.setRole);
  const [params, setParams] = useState<NavParams>({});
  const kind: 'desktop' | 'mobile' = ui === 'auto' ? (width >= DESKTOP_MIN ? 'desktop' : 'mobile') : ui;

  // Ecrã válido para o desenho em uso; senão, o ecrã inicial desse desenho.
  const home: ScreenId = kind === 'desktop' ? 'recepcao' : role === 'dono' ? 'dono' : 'acesso';
  const current: ScreenId = screen && (kind === 'desktop' ? isDesktopId(screen) : isMobileId(screen)) ? (screen as ScreenId) : home;

  // No mobile, o papel acompanha o ecrã aberto por link directo.
  useEffect(() => {
    if (kind !== 'mobile' || current === 'conta') return;
    const owner = MOBILE_TABS.dono.some((t) => t.id === current) ? 'dono' : 'membro';
    if (owner !== role) setRole(owner);
  }, [kind, current]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback(
    (id: ScreenId, p?: NavParams) => {
      setParams(p ?? {});
      onNavigate(id);
    },
    [onNavigate],
  );

  // Android: voltar regressa ao ecrã inicial antes de sair da app.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (current === home) return false;
      go(home);
      return true;
    });
    return () => sub.remove();
  }, [current, home, go]);

  const value = useMemo(() => ({ screen: current, params, go }), [current, params, go]);
  const key = current + JSON.stringify(params);

  if (kind === 'desktop') {
    const Screen = DESKTOP_SCREENS[current as keyof typeof DESKTOP_SCREENS];
    return (
      <NavProvider value={value}>
        <DesktopShell>
          <Screen key={key} />
        </DesktopShell>
      </NavProvider>
    );
  }
  const Screen = MOBILE_SCREENS[current as keyof typeof MOBILE_SCREENS];
  return (
    <NavProvider value={value}>
      <MobileShell>
        <Screen key={key} />
      </MobileShell>
    </NavProvider>
  );
}
