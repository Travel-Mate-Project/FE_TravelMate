'use client';

import {useCallback, useEffect, useRef} from 'react';
import {useDrop} from 'react-dnd';

import DndCard from '@/app/[locale]/(main)/(plan)/_components/DndCard';
import {useTripStore} from '@/store';
import {Location} from '@/types';

export default function PlaceSelection() {
  const places = useTripStore.use.places();
  const updatePlace = useTripStore.use.updatePlace();
  const ref = useRef<HTMLDivElement>(null);

  const findPlace = useCallback(
    (id: number) => {
      const place = places.find((c) => c.id === id);
      return {
        place,
        index: place ? places.indexOf(place) : -1,
      };
    },
    [places],
  );

  const movePlace = useCallback(
    (id: number, atIndex: number) => {
      const {place, index} = findPlace(id);
      if (index === atIndex) {
        return;
      }
      const newPlaces = [...places];
      newPlaces.splice(index, 1);
      if (place) {
        newPlaces.splice(atIndex, 0, place);
      }
      updatePlace(newPlaces);
    },
    [findPlace, places, updatePlace],
  );

  const [, drop] = useDrop(() => ({accept: 'PLACE'}));

  useEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [drop]);

  return (
    <div ref={ref}>
      {places?.map((place: Location) => (
        <DndCard
          key={place.id}
          moveCard={movePlace}
          findCard={findPlace}
          id={place.id}
          name={place.name}
          type={place.type}
          imageUrl={place.imageUrl}
          location={place.location}
        />
      ))}
    </div>
  );
}
