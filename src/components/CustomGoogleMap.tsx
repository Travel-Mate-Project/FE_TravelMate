'use client';

import {GoogleMap, Marker, OverlayView, Polyline} from '@react-google-maps/api';
import React from 'react';

import {svgMarker} from '@/asset/base64/svg';
import {useGoogleMap} from '@/hooks/useGoogleMap';
import {useTripStore} from '@/store';
import {StayItem} from '@/types';
import {DAY_COLOR} from '@/constants/colors';

export default function ResizableMapWithContent({
  isResult = false,
}: {
  isResult?: boolean;
}) {
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
  const optimizationResult = useTripStore.use.optimizationResult();

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

  const renderOptimizedRoute = () => {
    if (!optimizationResult) {
      return null;
    }

    return optimizationResult?.optimizedTrip.map((dailyTrip, dayIndex) => (
      <React.Fragment key={`day-${dayIndex}`}>
        {dailyTrip.map((location, locationIndex) => (
          <React.Fragment key={`location-${dayIndex}-${locationIndex}`}>
            <Marker
              position={{lat: location.latitude, lng: location.longitude}}
              icon={
                location.type === 'stay'
                  ? {
                      url: svgMarker,
                      scaledSize: new google.maps.Size(40, 40),
                    }
                  : {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: DAY_COLOR[dayIndex % DAY_COLOR.length],
                      fillOpacity: 1,
                      strokeWeight: 3,
                      strokeColor: '#fff',
                      scale: 20,
                    }
              }
              label={
                location.type !== 'stay'
                  ? {
                      text: (locationIndex + 1).toString(),
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }
                  : undefined
              }
            />
            <OverlayView
              position={{lat: location.latitude, lng: location.longitude}}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className={`${location.type === 'stay' ? 'bg-blue-100 border-blue-500 -translate-y-20' : 'bg-white border-gray-700 -translate-y-14'} w-max px-2.5 py-1.5 text-sm rounded-xl shadow-md absolute left-1/2 -translate-x-1/2  -mt-1 whitespace-nowrap border border-solid font-semibold`}
              >
                {location.name}
              </div>
            </OverlayView>
          </React.Fragment>
        ))}
        <Polyline
          path={dailyTrip.map((location) => ({
            lat: location.latitude,
            lng: location.longitude,
          }))}
          options={{
            strokeColor: DAY_COLOR[dayIndex % DAY_COLOR.length],
            strokeOpacity: 0,
            icons: [
              {
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  scale: 4,
                },
                offset: '0',
                repeat: '20px',
              },
            ],
          }}
        />
      </React.Fragment>
    ));
  };

  const renderDefaultMarkers = () => (
    <>
      {places.map((place, index) => (
        <React.Fragment key={place.id}>
          <Marker
            position={{lat: place.latitude, lng: place.longitude}}
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
            position={{lat: place.latitude, lng: place.longitude}}
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
            position={{lat: stay.latitude, lng: stay.longitude}}
            icon={{
              url: svgMarker,
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
          <OverlayView
            position={{lat: stay.latitude, lng: stay.longitude}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="bg-blue-100 w-max px-2.5 py-1.5 text-sm rounded-xl shadow-md absolute left-1/2 -translate-x-1/2 -translate-y-20 -mt-1 whitespace-nowrap border border-solid border-blue-500 font-semibold">
              {stay.name} ({stay.dates.length}
              {stay.dates.length > 1 ? '박' : '일'})
            </div>
          </OverlayView>
        </React.Fragment>
      ))}
    </>
  );

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
          {isResult ? (
            optimizationResult ? (
              renderOptimizedRoute()
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
                최적화 결과를 로딩 중입니다...
              </div>
            )
          ) : (
            renderDefaultMarkers()
          )}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}
