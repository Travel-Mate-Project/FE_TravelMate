'use client';

import React, {useEffect, useState} from 'react';

import DragAndDropProvider from '@/app/[locale]/(main)/(plan)/_components/DragAndDropProvider';
import PlaceSelectList from '@/app/[locale]/(main)/(plan)/_components/PlaceSelectList';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
import StaySelectList from '@/app/[locale]/(main)/(plan)/_components/StaySelectList';
import TransportationModal from '@/app/[locale]/(main)/(plan)/_components/TransportationModal';
import BasicButton from '@/components/BasicButton';
import {useDragResize} from '@/hooks/useDragResize';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import DragButton from '@/components/DragButton';
import HeightWrapper from '@/components/HeightWrapper';

export default function PlaceAndStayContainer() {
  const selectedItem = sessionStorage.getItem('NAV_SELECT');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState<string>(selectedItem || 'place');
  const {totalTripTime, places, stays, initializeStays} = useTripStore();
  const [startDay, endDay] = useTripStore.use.date();
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const router = useRouter();

  const placeLength = places.length;

  const handleAddRoute = () => {
    if (select === 'place') {
      router.push('/plan/add-place');
    } else {
      router.push('/plan/add-stay');
    }
  };

  const handleMakePlan = () => {
    const allStaysNotNull = stays.every((stay) => stay.stay !== null);
    if (!allStaysNotNull || places.length === 0) {
      alert('숙소와 장소를 모두 선택해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleSelect = (selected: string) => {
    sessionStorage.setItem('NAV_SELECT', selected);
    setSelect(selected);
  };

  useEffect(() => {
    const hasAnyStay = stays.some((stay) => stay.stay !== null);
    if (!hasAnyStay) {
      initializeStays(startDay, endDay);
    }
  }, []);

  return (
    <div className="mx-auto w-full">
      <DragButton
        handleMouseDown={handleMouseDown}
        handleTouchStart={handleTouchStart}
      />
      <HeightWrapper>
        <SelectNav
          selectOption={['place', 'stay']}
          name={['장소', '숙소']}
          select={select}
          setSelect={handleSelect}
        />
        <div className={'flex items-center justify-between pt-5'}>
          <div className={'flex items-center'}>
            <p className={'pr-4 font-bold text-xl'}>{placeLength}</p>
            <div className={'flex flex-col items-start text-xs gap-1.5'}>
              <button className={'text-green100'}>초기화</button>
              <p className={'text-gray700'}>
                {places.length * 2}시간 0분 / {totalTripTime}
              </p>
            </div>
          </div>
          <BasicButton
            onClick={handleAddRoute}
            classNames={'text-sm px-5 py-1.5'}
            type={'button'}
          >
            {select === 'place' ? '장소추가' : '숙소추가'}
          </BasicButton>
        </div>
        <DragAndDropProvider>
          {select === 'place' ? <PlaceSelectList /> : <StaySelectList />}
        </DragAndDropProvider>
      </HeightWrapper>
      <BasicButton
        onClick={handleMakePlan}
        type={'button'}
        classNames={'w-full px-5 py-4 mb-1 mt-5'}
      >
        일정 생성
      </BasicButton>
      <TransportationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
