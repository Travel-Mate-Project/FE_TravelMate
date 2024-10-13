'use client';

import Drag from '@/asset/Drag.svg';
import Remove from '@/asset/remove.svg';
import {useDragAndDrop} from '@/hooks/useDragAndDrop';
import {useTripStore} from '@/store';
import {DndCardProps} from '@/types';

export default function DndCard({
  items,
  updateItem,
  removeItem,
  id,
  accept,
  children,
}: DndCardProps) {
  const {DndRef, dragHandleRef, isDragging} = useDragAndDrop(
    items,
    updateItem,
    id,
    accept,
  );

  const removeSelectedPlace = useTripStore.use.removeSelectedPlace();

  const handleRemove = () => {
    removeItem(id);
    removeSelectedPlace(id);
  };

  return (
    <div
      ref={DndRef}
      className={`py-3 px-5 flex items-center justify-center rounded-2xl bg-white
       shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)] ${isDragging ? 'scale-105 opacity-50' : ''}`}
    >
      <div className={'w-full flex items-center justify-between'}>
        {children}
        <div className={'flex gap-5'}>
          <div ref={dragHandleRef}>
            <Drag className={'cursor-move'} />
          </div>
          <Remove className={'cursor-pointer'} onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
}
