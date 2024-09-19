import {useTranslations} from 'next-intl';

import SignUpForm from '@/app/[locale]/(auth)/_components/SignUpForm';
import SignUpProgressIndicator from '@/app/[locale]/(auth)/_components/SignUpProgressIndicator';
import Logo from '@/asset/Logo.svg';
import Image from 'next/image';
import React from 'react';

export default function SignUpPage() {
  const t = useTranslations('signUp');
  return (
    <>
      <Image className={'mb-5'} src={Logo} alt={'logo'} />
      <div className={'flex items-center gap-3 mb-14'}>
        <SignUpProgressIndicator />
        <h2 className={'text-2xl font-bold '}>{t('joinEmail')}</h2>
      </div>
      <div className={'w-screen px-6 pb-10 md:w-96 md:px-0'}>
        <SignUpForm />
      </div>
    </>
  );
}
