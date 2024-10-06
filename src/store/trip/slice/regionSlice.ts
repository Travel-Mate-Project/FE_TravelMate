import {StateCreator} from 'zustand';

import {RegionSLice} from '@/types';

export const creatRegionSlice: StateCreator<RegionSLice> = (set) => ({
  region: '',
  regionCode: 0,
  setRegion: (region) => set(() => ({region})),
  setRegionCode: (regionCode: number) => set(() => ({regionCode})),
});
