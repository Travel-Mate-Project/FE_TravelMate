import React from 'react';
import CustomGoogleMap from '@/components/CustomGoogleMap';
import TitleEdit from '@/app/[locale]/(main)/(plan)/_components/TitleEdit';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(plan)/_components/TripTimeConfigHeader';

export default function ReadyPage() {
  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <TripTimeConfigHeader />
      <CustomGoogleMap />
      <TitleEdit />
    </div>
  );
}
