import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export type BiometricResult = 'ok' | 'failed' | 'cancelled' | 'unavailable';

/**
 * Pede Face ID / impressão digital antes de uma acção que não se desfaz.
 * Devolve `unavailable` na web e em aparelhos sem biometria configurada —
 * aí o chamador decide (por agora confirma; próximo passo: PIN do gestor).
 */
export async function confirmBiometric(reason: string): Promise<BiometricResult> {
  if (Platform.OS === 'web') return 'unavailable';
  try {
    const [hasHw, enrolled] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
    ]);
    if (!hasHw || !enrolled) return 'unavailable';
    const r = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false,
    });
    if (r.success) return 'ok';
    return r.error === 'user_cancel' || r.error === 'system_cancel' || r.error === 'app_cancel' ? 'cancelled' : 'failed';
  } catch {
    return 'unavailable';
  }
}
