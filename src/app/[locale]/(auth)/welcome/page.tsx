import Image from 'next/image';
import {useTranslations} from 'next-intl';
import React from 'react';

import welcome from '@/asset/png/welcome.png';
import StageClearProvider from '@/app/[locale]/(auth)/_components/StageClearProvider';
import NavigationButton from '@/components/NavigationButton';

export default function WelcomePage() {
  const t = useTranslations('welcome');

  return (
    <StageClearProvider>
      <div className={'flex flex-col items-center gap-10'}>
        <Image
          src={welcome}
          alt={'welcome'}
          priority
          width={450}
          height={450}
        />
        <div className={'flex flex-col gap-3 items-center'}>
          <h2 className={'text-2xl font-bold'}>{t('intro')} 👋</h2>
          <p className={'text-sm font-semibold'}>{t('sub')}</p>
        </div>
        <NavigationButton
          href={'/signin'}
          classNames={
            'w-full bg-green100 py-4 rounded-lg text-white font-semibold'
          }
          type={'submit'}
        >
          {t('goToSignIn')}
        </NavigationButton>
      </div>
    </StageClearProvider>
  );
}
