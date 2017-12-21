---
layout: post
title: "拖放"
date: 2017-11-07 22:00:00 +0800 
categories: 效果
tag: effects
---
* content
{:toc}

> * 其实拖放效果在 《JavaScript高级程序设计（第3版）》 16.2 就已经说得很完美，不过还是要自己实操一遍。
> * 在这篇文章中，我还会用另外一种方法实现拖放。

<!-- more -->

## 一、拖放 - 法1

### 1.1 思路

![drag](/styles/images/javascript/drag/drag-01.png)

### 1.2 问题展示

> * 拖拽时候，碰到文字，文字也会被拖拽，可看下图展示：

![demo](/effects/images/javascript/drag/drag-01.gif)

### 1.3 demo展示

> * 点击打开[demo](/effects/demo/js/demo-drag/v2/index.html)，效果展示如下图：

![demo](/effects/images/javascript/drag/drag-02.gif)

## 二、拖放 - 法2

### 2.1 说明

> * 使用 `HTML5` 的原生拖放的相关事件和属性，实行拖放。
>   * 属性：为元素添加 `draggale = "true"` 。
>   * 事件：`dragstart` 事件、`drag` 事件、`dragend` 事件。

### 2.2 demo

> * 点击打开[demo](/effects/demo/js/demo-drag/v1/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>原生拖放</title>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background: blue;
            position: absolute;
        }
    </style>
</head>
<body>
<div id="drag" class="box" draggable="true"></div>
<script>
  const dragEle = document.getElementById('drag')
  let disX = 0
  let disY = 0

  dragEle.addEventListener('dragstart', count, false)

  dragEle.addEventListener('dragend',getPosition, false)

  /**
   * 计算每次点击div时鼠标的位置
   * @param e
   */
  function count (e) {
    disX = e.clientX - this.offsetLeft
    disY = e.clientY - this.offsetTop
  }

  /**
   * 获得div最终停留的位置
   * @param e
   */
  function getPosition (e) {
    this.style.left = e.clientX - disX + 'px'
    this.style.top = e.clientY - disY + 'px'
  }

</script>
</body>
</html>
```

> * 从实例中可看到，我并没有使用 `drag` 事件，那是因为不需要使用 `drag` 事件就可以达到我们的拖放效果。
> * 我们只需要知道点击`div` 时鼠标的位置即可，在`dragend`事件时，就可以直接获取 `div` 停止拖拽的最终位置。



