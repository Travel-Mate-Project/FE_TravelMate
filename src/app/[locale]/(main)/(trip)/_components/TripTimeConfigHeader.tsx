'use client';

import dayjs from 'dayjs';

import Calender from '@/asset/calender.svg';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import 'dayjs/locale/ko';
import {ReactNode} from 'react';

dayjs.locale('ko');
export default function TripTimeConfigHeader({
  children,
}: {
  children?: ReactNode;
}) {
  const {
    date: [startDay, endDay],
    region,
  } = useTripStore();
  const router = useRouter();
  return (
    <>
      <h2 className={'font-bold mb-1.5 md:text-lg'}>{region}</h2>
      <button
        onClick={() => router.push('/date')}
        className={'flex items-center gap-1 text-xs md:text-sm text-gray700'}
      >
        <p>{dayjs(startDay).format('YYYY-MM-DD(dd)')} </p> -
        <p>{dayjs(endDay).format('YYYY-MM-DD(dd)')}</p>
        <Calender width={13} height={14} />
      </button>
      <div className={'mt-2 text-xs md:text-sm text-gray700'}>
        <p>여행 상세 시간 설정</p>
      </div>
      {children}
    </>
  );
}
