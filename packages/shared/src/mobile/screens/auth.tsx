import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MuntuMark } from '../../brand/Mark';
import { MuntuLogo } from '../../brand/Logo';
import { LOGIN_ROLE } from '../../data/mobile';
import { haptic } from '../../lib/haptics';
import { onlyDigits, phone } from '../../lib/format';
import { useMuntu } from '../../store/useMuntu';
import { C, GUTTER, type } from '../../theme/tokens';
import { M, Button, Field, Note, Press, Txt } from '../../ui';
import { home } from '../nav';

const hello = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 19 ? 'Boa tarde' : 'Boa noite';
};

/** l1 · Entrar (membros e equipa entram com o telemóvel; o prefixo define o papel no protótipo). */
export function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const signIn = useMuntu((s) => s.signIn);
  const [tel, setTel] = useState('923 481 220');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [forgot, setForgot] = useState(false);
  const [busy, setBusy] = useState(false);

  const entrar = () => {
    const t = onlyDigits(tel);
    if (t.length !== 9) return fail('O número tem 9 dígitos.');
    if (pw.length < 6) return fail('A senha tem pelo menos 6 caracteres.');
    const role = LOGIN_ROLE[t.slice(0, 3)] ?? 'membro';
    setBusy(true);
    setTimeout(() => {
      haptic('success');
      signIn(role);
      setBusy(false);
      setPw('');
      router.replace((role === 'rececao' ? '/receber-turno' : home(role)) as any);
    }, 450);
  };
  const fail = (m: string) => {
    haptic('error');
    setErr(m);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.paper }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View entering={M.fade(600)} pointerEvents="none" style={{ position: 'absolute', top: insets.top - 30, right: -120 }}>
        <MuntuMark variant="C" color={C.sand} size={320} />
      </Animated.View>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + 12, paddingHorizontal: GUTTER, paddingBottom: insets.bottom + 12 }}>
        <MuntuLogo size={20} />
        <View style={{ flex: 1, minHeight: 120 }} />
        <Animated.View entering={M.enter(120)} style={{ gap: 26, paddingBottom: 8 }}>
          <View style={{ gap: 10 }}>
            <Txt v="eyebrow" c={C.muted}>
              {hello()}
            </Txt>
            <Txt accessibilityRole="header" style={type(40, 400, 0.18, true)}>
              Entrar
            </Txt>
          </View>
          <Field
            label="Número de telemóvel"
            prefix="+244"
            big
            value={tel}
            onChangeText={(v) => {
              setTel(phone(v));
              setErr('');
            }}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="tel"
            returnKeyType="next"
          />
          <Field
            label="Senha"
            big
            value={pw}
            placeholder="••••••••"
            secureTextEntry={!show}
            onChangeText={(v) => {
              setPw(v);
              setErr('');
            }}
            textContentType="password"
            autoComplete="password"
            returnKeyType="go"
            onSubmitEditing={entrar}
            right={
              <Press feedback="select" onPress={() => setShow((v) => !v)} hitSlop={8}>
                <Txt style={[type(10, 600, 0.18, true), { color: C.muted }]}>{show ? 'Ocultar' : 'Mostrar'}</Txt>
              </Press>
            }
          />
          {err ? <Note tone="bad" text={err} /> : null}
          {forgot ? <Note text="Pede à recepção do teu ginásio para repor a senha. Recebes uma senha temporária no telemóvel." /> : null}
          <View style={{ gap: 14, alignItems: 'center' }}>
            <Button label="Entrar" size="lg" full onPress={entrar} loading={busy} feedback="press" style={{ alignSelf: 'stretch' }} />
            <Press feedback="select" onPress={() => setForgot((v) => !v)}>
              <Txt style={[type(13, 400), { color: '#9a4c08' }]}>Esqueci a senha</Txt>
            </Press>
          </View>
          <Animated.View entering={M.fade(260, 400)}>
            <Txt v="tiny" c={C.faint} align="center">
              Protótipo: 923 membro · 924 recepção · 925 finanças · 926 PT · 927 dono
            </Txt>
          </Animated.View>
        </Animated.View>
        <Press onPress={() => router.push('/criar-conta' as any)} style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: C.line, marginTop: 12 }}>
          <Txt style={type(13, 400)}>Tens um ginásio? Cria a conta</Txt>
          <Txt style={[type(13, 400), { color: '#9a4c08' }]}>→</Txt>
        </Press>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
