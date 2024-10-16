'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';

import DragDown from '@/asset/Menu_Duo_LG.svg';
import BasicButton from '@/components/BasicButton';
import {useDragResize} from '@/hooks/useDragResize';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import {useOptimizeTrip} from '@/hooks/withQuery/post/useOptimizeTrip';

export default function TitleEdit() {
  const {
    totalHeight,
    mapHeight,
    places,
    region,
    date,
    stays,
    totalTripTime,
    setTitle,
  } = useTripStore();
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const router = useRouter();
  const contentHeight = totalHeight - mapHeight;
  const [startDate, endDate] = date;

  const [titleState, setTitleState] = useState<string>(`${region} 여행`);

  const {optimizeTripMutation} = useOptimizeTrip();

  const handleOptimize = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitle(titleState);
    const stay = stays
      .filter((item) => item.stay !== null)
      .map((item, index) => {
        return {
          ...item.stay!,
          day: index + 1,
          date: item.date,
        };
      });
    const finalData = {
      accommodations: stay,
      attractions: places,
    };

    optimizeTripMutation(finalData);
  };

  useEffect(() => {
    if (totalTripTime === '') {
      router.push('/time');
    }
  }, [totalTripTime, router]);

  return (
    <form onSubmit={handleOptimize} className="mx-auto w-full">
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
          value={titleState}
          onChange={(e) => setTitleState(e.target.value)}
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
        <BasicButton type={'submit'} classNames={'w-full mt-6 px-3 py-3'}>
          완료
        </BasicButton>
      </div>
    </form>
  );
}
