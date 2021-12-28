import React, { useState } from 'react';
import { DndAnything, DndDragStartEvent } from 'react-dnd-anything';
import { DndDragOverEvent, DndDropEvent } from '../types';

const defaultList = [
  {
    id: '1',
    title: 'item 1'
  },
  {
    id: '2',
    title: 'item 2'
  },
  {
    id: '3',
    title: 'item 3'
  }
]

export default () => {

  const [list, setList] = useState(defaultList)

  const handleListUpdate = (list: any[]) => {
    setList(list)
  }

  const handleDragStart: DndDragStartEvent = (event, item) => {
    console.log('handleDragStart', event, item);
  }

  const handleDragOver: DndDragOverEvent = (event, item) => {
    console.log('handleDragOver', event, item);
  }

  const handleDrop: DndDropEvent = (event, item) => {
    console.log('handleDrop', event, item);
  }

  return (
    <DndAnything
      list={list}
      onListUpdate={handleListUpdate}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  )
};
