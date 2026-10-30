import { Platform } from 'react-native';
import { Easing, FadeIn, FadeInDown, FadeInUp, FadeOut, Keyframe, LinearTransition, ReduceMotion } from 'react-native-reanimated';

/**
 * Movimento da MUNTU, calibrado pelos protótipos: curto, uma só curva
 * (cubic-bezier(.2,.7,.2,1)), sem molas nem ressaltos. Respeita a opção
 * "reduzir movimento" do sistema.
 *
 * Cada função devolve um animador novo (os animadores do Reanimated são
 * mutáveis, por isso não se partilham entre componentes).
 */
export const EASE = Easing.bezier(0.2, 0.7, 0.2, 1);
const RM = ReduceMotion.System;

export const DUR = { press: 110, color: 200, enter: 420, pop: 380, sheet: 320, bar: 600, fill: 800 } as const;

/*
 * Nativo: Keyframe com os valores exactos do desenho.
 * Web: só animações predefinidas (FadeInDown/FadeInUp). No Reanimated 4 para web,
 * qualquer entrada personalizada (Keyframe ou withInitialValues) acaba com o
 * elemento em position:absolute depois de animar, e as linhas sobrepõem-se.
 */
const WEB = Platform.OS === 'web';

/** Entrada de bloco (mIn): aparece e sobe 14 px. */
export const enter = (delay = 0) =>
  WEB
    ? FadeInDown.duration(DUR.enter).easing(EASE).delay(Math.min(delay, 160)).reduceMotion(RM)
    : new Keyframe({
    0: { opacity: 0, transform: [{ translateY: 14 }] },
    100: { opacity: 1, transform: [{ translateY: 0 }], easing: EASE },
  })
    .duration(DUR.enter)
    .delay(Math.min(delay, 160))
    .reduceMotion(RM);

/** Mensagem de estado / confirmação (mPop): desce 8 px e aparece. */
export const pop = (delay = 0) =>
  WEB
    ? FadeInUp.duration(DUR.pop).easing(EASE).delay(delay).reduceMotion(RM)
    : new Keyframe({
    0: { opacity: 0, transform: [{ translateY: -8 }] },
    100: { opacity: 1, transform: [{ translateY: 0 }], easing: EASE },
  })
    .duration(DUR.pop)
    .delay(delay)
    .reduceMotion(RM);

/** Só opacidade. */
export const fade = (ms: number = DUR.color, delay = 0) => FadeIn.duration(ms).delay(delay).easing(EASE).reduceMotion(RM);
export const fadeOut = (ms = 140) => FadeOut.duration(ms).reduceMotion(RM);

/** Reorganização de listas (itens que entram/saem). */
export const layout = () => LinearTransition.duration(220).easing(EASE).reduceMotion(RM);

/** Configuração para withTiming. */
export const timing = (duration: number = DUR.color) => ({ duration, easing: EASE, reduceMotion: RM });
