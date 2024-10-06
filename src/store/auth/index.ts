import {create, StateCreator} from 'zustand';

import {createSignupSlice} from '@/store/auth/signupSlice';
import {createSelectors} from '@/store/creatSelectors';
import {SignupSlice} from '@/types';

export interface AuthStore extends SignupSlice {}

export const createAuthStore: StateCreator<AuthStore> = (...a) => ({
  ...createSignupSlice(...a),
});

export const authStoreBase = create<AuthStore>()((...a) => ({
  ...createAuthStore(...a),
}));

export const useAuthStore = createSelectors(authStoreBase);
