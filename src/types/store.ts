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

export interface PlaceSLice {
  city: string;
  cityCode: number;
  setCity: (_place: string) => void;
  setCityCode: (_placeCode: number) => void;
}

export interface DateAndTimeProp {
  date: string; // YYYY-MM-DD
  start: string; // 24:00
  end: string; // 24:00
}

export interface TimeSlice {
  dateAndTime: DateAndTimeProp[];
  initializeTime: (_startDate: Date, _endDate: Date) => void;
  updateDateAndTime: (updatedDateAndTime: DateAndTimeProp[]) => void;
  updateSingleDateAndTime: (date: string, start: string, end: string) => void;
  clearTime: () => void;
}

export interface TripTypeSlice {
  type: string;
  setType: (_type: string) => void;
}
