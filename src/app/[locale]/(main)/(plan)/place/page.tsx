import React from 'react';

import NavigationButton from '@/components/NavigationButton';
import CustomGoogleMap from '@/components/CustomGoogleMap';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(plan)/_components/TripTimeConfigHeader';
import ResizableContent from '@/app/[locale]/(main)/(plan)/_components/ResizableContent';

export default function PlacePage() {
  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <TripTimeConfigHeader />
      <CustomGoogleMap />
      <ResizableContent />
      <NavigationButton href={'/place/add'} type={'button'}>
        장소 추가 페이지로 이동
      </NavigationButton>
      <NavigationButton href={'/ready'} type={'button'}>
        (이동수단 모달에서의)저장
      </NavigationButton>
    </div>
  );
}
