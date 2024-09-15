'use client';

import {useAuthStore} from '@/store';

export default function SignUpProgressIndicator() {
  const {stage} = useAuthStore();

  return <nav>{stage}/3</nav>;
}
