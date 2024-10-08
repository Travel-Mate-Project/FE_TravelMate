'use client';

import React from 'react';

import TripTimeConfigFrom from '@/app/[locale]/(main)/(trip)/trip/_components/TripTimeConfigFrom';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(trip)/trip/_components/TripTimeConfigHeader';
import NotificationBox from '@/app/[locale]/(main)/(trip)/trip/_components/NotificationBox';

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
