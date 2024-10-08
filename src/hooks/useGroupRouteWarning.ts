import {usePathname, useRouter} from 'next/navigation';
import {useEffect} from 'react';

export function useGroupRouteWarning() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handlePopState = () => {
      // 현재 URL에 '/trip'이 포함되어 있지 않으면 경고창을 표시
      if (!window.location.pathname.includes('/trip')) {
        const shouldLeave = window.confirm(
          'Trip 페이지를 벗어나려고 합니다. 계속하시겠습니까?',
        );
        if (!shouldLeave) {
          // 사용자가 취소를 선택하면 현재 페이지에 머무름
          window.history.pushState(null, '', pathname);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  return null;
}
