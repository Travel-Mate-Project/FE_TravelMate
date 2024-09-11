'use client';

import React, {useState} from 'react';
import {FieldValues} from 'react-hook-form';

import {AuthInputProps} from '@/types';
import openEyes from '@/asset/open-eye.svg';
import closeEyes from '@/asset/close-eye.svg';
import warn from '@/asset/warn.svg';
import Image from 'next/image';

export default function AuthInput<T extends FieldValues>({
  label,
  placeholder,
  type,
  autoComplete,
  register,
  required,
  rules,
  error,
  disable = false,
}: AuthInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const getBorderClass = () => {
    if (error) {
      return 'shadow-[0_0_0_2px_#EF4444]';
    }
    if (isFocused) {
      return 'shadow-[0_0_0_2px_theme(colors.green100)]';
    }
    return 'shadow-[0_0_0_1px_theme(colors.gray100)]';
  };

  return (
    <>
      <div className="w-full relative">
        <input
          {...register(label, {required, ...rules})}
          type={type === 'password' && visible ? 'text' : type}
          autoComplete={autoComplete}
          className={`
            w-full bg-transparent
            px-3 py-4 rounded-md
            focus:outline-none
            relative z-10
            ${error ? 'border-red-500' : ''}
          `}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          spellCheck={true}
          maxLength={50}
          dir="auto"
          disabled={disable}
        />
        <div
          className={`
            absolute inset-0 rounded-md pointer-events-none
            transition-all duration-200
            ${getBorderClass()}
          `}
        ></div>
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className={'absolute top-4 right-3.5 z-10 cursor-pointer'}
          >
            {visible ? (
              <Image src={openEyes} alt={'icon'} />
            ) : (
              <Image src={closeEyes} alt={'icon'} />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="absolute flex mt-2 text-xs text-red-500 whitespace-pre-line">
          <Image className={'absolute left-0 mr-1.5'} src={warn} alt={'icon'} />
          <span className={'pl-5'}> {error}</span>
        </p>
      )}
    </>
  );
}
