'use client';

import {useRouter} from '@/i18n/routing';
import {BasicButtonProps} from '@/types';

interface NavigationButtonProps extends Omit<BasicButtonProps, 'onClick'> {
  href: string;
}

export default function NavigationButton({
  children,
  classNames,
  type,
  href,
}: NavigationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button type={type} className={`${classNames}`} onClick={handleClick}>
      {children}
    </button>
  );
}
