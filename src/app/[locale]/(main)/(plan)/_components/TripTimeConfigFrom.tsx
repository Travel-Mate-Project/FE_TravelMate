'use client';

import dayjs from 'dayjs';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import {TimeInputProps} from '@/types';

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
    if (dateAndTime.length <= 0) {
      router.replace('/');
    }
  }, [dateAndTime, reset]);

  return (
    <form
      className={
        'min-h-[calc(100vh-350px)] md:min-h-[calc(100vh-465px)] relative pb-16'
      }
      onSubmit={handleSubmit(handleSetTime)}
    >
      {dateAndTime.length > 0 ? (
        <table className={'w-full text-sm md:text-base'}>
          <thead>
            <tr className={'text-sm'}>
              <th className={'pb-2'}>
                <span
                  className={
                    'border border-solid border-gray200 py-1 px-2 rounded-lg whitespace-nowrap'
                  }
                >
                  일자
                </span>
              </th>
              <th className={'pb-2'}>
                <span
                  className={
                    'border border-solid border-gray200 py-1 px-2 rounded-lg whitespace-nowrap'
                  }
                >
                  요일
                </span>
              </th>
              <th className={'pb-2'}>
                <span
                  className={
                    'border border-solid border-gray200 py-1 px-7 rounded-lg whitespace-nowrap'
                  }
                >
                  시작시간
                </span>
              </th>
              <th className={'pb-2'}>
                <span
                  className={
                    'border border-solid border-gray200 py-1 px-7 rounded-lg whitespace-nowrap'
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
                <td className={'py-3 font-semibold'}>
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
      ) : (
        <div>리다이렉트중....</div>
      )}

      <BasicButton
        classNames={'w-full absolute -bottom-2 md:bottom-0'}
        type="submit"
      >
        시간 설정 완료
      </BasicButton>
    </form>
  );
}
