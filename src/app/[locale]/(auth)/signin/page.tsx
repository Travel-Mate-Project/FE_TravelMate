import Image from 'next/image';
import {useTranslations} from 'next-intl';
import React from 'react';

import SignInFrom from '@/app/[locale]/(auth)/_components/SignInFrom';
import md from '@/asset/md.svg';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function SignInPage() {
  const t = useTranslations('signIn');

  return (
    <div
      className={
        'h-full my-10 flex items-center justify-center md:h-screen md:my-0'
      }
    >
      <div className={'flex flex-col items-center'}>
        <h1 className={'mb-14 text-3xl font-bold'}>Logo</h1>
        <h2 className={'text-2xl font-bold mb-14'}> {t('logIn')}</h2>
        <div className={'w-screen px-6 pb-10 md:w-96'}>
          <SignInFrom />
          <div className={'flex flex-col items-center mt-12'}>
            <h2 className={'font-bold'}> {t('sns')}</h2>
            <div className={'relative w-full'}>
              <NavigationButton
                classNames={'bg-kakaoBg px-3 py-4 rounded-lg w-full mt-12'}
                href={'/'}
                type={'button'}
              >
                {t('kakao')}
              </NavigationButton>
              <Image
                className={'absolute top-[68px] left-6'}
                src={md}
                alt={'kakao'}
              />
            </div>
            <div className={'w-full flex items-center justify-around mt-10'}>
              <Link href={'/'}> {t('notUser')}</Link>
              <Link className={'font-bold underline'} href={'/'}>
                {t('join')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
