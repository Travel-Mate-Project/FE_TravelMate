'use client';

import React from 'react';
import {useDragResize} from '@/hooks/useDragResize';
import {useTripStore} from '@/store';

export default function ResizableContent() {
  const {totalHeight, mapHeight} = useTripStore();
  const {handleMouseDown, handleTouchStart} = useDragResize();

  const contentHeight = totalHeight - mapHeight;

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <button
        className="h-10 bg-gray-300 cursor-ns-resize flex items-center justify-center touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-10 h-1 bg-gray-500 rounded"></div>
      </button>
      <div style={{height: `${contentHeight}px`, overflow: 'auto'}}>
        {/* 여기에 컨텐츠를 넣으세요 */}
        <p>이 영역의 크기도 상단 바를 드래그하여 조절할 수 있습니다.</p>
      </div>
    </div>
  );
}
