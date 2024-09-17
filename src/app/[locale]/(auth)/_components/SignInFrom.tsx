'use client';

import {useTranslations} from 'next-intl';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import BasicButton from '@/components/BasicButton';
import {Link} from '@/i18n/routing';
import {SignInFormValue} from '@/types';

export default function SignInFrom() {
  const t = useTranslations('signIn');

  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormValue>();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);
  };

  const onSignIn = (data: SignInFormValue) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSignIn)}>
      <div className={'flex flex-col gap-7'}>
        <div className={''}>
          <label className="block mb-[6px] font-bold">{t('email')}</label>
          <AuthInput
            label="email"
            placeholder={t('enterEmail')}
            type="email"
            autoComplete="email"
            register={register}
            required
            rules={{
              required: t('needEmail'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('emailError'),
              },
            }}
            error={errors.email?.message}
          />
        </div>
        <div className={''}>
          <label className="block mb-[6px] font-bold">{t('password')}</label>
          <AuthInput
            label="password"
            placeholder={t('enterPassword')}
            type="password"
            register={register}
            required
            rules={{
              required: t('needPassword'),
              minLength: {
                value: 8,
                message: t('passwordError'),
              },
            }}
            error={errors.password?.message}
          />
        </div>
      </div>
      <div className={'mt-16'}>
        <BasicButton
          classNames={
            'w-full bg-green100 px-3 py-4 rounded-lg text-white font-semibold'
          }
          type={'submit'}
        >
          {t('logIn')}
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
            <p className={'font-bold'}>{t('rememberEmail')}</p>
          </label>
          <div className={'flex items-center gap-1'}>
            <span className={'font-bold'}>
              <Link href={'/'}>{t('findId')}</Link>
            </span>
            <span>|</span>
            <span className={'font-bold'}>
              <Link href={'/'}>{t('findPassword')}</Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
