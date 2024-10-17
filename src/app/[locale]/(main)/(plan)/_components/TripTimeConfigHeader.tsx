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
      const change = confirm(
        '날짜를 변경하면 기존에 입력한 시간과 숙소가 초기화됩니다. 변경하시겠습니까?',
      );
      if (change) {
        router.push('/date');
      } else {
        return;
      }
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
          <p>여행 상세 시간</p>
        </Link>
        <Link href={'/time'}>
          <span className={'text-green200'}>총 {totalTripTime || ''}</span>
        </Link>
      </div>
      {children}
    </>
  );
}
