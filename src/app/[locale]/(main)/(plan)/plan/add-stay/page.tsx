'use client';

import FilterButton from '@/app/[locale]/(main)/(plan)/_components/FilterButton';
import SearchInput from '@/app/[locale]/(main)/(plan)/_components/SearchInput';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
import BasicButton from '@/components/BasicButton';
import {useSearch} from '@/hooks/useSearch';
import {useRouter} from '@/i18n/routing';

export default function AddStayPage() {
  const {navSelect, setNavSelect, search, setSearch, filter, setFilter} =
    useSearch('search', 'all');
  const router = useRouter();

  const handleAddStayList = () => {
    router.replace('/plan');
  };

  const filterName = [
    {key: '전체', value: 'all'},
    {key: '추천 숙소', value: 'recommand'},
  ];

  return (
    <div className="mx-auto w-full max-w-[600px] h-[calc(100vh-140px)] md:h-[calc(100vh-240px)] flex flex-col">
      <SelectNav
        selectOption={['search', 'add']}
        name={['숙소 검색', '신규 숙소 등록']}
        select={navSelect}
        setSelect={setNavSelect}
      />
      <SearchInput
        placeholder={'숙소를 검색해 주세요.'}
        value={search}
        onChange={setSearch}
      />
      <FilterButton
        filter={filter}
        setFilter={setFilter}
        filterName={filterName}
      />

      <BasicButton
        onClick={handleAddStayList}
        classNames={'w-full py-3 mt-auto z-30'}
        type={'button'}
      >
        숙소 추가하기
      </BasicButton>
    </div>
  );
}
