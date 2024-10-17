import Image from 'next/image';
import React from 'react';

import HeartIcon from '@/asset/Heart.svg';
import {convertTypeLang} from '@/helper/convertTypeLang';
import {ResultItemProps} from '@/types';

export default function ResultItem({
  place,
  index,
  dayColor,
  duration,
  accumulatedTime,
}: ResultItemProps) {
  return (
    <>
      <div
        className={
          'py-5 px-5 flex items-center justify-between rounded-2xl bg-white shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]'
        }
      >
        <div className={'flex items-center gap-3'}>
          <div
            style={{backgroundColor: dayColor}}
            className={`h-7 w-7 rounded-full flex items-center justify-center text-white`}
          >
            {index + 1}
          </div>
          <Image
            className={'rounded-full'}
            src={place.imageUrl}
            alt={'placeImage'}
            width={47}
            height={47}
          />
          <div>
            <span
              style={{
                backgroundColor: convertTypeLang(place.type).color,
              }}
              className={'py-0.5 px-1.5 bg-blue-400 text-white rounded text-xs'}
            >
              {convertTypeLang(place.type).name}
            </span>
            <p className={'font-semibold'}>{place.name}</p>
          </div>
        </div>
        <HeartIcon className={'cursor-pointer'} />
      </div>
      <div className={'flex items-center gap-3'}>
        {duration && (
          <p
            className={
              'bg-gray100 rounded text-gray300 w-11 text-sm text-center my-2 ml-2'
            }
          >
            {duration}분
          </p>
        )}
        {accumulatedTime && (
          <p className={'text-xs text-gray200 text-center my-2 mr-2 px-2'}>
            {accumulatedTime}
          </p>
        )}
      </div>
    </>
  );
}
