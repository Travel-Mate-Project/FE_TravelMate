import dayjs from 'dayjs';

import {OptimizeTripResponse, SearchPlaceType} from '@/types/response';

export interface SignupSlice {
  stage: number;
  nextStage: (_stage: number) => void;
  previousStage: (_stage: number) => void;
  clearStage: () => void;
}

export interface DateSlice {
  date: [Date, Date];
  isSelected: boolean;
  setIsSelected: (_isSelect: boolean) => void;
  setDate: (_date: [Date, Date]) => void;
}

export interface RegionSLice {
  region: string;
  regionCode: number;
  setRegion: (_place: string) => void;
  setRegionCode: (_placeCode: number) => void;
}

export interface DateAndTimeProp {
  date: string; // YYYY-MM-DD
  start: string; // 24:00
  end: string; // 24:00
}

export interface TimeSlice {
  dateAndTime: DateAndTimeProp[];
  totalTripTime: string;
  initializeTime: (_startDate: Date, _endDate: Date) => void;
  updateDateAndTime: (_updatedDateAndTime: DateAndTimeProp[]) => void;
  updateSingleDateAndTime: (
    _date: string,
    _start: string,
    _end: string,
  ) => void;
  clearTime: () => void;
  updateTotalTripTime: (_totalTripTime: string) => void;
  clearTotalTripTime: () => void;
}

export interface TripTypeSlice {
  type: string;
  setType: (_type: string) => void;
}

export interface MapSlice {
  totalHeight: number;
  minMapHeight: number;
  maxMapHeight: number;
  mapHeight: number;
  setMapHeight: (_height: number) => void;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface PlaceSlice {
  places: Location[];
  addPlace: (_place: Location) => void;
  removePlace: (id: number) => void;
  updatePlace: (_place: Location[]) => void;
  clearPlaces: () => void;
}

export interface SelectPlaceSlice {
  selectedPlace: SearchPlaceType[];
  addSelectedPlace: (_place: SearchPlaceType) => void;
  removeSelectedPlace: (_id: number) => void;
  clearSelectedPlace: () => void;
}

export interface StayItem {
  date: Date;
  isCheck: boolean;
  stay: Location | null;
}

export interface StaySlice {
  stays: StayItem[];
  selectedStay: Location | null;
  initializeStays: (startDate: Date, endDate: Date) => void;
  toggleStay: (date: dayjs.Dayjs, stayLocation: Location) => void;
  addSelectedStay: (newStay: Location) => void;
  removeSelectedStay: () => void;
  setAll: () => void;
  clearStays: () => void;
}

export interface TransportationSlice {
  transportation: string;
  setTransportation: (_transportation: string) => void;
}

export interface ResultState {
  title: string;
  setTitle: (title: string) => void;
  optimizationResult: OptimizeTripResponse | null;
  setOptimizationResult: (result: OptimizeTripResponse) => void;
  resetOptimizationResult: () => void;
  updateItinerary: (
    dayIndex: number,
    fromIndex: number,
    toIndex: number,
  ) => void;
  removeItineraryItem: (dayIndex: number, itemIndex: number) => void;
}
