'use client';

import React from 'react';

import EditPlan from '@/app/[locale]/(main)/(plan)/_components/EditPlan';
import CustomGoogleMap from '@/components/CustomGoogleMap';

export default function EditPage() {
  const tempPlan = JSON.parse(sessionStorage.getItem('OTMP') || 'noTempPlan');
  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <CustomGoogleMap isResult />
      <EditPlan />
    </div>
  );
}
