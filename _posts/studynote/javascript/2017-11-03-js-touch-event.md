---
layout: post
title: "javascript - 触摸事件"
data: 2017-11-03 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 13.4.9 触摸与手势事件

<!-- more -->


## 一、 触摸事件

### 1.1 触摸事件介绍

> * 触摸事件会在用户手指放在屏幕上面时、在屏幕上滑动时或从屏幕上移开时触发。

> * 支持触摸事件的浏览器包括 `iOS` 版 `Safari`、`Android` 版 `WebKit`、`bada` 版 `Dolfin`、`OS6+`中的 `BlackBerry`
    `WebKit`、`Opera Mobile 10.1+` 和 `LG` 专有 `OS` 中的 `Phantom` 浏览器。目前只有 `iOS` 版 `Safari` 支持多点触摸。
    桌面版 `Firefox 6+` 和 `Chrome` 也支持触摸事件。

### 1.2 相关触摸事件介绍

> * 下面这几个事件都会冒泡，也都可以取消。
>   * `touchstart`：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
>   * `touchmove`：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用 `preventDefault()` 可以阻止滚动。
>   * `touchend`：当手指从屏幕上移开时触发。【输出有关触摸操作的最终信息】
>   * `touchcancel`：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。

> * 虽然这些触摸事件没有在 `DOM` 规范中定义，但它们却是以兼容 `DOM` 的方式实现的。
> * 因此，每个触摸事件的 `event` 对象都提供了在鼠标事件中常见的属性：`bubbles`、`cancelable`、`view`、`clientX`、`clientY`、`screenX`、`screenY`、`detail`、`altKey`、`shiftKey`、`ctrlKey` 和 `metaKey`。

---

> * 除了常见的 `DOM` 属性外，触摸事件还包含下列三个**用于跟踪触摸的属性**。
>   * `touches`：表示当前跟踪的触摸操作的 `Touch` 对象的数组。
>   * `targetTouches`：特定于事件目标的 `Touch` 对象的数组。
>   * `changeTouches`：表示自上次触摸以来发生了什么改变的 `Touch` 对象的数组。
> * 点击打开[demo](/effects/demo/demo-touchEvent/touch/eg2.html)

> * 图1

![img](/styles/images/javascript/event/touchEvent/touchEvent-01.png)

> * 图2 【补充：下图里展示的 `TouchList` 对象的数据应该是一样的，请脑补或者自己尝试一下】

![img](/styles/images/javascript/event/touchEvent/touchEvent-02.png)

> * 通过图2的比较可以知道：
>   * 当手指从屏幕上移开时，即触发 `touchend` 事件后，`touches` 集合中就没有任何 `Touch` 对象了【因为不存在活动的触摸操作】，不过可以使用 `changedTouches`【因为它保存了上一次`Touch`对象】。 

---

> * 每个 `Touch` 对象包含下列属性。
>   * `clientX`：触摸目标在视口中的 `x` 坐标。
>   * `clientY`：触摸目标在视口中的 `y` 坐标。
>   * `identifier`：标识触摸的唯一 `ID`。
>   * `pageX`：触摸目标在页面中的 `x` 坐标。
>   * `pageY`：触摸目标在页面中的 `y` 坐标。
>   * `screenX`：触摸目标在屏幕中的 `x` 坐标。
>   * `screenY`：触摸目标在屏幕中的 `y` 坐标。
>   * `target`：触摸的 `DOM` 节点目标。

> * 点击打开[demo](/effects/demo/demo-touchEvent/touch/eg1.html)

> * 过程

![img](/effects/images/javascript/event/touchEvent/touchEvent-01.gif)

> * 从上面过程可知道：
>   * 只要点击屏幕（无论点击一下还是更多下），就会触发 `touchstart` 事件。
>   * 只是点击一次屏幕，但不在屏幕上移动的话，是不会触发 `touchmove` 事件。

--- 

> * **这些事件会在文档的所有元素上面触发，因而可以分别操作页面的不同部分。**
> * 在触摸屏幕上的元素时，这些事件（包括鼠标事件）发生的顺序如下：

![img](/styles/images/javascript/event/touchEvent/touchEvent-03.png)








