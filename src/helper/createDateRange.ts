import dayjs from 'dayjs';

export const createDateRange = (startDate: Date, endDate: Date) => {
  const dateArray: dayjs.Dayjs[] = [];
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);

  while (
    currentDate.isBefore(lastDate) ||
    currentDate.isSame(lastDate, 'day')
  ) {
    dateArray.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dateArray;
};
