import React from 'react';

import NavigationButton from '@/components/NavigationButton';

export default function TimePage() {
  return (
    <div
      className={
        'pt-24 px-5 w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'
      }
    >
      <div>시간 설정 페이지</div>
      <NavigationButton href={'/place'} type={'button'}>
        장소 설정 페이지로 이동
      </NavigationButton>
    </div>
  );
}
