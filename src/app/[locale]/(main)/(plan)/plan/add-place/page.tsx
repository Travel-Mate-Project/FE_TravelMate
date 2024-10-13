'use client';

import FilterButton from '@/app/[locale]/(main)/(plan)/_components/FilterButton';
import MessageBox from '@/app/[locale]/(main)/(plan)/_components/MessageBox';
import SearchInput from '@/app/[locale]/(main)/(plan)/_components/SearchInput';
import SelectCard from '@/app/[locale]/(main)/(plan)/_components/SelectCard';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
import BasicButton from '@/components/BasicButton';
import {useDebounce} from '@/hooks/useDebounce';
import {useSearch} from '@/hooks/useSearch';
import {useSearchPlace} from '@/hooks/withQuery/get/useSearchPlace';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import {SearchPlaceType} from '@/types';

export default function AddPlacePage() {
  const {navSelect, setNavSelect, search, setSearch, filter, setFilter} =
    useSearch('search', 'all');

  const {selectedPlace, addPlace, places} = useTripStore();
  const router = useRouter();

  const debounceQuery = useDebounce(search);
  const {searchPlaceList} = useSearchPlace(debounceQuery, filter);

  const handleAddPlaceList = () => {
    selectedPlace.forEach((place) => {
      if (!places.some((existingPlace) => existingPlace.id === place.id)) {
        addPlace(place);
      }
    });
    router.replace('/plan');
  };

  const filterName = [
    {key: '전체', value: 'all'},
    {key: '추천장소', value: 'recommand'},
    {key: '관광지', value: 'place'},
    {
      key: '음식점',
      value: 'restaurant',
    },
    {key: '카페', value: 'cafe'},
  ];

  return (
    <div className="mx-auto w-full max-w-[600px] h-[calc(100vh-140px)] md:h-[calc(100vh-240px)] flex flex-col">
      <SelectNav
        selectOption={['search', 'add']}
        name={['장소 검색', '신규 장소 등록']}
        select={navSelect}
        setSelect={setNavSelect}
      />
      <SearchInput
        placeholder={'장소를 검색해 주세요.'}
        value={search}
        onChange={setSearch}
      />
      <FilterButton
        filter={filter}
        setFilter={setFilter}
        filterName={filterName}
      />
      <div className={`flex-grow overflow-y-auto mb-5`}>
        {searchPlaceList?.length <= 0 ? (
          <MessageBox>결과 없습니다.</MessageBox>
        ) : (
          <div className={'flex flex-col gap-5'}>
            {searchPlaceList?.map((place: SearchPlaceType) => (
              <SelectCard key={place.id} info={place} variant={'place'} />
            ))}
          </div>
        )}
      </div>
      <BasicButton
        onClick={handleAddPlaceList}
        classNames={'w-full py-3 mt-auto z-30'}
        type={'button'}
      >
        장소 추가하기
      </BasicButton>
    </div>
  );
}
