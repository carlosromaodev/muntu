import { create } from 'zustand';
import type { FilKey } from '../data/desk';

/** Filial e turno escolhidos na barra lateral do desktop. */
export const useDesk = create<{ filial: 'todas' | FilKey; turno: 'manha' | 'tarde' | 'dia'; setFilial: (f: 'todas' | FilKey) => void; setTurno: (t: 'manha' | 'tarde' | 'dia') => void }>((set) => ({
  filial: 'todas',
  turno: 'manha',
  setFilial: (filial) => set({ filial }),
  setTurno: (turno) => set({ turno }),
}));
