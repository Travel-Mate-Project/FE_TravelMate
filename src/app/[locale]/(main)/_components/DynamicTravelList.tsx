'use client';

import {useState} from 'react';
import PopularCourseList from '@/app/[locale]/(main)/_components/PopularCourseList';
import PopularPlaceList from '@/app/[locale]/(main)/_components/PopularPlaceList';
import {useTranslations} from 'next-intl';

export default function DynamicTravelList() {
  const t = useTranslations('mainTravelList');

  const [listType, setListType] = useState<'course' | 'place'>('course');

  return (
    <div className={'flex flex-col overflow-hidden'}>
      <div className={'mt-2'}>
        <div className={'flex items-center gap-2'}>
          <button
            onClick={() => setListType('course')}
            className={`${
              listType === 'course'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            } rounded-2xl px-3 py-1 border border-solid border-black`}
            type={'button'}
          >
            {t('course')}
          </button>
          <button
            onClick={() => setListType('place')}
            className={`${
              listType === 'place'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            } rounded-2xl px-3 py-1 border border-solid border-black`}
            type={'button'}
          >
            {t('place')}
          </button>
        </div>
      </div>
      {listType === 'course' && <PopularCourseList />}
      {listType === 'place' && <PopularPlaceList />}
    </div>
  );
}
