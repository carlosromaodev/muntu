import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { Role } from '../data/mobile';
import { useMuntu } from '../store/useMuntu';
import { C } from '../theme/tokens';
import { RoleTabBar } from './Layout';
import { TABS } from './nav';

/** Rotas de separador que não aparecem na barra (abrem a partir do cabeçalho). */
const HIDDEN: Partial<Record<Role, string[]>> = { rececao: ['turno'] };

/** Pilha nativa da app mobile: deslizar para voltar no iOS, transição lateral no Android. */
export function MobileStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.paper },
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ animation: 'fade' }} />
      {(['membro', 'rececao', 'financas', 'pt', 'dono'] as const).map((r) => (
        <Stack.Screen key={r} name={r} options={{ animation: 'fade', gestureEnabled: false }} />
      ))}
      <Stack.Screen name="receber-turno" options={{ gestureEnabled: false }} />
    </Stack>
  );
}

/** Separadores de um papel, com a barra numerada do desenho. */
export function RoleTabs({ role }: { role: Role }) {
  const cur = useMuntu((s) => s.role);
  const signIn = useMuntu((s) => s.signIn);
  useEffect(() => {
    if (cur !== role) signIn(role);
  }, [cur, role, signIn]);
  return (
    <Tabs tabBar={() => <RoleTabBar role={role} />} screenOptions={{ headerShown: false, animation: 'shift', sceneStyle: { backgroundColor: C.paper } }}>
      {TABS[role].map((t) => (
        <Tabs.Screen key={t.route} name={t.route} options={{ title: t.label }} />
      ))}
      {/* Sem `href: null`: no Expo Router 58 um separador escondido redirecciona. A barra própria só mostra os do papel. */}
      {(HIDDEN[role] ?? []).map((n) => (
        <Tabs.Screen key={n} name={n} />
      ))}
    </Tabs>
  );
}
