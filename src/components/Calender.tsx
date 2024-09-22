'use client';

import React, {useState} from 'react';
import Calendar from 'react-calendar';
import dayjs, {Dayjs} from 'dayjs';
import {useDateStore} from '@/store';
import {useRouter} from '@/i18n/routing';
import BasicButton from '@/components/BasicButton';
import RightButton from '@/asset/rightButton.svg';
import LeftButton from '@/asset/leftButton.svg';

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
      if (currentDate.isSame(start, 'day')) {
        return 'bg-green50 text-white rounded-l-lg';
      }
      if (currentDate.isSame(end, 'day')) {
        return 'bg-green200 text-white rounded-r-lg';
      }
      if (
        currentDate.isAfter(start, 'day') &&
        currentDate.isBefore(end, 'day')
      ) {
        return 'bg-green100 text-white';
      }
    }
    return null;
  };

  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setRange([dayjs(start), dayjs(end)]);
  };

  const handleRangeChange = (value: Date) => {
    const clickedDate = dayjs(value);
    if (range[0].isSame(range[0], 'day')) {
      setRange([clickedDate, clickedDate]);
    } else {
      const newRange = [range[1], clickedDate].sort(
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
            const month = dayjs(date).format('M');
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
