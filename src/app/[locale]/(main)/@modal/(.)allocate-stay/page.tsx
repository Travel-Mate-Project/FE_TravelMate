'use client';

import Modal from '@/components/Modal';
import React from 'react';
import AllocateStay from '@/app/[locale]/(main)/(plan)/_components/AllocateStay';

export default function NewStayPageInterceptor() {
  return (
    <Modal
      ModalHeight={'h-fit'}
      title={'숙박할 날짜 선택'}
      subTitle={'해당 숙소에서 묵을 날짜 개별 선택 가능합니다.'}
    >
      <AllocateStay />
    </Modal>
  );
}
