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

// 여행 데이터 인터페이스 정의
export interface TripData {
  attractions: TravelLocation[];
  accommodations: Accommodation[];
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

// K-means 클러스터링 알고리즘 구현
const kMeansClustering = (
  locations: TravelLocation[],
  k: number,
  maxIterations: number = 100,
): TravelLocation[][] => {
  // 초기 중심점을 무작위로 선택
  let centroids: TravelLocation[] = locations
    .slice(0, k)
    .map((loc) => ({...loc}));
  let clusters: TravelLocation[][] = Array(k)
    .fill(null)
    .map(() => []);
  let iterations = 0;

  while (iterations < maxIterations) {
    // 각 위치를 가장 가까운 중심점에 할당
    clusters = Array(k)
      .fill(null)
      .map(() => []);
    for (const location of locations) {
      let minDistance = Infinity;
      let closestCentroidIndex = 0;

      for (let i = 0; i < k; i++) {
        const distance = calculateDistance(location, centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      }

      clusters[closestCentroidIndex].push(location);
    }

    // 새로운 중심점 계산
    const newCentroids = centroids.map((_, i) => {
      const cluster = clusters[i];
      if (cluster.length === 0) {
        return centroids[i];
      }

      const sumLat = cluster.reduce((sum, loc) => sum + loc.latitude, 0);
      const sumLon = cluster.reduce((sum, loc) => sum + loc.longitude, 0);
      return {
        ...centroids[i], // 다른 속성 유지
        latitude: sumLat / cluster.length,
        longitude: sumLon / cluster.length,
      };
    });

    // 수렴 여부 확인
    if (JSON.stringify(newCentroids) === JSON.stringify(centroids)) {
      break;
    }

    centroids = newCentroids;
    iterations++;
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
  const dailyRoutes: TravelLocation[][] = [];
  const numClusters = accommodations.length;
  const targetAttractionsPerDay = Math.ceil(attractions.length / numClusters);

  // K-means 클러스터링 적용
  let clusters = kMeansClustering(attractions, numClusters);

  // 클러스터 크기를 균형있게 재조정
  clusters = redistributeClusters(clusters, targetAttractionsPerDay);

  for (let i = 0; i < accommodations.length; i++) {
    const accommodation = accommodations[i];
    const clusterAttractions = clusters[i];

    const dailyRoute = [accommodation, ...clusterAttractions, accommodation];
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
