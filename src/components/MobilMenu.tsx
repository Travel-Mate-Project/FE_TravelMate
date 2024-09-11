'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import React, {useState} from 'react';

import LocaleSwitcher from '@/app/[locale]/_components/LocaleSwitcher';
import BasicButton from '@/components/BasicButton';
import NavigationButton from '@/components/NavigationButton';
import BasicInput from '@/components/BasicInput';

export default function MobileMenu() {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const MenuLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      onClick={closeMenu}
    >
      {children}
    </Link>
  );

  return (
    <div className="md:hidden">
      <BasicButton
        onClick={toggleMenu}
        classNames={'text-gray-700'}
        type={'button'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </BasicButton>

      {isMenuOpen && (
        <div className="absolute left-0 w-full bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MenuLink href="/">{t('home')}</MenuLink>
            <MenuLink href="/">{t('placeRecommend')}</MenuLink>
            <MenuLink href="/">{t('myTrip')}</MenuLink>
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
