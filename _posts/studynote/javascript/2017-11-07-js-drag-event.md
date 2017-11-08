---
layout: post
title: "javascript - 原生拖放"
data: 2017-11-07 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 16.2 

<!-- more -->


## 一、拖放事件

> * 拖动某元素时，将依次触发下列事件：【**下述三个事件的目标都是被拖动的元素**】
>   * `dragstart`：按下鼠标键并开始移动鼠标时触发。
>       * 此时光标变成“不能放符号”，表示不能把元素放到自己上面。
>   * `drag`：在元素被拖动期间会持续触发该事件。
>   * `dragend`：当拖动停止时触发该事件（无论是把元素放到了有效的放置目标还是放到了无效的放置目标上）。

---

> * 当某个元素被拖动到一个有效的放置目标时，会依次发生下列事件：
>   * `dragenter`：只要有元素被拖放到放置目标上就会触发该事件。（类似于 `mouseover` 事件）
>   * `dragover`：在被拖动的元素还在放置目标的范围内移动时，就会持续触发该事件。
>   * `dragleave` 或 `drop`：元素被拖出了放置目标，触发 `dragleave` ；元素被放到了放置目标中，触发 `drop`。

## 二、属性 draggable

> * 默认情况下，图像、链接和文本是可以拖动的。

> * `draggable`：
>   * `HTML5` 新增属性，表示元素是否可以拖动。
>   * 图像和链接的 `draggable` 属性自动被设置成了 `true`，而其他元素这个属性的默认值都是 `false`。
> * 支持 `draggabl`e 属性的浏览器：IE 10+、Firefox 4+、Safari 5+和 Chrome。Opera 11.5 及之前的版本都不支持 HTML5 的拖放功能。
> * 另外，为了让 Firefox 支持可拖动属性，还必须添加一个 `ondragstart` 事件处理程序，并在 `dataTransfer` 对象中保存一些信息。