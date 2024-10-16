'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {PropsWithChildren, useState} from 'react';

import {useError} from '@/hooks/useError';

function ReactQueryProvider({children}: PropsWithChildren) {
  const errorHandler = useError();

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
          },
        },
        queryCache: new QueryCache({
          onError: errorHandler,
        }),
        mutationCache: new MutationCache({
          onError: errorHandler,
        }),
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
