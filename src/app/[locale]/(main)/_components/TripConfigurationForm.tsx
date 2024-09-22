'use client';

import React from 'react';
import {useForm, useWatch} from 'react-hook-form';

import Autocomplete from '@/components/Autocomplete';
import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import Subtract from '@/asset/subtract.svg';
import {useDebounce} from '@/hooks/useDebounce';
import {TripConfigurationFormValue} from '@/types';
import {Link} from '@/i18n/routing';

export default function TripConfigurationForm() {
  const {register, handleSubmit, control} =
    useForm<TripConfigurationFormValue>();

  const searchQuery = useWatch({
    control: control,
    name: 'search',
    defaultValue: '',
  });

  const debounceQuery = useDebounce(searchQuery);

  const handleMakeTrip = (data: TripConfigurationFormValue) => {
    console.log('handleMakeTrip', data);
  };

  // console.log('debounceQuery', debounceQuery);

  return (
    <form
      onSubmit={handleSubmit(handleMakeTrip)}
      className={'flex flex-col items-center mt-2 w-full'}
    >
      <div className={'relative w-full'}>
        <BasicInput
          classNames={
            'w-full pb-3 pt-9 border-y border-solid border-gray100 placeholder:text-black placeholder:font-semibold focus:outline-none z-10'
          }
          label={'search'}
          placeholder={'어디든지'}
          type={'text'}
          register={register}
          required
        />
        <span
          className={
            'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
          }
        >
          지역검색
        </span>
        {debounceQuery && (
          <Autocomplete>
            {new Array(3).fill(0).map((_, i) => (
              // 임시 배열 설정 추후 MSW 테스트 필요
              <li className={'p-1'} key={i}>
                <Link className={'flex items-center'} href={`#${i}`}>
                  <Subtract className={'mr-1'} /> example
                </Link>
              </li>
            ))}
          </Autocomplete>
        )}
      </div>
      <div className={'flex'}>
        <div className={'relative'}>
          <BasicInput
            classNames={
              'w-full pb-3 pt-9 placeholder:text-black placeholder:font-semibold focus:outline-none z-10'
            }
            label={'startDate'}
            placeholder={'날짜추가'}
            type={'text'}
            register={register}
            required
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
              'w-full pb-3 pt-9 placeholder:text-black placeholder:font-semibold focus:outline-none z-10'
            }
            label={'endDate'}
            placeholder={'날짜추가'}
            type={'text'}
            register={register}
            required
          />
          <span
            className={
              'absolute left-0 top-3.5 text-gray300 text-sm pointer-events-none'
            }
          >
            도착일
          </span>
        </div>
      </div>
      <div className={'relative w-full'}>
        <BasicInput
          classNames={
            'w-full pb-3 pt-9 border-y border-solid border-gray100 placeholder:text-black placeholder:font-semibold focus:outline-none z-10'
          }
          label={'single'}
          placeholder={'선택'}
          type={'text'}
          register={register}
          required
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
