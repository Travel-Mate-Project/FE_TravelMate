import dayjs from 'dayjs';

export const calculateTripDuration = (
  startDate: Date,
  endDate: Date,
): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const days = end.diff(start, 'day') + 1; // 종료일도 포함하므로 +1

  const nights = days - 1;

  return `${nights}박 ${days}일`;
};
