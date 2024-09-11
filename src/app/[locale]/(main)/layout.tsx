import React, {ReactNode} from 'react';
import Header from '@/components/Header';

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      <div className={'pt-16'}>{children}</div>
    </>
  );
}
