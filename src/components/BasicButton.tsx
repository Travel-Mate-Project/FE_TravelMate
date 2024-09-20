'use client';

import {ButtonProps} from '@/types';

export default function BasicButton({
  children,
  classNames,
  onClick,
  type,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${disabled ? `!cursor-not-allowed !bg-gray200 ${classNames}` : classNames}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
