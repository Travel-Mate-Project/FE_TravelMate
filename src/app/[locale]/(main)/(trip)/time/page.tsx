import React from 'react';

import NavigationButton from '@/components/NavigationButton';

export default function TimePage() {
  return (
    <div>
      <div>시간 설정 페이지</div>
      <NavigationButton href={'/place'} type={'button'}>
        장소 설정 페이지로 이동
      </NavigationButton>
    </div>
  );
}
