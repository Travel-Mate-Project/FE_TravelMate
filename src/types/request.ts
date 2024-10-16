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

export interface TripData {
  attractions: TravelLocation[];
  accommodations: Accommodation[];
  title: string;
  region: string;
  startDate: Date;
  endDate: Date;
}
