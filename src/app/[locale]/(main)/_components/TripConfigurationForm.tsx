'use client';

import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';

import BasicSelectBox from '@/app/[locale]/(main)/_components/CustomDropdown';
import Subtract from '@/asset/subtract.svg';
import Autocomplete from '@/components/Autocomplete';
import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import {useDebounce} from '@/hooks/useDebounce';
import useOutsideClick from '@/hooks/useOutsideClick';
import {Link} from '@/i18n/routing';
import {TripConfigurationFormValue} from '@/types';

import 'dayjs/locale/ko';
import {useDateStore} from '@/store';

export default function TripConfigurationForm() {
  const {date, isSelected} = useDateStore();
  const [startDate, endDate] = date;
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState<boolean>(false);

  const {register, handleSubmit, control, setValue} =
    useForm<TripConfigurationFormValue>();
  const formRef = useRef<HTMLFormElement>(null);

  const searchQuery = useWatch({
    control: control,
    name: 'search',
    defaultValue: '',
  });

  const debounceQuery = useDebounce(searchQuery);
  useOutsideClick(formRef, () => setIsAutocompleteOpen(false));

  const handleMakeTrip = (data: TripConfigurationFormValue) => {
    console.log('handleMakeTrip', data);
  };

  const handleAutocompleteSelect = (selection: string) => {
    setValue('search', selection);
    setIsAutocompleteOpen(false);
  };

  useEffect(() => {
    if (isSelected) {
      setValue('startDate', dayjs(startDate).format('YYYY.MM.DD'));
      setValue('endDate', dayjs(endDate).format('YYYY.MM.DD'));
    }
  }, [startDate, endDate, isSelected]);

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
          placeholder={'어디든지'}
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
          지역검색
        </span>
        {isAutocompleteOpen && debounceQuery && (
          <Autocomplete>
            {new Array(3).fill('제주도').map((place, i) => (
              // 임시 배열 설정 추후 MSW 테스트 필요
              <li className={'p-1'} key={i}>
                <button
                  onClick={() => handleAutocompleteSelect(place)}
                  className={'flex items-center font-semibold'}
                >
                  <Subtract className={'mr-1'} /> {place}
                </button>
              </li>
            ))}
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
            placeholder={'날짜추가'}
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
            출발일
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
            placeholder={'날짜추가'}
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
            도착일
          </span>
        </div>
      </Link>
      <div className={'relative w-full'}>
        <Controller
          name="single"
          control={control}
          defaultValue="1"
          rules={{required: true}}
          render={({field}) => (
            // 옵션 value는 백엔드와 상의 후 교체
            <BasicSelectBox
              options={[
                {value: '1', label: '혼자 여행'},
                {value: '2', label: '친구와 여행'},
              ]}
              value={field.value}
              onChange={field.onChange}
              classNames="appearance-none w-full pb-3 pt-9 border-y border-solid border-gray100 font-semibold placeholder:text-black placeholder:font-semibold focus:outline-none"
              label="선택"
            />
          )}
        />
        <span
          className={
            'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
          }
        >
          인원선택
        </span>
      </div>

      <BasicButton
        classNames={
          'w-full mt-5 bg-green100 px-3 py-4 rounded-lg text-white font-semibold'
        }
        type={'submit'}
      >
        일정 만들기
      </BasicButton>
    </form>
  );
}
