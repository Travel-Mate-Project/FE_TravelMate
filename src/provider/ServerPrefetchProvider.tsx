import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

import ErrorComponent from '@/components/ServerErrorComponent';
import {ServerPrefetchProviderProps} from '@/types';

export default async function ServerPrefetchProvider({
  children,
  queries,
}: ServerPrefetchProviderProps) {
  const queryClient = new QueryClient();

  const queriesToPrefetch = Array.isArray(queries) ? queries : [queries];

  try {
    await Promise.all(
      queriesToPrefetch.map(({queryKey, queryFn}) =>
        queryClient.prefetchQuery({queryKey, queryFn}),
      ),
    );

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Server-side prefetching failed:', error);

    queryClient.setQueryData(['serverError'], error);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorComponent error={error} />
      </HydrationBoundary>
    );
  }
}
