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
  rules,
  disable = false,
}: InputProps<T>) {
  return (
    <>
      {register && (
        <input
          {...register(label, {required, ...rules})}
          className={classNames}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disable}
        />
      )}
    </>
  );
}
