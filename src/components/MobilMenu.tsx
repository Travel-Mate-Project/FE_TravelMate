'use client';

import {useTranslations} from 'next-intl';
import React, {useState} from 'react';

import Logo from '@/asset/Logo.svg';
import MenuIcon from '@/asset/Hamburger_MD.svg';
import LocaleSwitcher from '@/components/LocaleSwitcher';
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
        <button onClick={toggleMenu} type={'button'}>
          <MenuIcon width={30} height={30} />
        </button>
        <Link className={'hidden md:block'} href={'/'}>
          <Logo className={'ml-5'} />
        </Link>
      </div>
      {isMenuOpen && (
        <div className="absolute pt-3 left-0 w-full bg-white shadow-md z-30">
          <div className="flex flex-col gap-5 items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">{t('home')}</Link>
            <Link href="/">{t('placeRecommend')}</Link>
            <Link href="/">{t('myTrip')}</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
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
