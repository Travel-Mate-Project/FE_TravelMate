import {DB} from '@/db/db';
import {TravelLocation} from '@/util/tripOptimizer';

export type RegionType = (typeof DB)['region'][0];

export type CityCodeType = (typeof DB)['cityCode'][0];

export type SearchPlaceType = (typeof DB)['searchPlace'][0];

export interface OptimizeTripResponse {
  formattedRoutes: string;
  totalTripDistance: string;
  executionTime: string;
  optimizedPlan: TravelLocation[][];
}
