import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

import {ServerPrefetchProviderProps} from '@/types';

export default async function ServerPrefetchProvider({
  children,
  queries,
}: ServerPrefetchProviderProps) {
  const queryClient = new QueryClient();

  const queriesToPrefetch = Array.isArray(queries) ? queries : [queries];

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
}
