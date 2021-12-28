import React, { useState } from 'react';
import { DndAnything } from 'react-dnd-anything';
import './set_draw_image.less'

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
    // 本身drawImage容器不在页面渲染的，所以没有必要通过状态更新，我们只需要在开始拖拽时获取自定义图像dom并修改内容后即时获取即可
    const drawImage = document.getElementById('drag-image')
    if (drawImage) {
      drawImage.innerText = `自定义拖拽图像内容及样式${item?.title}`
      event.dataTransfer?.setDragImage(drawImage, 40, 40)
    }
  }

  return (
    <>
      <DndAnything
        list={list}
        onListUpdate={handleListUpdate}
        onDragStart={handleDragStart}
      />
      <div id="drag-image">
        自定义拖拽图像内容及样式
      </div>
    </>
  )
};
