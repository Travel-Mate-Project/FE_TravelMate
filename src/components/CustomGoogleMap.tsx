'use client';

import {GoogleMap, Marker, OverlayView} from '@react-google-maps/api';
import React from 'react';

import {useGoogleMap} from '@/hooks/useGoogleMap';
import {useTripStore} from '@/store';
import {StayItem} from '@/types';
import {svgMarker} from '@/asset/base64/svg';

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
  const stays = useTripStore.use.stays();

  const getUniqueStays = (stays: StayItem[]) => {
    const uniqueStays = new Map();
    stays.forEach((stayItem) => {
      if (stayItem.isCheck && stayItem.stay) {
        if (!uniqueStays.has(stayItem.stay.id)) {
          uniqueStays.set(stayItem.stay.id, {
            ...stayItem.stay,
            dates: [stayItem.date],
          });
        } else {
          uniqueStays.get(stayItem.stay.id).dates.push(stayItem.date);
        }
      }
    });
    return Array.from(uniqueStays.values());
  };

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
            <React.Fragment key={place.id}>
              <Marker
                position={{lat: place.location.lat, lng: place.location.lng}}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: '#808080',
                  fillOpacity: 1,
                  strokeWeight: 3,
                  strokeColor: '#fff',
                  scale: 20,
                }}
                label={{
                  text: (index + 1).toString(),
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              />
              <OverlayView
                position={{lat: place.location.lat, lng: place.location.lng}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="bg-white w-max px-2.5 py-1.5 text-sm rounded-xl shadow-md absolute left-1/2 -translate-x-1/2 -translate-y-14 -mt-1 whitespace-nowrap border border-solid border-gray-700 font-semibold">
                  {place.name}
                </div>
              </OverlayView>
            </React.Fragment>
          ))}
          {getUniqueStays(stays).map((stay) => (
            <React.Fragment key={`stay-${stay.id}`}>
              <Marker
                position={{lat: stay.location.lat, lng: stay.location.lng}}
                icon={{
                  url: svgMarker,
                  scaledSize: new google.maps.Size(50, 50),
                }}
              />
              <OverlayView
                position={{lat: stay.location.lat, lng: stay.location.lng}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="bg-blue-100 w-max px-2.5 py-1.5 text-sm rounded-xl shadow-md absolute left-1/2 -translate-x-1/2 -translate-y-20 -mt-1 whitespace-nowrap border border-solid border-blue-500 font-semibold">
                  {stay.name} ({stay.dates.length}
                  {stay.dates.length > 1 ? '박' : '일'})
                </div>
              </OverlayView>
            </React.Fragment>
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}
