import dayjs from 'dayjs';

import {StayItem} from '@/types';

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
      date: currentDate.toDate(),
      isCheck: false,
      stay: null,
    };
    dateArray.push(stay);
    currentDate = currentDate.add(1, 'day');
  }

  return dateArray;
};
