'use client';

import {BasicButtonProps} from '@/types';

export default function BasicButton({
  children,
  classNames,
  onClick,
  type,
  disabled = false,
}: BasicButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${disabled && 'cursor-not-allowed bg-gray200'} ${classNames}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
