'use client';

import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {SignUpFromValue} from '@/types';
import React, {useState} from 'react';
import BasicButton from '@/components/BasicButton';
import {Link} from '@/i18n/routing';

export default function SignInFrom() {
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFromValue>();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);
  };

  const onSignUp: SubmitHandler<SignUpFromValue> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <div className={'flex flex-col gap-9'}>
        <div className={''}>
          <label className="block mb-[6px] font-bold">이메일</label>
          <AuthInput
            label="email"
            placeholder="이메일"
            type="email"
            autoComplete="email"
            register={register}
            required
            rules={{
              required: '이메일은 필수입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message:
                  '이메일 형식이 올바르지 않습니다. (example@example.com)',
              },
            }}
            error={errors.email?.message}
          />
        </div>
        <div className={''}>
          <label className="block mb-[6px] font-bold">비밀번호</label>
          <AuthInput
            label="password"
            placeholder="비밀번호"
            type="password"
            register={register}
            required
            rules={{
              required: '비밀번호를 입력해 주세요.',
              minLength: {
                value: 8,
                message:
                  '비밀번호 형식이 올바르지 않습니다.\n' +
                  '(영문 대소문자/숫자/특수문자 포함 8자 이상)',
              },
            }}
            error={errors.password?.message}
          />
        </div>
      </div>
      <div className={'mt-16'}>
        <BasicButton
          classNames={
            'bg-green100 px-3 py-4 rounded-lg text-white font-semibold'
          }
          type={'submit'}
        >
          로그인
        </BasicButton>
        <div className={'flex items-center justify-between mt-5'}>
          <label
            htmlFor={'email-save'}
            className="flex items-center space-x-2 cursor-pointer "
          >
            <input
              id={'email-save'}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <p className={'font-bold'}>이메일 기억</p>
          </label>
          <div className={'flex items-center gap-1'}>
            <span className={'font-bold'}>
              <Link href={'/'}>아이디 찾기</Link>
            </span>
            <span>|</span>
            <span className={'font-bold'}>
              <Link href={'/'}>비밀번호 찾기</Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
