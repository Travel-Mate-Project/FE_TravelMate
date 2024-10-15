import React from 'react';
import CustomGoogleMap from '@/components/CustomGoogleMap';
import TitleEdit from '@/app/[locale]/(main)/(plan)/_components/TitleEdit';

export default function ReadyPage() {
  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <CustomGoogleMap />
      <TitleEdit />
    </div>
  );
}
