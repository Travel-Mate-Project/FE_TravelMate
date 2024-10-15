import dayjs from 'dayjs';
import {StateCreator} from 'zustand';

import {createStayDateRange} from '@/helper/createStayDateRange';
import {Location, StaySlice} from '@/types';

export const createStaySlice: StateCreator<StaySlice> = (set) => ({
  stays: [],
  selectedStay: null,
  initializeStays: (startDate: Date, endDate: Date) => {
    const dateArray = createStayDateRange(startDate, endDate);
    set({stays: dateArray});
  },
  toggleStay: (date: dayjs.Dayjs, stayLocation: Location) =>
    set((state) => ({
      stays: state.stays.map((stay) =>
        dayjs(stay.date).isSame(date, 'day')
          ? {
              ...stay,
              isCheck: !stay.isCheck,
              stay: stay.isCheck ? null : stayLocation,
            }
          : stay,
      ),
    })),
  addSelectedStay: (newStay: Location) => set(() => ({selectedStay: newStay})),
  removeSelectedStay: () => set({selectedStay: null}),
  setAll: () =>
    set((state) => ({
      stays: state.stays.map((stay) => ({
        ...stay,
        isCheck: !!state.selectedStay,
        stay: state.selectedStay,
      })),
    })),
  clearStays: () => set(() => ({stays: [], selectedStay: null})),
});
