---
layout: post
title: "碰撞检测"
data: 2018-03-08 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}


<!-- more -->


## 一、碰撞检测

### 1.1 检测碰撞的关键步骤

像射击这类游戏，肯定少不了碰撞检测。

碰撞检测需要处理经历下面两个关键的步骤：

* 计算判断两个物体是否发生碰撞
* 发生碰撞后，两个物体的状态和动画效果的处理

### 1.2 计算碰撞

只要两个物体相互接触，它们就会发生碰撞。

### 1.3 矩形物体碰撞检测

假设检测发生碰撞的物体是 矩形 1 和 矩形2 时，我们只需检测 矩形1 的上下左右四侧的和 矩形2 是否存在着距离。

![shootingGame-10](/styles/images/project/shootingGame/sg-10.png)

从上图可知，矩形1 和矩形2 之间没有发生碰撞共有4中可能：

* 矩形2的右侧 离 矩形1的左侧 有一段距离
* 矩形2的左侧 离 矩形1的右侧 有一段距离
* 矩形2的底部 离 矩形2的顶部 有一段距离
* 矩形2的顶部 离 矩形2的底部 有一段距离

只要符合上述4种情况的一种，就不会发生碰撞。所以，我们可以**逆向思维**推导：当上面四种情况都不满足的时候，则证明矩形1 和 矩形2 发生了碰撞！

```js
// 判断四边是否都没有空隙
if (!(rect2.x + rect2.width < rect1.x) &&
    !(rect1.x + rect1.width < rect2.x) &&
    !(rect2.y + rect2.height < rect1.y) &&
    !(rect1.y + rect1.height < rect2.y)) {
    // 物体碰撞了
}
```

### 1.4 圆形物体碰撞检测

假设发生碰撞的物体是 圆形 时，检测碰撞则变得比较复杂了，前面矩形所使用的碰撞检测，并不能判断圆形物体的情况。如下图的情况：

![shootingGame-11](/styles/images/project/shootingGame/sg-11.png)

那么如何检测两圆是否碰撞了呢？这个时候又到了考验我们数理化的知识了。

**检测两圆是否相交：当两个圆心之间的距离是否小于两个圆的半径之和**

![shootingGame-12](/styles/images/project/shootingGame/sg-12.png)

其中 dx 和 dy 分别表示两个圆之间的横坐标和纵坐标的差值。 即 `dx = x2 - x1; dy = y2 - y1`;

然后我们需要通过 勾股定理 计算两个圆心之间的距离。如下图：

![shootingGame-13](/styles/images/project/shootingGame/sg-13.png)

因此我们碰撞检测的代码可以这样写：

```js
var dx = circle2.x - circle1.x;
var dy = circle2.y - circle1.y;
var distance = Math.sqrt((dx * dx) + (dy * dy));
if (distance < circle1.radius + circle2.radius) {
  // 两个圆形碰撞了
}
```

### 1.5 碰撞后的处理

当检测到碰撞后，则可以对碰撞的物体进行状态设置了，可以是相互毁灭，或者是反弹等。这里大家可以根据场景来决定。