import dayjs from 'dayjs';
import {StateCreator} from 'zustand';

import {DateSlice} from '@/types';

export const createDateSlice: StateCreator<DateSlice> = (set) => ({
  date: [dayjs().toDate(), dayjs().toDate()],
  isSelected: false,
  setIsSelected: (isSelect) => set(() => ({isSelected: isSelect})),
  setDate: (date: [Date, Date]) => set(() => ({date: date})),
});
