import React from 'react';

import NavigationButton from '@/components/NavigationButton';

export default function PlacePage() {
  return (
    <div
      className={
        'pt-24 px-5 w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'
      }
    >
      <div>장소 설정 페이지</div>
      <NavigationButton href={'/place/add'} type={'button'}>
        장소 추가 페이지로 이동
      </NavigationButton>
      <NavigationButton href={'/ready'} type={'button'}>
        (이동수단 모달에서의)저장
      </NavigationButton>
    </div>
  );
}
