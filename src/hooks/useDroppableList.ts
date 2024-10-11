import {useEffect, useRef} from 'react';
import {useDrop} from 'react-dnd';

export const useDroppableList = (accept: string) => {
  const droppableRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({accept}));

  useEffect(() => {
    if (droppableRef.current) {
      drop(droppableRef);
    }
  }, [drop]);

  return {droppableRef};
};
