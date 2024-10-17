import {StateCreator} from 'zustand';

import {MapSlice} from '@/types';

export const creatMapSLice: StateCreator<MapSlice> = (set) => ({
  minMapHeight: 0,
  maxMapHeight: 380,
  mapHeight: 250,
  setMapHeight: (height) =>
    set((state) => ({
      mapHeight: Math.min(
        Math.max(height, state.minMapHeight),
        state.maxMapHeight,
      ),
    })),
});
