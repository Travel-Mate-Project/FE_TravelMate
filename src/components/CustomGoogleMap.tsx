'use client';

import {GoogleMap, Marker} from '@react-google-maps/api';
import React from 'react';

import {useGoogleMap} from '@/hooks/useGoogleMap';
import {useTripStore} from '@/store';

export default function ResizableMapWithContent() {
  const {
    onLoad,
    onUnmount,
    center,
    mapHeight,
    mapOptions,
    isLoaded,
    loadError,
  } = useGoogleMap();

  const places = useTripStore.use.places();

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
          {places.map((place, index) => (
            <Marker
              key={place.id}
              position={{lat: place.location.lat, lng: place.location.lng}}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}
