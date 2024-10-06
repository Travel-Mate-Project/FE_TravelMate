'use client';

import React from 'react';

import TripTimeConfigFrom from '@/app/[locale]/(main)/(trip)/_components/TripTimeConfigFrom';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(trip)/_components/TripTimeConfigHeader';
import NavigationButton from '@/components/NavigationButton';

export default function TimePage() {
  return (
    <div>
      <TripTimeConfigHeader />
      <TripTimeConfigFrom />
      <NavigationButton href={'/place'} type={'button'}>
        장소 설정 페이지로 이동
      </NavigationButton>
    </div>
  );
}
