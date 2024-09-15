import {create, StateCreator} from 'zustand';
import {createProfileSlice, SignupSlice} from '@/store/auth/signupSlice';

export interface AuthStore extends SignupSlice {}

export const createAuthStore: StateCreator<AuthStore> = (...a) => ({
  ...createProfileSlice(...a),
});

export const useAuthStore = create<AuthStore>()((...a) => ({
  ...createAuthStore(...a),
}));
