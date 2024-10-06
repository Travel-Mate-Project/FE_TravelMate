'use client';

import {useTripStore} from '@/store';
import dayjs from 'dayjs';

export default function TripTimeConfigFrom() {
  const dateAndTime = useTripStore.use.dateAndTime();

  return (
    <form>
      <table className={'w-full'}>
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
              <td>{dayjs(item.date).format('M/DD')}</td>
              <td>{dayjs(item.date).format('dd')}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
