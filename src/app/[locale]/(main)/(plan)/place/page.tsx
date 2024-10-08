import React from 'react';
import CustomGoogleMap from '@/components/CustomGoogleMap';
import TripTimeConfigHeader from '@/app/[locale]/(main)/(plan)/_components/TripTimeConfigHeader';
import PlaceAndStayContainer from '@/app/[locale]/(main)/(plan)/_components/PlaceAndStayContainer';

export default function PlacePage() {
  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <TripTimeConfigHeader />
      <CustomGoogleMap />
      <PlaceAndStayContainer />
    </div>
  );
}
