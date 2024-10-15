import {TransportationSlice} from '@/types';
import {StateCreator} from 'zustand';

export const creatTransportSlice: StateCreator<TransportationSlice> = (
  set,
) => ({
  transportation: '',
  setTransportation: (type: string) => set(() => ({transportation: type})),
});
