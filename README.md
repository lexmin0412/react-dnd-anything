# React Dnd Anything

洞悉拖拽本质，让交互随心所欲。[官方文档](https://lexmin0412.github.io/react-dnd-anything)

<a href="https://lexmin0412.github.io/react-dnd-anything">
 <img src="https://github.com/lexmin0412/react-dnd-anything/blob/main/docs/images/docs_home_preview.png" />
</a>



## 支持特性

- 🏠 列表拖拽排序

## Getting Started

```bash
npm i react-dnd-anything
```

## Use it in React

```tsx
import React, { useState } from 'react';
import { DndAnything } from 'react-dnd-anything';

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

  return (
    <DndAnything
      list={list}
      onListUpdate={handleListUpdate}
    />
  )
};
```

## 更新日志

[点我查看](https://github.com/lexmin0412/react-dnd-anything/blob/main/CHANGELOG.md)
