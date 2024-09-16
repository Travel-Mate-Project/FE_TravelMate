'use client';

import {useTranslations} from 'next-intl';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import BasicButton from '@/components/BasicButton';
import {useRouter} from '@/i18n/routing';
import {useAuthStore} from '@/store';
import {SignUpFormValue} from '@/types';

export default function SignUpForm() {
  const t = useTranslations('signIn');
  const {stage, nextStage, previousStage} = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<SignUpFormValue>>({});

  const {
    register: registerStage1,
    handleSubmit: handleSubmitStage1,
    formState: {errors: errorsStage1, isValid: isValidStage1},
  } = useForm<
    Pick<SignUpFormValue, 'name' | 'email' | 'password' | 'passwordCheck'>
  >({
    mode: 'onChange',
  });

  const {
    register: registerStage2,
    handleSubmit: handleSubmitStage2,
    formState: {errors: errorsStage2, isValid: isValidStage2},
  } = useForm<Pick<SignUpFormValue, 'nickname' | 'birthday'>>({
    mode: 'onChange',
  });

  const onSubmitStage1 = (
    data: Pick<
      SignUpFormValue,
      'name' | 'email' | 'password' | 'passwordCheck'
    >,
  ) => {
    setFormData((prevData) => ({...prevData, ...data}));
    nextStage(stage);
  };

  const onSubmitStage2 = (
    data: Pick<SignUpFormValue, 'nickname' | 'birthday'>,
  ) => {
    const finalData = {...formData, ...data};
    console.log(finalData);
    router.push('/welcome');
  };

  const goPreviousStage = () => {
    previousStage(stage);
  };

  return (
    <>
      {stage === 1 && (
        <form onSubmit={handleSubmitStage1(onSubmitStage1)}>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block mb-[6px] font-bold">{t('name')}</label>
              <AuthInput
                label="name"
                placeholder={t('enterName')}
                type="text"
                autoComplete="name"
                register={registerStage1}
                required
                rules={{
                  required: t('needName'),
                }}
                error={errorsStage1.name?.message}
              />
            </div>
            <div>
              <label className="block mb-[6px] font-bold">{t('email')}</label>
              <div className="flex gap-2 items-center">
                <AuthInput
                  label="email"
                  placeholder={t('enterEmail')}
                  type="text"
                  autoComplete="email"
                  register={registerStage1}
                  required
                  rules={{
                    required: t('needEmail'),
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t('emailError'),
                    },
                  }}
                  error={errorsStage1.email?.message}
                />
                <BasicButton
                  classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-28"
                  type="button"
                >
                  중복검사
                </BasicButton>
              </div>
            </div>
            <div>
              <label className="block mb-[6px] font-bold">
                {t('password')}
              </label>
              <AuthInput
                label="password"
                placeholder={t('enterPassword')}
                type="password"
                register={registerStage1}
                required
                rules={{
                  required: t('needPassword'),
                  minLength: {
                    value: 8,
                    message: t('passwordError'),
                  },
                }}
                error={errorsStage1.password?.message}
              />
            </div>
            <div>
              <label className="block mb-[6px] font-bold">
                {t('passwordCheck')}
              </label>
              <AuthInput
                label="passwordCheck"
                placeholder={t('enterPasswordCheck')}
                type="password"
                register={registerStage1}
                required
                rules={{
                  required: t('needPasswordCheck'),
                  validate: (value, formValues) =>
                    value === formValues.password || t('passwordMismatch'),
                }}
                error={errorsStage1.passwordCheck?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <BasicButton
              disabled={!isValidStage1}
              classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-full"
              type="submit"
            >
              다음
            </BasicButton>
          </div>
        </form>
      )}
      {stage === 2 && (
        <form onSubmit={handleSubmitStage2(onSubmitStage2)}>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block mb-[6px] font-bold">
                {t('nickname')}
              </label>
              <AuthInput
                label="nickname"
                placeholder={t('enterNickname')}
                type="text"
                register={registerStage2}
                required
                rules={{
                  required: t('needNickname'),
                }}
                error={errorsStage2.nickname?.message}
              />
            </div>
            <div>
              <label className="block mb-[6px] font-bold">
                {t('birthday')}
              </label>
              <AuthInput
                label="birthday"
                placeholder={t('enterBirthDay')}
                type="date"
                register={registerStage2}
                required
                rules={{
                  required: t('needBirthDay'),
                }}
                error={errorsStage2.birthday?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <BasicButton
              onClick={goPreviousStage}
              classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-28"
              type="button"
            >
              이전
            </BasicButton>
            <BasicButton
              disabled={!isValidStage2}
              classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-full"
              type="submit"
            >
              완료
            </BasicButton>
          </div>
        </form>
      )}
    </>
  );
}
