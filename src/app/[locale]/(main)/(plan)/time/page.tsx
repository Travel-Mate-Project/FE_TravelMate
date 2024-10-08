'use client';

import React from 'react';

import TripTimeConfigFrom from '@/app/[locale]/(main)/(plan)/_components/TripTimeConfigFrom';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(plan)/_components/TripTimeConfigHeader';
import NotificationBox from '@/app/[locale]/(main)/(plan)/_components/NotificationBox';

export default function TimePage() {
  return (
    <>
      <TripTimeConfigHeader>
        <NotificationBox />
      </TripTimeConfigHeader>
      <TripTimeConfigFrom />
    </>
  );
}
