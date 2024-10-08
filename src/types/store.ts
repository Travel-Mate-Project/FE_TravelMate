export interface SignupSlice {
  stage: number;
  nextStage: (stage: number) => void;
  previousStage: (stage: number) => void;
  clearStage: () => void;
}

export interface DateSlice {
  date: [Date, Date];
  isSelected: boolean;
  setIsSelected: (isSelect: boolean) => void;
  setDate: (date: [Date, Date]) => void;
}

export interface RegionSLice {
  region: string;
  regionCode: number;
  setRegion: (place: string) => void;
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
  initializeTime: (startDate: Date, endDate: Date) => void;
  updateDateAndTime: (updatedDateAndTime: DateAndTimeProp[]) => void;
  updateSingleDateAndTime: (date: string, start: string, end: string) => void;
  clearTime: () => void;
  updateTotalTripTime: (totalTripTime: string) => void;
  clearTotalTripTime: () => void;
}

export interface TripTypeSlice {
  type: string;
  setType: (type: string) => void;
}

export interface MapSlice {
  totalHeight: number;
  minMapHeight: number;
  maxMapHeight: number;
  mapHeight: number;
  setMapHeight: (height: number) => void;
}
