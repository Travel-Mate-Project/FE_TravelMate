import React, {ReactNode} from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function MainLayout({children, modal}: Props) {
  return (
    <>
      <Header />
      <main
        className={
          'pt-24 px-5 w-full max-w-xl mx-auto md:px-1.5 md:max-w-[600px] min-h-[calc(100vh-140px)]'
        }
      >
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}
