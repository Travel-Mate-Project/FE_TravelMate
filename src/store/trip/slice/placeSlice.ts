import {StateCreator} from 'zustand';

import {PlaceSlice} from '@/types';

export const creatPlaceSlice: StateCreator<PlaceSlice> = (set) => ({
  places: [],
  addPlace: (place) => set((state) => ({places: [...state.places, place]})),
  removePlace: (place) =>
    set((state) => ({
      places: state.places.filter((p) => p.id !== place.id),
    })),
  updatePlace: (place) => set(() => ({places: place})),
  clearPlaces: () => set(() => ({places: []})),
});
