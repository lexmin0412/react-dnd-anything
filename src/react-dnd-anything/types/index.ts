export interface DragAndDropItem {
  /**
   * 唯一标识，用于定位元素
   */
  id: string
  /**
   * 标题，用于在列表中展示
   */
  title: string
}

/**
 * 开始拖动事件
 */
export type DndDragStartEvent = (event: DragEvent, item: DragAndDropItem) => void

/**
 * 拖拽聚焦事件
 */
export type DndDragOverEvent = (event: DragEvent, item: DragAndDropItem) => void

/**
 * 拖拽松开鼠标事件
 */
export type DndDropEvent = (event: DragEvent, item: DragAndDropItem) => void

/**
 * 拖拽数据更新事件
 */
export type DndListUpdateEvent = (list: DragAndDropItem[]) => void
