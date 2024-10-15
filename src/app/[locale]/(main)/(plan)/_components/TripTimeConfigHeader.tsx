'use client';

import dayjs from 'dayjs';

import Calender from '@/asset/calender.svg';
import {Link, usePathname, useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';

import 'dayjs/locale/ko';
import {ReactNode, useEffect} from 'react';

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
  const totalTripTime = useTripStore.use.totalTripTime();
  const path = usePathname();

  const changeDate = () => {
    if (path !== '/time') {
      router.push('/date');
    }
  };

  useEffect(() => {
    if (totalTripTime === '') {
      router.push('/time');
    }
  }, [totalTripTime, router]);

  return (
    <>
      <h2 className={'font-bold mb-1.5 md:text-lg'}>{region}</h2>
      <button
        onClick={changeDate}
        className={'flex items-center gap-1 text-xs md:text-sm text-gray700'}
      >
        <p>{dayjs(startDay).format('YYYY-MM-DD(dd)')} </p> -
        <p>{dayjs(endDay).format('YYYY-MM-DD(dd)')}</p>
        <Calender width={13} height={14} />
      </button>
      <div
        className={
          'flex items-center gap-3 mt-2 text-xs md:text-sm text-gray700'
        }
      >
        <Link href={'/time'}>
          <p>여행 상세 시간 설정</p>
        </Link>
        <span className={'text-green200'}>총 {totalTripTime || ''}</span>
      </div>
      {children}
    </>
  );
}
