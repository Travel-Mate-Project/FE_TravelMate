'use client';

import {useTranslations} from 'next-intl';
import React, {useState} from 'react';

import MenuIcon from '@/asset/Hamburger_MD.svg';
import HandBag from '@/asset/Handbag.svg';
import Pine from '@/asset/icon-map-pin.svg';
import Map from '@/asset/Map.svg';
import User from '@/asset/User_02.svg';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import NavigationButton from '@/components/NavigationButton';
import {Link, useRouter} from '@/i18n/routing';

export default function MobileMenu() {
  const t = useTranslations('Header');
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative">
      <div className={'flex items-center'}>
        <button onClick={toggleMenu} type={'button'}>
          <MenuIcon width={30} height={30} />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-72 md:w-96 bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-5 items-start px-4 py-6 flex-grow">
            <div className="text-lg font-bold">
              <NavigationButton
                classNames=""
                href="/auth"
                type="button"
                onClick={closeMenu}
              >
                {t('Auth')}
              </NavigationButton>
            </div>
            <Link href="/" onClick={closeMenu}>
              <Map className={'inline mr-3'} /> {t('home')}
            </Link>
            <Link href="/" onClick={closeMenu}>
              <Pine className={'inline mr-3'} />
              {t('placeRecommend')}
            </Link>
            <Link href="/" onClick={closeMenu}>
              <HandBag className={'inline mr-3'} />
              {t('myTrip')}
            </Link>
            <Link href="/" onClick={closeMenu}>
              <User className={'inline mr-3'} />
              {t('profile')}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
}
