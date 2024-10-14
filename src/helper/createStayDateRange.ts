import {StayItem} from '@/types';
import dayjs from 'dayjs';

export const createStayDateRange = (
  startDate: Date,
  endDate: Date,
): StayItem[] => {
  const dateArray: StayItem[] = [];
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);

  while (
    currentDate.isBefore(lastDate) ||
    currentDate.isSame(lastDate, 'day')
  ) {
    const stay: StayItem = {
      date: currentDate,
      isCheck: false,
      stay: null,
    };
    dateArray.push(stay);
    currentDate = currentDate.add(1, 'day');
  }

  return dateArray;
};
