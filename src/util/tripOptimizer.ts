import {Location} from '@/types';

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

const kMeansClustering = (
  locations: TravelLocation[],
  accommodations: Accommodation[],
  maxIterations: number = 100,
): TravelLocation[][] => {
  const k = accommodations.length;
  let centroids: TravelLocation[] = accommodations.map((acc) => ({...acc}));
  let clusters: TravelLocation[][] = Array(k)
    .fill(null)
    .map(() => []);
  let iterations = 0;

  while (iterations < maxIterations) {
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

    const newCentroids = centroids.map((centroid, i) => {
      const cluster = clusters[i];
      if (cluster.length === 0) {
        return centroid;
      }
      return centroid; // 숙소의 위치는 변경하지 않음
    });

    if (JSON.stringify(newCentroids) === JSON.stringify(centroids)) {
      break;
    }

    centroids = newCentroids;
    iterations++;
  }

  return clusters;
};

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

export const planTrip = (
  attractions: TravelLocation[],
  accommodations: Accommodation[],
): TravelLocation[][] => {
  const numClusters = accommodations.length;
  const targetAttractionsPerDay = Math.ceil(attractions.length / numClusters);

  let clusters = kMeansClustering(attractions, accommodations);
  clusters = redistributeClusters(clusters, targetAttractionsPerDay);

  const dailyRoutes: TravelLocation[][] = [];

  for (let i = 0; i < accommodations.length; i++) {
    const accommodation = accommodations[i];
    const clusterAttractions = clusters[i];

    const dailyRoute = [accommodation, ...clusterAttractions, accommodation];
    const optimizedDailyRoute = optimizeRouteWith2Opt(dailyRoute);

    dailyRoutes.push(optimizedDailyRoute);
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
