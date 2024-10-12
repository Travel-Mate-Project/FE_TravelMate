import {useCallback, useEffect, useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';

import {Location} from '@/types';

export const useDragAndDrop = <T extends Location>(
  itemList: T[], // 전체 리스트
  updateItem: (_item: T[]) => void, // 리스트 업데이트 함수
  id: number, // 드래그할 아이템의 id
  accept: string, // 드래그할 아이템의 타입
) => {
  const DndRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const findItem = useCallback(
    (id: number) => {
      const item = itemList.find((item) => 'id' in item && item.id === id);
      return {
        item,
        index: item ? itemList.indexOf(item) : -1,
      };
    },
    [itemList],
  );

  const moveItem = useCallback(
    (id: number, atIndex: number) => {
      const {item, index} = findItem(id);
      if (index === atIndex) {
        return;
      }
      const newPlaces = [...itemList];
      newPlaces.splice(index, 1);
      if (item) {
        newPlaces.splice(atIndex, 0, item);
      }
      updateItem(newPlaces);
    },
    [findItem, itemList, updateItem],
  );

  const originalIndex = findItem(id).index;

  const [{isDragging}, drag, preview] = useDrag(
    () => ({
      type: accept,
      item: {id, originalIndex},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const {id: droppedId, originalIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveItem(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveItem],
  );

  const [, drop] = useDrop(
    () => ({
      accept,
      hover({id: draggedId}: {id: number}) {
        if (draggedId !== id) {
          const {index: overIndex} = findItem(id);
          moveItem(draggedId, overIndex);
        }
      },
    }),
    [findItem, moveItem],
  );

  useEffect(() => {
    preview(drop(DndRef));
    drag(dragHandleRef);
  }, [drag, drop, preview]);

  return {DndRef, dragHandleRef, isDragging};
};
