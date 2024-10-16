import {Location} from '@/types';

// 여행 위치 인터페이스 정의
export interface TravelLocation extends Location {
  name: string;
  latitude: number;
  longitude: number;
}

// 숙소 인터페이스 정의 (TravelLocation을 확장)
export interface Accommodation extends TravelLocation {
  day: number;
}

// 도(degree)를 라디안(radian)으로 변환하는 함수
const degToRad = (deg: number): number => deg * (Math.PI / 180);

// 두 위치 간의 거리를 계산하는 함수 (Haversine 공식 사용)
const calculateDistance = (
  loc1: TravelLocation,
  loc2: TravelLocation,
): number => {
  const R = 6371; // 지구의 반경 (km)
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

// 2-Opt 알고리즘을 위한 경로 교환 함수
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

// 전체 경로의 총 거리를 계산하는 함수
const calculateTotalDistance = (route: TravelLocation[]): number => {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(route[i], route[i + 1]);
  }
  return totalDistance;
};

// 2-Opt 알고리즘을 사용하여 경로를 최적화하는 함수
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

// 숙소를 중심으로 거리 기반 클러스터링을 수행하는 함수
const distanceBasedClustering = (
  locations: TravelLocation[],
  accommodations: Accommodation[],
  maxDistance: number,
): TravelLocation[][] => {
  const clusters: TravelLocation[][] = accommodations.map(() => []);
  const unassignedLocations: TravelLocation[] = [];

  for (const location of locations) {
    let minDistance = Infinity;
    let closestAccommodationIndex = -1;

    for (let i = 0; i < accommodations.length; i++) {
      const distance = calculateDistance(location, accommodations[i]);
      if (distance < minDistance && distance <= maxDistance) {
        minDistance = distance;
        closestAccommodationIndex = i;
      }
    }

    if (closestAccommodationIndex !== -1) {
      clusters[closestAccommodationIndex].push(location);
    } else {
      unassignedLocations.push(location);
    }
  }

  // 할당되지 않은 위치들을 가장 가까운 숙소에 할당
  for (const location of unassignedLocations) {
    let minDistance = Infinity;
    let closestAccommodationIndex = 0;

    for (let i = 0; i < accommodations.length; i++) {
      const distance = calculateDistance(location, accommodations[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestAccommodationIndex = i;
      }
    }

    clusters[closestAccommodationIndex].push(location);
  }

  return clusters;
};

// 클러스터를 재분배하여 크기를 균형있게 조정하는 함수
const redistributeClusters = (
  clusters: TravelLocation[][],
  targetSize: number,
): TravelLocation[][] => {
  const flatLocations = clusters.flat();
  const newClusters: TravelLocation[][] = Array(clusters.length)
    .fill(null)
    .map(() => []);

  let clusterIndex = 0;
  for (const location of flatLocations) {
    if (newClusters[clusterIndex].length < targetSize) {
      newClusters[clusterIndex].push(location);
    } else {
      clusterIndex = (clusterIndex + 1) % newClusters.length;
      newClusters[clusterIndex].push(location);
    }
  }

  return newClusters;
};

// 전체 여행 계획을 수립하는 메인 함수
export const planTrip = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): TravelLocation[][] => {
  const numDays = accommodations.length;
  const maxDistance = 30; // 숙소로부터 최대 30km 이내의 관광지 선택
  const targetAttractionsPerDay = Math.ceil(attractions.length / numDays);

  // 거리 기반 클러스터링 적용
  let clusters = distanceBasedClustering(
    attractions,
    accommodations,
    maxDistance,
  );

  // 클러스터 크기를 균형있게 재조정
  clusters = redistributeClusters(clusters, targetAttractionsPerDay);

  const dailyRoutes: TravelLocation[][] = [];

  for (let i = 0; i < accommodations.length; i++) {
    const accommodation = accommodations[i];
    const clusterAttractions = clusters[i];

    // 숙소를 시작점과 끝점으로 하는 일일 경로 생성
    const dailyRoute = [accommodation, ...clusterAttractions, accommodation];
    // 2-Opt 알고리즘을 사용하여 일일 경로 최적화
    const optimizedDailyRoute = optimizeRouteWith2Opt(dailyRoute);

    dailyRoutes.push(optimizedDailyRoute);
  }

  return dailyRoutes;
};

// 최적화된 여행 계획을 문자열로 포맷팅하는 함수
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

// 전체 여행의 총 이동 거리를 계산하는 함수
export const calculateTotalTripDistance = (
  optimizedPlan: TravelLocation[][],
): number => {
  return optimizedPlan.reduce(
    (sum, day) => sum + calculateTotalDistance(day),
    0,
  );
};

// 알고리즘의 실행 시간을 측정하는 함수
export const measureExecutionTime = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): number => {
  const startTime = performance.now();
  planTrip(attractions, accommodations);
  const endTime = performance.now();
  return endTime - startTime;
};
