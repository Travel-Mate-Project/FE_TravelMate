'use client';

import {ButtonProps} from '@/types';

export default function BasicButton({
  children,
  classNames,
  onClick,
  type,
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  const handleBackGroundColor = () => {
    switch (variant) {
      case 'primary':
        return 'bg-green100 hover:bg-green200';
      case 'secondary':
        return 'bg-black';
      case 'tertiary':
        return 'bg-white border border-solid border-green100 !text-green100';
      default:
        return 'bg-green100';
    }
  };

  return (
    <button
      disabled={disabled}
      type={type}
      className={`${
        disabled
          ? `!cursor-not-allowed !bg-gray200 rounded-lg text-white font-semibold ${classNames}`
          : `${handleBackGroundColor()} rounded-lg text-white font-semibold transition duration-200 ease-in-out ${classNames}`
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
