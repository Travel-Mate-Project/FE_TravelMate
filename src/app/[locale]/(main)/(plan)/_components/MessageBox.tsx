import {ReactNode} from 'react';

export default function MessageBox({children}: {children: ReactNode | string}) {
  return (
    <div
      className={
        'w-full h-24 bg-gray-100 text-gray200 rounded-lg flex items-center justify-center mt-8'
      }
    >
      {children}
    </div>
  );
}
