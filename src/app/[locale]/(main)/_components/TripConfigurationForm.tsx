'use client';

import dayjs from 'dayjs';
import {useTranslations} from 'next-intl';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';

import CustomDropdownSelectBox from '@/app/[locale]/(main)/_components/CustomDropdownSelectBox';
import Subtract from '@/asset/subtract.svg';
import Autocomplete from '@/components/Autocomplete';
import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import {useDebounce} from '@/hooks/useDebounce';
import useOutsideClick from '@/hooks/useOutsideClick';
import {Link, useRouter} from '@/i18n/routing';
import {CityCodeType, TripConfigurationFormValue} from '@/types';

import 'dayjs/locale/ko';
import {useTripStore} from '@/store';
import {useGetCityCode} from '@/hooks/withQuery/get/useGetCityCode';

export default function TripConfigurationForm() {
  const t = useTranslations('tripConfigPanel');
  const {
    date,
    isSelected,
    setRegion,
    setRegionCode: setStoreCityCode,
    setType,
  } = useTripStore();
  const [startDate, endDate] = date;
  const [cityName, setCityName] = useState<string>('');
  const [cityCode, setCityCode] = useState<number>();
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState<boolean>(false);
  const route = useRouter();

  const {register, handleSubmit, control, setValue} =
    useForm<TripConfigurationFormValue>();
  const formRef = useRef<HTMLFormElement>(null);

  const searchQuery = useWatch({
    control: control,
    name: 'search',
    defaultValue: '',
  });

  const debounceQuery = useDebounce(searchQuery);
  useOutsideClick(formRef, () => {
    if (!cityCode) {
      setValue('search', '');
    }
    setIsAutocompleteOpen(false);
  });
  const {filteredCityList, isLoading} = useGetCityCode(debounceQuery, 1);

  const handleMakeTrip = (data: TripConfigurationFormValue) => {
    if (!cityCode) {
      return;
    }

    setRegion(data.search);
    setStoreCityCode(cityCode);
    setType(data.single);

    if (data.single === 'together') {
      route.push('/invite');
    }
    if (data.single === 'alone') {
      route.push('/time');
    }
  };

  const handleAutocompleteSelect = (selection: string, code: number) => {
    setCityCode(code);
    setCityName(selection);
    setValue('search', selection);
    setIsAutocompleteOpen(false);
  };

  useEffect(() => {
    if (isSelected) {
      setValue('startDate', dayjs(startDate).format('YYYY.MM.DD'));
      setValue('endDate', dayjs(endDate).format('YYYY.MM.DD'));
    }
  }, [startDate, endDate, isSelected]);

  useEffect(() => {
    if (cityName !== searchQuery) {
      setCityCode(undefined);
    }
  }, [cityName, searchQuery]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleMakeTrip)}
      className={'flex flex-col items-center mt-2 w-full'}
    >
      <div className={'relative w-full'}>
        <BasicInput
          classNames={
            'w-full pb-3 pt-9 border-y border-solid border-gray100 font-semibold placeholder:text-black placeholder:font-semibold focus:outline-none z-10'
          }
          label={'search'}
          placeholder={t('whereEver')}
          autoComplete={'off'}
          type={'text'}
          register={register}
          required
          onFocus={() => setIsAutocompleteOpen(true)}
          onBlur={() => () => setIsAutocompleteOpen(false)}
        />
        <span
          className={
            'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
          }
        >
          {t('locationSearch')}
        </span>
        {isAutocompleteOpen && debounceQuery && (
          <Autocomplete>
            {filteredCityList.length > 0 ? (
              filteredCityList.map((place: CityCodeType) => (
                <li className={'p-1'} key={place.code}>
                  <button
                    onClick={() =>
                      handleAutocompleteSelect(place.name, place.code)
                    }
                    className={'flex items-center font-semibold'}
                  >
                    <Subtract className={'mr-1'} /> {place.name}
                  </button>
                </li>
              ))
            ) : isLoading ? (
              <li className={'p-1'}>
                <span className={'flex items-center font-semibold'}>
                  로딩중....
                </span>
              </li>
            ) : (
              <li className={'p-1'}>
                <span className={'flex items-center font-semibold'}>
                  검색 결과가 없습니다.
                </span>
              </li>
            )}
          </Autocomplete>
        )}
      </div>
      <Link href={'/date'} className={'flex relative'}>
        <div className={'relative'}>
          <BasicInput
            classNames={
              'w-full pb-3 pt-9 placeholder:text-black font-semibold placeholder:font-semibold focus:outline-none z-10'
            }
            label={'startDate'}
            placeholder={t('addDate')}
            type={'text'}
            register={register}
            required
            readOnly
          />
          <span
            className={
              'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
            }
          >
            {t('startDay')}
          </span>
        </div>
        <div
          className={
            'relative right-6 top-3 border-l border-solid border-gray100 h-12'
          }
        ></div>
        <div className={'relative'}>
          <BasicInput
            classNames={
              'w-full pb-3 pt-9 placeholder:text-black font-semibold placeholder:font-semibold focus:outline-none z-10'
            }
            label={'endDate'}
            placeholder={t('addDate')}
            type={'text'}
            register={register}
            required
            readOnly
          />
          <span
            className={
              'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
            }
          >
            {t('endDay')}
          </span>
        </div>
      </Link>
      <div className={'relative w-full'}>
        <Controller
          name="single"
          control={control}
          defaultValue="alone"
          rules={{required: true}}
          render={({field}) => (
            // 옵션 value는 백엔드와 상의 후 교체
            <CustomDropdownSelectBox
              options={[
                {value: 'alone', label: t('alone')},
                {value: 'together', label: t('together')},
              ]}
              value={field.value}
              onChange={field.onChange}
              classNames="appearance-none w-full pb-3 pt-9 border-y border-solid border-gray100 font-semibold placeholder:text-black placeholder:font-semibold focus:outline-none"
              label={'tripType'}
            />
          )}
        />
        <span
          className={
            'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
          }
        >
          {t('tripType')}
        </span>
      </div>

      <BasicButton
        classNames={
          'w-full mt-5 bg-green100 px-3 py-4 rounded-lg text-white font-semibold'
        }
        type={'submit'}
      >
        {t('makeTrip')}
      </BasicButton>
    </form>
  );
}
