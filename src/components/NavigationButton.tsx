'use client';

import {useRouter} from '@/i18n/routing';
import {NavigationButtonProps} from '@/types';

import React from 'react';

export default function NavigationButton({
  children,
  classNames,
  type,
  href,
  onClick,
}: NavigationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(href);
  };

  return (
    <button type={type} className={`${classNames}`} onClick={handleClick}>
      {children}
    </button>
  );
}
