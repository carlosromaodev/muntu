import m0001 from './0001_inicial.js';
import m0002 from './0002_operacao.js';

/** Migrações por ordem. Nunca alterar uma migração já aplicada: criar uma nova (RNF-71). */
export const MIGRATIONS: [string, string][] = [
  ['0001_inicial', m0001],
  ['0002_operacao', m0002],
];
