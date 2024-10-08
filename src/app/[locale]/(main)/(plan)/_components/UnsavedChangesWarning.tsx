'use client';

import {ReactNode, useEffect} from 'react';
import {useRouter} from '@/i18n/routing';

export default function UnsavedChangesWarning({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 새로고침 시 경고 메시지 표시
      const message =
        '변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?';
      e.returnValue = message; // 브라우저에 따라 이 메시지가 표시될 수 있음
      return message; // 일부 브라우저에서는 이 반환값을 사용
    };

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // 페이지가 bfcache에서 복원된 경우 (새로고침)
        router.replace('/');
      }
    };

    const timestamp = sessionStorage.getItem('pageLoadTimestamp');
    const currentTime = Date.now().toString();

    if (timestamp) {
      // 타임스탬프가 존재하면 새로고침으로 간주
      router.replace('/');
    }

    sessionStorage.setItem('pageLoadTimestamp', currentTime);

    // 이벤트 리스너 추가
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
      sessionStorage.removeItem('pageLoadTimestamp');
    };
  }, [router]);

  return <>{children}</>;
}
