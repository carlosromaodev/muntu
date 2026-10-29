import { router, useLocalSearchParams } from 'expo-router';
import { MuntuApp, isScreenId } from '@muntu/shared';

/** Cada ecrã do MUNTU é uma rota: /recepcao, /caixa, /painel, /acesso… */
export default function Screen() {
  const { screen } = useLocalSearchParams<{ screen?: string }>();
  return <MuntuApp screen={isScreenId(screen) ? screen : 'recepcao'} navMode="auto" onNavigate={(id) => router.navigate(`/${id}`)} />;
}
