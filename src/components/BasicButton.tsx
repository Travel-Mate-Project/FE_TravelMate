'use client';

import {BasicButtonProps} from '@/types';

export default function BasicButton({
  children,
  classNames,
  onClick,
  type,
}: BasicButtonProps) {
  return (
    <button type={type} className={`w-full ${classNames}`} onClick={onClick}>
      {children}
    </button>
  );
}
