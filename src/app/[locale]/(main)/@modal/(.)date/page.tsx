import {useTranslations} from 'next-intl';
import React from 'react';

import Calender from '@/components/Calender';
import Modal from '@/components/Modal';

export default function DatePageInterceptor() {
  const t = useTranslations('calender');
  return (
    <Modal
      desktopModalHeight={'md:h-[725px]'}
      mobileModalHeight={'h-[90%]'}
      title={t('intro')}
    >
      <Calender />
    </Modal>
  );
}
