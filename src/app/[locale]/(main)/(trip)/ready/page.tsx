import React from 'react';

import NavigationButton from '@/components/NavigationButton';

export default function ReadyPage() {
  return (
    <div
      className={
        'pt-24 px-5 w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'
      }
    >
      <div>제목 작성 페이지(알고리즘 돌리기 바로 직전)</div>
      <NavigationButton href={'/edit'} type={'button'}>
        알고리즘 돌리기
      </NavigationButton>
    </div>
  );
}
