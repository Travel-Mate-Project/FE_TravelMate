'use client';

import {useTripStore} from '@/store';
import dayjs from 'dayjs';
import {SubmitHandler, useForm} from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import {TimeInputProps} from '@/types';
import {useEffect} from 'react';
import {useRouter} from '@/i18n/routing';

export default function TripTimeConfigForm() {
  const dateAndTime = useTripStore.use.dateAndTime();
  const updateDateAndTime = useTripStore.use.updateDateAndTime();
  const router = useRouter();

  const {register, handleSubmit, reset} = useForm<TimeInputProps>();

  const handleSetTime: SubmitHandler<TimeInputProps> = (data) => {
    const result = Object.entries(data).map(([date, times]) => ({
      date,
      start: times.startTime,
      end: times.endTime,
    }));
    updateDateAndTime(result);
    router.push('/place');
  };
  // console.log('설정한 날짜와 시간', dateAndTime);

  useEffect(() => {
    reset();
  }, [dateAndTime, reset]);

  return (
    <form onSubmit={handleSubmit(handleSetTime)}>
      <table className={'w-full text-sm md:text-base'}>
        <thead>
          <tr className={'text-sm'}>
            <th>
              <span
                className={
                  'border border-solid border-black py-1 px-2 rounded-lg'
                }
              >
                일자
              </span>
            </th>
            <th>
              <span
                className={
                  'border border-solid border-black py-1 px-2 rounded-lg'
                }
              >
                요일
              </span>
            </th>
            <th>
              <span
                className={
                  'border border-solid border-black py-1 px-2 rounded-lg'
                }
              >
                시작시간
              </span>
            </th>
            <th>
              <span
                className={
                  'border border-solid border-black py-1 px-2 rounded-lg'
                }
              >
                종료시간
              </span>
            </th>
          </tr>
        </thead>
        <tbody className={'text-center'}>
          {dateAndTime.map((item) => (
            <tr key={item.date}>
              <td className={'py-3 font-bold'}>
                {dayjs(item.date).format('M/DD')}
              </td>
              <td className={'py-3'}>{dayjs(item.date).format('dd')}</td>
              <td className={'py-3'}>
                <input
                  {...register(
                    `${dayjs(item.date).format('YYYY-MM-DD')}.startTime`,
                  )}
                  type="time"
                  defaultValue={item.start}
                />
              </td>
              <td className={'py-2'}>
                <input
                  {...register(
                    `${dayjs(item.date).format('YYYY-MM-DD')}.endTime`,
                  )}
                  type="time"
                  defaultValue={item.end}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BasicButton classNames={'w-full my-5'} type="submit">
        시간 설정 완료
      </BasicButton>
    </form>
  );
}
