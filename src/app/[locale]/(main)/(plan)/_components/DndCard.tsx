'use client';

import {useDragAndDrop} from '@/hooks/useDragAndDrop';
import {DndCardProps} from '@/types';

export default function DndCard({
  items,
  updateItem,
  id,
  accept,
  index,
}: DndCardProps) {
  const {DndRef} = useDragAndDrop(items, updateItem, id, accept);
  return (
    <div
      className={'h-10 p-3 flex items-center justify-center gap-3 shadow-black'}
      ref={DndRef}
    >
      <div></div>
    </div>
  );
}
