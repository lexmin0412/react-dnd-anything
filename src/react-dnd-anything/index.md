---
nav:
  title: 组件
  path: /components
---

## React Dnd Anything

### Demo

**默认样式**

<code src="./demo/default.tsx"></code>


**监听拖拽事件**

<code src="./demo/event_listener.tsx"></code>

**自定义拖拽图像**

<code src="./demo/set_draw_image.tsx"></code>

### 关于 HTML5 拖拽

- [Drag Event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event)

### 开发笔记

- `onDragStart` 不能禁用默认行为，否则 `onDragStart` 事件虽然可以成功触发，也表现得像可以拖拽，但 `onDragOver` 和 `onDrop` 事件将不会被触发。
- `event.dataTransfer.setDragImage` 方法的第一个参数必须是一个已经存在的DOM元素，否则会被设置成浏览器的默认样式（经测试在调用之前新建元素无效）`
