'use client';

import {useState} from 'react';

import SearchInput from '@/app/[locale]/(main)/(plan)/_components/SearchInput';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
import {useDebounce} from '@/hooks/useDebounce';

export default function AddPlacePage() {
  const [select, setSelect] = useState<string>('search');
  const [search, setSearch] = useState<string>('');

  const debounceQuery = useDebounce(search);

  console.log(debounceQuery);

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <SelectNav
        selectOption={['search', 'add']}
        name={['장소 검색', '신규 장소 등록']}
        select={select}
        setSelect={setSelect}
      />
      <SearchInput
        placeholder={'장소를 검색해 주세요.'}
        value={search}
        onChange={setSearch}
      />
    </div>
  );
}
