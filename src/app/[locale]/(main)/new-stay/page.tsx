'use client';

import Modal from '@/components/Modal';
import React from 'react';
import {useSearchParams} from 'next/navigation';

export default function NewStayPage() {
  const id = useSearchParams().get('id');

  return (
    <Modal title={'숙소 추가'}>
      <div>숙소 추가 모달{id}</div>
    </Modal>
  );
}
