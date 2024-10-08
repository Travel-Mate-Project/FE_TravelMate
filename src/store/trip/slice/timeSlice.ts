import dayjs from 'dayjs';
import {StateCreator} from 'zustand';

import {DateAndTimeProp, TimeSlice} from '@/types';

const DEFAULT_START_TIME = '10:00';
const DEFAULT_END_TIME = '22:00';

export const createTimeSlice: StateCreator<TimeSlice> = (set) => ({
  dateAndTime: [],
  totalTripTime: '',

  initializeTime: (startDate, endDate) =>
    set(() => {
      const diff = dayjs(endDate).diff(startDate, 'day');
      const initialTime: DateAndTimeProp[] = [];
      for (let i = 0; i <= diff; i++) {
        initialTime.push({
          date: dayjs(startDate).add(i, 'day').format('YYYY-MM-DD'),
          start: DEFAULT_START_TIME,
          end: DEFAULT_END_TIME,
        });
      }
      return {dateAndTime: initialTime};
    }),

  updateDateAndTime: (updatedDateAndTime) =>
    set({dateAndTime: updatedDateAndTime}),

  updateSingleDateAndTime: (date, start, end) =>
    set((state) => ({
      dateAndTime: state.dateAndTime.map((item) =>
        item.date === date ? {...item, start, end} : item,
      ),
    })),

  updateTotalTripTime: (totalTripTime) => set(() => ({totalTripTime})),

  clearTime: () => set({dateAndTime: []}),
  clearTotalTripTime: () => set({totalTripTime: ''}),
});
