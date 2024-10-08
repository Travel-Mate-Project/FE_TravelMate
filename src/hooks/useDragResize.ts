import React, {useCallback, useEffect, useRef} from 'react';

import {useTripStore} from '@/store';

export function useDragResize() {
  const {mapHeight, setMapHeight} = useTripStore();
  const isDragging = useRef(false);
  const startY = useRef(0);

  const handleStart = useCallback((clientY: number) => {
    isDragging.current = true;
    startY.current = clientY;
  }, []);

  const handleMove = useCallback(
    (clientY: number) => {
      if (!isDragging.current) {
        return;
      }
      const deltaY = clientY - startY.current; // 움직인 Y축 거리
      setMapHeight(mapHeight + deltaY); // 현재 지도 크기에서 움직인 거리만큼 더하여 높이 설정
      startY.current = clientY;
    },
    [mapHeight, setMapHeight],
  );

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleStart(e.clientY);
    },
    [handleStart],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientY);
    },
    [handleStart],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, {passive: false});
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [handleMove, handleEnd]);

  return {handleMouseDown, handleTouchStart};
}
