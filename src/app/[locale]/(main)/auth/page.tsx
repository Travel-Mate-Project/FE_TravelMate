import Image from 'next/image';
import {useTranslations} from 'next-intl';

import md from '@/asset/md.svg';
import NavigationButton from '@/components/NavigationButton';
import {Link} from '@/i18n/routing';

export default function AuthPage() {
  const t = useTranslations('Auth');
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold pb-3">logo</p>
        <h3 style={{whiteSpace: 'pre-line'}} className="text-2xl font-bold">
          {t('intro')}
        </h3>
        <div className={'w-96'}>
          <div className={'relative'}>
            <NavigationButton
              classNames={'bg-kakaoBg p-3 rounded-lg w-full mt-12'}
              href={'/'}
              type={'button'}
            >
              {t('kakao')}
            </NavigationButton>
            <Image
              className={'absolute top-16 left-6'}
              src={md}
              alt={'kakao'}
            />
          </div>
          <div className={'flex items-center my-3'}>
            <div
              className={
                'flex-1 max-h-[1px] border-t border-solid border-gray100'
              }
            />
            <p className={'px-4 text-gray200'}>{t('or')}</p>
            <div
              className={
                'flex-1 max-h-[1px] border-t border-solid border-gray100'
              }
            />
          </div>
          <NavigationButton
            classNames={
              'bg-transparent border border-solid border-gray100 p-3 rounded-lg w-full'
            }
            href={'/'}
            type={'button'}
          >
            <p className={'text-gray200 font-semibold'}>{t('email')}</p>
          </NavigationButton>
          <div
            className={
              'flex items-center justify-center mt-10 text-sm text-gray900'
            }
          >
            <p className={' mr-5'}>{t('alreadyUser')}</p>
            <Link className={'font-bold underline'} href={'/signin'}>
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
