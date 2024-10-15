import {useMutation} from '@tanstack/react-query';

import {optimizeTrip} from '@/api/trip';

export const useOptimizeTrip = () => {
  const {mutate: optimizeTripMutation} = useMutation({
    mutationFn: optimizeTrip,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return {optimizeTripMutation};
};
