import React, {ReactNode} from 'react';

import Header from '@/components/Header';

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      <main
        className={'pt-24 px-5 w-full max-w-xl mx-auto md:px-1.5 md:max-w-6xl'}
      >
        {children}
      </main>
    </>
  );
}
