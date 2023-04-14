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
  {
    id: '4',
    title: 'item 4',
  },
  {
    id: '5',
    title: 'item 5',
  },
  {
    id: '6',
    title: 'item 6',
  },
  {
    id: '7',
    title: 'item 7',
  },
  {
    id: '8',
    title: 'item 8',
  },
  {
    id: '9',
    title: 'item 9',
  },
  {
    id: '10',
    title: 'item 10',
  },
  {
    id: '11',
    title: 'item 11',
  },
  {
    id: '12',
    title: 'item 12',
  },
  {
    id: '13',
    title: 'item 13',
  },
];

export default () => {
  const [list, setList] = useState(defaultList);

  const handleListUpdate = (list: any[]) => {
    setList(list);
  };

  return (
    <DndAnything
      renderChildren={(item, { isDragging, isDraggingOver }) => {
        return (
          <div
            style={{
              display: 'flex',
              padding: '10px',
              height: '20px',
              lineHeight: '20px',
              margin: '0 10px 10px',
              borderRadius: '6px',
              background: '#2688fa',
              color: '#fff',
              opacity: isDragging ? 0.7 : 1,
              borderLeft: isDraggingOver ? '10px solid #ff4a4a' : 0
            }}
          >
            {item.title}
          </div>
        );
      }}
      direction="horizontal"
      list={list}
      onListUpdate={handleListUpdate}
    />
  );
};
