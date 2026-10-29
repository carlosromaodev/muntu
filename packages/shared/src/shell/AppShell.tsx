import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme';
import { pendingCount, toneHaptic, useMuntu, type Filial } from '../store';
import { haptic } from '../lib/haptics';
import { CHECKINS, DIVIDA, GYM, RISK, VENCER } from '../data/sample';
import { Btn, Field, Logo, Segmented, Sheet, T, Toggle, Dot } from '../ui';
import { BOTTOM_TABS, ROUTES, useNav, type NavMode, type ScreenId } from './nav';
import { Menu } from './Menu';

const FILIAIS: { v: Filial; l: string }[] = [
  { v: 'todas', l: 'Todas' },
  { v: 'talatona', l: 'Talatona' },
  { v: 'kilamba', l: 'Kilamba' },
  { v: 'maianga', l: 'Maianga' },
];

export function AppShell({ mode, children }: { mode: NavMode; children: React.ReactNode }) {
  const t = useTheme();
  const role = useMuntu((s) => s.role);
  const bottom = mode === 'bottom' || (mode === 'auto' && t.compact);
  const [sheet, setSheet] = useState<null | 'conta' | 'mais' | 'pesquisa'>(null);

  // ⌘K / Ctrl+K abre a pesquisa na web.
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

  return (
    <View style={{ flex: 1, backgroundColor: t.c.bg }}>
      <StatusBar style={t.dark ? 'light' : 'dark'} />
      {bottom ? <CompactHeader onAccount={() => setSheet('conta')} onSearch={() => setSheet('pesquisa')} /> : <TopHeader onAccount={() => setSheet('conta')} onSearch={() => setSheet('pesquisa')} />}
      <OfflineBanner />
      <View style={{ flex: 1 }}>{children}</View>
      {bottom ? <BottomBar role={role} onMore={() => setSheet('mais')} onAccount={() => setSheet('conta')} /> : null}
      <Toasts bottomOffset={bottom ? 80 : 24} />
      <AccountSheet visible={sheet === 'conta'} onClose={() => setSheet(null)} />
      <MoreSheet visible={sheet === 'mais'} onClose={() => setSheet(null)} />
      <SearchSheet visible={sheet === 'pesquisa'} onClose={() => setSheet(null)} />
    </View>
  );
}

function Avatar({ onPress, label }: { onPress: () => void; label: string }) {
  const { c } = useTheme();
  const role = useMuntu((s) => s.role);
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={() => { haptic('tap'); onPress(); }} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: c.invBg }}>
      <T v="label" size={12} color={c.invInk} style={{ letterSpacing: 1 }}>
        {role === 'membro' ? 'KM' : 'CB'}
      </T>
    </Pressable>
  );
}

function ApprovalsBadge({ compact }: { compact?: boolean }) {
  const { c } = useTheme();
  const { go } = useNav();
  const n = useMuntu(pendingCount);
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Aprovações: ${n} pendentes`} onPress={() => { haptic('tap'); go('aprovacoes'); }} style={{ height: 40, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 4 }}>
      {!compact ? <T v="label" size={10}>Aprovações</T> : null}
      <View style={{ minWidth: 24, height: 24, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: n ? c.brand : c.surface }}>
        <T size={12} w={600} color="#1D1C1A">
          {n}
        </T>
      </View>
    </Pressable>
  );
}

function TopHeader({ onAccount, onSearch }: { onAccount: () => void; onSearch: () => void }) {
  const { c, g, bp } = useTheme();
  const insets = useSafeAreaInsets();
  const { screen, go } = useNav();
  const role = useMuntu((s) => s.role);
  const filial = useMuntu((s) => s.filial);
  const setFilial = useMuntu((s) => s.setFilial);
  const routes = ROUTES.filter((r) => r.group === role);
  return (
    <View style={{ backgroundColor: c.bg, borderBottomWidth: 1, borderColor: c.line, paddingTop: insets.top, zIndex: 10 }}>
      <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: g, borderBottomWidth: 1, borderColor: c.line }}>
        <Logo size={22} color={c.ink} />
        <View style={{ width: 1, height: 24, backgroundColor: c.line }} />
        {role === 'gestao' ? <Menu label="Filial" value={filial} options={FILIAIS} onChange={setFilial} /> : <T v="eyebrow">{GYM.nome}</T>}
        <View style={{ flex: 1 }} />
        {role === 'gestao' ? (
          <Pressable
            accessibilityRole="search"
            accessibilityLabel="Pesquisar membro"
            onPress={onSearch}
            style={(st: any) => ({ flexShrink: 1, width: bp === 'wide' ? 380 : 220, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingHorizontal: 14, backgroundColor: st.hovered ? c.line2 : c.surface })}
          >
            <T v="label" size={10} color={c.ink2} numberOfLines={1} style={{ flexShrink: 1 }}>
              {bp === 'wide' ? 'Pesquisar · nome, telefone, NIF' : 'Pesquisar'}
            </T>
            {Platform.OS === 'web' ? <T v="label" size={10}>⌘K</T> : null}
          </Pressable>
        ) : null}
        {role === 'gestao' ? <ApprovalsBadge compact={bp !== 'wide'} /> : null}
        <Avatar onPress={onAccount} label="Conta e definições" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: g, flexGrow: 1 }} accessibilityRole="tablist">
        {routes.map((r, i) => {
          const on = screen === r.id;
          return (
            <Pressable
              key={r.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              onPress={() => { haptic('select'); go(r.id); }}
              style={(st: any) => ({
                flexGrow: 1,
                minWidth: 92,
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
              <T size={12} w={300}>
                {String(i + 1).padStart(2, '0')}
              </T>
              <T v="label" size={10} color={on ? c.ink : c.ink2} numberOfLines={1}>
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

function CompactHeader({ onAccount, onSearch }: { onAccount: () => void; onSearch: () => void }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const role = useMuntu((s) => s.role);
  const { screen } = useNav();
  const brandTop = screen === 'acesso';
  return (
    <View style={{ paddingTop: insets.top, backgroundColor: brandTop ? c.brand : c.bg, borderBottomWidth: brandTop ? 0 : 1, borderColor: c.line }}>
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20 }}>
        <Logo size={20} color={brandTop ? '#1D1C1A' : c.ink} />
        <View style={{ flex: 1 }} />
        {role === 'gestao' ? (
          <>
            <Pressable accessibilityRole="search" accessibilityLabel="Pesquisar membro" onPress={onSearch} hitSlop={8} style={{ height: 40, justifyContent: 'center', paddingHorizontal: 6 }}>
              <T v="label" size={10}>Pesquisar</T>
            </Pressable>
            <ApprovalsBadge compact />
          </>
        ) : (
          <T v="eyebrow" color={brandTop ? '#1D1C1A' : c.muted}>{GYM.nome}</T>
        )}
        <Avatar onPress={onAccount} label="Conta e definições" />
      </View>
    </View>
  );
}

function BottomBar({ role, onMore, onAccount }: { role: 'gestao' | 'membro'; onMore: () => void; onAccount: () => void }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { screen, go } = useNav();
  const n = useMuntu(pendingCount);
  const tabs = BOTTOM_TABS[role];
  const inMore = role === 'gestao' && !tabs.includes(screen);
  const items: { key: string; label: string; on: boolean; onPress: () => void; badge?: number }[] = tabs.map((id) => {
    const r = ROUTES.find((x) => x.id === id)!;
    return { key: id, label: r.short, on: screen === id, onPress: () => go(id as ScreenId), badge: id === 'aprovacoes' ? n : undefined };
  });
  items.push(role === 'gestao' ? { key: 'mais', label: 'Mais', on: inMore, onPress: onMore } : { key: 'conta', label: 'Conta', on: false, onPress: onAccount });
  return (
    <View accessibilityRole="tablist" style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: c.line, backgroundColor: c.bg, paddingBottom: insets.bottom }}>
      {items.map((it, i) => (
        <Pressable
          key={it.key}
          accessibilityRole="tab"
          accessibilityState={{ selected: it.on }}
          accessibilityLabel={it.label}
          onPress={() => { haptic('select'); it.onPress(); }}
          style={{ flex: 1, height: 64, alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          {it.on ? <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: c.brand }} /> : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <T size={12} w={300}>
              {String(i + 1).padStart(2, '0')}
            </T>
            {it.badge ? (
              <View style={{ minWidth: 16, height: 16, paddingHorizontal: 4, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center' }}>
                <T size={10} w={600} color="#1D1C1A">{it.badge}</T>
              </View>
            ) : null}
          </View>
          <T v="label" size={9} color={it.on ? c.ink : c.ink2} numberOfLines={1}>
            {it.label}
          </T>
        </Pressable>
      ))}
    </View>
  );
}

function OfflineBanner() {
  const { g } = useTheme();
  const offline = useMuntu((s) => s.offline);
  if (!offline) return null;
  return (
    <View accessibilityRole="alert" style={{ backgroundColor: '#1D1C1A', flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: g, flexWrap: 'wrap' }}>
      <Dot color="#E0B23C" />
      <T v="label" color="#EBE6D6">Sem rede</T>
      <T size={13} color="#EBE6D6" style={{ flex: 1, minWidth: 200 }}>
        Recepção e catracas continuam a funcionar. 7 operações e 12 SMS em fila para sincronizar.
      </T>
    </View>
  );
}

function Toasts({ bottomOffset }: { bottomOffset: number }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const toasts = useMuntu((s) => s.toasts);
  const dismiss = useMuntu((s) => s.dismiss);
  if (!toasts.length) return null;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: bottomOffset + insets.bottom, alignItems: 'center', gap: 8, paddingHorizontal: 16 }}>
      {toasts.map((t) => {
        const dot = t.tone === 'ok' ? '#62C08A' : t.tone === 'warn' ? '#E0B23C' : t.tone === 'bad' ? '#F07A63' : c.brand;
        return (
          <Pressable key={t.id} accessibilityRole="alert" onPress={() => dismiss(t.id)} style={{ maxWidth: 520, width: '100%', backgroundColor: '#1D1C1A', paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Dot color={dot} />
            <T size={14} color="#F3ECD9" style={{ flex: 1 }}>
              {t.text}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Mostra uma notificação com a vibração correspondente ao tom. */
export function useNotify() {
  const toast = useMuntu((s) => s.toast);
  return (text: string, tone: 'ok' | 'warn' | 'bad' | 'info' = 'info') => {
    haptic(toneHaptic[tone]);
    toast(text, tone);
  };
}

function AccountSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { c } = useTheme();
  const { go } = useNav();
  const s = useMuntu();
  return (
    <Sheet visible={visible} onClose={onClose} eyebrow={s.role === 'gestao' ? `${GYM.operadorPapel} · Talatona` : 'Membro · Rede Mensal'} title={s.role === 'gestao' ? GYM.operador : 'Kátia Muondo'}>
      <View style={{ gap: 10 }}>
        <T v="eyebrow">Ver como</T>
        <Segmented
          value={s.role}
          onChange={(r) => {
            s.setRole(r);
            onClose();
            go(r === 'gestao' ? 'recepcao' : 'acesso');
          }}
          options={[
            { v: 'gestao', l: 'Gestão do ginásio' },
            { v: 'membro', l: 'App do membro' },
          ]}
        />
      </View>
      <View style={{ gap: 10 }}>
        <T v="eyebrow">Aparência</T>
        <Segmented
          value={s.themePref}
          onChange={s.setThemePref}
          options={[
            { v: 'system', l: 'Sistema' },
            { v: 'light', l: 'Claro' },
            { v: 'dark', l: 'Escuro' },
          ]}
        />
      </View>
      {s.role === 'gestao' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderTopWidth: 1, borderColor: c.line, paddingTop: 16 }}>
          <View style={{ flex: 1, gap: 2 }}>
            <T v="bodyStrong">Simular sem rede</T>
            <T v="small">Mostra o modo offline da recepção.</T>
          </View>
          <Toggle value={s.offline} onChange={s.setOffline} label="Simular sem rede" />
        </View>
      ) : null}
      <View style={{ borderTopWidth: 1, borderColor: c.line, paddingTop: 16, gap: 6 }}>
        <T v="small">MUNTU 0.1.0 · {GYM.nome}</T>
        <T v="small">Dados de exemplo. Os dados podem ser exportados a qualquer momento.</T>
      </View>
    </Sheet>
  );
}

function MoreSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { c } = useTheme();
  const { screen, go } = useNav();
  const routes = ROUTES.filter((r) => r.group === 'gestao');
  return (
    <Sheet visible={visible} onClose={onClose} eyebrow="Todas as secções" title="Mais">
      <View>
        {routes.map((r, i) => (
          <Pressable
            key={r.id}
            accessibilityRole="button"
            onPress={() => { haptic('select'); onClose(); go(r.id); }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderColor: c.line }}
          >
            <T size={13} w={300} style={{ width: 24 }}>
              {String(i + 1).padStart(2, '0')}
            </T>
            <View style={{ flex: 1, gap: 2 }}>
              <T v="label" size={11}>{r.label}</T>
              <T v="small">{r.hint}</T>
            </View>
            {screen === r.id ? <View style={{ width: 8, height: 8, backgroundColor: c.brand }} /> : <T v="small">→</T>}
          </Pressable>
        ))}
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
    RISK.forEach((m) => all.set(m.n, m.plano + ' · ' + m.tel));
    all.set('Délcio Ngola', 'Rede · Mensal · 924 663 091');
    return [...all.entries()].map(([n, d]) => ({ n, d }));
  }, []);
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const list = people.filter((p) => !q || norm(p.n + ' ' + p.d).includes(norm(q))).slice(0, 8);
  const screens = ROUTES.filter((r) => r.group === 'gestao' && q && norm(r.label + ' ' + r.hint).includes(norm(q)));
  return (
    <Sheet visible={visible} onClose={onClose} eyebrow="Pesquisar" title="Membros e secções">
      <Field label="Nome, telefone ou NIF" value={q} onChangeText={setQ} autoFocus placeholder="Ex.: Délcio" />
      <View>
        {list.map((p, i) => (
          <Pressable
            key={p.n}
            accessibilityRole="button"
            onPress={() => {
              haptic('tap');
              onClose();
              setQ('');
              go('membro', { estado: p.n === 'Délcio Ngola' || p.n === 'Yola Fernandes' ? 'divida' : 'normal', nome: p.n });
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
            <Btn key={r.id} kind="outline" size="sm" label={r.label} onPress={() => { onClose(); setQ(''); go(r.id); }} />
          ))}
        </View>
      ) : null}
    </Sheet>
  );
}
