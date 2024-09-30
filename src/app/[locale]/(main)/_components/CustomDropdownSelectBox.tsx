'use client';

import React, {useEffect, useRef, useState} from 'react';

import Check from '@/asset/check.svg';
import Group from '@/asset/Group.svg';
import SelectOpen from '@/asset/selectOpen.svg';
import Single from '@/asset/single.svg';
import {SelectBoxProps} from '@/types';

export default function CustomDropdownSelectBox({
  label,
  classNames,
  onChange,
  options,
  value,
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options?.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${classNames}`} ref={dropdownRef}>
      <label className="sr-only">{label}</label>
      <button
        type="button"
        className="w-full text-left bg-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectOpen className="h-4 w-4 fill-gray-500" />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              className={'flex items-center justify-between'}
              key={option.value}
            >
              <button
                type="button"
                className={
                  'w-full text-left px-4 py-2 cursor-pointer hover:text-green100'
                }
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.value === 'alone' ? (
                  <span className={'flex items-center gap-2'}>
                    <Single /> {option.label}
                  </span>
                ) : (
                  <span className={'flex items-center gap-2'}>
                    <Group /> {option.label}
                  </span>
                )}
              </button>
              {option.value === value ? (
                <Check
                  className={
                    'absolute right-2 stroke-green100 w-5 h-5 stroke-2'
                  }
                />
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
