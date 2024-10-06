import {create, StateCreator} from 'zustand';

import {createSelectors} from '@/store/creatSelectors';
import {createDateSlice} from '@/store/trip/slice/dateSlice';
import {creatPlaceSlice} from '@/store/trip/slice/placeSlice';
import {createTimeSlice} from '@/store/trip/slice/timeSlice';
import {creatTripTypeSlice} from '@/store/trip/slice/tripTypeSlice';
import {DateSlice, PlaceSLice, TimeSlice, TripTypeSlice} from '@/types';

export interface TripStore
  extends DateSlice,
    TimeSlice,
    PlaceSLice,
    TripTypeSlice {}

export const createTripStore: StateCreator<TripStore> = (...a) => ({
  ...createDateSlice(...a),
  ...createTimeSlice(...a),
  ...creatPlaceSlice(...a),
  ...creatTripTypeSlice(...a),
});

export const tripStoreBase = create<TripStore>()((...a) => ({
  ...createTripStore(...a),
}));

export const useTripStore = createSelectors(tripStoreBase);
