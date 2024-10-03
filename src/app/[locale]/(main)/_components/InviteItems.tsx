'use client';

import React from 'react';

import Kakao from '@/asset/md.svg';
import BasicButton from '@/components/BasicButton';
import NavigationButton from '@/components/NavigationButton';

export default function InviteItems() {
  return (
    <div className={'h-full w-full flex flex-col gap-10'}>
      <div className={'flex-1'}>
        <h3 className={'text-center'}>
          함께 여행갈 친구나 가족을 초대해 보세요! <br />
          여행 일정을 함께 계획할 수 있습니다.
          <br />
          (최대 15명)
        </h3>
      </div>
      <div className={'my-10 flex flex-col gap-4 font-semibold'}>
        <div className={'relative'}>
          <NavigationButton
            classNames={'bg-kakaoBg p-4 rounded-lg w-full'}
            href={'/'}
            type={'button'}
          >
            카카오톡 초대
          </NavigationButton>
          <Kakao className={'absolute top-5 left-24'} />
        </div>
        <BasicButton classNames={'w-full'} type={'button'}>
          초대 링크 복사
        </BasicButton>
        <BasicButton classNames={'w-full'} type={'button'}>
          일정으로 이동
        </BasicButton>
      </div>
    </div>
  );
}
