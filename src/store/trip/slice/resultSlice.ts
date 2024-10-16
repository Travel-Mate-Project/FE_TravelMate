import {StateCreator} from 'zustand';
import {OptimizeTripResponse, ResultState} from '@/types';
import {TravelLocation} from '@/util/tripOptimizer';

export const createResultSlice: StateCreator<ResultState> = (set) => ({
  optimizationResult: null,

  setOptimizationResult: (result: OptimizeTripResponse) => {
    set({optimizationResult: result});
  },

  resetOptimizationResult: () => {
    set({optimizationResult: null});
  },

  updateDailyPlan: (dayIndex: number, newPlan: TravelLocation[]) => {
    set((state) => {
      if (!state.optimizationResult) {
        return state;
      }

      const updatedOptimizedTrip = state.optimizationResult.optimizedTrip.map(
        (dailyPlan, index) => (index === dayIndex ? newPlan : dailyPlan),
      );

      // 업데이트된 최적화 결과 생성
      const updatedResult: OptimizeTripResponse = {
        ...state.optimizationResult,
        optimizedTrip: updatedOptimizedTrip,
      };

      return {optimizationResult: updatedResult};
    });
  },
});
