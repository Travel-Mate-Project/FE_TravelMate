'use client';

import Image from 'next/image';

import Plus from '@/asset/Add_round.svg';
import Check from '@/asset/check.svg';
import Comment from '@/asset/message.svg';
import RateStar from '@/asset/Star.svg';
import {convertTypeLang} from '@/helper/convertTypeLang';
import {useTripStore} from '@/store';
import {SelectCardProps, StayItem} from '@/types';
import {useRouter} from '@/i18n/routing';

export default function SelectCard({info, variant}: SelectCardProps) {
  const {
    addSelectedPlace,
    removeSelectedPlace,
    selectedPlace,
    addSelectedStay,
    stays,
  } = useTripStore();
  const isSelect = selectedPlace.some((place) => place.id === info.id);
  const removePlace = useTripStore.use.removePlace();
  const router = useRouter();

  const handleAddCard = (stayId?: number) => {
    if (variant === 'place' && !stayId) {
      if (isSelect) {
        removeSelectedPlace(info.id);
        removePlace(info.id);
      } else {
        addSelectedPlace(info);
      }
    }

    if (variant === 'stay' && stayId) {
      addSelectedStay(info);
      router.push(`/allocate-stay`);
    }
  };

  const isStaySelected = (stays: StayItem[], infoId: number): boolean => {
    return stays.some((stay) => stay.stay?.id === infoId);
  };

  return (
    <div
      className={`py-3 px-5 flex items-center justify-center rounded-2xl bg-white
       shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]`}
    >
      <div className={'w-full flex items-center justify-between'}>
        <div className={'flex items-center gap-3'}>
          <Image
            className={'rounded-full'}
            src={info.imageUrl}
            alt={'placeImage'}
            width={47}
            height={47}
          />
          <div className={'flex flex-col'}>
            <p className={'font-bold'}>{info.name}</p>
            <div className={'flex items-center gap-1'}>
              <p className={'font-semibold text-gray300'}>
                {convertTypeLang(info.type)}
              </p>
              <div className={'flex items-center gap-0.5 text-sm text-gray200'}>
                <RateStar className={'w-4 h-4 ml-1'} />
                <span>{info.averageRating}</span>
                <Comment className={'w-4 h-4 ml-1 pt-0.5'} />
                <span>{info.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {variant === 'place' ? (
            <button
              onClick={() => handleAddCard()}
              className={`rounded-full p-1 flex items-center justify-center cursor-pointer ${isSelect ? 'bg-green100' : 'bg-gray80'}`}
            >
              {!isSelect ? <Plus /> : <Check className={'h-5 w-5'} />}
            </button>
          ) : (
            <button
              onClick={() => handleAddCard(info.id)}
              className={`rounded-full p-1 flex items-center justify-center cursor-pointer  ${isStaySelected(stays, info.id) ? 'bg-green100' : 'bg-gray80'}`}
            >
              {!isStaySelected(stays, info.id) ? (
                <Plus />
              ) : (
                <Check className={'h-5 w-5'} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
