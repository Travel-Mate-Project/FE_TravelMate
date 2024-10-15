export interface TravelLocation extends Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Accommodation extends TravelLocation {
  day: number;
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

const assignAttractionsToAccommodations = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): Map<number, TravelLocation[]> => {
  const assignedAttractions = new Map<number, TravelLocation[]>();
  const attractionsPerDay = Math.ceil(
    attractions.length / accommodations.length,
  );

  accommodations.forEach((acc) => assignedAttractions.set(acc.day, []));

  const sortedAttractions = attractions.sort((a, b) => {
    const aMinDist = Math.min(
      ...accommodations.map((acc) => calculateDistance(a, acc)),
    );
    const bMinDist = Math.min(
      ...accommodations.map((acc) => calculateDistance(b, acc)),
    );
    return aMinDist - bMinDist;
  });

  for (const attraction of sortedAttractions) {
    let bestDay = 1;
    let minScore = Infinity;

    for (const acc of accommodations) {
      const distance = calculateDistance(attraction, acc);
      const currentAssigned = assignedAttractions.get(acc.day)!.length;
      const score = distance * (currentAssigned + 1);

      if (score < minScore) {
        minScore = score;
        bestDay = acc.day;
      }
    }

    const dayAttractions = assignedAttractions.get(bestDay)!;
    if (dayAttractions.length < attractionsPerDay) {
      dayAttractions.push(attraction);
    } else {
      const leastAssignedDay = Array.from(assignedAttractions.entries()).reduce(
        (min, [day, attrs]) =>
          attrs.length < min[1].length ? [day, attrs] : min,
      );
      const leastAssignedDayNumber = leastAssignedDay[0];
      assignedAttractions.get(leastAssignedDayNumber)!.push(attraction);
    }
  }

  return assignedAttractions;
};

export const planTrip = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): TravelLocation[][] => {
  const assignedAttractions = assignAttractionsToAccommodations(
    attractions,
    accommodations,
  );
  const dailyRoutes: TravelLocation[][] = [];

  for (const accommodation of accommodations) {
    const dayAttractions = assignedAttractions.get(accommodation.day) || [];
    const routeWithAccommodation = [
      accommodation,
      ...dayAttractions,
      accommodation,
    ];
    dailyRoutes.push(optimizeRouteWith2Opt(routeWithAccommodation));
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

/*
* const jejuAttractions: TravelLocation[] = [
  {name: '성산일출봉', latitude: 33.4587, longitude: 126.9426},
  {name: '만장굴', latitude: 33.5283, longitude: 126.771},
  {name: '천지연폭포', latitude: 33.246, longitude: 126.5548},
  {name: '한라산 국립공원', latitude: 33.3617, longitude: 126.5292},
  {name: '중문관광단지', latitude: 33.2496, longitude: 126.4121},
  {name: '우도', latitude: 33.5015, longitude: 126.9551},
  {name: '섭지코지', latitude: 33.4237, longitude: 126.9285},
  {name: '협재해수욕장', latitude: 33.394, longitude: 126.2395},
  {name: '카멜리아힐', latitude: 33.289, longitude: 126.3774},
  {name: '오설록 티 뮤지엄', latitude: 33.3058, longitude: 126.289},
  {name: '비자림', latitude: 33.4897, longitude: 126.809},
  {name: '쇠소깍', latitude: 33.2546, longitude: 126.6227},
  {name: '용두암', latitude: 33.5161, longitude: 126.5116},
  {name: '제주올레 7코스', latitude: 33.2367, longitude: 126.505},
  {name: '아쿠아플라넷 제주', latitude: 33.256, longitude: 126.4076},
  {name: '산방산', latitude: 33.2369, longitude: 126.3128},
  {name: '송악산', latitude: 33.2002, longitude: 126.291},
  {name: '주상절리대', latitude: 33.2376, longitude: 126.4253},
  {name: '사려니숲길', latitude: 33.4071, longitude: 126.6366},
  {name: '제주민속촌', latitude: 33.3213, longitude: 126.8429},
];

// 숙소 데이터 (5일 여행 기준)
const accommodations: Accommodation[] = [
  {name: '제주시 호텔', latitude: 33.489, longitude: 126.498, day: 1},
  {name: '제주시 호텔', latitude: 33.489, longitude: 126.498, day: 2},
  {name: '제주시 호텔', latitude: 33.489, longitude: 126.498, day: 3},
  {name: '성산 펜션', latitude: 33.4587, longitude: 126.9426, day: 4},
  {name: '애월 민박', latitude: 33.4639, longitude: 126.3111, day: 5},
];
*
* */
