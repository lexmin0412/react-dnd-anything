import React, { DragEvent, useMemo, useState } from 'react';
import { DND_ITEM_CLASS_PREFIX as CLS_PREFIX } from './constants/index';
import './index.less';
import { DragAndDropItem } from './types';

export interface DragAndDropProps {
  draggable?: boolean;
  /**
   * 外层容器样式
   */
  style?: React.CSSProperties;
  /**
   * 方向 vertical-垂直 horizontal-水平
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 数据列表
   */
  list: DragAndDropItem[];
  /**
   * 数据更新回调
   */
  onListUpdate: (list: DragAndDropItem[]) => void;
  /**
   * 拖拽开始事件
   */
  onDragStart?: (event: DragEvent, item: DragAndDropItem) => void;
  /**
   * 拖拽元素样式
   */
  getItemStyle?: (item: DragAndDropItem) => React.CSSProperties;
  /**
   * 正在拖拽元素的样式
   */
  draggingItemStyle?: React.CSSProperties;
  /**
   * 正在经过元素的样式
   */
  draggingOverStyle?: React.CSSProperties;
  /**
   * 拖拽移动到某元素时触发
   */
  onDragOver?: (event: DragEvent, item: DragAndDropItem) => void;
  /**
   * 松开鼠标时触发
   */
  onDrop?: (event: DragEvent, item: DragAndDropItem) => void;
  /**
   * 自定义子元素渲染
   */
  renderChildren?: (
    item: any,
    options: {
      isDragging: boolean;
      isDraggingOver: boolean;
    },
  ) => JSX.Element | JSX.Element[];
}

export default function DragAndDrop(props: DragAndDropProps) {
  const {
    direction = 'vertical',
    style,
    list,
    onListUpdate,
    onDragStart,
    onDragOver,
    onDrop,
    draggable = true,
    renderChildren,
    getItemStyle,
    draggingItemStyle,
    draggingOverStyle,
  } = props;

  const [currentDraggingItem, setCurrentDraggingItem] =
    useState<DragAndDropItem | null>(null); // 当前正在拖拽的item
  const [currentOverItem, setCurrentOverItem] =
    useState<DragAndDropItem | null>(null); // 当前over的item

  /**
   * item类名
   */
  const classNames = useMemo(() => {
    let classList = [CLS_PREFIX];
    return classList.join(' ');
  }, []);

  const handleDragStart = (event: DragEvent, item: DragAndDropItem) => {
    event?.dataTransfer?.setData('id', item.id);

    setCurrentDraggingItem(item);

    // 触发回调
    if (onDragStart) {
      onDragStart(event, item);
    }
  };

  const handleDragOver = (event: DragEvent, item: DragAndDropItem) => {
    event.preventDefault();

    if (currentOverItem?.id !== item.id) {
      setCurrentOverItem(item);
    }

    // 触发回调
    if (onDragOver) {
      onDragOver(event, item);
    }
  };

  const handleDrop = (event: DragEvent, item: DragAndDropItem) => {
    const sourceId = event?.dataTransfer?.getData('id');
    // 过滤自己
    if (item.id === sourceId) {
      return;
    }
    const toChangeList = [...list];
    const sourceIndex = toChangeList.findIndex((ele) => ele.id === sourceId);
    const sourceItem = toChangeList[sourceIndex];
    if (sourceIndex > -1) {
      // 删除原item
      toChangeList.splice(sourceIndex, 1);
      // 追加到新位置
      const targetIndex = toChangeList.findIndex((ele) => ele.id === item.id);
      toChangeList.splice(targetIndex, 0, sourceItem);
    }
    setCurrentDraggingItem(null);
    setCurrentOverItem(null);
    onListUpdate(toChangeList);

    // 触发回调
    if (onDrop) {
      onDrop(event, item);
    }
  };

  const renderChild = (props: DragAndDropItem) => {
    const getItemClassNames = () => {
      let classList = [CLS_PREFIX];
      return classList.join(' ');
    };

    const classNames = getItemClassNames();
    const isDraggingOver = currentOverItem?.id === props.id;
    const isDragging = currentDraggingItem?.id === props.id;

    const itemStyle = {
      ...getItemStyle?.(props),
      ...(isDraggingOver ? draggingOverStyle : {}),
      ...(isDragging ? draggingItemStyle : {}),
    };

    return (
      <div
        className={classNames}
        key={props.id}
        onDragStart={(event) => handleDragStart(event, props)}
        onDragOver={(event) => handleDragOver(event, props)}
        onDrop={(event) => handleDrop(event, props)}
        draggable={draggable}
        style={{ ...itemStyle }}
      >
        {renderChildren
          ? renderChildren(props, {
              isDragging,
              isDraggingOver,
            })
          : props.title}
      </div>
    );
  };

  const containerStyles = useMemo(() => {
    const baseStyles = style || {};
    if (direction === 'horizontal') {
      baseStyles.display = 'flex';
      baseStyles.flexWrap = 'wrap';
    }
    return baseStyles;
  }, [direction]);

  return (
    <div className={classNames} style={containerStyles}>
      {list ? (
        list.map((item) => {
          return renderChild(item);
        })
      ) : (
        <div>暂无数据</div>
      )}
    </div>
  );
}
