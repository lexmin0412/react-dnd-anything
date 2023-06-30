import React, { useState } from 'react';
import { DndAnything } from 'react-dnd-anything';

const defaultList = [
  {
    id: '1',
    title: 'item 1',
  },
  {
    id: '2',
    title: 'item 2',
  },
  {
    id: '3',
    title: 'item 3',
  },
];

export default () => {
  const [list, setList] = useState(defaultList);

  const handleListUpdate = (list: any[]) => {
    setList(list);
  };

  return (
    <DndAnything
      draggable={false}
      list={list}
      onListUpdate={handleListUpdate}
    />
  );
};
