'use client';

import {ReactNode, useEffect} from 'react';
import {useAuthStore} from '@/store';

export default function StageClearProvider({children}: {children: ReactNode}) {
  const {clearStage} = useAuthStore();

  useEffect(() => {
    clearStage();
  }, [clearStage]);

  return (
    <div
      className={
        'flex items-center justify-center h-[calc(100vh-100px)] px-6 md:py-0'
      }
    >
      {children}
    </div>
  );
}
