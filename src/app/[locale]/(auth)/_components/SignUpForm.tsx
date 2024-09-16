'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import {SignUpFormValue} from '@/types';
import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import React from 'react';
import {useTranslations} from 'next-intl';
import BasicButton from '@/components/BasicButton';
import {useAuthStore} from '@/store';
import {useRouter} from '@/i18n/routing';

export default function SignUpForm() {
  const t = useTranslations('signIn');

  const {stage, nextStage, previousStage} = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFormValue>();

  const onSignUp: SubmitHandler<SignUpFormValue> = (data) => {
    console.log(data);
    router.push('/welcome');
  };

  const goNextStage = () => {
    nextStage(stage);
  };
  const goPreviousStage = () => {
    previousStage(stage);
  };

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <div className={'flex flex-col gap-5'}>
        {stage === 1 && (
          <>
            <div className={''}>
              <label className="block mb-[6px] font-bold">{t('email')}</label>
              <div className={'flex gap-2'}>
                <AuthInput
                  label="email"
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
                <BasicButton
                  classNames={
                    'bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-32'
                  }
                  type={'submit'}
                >
                  인증요청
                </BasicButton>
              </div>
            </div>
            <div className={''}>
              <label className="block mb-[6px] font-bold">
                {t('emailCheck')}
              </label>
              <div className={'flex gap-2'}>
                <AuthInput
                  label="code"
                  placeholder={t('enterCode')}
                  type="text"
                  register={register}
                  required
                  rules={{
                    required: t('needCode'),
                    minLength: {
                      value: 8,
                      message: t('codeCheckError'),
                    },
                  }}
                  error={errors.password?.message}
                />
                <BasicButton
                  classNames={
                    'bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-32'
                  }
                  type={'submit'}
                >
                  인증확인
                </BasicButton>
              </div>
            </div>
          </>
        )}
        {stage === 2 && (
          <>
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
              <label className="block mb-[6px] font-bold">
                {t('password')}
              </label>
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
          </>
        )}
        {stage === 3 && (
          <>
            <div className={''}>
              <label className="block mb-[6px] font-bold">
                {t('nickName')}
              </label>
              <AuthInput
                label="nickname"
                placeholder={t('enterName')}
                type="text"
                autoComplete="name"
                register={register}
                required
                rules={{
                  required: t('needName'),
                }}
                error={errors.email?.message}
              />
            </div>
            <div className={''}>
              <label className="block mb-[6px] font-bold">
                {t('birthday')}
              </label>
              <AuthInput
                label="birthday"
                placeholder={t('enterBirthDay')}
                type="date"
                autoComplete="name"
                register={register}
                required
                rules={{
                  required: t('needBirthDay'),
                }}
                error={errors.email?.message}
              />
            </div>
          </>
        )}
        {stage === 4 && (
          <>
            <h2>축하합니다</h2>
          </>
        )}
      </div>
      {stage === 3 ? (
        <div className={'flex items-center gap-2 mt-8'}>
          <BasicButton
            onClick={goPreviousStage}
            classNames={
              'bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-32'
            }
            type={'button'}
          >
            이전
          </BasicButton>
          <BasicButton
            classNames={
              'bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-full'
            }
            type={'submit'}
          >
            완료
          </BasicButton>
        </div>
      ) : (
        <div className={'flex items-center gap-2 mt-8'}>
          <BasicButton
            onClick={goPreviousStage}
            classNames={
              'bg-gray100 px-3 py-4 rounded-lg text-white font-semibold w-32'
            }
            type={'button'}
          >
            이전
          </BasicButton>
          <BasicButton
            onClick={goNextStage}
            classNames={
              'bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-full'
            }
            type={'button'}
          >
            다음
          </BasicButton>
        </div>
      )}
    </form>
  );
}
