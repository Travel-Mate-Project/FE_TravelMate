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
      className={`${
        disabled
          ? `!cursor-not-allowed !bg-gray200 rounded-lg text-white font-semibold ${classNames}`
          : `bg-green100 rounded-lg text-white font-semibold hover:bg-green200 transition duration-200 ease-in-out ${classNames}`
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
