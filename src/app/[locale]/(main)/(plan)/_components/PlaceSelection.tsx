'use client';

import Image from 'next/image';

import DndCard from '@/app/[locale]/(main)/(plan)/_components/DndCard';
import {useDroppableList} from '@/hooks/useDroppableList';
import {useTripStore} from '@/store';
import {Location} from '@/types';

export default function PlaceSelection() {
  const places = useTripStore.use.places();
  const updatePlace = useTripStore.use.updatePlace();
  const removePlace = useTripStore.use.removePlace();

  const {droppableRef} = useDroppableList('PLACE');

  return (
    <div
      className={'flex flex-col mt-5 gap-3 px-3 overflow-visible'}
      ref={droppableRef}
    >
      {places?.map((place: Location, index) => (
        <DndCard
          key={place.id}
          items={places}
          id={place.id}
          updateItem={updatePlace}
          removeItem={removePlace}
          accept={'PLACE'}
        >
          <div className={'flex gap-3 items-center'}>
            <div
              className={
                'rounded-full bg-gray300 text-white h-[30px] w-[30px] flex items-center justify-center font-semibold'
              }
            >
              {index + 1}
            </div>
            <div className={'flex gap-2'}>
              <Image
                className={'rounded-full'}
                src={place.imageUrl}
                alt={'placeImage'}
                width={47}
                height={47}
              />
              <div>
                <p>{place.name}</p>
                <div className={'flex items-center gap-2'}>
                  <p className={'text-green100'}>
                    {place.type === 'place' ? '여행지' : '숙소'}
                  </p>
                  <span className={'text-gray200 text-xs'}>2시간</span>
                </div>
              </div>
            </div>
          </div>
        </DndCard>
      ))}
    </div>
  );
}
