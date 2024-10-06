import dayjs from 'dayjs';

import Calender from '@/asset/calender.svg';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import 'dayjs/locale/ko';

dayjs.locale('ko');
export default function TripTimeConfigHeader() {
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
      <div
        className={
          'bg-gray600 rounded-lg w-full p-3 my-4 mb-6 text-xs md:text-sm'
        }
      >
        <ul className={'list-disc pl-5'}>
          <li>
            입력하신 여행 기간이 시차를 고려한
            <strong>현지 여행 기간(여행지 도착 날짜, 여행지 출발 날짜)</strong>
            이 맞는지 확인해 주세요.
          </li>
          <li>
            각 날짜의 일정 <strong>시작시간</strong>과 <strong>종료시간</strong>
            을 현지 시간 기준으로 설정해 주세요.
          </li>
          <li>
            기본 설정 시간은 <strong>오전 10시~오후10시 총 12시간</strong>
            입니다.
          </li>
        </ul>
      </div>
    </>
  );
}
