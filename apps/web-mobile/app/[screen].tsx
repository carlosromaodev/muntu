import { useLocalSearchParams } from 'expo-router';
import { MuntuApp } from '@muntu/shared';

/**
 * Abre o protótipo no ecrã pedido: /d6?role=dono (desktop) ou /m1, /r1?role=rececao (mobile).
 * Sem ecrã, começa no ecrã de entrada do desenho.
 */
export default function Screen() {
  const { screen, role } = useLocalSearchParams<{ screen?: string; role?: string }>();
  return <MuntuApp ui="mobile" screen={screen} role={role} />;
}
