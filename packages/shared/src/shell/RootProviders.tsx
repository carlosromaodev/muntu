import React, { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from '@expo-google-fonts/outfit';
import { ToastProvider } from '../ui/Overlay';
import { C } from '../theme/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

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
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
