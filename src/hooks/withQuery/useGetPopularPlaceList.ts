import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@/constants/queryKey';
import {getPlaceList} from '@/api';

export const useGetPopularPlaceList = () => {
  const {data: placeList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.PLACE],
    queryFn: getPlaceList,
  });

  return {placeList, isLoading};
};
