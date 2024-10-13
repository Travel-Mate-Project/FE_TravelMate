'use client';

import React from 'react';

import Plus from '@/asset/Add_round.svg';
import {createDateRange} from '@/helper/createDateRange';
import {useTripStore} from '@/store';

export default function StaySelectList() {
  const [startDay, endDay] = useTripStore.use.date();

  const dateRange = createDateRange(startDay, endDay);

  return (
    <div className={'flex flex-col gap-3 mt-10 p-3'}>
      {dateRange.map((date, index) => (
        <div
          key={date.toString()}
          className={`py-3 px-5 flex items-center rounded-2xl bg-white
       shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)] gap-4`}
        >
          <div
            className={
              'rounded-full bg-gray300 text-white h-[30px] w-[30px] flex items-center justify-center font-semibold'
            }
          >
            {index + 1}
          </div>
          <button
            className={`rounded-full p-1 flex items-center justify-center cursor-pointer bg-gray80`}
          >
            <Plus />
          </button>
          <div className={'flex flex-col'}>
            <p className={'text-green100 font-lg'}>
              {date.format('MM.DD(dd)')}
            </p>
            <p className={'text-gray300 text-sm'}>숙소를 추가해 주세요.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
