'use client';

import {useTranslations} from 'next-intl';

import {useAuthStore} from '@/store';

export default function SignUpProgressIndicator() {
  const {stage} = useAuthStore();
  const t = useTranslations('signUp');

  return (
    <nav className={'px-4 py-2 rounded-3xl text-sm text-green100 bg-gray50'}>
      <span className={'font-semibold'}>
        {t('stage')} {stage}
      </span>
      /2
    </nav>
  );
}
