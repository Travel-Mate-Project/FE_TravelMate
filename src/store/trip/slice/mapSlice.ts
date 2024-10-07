import {StateCreator} from 'zustand';
import {MapSlice} from '@/types';

export const creatMapSLice: StateCreator<MapSlice> = (set) => ({
  totalHeight: 800,
  minMapHeight: 200,
  maxMapHeight: 600,
  mapHeight: 230,
  setMapHeight: (height) =>
    set((state) => ({
      mapHeight: Math.min(
        Math.max(height, state.minMapHeight),
        state.maxMapHeight,
      ),
    })),
});
