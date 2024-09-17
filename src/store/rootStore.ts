import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {AuthStore, createAuthStore} from '@/store/auth';

export interface RootStore extends AuthStore {}

export const useStore = create<RootStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthStore(...a),
      }),
      {name: 'root-store'},
    ),
  ),
);
