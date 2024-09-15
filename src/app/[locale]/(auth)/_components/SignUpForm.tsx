'use client';

import {useForm} from 'react-hook-form';
import {SignUpFormValue} from '@/types';
import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import React from 'react';
import {useTranslations} from 'next-intl';

export default function SignUpForm() {
  const t = useTranslations('signIn');

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFormValue>();

  const onSignUp = () => {};

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <div className={'flex flex-col gap-5'}>
        <div className={''}>
          <label className="block mb-[6px] font-bold">{t('name')}</label>
          <AuthInput
            label="name"
            placeholder={t('enterName')}
            type="text"
            autoComplete="email"
            register={register}
            required
            rules={{
              required: t('needName'),
            }}
            error={errors.email?.message}
          />
        </div>
        <div className={''}>
          <label className="block mb-[6px] font-bold">{t('email')}</label>
          <AuthInput
            label="name"
            placeholder={t('enterEmail')}
            type="text"
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
        <div className={''}>
          <label className="block mb-[6px] font-bold">
            {t('passwordCheck')}
          </label>
          <AuthInput
            label="passwordCheck"
            placeholder={t('enterPasswordCheck')}
            type="password"
            register={register}
            required
            rules={{
              required: t('needPasswordCheck'),
              minLength: {
                value: 8,
                message: t('passwordCheckError'),
              },
            }}
            error={errors.password?.message}
          />
        </div>
      </div>
    </form>
  );
}
