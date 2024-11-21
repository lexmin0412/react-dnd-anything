import _ from 'lodash';
import React, { DragEvent, useMemo, useState } from 'react';
import { DND_ITEM_CLASS_PREFIX as CLS_PREFIX } from './constants/index';
import './index.less';
import { DragAndDropItem } from './types';

type DataGroupItem = {
  /**
   * 容器id
   */
  id: string;
  /**
   * 容器标题
   */
  title: string;
  /**
   * 数据列表
   */
  list: DragAndDropItem[];
};

type DataGroup = DataGroupItem[];

export interface DragAndDropProps {
  /**
   * 外层容器样式
   */
  style?: React.CSSProperties;
  /**
   * 方向 vertical-垂直 horizontal-水平
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 数据集
   */
  dataGroup: DataGroup;
  /**
   * 数据更新回调
   */
  onDataGroupChange: (dataGroup: DataGroup) => void;
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
  /**
   * 最外层容器类名
   */
  wrapperClassName?: string;
  /**
   * 分组容器类名
   */
  containerClassName?: string;
  /**
   * 自定义分组内容渲染
   * @param groupContent 当前分组内容
   * @param options 附属信息
   */
  renderGroup?: (
    groupContent: React.ReactNode,
    options: {
      /**
       * 分组信息
       */
      group: DataGroupItem;
    },
  ) => React.ReactNode;
}

export default function DragAndDrop(props: DragAndDropProps) {
  const {
    direction = 'vertical',
    style,
    dataGroup,
    onDataGroupChange,
    onDragStart,
    onDragOver,
    onDrop,
    renderChildren,
    getItemStyle,
    draggingItemStyle,
    draggingOverStyle,
    wrapperClassName,
    containerClassName,
    renderGroup,
  } = props;

  const [currentDraggingItem, setCurrentDraggingItem] =
    useState<DragAndDropItem | null>(null); // 当前正在拖拽的item
  const [currentOverItem, setCurrentOverItem] =
    useState<DragAndDropItem | null>(null); // 当前over的item

  const handleDragStart = (
    event: DragEvent,
    item: DragAndDropItem,
    options: {
      containerId: string;
    },
  ) => {
    const { containerId } = options;
    event?.dataTransfer?.setData('id', item.id);
    event?.dataTransfer?.setData('containerId', containerId);

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

  const handleDrop = (
    event: DragEvent,
    item: DragAndDropItem,
    options: {
      containerId: string;
    },
  ) => {
    const dataGroup = _.cloneDeep(props.dataGroup);
    const { containerId: currentContainerId } = options;
    const sourceId = event?.dataTransfer?.getData('id');
    const sourceContainerId = event?.dataTransfer?.getData('containerId');
    console.log(
      'handleDrop',
      'sourceId:',
      sourceId,
      'item.id:',
      item.id,
      'sourceContainerId',
      sourceContainerId,
      'currentContainerId',
      currentContainerId,
    );
    // 过滤自己
    if (currentContainerId === sourceContainerId && item.id === sourceId) {
      return;
    }
    const targetList =
      dataGroup.find((group) => group.id === currentContainerId)?.list || [];
    const sourceIndex = targetList.findIndex((ele) => ele.id === sourceId);
    const sourceItem = targetList[sourceIndex];
    console.log('sourceIndex', sourceIndex);
    // 如果在当前所在的列表中 则删除原节点并插入节点
    if (sourceIndex > -1) {
      // 删除原item
      targetList.splice(sourceIndex, 1);
      // 追加到新位置
      const targetIndex = targetList.findIndex((ele) => ele.id === item.id);
      targetList.splice(targetIndex, 0, sourceItem);
    } else {
      console.log('不在当前列表中');
      // 如果不在当前列表中，则找到原列表中的节点，删除原节点，插入到新位置
      const sourceList =
        dataGroup.find((group) => group.id === sourceContainerId)?.list || [];
      const sourceIndex = sourceList.findIndex((ele) => ele.id === sourceId);
      const sourceItem = sourceList[sourceIndex];
      // 删除原节点
      sourceList.splice(sourceIndex, 1);
      // 插入新节点
      const targetIndex = targetList.findIndex((ele) => ele.id === item.id);
      targetList.splice(targetIndex, 0, sourceItem);
      console.log('targetList', targetList);
    }
    setCurrentDraggingItem(null);
    setCurrentOverItem(null);
    // onListUpdate(toChangeList);
    onDataGroupChange(dataGroup);

    // 触发回调
    if (onDrop) {
      onDrop(event, item);
    }
  };

  console.log('currentOverItem', currentOverItem);
  console.log('currentDraggingItem', currentDraggingItem);

  const renderChild = (
    props: DragAndDropItem,
    options: {
      containerId: string;
    },
  ) => {
    const { containerId } = options;
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
        onDragStart={(event) =>
          handleDragStart(event, props, {
            containerId,
          })
        }
        onDragOver={(event) => handleDragOver(event, props)}
        onDrop={(event) =>
          handleDrop(event, props, {
            containerId,
          })
        }
        draggable={true}
        style={{ ...itemStyle }}
      >
        {renderChildren
          ? renderChildren(props, {
              isDragging: isDragging,
              isDraggingOver: isDraggingOver,
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

  const handleDropContainer = (
    event: DragEvent,
    targetGroup: DataGroupItem,
  ) => {
    console.log('handleDropContainer', event, targetGroup);
    console.log('currentDraggingItem', currentDraggingItem);
    const groupList =
      dataGroup.find((ele) => ele.id === targetGroup.id)?.list || [];
    console.log('groupList', groupList);
    if (groupList.length > 0) {
      return;
    }
    const newDataGroup = [...dataGroup];

    // 先把当前拖拽的节点从原列表中删除
    const sourceList =
      newDataGroup.find((ele) => ele.id === currentDraggingItem?.id)?.list ||
      [];
    const sourceIndex = sourceList.findIndex(
      (ele) => ele.id === currentDraggingItem?.id,
    );
    sourceList.splice(sourceIndex, 1);

    // 插入到新列表中
    const targetList =
      newDataGroup.find((ele) => ele.id === targetGroup.id)?.list || [];
    targetList.push(currentDraggingItem!);

    onDataGroupChange(newDataGroup);
  };

  return (
    <div className={wrapperClassName}>
      {dataGroup.map((group) => {
        const groupContent = (
          <div
            className={containerClassName}
            style={containerStyles}
            key={group.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => handleDropContainer(event, group)}
          >
            {group.list ? (
              group.list.map((item) => {
                return renderChild(item, {
                  containerId: group.id,
                });
              })
            ) : (
              <div>暂无数据</div>
            )}
          </div>
        );
        return renderGroup
          ? renderGroup(groupContent, {
              group,
            })
          : groupContent;
      })}
    </div>
  );
}
