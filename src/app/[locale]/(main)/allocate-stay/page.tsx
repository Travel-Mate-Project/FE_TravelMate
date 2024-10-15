'use client';

import Modal from '@/components/Modal';
import React from 'react';
import AllocateStay from '@/app/[locale]/(main)/(plan)/_components/AllocateStay';

export default function NewStayPage() {
  return (
    <Modal title={'숙소 추가'}>
      <AllocateStay />
    </Modal>
  );
}
