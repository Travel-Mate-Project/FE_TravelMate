import {useTranslations} from 'next-intl';
import React from 'react';

import TripConfigurationForm from '@/app/[locale]/(main)/_components/TripConfigurationForm';
import Logo from '@/asset/Logo.svg';

export default function TripConfigurationPanel() {
  const t = useTranslations('tripConfigPanel');
  return (
    <div className={'rounded-xl max-w-full h-auto '}>
      <div className={'flex flex-col items-center py-10'}>
        <Logo className={'ml-5'} width={214} height={52} />
        <h2 className={'font-semibold text-xl mt-8'}>{t('intro')} 🙌</h2>
        <TripConfigurationForm />
      </div>
    </div>
  );
}
