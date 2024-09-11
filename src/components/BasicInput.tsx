import {useTranslations} from 'next-intl';

import {BasicInputProps} from '@/types';

export default function BasicInput({
  placeholder,
  type,
  classNames,
  translationNamespace,
}: BasicInputProps) {
  const t = useTranslations(translationNamespace);
  return (
    <input className={classNames} type={type} placeholder={t(placeholder)} />
  );
}
