'use client';

import {useTranslations} from 'next-intl';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import BasicButton from '@/components/BasicButton';
import BasicCheckBox from '@/components/BasicCheckBox';
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

  const handleCheckboxChange = (newCheckedState: boolean) => {
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
        <BasicButton classNames={'w-full'} type={'submit'}>
          {t('logIn')}
        </BasicButton>
        <div
          className={
            'flex items-center justify-between mt-5 font-semibold text-gray800'
          }
        >
          <BasicCheckBox
            label={t('rememberEmail')}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
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
