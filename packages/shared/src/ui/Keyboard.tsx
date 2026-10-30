import React from 'react';
import { InputAccessoryView, Keyboard, Platform, View } from 'react-native';
import { C, type } from '../theme/tokens';
import { Press } from './Press';
import { Txt } from './Txt';

/**
 * Barra "Concluído" por cima do teclado no iOS. O teclado numérico do iPhone não
 * tem tecla de confirmar; esta barra recolhe o teclado para se ver o botão
 * principal do ecrã. No Android a tecla ✓ e o botão voltar já o fazem.
 */
export const DONE_ID = 'muntu-teclado-concluido';

/** Props a juntar a qualquer TextInput para ter a barra "Concluído" no iOS. */
export const doneBar = Platform.OS === 'ios' ? { inputAccessoryViewID: DONE_ID } : {};

export function KeyboardDoneBar() {
  if (Platform.OS !== 'ios') return null;
  return (
    <InputAccessoryView nativeID={DONE_ID} backgroundColor={C.canvas}>
      <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: C.line }}>
        <Press feedback="select" onPress={() => Keyboard.dismiss()} accessibilityLabel="Recolher teclado" hitSlop={8} style={{ height: 44, justifyContent: 'center', paddingHorizontal: 6 }}>
          <Txt style={[type(12, 600, 0.16, true), { color: C.ink }]}>Concluído</Txt>
        </Press>
      </View>
    </InputAccessoryView>
  );
}
