import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Mapa de vibração do MUNTU.
 *
 * | Momento                                              | Tipo      |
 * |------------------------------------------------------|-----------|
 * | Mudar de separador, chip, interruptor                | select    |
 * | Botões normais                                       | tap       |
 * | Cobrar, abrir caixa, criar tarefa                    | press     |
 * | Segurar para aprovar — a cada passo / antes do Face ID | select / heavy |
 * | Aprovado, pagamento recebido, turno recebido, caixa certo | success |
 * | Diferença no caixa, divergência no turno, pedido ao dono | warning |
 * | Pagamento recusado, biometria falhou, pedido recusado | error     |
 */
export type HapticKind = 'select' | 'tap' | 'press' | 'heavy' | 'success' | 'warning' | 'error';

const WEB_PATTERN: Record<HapticKind, number | number[]> = {
  select: 6,
  tap: 10,
  press: 18,
  heavy: 30,
  success: [12, 60, 18],
  warning: [24, 80, 24],
  error: [30, 60, 30, 60, 30],
};

export function haptic(kind: HapticKind = 'tap') {
  try {
    if (Platform.OS === 'web') {
      const nav: any = typeof navigator !== 'undefined' ? navigator : null;
      if (nav && typeof nav.vibrate === 'function') nav.vibrate(WEB_PATTERN[kind]);
      return;
    }
    switch (kind) {
      case 'select':
        Haptics.selectionAsync();
        break;
      case 'tap':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'press':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch {
    // A vibração nunca deve bloquear uma acção.
  }
}
