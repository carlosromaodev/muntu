import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LayoutWidth, useTheme } from '../theme';
import { pendingCount, useMuntu, type Filial } from '../store';
import { haptic } from '../lib/haptics';
import { CHECKINS, DIVIDA, GYM, VENCER } from '../data/sample';
import { Btn, Dot, Field, Logo, Segmented, Sheet, T, Toggle } from '../ui';
import { DESKTOP_NAV, useNav } from '../shell/nav';
import { Menu } from '../shell/Menu';
import { Toasts } from '../shell/notify';

const FILIAIS: { v: Filial; l: string }[] = [
  { v: 'todas', l: 'Todas' },
  { v: 'talatona', l: 'Talatona' },
  { v: 'kilamba', l: 'Kilamba' },
  { v: 'maianga', l: 'Maianga' },
];

/** Largura mínima do desenho desktop. Abaixo disto a página faz scroll horizontal. */
export const DESKTOP_MIN = 1024;

/**
 * Shell do desktop (MUNTU Desktop v4): cabeçalho de 64 px com filial, pesquisa,
 * aprovações e avatar; navegação numerada de 9 separadores com barra laranja.
 */
export function DesktopShell({ children }: { children: React.ReactNode }) {
  const { w } = useTheme();
  const [sheet, setSheet] = useState<null | 'conta' | 'pesquisa'>(null);

  // ⌘K / Ctrl+K abre a pesquisa.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSheet('pesquisa');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const narrow = w < DESKTOP_MIN;
  const body = (
    <LayoutWidth.Provider value={Math.max(w, DESKTOP_MIN)}>
      <Frame onAccount={() => setSheet('conta')} onSearch={() => setSheet('pesquisa')}>
        {children}
      </Frame>
      <AccountSheet visible={sheet === 'conta'} onClose={() => setSheet(null)} />
      <SearchSheet visible={sheet === 'pesquisa'} onClose={() => setSheet(null)} />
    </LayoutWidth.Provider>
  );
  return narrow ? (
    <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={{ width: DESKTOP_MIN }}>
      <View style={{ width: DESKTOP_MIN, flex: 1 }}>{body}</View>
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{body}</View>
  );
}

function Frame({ children, onAccount, onSearch }: { children: React.ReactNode; onAccount: () => void; onSearch: () => void }) {
  const t = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: t.c.bg }}>
      <StatusBar style={t.dark ? 'light' : 'dark'} />
      <Header onAccount={onAccount} onSearch={onSearch} />
      <OfflineBanner />
      <View style={{ flex: 1 }}>{children}</View>
      <Toasts bottomOffset={24} />
    </View>
  );
}

function Header({ onAccount, onSearch }: { onAccount: () => void; onSearch: () => void }) {
  const { c, g } = useTheme();
  const insets = useSafeAreaInsets();
  const { screen, go } = useNav();
  const filial = useMuntu((s) => s.filial);
  const setFilial = useMuntu((s) => s.setFilial);
  const n = useMuntu(pendingCount);
  return (
    <View style={{ backgroundColor: c.bg, borderBottomWidth: 1, borderColor: c.line, paddingTop: insets.top, zIndex: 10 }}>
      <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: g, borderBottomWidth: 1, borderColor: c.line }}>
        <Logo size={22} color={c.ink} />
        <View style={{ width: 1, height: 24, backgroundColor: c.line }} />
        <Menu label="Filial" value={filial} options={FILIAIS} onChange={setFilial} />
        <View style={{ flex: 1 }} />
        <Pressable
          accessibilityRole="search"
          accessibilityLabel="Pesquisar membro"
          onPress={onSearch}
          style={(st: any) => ({ flexShrink: 1, flexBasis: 380, minWidth: 180, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingHorizontal: 14, backgroundColor: st.hovered ? c.line2 : c.surface })}
        >
          <T v="label" size={10} color={c.ink2} numberOfLines={1} style={{ flexShrink: 1, letterSpacing: 1.8 }}>
            Pesquisar · nome, telefone, NIF
          </T>
          {Platform.OS === 'web' ? <T v="label" size={10}>⌘K</T> : null}
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Aprovações: ${n} pendentes`} onPress={() => { haptic('tap'); go('painel'); }} style={{ height: 40, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 4 }}>
          <T v="label" size={10} style={{ letterSpacing: 1.8 }}>Aprovações</T>
          <View style={{ minWidth: 24, height: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: c.brand }}>
            <T size={12} color="#1D1C1A">{n}</T>
          </View>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`${GYM.operador} · ${GYM.operadorPapel}`} onPress={() => { haptic('tap'); onAccount(); }} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: c.invBg }}>
          <T v="label" size={12} color={c.invInk} style={{ letterSpacing: 1 }}>CB</T>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: g, flexGrow: 1 }} accessibilityRole="tablist">
        {DESKTOP_NAV.map((r, i) => {
          const on = screen === r.id;
          return (
            <Pressable
              key={r.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              onPress={() => { haptic('select'); go(r.id); }}
              style={(st: any) => ({
                flexGrow: 1,
                minWidth: 96,
                height: 56,
                justifyContent: 'center',
                gap: 4,
                paddingHorizontal: 16,
                borderRightWidth: 1,
                borderLeftWidth: i === 0 ? 1 : 0,
                borderColor: c.line,
                backgroundColor: st.hovered ? c.surface2 : 'transparent',
              })}
            >
              <T size={12} w={300}>{String(i + 1).padStart(2, '0')}</T>
              <T v="label" size={10} color={on ? c.ink : c.ink2} numberOfLines={1} style={{ letterSpacing: 1.8 }}>
                {r.label}
              </T>
              {on ? <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, backgroundColor: c.brand }} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function OfflineBanner() {
  const { g } = useTheme();
  const offline = useMuntu((s) => s.offline);
  if (!offline) return null;
  return (
    <View accessibilityRole="alert" style={{ backgroundColor: '#1D1C1A', flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: g }}>
      <Dot color="#E0B23C" />
      <T v="label" color="#EBE6D6">Sem rede</T>
      <T size={13} color="#EBE6D6" style={{ flex: 1 }}>
        Recepção e catracas continuam a funcionar. 7 operações e 12 SMS em fila para sincronizar.
      </T>
    </View>
  );
}

function AccountSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { c } = useTheme();
  const s = useMuntu();
  return (
    <Sheet visible={visible} onClose={onClose} eyebrow={`${GYM.operadorPapel} · Talatona`} title={GYM.operador}>
      <View style={{ gap: 10 }}>
        <T v="eyebrow">Aparência</T>
        <Segmented
          value={s.themePref}
          onChange={s.setThemePref}
          options={[
            { v: 'light', l: 'Claro' },
            { v: 'dark', l: 'Escuro' },
            { v: 'system', l: 'Sistema' },
          ]}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderTopWidth: 1, borderColor: c.line, paddingTop: 16 }}>
        <View style={{ flex: 1, gap: 2 }}>
          <T v="bodyStrong">Simular sem rede</T>
          <T v="small">Mostra o modo offline da recepção.</T>
        </View>
        <Toggle value={s.offline} onChange={s.setOffline} label="Simular sem rede" />
      </View>
      <View style={{ borderTopWidth: 1, borderColor: c.line, paddingTop: 16, gap: 6 }}>
        <T v="small">MUNTU 0.1.0 · {GYM.nome}</T>
        <T v="small">Os dados do ginásio podem ser exportados a qualquer momento.</T>
      </View>
    </Sheet>
  );
}

function SearchSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { c } = useTheme();
  const { go } = useNav();
  const [q, setQ] = useState('');
  const people = useMemo(() => {
    const all = new Map<string, string>();
    CHECKINS.forEach((m) => all.set(m.n, m.p + ' · ' + m.f));
    DIVIDA.forEach((m) => all.set(m.n, 'Em dívida · ' + m.d));
    VENCER.forEach((m) => all.set(m.n, m.d));
    return [...all.entries()].map(([n, d]) => ({ n, d }));
  }, []);
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const list = people.filter((p) => !q || norm(p.n + ' ' + p.d).includes(norm(q))).slice(0, 8);
  const screens = DESKTOP_NAV.filter((r) => q && norm(r.label + ' ' + r.hint).includes(norm(q)));
  const close = () => {
    setQ('');
    onClose();
  };
  return (
    <Sheet visible={visible} onClose={close} eyebrow="Pesquisar" title="Membros e secções">
      <Field label="Nome, telefone ou NIF" value={q} onChangeText={setQ} autoFocus placeholder="Ex.: Délcio" />
      <View>
        {list.map((p, i) => (
          <Pressable
            key={p.n}
            accessibilityRole="button"
            onPress={() => {
              haptic('tap');
              close();
              go('membro', { estado: p.n === 'Délcio Ngola' || p.n === 'Yola Fernandes' ? 'divida' : p.n === 'Joana Kiala' ? 'rede' : 'normal', nome: p.n });
            }}
            style={(st: any) => ({ paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderColor: c.line, backgroundColor: st.hovered ? c.surface2 : 'transparent', gap: 2 })}
          >
            <T v="bodyStrong">{p.n}</T>
            <T v="small">{p.d}</T>
          </Pressable>
        ))}
        {!list.length ? <T v="small">Nenhum membro encontrado.</T> : null}
      </View>
      {screens.length ? (
        <View style={{ gap: 8 }}>
          <T v="eyebrow">Secções</T>
          {screens.map((r) => (
            <Btn key={r.id} kind="outline" size="sm" label={r.label} onPress={() => { close(); go(r.id); }} />
          ))}
        </View>
      ) : null}
    </Sheet>
  );
}
