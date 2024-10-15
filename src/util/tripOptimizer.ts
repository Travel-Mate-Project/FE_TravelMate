import {Location} from '@/types';

export interface TravelLocation extends Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Accommodation extends TravelLocation {
  day: number;
}

export interface TripData {
  attractions: TravelLocation[];
  accommodations: Accommodation[];
}

const degToRad = (deg: number): number => deg * (Math.PI / 180);

const calculateDistance = (
  loc1: TravelLocation,
  loc2: TravelLocation,
): number => {
  const R = 6371;
  const dLat = degToRad(loc2.latitude - loc1.latitude);
  const dLon = degToRad(loc2.longitude - loc1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(loc1.latitude)) *
      Math.cos(degToRad(loc2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const twoOptSwap = (
  route: TravelLocation[],
  i: number,
  k: number,
): TravelLocation[] => {
  const newRoute = route.slice(0, i);
  newRoute.push(...route.slice(i, k + 1).reverse());
  newRoute.push(...route.slice(k + 1));
  return newRoute;
};

const calculateTotalDistance = (route: TravelLocation[]): number => {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(route[i], route[i + 1]);
  }
  return totalDistance;
};

const optimizeRouteWith2Opt = (
  route: TravelLocation[],
  maxIterations: number = 100,
): TravelLocation[] => {
  let bestRoute = [...route];
  let improved = true;
  let iterations = 0;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 1; i < route.length - 2; i++) {
      for (let k = i + 1; k < route.length - 1; k++) {
        const newRoute = twoOptSwap(bestRoute, i, k);
        if (
          calculateTotalDistance(newRoute) < calculateTotalDistance(bestRoute)
        ) {
          bestRoute = newRoute;
          improved = true;
        }
      }
    }
  }

  return bestRoute;
};

const findNearestAttractions = (
  accommodation: Accommodation,
  attractions: TravelLocation[],
  maxAttractions: number,
): TravelLocation[] => {
  return attractions
    .map((attraction) => ({
      attraction,
      distance: calculateDistance(accommodation, attraction),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxAttractions)
    .map((item) => item.attraction);
};

export const planTrip = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): TravelLocation[][] => {
  const dailyRoutes: TravelLocation[][] = [];
  const maxAttractionsPerDay = Math.ceil(
    attractions.length / accommodations.length,
  );

  let remainingAttractions = [...attractions];

  for (const accommodation of accommodations) {
    const nearestAttractions = findNearestAttractions(
      accommodation,
      remainingAttractions,
      maxAttractionsPerDay,
    );

    const dailyRoute = [accommodation, ...nearestAttractions, accommodation];
    const optimizedDailyRoute = optimizeRouteWith2Opt(dailyRoute);

    dailyRoutes.push(optimizedDailyRoute);

    remainingAttractions = remainingAttractions.filter(
      (attraction) => !nearestAttractions.includes(attraction),
    );
  }

  return dailyRoutes;
};

export const formatDailyRoutes = (
  optimizedPlan: TravelLocation[][],
): string => {
  let result = '제주도 여행 최적 경로:\n';
  optimizedPlan.forEach((dailyRoute, index) => {
    result += `\n${index + 1}일차 (숙소: ${dailyRoute[0].name}):\n`;
    dailyRoute.forEach((location, locationIndex) => {
      if (locationIndex === 0 || locationIndex === dailyRoute.length - 1) {
        result += `  숙소: ${location.name}\n`;
      } else {
        result += `  방문지: ${location.name}\n`;
      }
    });
    result += `  총 이동 거리: ${calculateTotalDistance(dailyRoute).toFixed(2)} km\n`;
  });
  return result;
};

export const calculateTotalTripDistance = (
  optimizedPlan: TravelLocation[][],
): number => {
  return optimizedPlan.reduce(
    (sum, day) => sum + calculateTotalDistance(day),
    0,
  );
};

export const measureExecutionTime = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): number => {
  const startTime = performance.now();
  planTrip(attractions, accommodations);
  const endTime = performance.now();
  return endTime - startTime;
};
