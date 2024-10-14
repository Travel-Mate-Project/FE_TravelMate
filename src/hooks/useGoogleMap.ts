import {useJsApiLoader} from '@react-google-maps/api';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import {LatLngLiteral, MapOptions} from '@/types';
import {GOOGLE_MAPS_LIBRARIES} from '@/constants/component';

export const useGoogleMap = () => {
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<LatLngLiteral>();
  const {mapHeight} = useTripStore();

  const mapOptions: MapOptions = useMemo(
    () => ({
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      gestureHandling: 'greedy',
    }),
    [],
  );

  const location = useTripStore.use.region();
  const {isLoaded, loadError} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP || '',
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: 'ko',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && !loadError && location) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: location}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const {lat, lng} = results[0].geometry.location.toJSON();
          setCenter({lat, lng});
          if (map) {
            map.setCenter({lat, lng});
          }
        } else {
          console.error('Geocode 패칭 실패: ' + status);
        }
      });
    }
  }, [isLoaded, loadError, location, map]);

  useEffect(() => {
    if (!location) {
      router.replace('/');
    }
  }, [location, router]);

  return {
    onLoad,
    onUnmount,
    center,
    mapHeight,
    mapOptions,
    isLoaded,
    loadError,
  };
};
