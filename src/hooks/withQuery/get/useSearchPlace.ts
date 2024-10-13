import {useQuery} from '@tanstack/react-query';

import {getSearchPlaceList} from '@/api';
import {QUERY_KEY} from '@/constants/queryKey';

export const useSearchPlace = (query: string, type: string) => {
  const {data: searchPlaceList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.SEARCH_PLACE, query, type],
    queryFn: () => getSearchPlaceList(query, type),
  });

  return {searchPlaceList, isLoading};
};
