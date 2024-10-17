'use client';

import {CSSProperties, ReactNode} from 'react';

import {useTripStore} from '@/store';

export default function HeightWrapper({children}: {children: ReactNode}) {
  const mapHeight = useTripStore.use.mapHeight();

  const mobileStyle: CSSProperties = {
    height: `calc(calc(100vh - 340px) - ${mapHeight}px)`,
    overflow: 'auto',
  };

  const desktopStyle: CSSProperties = {
    height: `calc(calc(100vh - 460px) - ${mapHeight}px)`,
    overflow: 'auto',
  };

  return (
    <>
      <div className="md:hidden" style={mobileStyle}>
        {children}
      </div>
      <div className="hidden md:block" style={desktopStyle}>
        {children}
      </div>
    </>
  );
}
