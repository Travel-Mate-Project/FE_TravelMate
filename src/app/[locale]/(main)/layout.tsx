import Header from '@/components/Header';
import React, {ReactNode} from 'react';

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      <div className={'pt-16'}>{children}</div>
    </>
  );
}
