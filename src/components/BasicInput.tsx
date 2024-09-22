'use client';

import {FieldValues} from 'react-hook-form';

import {InputProps} from '@/types';

export default function BasicInput<T extends FieldValues>({
  label,
  placeholder,
  type,
  autoComplete,
  register,
  classNames,
  required,
  maxLength = 15,
  rules,
  disable = false,
  onFocus,
  onBlur,
}: InputProps<T>) {
  return (
    <>
      <input
        {...register(label, {required, ...rules})}
        className={classNames}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disable}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
}
