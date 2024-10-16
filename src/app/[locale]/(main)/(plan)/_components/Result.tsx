'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

import HeartIcon from '@/asset/Heart.svg';
import DragDown from '@/asset/Menu_Duo_LG.svg';
import {DAY_COLOR} from '@/constants/colors';
import {calculateTripDuration} from '@/helper/calculateTripDuration';
import {convertTypeLang} from '@/helper/convertTypeLang';
import {useDragResize} from '@/hooks/useDragResize';
import {useTripStore} from '@/store';
import {ResultPageProps} from '@/types';

export default function Result({optimizedPlan, isLoading}: ResultPageProps) {
  const {handleMouseDown, handleTouchStart} = useDragResize();
  const mapHeight = useTripStore.use.mapHeight();
  const totalHeight = useTripStore.use.totalHeight();
  const contentHeight = totalHeight - mapHeight;

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
    <div>
      <button
        className={
          'h-3 my-4 w-full flex items-center justify-center cursor-ns-resize touch-none'
        }
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
                <div
                  className={'flex flex-col w-full px-1.5 py-4 rounded-xl '}
                  key={`day-${day[index]?.id}${index}`}
                >
                  <div className={'flex justify-between items-center mb-2'}>
                    <p className={'text-xl font-bold'}>{index + 1}일</p>
                    <p className={'text-gray-600 text-sm'}>
                      {dayjs(optimizedPlan.dateAndTime[index].date).format(
                        'YYYY-MM-DD(dd)',
                      )}
                    </p>
                  </div>
                  <p
                    className={
                      'py-3 px-5 mb-3 flex items-center justify-center font-bold rounded-2xl bg-white shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]'
                    }
                  >
                    시작 {optimizedPlan.dateAndTime[index].start}
                  </p>
                  <div className="space-y-3">
                    {day.map((place, i) => (
                      <div key={`place-${place.id}${i} `}>
                        <div
                          className={
                            'py-5 px-5 flex items-center justify-between rounded-2xl bg-white shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]'
                          }
                        >
                          <div className={'flex items-center gap-3'}>
                            <div
                              style={{backgroundColor: getDayColor(index)}}
                              className={`h-7 w-7 rounded-full flex items-center justify-center text-white`}
                            >
                              {i + 1}
                            </div>
                            <Image
                              className={'rounded-full'}
                              src={place.imageUrl}
                              alt={'placeImage'}
                              width={47}
                              height={47}
                            />
                            <div>
                              <span
                                style={{
                                  backgroundColor: convertTypeLang(place.type)
                                    .color,
                                }}
                                className={
                                  'py-0.5 px-1.5 bg-blue-400 text-white rounded text-xs'
                                }
                              >
                                {convertTypeLang(place.type).name}
                              </span>
                              <p className={'font-semibold'}>{place.name}</p>
                            </div>
                          </div>
                          <HeartIcon className={'cursor-pointer'} />
                        </div>
                        <div className={'flex items-center gap-3'}>
                          {optimizedPlan.dailyTravelTimes[index][i] && (
                            <p
                              className={
                                'bg-gray100 rounded text-gray300 w-11 text-sm text-center my-2 ml-2'
                              }
                            >
                              {optimizedPlan.dailyTravelTimes[index][i]}분
                            </p>
                          )}
                          {cumulativeTravelTimes[index][i] && (
                            <p
                              className={
                                'text-xs text-gray200 text-center my-2 mr-2 px-2'
                              }
                            >
                              {cumulativeTravelTimes[index][i]}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
