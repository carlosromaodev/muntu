import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from '@expo-google-fonts/outfit';
import { useTheme } from '../theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

/** Fontes Outfit, área segura e ecrã de arranque. Usado no _layout de cada app. */
export function RootProviders({ children }: { children: React.ReactNode }) {
  const [loaded, error] = useFonts({ Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold });
  const ready = loaded || !!error;
  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);
  return (
    <SafeAreaProvider>
      <Background>{ready ? children : null}</Background>
    </SafeAreaProvider>
  );
}

function Background({ children }: { children: React.ReactNode }) {
  const { c } = useTheme();
  return <View style={{ flex: 1, backgroundColor: c.bg }}>{children}</View>;
}
