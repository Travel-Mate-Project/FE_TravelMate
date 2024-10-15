import {axiosDefault} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';
import {Accommodation, TravelLocation} from '@/util/tripOptimizer';

export const optimizeTrip = async ({
  attractions,
  accommodations,
}: {
  attractions: TravelLocation[];
  accommodations: Accommodation[];
}) => {
  const res = await axiosDefault.post(END_POINT.trip.optimizeTrip, {
    attractions,
    accommodations,
  });

  return res.data;
};
