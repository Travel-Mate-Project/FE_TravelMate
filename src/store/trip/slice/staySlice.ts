import {StateCreator} from 'zustand';
import {Location, StaySlice} from '@/types';
import {createStayDateRange} from '@/helper/createStayDateRange';
import dayjs from 'dayjs';

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
        stay.date.isSame(date, 'day')
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
