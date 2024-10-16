'use client';

import React from 'react';

import DragDown from '@/asset/Menu_Duo_LG.svg';
import {useDragResize} from '@/hooks/useDragResize';
import {useTripStore} from '@/store';
import {ResultPageProps} from '@/types';
import {calculateTripDuration} from '@/helper/calculateTripDuration';

export default function Result({optimizedPlan, isLoading}: ResultPageProps) {
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const mapHeight = useTripStore.use.mapHeight();
  const totalHeight = useTripStore.use.totalHeight();
  const contentHeight = totalHeight - mapHeight;

  return (
    <div>
      <button
        className="h-3 my-4 w-full flex items-center justify-center cursor-ns-resize touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <DragDown />
      </button>
      <div style={{maxHeight: `${contentHeight}px`, overflow: 'auto'}}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={'flex flex-col w-full'}>
            <div className={'flex justify-between items-center font-bold'}>
              <p>일정 편집</p>
              <button type={'button'}>편집</button>
            </div>
            <div className={'flex flex-col items-center px-2 py-4'}>
              <div
                className={
                  'w-full mt-5 p-3 shadow-lg rounded-2xl shadow-black/20'
                }
              >
                <div className={'border-b border-solid border-green100'}>
                  <h2 className={'text-green100 font-bold text-xl'}>
                    여행 요약
                  </h2>
                </div>
                <div className={'flex flex-col items-center justify-center'}>
                  <table className={'w-[80%] text-center mt-3'}>
                    <tbody>
                      <tr>
                        <td className={'font-semibold'}>총 여행 기간</td>
                        <td>
                          {calculateTripDuration(
                            optimizedPlan.startDate,
                            optimizedPlan.endDate,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className={'font-semibold'}>여행 지역</td>
                        <td>{optimizedPlan.region}</td>
                      </tr>
                      <tr>
                        <td className={'font-semibold'}>총 여행 거리</td>
                        <td>{optimizedPlan.totalTripDistance}Km</td>
                      </tr>
                      <tr>
                        <td className={'font-semibold'}>여행지 수</td>
                        <td>{optimizedPlan.totalAttractions}개</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
