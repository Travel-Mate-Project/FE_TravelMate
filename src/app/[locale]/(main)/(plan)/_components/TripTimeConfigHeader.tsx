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
      // TODO: 이후 커스텀 모달창으로 교체하기
      const result = confirm('일정을 바꾸면 시간을 다시 설정해야 합니다.');
      if (result) {
        router.push('/date');
      } else {
        return;
      }
    } else {
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
