import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@/constants/queryKey';
import {getCafeList} from '@/api/place';

export const useGetCafeList = () => {
  const {data: cafeList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.CAFE],
    queryFn: getCafeList,
  });

  return {cafeList, isLoading};
};
