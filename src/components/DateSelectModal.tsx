'use client';

import React, {useEffect, useState} from 'react';
import {ModalProps} from '@/types';
import CloseIcon from '@/asset/closeIcon.svg';
import {useRouter} from '@/i18n/routing';

export default function Modal({children, title}: ModalProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={
        'fixed inset-0 bg-modalBg flex items-center justify-center z-50'
      }
    >
      <div
        className={`
         absolute bottom-0
          bg-white w-full h-[90%] max-w-md rounded-t-2xl shadow-lg
          transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          md:static
          md:w-7xl md:h-[750px] md:rounded-2xl
          md:transform-none md:opacity-100
        `}
      >
        <div
          className={
            'relative py-10 px-6 flex min-h-full flex-col items-center'
          }
        >
          <h2 className={'text-2xl font-bold mb-10'}>{title}</h2>
          {children}
          <CloseIcon
            onClick={() => router.back()}
            className={'absolute top-10 right-5 cursor-pointer'}
          />
        </div>
      </div>
    </div>
  );
}
