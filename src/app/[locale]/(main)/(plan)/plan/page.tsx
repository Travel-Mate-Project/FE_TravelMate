import React from 'react';

import PlaceAndStayContainer from '@/app/[locale]/(main)/(plan)/_components/PlaceAndStayContainer';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(plan)/_components/TripTimeConfigHeader';
import CustomGoogleMap from '@/components/CustomGoogleMap';

export default function PlacePage() {
  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <TripTimeConfigHeader />
      <CustomGoogleMap />
      <PlaceAndStayContainer />
    </div>
  );
}
