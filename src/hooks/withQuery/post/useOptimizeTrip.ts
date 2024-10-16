import {useMutation} from '@tanstack/react-query';

import {optimizeTrip} from '@/api/trip';
import {useKakaoRoute} from '@/hooks/useKakaoRoute';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';

export const useOptimizeTrip = () => {
  const router = useRouter();
  const {region, dateAndTime, places, date} = useTripStore();
  const [startDate, endDate] = date;
  const setOptimizationResult = useTripStore.use.setOptimizationResult();
  const {getRoute} = useKakaoRoute();

  const {mutate: optimizeTripMutation} = useMutation({
    mutationFn: optimizeTrip,
    onSuccess: async (data) => {
      const dailyTravelTimes = await Promise.all(
        data.optimizedTrip.map(async (day: any) => {
          return await getRoute(day);
        }),
      );

      const finalData = {
        ...data,
        region,
        date,
        totalAttractions: places.length,
        dateAndTime,
        startDate,
        endDate,
        dailyTravelTimes,
      };

      setOptimizationResult(finalData);
      sessionStorage.setItem('OTMP', JSON.stringify(finalData));
      router.push(`/result`);
    },
  });

  return {optimizeTripMutation};
};
