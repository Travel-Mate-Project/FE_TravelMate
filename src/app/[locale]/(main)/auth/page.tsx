import {useTranslations} from 'next-intl';
import React from 'react';

import Logo from '@/asset/Logo.svg';
import Kakao from '@/asset/md.svg';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function AuthPage() {
  const t = useTranslations('Auth');
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Logo className={'mb-5'} width={214} height={52} />
        <h3
          style={{whiteSpace: 'pre-line'}}
          className="text-2xl font-bold text-center"
        >
          {t('intro')}
        </h3>
        <div className={'w-96 px-6 md:px-0'}>
          <div className={'relative'}>
            <NavigationButton
              classNames={'bg-kakaoBg p-3 rounded-lg w-full mt-12'}
              href={'/'}
              type={'button'}
            >
              {t('kakao')}
            </NavigationButton>
            <Kakao className={'absolute top-16 left-6'} />
          </div>
          <div className={'flex items-center my-3'}>
            <div
              className={
                'flex-1 max-h-[1px] border-t border-solid border-gray100'
              }
            />
            <p className={'px-4 text-gray200'}>{t('or')}</p>
            <div
              className={
                'flex-1 max-h-[1px] border-t border-solid border-gray100'
              }
            />
          </div>
          <NavigationButton
            classNames={
              'bg-transparent border border-solid border-gray100 p-3 rounded-lg w-full'
            }
            href={'/signup'}
            type={'button'}
          >
            <p className={'text-gray200 font-semibold'}>{t('email')}</p>
          </NavigationButton>
          <div
            className={
              'flex items-center justify-center mt-10 text-sm text-gray900'
            }
          >
            <p className={' mr-5'}>{t('alreadyUser')}</p>
            <Link className={'font-bold underline'} href={'/signin'}>
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
