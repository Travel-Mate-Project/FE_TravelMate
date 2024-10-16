'use client';

import Result from '@/app/[locale]/(main)/(plan)/_components/Result';
import CustomGoogleMap from '@/components/CustomGoogleMap';

export default function ResultPage() {
  const tempPlan = JSON.parse(sessionStorage.getItem('OTMP') || 'noTempPlan');

  return (
    <div className={'w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px]'}>
      <CustomGoogleMap isResult />
      <Result optimizedPlan={tempPlan} isLoading={false} />
    </div>
  );
}
