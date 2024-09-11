import SignInFrom from '@/app/[locale]/(auth)/_components/SignInFrom';
import NavigationButton from '@/components/NavigationButton';
import Image from 'next/image';
import md from '@/asset/md.svg';
import {Link} from '@/i18n/routing';
import React from 'react';
import {useTranslations} from 'next-intl';

export default function SignInPage() {
  const t = useTranslations('Auth');

  return (
    <div className={'h-screen flex items-center justify-center'}>
      <div className={'flex flex-col items-center'}>
        <h1 className={'mb-14'}>logo</h1>
        <h2 className={'text-2xl font-bold mb-14'}>로그인</h2>
        <div className={'w-96 '}>
          <SignInFrom />
          <div className={'flex flex-col items-center mt-12'}>
            <h2 className={'font-bold'}>SNS 연동 로그인</h2>
            <div className={'relative w-full'}>
              <NavigationButton
                classNames={'bg-kakaoBg px-3 py-4 rounded-lg w-full mt-12'}
                href={'/'}
                type={'button'}
              >
                {t('kakao')}
              </NavigationButton>
              <Image
                className={'absolute top-16 left-6'}
                src={md}
                alt={'kakao'}
              />
            </div>
            <div className={'w-full flex items-center justify-around mt-10'}>
              <Link href={'/'}>아직 여행메이트 회원이 아니세요?</Link>
              <Link className={'font-bold underline'} href={'/'}>
                회원가입 하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
