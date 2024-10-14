'use client';

import React, {useEffect} from 'react';

import Plus from '@/asset/Add_round.svg';
import {createStayDateRange} from '@/helper/createStayDateRange';
import {useTripStore} from '@/store';
import {useRouter} from '@/i18n/routing';

export default function StaySelectList() {
  const {initializeStays, stays} = useTripStore();
  const [startDay, endDay] = useTripStore.use.date();
  const router = useRouter();

  const dateRange = createStayDateRange(startDay, endDay);

  useEffect(() => {
    initializeStays(startDay, endDay);
  }, []);

  console.log(stays);

  return (
    <div className={'flex flex-col gap-3 mt-8 p-3'}>
      {dateRange.map((stay, index) => (
        <div
          key={stay.date.toString()}
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
            onClick={() => router.push('/plan/add-stay')}
            className={`rounded-full p-1 flex items-center justify-center cursor-pointer bg-gray80`}
          >
            <Plus />
          </button>
          <div className={'flex flex-col'}>
            <p className={'text-green100 font-lg'}>
              {stay.date.format('MM.DD(dd)')}
            </p>
            <p className={'text-gray300 text-sm'}>숙소를 추가해 주세요.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
