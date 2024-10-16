import {useMutation} from '@tanstack/react-query';

import {optimizeTrip} from '@/api/trip';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';

export const useOptimizeTrip = () => {
  const router = useRouter();
  const setOptimizationResult = useTripStore.use.setOptimizationResult();

  const {mutate: optimizeTripMutation} = useMutation({
    mutationFn: optimizeTrip,
    onSuccess: (data) => {
      setOptimizationResult(data);
      sessionStorage.setItem('OTMP', JSON.stringify(data));
      router.push(`/result`);
    },
  });

  return {optimizeTripMutation};
};
