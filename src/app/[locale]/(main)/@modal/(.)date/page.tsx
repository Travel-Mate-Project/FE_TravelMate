import {useTranslations} from 'next-intl';
import React from 'react';

import Calender from '@/components/Calender';
import Modal from '@/components/Modal';

export default function DatePageInterceptor() {
  const t = useTranslations('calender');
  return (
    <Modal ModalHeight={'h-[90%] md:h-[725px]'} title={t('intro')}>
      <Calender />
    </Modal>
  );
}
