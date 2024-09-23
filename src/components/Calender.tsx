'use client';

import dayjs, {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import Calendar from 'react-calendar';

import LeftButton from '@/asset/leftButton.svg';
import RightButton from '@/asset/rightButton.svg';
import BasicButton from '@/components/BasicButton';
import {useRouter} from '@/i18n/routing';
import {useDateStore} from '@/store';

export default function EnhancedCalendar() {
  const router = useRouter();
  const {setDate, setIsSelected} = useDateStore();
  const [range, setRange] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs().add(3, 'day'),
  ]);

  const tileClassName = ({date, view}: {date: Date; view: string}) => {
    if (view === 'month') {
      const start = range[0];
      const end = range[1];
      const currentDate = dayjs(date);
      const classes: string[] = [];

      if (currentDate.isSame(start, 'day')) {
        classes.push('relative bg-green50 text-white rounded-l-full');
      }
      if (currentDate.isSame(end, 'day')) {
        classes.push('relative bg-green200 text-white rounded-r-full');
      }
      if (
        currentDate.isAfter(start, 'day') &&
        currentDate.isBefore(end, 'day')
      ) {
        classes.push('bg-green100 text-white');
      }

      return classes.join(' ');
    }
    return null;
  };

  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setRange([dayjs(start), dayjs(end)]);
  };

  const handleRangeChange = (value: Date) => {
    const clickedDate = dayjs(value);
    const [startDay, endDay] = range;
    if (startDay.isSame(startDay, 'day')) {
      setRange([clickedDate, clickedDate]);
    } else {
      const newRange = [endDay, clickedDate].sort(
        (a, b) => b.valueOf() - a.valueOf(),
      ) as [Dayjs, Dayjs];
      setRange(newRange);
    }
  };

  const handleSetDate = () => {
    const [start, end] = range;
    setDate([start.toDate(), end.toDate()]);
    setIsSelected(true);
    router.back();
  };

  return (
    <div className={'min-h-full flex flex-col'}>
      <div className={'flex flex-col items-center'}>
        <Calendar
          onChange={(value) => handleDateChange(value as [Date, Date])}
          locale="ko-KR"
          tileClassName={tileClassName}
          nextLabel={<RightButton />}
          prevLabel={<LeftButton />}
          next2Label={null}
          prev2Label={null}
          selectRange={true}
          formatMonthYear={(locale, date) => {
            const year = dayjs(date).format('YYYY');
            const month = dayjs(date).format('MM');
            return `${year} . ${month}`;
          }}
          formatShortWeekday={(locale, date) =>
            ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
          }
          formatDay={(locale, date) => dayjs(date).format('D')}
          onClickDay={(value: Date) => handleRangeChange(value)}
        />
      </div>
      <BasicButton
        type={'button'}
        onClick={handleSetDate}
        classNames={
          'w-[calc(100%-48px)] absolute bottom-12 left-1/2 transform -translate-x-1/2'
        }
      >
        확인
      </BasicButton>
    </div>
  );
}
