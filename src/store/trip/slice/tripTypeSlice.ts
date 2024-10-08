import {StateCreator} from 'zustand';

import {TripTypeSlice} from '@/types';

export const creatTripTypeSlice: StateCreator<TripTypeSlice> = (set) => ({
  type: 'alone',
  setType: (type: string) => set(() => ({type: type})),
});
