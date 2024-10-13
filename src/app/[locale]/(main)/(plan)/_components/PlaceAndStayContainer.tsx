'use client';

import React, {useState} from 'react';

import DragAndDropProvider from '@/app/[locale]/(main)/(plan)/_components/DragAndDropProvider';
import PlaceSelectList from '@/app/[locale]/(main)/(plan)/_components/PlaceSelectList';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
import StaySelectList from '@/app/[locale]/(main)/(plan)/_components/StaySelectList';
import DragDown from '@/asset/Menu_Duo_LG.svg';
import BasicButton from '@/components/BasicButton';
import {useDragResize} from '@/hooks/useDragResize';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';

export default function PlaceAndStayContainer() {
  const [select, setSelect] = useState<string>('place');
  const {totalHeight, mapHeight, totalTripTime, places} = useTripStore();
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const router = useRouter();

  const contentHeight = totalHeight - mapHeight;
  const placeLength = places.length;

  const handleAddRoute = () => {
    if (select === 'place') {
      router.push('/plan/add-place');
    } else {
      router.push('/plan/add-stay');
    }
  };

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <button
        className="h-3 my-4 w-full flex items-center justify-center cursor-ns-resize touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <DragDown />
      </button>
      <div style={{maxHeight: `${contentHeight}px`, overflow: 'auto'}}>
        <SelectNav
          selectOption={['place', 'stay']}
          name={['장소', '숙소']}
          select={select}
          setSelect={setSelect}
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
      </div>
      <BasicButton type={'button'} classNames={'w-full px-5 py-4 mb-5 mt-10'}>
        일정 생성
      </BasicButton>
    </div>
  );
}
