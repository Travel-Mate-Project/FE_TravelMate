'use client';

import {BasicButtonProps} from '@/types';

export default function BasicButton({
  children,
  classNames,
  onClick,
  type,
}: BasicButtonProps) {
  return (
    <button type={type} className={`${classNames}`} onClick={onClick}>
      {children}
    </button>
  );
}
