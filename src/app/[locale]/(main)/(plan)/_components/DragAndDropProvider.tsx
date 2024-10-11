'use client';

import {MultiBackend, TouchTransition} from 'dnd-multi-backend';
import {ReactNode} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';

export default function DragAndDropProvider({children}: {children: ReactNode}) {
  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
      },
      {
        backend: TouchBackend,
        options: {enableMouseEvents: true},
        preview: true,
        transition: TouchTransition,
      },
    ],
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      {children}
    </DndProvider>
  );
}
