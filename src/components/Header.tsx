import Image from 'next/image';
import {useTranslations} from 'next-intl';

import LocaleSwitcher from '@/app/[locale]/_components/LocaleSwitcher';
import searchSVG from '@/asset/search.svg';
import BasicInput from '@/components/BasicInput';
import MobileMenu from '@/components/MobilMenu';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <header className="absolute w-full bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              logo
            </Link>
          </div>

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
              <BasicInput
                classNames={
                  'w-48 lg:w-64 border border-gray-300 rounded-full py-1 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-300'
                }
                type={'text'}
                translationNamespace={'Header'}
                placeholder={'search'}
              />
              <Image
                className={'absolute top-1.5 left-3'}
                src={searchSVG}
                alt={'검색'}
              />
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

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
