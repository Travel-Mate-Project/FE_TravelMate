'use client';

import SearchIcon from '@/asset/search icon__primary 91.svg';
import {SearchInputProps} from '@/types';

export default function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className={'relative'}>
      <input
        className={
          'border border-solid border-green100 rounded-lg w-full p-3 mt-5 focus:outline-none'
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={'text'}
      />
      <SearchIcon
        className={'stroke-green100 w-5 h-5 absolute right-3 top-9'}
      />
    </div>
  );
}
