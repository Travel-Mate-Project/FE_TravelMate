'use client';

import {useState} from 'react';

import SearchInput from '@/app/[locale]/(main)/(plan)/_components/SearchInput';
import SelectNav from '@/app/[locale]/(main)/(plan)/_components/SelectNav';
import {useDebounce} from '@/hooks/useDebounce';
import FilterButton from '@/app/[locale]/(main)/(plan)/_components/FilterButton';
import {SearchPlaceType} from '@/types';
import {useSearchPlace} from '@/hooks/withQuery/get/useSearchPlace';
import SelectCard from '@/app/[locale]/(main)/(plan)/_components/SelectCard';
import MessageBox from '@/app/[locale]/(main)/(plan)/_components/MessageBox';
import BasicButton from '@/components/BasicButton';
import {useTripStore} from '@/store';
import {useRouter} from '@/i18n/routing';

export default function AddPlacePage() {
  const [navSelect, setNavSelect] = useState<string>('search');
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('recommand');

  const selectedPlace = useTripStore.use.selectedPlace();
  const addPlace = useTripStore.use.addPlace();
  const places = useTripStore.use.places();
  const router = useRouter();

  const filterName = [
    {key: '추천장소', value: 'recommand'},
    {key: '관광지', value: 'place'},
    {
      key: '음식점',
      value: 'restaurant',
    },
    {key: '카페', value: 'cafe'},
  ];

  const debounceQuery = useDebounce(search);
  const {searchPlaceList, isLoading} = useSearchPlace(debounceQuery, filter);

  const handleAddPlaceList = () => {
    if (selectedPlace.length > 0) {
      selectedPlace.forEach((place) => {
        if (!places.some((existingPlace) => existingPlace.id === place.id)) {
          addPlace(place);
        }
      });
      router.replace('/plan');
    }
  };

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
      {!debounceQuery ? (
        <div className={'flex-grow overflow-y-auto'}>
          <MessageBox>결과가 이곳에 표시됩니다.</MessageBox>
        </div>
      ) : (
        <div
          className={`flex-grow overflow-y-auto ${selectedPlace.length ? 'mb-20' : 'mb-5'}`}
        >
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
      )}

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
