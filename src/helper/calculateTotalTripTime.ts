import dayjs from 'dayjs';

import {DateAndTimeProp, TimeInputProps} from '@/types';

export const calculateTotalTripTime = (
  input: DateAndTimeProp[] | TimeInputProps,
) => {
  let totalMinutes = 0;

  const isDateAndTimePropArray = (input: any): input is DateAndTimeProp[] => {
    return Array.isArray(input) && input.length > 0 && 'date' in input[0];
  };

  const calculateDuration = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    let duration = end.diff(start, 'minute');
    if (duration < 0) {
      duration += 24 * 60;
    }
    return duration;
  };

  if (isDateAndTimePropArray(input)) {
    // DateAndTimeProp[] 타입 처리
    input.forEach((item) => {
      const startTime = dayjs(`${item.date} ${item.start}`);
      const endTime = dayjs(`${item.date} ${item.end}`);
      totalMinutes += calculateDuration(startTime, endTime);
    });
  } else {
    // TimeInputProps 타입 처리
    Object.entries(input).forEach(([date, times]) => {
      const startTime = dayjs(`${date} ${times.startTime}`);
      const endTime = dayjs(`${date} ${times.endTime}`);
      totalMinutes += calculateDuration(startTime, endTime);
    });
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {hours, minutes};
};
