import React from 'react';
import Modal from '@/components/DateSelectModal';
import Calender from '@/components/Calender';

export default function DatePage() {
  return (
    <Modal title={'여행 기간이 어떻게 되시나요?'}>
      <Calender />
    </Modal>
  );
}
