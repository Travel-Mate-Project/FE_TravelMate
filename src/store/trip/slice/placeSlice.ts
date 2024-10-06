import {StateCreator} from 'zustand';

import {PlaceSLice} from '@/types';

export const creatPlaceSlice: StateCreator<PlaceSLice> = (set) => ({
  city: '',
  cityCode: 0,
  setCity: (city) => set(() => ({city})),
  setCityCode: (cityCode: number) => set(() => ({cityCode})),
});
