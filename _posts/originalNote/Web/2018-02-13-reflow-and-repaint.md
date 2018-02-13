---
layout: post
title: "重排和重绘"
date: 2018-02-03 19:00:00 +0800 
categories: 原创
tag: 深入理解Web前端
---
* content
{:toc}

> * 参考资料
>   * [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
>   * [无线性能优化：Composite](http://taobaofed.org/blog/2016/04/25/performance-composite/)
>   * [https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/](https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/)

<!-- more -->


## 一、重排和重绘

> * 重排（`reflow`）：一般涉及到几何属性
>   * 页面的第一次渲染
>   * 浏览器窗口尺寸的变化
>   * 元素位置的改变
>   * 元素的大小改变
>   * 新增可见元素
>   * 删除可见元素
>       * 通过 `display: none` 隐藏 `DOM` 节点（导致重绘和重排）
>       * 通过 `visibility: hidden` 隐藏 `DOM` 节点 （导致重绘，因为它没有影响其它元素位置布局）
>   * 内容改变(光标 :hover 、进入文本输入框、修改浏览器的字体都会导致重排)

> * 重绘（`repaint`）：`color`、`background-color`

> * 重排一定会引起重绘，重绘不一定会引起重排

## 二、最佳实践

### 2.1 CSS 属性的读、写操作分开

> * 浏览对 CSS 属性的连续修改做了优化，比如下面的连续修改两次 style，不会导致两次重新渲染（这里只会一次渲染）：

```js
div.style.color = 'white'
div.style.left = 10 + 'px'
```

> * 如果是下面这样，则会导致两次渲染
>   * 原因：对 div 元素设置背景色以后，第二行要求浏览器给出该元素的位置，所以浏览器不得不重新渲染然后得到该元素的位置。

```js
div.style.color = 'blue';
var margin = parseInt(div.style.marginTop);
div.style.marginTop = (margin + 10) + 'px';
```

> * 除此之外，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染，所以对于以下属性，最好在使用前，用一个变量保存起来先！
>   * `offsetTop/offsetLeft/offsetWidth/offsetHeight`
>   * `scrollTop/scrollLeft/scrollWidth/scrollHeight`
>   * `clientTop/clientLeft/clientWidth/clientHeight`
>   * `getComputedStyle()`


```js
const divOffsetTop = div.offsetTop
div.style.top = divOffsetTop - 2 + 'px'
```

### 2.2 通过 class 或者 csstext 来批量更新样式

> * [demo](/effects/demo/js/reflowAndRepaint/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>重拍和重绘 - 最佳实践</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background: blue;
        }
        .special {
            color: white;
        }
    </style>
</head>
<body>
<div id="div">nihao</div>
<script>
    const div = document.getElementById('div')

    // bad
    div.style.left = 10 + 'px'
    div.style.top = 10 + 'px'

    // good
    div.className += 'special'

    // good
    console.log(div.style.cssText) // left: 10px; top: 10px;
    div.style.cssText += '; padding: 10px; margin: 10px;'
</script>
</body>
</html>
```

## 2.3 其他方法

> * `DOM` 样式离线更新：
>   * 尽量使用离线 `DOM`，而不是真实的网页 `DOM` 来改变元素样式。比如：
>       * 操作 `Document Fragment`对象，完成后再把这个对象加入 `DOM`。
>       * 使用 `cloneNode()` 方法，在克隆的节点上进行操作，然后再用克隆的节点替换原始节点。
> * 使用 `display: none` 进行样式批量更新：
>   * 先将元素设为 `display: none`（需要1次重排和重绘），然后对这个节点进行100次操作，最后再恢复显示（需要1次重排和重绘）。这样一来，你就用两次重新渲染，取代了可能高达100次的重新渲染。
> * 善用 `position`：
>   * `position` 属性为 `absolute` 或 `fixed` 的元素，重排的开销会比较小，因为不用考虑它对其他元素的影响。
> * 将元素设置为不可见：
>   * 只在必要的时候，才将元素的 `display` 属性为可见，因为不可见的元素不影响重排和重绘。
>   * 另外，`visibility : hidden` 的元素只对重绘有影响，不影响重排。
> * 减少样式的更新频率：
>   * 使用虚拟 `DOM` 脚本库，比如 `React` 等。
> * 调节 js 运行帧率：
>   * 使用 `window.requestAnimationFrame()`、`window.requestIdleCallback()` 这两个方法调节重新渲染的频率。
> * 慎用 `table` 布局：
>   * `table` 的单元格具有非常好的自适应特性，但是同时代价也很高，能不用就不用。
>   * 如果非要使用 `table` ，给 `table` 添加 `table-layout: fixed` 属性，这个属性的目的是让后面单元格的宽度由表头的宽度来决定——减少布局的计算量。