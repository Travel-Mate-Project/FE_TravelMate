import {useQuery} from '@tanstack/react-query';
import {getSearchStayList} from '@/api';
import {QUERY_KEY} from '@/constants/queryKey';

export const useSearchStay = (searchQuery: string, type: string) => {
  const {data: stayList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.SEARCH_STAY, searchQuery, type],
    queryFn: () => getSearchStayList(searchQuery, type),
  });

  return {stayList, isLoading};
};
