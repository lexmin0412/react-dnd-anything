import React, { useState } from 'react';
import { DndAnything } from 'react-dnd-anything';

interface DragAndDropItem {
  /**
   * 唯一标识，用于定位元素
   */
  id: string
  /**
   * 标题，用于在列表中展示
   */
  title: string
}

const defaultList: DragAndDropItem[] = [
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

  const handleDragStart = (event: any, item: DragAndDropItem) => {
    console.log('handleDragStart', event, item);
  }

  const handleDragOver = (event: any, item: DragAndDropItem) => {
    console.log('handleDragOver', event, item);
  }

  const handleDrop = (event: any, item: DragAndDropItem) => {
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
