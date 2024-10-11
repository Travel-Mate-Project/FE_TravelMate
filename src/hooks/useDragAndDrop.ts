import {useCallback, useEffect, useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';

import {Location} from '@/types';

export const useDragAndDrop = (
  itemList: Location[], // 전체 리스트
  updateItem: (_place: Location[]) => void, // 리스트 업데이트 함수
  id: number, // 드래그할 아이템의 id
  accept: string, // 드래그할 아이템의 타입
) => {
  const DndRef = useRef<HTMLDivElement>(null);

  const findItem = useCallback(
    (id: number) => {
      const place = itemList.find((c) => c.id === id);
      return {
        place,
        index: place ? itemList.indexOf(place) : -1,
      };
    },
    [itemList],
  );

  const moveItem = useCallback(
    (id: number, atIndex: number) => {
      const {place, index} = findItem(id);
      if (index === atIndex) {
        return;
      }
      const newPlaces = [...itemList];
      newPlaces.splice(index, 1);
      if (place) {
        newPlaces.splice(atIndex, 0, place);
      }
      updateItem(newPlaces);
    },
    [findItem, itemList, updateItem],
  );

  const originalIndex = findItem(id).index;

  const [, drag] = useDrag(
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
          // @ts-ignore
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
    drag(drop(DndRef));
  }, [drag, drop]);

  return {DndRef};
};
