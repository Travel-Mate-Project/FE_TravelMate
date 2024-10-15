import {StateCreator} from 'zustand';

import {SelectPlaceSlice} from '@/types';

export const creatSelectPlaceSlice: StateCreator<SelectPlaceSlice> = (set) => ({
  selectedPlace: [],
  addSelectedPlace: (place) =>
    set((state) => ({selectedPlace: [...state.selectedPlace, place]})),
  removeSelectedPlace: (id) =>
    set((state) => ({
      selectedPlace: state.selectedPlace.filter(
        (selected) => selected.id !== id,
      ),
    })),
  clearSelectedPlace: () => set(() => ({selectedPlace: []})),
});
