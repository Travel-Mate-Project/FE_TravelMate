import {axiosDefault} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';
import {Accommodation, TravelLocation} from '@/util/tripOptimizer';

export const optimizeTrip = async ({
  attractions,
  accommodations,
  title,
  region,
  startDate,
  endDate,
}: {
  attractions: TravelLocation[];
  accommodations: Accommodation[];
  title: string;
  region: string;
  startDate: Date;
  endDate: Date;
}) => {
  const res = await axiosDefault.post(END_POINT.trip.optimizeTrip, {
    attractions,
    accommodations,
    title,
    region,
    startDate,
    endDate,
  });

  return res.data;
};
