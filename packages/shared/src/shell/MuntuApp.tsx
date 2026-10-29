import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useTheme } from '../theme';
import { useMuntu } from '../store';
import { AppShell } from './AppShell';
import { NavProvider, ROUTES, type NavMode, type NavParams, type ScreenId } from './nav';
import { SCREENS } from '../screens';

type Props = {
  /** Ecrã actual (vem da rota). */
  screen?: ScreenId;
  /** top = desktop, bottom = web mobile, auto = nativo (barra em baixo no telemóvel, topo no tablet). */
  navMode: NavMode;
  /** Chamado ao navegar — cada app liga ao seu router. */
  onNavigate: (id: ScreenId) => void;
};

/** Raiz partilhada pelas três apps. */
export function MuntuApp({ screen = 'recepcao', navMode, onNavigate }: Props) {
  const role = useMuntu((s) => s.role);
  const setRole = useMuntu((s) => s.setRole);
  const t = useTheme();
  const [params, setParams] = useState<NavParams>({});

  // O papel acompanha o ecrã aberto por link directo.
  const group = ROUTES.find((r) => r.id === screen)?.group ?? 'gestao';
  useEffect(() => {
    if (group !== role) setRole(group);
  }, [group]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback(
    (id: ScreenId, p?: NavParams) => {
      setParams(p ?? {});
      onNavigate(id);
    },
    [onNavigate],
  );

  // Android: o botão voltar regressa ao ecrã inicial antes de sair da app.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const home: ScreenId = group === 'membro' ? 'acesso' : 'recepcao';
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === home) return false;
      go(home);
      return true;
    });
    return () => sub.remove();
  }, [screen, group, go]);

  const bottom = navMode === 'bottom' || (navMode === 'auto' && t.compact);
  const value = useMemo(() => ({ screen, params, go, bottomInset: bottom ? 8 : 0 }), [screen, params, go, bottom]);
  const Screen = SCREENS[screen] ?? SCREENS.recepcao;

  return (
    <NavProvider value={value}>
      <AppShell mode={navMode}>
        <Screen key={screen + JSON.stringify(params)} />
      </AppShell>
    </NavProvider>
  );
}
