import LogoBlack from '@/asset/Logo-black.svg';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      className={
        'relative bottom-0 w-full bg-transparent py-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
      }
    >
      <div className="max-w-[600px] mx-auto px-5 md:px-0">
        <div className={'flex flex-col gap-5'}>
          <div
            className={
              'flex items-center justify-around gap-2.5 text-sm flex-wrap text-gray800'
            }
          >
            <span>{t('serviceIntro')}</span>
            <span>{t('privacyPolicy')}</span>
            <span>{t('termsOfService')}</span>
            <span>{t('customerService')}</span>
            <span>{t('adInquiry')}</span>
          </div>
          <div className={'flex items-center gap-5 w-full'}>
            <LogoBlack width={79} height={20} />
            <span className={'text-gray800 text-sm'}>
              © 2024. Travel Mate. all rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
