import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@/constants/queryKey';
import {getRegionList} from '@/api';

export const useGetPopularRegionList = () => {
  const {data: regionList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.REGION],
    queryFn: getRegionList,
  });

  return {regionList, isLoading};
};
