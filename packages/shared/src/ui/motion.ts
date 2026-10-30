import { Platform } from 'react-native';
import { Easing, FadeIn, FadeInDown, FadeInUp, FadeOut, LinearTransition, ReduceMotion } from 'react-native-reanimated';

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
 * Só animações predefinidas do Reanimated (FadeInDown/FadeInUp) com a duração e
 * a curva do desenho. Evitam dois problemas: na web, as entradas personalizadas
 * (Keyframe, withInitialValues) acabam em position:absolute; no iOS (Expo Go),
 * são o caminho menos testado das animações de entrada.
 */

/**
 * Animações de entrada/saída (layout animations) só na web por agora. No iOS
 * (Expo Go, SDK 58) a app fechava logo ao abrir; estas são a parte nativa mais
 * frágil do Reanimated. No nativo ficam os toques, interruptores, indicadores,
 * folhas, barras e as transições de ecrã, que já são nativas.
 */
const ENTERING = Platform.OS === 'web';

/** Entrada de bloco (mIn): aparece e sobe ligeiramente. */
export const enter = (delay = 0) => !ENTERING ? undefined : FadeInDown.duration(DUR.enter).easing(EASE).delay(Math.min(delay, 160)).reduceMotion(RM);

/** Mensagem de estado / confirmação (mPop): desce ligeiramente e aparece. */
export const pop = (delay = 0) => !ENTERING ? undefined : FadeInUp.duration(DUR.pop).easing(EASE).delay(delay).reduceMotion(RM);

/** Só opacidade. */
export const fade = (ms: number = DUR.color, delay = 0) => !ENTERING ? undefined : FadeIn.duration(ms).delay(delay).easing(EASE).reduceMotion(RM);
export const fadeOut = (ms = 140) => !ENTERING ? undefined : FadeOut.duration(ms).reduceMotion(RM);

/** Reorganização de listas (itens que entram/saem). */
export const layout = () => !ENTERING ? undefined : LinearTransition.duration(220).easing(EASE).reduceMotion(RM);

/** Configuração para withTiming. */
export const timing = (duration: number = DUR.color) => ({ duration, easing: EASE, reduceMotion: RM });
