import {getSearchPlaceList} from '@/api';
import {QUERY_KEY} from '@/constants/queryKey';
import {useQuery} from '@tanstack/react-query';

export const useSearchPlace = (query: string, type: string) => {
  const {data: searchPlaceList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.SEARCH_PLACE, query, type],
    queryFn: () => getSearchPlaceList(query, type),
    enabled: !!query,
  });

  return {searchPlaceList, isLoading};
};
