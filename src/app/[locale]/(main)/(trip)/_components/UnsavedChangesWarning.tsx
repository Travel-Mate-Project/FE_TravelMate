'use client';

import {ReactNode, useCallback, useEffect} from 'react';
import {useRouter} from '@/i18n/routing';

export default function UnsavedChangesWarning({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const handlePopState = useCallback(() => {
    history.pushState(null, '', location.href);

    const confirmLeave = window.confirm(
      '페이지를 나가시겠습니까? 저장되지 않은 변경사항이 있을 수 있습니다.',
    );

    if (confirmLeave) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // Chrome에서 필요
    };

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // 페이지가 bfcache에서 복원된 경우 (새로고침)
        router.push('/');
      }
    };

    const timestamp = sessionStorage.getItem('pageLoadTimestamp');
    const currentTime = Date.now().toString();

    if (timestamp) {
      // 타임스탬프가 존재하면 새로고침으로 간주
      router.push('/');
    }

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', handlePopState);

    sessionStorage.setItem('pageLoadTimestamp', currentTime);

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', handlePopState);
      sessionStorage.removeItem('pageLoadTimestamp');
    };
  }, [router, handlePopState]);

  return <>{children}</>;
}
