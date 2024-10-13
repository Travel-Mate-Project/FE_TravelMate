import {StateCreator} from 'zustand';

import {PlaceSlice} from '@/types';

export const creatPlaceSlice: StateCreator<PlaceSlice> = (set) => ({
  places: [],
  addPlace: (place) => set((state) => ({places: [...state.places, place]})),
  removePlace: (id) =>
    set((state) => ({
      places: state.places.filter((p) => p.id !== id),
    })),
  updatePlace: (place) => set(() => ({places: place})),
  clearPlaces: () => set(() => ({places: []})),
});
