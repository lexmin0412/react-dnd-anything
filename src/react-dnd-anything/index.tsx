import React, {useMemo, DragEvent} from 'react'
import { DND_ITEM_CLASS_PREFIX as CLS_PREFIX } from './constants/index'
import { DragAndDropItem } from './types'

export interface DragAndDropProps {
  /**
   * 数据列表
   */
  list: DragAndDropItem[]
  /**
   * 数据更新回调
   */
  onListUpdate: (list: DragAndDropItem[]) => void
  /**
   * 拖拽开始事件
   */
  onDragStart?: (event: DragEvent, item: DragAndDropItem) => void
  /**
   * 拖拽移动到某元素时触发
   */
  onDragOver?: (event: DragEvent, item: DragAndDropItem) => void
  /**
   * 松开鼠标时触发
   */
  onDrop?: (event: DragEvent, item: DragAndDropItem) => void
}

export default function DragAndDrop(props: DragAndDropProps) {

  const {
    list,
    onListUpdate,
    onDragStart,
    onDragOver,
    onDrop
  } = props

  /**
   * item类名
   */
  const classNames = useMemo(() => {
    let classList = [CLS_PREFIX]
    return classList.join(' ')
  }, [])

  const handleDragStart = (event: DragEvent, item: DragAndDropItem) => {
    event?.dataTransfer?.setData('id', item.id)

    // 触发回调
    onDragStart && onDragStart(event, item)
  }

  const handleDragOver = (event: DragEvent, item: DragAndDropItem) => {
    event.preventDefault()

    // 触发回调
    onDragOver && onDragOver(event, item)
  }

  const handleDrop = (event: DragEvent, item: DragAndDropItem) => {
    const sourceId = event?.dataTransfer?.getData('id')
    // 过滤自己
    if ( item.id === sourceId ) {
      return
    }
    const toChangeList = [...list]
    const sourceIndex = toChangeList.findIndex(ele => ele.id === sourceId)
    const sourceItem = toChangeList[sourceIndex]
    if (sourceIndex > -1) {
      // 删除原item
      toChangeList.splice(sourceIndex, 1)
      // 追加到新位置
      const targetIndex = toChangeList.findIndex(ele => ele.id === item.id)
      toChangeList.splice(targetIndex, 0, sourceItem)
    }
    onListUpdate(toChangeList)

    // 触发回调
    onDrop && onDrop(event, item)
  }

  const renderChild = (props: DragAndDropItem) => {

    const getItemClassNames = (item: DragAndDropItem) => {
      let classList = [CLS_PREFIX]
      return classList.join(' ')
    }

    const classNames = getItemClassNames(props)

    return (
      <div
        className={classNames}
        key={props.id}
        onDragStart={event => handleDragStart(event, props)}
        onDragOver={event => handleDragOver(event, props)}
        onDrop={event => handleDrop(event, props)}
        draggable={true}
      >
        {props.title}
      </div>
    )
  }

  return (
    <div className={classNames}>
      {
        list ? list.map((item) => {
          return renderChild(item)
        })
          :
          <div>暂无数据</div>
      }
    </div>
  )
}
