import {create, StateCreator} from 'zustand';

import {createSelectors} from '@/store/creatSelectors';
import {createDateSlice} from '@/store/trip/slice/dateSlice';
import {creatMapSLice} from '@/store/trip/slice/mapSlice';
import {creatPlaceSlice} from '@/store/trip/slice/placeSlice';
import {creatRegionSlice} from '@/store/trip/slice/regionSlice';
import {createTimeSlice} from '@/store/trip/slice/timeSlice';
import {creatTripTypeSlice} from '@/store/trip/slice/tripTypeSlice';
import {
  DateSlice,
  MapSlice,
  PlaceSlice,
  RegionSLice,
  SelectPlaceSlice,
  StaySlice,
  TimeSlice,
  TripTypeSlice,
} from '@/types';
import {creatSelectPlaceSlice} from '@/store/trip/slice/selectPlaceSlice';
import {createStaySlice} from '@/store/trip/slice/staySlice';

export interface TripStore
  extends DateSlice,
    TimeSlice,
    RegionSLice,
    TripTypeSlice,
    MapSlice,
    PlaceSlice,
    SelectPlaceSlice,
    StaySlice {}

export const createTripStore: StateCreator<TripStore> = (...a) => ({
  ...createDateSlice(...a),
  ...createTimeSlice(...a),
  ...creatRegionSlice(...a),
  ...creatTripTypeSlice(...a),
  ...creatMapSLice(...a),
  ...creatPlaceSlice(...a),
  ...creatSelectPlaceSlice(...a),
  ...createStaySlice(...a),
});

export const tripStoreBase = create<TripStore>()((...a) => ({
  ...createTripStore(...a),
}));

export const useTripStore = createSelectors(tripStoreBase);
