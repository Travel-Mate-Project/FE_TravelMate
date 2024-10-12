'use client';

import React, {useState} from 'react';

import DragAndDropProvider from '@/app/[locale]/(main)/(plan)/_components/DragAndDropProvider';
import PlaceSelection from '@/app/[locale]/(main)/(plan)/_components/PlaceSelection';
import DragDown from '@/asset/Menu_Duo_LG.svg';
import BasicButton from '@/components/BasicButton';
import {useDragResize} from '@/hooks/useDragResize';
import {useTripStore} from '@/store';

export default function PlaceAndStayContainer() {
  const [select, setSelect] = useState<string>('place');
  const {totalHeight, mapHeight, totalTripTime, places} = useTripStore();
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const addPlace = useTripStore.use.addPlace();

  const contentHeight = totalHeight - mapHeight;

  const handleSelect = (value: string) => {
    setSelect(value);
  };

  // NOTICE: 테스트를 위한 함수 추후 삭제 예정
  const onAddPlaceTest = () => {
    addPlace({
      id: 3,
      name: 'test3',
      type: 'place',
      imageUrl: 'https://placehold.co/47x47',
      location: {lat: 33.289, lng: 126.3774},
    });
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
      <div style={{height: `${contentHeight}px`, overflow: 'auto'}}>
        <nav className={'flex items-center justify-center'}>
          <button
            onClick={() => handleSelect('place')}
            className={'flex-1 text-center relative'}
          >
            <span
              className={`inline-block py-2 ${select === 'place' ? 'text-green100' : ''}`}
            >
              장소
              <span
                className={`absolute bottom-0 left-1/2 w-[53px] h-0.5 bg-green100 transition-all duration-300 transform -translate-x-1/2 ${
                  select === 'place' ? 'opacity-100' : 'opacity-0'
                }`}
              ></span>
            </span>
          </button>
          <button
            onClick={() => handleSelect('stay')}
            className={'flex-1 text-center relative'}
          >
            <span
              className={`inline-block py-2 ${select === 'stay' ? 'text-green100' : ''}`}
            >
              숙소
              <span
                className={`absolute bottom-0 left-1/2 w-[53px] h-0.5 bg-green100 transition-all duration-300 transform -translate-x-1/2 ${
                  select === 'stay' ? 'opacity-100' : 'opacity-0'
                }`}
              ></span>
            </span>
          </button>
        </nav>
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
            onClick={onAddPlaceTest}
            classNames={'text-sm px-5 py-1.5'}
            type={'button'}
          >
            장소추가
          </BasicButton>
        </div>
        {places.length <= 0 ? (
          <div
            className={
              'w-full bg-gray80 p-3 h-24 mt-5 flex justify-center items-center rounded-lg'
            }
          >
            <p className={'text-sm text-gray200'}>장소를 선택해 주세요.</p>
          </div>
        ) : (
          <DragAndDropProvider>
            {select === 'place' ? <PlaceSelection /> : <div>숙소</div>}
          </DragAndDropProvider>
        )}
      </div>
      <BasicButton type={'button'} classNames={'w-full px-5 py-4 mb-5'}>
        일정 생성
      </BasicButton>
    </div>
  );
}
