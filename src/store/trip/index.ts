import {create, StateCreator} from 'zustand';

import {createSelectors} from '@/store/creatSelectors';
import {createDateSlice} from '@/store/trip/slice/dateSlice';
import {creatMapSLice} from '@/store/trip/slice/mapSlice';
import {creatPlaceSlice} from '@/store/trip/slice/placeSlice';
import {creatRegionSlice} from '@/store/trip/slice/regionSlice';
import {createResultSlice} from '@/store/trip/slice/resultSlice';
import {creatSelectPlaceSlice} from '@/store/trip/slice/selectPlaceSlice';
import {createStaySlice} from '@/store/trip/slice/staySlice';
import {createTimeSlice} from '@/store/trip/slice/timeSlice';
import {creatTransportSlice} from '@/store/trip/slice/transportationSlice';
import {creatTripTypeSlice} from '@/store/trip/slice/tripTypeSlice';
import {
  DateSlice,
  MapSlice,
  PlaceSlice,
  RegionSLice,
  ResultState,
  SelectPlaceSlice,
  StaySlice,
  TimeSlice,
  TransportationSlice,
  TripTypeSlice,
} from '@/types';

export interface TripStore
  extends DateSlice,
    TimeSlice,
    RegionSLice,
    TripTypeSlice,
    MapSlice,
    PlaceSlice,
    SelectPlaceSlice,
    StaySlice,
    TransportationSlice,
    ResultState {}

export const createTripStore: StateCreator<TripStore> = (...a) => ({
  ...createDateSlice(...a),
  ...createTimeSlice(...a),
  ...creatRegionSlice(...a),
  ...creatTripTypeSlice(...a),
  ...creatMapSLice(...a),
  ...creatPlaceSlice(...a),
  ...creatSelectPlaceSlice(...a),
  ...createStaySlice(...a),
  ...creatTransportSlice(...a),
  ...createResultSlice(...a),
});

export const tripStoreBase = create<TripStore>()((...a) => ({
  ...createTripStore(...a),
}));

export const useTripStore = createSelectors(tripStoreBase);
