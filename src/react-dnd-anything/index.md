---
nav:
  title: 组件
  path: /components
---

## React DND Anything

### Demo

**默认样式**

<code src="./demo/default.tsx"></code>

### 关于 HTML5 拖拽

- [Drag Event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event)

### 开发笔记

- `onDragStart` 不能禁用默认行为，否则 `onDragStart` 事件虽然可以成功触发，也表现得像可以拖拽，但 `onDragOver` 和 `onDrop` 事件将不会被触发。
