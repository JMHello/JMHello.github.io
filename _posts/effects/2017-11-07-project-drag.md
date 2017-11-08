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

> * 为元素添加 `draggale = "true"` 。> * 点击打开[demo](/effects/demo/js/demo-drag/v1/index.html)

