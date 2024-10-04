import {ReactNode} from 'react';
import UnsavedChangesWarning from '@/app/[locale]/(main)/(trip)/_components/UnsavedChangesWarning';

export default function TripLayout({children}: {children: ReactNode}) {
  return (
    <>
      <UnsavedChangesWarning>{children}</UnsavedChangesWarning>
    </>
  );
}
