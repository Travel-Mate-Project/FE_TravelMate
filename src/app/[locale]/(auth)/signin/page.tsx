import {useTranslations} from 'next-intl';
import React from 'react';

import SignInFrom from '@/app/[locale]/(auth)/_components/SignInFrom';
import Logo from '@/asset/Logo.svg';
import Kakao from '@/asset/md.svg';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function SignInPage() {
  const t = useTranslations('signIn');

  return (
    <>
      <Link href={'/'}>
        <Logo width={159} height={37} />
      </Link>
      <h2 className={'text-2xl font-bold my-10'}>{t('logIn')}</h2>
      <div className={'w-screen px-6 pb-10 md:w-96 md:px-0'}>
        <SignInFrom />
        <div className={'flex flex-col items-center mt-12'}>
          <h2 className={'font-bold'}> {t('sns')}</h2>
          <div className={'relative w-full'}>
            <NavigationButton
              classNames={'bg-kakaoBg px-3 py-4 rounded-lg w-full mt-8'}
              href={'/'}
              type={'button'}
            >
              {t('kakao')}
            </NavigationButton>
            <Kakao className={'absolute top-[52px] left-6'} />
          </div>
          <div
            className={'w-full flex items-center justify-around mt-10 text-sm'}
          >
            <p> {t('notUser')}</p>
            <Link className={'font-bold underline'} href={'/signup'}>
              {t('join')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
