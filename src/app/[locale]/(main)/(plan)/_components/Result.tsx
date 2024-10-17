'use client';

import dayjs from 'dayjs';
import React from 'react';

import ResultItem from '@/app/[locale]/(main)/(plan)/_components/ResultItem';
import ResultList from '@/app/[locale]/(main)/(plan)/_components/ResultList';
import DragButton from '@/components/DragButton';
import HeightWrapper from '@/components/HeightWrapper';
import {DAY_COLOR} from '@/constants/colors';
import {calculateTripDuration} from '@/helper/calculateTripDuration';
import {useDragResize} from '@/hooks/useDragResize';
import {ResultPageProps} from '@/types';

export default function Result({optimizedPlan, isLoading}: ResultPageProps) {
  const {handleMouseDown, handleTouchStart} = useDragResize();

  const getDayColor = (index: number) => {
    return DAY_COLOR[index];
  };

  const calculateCumulativeTimes = (
    startTime: string,
    travelTimes: number[],
  ): string[] => {
    let currentTime = dayjs(`1970-01-01 ${startTime}`);

    return travelTimes.map((duration) => {
      currentTime = currentTime.add(duration, 'minute');
      return currentTime.format('HH:mm');
    });
  };

  const cumulativeTravelTimes = optimizedPlan.optimizedTrip.map(
    (_day, index) => {
      const startTime = optimizedPlan.dateAndTime[index].start;
      return calculateCumulativeTimes(
        startTime,
        optimizedPlan.dailyTravelTimes[index],
      );
    },
  );

  return (
    <>
      <DragButton
        handleMouseDown={handleMouseDown}
        handleTouchStart={handleTouchStart}
      />
      <HeightWrapper>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={'flex flex-col w-full h-full'}>
            <div className={'flex justify-between items-center font-bold'}>
              <p>일정 편집</p>
              <button type={'button'}>편집</button>
            </div>
            <div className={'flex flex-col items-center px-2 py-4'}>
              <div
                className={
                  'w-full mt-5 p-3 rounded-2xl shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]'
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
            <div className={'space-y-6'}>
              {optimizedPlan.optimizedTrip.map((day, index) => (
                <ResultList
                  key={`day-${day[index]?.id}${index}`}
                  index={index}
                  startTime={optimizedPlan.dateAndTime[index].start}
                  date={dayjs(optimizedPlan.dateAndTime[index].date).format(
                    'YYYY-MM-DD(dd)',
                  )}
                >
                  {day.map((place, i) => (
                    <React.Fragment key={`place-${place.id}${i} `}>
                      <ResultItem
                        dayColor={getDayColor(index)}
                        place={place}
                        duration={optimizedPlan.dailyTravelTimes[index][i]}
                        accumulatedTime={cumulativeTravelTimes[index][i]}
                        index={i}
                      />
                    </React.Fragment>
                  ))}
                </ResultList>
              ))}
            </div>
          </div>
        )}
      </HeightWrapper>
    </>
  );
}
