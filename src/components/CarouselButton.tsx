'use client';

import {CarouseButtonProps} from '@/types';

export default function CarouselButton({
  onClick,
  disabled,
  classNames,
  children,
  isNext,
}: CarouseButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        isNext
          ? 'absolute right-0 top-1/2 -translate-y-1/2'
          : 'absolute left-0 top-1/2 -translate-y-1/2'
      } ${classNames}`}
    >
      {children}
    </button>
  );
}
