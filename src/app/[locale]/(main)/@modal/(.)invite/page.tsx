import React from 'react';

import InviteItems from '@/app/[locale]/(main)/_components/InviteItems';
import Modal from '@/components/Modal';

export default function PageInvitePageInterceptor() {
  return (
    <Modal modalHeight={70} title={'여행친구 초대하기'}>
      <InviteItems />
    </Modal>
  );
}
