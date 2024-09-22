import {create, StateCreator} from 'zustand';

import {createDateSlice, DateSlice} from '@/store/date/dateSlice';

export interface DateStore extends DateSlice {}

export const createDateStore: StateCreator<DateStore> = (...a) => ({
  ...createDateSlice(...a),
});

export const useDateStore = create<DateStore>()((...a) => ({
  ...createDateStore(...a),
}));
