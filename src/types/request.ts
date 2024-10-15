import {Accommodation, TravelLocation} from '@/util/tripOptimizer';

export interface SignUpReq {
  userEmail: string;
  password: string;
  userName: string;
}

export interface SignInReq {
  userEmail: string;
  password: string;
}

export interface OptimizeTripRequest {
  attractions: TravelLocation[];
  accommodations: Accommodation[];
}
