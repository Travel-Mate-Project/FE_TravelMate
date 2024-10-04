import {useQuery} from '@tanstack/react-query';

import {getCityCodeList} from '@/api';
import {QUERY_KEY} from '@/constants/queryKey';
import {CityCodeType} from '@/types';

export const useGetCityCode = (searchQuery: string, cityCode: number) => {
  const {data: cityCodeList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.CITY_CODE],
    queryFn: () => getCityCodeList(cityCode),
    enabled: !!searchQuery,
  });

  const filteredCityList =
    cityCodeList?.filter((city: CityCodeType) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return {filteredCityList, isLoading};
};
