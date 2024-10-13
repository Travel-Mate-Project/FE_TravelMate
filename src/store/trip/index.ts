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
  TimeSlice,
  TripTypeSlice,
} from '@/types';
import {creatSelectPlaceSlice} from '@/store/trip/slice/selectPlaceSlice';

export interface TripStore
  extends DateSlice,
    TimeSlice,
    RegionSLice,
    TripTypeSlice,
    MapSlice,
    PlaceSlice,
    SelectPlaceSlice {}

export const createTripStore: StateCreator<TripStore> = (...a) => ({
  ...createDateSlice(...a),
  ...createTimeSlice(...a),
  ...creatRegionSlice(...a),
  ...creatTripTypeSlice(...a),
  ...creatMapSLice(...a),
  ...creatPlaceSlice(...a),
  ...creatSelectPlaceSlice(...a),
});

export const tripStoreBase = create<TripStore>()((...a) => ({
  ...createTripStore(...a),
}));

export const useTripStore = createSelectors(tripStoreBase);
