'use client';

import {useTranslations} from 'next-intl';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';

import AuthInput from '@/app/[locale]/(auth)/_components/AuthInput';
import BasicButton from '@/components/BasicButton';
import BasicCheckBox from '@/components/BasicCheckBox';
import {useRouter} from '@/i18n/routing';
import {useAuthStore} from '@/store';
import {SignUpFormValue} from '@/types';

export default function SignUpForm() {
  const t = useTranslations('signUp');
  const {stage, nextStage, previousStage} = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    trigger,
    getValues,
    control,
    setValue,
    watch,
  } = useForm<SignUpFormValue>({
    mode: 'onChange',
  });

  const personalInfoAgreed = watch('personalInfoAgreed');
  const uniqueIdentifierAgreed = watch('uniqueIdentifierAgreed');
  const serviceTermsAgreed = watch('serviceTermsAgreed');

  // 개별 약관 동의 상태가 변경될 때마다 전체 동의 상태를 업데이트
  useEffect(() => {
    const allAgreed =
      personalInfoAgreed && uniqueIdentifierAgreed && serviceTermsAgreed;
    setValue('allTermsAgreed', allAgreed);
  }, [
    personalInfoAgreed,
    uniqueIdentifierAgreed,
    serviceTermsAgreed,
    setValue,
  ]);

  const onSubmit = (data: SignUpFormValue) => {
    if (stage === 1) {
      nextStage(stage);
    } else {
      console.log(data);
      router.push('/welcome');
    }
  };

  const goPreviousStage = () => {
    previousStage(stage);
  };

  const handleNextStage = async () => {
    const isStage1Valid = await trigger([
      'name',
      'email',
      'password',
      'passwordCheck',
    ]);
    if (isStage1Valid) {
      nextStage(stage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {stage === 1 && (
        <div className="flex flex-col gap-5">
          <div>
            <label className="block mb-[6px] font-bold">{t('name')}</label>
            <AuthInput
              label="name"
              placeholder={t('enterName')}
              type="text"
              autoComplete="name"
              register={register}
              required
              rules={{
                required: t('needName'),
              }}
              error={errors.name?.message}
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
                classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-[110px]"
                type="button"
              >
                중복검사
              </BasicButton>
            </div>
          </div>
          <div>
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
          <div>
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
                validate: (value) =>
                  value === getValues('password') || t('passwordMismatch'),
              }}
              error={errors.passwordCheck?.message}
            />
          </div>
          <div className={'flex flex-col gap-3 font-semibold'}>
            <div className={'flex w-full items-center justify-between'}>
              <Controller
                name="allTermsAgreed"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <BasicCheckBox
                    label="본인인증 약관 전체동의 (필수)"
                    checked={field.value ?? false}
                    onChange={(checked) => {
                      field.onChange(checked);
                      setValue('personalInfoAgreed', checked);
                      setValue('uniqueIdentifierAgreed', checked);
                      setValue('serviceTermsAgreed', checked);
                    }}
                  />
                )}
              />
              <span className={'font-sm text-gray100 underline'}>확인하기</span>
            </div>
            <div className={'flex w-full items-center justify-between'}>
              <Controller
                name="personalInfoAgreed"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <BasicCheckBox
                    label="개인정보 수집 이용 동의"
                    checked={field.value ?? false}
                    onChange={field.onChange}
                  />
                )}
              />
              <span className={'font-sm text-gray100 underline'}>확인하기</span>
            </div>
            <div className={'flex w-full items-center justify-between'}>
              <Controller
                name="uniqueIdentifierAgreed"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <BasicCheckBox
                    label="고유식별 정보처리 동의"
                    checked={field.value ?? false}
                    onChange={field.onChange}
                  />
                )}
              />
              <span className={'font-sm text-gray100 underline'}>확인하기</span>
            </div>
            <div className={'flex w-full items-center justify-between'}>
              <Controller
                name="serviceTermsAgreed"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <BasicCheckBox
                    label="서비스 이용약관 동의"
                    checked={field.value ?? false}
                    onChange={field.onChange}
                  />
                )}
              />
              <span className={'font-sm text-gray100 underline'}>확인하기</span>
            </div>
          </div>
        </div>
      )}
      {stage === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <label className="block mb-[6px] font-bold">{t('nickname')}</label>
            <AuthInput
              label="nickname"
              placeholder={t('enterNickname')}
              type="text"
              register={register}
              required
              rules={{
                required: t('needNickname'),
              }}
              error={errors.nickname?.message}
            />
          </div>
          <div>
            <label className="block mb-[6px] font-bold">{t('birthday')}</label>
            <AuthInput
              label="birthday"
              placeholder={t('enterBirthDay')}
              type="number"
              register={register}
              required
              rules={{
                required: t('needBirthDay'),
              }}
              error={errors.birthday?.message}
            />
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mt-12">
        {stage === 2 && (
          <BasicButton
            onClick={goPreviousStage}
            classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-28"
            type="button"
          >
            이전
          </BasicButton>
        )}
        <BasicButton
          onClick={stage === 1 ? handleNextStage : undefined}
          disabled={!isValid}
          classNames="bg-green100 px-3 py-4 rounded-lg text-white font-semibold w-full"
          type="submit"
        >
          {stage === 1 ? '다음' : '완료'}
        </BasicButton>
      </div>
    </form>
  );
}
