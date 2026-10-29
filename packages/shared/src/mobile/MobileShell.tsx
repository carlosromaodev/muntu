import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LayoutWidth, useTheme } from '../theme';
import { useMuntu } from '../store';
import { haptic } from '../lib/haptics';
import { T } from '../ui';
import { MOBILE_TABS, useNav } from '../shell/nav';
import { Toasts } from '../shell/notify';

/** Coluna máxima quando a app mobile abre num ecrã largo (web mobile no computador, tablet). */
export const MOBILE_MAX = 560;

/**
 * Shell mobile (MUNTU Mobile): o ecrã ocupa tudo, sem cabeçalho global —
 * cada tela tem o seu topo — e barra inferior de 72 px com 4 separadores numerados.
 */
export function MobileShell({ children }: { children: React.ReactNode }) {
  const { c, w, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const { screen } = useNav();
  const colW = Math.min(w, MOBILE_MAX);
  // A tela de acesso tem o topo laranja até à barra de estado, como no desenho.
  const topBg = screen === 'acesso' ? c.brand : c.bg;
  return (
    <LayoutWidth.Provider value={colW}>
      <View style={{ flex: 1, backgroundColor: w > MOBILE_MAX ? c.surface : c.bg, alignItems: 'center' }}>
        <View style={{ flex: 1, width: colW, backgroundColor: c.bg, borderLeftWidth: w > MOBILE_MAX ? 1 : 0, borderRightWidth: w > MOBILE_MAX ? 1 : 0, borderColor: c.line }}>
          <StatusBar style={screen === 'acesso' || !dark ? 'dark' : 'light'} />
          <View style={{ height: insets.top, backgroundColor: topBg }} />
          <View style={{ flex: 1 }}>{children}</View>
          <TabBar />
          <Toasts bottomOffset={84} />
        </View>
      </View>
    </LayoutWidth.Provider>
  );
}

function TabBar() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { screen, go } = useNav();
  const role = useMuntu((s) => s.role);
  const tabs = MOBILE_TABS[role];
  return (
    <View accessibilityRole="tablist" style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: c.line, backgroundColor: c.bg, paddingBottom: insets.bottom }}>
      {tabs.map((t, i) => {
        const on = screen === t.id;
        return (
          <Pressable
            key={t.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.label}
            onPress={() => {
              haptic('select');
              go(t.id);
            }}
            style={{ flex: 1, height: 72, alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            {on ? <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: c.brand }} /> : null}
            <T size={12} w={300} style={{ letterSpacing: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </T>
            <T v="label" size={9} style={{ letterSpacing: 1.6 }} numberOfLines={1}>
              {t.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}
