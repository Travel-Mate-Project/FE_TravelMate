import {StateCreator} from 'zustand';

export interface SignupSlice {
  stage: number;
  // eslint-disable-next-line no-unused-vars
  nextStage: (stage: number) => void;
  // eslint-disable-next-line no-unused-vars
  previousStage: (stage: number) => void;
}

export const createProfileSlice: StateCreator<SignupSlice> = (set) => ({
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
});
