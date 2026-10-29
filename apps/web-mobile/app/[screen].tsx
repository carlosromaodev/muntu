import { router, useLocalSearchParams } from 'expo-router';
import { MuntuApp } from '@muntu/shared';

/** Cada ecrã do MUNTU é uma rota: /recepcao, /caixa, /painel… (desktop) ou /acesso, /plano, /dono… (mobile). */
export default function Screen() {
  const { screen } = useLocalSearchParams<{ screen?: string }>();
  return <MuntuApp screen={screen} ui="mobile" onNavigate={(id) => router.navigate(`/${id}`)} />;
}
