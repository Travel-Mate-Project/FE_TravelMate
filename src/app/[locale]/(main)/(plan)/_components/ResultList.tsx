import React from 'react';

import {ResultListProps} from '@/types';

export default function ResultList({
  children,
  date,
  startTime,
  index,
}: ResultListProps) {
  return (
    <div className={'flex flex-col w-full px-1.5 py-4 rounded-xl '}>
      <div
        className={
          'flex justify-between items-center mb-2 sticky top-0 bg-white'
        }
      >
        <p className={'text-xl font-bold'}>{index + 1}일</p>
        <p className={'text-gray-600 text-sm'}>{date}</p>
      </div>
      <p
        className={
          'py-3 px-5 mb-3 flex items-center justify-center font-bold rounded-2xl bg-white shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]'
        }
      >
        시작 {startTime}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
