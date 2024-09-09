import {useTranslations} from 'next-intl';

import LocaleSwitcher from '@/app/[locale]/_components/LocaleSwitcher';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      {/*<Link href="/about">{t('about')}</Link>*/}
      <LocaleSwitcher />
    </div>
  );
}
