'use client';

import {useEffect} from 'react';

import {useRouter} from '@/i18n/routing';

export default function PageInvitePage() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);

  return null;
}
