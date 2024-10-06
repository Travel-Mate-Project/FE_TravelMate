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
  date: string;
  start: string;
  end: string;
}

export interface TimeSlice {
  dateAndTime: DateAndTimeProp[];
  initializeTime: (_startDate: Date, _endDate: Date) => void;
  setTime: (_date: string, _start: string, _end: string) => void; // 특정 날짜의 시간 조정
  clearTime: () => void;
}

export interface TripTypeSlice {
  type: string;
  setType: (_type: string) => void;
}
