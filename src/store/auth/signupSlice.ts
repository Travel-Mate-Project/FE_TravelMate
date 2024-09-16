import {StateCreator} from 'zustand';

export interface SignupSlice {
  stage: number;
  nextStage: (level: number) => void;
  previousStage: (level: number) => void;
}

export const createProfileSlice: StateCreator<SignupSlice> = (set) => ({
  stage: 1,
  nextStage: () =>
    set((state) => {
      if (state.stage < 3) {
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
});
