'use client';

import {ReactNode} from 'react';

import {useTripStore} from '@/store';

export default function HeightWrapper({children}: {children: ReactNode}) {
  const totalHeight = useTripStore.use.totalHeight();
  return (
    <div style={{maxHeight: `${totalHeight}px`, overflow: 'auto'}}>
      {children}
    </div>
  );
}
