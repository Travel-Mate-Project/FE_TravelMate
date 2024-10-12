import {useQuery} from '@tanstack/react-query';
import {getPlaceList} from '@/api';
import {QUERY_KEY} from '@/constants/queryKey';

export const useGetPopularPlaceList = () => {
  const {data: placeList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.PLACE],
    queryFn: getPlaceList,
  });

  return {placeList, isLoading};
};
