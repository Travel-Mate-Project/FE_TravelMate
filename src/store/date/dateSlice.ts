import {StateCreator} from 'zustand';
import dayjs from 'dayjs';

export interface DateSlice {
  date: [Date, Date];
  isSelected: boolean;
  setIsSelected: (isSelect: boolean) => void;
  setDate: (date: [Date, Date]) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set) => ({
  date: [dayjs().toDate(), dayjs().toDate()],
  isSelected: false,
  setIsSelected: (isSelect) => set(() => ({isSelected: isSelect})),
  setDate: (date: [Date, Date]) => set(() => ({date: date})),
});
