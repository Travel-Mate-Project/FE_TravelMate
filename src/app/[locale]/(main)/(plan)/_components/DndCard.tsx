'use client';

import {useDrag, useDrop} from 'react-dnd';

import {DndCardProps} from '@/types';

export default function DndCard({
  id,
  name,
  type,
  imageUrl,
  location,
  moveCard,
  findCard,
}: DndCardProps) {
  const originalIndex = findCard(id).index;
  const [, drag] = useDrag(
    () => ({
      type: 'PLACE',
      item: {id, originalIndex},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const {id: droppedId, originalIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          // @ts-ignore
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'PLACE',
      hover({id: draggedId}: {id: number}) {
        if (draggedId !== id) {
          const {index: overIndex} = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard],
  );

  return (
    <div
      className={'h-10 p-3 flex items-center justify-center gap-3'}
      ref={(node) => drag(drop(node))}
    >
      <span>{id}</span>
      <span>{name}</span>
      <span>{type}</span>
      <span>{imageUrl}</span>
      <span>{location?.lat}</span>
    </div>
  );
}
