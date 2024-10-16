import axios from 'axios';
import {useState} from 'react';

interface TravelLocation {
  name: string;
  latitude: number;
  longitude: number;
}

interface KakaoRouteResult {
  routes: Array<{
    sections: Array<{
      duration: number;
    }>;
  }>;
}

export const useKakaoRoute = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoute = async (waypoints: TravelLocation[]): Promise<number[]> => {
    setIsLoading(true);
    setError(null);

    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const viaPoints = waypoints.slice(1, -1);

    try {
      const response = await axios.post<KakaoRouteResult>(
        'https://apis-navi.kakaomobility.com/v1/waypoints/directions',
        {
          origin: {
            x: origin.longitude.toString(),
            y: origin.latitude.toString(),
          },
          destination: {
            x: destination.longitude.toString(),
            y: destination.latitude.toString(),
          },
          waypoints: viaPoints.map((point) => ({
            name: point.name,
            x: point.longitude,
            y: point.latitude,
          })),
          priority: 'RECOMMEND',
          car_fuel: 'GASOLINE',
          car_hipass: false,
          alternatives: false,
          road_details: false,
        },
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.routes[0].sections.map((section) =>
        Math.round(section.duration / 60),
      );
    } catch (err) {
      setError('카카오 API 호출 중 오류 발생');
      console.error('카카오 API 호출 중 오류 발생:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {getRoute, isLoading, error};
};
