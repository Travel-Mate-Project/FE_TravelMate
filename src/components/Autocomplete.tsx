import {ReactNode} from 'react';

export default function Autocomplete({children}: {children: ReactNode}) {
  return (
    <ul
      className={
        'absolute bg-white w-full z-10 p-3 shadow-xl rounded-2xl font-semibold'
      }
    >
      {children}
    </ul>
  );
}
