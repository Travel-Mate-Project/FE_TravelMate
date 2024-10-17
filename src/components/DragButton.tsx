import React from 'react';

import DragDown from '@/asset/Menu_Duo_LG.svg';
import {DragButtonPops} from '@/types';

export default function DragButton({
  handleMouseDown,
  handleTouchStart,
}: DragButtonPops) {
  return (
    <button
      className={
        'h-3 my-4 w-full flex items-center justify-center cursor-ns-resize touch-none'
      }
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <DragDown />
    </button>
  );
}
