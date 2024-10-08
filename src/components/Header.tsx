import React from 'react';
import HeaderSearchIcon from '@/asset/header-search-icon.svg';
import MobileMenu from '@/components/MobilMenu';

export default function Header() {
  return (
    <header className="absolute w-full bg-transparent py-3">
      <div className="max-w-[600px] mx-auto px-5 md:px-0">
        <div className="flex items-center justify-between h-16">
          <MobileMenu />
          <div className="flex items-center">
            <HeaderSearchIcon width={25} height={25} />
          </div>
        </div>
      </div>
    </header>
  );
}
