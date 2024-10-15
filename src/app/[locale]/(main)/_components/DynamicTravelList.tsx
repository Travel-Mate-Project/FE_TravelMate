'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';

import PopularCourseList from '@/app/[locale]/(main)/_components/PopularCourseList';
import PopularPlaceList from '@/app/[locale]/(main)/_components/PopularPlaceList';
import {useGetPopularPlaceList} from '@/hooks/withQuery/get/useGetPopularPlaceList';
import {useGetCafeList} from '@/hooks/withQuery/get/useGetCafeList';

export default function DynamicTravelList() {
  const t = useTranslations('mainTravelList');
  const {placeList} = useGetPopularPlaceList();
  const {cafeList} = useGetCafeList();

  const [listType, setListType] = useState<
    'course' | 'place' | 'cafe' | 'restaurant' | 'stay'
  >('course');

  const listOptions = [
    'course',
    'place',
    'cafe',
    'restaurant',
    'stay',
  ] as const;

  return (
    <div className={'flex flex-col overflow-hidden'}>
      <div className={'mt-2'}>
        <div className={'flex items-center gap-2'}>
          {listOptions.map((option) => (
            <button
              key={option}
              onClick={() => setListType(option)}
              className={`
              ${listType === option ? 'bg-black text-white' : 'bg-white text-black'}
              rounded-2xl px-3 py-1 border border-solid border-gray200
            `}
              type={'button'}
            >
              {t(option)}
            </button>
          ))}
        </div>
      </div>
      {listType === 'course' && <PopularCourseList />}
      {listType === 'place' && <PopularPlaceList data={placeList} />}
      {listType === 'cafe' && <PopularPlaceList data={cafeList} />}
      {listType === 'restaurant' && <PopularPlaceList data={placeList} />}
      {listType === 'stay' && <PopularPlaceList data={placeList} />}
    </div>
  );
}
