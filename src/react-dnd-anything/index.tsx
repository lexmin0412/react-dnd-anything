import React, {useMemo, DragEvent} from 'react'
import { DND_ITEM_CLASS_PREFIX as CLS_PREFIX } from './constants/index'

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

interface DragAndDropProps {
  /**
   * 数据列表
   */
  list: DragAndDropItem[]
  /**
   * 数据更新回调
   */
  onListUpdate: (list: DragAndDropItem[]) => void
}

export default function DragAndDrop(props: DragAndDropProps) {

  const {
    list,
    onListUpdate
  } = props

  /**
   * item类名
   */
  const classNames = useMemo(() => {
    let classList = [CLS_PREFIX]
    return classList.join(' ')
  }, [])

  const onDragStart = (event: DragEvent, item: DragAndDropItem) => {
    console.log('onDragStart', item);
    event?.dataTransfer?.setData('id', item.id)
  }

  const onDragOver = (event: DragEvent, item: DragAndDropItem) => {
    event.preventDefault()
  }

  const onDrop = (event: DragEvent, item: DragAndDropItem) => {
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
        onDragStart={event => onDragStart(event, props)}
        onDragOver={event => onDragOver(event, props)}
        onDrop={event => onDrop(event, props)}
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
