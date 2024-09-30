import {useTranslations} from 'next-intl';
import React from 'react';

import Calender from '@/components/Calender';
import Modal from '@/components/Modal';

export default function DatePage() {
  const t = useTranslations('calender');
  return (
    <Modal title={t('intro')}>
      <Calender />
    </Modal>
  );
}
