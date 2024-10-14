import {StateCreator} from 'zustand';

import {StayItem, StaySlice} from '@/types';
import {createStayDateRange} from '@/helper/createStayDateRange';

export const createStaySlice: StateCreator<StaySlice> = (set) => ({
  stays: [],
  initializeStays: (startDate: Date, endDate: Date) => {
    const dateArray = createStayDateRange(startDate, endDate);
    set({stays: dateArray});
  },
  addStay: (newStay: StayItem) =>
    set((state) => ({
      stays: state.stays.map((stay) =>
        stay.date.isSame(newStay.date, 'day')
          ? {...newStay, isCheck: !stay.isCheck}
          : stay,
      ),
    })),
  removeStay: (id: number) =>
    set((state) => ({
      stays: state.stays.map((stay) =>
        stay.stay?.id === id ? {...stay, isCheck: false, stay: null} : stay,
      ),
    })),
  setAll: (newStays: StayItem[]) => set(() => ({stays: newStays})),
  clearStays: () => set(() => ({stays: []})),
});
