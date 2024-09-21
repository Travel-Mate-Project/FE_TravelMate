import {useTranslations} from 'next-intl';
import React from 'react';

import Logo from '@/asset/Logo.svg';
import SearchIcon from '@/asset/Search.svg';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import MobileMenu from '@/components/MobilMenu';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <header className="absolute w-full bg-transparent py-3">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <MobileMenu />
          <Link className={'hidden md:inline'} href={'/'}>
            <Logo />
          </Link>
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              {t('home')}
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              {t('placeRecommend')}
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              {t('myTrip')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-12">
            <div className="relative">
              <input
                className={
                  'w-48 lg:w-64 border border-gray-300 rounded-full py-1 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-300'
                }
                type={'text'}
                placeholder={'search'}
              />
              <SearchIcon className={'absolute top-1.5 left-3'} />
            </div>
            <NavigationButton
              classNames={
                'w-full bg-green100 text-white font-semibold px-6 py-2 rounded-full'
              }
              href={'/auth'}
              type={'button'}
            >
              {t('Auth')}
            </NavigationButton>
            <LocaleSwitcher />
          </div>

          <div className="flex items-center md:hidden">
            <svg
              className={'w-[25px] h-[25px]'}
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.66667 15.8333C13.3486 15.8333 16.3333 12.8486 16.3333 9.16667C16.3333 5.48477 13.3486 2.5 9.66667 2.5C5.98477 2.5 3 5.48477 3 9.16667C3 12.8486 5.98477 15.8333 9.66667 15.8333Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 17.5L14.375 13.875"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
