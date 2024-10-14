'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import Plus from '@/asset/Add_round.svg';
import BasicButton from '@/components/BasicButton';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';

export default function AllocateStay() {
  const {selectedStay, stays, toggleStay, setAll, addSelectedStay} =
    useTripStore();
  const router = useRouter();
  console.log(stays);

  const handleAllocateStay = (date: dayjs.Dayjs) => {
    if (selectedStay) {
      toggleStay(date, selectedStay);
    }
  };

  const handleStayList = () => {
    if (selectedStay) {
      addSelectedStay(selectedStay);
      router.back();
    }
  };

  return (
    <div className={'flex flex-col items-center max-h-[calc(100vh-250px)]'}>
      <h2 className="font-bold mb-5">{selectedStay?.name}</h2>
      <div className="grid grid-cols-3 gap-4 flex-grow overflow-y-auto pb-5">
        {stays.map((stay, index) => (
          <div
            key={index}
            className="shadow-xl py-3 px-4 rounded-2xl flex flex-col items-center justify-between gap-2 min-h-40"
          >
            <p className="bg-black text-white px-3 py-2 rounded-full text-center">
              {stay.date.format('MM.DD')}
            </p>
            <button
              onClick={() => handleAllocateStay(stay.date)}
              className={`rounded-full p-1 flex items-center justify-center cursor-pointer bg-gray80`}
            >
              {stay.isCheck ? (
                <Image
                  className={'rounded-full'}
                  src={stay.stay?.imageUrl || 'https://placehold.co/47x47'}
                  alt={'stayImage'}
                  width={47}
                  height={47}
                />
              ) : (
                <Plus />
              )}
            </button>
            <p>숙소 선택</p>
          </div>
        ))}
      </div>
      <div className={'w-full'}>
        <BasicButton
          type={'button'}
          onClick={setAll}
          classNames={'mt-5 w-full px-3 py-3'}
          variant={'tertiary'}
        >
          전체 선택
        </BasicButton>
        <BasicButton
          onClick={handleStayList}
          type={'button'}
          classNames={'mt-5 w-full px-3 py-3 !mt-2'}
          variant={'secondary'}
        >
          완료
        </BasicButton>
      </div>
    </div>
  );
}
