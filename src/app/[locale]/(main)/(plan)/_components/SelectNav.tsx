'use client';

import React from 'react';

export default function SelectNav({
  selectOption,
  select,
  setSelect,
}: {
  selectOption: [string, string];
  select: string;
  setSelect: (_value: string) => void;
}) {
  const [selectOne, selectTwo] = selectOption;
  return (
    <nav className={'flex items-center justify-center'}>
      <button
        onClick={() => setSelect(selectOne)}
        className={'flex-1 text-center relative'}
      >
        <span
          className={`inline-block py-2 ${select === selectOne ? 'text-green100' : ''}`}
        >
          장소
          <span
            className={`absolute bottom-0 left-1/2 w-[53px] h-0.5 bg-green100 transition-all duration-300 transform -translate-x-1/2 ${
              select === selectOne ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
        </span>
      </button>
      <button
        onClick={() => setSelect('stay')}
        className={'flex-1 text-center relative'}
      >
        <span
          className={`inline-block py-2 ${select === 'stay' ? 'text-green100' : ''}`}
        >
          숙소
          <span
            className={`absolute bottom-0 left-1/2 w-[53px] h-0.5 bg-green100 transition-all duration-300 transform -translate-x-1/2 ${
              select === selectTwo ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
        </span>
      </button>
    </nav>
  );
}
