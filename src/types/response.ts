import {DB} from '@/db/db';
import {DateAndTimeProp} from '@/types/store';
import {TravelLocation} from '@/util/tripOptimizer';

export type RegionType = (typeof DB)['region'][0];

export type CityCodeType = (typeof DB)['cityCode'][0];

export type SearchPlaceType = (typeof DB)['searchPlace'][0];

export interface OptimizeTripResponse {
  id: number;
  optimizedTrip: TravelLocation[][];
  totalTripTime: number;
  formattedRoutes: string;
  totalTripDistance: number;
  totalExecutionTime: number;
  totalAttractions: number;
  title: string;
  region: string;
  startDate: Date;
  endDate: Date;
  dateAndTime: DateAndTimeProp[];
  dailyTravelTimes: number[][];
}
