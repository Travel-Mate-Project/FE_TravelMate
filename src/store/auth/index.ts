import {create, StateCreator} from 'zustand';

import {createSignupSlice, SignupSlice} from '@/store/auth/signupSlice';

export interface AuthStore extends SignupSlice {}

export const createAuthStore: StateCreator<AuthStore> = (...a) => ({
  ...createSignupSlice(...a),
});

export const useAuthStore = create<AuthStore>()((...a) => ({
  ...createAuthStore(...a),
}));
