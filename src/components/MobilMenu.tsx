'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import React, {useState} from 'react';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import Logo from '@/asset/Logo.svg';
import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function MobileMenu() {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="md:hidden">
      <div className={'flex items-center'}>
        <BasicButton
          onClick={toggleMenu}
          classNames={'text-gray-700'}
          type={'button'}
        >
          <svg
            className="w-[30px] h-[30px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 17H19M5 12H19M5 7H19"
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BasicButton>
        <Link href={'/'}>
          <Image
            className={'ml-5'}
            src={Logo}
            alt={'logo'}
            width={90}
            priority
          />
        </Link>
      </div>
      {isMenuOpen && (
        <div className="absolute pt-3 left-0 w-full bg-white shadow-md">
          <div className="flex flex-col gap-5 items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">{t('home')}</Link>
            <Link href="/">{t('placeRecommend')}</Link>
            <Link href="/">{t('myTrip')}</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <BasicInput
                classNames={
                  'w-full border border-gray-300 rounded-full py-2 mb-5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300'
                }
                type={'text'}
                translationNamespace={'Header'}
                placeholder={'search'}
              />
              <NavigationButton
                classNames="w-full bg-green100 text-white font-semibold px-6 py-2 rounded-full"
                href="/auth"
                type="button"
                onClick={closeMenu}
              >
                {t('Auth')}
              </NavigationButton>
              <div className="flex justify-start">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
