import {StateCreator} from 'zustand';
import {OptimizeTripResponse, ResultState} from '@/types';

export const createResultSlice: StateCreator<ResultState> = (set) => ({
  optimizationResult: null,
  title: '',

  setTitle: (title: string) => {
    set({title});
  },

  setOptimizationResult: (result: OptimizeTripResponse) => {
    set({optimizationResult: result});
  },

  resetOptimizationResult: () => {
    set({optimizationResult: null});
  },

  updateItinerary: (dayIndex: number, fromIndex: number, toIndex: number) => {
    set((state) => {
      if (!state.optimizationResult) {
        return state;
      }

      const newOptimizedTrip = state.optimizationResult.optimizedTrip.map(
        (dayPlan, idx) => {
          if (idx === dayIndex) {
            const newDayPlan = [...dayPlan];
            const [movedItem] = newDayPlan.splice(fromIndex, 1);
            newDayPlan.splice(toIndex, 0, movedItem);
            return newDayPlan;
          }
          return dayPlan;
        },
      );

      const updatedResult: OptimizeTripResponse = {
        ...state.optimizationResult,
        optimizedTrip: newOptimizedTrip,
      };

      return {optimizationResult: updatedResult};
    });
  },

  removeItineraryItem: (dayIndex: number, itemIndex: number) => {
    set((state) => {
      if (!state.optimizationResult) {
        return state;
      }

      const updatedOptimizedTrip = state.optimizationResult.optimizedTrip.map(
        (dailyPlan, index) => {
          if (index === dayIndex) {
            // 해당 일차에서 특정 항목 제거
            return dailyPlan.filter((_, idx) => idx !== itemIndex);
          }
          return dailyPlan;
        },
      );

      // 업데이트된 최적화 결과 생성
      const updatedResult: OptimizeTripResponse = {
        ...state.optimizationResult,
        optimizedTrip: updatedOptimizedTrip,
        // 총 여행지 수 업데이트
        totalAttractions: state.optimizationResult.totalAttractions - 1,
      };

      return {optimizationResult: updatedResult};
    });
  },
});
