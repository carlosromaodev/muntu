import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Confirmação biométrica (Face ID / impressão digital) para aprovações sensíveis.
 * Sem biometria configurada (ou na web) a acção segue sem bloqueio.
 */
export async function confirmBiometric(reason: string): Promise<boolean> {
  if (Platform.OS === 'web') return true;
  try {
    const [hw, enrolled] = await Promise.all([LocalAuthentication.hasHardwareAsync(), LocalAuthentication.isEnrolledAsync()]);
    if (!hw || !enrolled) return true;
    const r = await LocalAuthentication.authenticateAsync({ promptMessage: reason, cancelLabel: 'Cancelar', disableDeviceFallback: false });
    return r.success;
  } catch {
    return true;
  }
}
