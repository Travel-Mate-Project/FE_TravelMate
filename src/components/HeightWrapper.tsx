'use client';

import {CSSProperties, ReactNode} from 'react';

import {useTripStore} from '@/store';

export default function HeightWrapper({
  children,
  withTime,
}: {
  children: ReactNode;
  withTime?: boolean;
}) {
  const mapHeight = useTripStore.use.mapHeight();

  const styles: CSSProperties = {
    height: `calc(calc(100vh - 235px) - ${mapHeight}px)`,
    overflow: 'auto',
  };

  const withTimeStyle: CSSProperties = {
    height: `calc(calc(100vh - 310px) - ${mapHeight}px)`,
    overflow: 'auto',
  };

  return (
    <>
      {withTime ? (
        <div className={'relative'} style={withTimeStyle}>
          {children}
        </div>
      ) : (
        <div className={'relative'} style={styles}>
          {children}
        </div>
      )}
    </>
  );
}
