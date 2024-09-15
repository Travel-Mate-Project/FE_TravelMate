'use client';

import {useAuthStore} from '@/store';

export default function SignUpProgressIndicator() {
  const {stage} = useAuthStore();

  return (
    <nav className={'px-4 py-2 rounded-3xl text-sm text-green100 bg-[#F5F8FF]'}>
      <span className={'font-semibold'}>단계 {stage}</span>/3
    </nav>
  );
}
