'use client';

import React from 'react';
import {useForm} from 'react-hook-form';

import BasicInput from '@/components/BasicInput';
import {TripConfigurationFormValue} from '@/types';
import BasicButton from '@/components/BasicButton';

export default function TripConfigurationForm() {
  const {register, handleSubmit} = useForm<TripConfigurationFormValue>();

  const handleMakeTrip = (data: TripConfigurationFormValue) => {
    console.log('handleMakeTrip', data);
  };

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
            'absolute left-0 top-4 text-gray300 text-sm pointer-events-none'
          }
        >
          지역검색
        </span>
      </div>
      <div className={'flex'}>
        <div className={'relative'}>
          <BasicInput
            classNames={
              'w-full pb-3 pt-9 placeholder:text-black placeholder:font-semibold focus:outline-none z-10'
            }
            label={'search'}
            placeholder={'날짜추가'}
            type={'text'}
            register={register}
            required
          />
          <span
            className={
              'absolute left-0 top-4 text-gray300 text-sm pointer-events-none'
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
            label={'search'}
            placeholder={'날짜추가'}
            type={'text'}
            register={register}
            required
          />
          <span
            className={
              'absolute left-0 top-4 text-gray300 text-sm pointer-events-none'
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
          label={'search'}
          placeholder={'선택'}
          type={'text'}
          register={register}
          required
        />
        <span
          className={
            'absolute left-0 top-4 text-gray300 text-sm pointer-events-none'
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
