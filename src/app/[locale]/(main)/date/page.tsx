import React from 'react';
import Modal from '@/components/DateSelectModal';
import Calender from '@/components/Calender';
import {useTranslations} from 'next-intl';

export default function DatePage() {
  const t = useTranslations('calender');
  return (
    <Modal title={t('intro')}>
      <Calender />
    </Modal>
  );
}
