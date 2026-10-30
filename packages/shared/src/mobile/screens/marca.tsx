import React, { useState } from 'react';
import { Image, Platform, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BRAND_SWATCHES } from '../../data/mobile';
import { contrast, inkFor, okHex } from '../../lib/color';
import { haptic } from '../../lib/haptics';
import { canPickImage, pickImage } from '../../lib/pickImage';
import { Brand, DEFAULT_BRAND, useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { M, Button, Note, Press, QR, qrCells, Txt, useToast } from '../../ui';
import { StackScreen } from '../Layout';

const SMALL_QR = qrCells(3);

/** Rascunho da marca partilhado entre o telemóvel e o desktop. */
export function useBrandDraft() {
  const brand = useMuntu((s) => s.brand);
  const setBrand = useMuntu((s) => s.setBrand);
  const toast = useToast();
  const [d, setD] = useState<Brand>(brand);
  const [hex, setHex] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const c = okHex(d.c) ? d.c : DEFAULT_BRAND.c;
  const ratio = contrast(c);
  const patch = (o: Partial<Brand>) => {
    setD((x) => ({ ...x, ...o }));
    setSaved(false);
  };
  return {
    d,
    c,
    ink: inkFor(c),
    ratio,
    ratioL: `${ratio.toFixed(1)}:1`,
    low: ratio < 4.5,
    isDef: c === DEFAULT_BRAND.c,
    hex: hex ?? d.c,
    saved,
    pick: (col: string) => (patch({ c: col }), setHex(null)),
    setHex: (v: string) => {
      setHex(v);
      if (okHex(v)) patch({ c: v.toLowerCase() });
    },
    setName: (v: string) => patch({ name: v.toUpperCase().slice(0, 22) }),
    upload: async () => {
      if (!canPickImage) return toast('Carregar o logotipo fica disponível na versão web e na próxima versão da app.', 'info');
      const r = await pickImage('image/png,image/svg+xml,image/jpeg', 2 * 1024 * 1024);
      if (r === 'too-big') return toast('O ficheiro tem mais de 2 MB.', 'bad');
      if (r) patch({ logo: r });
    },
    rmLogo: () => patch({ logo: '' }),
    reset: () => (patch({ c: DEFAULT_BRAND.c }), setHex(null)),
    save: () => {
      setBrand({ ...d, c, name: d.name.trim() || DEFAULT_BRAND.name });
      setSaved(true);
      haptic('success');
    },
  };
}
export type BrandDraft = ReturnType<typeof useBrandDraft>;

/** Logotipo carregado (data URL) ou nome do ginásio. */
export function BrandMark({ logo, name, color, h = 22, w = 100, size = 9 }: { logo: string; name: string; color: string; h?: number; w?: number; size?: number }) {
  return logo ? <Image source={{ uri: logo }} style={{ height: h, width: w }} resizeMode="contain" accessibilityLabel="Logotipo do ginásio" /> : <Txt style={[type(size, 600, 0.2), { color }]}>{name}</Txt>;
}

/** Pré-visualização do cartão de acesso do membro com a marca escolhida. */
export function BrandPreview({ b, width = 220 }: { b: BrandDraft; width?: number }) {
  return (
    <View style={{ alignSelf: 'center', width, borderWidth: 1, borderColor: C.line, backgroundColor: C.paper, overflow: 'hidden', ...(Platform.OS === 'web' ? ({ boxShadow: '0 18px 40px -24px rgba(29,28,26,.45)' } as any) : { elevation: 6, shadowColor: C.ink, shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: 12 } }) }}>
      <View style={{ backgroundColor: b.c, paddingTop: 12, paddingHorizontal: 14, paddingBottom: 18, gap: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, minHeight: 22 }}>
          <BrandMark logo={b.d.logo} name={b.d.name} color={b.ink} />
          <Txt style={[type(7, 600, 0.2), { color: b.ink, opacity: 0.8 }]}>COM MUNTU</Txt>
        </View>
        <View style={{ gap: 3 }}>
          <Txt style={[type(7, 600, 0.22), { color: b.ink }]}>OLÁ, KÁTIA</Txt>
          <Txt style={[type(16, 400, 0.16), { color: b.ink }]}>O TEU ACESSO</Txt>
        </View>
      </View>
      <View style={{ padding: 14, alignItems: 'center', gap: 10 }}>
        <View style={{ padding: 6, backgroundColor: '#fff', borderWidth: 1, borderColor: C.line }}>
          <QR size={72} cells={SMALL_QR} />
        </View>
        <View style={{ alignSelf: 'stretch', height: 28, backgroundColor: b.c, alignItems: 'center', justifyContent: 'center' }}>
          <Txt style={[type(8, 600, 0.18), { color: b.ink }]}>RESERVAR PT</Txt>
        </View>
      </View>
    </View>
  );
}

/** Logotipo, nome, cor e contraste (blocos do formulário da marca). */
export function BrandForm({ b }: { b: BrandDraft }) {
  return (
    <>
      <View style={{ gap: 10 }}>
        <Txt v="eyebrow" c={C.muted}>
          Logotipo do ginásio
        </Txt>
        {b.d.logo ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: 1, borderColor: C.line, backgroundColor: '#fff' }}>
            <View style={{ width: 64, height: 48, backgroundColor: b.c, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: b.d.logo }} style={{ width: 56, height: 40 }} resizeMode="contain" accessibilityLabel="Logotipo" />
            </View>
            <Txt v="small" style={{ flex: 1 }}>
              Logotipo carregado
            </Txt>
            <Button label="Remover" kind="outline" size="sm" onPress={b.rmLogo} />
          </View>
        ) : (
          <Press feedback="select" scaleTo={0.99} onPress={b.upload} accessibilityLabel="Carregar logotipo" style={({ hovered }) => ({ height: 96, alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderStyle: 'dashed', borderColor: hovered ? C.ink : C.faint, backgroundColor: '#fff' })}>
            <Txt style={type(14, 500)}>Carregar logotipo</Txt>
            <Txt v="small" c={C.muted}>
              PNG ou SVG com fundo transparente
            </Txt>
          </Press>
        )}
        <Txt v="small" c={C.muted}>
          Sem logotipo, mostramos o nome do ginásio.
        </Txt>
      </View>
      <View style={{ gap: 8 }}>
        <Txt v="eyebrow" c={C.muted}>
          Nome na app
        </Txt>
        <TextInput value={b.d.name} onChangeText={b.setName} maxLength={22} autoCapitalize="characters" accessibilityLabel="Nome na app" style={[type(16, 400, 0.14), { height: 44, borderBottomWidth: 1, borderBottomColor: C.ink, color: C.ink, paddingVertical: 0 }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null]} />
      </View>
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Txt v="eyebrow" c={C.muted}>
            Cor de destaque
          </Txt>
          {b.isDef ? <Txt style={[type(11, 400), { color: C.muted }]}>Padrão MUNTU</Txt> : null}
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {BRAND_SWATCHES.map(([col, l]) => {
            const on = b.c === col;
            return (
              <Press key={col} feedback="select" onPress={() => b.pick(col)} accessibilityLabel={l} accessibilityState={{ selected: on }} style={{ flex: 1, aspectRatio: 1, padding: on ? 2 : 0, borderWidth: on ? 2 : 0, borderColor: C.ink }}>
                <View style={{ flex: 1, backgroundColor: col }} />
              </Press>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 44, height: 44, backgroundColor: b.c }} />
          <TextInput value={b.hex} onChangeText={b.setHex} autoCapitalize="none" autoCorrect={false} placeholder="#c8640c" placeholderTextColor={C.faint} accessibilityLabel="Cor em hexadecimal" style={[type(16, 400), { flex: 1, height: 44, borderBottomWidth: 1, borderBottomColor: C.ink, color: C.ink, paddingVertical: 0 }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null]} />
          <Txt tabular style={[type(12, 400), { color: C.muted }]}>
            {b.ratioL}
          </Txt>
        </View>
        {b.low ? <Note tone="warn" text="Contraste baixo. O texto sobre esta cor fica difícil de ler. Escolhe um tom mais escuro ou mais claro." /> : null}
        <Txt v="small" c={C.muted} style={{ lineHeight: 18 }}>
          A cor aparece no cartão de acesso e nos botões da app dos membros. A interface da equipa mantém as cores MUNTU.
        </Txt>
      </View>
    </>
  );
}

/** o13 · Marca do ginásio (o que os membros vêem na app). */
export function Marca() {
  const b = useBrandDraft();
  const insets = useSafeAreaInsets();
  return (
    <StackScreen
      back="Conta"
      eyebrow="O que os teus membros vêem"
      title="Marca"
      footer={
        <View style={{ paddingHorizontal: GUTTER, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 12) + 4, borderTopWidth: 1, borderTopColor: C.line, flexDirection: 'row', gap: 8, backgroundColor: C.paper }}>
          <Button label="Repor" kind="outline" size="lg" onPress={b.reset} />
          <Button label="Aplicar marca" size="lg" style={{ flex: 1 }} onPress={b.save} />
        </View>
      }
    >
      <View style={{ paddingHorizontal: GUTTER, paddingTop: 18, paddingBottom: 12, gap: 24 }}>
        <BrandPreview b={b} />
        <BrandForm b={b} />
        {b.saved ? (
          <Animated.View entering={M.pop()}>
            <Note tone="ok" text="Aplicado na app dos membros de todas as filiais." />
          </Animated.View>
        ) : null}
      </View>
    </StackScreen>
  );
}
