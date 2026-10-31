import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { MuntuLogo } from '../brand/Logo';
import { APPR } from '../data/desk';
import { NOTICES, OCC, OCC_NOW } from '../data/mobile';
import { useMuntu } from '../store/useMuntu';
import { C, type } from '../theme/tokens';
import { Icon, OptionList, Press, Sheet, timing, Txt } from '../ui';
import { DEFAULT_ROLE, DRole, DRoute, HOME, NAVS, ROUTES, WHO } from './nav';
import { useDesk } from './session';
import { DeskLayoutProvider, GUT, GUT_PX, RAIL_W, sizeOf } from './layout';

const DRAWER_W = 280;

/** Papel activo no desktop: o da sessão, ou o adequado ao ecrã aberto pelo endereço. */
export function useDRole(): DRole {
  const role = useMuntu((s) => s.role);
  const path = usePathname();
  const route = path.replace(/^\//, '').split('/')[0] as DRoute;
  if (role && role !== 'membro') {
    if (NAVS[role].some(([r]) => r === route) || route === 'ginasio-agora' || route === 'avisos') return role;
  }
  return DEFAULT_ROLE[route] ?? (role && role !== 'membro' ? role : 'rececao');
}

function SideSelect<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ flex: 1, gap: 4 }}>
      <Txt style={[type(9, 600, 0.24, true), { color: C.stone }]}>{label}</Txt>
      <Press feedback="select" scaleTo={0.98} onPress={() => setOpen(true)} style={({ hovered }) => ({ height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: hovered ? C.stone : '#3a3834' })}>
        <Txt style={[type(11, 600, 0.14, true), { color: C.paper }]}>{options.find((o) => o.v === value)?.l}</Txt>
        <Txt style={[type(10, 400), { color: C.paper }]}>⌄</Txt>
      </Press>
      <Sheet open={open} onClose={() => setOpen(false)} title={label} width={360}>
        <OptionList options={options} value={value} onPick={(v) => (onChange(v), setOpen(false))} />
      </Sheet>
    </View>
  );
}

function NavItem({ label, on, badge, onPress }: { label: string; on: boolean; badge?: string; onPress: () => void }) {
  return (
    <Press
      feedback="select"
      scaleTo={1}
      onPress={onPress}
      accessibilityRole="link"
      accessibilityState={{ selected: on }}
    >
      {({ hovered }) => {
        const fg = on ? C.ink : hovered ? C.paper : '#b5b0a5';
        return (
          <View style={{ height: 42, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 22, backgroundColor: on ? 'transparent' : hovered ? '#2a2926' : 'transparent' }}>
            {hovered && !on ? <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: C.accent }} /> : null}
            <View style={{ width: 22, alignItems: 'flex-start' }}>
              <Icon name={label} desk size={18} color={fg} />
            </View>
            <Txt numberOfLines={1} style={[type(11, 600, 0.16, true), { flex: 1, color: fg }]}>
              {label}
            </Txt>
            {badge ? <Txt style={[type(11, 600), { minWidth: 20, textAlign: 'right', color: on ? C.ink : C.accent }]}>{badge}</Txt> : null}
          </View>
        );
      }}
    </Press>
  );
}

/** Barra lateral escura: filial/turno, menu do papel, lotação ao vivo e utilizador. */
function Sidebar({ role, route, width }: { role: DRole; route: string; width: number }) {
  const router = useRouter();
  const { filial, turno, setFilial, setTurno } = useDesk();
  const { readNotices, signOut } = useMuntu();
  const nav = NAVS[role];
  const idx = nav.findIndex(([r]) => r === route);
  const unread = NOTICES.filter((n) => !readNotices[n.id]).length;
  const y = useSharedValue(idx * 42);
  useEffect(() => {
    y.value = withTiming(Math.max(0, idx) * 42, timing(240));
  }, [idx, y]);
  const hl = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }], opacity: idx < 0 ? 0 : 1 }));
  const who = WHO[role];
  const now = OCC[OCC_NOW]!;
  return (
    <View accessibilityLabel="Navegação" style={{ width, backgroundColor: C.sidebar, height: '100%' }}>
      <View style={{ paddingTop: 28, paddingHorizontal: 24, paddingBottom: 22 }}>
        <MuntuLogo size={20} color={C.paper} descriptorColor="#4a4640" descriptorInk="#d9d4c4" />
      </View>
      <View style={{ marginHorizontal: 24, paddingTop: 14, paddingBottom: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#3a3834', flexDirection: 'row', gap: 14 }}>
        <SideSelect label="Filial" value={filial} onChange={setFilial} options={[{ v: 'todas', l: 'Todas' }, { v: 'talatona', l: 'Talatona' }, { v: 'kilamba', l: 'Kilamba' }, { v: 'maianga', l: 'Maianga' }]} />
        <SideSelect label="Turno" value={turno} onChange={setTurno} options={[{ v: 'manha', l: 'Manhã' }, { v: 'tarde', l: 'Tarde' }, { v: 'dia', l: 'Dia' }]} />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 18 }}>
        <View>
          <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, right: 0, top: 0, height: 42, backgroundColor: C.accent }, hl]} />
          {nav.map(([r, l], i) => (
            <NavItem key={r} label={l} on={i === idx} badge={r === 'avisos' && unread ? String(unread) : r === 'pendencias' ? '7' : ''} onPress={() => i !== idx && router.navigate(`/${r}` as any)} />
          ))}
        </View>
      </ScrollView>
      <Press feedback="select" scaleTo={0.99} onPress={() => router.navigate('/ginasio-agora')} accessibilityLabel="Lotação por check-in" style={{ marginHorizontal: 24, paddingTop: 16, paddingBottom: 14, borderTopWidth: 1, borderTopColor: '#3a3834', gap: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Txt style={[type(9, 600, 0.24, true), { color: C.stone }]}>No ginásio agora</Txt>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#7fbf95' }} />
            <Txt style={[type(9, 600, 0.2), { color: '#7fbf95' }]}>CHECK-IN</Txt>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
          <Txt style={[type(40, 300), { color: C.paper, lineHeight: 38 }]}>{now}</Txt>
          <View style={{ flex: 1, height: 32, flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
            {OCC.map((v, i) => (
              <View key={i} style={{ flex: 1, height: `${Math.round((v / 92) * 100)}%`, backgroundColor: i === OCC_NOW ? C.accent : i < OCC_NOW ? C.stone : '#3a3834' }} />
            ))}
          </View>
        </View>
      </Press>
      <View style={{ marginHorizontal: 24, paddingTop: 14, paddingBottom: 22, borderTopWidth: 1, borderTopColor: '#3a3834', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 36, height: 36, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' }}>
          <Txt style={[type(12, 600, 0.06), { color: C.ink }]}>{who.i}</Txt>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Txt numberOfLines={1} style={[type(13, 500), { color: C.paper }]}>
            {who.n}
          </Txt>
          <Txt style={[type(9, 600, 0.24, true), { color: C.stone }]}>{who.r}</Txt>
        </View>
        <Press
          feedback="select"
          accessibilityLabel="Terminar sessão"
          onPress={() => {
            signOut();
            router.replace('/');
          }}
        >
          {({ hovered }) => <Txt style={[type(10, 600, 0.18, true), { color: hovered ? C.accent : C.lineStrong }]}>Sair</Txt>}
        </Press>
      </View>
    </View>
  );
}

/** Cabeçalho do conteúdo: caminho, pesquisa e aprovações (dono). */
function TopBar({ role, route, onMenu, compact }: { role: DRole; route: string; onMenu?: () => void; compact: boolean }) {
  const router = useRouter();
  const approvals = useMuntu((s) => s.approvals);
  const open = APPR.filter((a) => !approvals[a.id]).length;
  return (
    <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', gap: compact ? 12 : 16, paddingHorizontal: GUT, backgroundColor: C.paper, borderBottomWidth: 1, borderBottomColor: C.line }}>
      {onMenu ? (
        <Press feedback="select" onPress={onMenu} accessibilityLabel="Abrir menu" style={({ hovered }) => ({ width: 40, height: 40, marginLeft: -8, alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: hovered ? C.sand : 'transparent' })}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={{ width: 18, height: 1.5, backgroundColor: C.ink }} />
          ))}
        </Press>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 12, flexShrink: 1, minWidth: 0 }}>
        {compact ? null : (
          <>
            <Txt numberOfLines={1} style={[type(10, 600, 0.22, true), { color: C.muted, flexShrink: 1 }]}>
              {role === 'dono' ? 'Rede Mwangolé Fit' : 'Mwangolé Fit · Talatona'}
            </Txt>
            <Txt style={{ color: '#c9c3b1' }}>/</Txt>
          </>
        )}
        <Txt numberOfLines={1} style={type(10, 600, 0.22, true)}>
          {(NAVS[role].find(([r]) => r === route)?.[1] ?? ROUTES[route as DRoute]) || ''}
        </Txt>
      </View>
      <View style={{ flex: 1 }} />
      <Press feedback="select" scaleTo={0.99} accessibilityLabel="Pesquisar membro" onPress={() => router.navigate('/membros')} style={({ hovered }) => ({ flexBasis: 380, flexShrink: 1, minWidth: compact ? 40 : 180, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, backgroundColor: hovered ? '#e0d9c5' : C.sand })}>
        <Txt numberOfLines={1} style={[type(10, 600, 0.18, true), { color: C.grey, flexShrink: 1 }]}>
          {compact ? 'Pesquisar' : 'Pesquisar · nome, telefone, NIF'}
        </Txt>
        {compact ? null : <Txt style={type(10, 600)}>⌘K</Txt>}
      </Press>
      {role === 'dono' ? (
        <Press feedback="select" onPress={() => router.navigate('/painel')} style={{ height: 40, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 4 }}>
          {compact ? null : <Txt style={type(10, 600, 0.18, true)}>Aprovações</Txt>}
          <View style={{ minWidth: 24, height: 24, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Txt style={type(12, 500)}>{String(open)}</Txt>
          </View>
        </Press>
      ) : null}
    </View>
  );
}

/** Estrutura das páginas com menu lateral (todas excepto entrar, criar conta e receber turno). */
export function DesktopShell() {
  const path = usePathname();
  const router = useRouter();
  const role = useDRole();
  const route = path.replace(/^\//, '').split('/')[0] || HOME[role];
  const { width, height } = useWindowDimensions();

  // Atalho ⌘K / Ctrl+K para pesquisar membros.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        router.navigate('/membros');
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [router]);

  const size = sizeOf(width);
  const drawer = RAIL_W[size] === 0;
  const rail = drawer ? 0 : RAIL_W[size];
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path, drawer]);
  const layout = { size, window: width, content: width - rail, gut: GUT_PX[size], drawer };

  return (
    <DeskLayoutProvider value={layout}>
      <View style={{ flexDirection: 'row', width, height, backgroundColor: C.canvas, overflow: 'hidden' }}>
        {drawer ? null : <Sidebar role={role} route={route} width={rail} />}
        <View style={{ flex: 1, minWidth: 0 }}>
          <TopBar role={role} route={route} compact={size === 'sm'} onMenu={drawer ? () => setMenu(true) : undefined} />
          <Slot />
        </View>
        {drawer ? <Drawer open={menu} onClose={() => setMenu(false)} role={role} route={route} height={height} /> : null}
      </View>
    </DeskLayoutProvider>
  );
}

/** Menu lateral em gaveta para janelas estreitas: desliza da esquerda sobre o conteúdo. */
function Drawer({ open, onClose, role, route, height }: { open: boolean; onClose: () => void; role: DRole; route: string; height: number }) {
  const x = useSharedValue(0);
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) setMounted(true);
    x.value = withTiming(open ? 1 : 0, timing(open ? 260 : 200));
    if (!open) {
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [open, x]);
  useEffect(() => {
    if (!open || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  const panel = useAnimatedStyle(() => ({ transform: [{ translateX: (x.value - 1) * DRAWER_W }] }));
  const shade = useAnimatedStyle(() => ({ opacity: x.value * 0.45 }));
  if (!mounted) return null;
  return (
    <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 50 }}>
      <Animated.View style={[{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: C.ink }, shade]}>
        <Press feedback={false} scaleTo={1} onPress={onClose} accessibilityLabel="Fechar menu" style={{ flex: 1 }} />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', left: 0, top: 0, height, width: DRAWER_W }, panel]}>
        <Sidebar role={role} route={route} width={DRAWER_W} />
      </Animated.View>
    </View>
  );
}
