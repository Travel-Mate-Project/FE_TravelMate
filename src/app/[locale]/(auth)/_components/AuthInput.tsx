'use client';

import React, {useState} from 'react';
import {FieldValues} from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

import CloseEyes from '@/asset/close-eye.svg';
import OpenEyes from '@/asset/open-eye.svg';
import Warn from '@/asset/warn.svg';
import {InputProps} from '@/types';

export default function AuthInput<T extends FieldValues>({
  label,
  placeholder,
  type,
  autoComplete,
  register,
  classNames,
  required,
  rules,
  error,
  disable = false,
}: InputProps<T>) {
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
          className={`w-full bg-transparent px-3 py-4 rounded-md focus:outline-none hover:appearance-none relative z-10 ${error ? 'border-red-500' : ''} ${classNames}`}
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
            className={'absolute top-5 right-3.5 z-10 cursor-pointer'}
          >
            {visible ? <OpenEyes /> : <CloseEyes />}
          </button>
        )}
        <>
          {error && (
            <p className="absolute -top-8 right-0 flex mt-2 text-xs text-red-500 whitespace-pre-line">
              <Warn className={'absolute left-0 mr-1.5'} />
              <span className={'pl-5'}> {error}</span>
            </p>
          )}
        </>
      </div>
    </>
  );
}
