'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';

import DragDown from '@/asset/Menu_Duo_LG.svg';
import BasicButton from '@/components/BasicButton';
import {useDragResize} from '@/hooks/useDragResize';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';

export default function TitleEdit() {
  const {totalHeight, mapHeight, places, region, date, totalTripTime} =
    useTripStore();
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const router = useRouter();
  const contentHeight = totalHeight - mapHeight;
  const [startDate, endDate] = date;

  const [title, setTitle] = useState<string>(`${region} 여행`);

  useEffect(() => {
    if (totalTripTime === '') {
      router.push('/time');
    }
  }, [totalTripTime, router]);

  return (
    <div className="mx-auto w-full">
      <button
        className="h-3 my-4 w-full flex items-center justify-center cursor-ns-resize touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <DragDown />
      </button>
      <div style={{maxHeight: `${contentHeight}px`, overflow: 'auto'}}>
        <input
          className={
            'w-full  border-b border-solid border-green100 font-semibold focus:outline-none mt-4'
          }
          type={'text'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => router.push('/date')}
          className={
            'w-full  border-b border-solid border-green100 font-semibold text-left pt-4'
          }
          type={'button'}
        >
          {dayjs(startDate).format('YYYY-MM-DD')} ~&nbsp;
          {dayjs(endDate).format('YYYY-MM-DD')}
        </button>
        <h3 className={'font-semibold my-4'}>선택한 장소 {places.length}</h3>
        <div className={'flex items-center gap-3'}>
          {places.map((place) => (
            <figure
              onClick={() => router.back()}
              key={place.id}
              className={
                'flex flex-col items-center justify-center cursor-pointer'
              }
            >
              <picture>
                <Image
                  className={'rounded-full'}
                  src={place.imageUrl}
                  alt={'placeImage'}
                  width={47}
                  height={47}
                />
              </picture>
              <figcaption className="pl-1 text-xs max-w-[47px] overflow-hidden text-ellipsis whitespace-nowrap">
                {place.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <BasicButton type={'button'} classNames={'w-full mt-6 px-3 py-3'}>
          완료
        </BasicButton>
      </div>
    </div>
  );
}
