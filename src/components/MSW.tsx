'use client';
import {useEffect} from 'react';

export default function MSW() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser');
      }
    }
  }, []);

  return null;
}
