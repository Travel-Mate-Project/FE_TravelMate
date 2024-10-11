import {StateCreator} from 'zustand';

import {PlaceSlice} from '@/types';

export const creatPlaceSlice: StateCreator<PlaceSlice> = (set) => ({
  places: [
    {
      id: 1,
      name: 'test',
      type: 'place',
      imageUrl: 'https://placehold.co/4x47',
      location: {lat: 33.5067, lng: 126.493},
    },
    {
      id: 2,
      name: 'test2',
      type: 'place',
      imageUrl: 'https://placehold.co/4x47',
      location: {lat: 33.4587, lng: 126.9426},
    },
  ],
  addPlace: (place) => set((state) => ({places: [...state.places, place]})),
  removePlace: (place) =>
    set((state) => ({
      places: state.places.filter((p) => p.id !== place.id),
    })),
  updatePlace: (place) => set(() => ({places: place})),
  clearPlaces: () => set(() => ({places: []})),
});
