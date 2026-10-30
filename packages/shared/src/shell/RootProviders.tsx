import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from '@expo-google-fonts/outfit';
import { ToastProvider } from '../ui/Overlay';
import { KeyboardDoneBar } from '../ui/Keyboard';
import { C } from '../theme/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

/*
 * Web: transições de cor como nos protótipos (hover e selecção em 200 ms).
 * O React Native Web aplica estilos em linha; isto suaviza as mudanças.
 */
if (Platform.OS === 'web' && typeof document !== 'undefined' && !document.getElementById('muntu-motion')) {
  const st = document.createElement('style');
  st.id = 'muntu-motion';
  st.textContent = [
    '[role="button"],[role="link"],[role="tab"],[role="switch"],[role="checkbox"]{transition:background-color .2s ease,border-color .2s ease,box-shadow .2s ease,opacity .2s ease}',
    '[role="button"] [dir="auto"],[role="link"] [dir="auto"],[role="tab"] [dir="auto"]{transition:color .2s ease}',
    'input,textarea{transition:border-color .2s ease,box-shadow .2s ease}',
  ].join('\n');
  document.head.appendChild(st);
}

/** Fonte Outfit (300/400/500/600, a mesma dos desenhos), gestos, área segura, avisos breves e ecrã de arranque. */
export function RootProviders({ children }: { children: React.ReactNode }) {
  const [loaded, error] = useFonts({ Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold });
  const ready = loaded || !!error;
  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: C.paper }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <ToastProvider>
          <View style={{ flex: 1, backgroundColor: C.paper }}>{ready ? children : null}</View>
          <KeyboardDoneBar />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
