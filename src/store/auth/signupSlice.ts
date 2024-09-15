import {StateCreator} from 'zustand';

export interface SignupSlice {
  stage: number;
  nextStage: (level: number) => void;
  previousStage: (level: number) => void;
}

export const createProfileSlice: StateCreator<SignupSlice> = (set) => ({
  stage: 1,
  nextStage: (stage) => stage + 1,
  previousStage: (stage) => stage - 1,
});
