'use client';

import DndCard from '@/app/[locale]/(main)/(plan)/_components/DndCard';
import {useDroppableList} from '@/hooks/useDroppableList';
import {useTripStore} from '@/store';
import {Location} from '@/types';

export default function PlaceSelection() {
  const places = useTripStore.use.places();
  const updatePlace = useTripStore.use.updatePlace();

  const {droppableRef} = useDroppableList('PLACE');

  return (
    <div ref={droppableRef}>
      {places?.map((place: Location, index) => (
        <DndCard
          key={place.id}
          items={places}
          id={place.id}
          updateItem={updatePlace}
          accept={'PLACE'}
          index={index + 1}
        />
      ))}
    </div>
  );
}
