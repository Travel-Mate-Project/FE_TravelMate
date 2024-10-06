import {StateCreator} from 'zustand';

import {SignupSlice} from '@/types';

export const createSignupSlice: StateCreator<SignupSlice> = (set) => ({
  stage: 1,
  nextStage: () =>
    set((state) => {
      if (state.stage < 2) {
        return {stage: state.stage + 1};
      }
      return {stage: state.stage};
    }),
  previousStage: () =>
    set((state) => {
      if (state.stage > 1) {
        return {stage: state.stage - 1};
      }
      return {stage: state.stage};
    }),
  clearStage: () => set(() => ({stage: 1})),
});
