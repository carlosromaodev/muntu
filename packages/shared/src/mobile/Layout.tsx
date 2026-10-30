import React, { useCallback, useState } from 'react';
import { Platform, RefreshControl, ScrollView, ScrollViewProps, StyleProp, View, ViewStyle } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MuntuLogo } from '../brand/Logo';
import { Role, ROLE_INFO } from '../data/mobile';
import { haptic } from '../lib/haptics';
import { useMuntu } from '../store/useMuntu';
import { C, GUTTER, type } from '../theme/tokens';
import { Button, Dot, Icon, Press, timing, Txt } from '../ui';
import { home, HOME_LABEL, TABS } from './nav';

/** Cabeçalho dos separadores: logótipo + papel (toca para abrir o turno). */
export function TopBar({ role, right, bg = C.paper }: { role?: Role; right?: React.ReactNode; bg?: string }) {
  const router = useRouter();
  const onShift = useMuntu((s) => s.onShift);
  const insets = useSafeAreaInsets();
  const staff = role && role !== 'membro' && role !== 'dono';
  return (
    <View style={{ backgroundColor: bg, paddingTop: insets.top + 12, paddingHorizontal: GUTTER, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <MuntuLogo size={20} />
      {right ??
        (role && role !== 'membro' ? (
          <Press
            onPress={() => (staff ? router.push(`/${role}/turno` as any) : router.push('/filiais' as any))}
            accessibilityLabel={staff ? 'Abrir o meu turno' : 'Filiais'}
            style={{ height: 26, paddingHorizontal: 8, backgroundColor: role === 'dono' ? 'transparent' : C.ink, flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            {role === 'dono' ? (
              <Txt style={type(10, 600, 0.2, true)}>Filiais · 3 →</Txt>
            ) : (
              <>
                <Dot size={6} color={onShift ? C.ok : C.faint} />
                <Txt style={[type(9, 600, 0.2, true), { color: C.paper }]}>{ROLE_INFO[role].label}</Txt>
              </>
            )}
          </Press>
        ) : null)}
    </View>
  );
}

/** Título do ecrã: rótulo pequeno + título grande espaçado. */
export function TitleBlock({ eyebrow, title, size = 30, style, children, border = true, eyebrowColor = C.muted, titleRight }: { eyebrow?: string; title: string; size?: number; style?: StyleProp<ViewStyle>; children?: React.ReactNode; border?: boolean; eyebrowColor?: string; titleRight?: React.ReactNode }) {
  return (
    <View style={[{ paddingHorizontal: GUTTER, paddingTop: 12, paddingBottom: 18, gap: 6, borderBottomWidth: border ? 1 : 0, borderBottomColor: C.line }, style]}>
      {eyebrow ? (
        <Txt v="eyebrow" c={eyebrowColor}>
          {eyebrow}
        </Txt>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <Txt accessibilityRole="header" style={[type(size, 400, 0.18, true), { flexShrink: 1 }]} numberOfLines={2} adjustsFontSizeToFit>
          {title}
        </Txt>
        {titleRight}
      </View>
      {children}
    </View>
  );
}

/** Linha "← Voltar" usada nos ecrãs empilhados. */
export function BackLink({ label, onPress, right }: { label: string; onPress?: () => void; right?: React.ReactNode }) {
  const router = useRouter();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Press
        feedback="select"
        accessibilityLabel={`Voltar: ${label}`}
        onPress={onPress ?? (() => (router.canGoBack() ? router.back() : router.replace('/')))}
        style={{ height: 32, justifyContent: 'center' }}
        hitSlop={8}
      >
        <Txt v="eyebrow" c={C.muted}>
          ← {label}
        </Txt>
      </Press>
      {right}
    </View>
  );
}

/** Cabeçalho dos ecrãs empilhados: voltar + rótulo + título. */
export function StackHeader({ back, eyebrow, title, onBack, right, size, children }: { back: string; eyebrow?: string; title: string; onBack?: () => void; right?: React.ReactNode; size?: number; children?: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 4, paddingHorizontal: GUTTER, paddingBottom: 18, gap: 8, borderBottomWidth: 1, borderBottomColor: C.line, backgroundColor: C.paper }}>
      <BackLink label={back} onPress={onBack} right={right} />
      {eyebrow ? (
        <Txt v="eyebrow" c={C.muted}>
          {eyebrow}
        </Txt>
      ) : null}
      <Txt accessibilityRole="header" style={type(size ?? 30, 400, 0.18, true)} numberOfLines={2} adjustsFontSizeToFit>
        {title}
      </Txt>
      {children}
    </View>
  );
}

/** Voltar ao ecrã inicial do papel actual. */
export function useHome() {
  const role = useMuntu((s) => s.role) ?? 'rececao';
  const router = useRouter();
  return { label: HOME_LABEL[role], go: () => (router.canGoBack() ? router.back() : router.replace(home(role) as any)), role };
}

/** Corpo com scroll, puxar para actualizar e espaço para o rodapé. */
export function Page({ children, contentStyle, refresh = true, footer, ...rest }: ScrollViewProps & { children: React.ReactNode; contentStyle?: StyleProp<ViewStyle>; refresh?: boolean; footer?: React.ReactNode }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    haptic('select');
    setTimeout(() => setRefreshing(false), 700);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        refreshControl={refresh && Platform.OS !== 'web' ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.accent} colors={[C.accent]} /> : undefined}
        contentContainerStyle={[{ paddingBottom: 28 }, contentStyle]}
        {...rest}
      >
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}

/** Botão principal fixo no fundo (Continuar, Confirmar…). */
export function Footer({ label, onPress, disabled, loading, kind = 'solid', children }: { label?: string; onPress?: () => void; disabled?: boolean; loading?: boolean; kind?: 'solid' | 'accent'; children?: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingHorizontal: GUTTER, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 12) + 4, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.paper, gap: 8 }}>
      {children}
      {label ? <Button label={label} onPress={onPress} disabled={disabled} loading={loading} kind={kind} size="lg" full feedback="press" /> : null}
    </View>
  );
}

/** Secção com margem lateral do desenho. */
export function Section({ children, style, title, right, first }: { children?: React.ReactNode; style?: StyleProp<ViewStyle>; title?: string; right?: React.ReactNode; first?: boolean }) {
  return (
    <View style={[{ paddingHorizontal: GUTTER, paddingTop: first ? 16 : 20 }, style]}>
      {title ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 }}>
          <Txt style={type(12, 600, 0.2, true)}>{title}</Txt>
          {right}
        </View>
      ) : null}
      {children}
    </View>
  );
}

/** Cartão contornado com ponto, rótulo e seta (Agora no ginásio, Recuperação…). */
export function LinkCard({ dot, label, value, onPress, style }: { dot: string; label: string; value: string; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <Press onPress={onPress} accessibilityLabel={`${label}: ${value}`} style={({ hovered }) => [{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 16, borderWidth: 1, borderColor: C.ink, backgroundColor: hovered ? C.canvas : 'transparent' }, style]}>
      <Dot color={dot} />
      <View style={{ flex: 1, gap: 2 }}>
        <Txt v="label" c={C.muted}>
          {label}
        </Txt>
        <Txt style={type(15, 500)}>{value}</Txt>
      </View>
      <Txt style={type(16, 400)}>→</Txt>
    </Press>
  );
}

/** Barra de passos (onboarding, receber turno). */
export function Steps({ total, current }: { total: number; current: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={{ flex: 1, height: 4, backgroundColor: i + 1 < current ? C.ink : i + 1 === current ? C.accent : C.line }} />
      ))}
    </View>
  );
}

function TabItem({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  const w = useSharedValue(on ? 18 : 0);
  React.useEffect(() => {
    w.value = withTiming(on ? 18 : 0, timing(250));
  }, [on, w]);
  const bar = useAnimatedStyle(() => ({ width: w.value }));
  const fg = on ? C.ink : C.stone;
  return (
    <Press feedback="select" scaleTo={1} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={label} onPress={onPress} style={{ flex: 1, minWidth: 0, alignItems: 'center', justifyContent: 'center', gap: 7 }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' }}>
        <Animated.View style={[{ height: 2, backgroundColor: C.accent }, bar]} />
      </View>
      <Icon name={label} size={22} color={fg} />
      <Txt numberOfLines={1} style={[type(9, 600, 0.12, true), { color: fg, paddingHorizontal: 2 }]}>
        {label}
      </Txt>
    </Press>
  );
}

/** Barra de separadores do fundo: ícone de linha, rótulo e traço laranja no activo. */
export function RoleTabBar({ role }: { role: Role }) {
  const router = useRouter();
  const path = usePathname();
  const insets = useSafeAreaInsets();
  const tabs = TABS[role];
  const seg = path.split('/')[2] ?? tabs[0]!.route;
  const found = tabs.findIndex((t) => t.route === seg);
  return (
    <View accessibilityRole="tablist" style={{ height: 72 + insets.bottom, paddingBottom: insets.bottom, borderTopWidth: 1, borderTopColor: C.line, flexDirection: 'row', backgroundColor: C.paper }}>
      {tabs.map((t, i) => (
        <TabItem key={t.route} label={t.label} on={i === found} onPress={() => i !== found && router.navigate(`/${role}/${t.route}` as any)} />
      ))}
    </View>
  );
}

/** Ecrã de separador: cabeçalho com logótipo, título e corpo com scroll. */
export function TabScreen({ role, eyebrow, title, children, right, topRight, footer, headerExtra, titleRight }: { role: Role; eyebrow?: string; title: string; children: React.ReactNode; right?: React.ReactNode; topRight?: React.ReactNode; footer?: React.ReactNode; headerExtra?: React.ReactNode; titleRight?: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <TopBar role={role} right={topRight} />
      <TitleBlock eyebrow={eyebrow} title={title} titleRight={titleRight}>
        {right}
      </TitleBlock>
      {headerExtra}
      <Page footer={footer}>{children}</Page>
    </View>
  );
}

/** Ecrã empilhado: voltar, título e corpo com scroll. */
export function StackScreen({ back, eyebrow, title, children, footer, onBack, right, size, headerExtra, headerInner }: { back: string; eyebrow?: string; title: string; children: React.ReactNode; footer?: React.ReactNode; onBack?: () => void; right?: React.ReactNode; size?: number; headerExtra?: React.ReactNode; headerInner?: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.paper }}>
      <StackHeader back={back} eyebrow={eyebrow} title={title} onBack={onBack} right={right} size={size}>
        {headerInner}
      </StackHeader>
      {headerExtra}
      <Page footer={footer}>{children}</Page>
    </View>
  );
}
