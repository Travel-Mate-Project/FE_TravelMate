import {RefObject, useEffect} from 'react';

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener(mouseEvent, handleClickOutside);
    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside);
    };
  }, [ref, handler, mouseEvent]);
};

export default useOutsideClick;
