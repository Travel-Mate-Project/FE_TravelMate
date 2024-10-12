'use client';

import React, {useState} from 'react';

import DragAndDropProvider from '@/app/[locale]/(main)/(plan)/_components/DragAndDropProvider';
import PlaceSelection from '@/app/[locale]/(main)/(plan)/_components/PlaceSelection';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
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
          select={select}
          setSelect={setSelect}
        />
        <div className={'flex items-center justify-between pt-5'}>
          <div className={'flex items-center'}>
            <p className={'pr-4 font-bold text-xl'}>0</p>
            <div className={'flex flex-col items-start text-xs gap-1.5'}>
              <button className={'text-green100'}>초기화</button>
              <p className={'text-gray700'}>
                {places.length * 2}시간 0분 / {totalTripTime}
              </p>
            </div>
          </div>
          <BasicButton
            onClick={() => router.push('/place/add')}
            classNames={'text-sm px-5 py-1.5'}
            type={'button'}
          >
            {select === 'place' ? '장소추가' : '숙소추가'}
          </BasicButton>
        </div>
        <DragAndDropProvider>
          {select === 'place' ? <PlaceSelection /> : <div>숙소</div>}
        </DragAndDropProvider>
      </div>
      <BasicButton type={'button'} classNames={'w-full px-5 py-4 mb-5 mt-10'}>
        일정 생성
      </BasicButton>
    </div>
  );
}
