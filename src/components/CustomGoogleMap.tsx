'use client';

import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import React, {useCallback, useEffect, useState} from 'react';

import {useRouter} from '@/i18n/routing';
import {useTripStore} from '@/store';
import {LatLngLiteral, MapOptions} from '@/types';

const libraries: 'places'[] = ['places'];

export default function ResizableMapWithContent() {
  const router = useRouter();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<LatLngLiteral>();

  const {mapHeight} = useTripStore();

  const mapOptions: MapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    gestureHandling: 'greedy',
  };

  const location = useTripStore.use.region();
  const {isLoaded, loadError} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP || '',
    libraries: libraries,
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

  if (loadError || !location) {
    return <div>지도를 로드할 수 없습니다. 다시 시도해 주세요.</div>;
  }

  return isLoaded ? (
    <div className="w-screen ml-[calc(-50vw+50%)] mt-[15px]">
      <div className="mx-auto max-w-[600px]" style={{height: `${mapHeight}px`}}>
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
          zoom={9}
          options={mapOptions}
        >
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}
