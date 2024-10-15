'use client';

import React from 'react';

import {selectNavProps} from '@/types';

export default function SelectNav({
  selectOption,
  select,
  name,
  setSelect,
}: selectNavProps) {
  const [selectOne, selectTwo] = selectOption;
  const [contentOne, contentTwo] = name;
  return (
    <nav className={'flex items-center justify-center'}>
      <button
        onClick={() => setSelect(selectOne)}
        className={'flex-1 text-center '}
      >
        <span
          className={`relative inline-block py-2 ${select === selectOne ? 'text-green100' : ''}`}
        >
          {contentOne}
          <span
            className={`absolute bottom-0 left-1/2 w-[calc(100%+20px)] h-0.5 bg-green100 transition-all duration-300 transform -translate-x-1/2 ${
              select === selectOne ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
        </span>
      </button>
      <button
        onClick={() => setSelect(selectTwo)}
        className={'flex-1 text-center '}
      >
        <span
          className={`relative inline-block py-2 ${select === selectTwo ? 'text-green100' : ''}`}
        >
          {contentTwo}
          <span
            className={`absolute bottom-0 left-1/2 w-[calc(100%+25px)] h-0.5 bg-green100 transition-all duration-300 transform -translate-x-1/2 ${
              select === selectTwo ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
        </span>
      </button>
    </nav>
  );
}
