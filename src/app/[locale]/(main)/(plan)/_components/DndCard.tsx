'use client';

import {useDragAndDrop} from '@/hooks/useDragAndDrop';
import {useTripStore} from '@/store';
import {Location} from '@/types';

export default function DndCard({place}: {place: Location}) {
  const places = useTripStore.use.places();
  const updatePlace = useTripStore.use.updatePlace();
  const {DndRef} = useDragAndDrop(places, updatePlace, place.id, 'PLACE');

  return (
    <div
      className={'h-10 p-3 flex items-center justify-center gap-3'}
      ref={DndRef}
    >
      <span>{place.id}</span>
      <span>{place.name}</span>
      <span>{place.type}</span>
      <span>{place.imageUrl}</span>
      <span>{place.location?.lat}</span>
    </div>
  );
}
