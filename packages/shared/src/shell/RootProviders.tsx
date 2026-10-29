import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from '@expo-google-fonts/outfit';

SplashScreen.preventAutoHideAsync().catch(() => {});

/** Fonte Outfit (300/400/500/600, a mesma dos desenhos), área segura e ecrã de arranque. */
export function RootProviders({ children }: { children: React.ReactNode }) {
  const [loaded, error] = useFonts({ Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold });
  const ready = loaded || !!error;
  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fbfaf7' }}>{ready ? children : null}</View>
    </SafeAreaProvider>
  );
}
