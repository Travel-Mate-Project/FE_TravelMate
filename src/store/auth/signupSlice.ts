import {StateCreator} from 'zustand';

export interface SignupSlice {
  stage: number;
  // eslint-disable-next-line no-unused-vars
  nextStage: (stage: number) => void;
  // eslint-disable-next-line no-unused-vars
  previousStage: (stage: number) => void;
  clearStage: () => void;
}

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
