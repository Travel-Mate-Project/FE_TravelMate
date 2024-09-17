'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import React, {useEffect} from 'react';

import welcome from '@/asset/png/welcome.png';
import BasicButton from '@/components/BasicButton';
import {useRouter} from '@/i18n/routing';
import {useAuthStore} from '@/store';

export default function WelcomePage() {
  const t = useTranslations('welcome');
  const {clearStage} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    clearStage();
  }, [clearStage]);

  return (
    <div
      className={
        'flex items-center justify-center h-[calc(100vh-100px)] px-6 md:py-0'
      }
    >
      <div className={'flex flex-col items-center gap-10'}>
        <Image src={welcome} alt={'welcome'} />
        <div className={'flex flex-col gap-3 items-center'}>
          <h2 className={'text-2xl font-bold'}>{t('intro')} 👋</h2>
          <p className={'text-sm font-semibold'}>{t('sub')}</p>
        </div>
        <BasicButton
          onClick={() => router.push('/signin')}
          classNames={
            'w-full bg-green100 py-4 rounded-lg text-white font-semibold'
          }
          type={'submit'}
        >
          {t('goToSignIn')}
        </BasicButton>
      </div>
    </div>
  );
}
