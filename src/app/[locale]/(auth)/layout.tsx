import {ReactNode} from 'react';

export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <main
      className={
        'h-full my-10 flex items-center justify-center md:h-screen md:my-0'
      }
    >
      <div className={'flex flex-col items-center'}>{children}</div>
    </main>
  );
}
