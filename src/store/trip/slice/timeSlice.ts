import dayjs from 'dayjs';
import {StateCreator} from 'zustand';

import {TimeProp, TimeSlice} from '@/types';

const DEFAULT_START_TIME = '10:00';
const DEFAULT_END_TIME = '22:00';

export const createTimeSlice: StateCreator<TimeSlice> = (set) => ({
  dateAndTime: [],

  initializeTime: (startDate, endDate) =>
    set(() => {
      const diff = dayjs(endDate).diff(startDate, 'day');
      const initialTime: TimeProp[] = [];
      for (let i = 0; i < diff; i++) {
        initialTime.push({
          date: dayjs(startDate).add(i, 'day').format('YYYY.MM.DD'),
          start: DEFAULT_START_TIME,
          end: DEFAULT_END_TIME,
        });
      }
      return {dateAndTime: initialTime};
    }),

  setTime: (date: string, start: string, end: string) =>
    set((state) => {
      const updatedTime = state.dateAndTime.map((t) =>
        t.date === date ? {...t, start, end} : t,
      );
      return {dateAndTime: updatedTime};
    }),

  clearTime: () => set({dateAndTime: []}),
});
