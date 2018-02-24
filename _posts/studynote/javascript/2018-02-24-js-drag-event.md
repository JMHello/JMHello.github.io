---
layout: post
title: "javascript - 原生拖放"
data: 2018-02-24 12:27:00 +0800
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

## 三、自定义放置目标

> * 在拖动元素经过某些无效放置目标时，可以看到一种特殊的光标（圆环中有一条反斜线），表示不能放置。
> * 即：元素支持设置为放置目标，但是，元素其实默认为不允许放置的
> * 可看到把蓝色`div`拖动到红色`div`中会出现禁止光标！【[demo](/effects/demo/js/dragEvent/v1.html)】

![drag](/effects/images/javascript/drag/drag-03.gif)

---

> * 如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生 `drop` 事件；
> * 不过，我们可以把任何元素变成有效的放置目标！
> * 在 `Firefox 3.5+` 中，放置事件的默认行为是打开被放到放置目标上的 URL。
>   * 换句话说，如果是把图像拖放到放置目标上，页面就会转向图像文件；
>   * 而如果是把文本拖放到放置目标上，则会导致无效 URL 错误。
>   * 因此，为了让 `Firefox` 支持正常的拖放，还要取消 `drop` 事件的默认行为，阻止它打开 `URL`

> * 发现：把蓝色`div`拖动到红色`div`中不再是禁止光标了！【[demo](/effects/demo/js/dragEvent/v2.html)】

![drag](/effects/images/javascript/drag/drag-04.gif)

```js
const target = document.getElementById('target')
target.addEventListener('dragenter', function (e) {
  e.preventDefault()
}, false)

target.addEventListener('dragover', function (e) {
  e.preventDefault()
}, false)

target.addEventListener('drop', function (e) {
  e.preventDefault()
}, false)
```

## 四、dataTransfer对象

### 4.1 介绍

> * `dataTransfer` 对象：它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。
> * [demo](/effects/demo/js/dragEvent/v3.html)

> * `e.dataTransfer` 对象如下图所示：

![drag](/styles/images/javascript/dragEvent/de-01.png)

### 4.2 方法

> * `event.dataTransfer.setData(数据类型, value)`
> * `event.dataTransfer.getData(数据类型)`

> * 数据类型
>   * `IE` 只定义了" `text` "和" `URL` "两种有效的数据类型，
>   * 而 `HTML5` 则对此加以扩展，允许指定各种 `MIME` 类型。
>   * 考虑到向后兼容，`HTML5` 也支持"`text`"和"`URL`"，但这两种类型会被映射为"`text/plain`"和 "`text/uri-list`"。

> * [demo](/effects/demo/js/dragEvent/v4.html)

```js
const drag = document.getElementById('drag')
const target = document.getElementById('target')
const txt = document.getElementById('txt')

drag.addEventListener('dragstart', function (e) {
  // 设置文本
  e.dataTransfer.setData('text', this.id)
}, false)

target.addEventListener('dragenter', function (e) {
  e.preventDefault()
}, false)

target.addEventListener('dragover', function (e) {
  e.preventDefault()
}, false)

target.addEventListener('drop', function (e) {
  e.preventDefault()
  // 获取文本
  const id = e.dataTransfer.getData('text')
  txt.innerHTML = `被拖拽元素的 id 为：${id}`
}, false)
```

![drag](/effects/images/javascript/drag/drag-05.gif)


---

> * Firefox 在其第 5 个版本之前不能正确地将 "url" 和 "text" 映射为 "text/uri-list" 和
    "text/plain"。但是却能把"Text"（T 大写）映射为"text/plain"。为了更好地在跨浏览器的情况
> * 一定要把短数据类型放在前面，因为 IE 10 及之前的版本仍然不支持扩展的 MIME 类型名，
    而它们在遇到无法识别的数据类型时，会抛出错误。
    
```js
var dataTransfer = event.dataTransfer;
//读取 URL
var url = dataTransfer.getData("url") ||dataTransfer.getData("text/uri-list");
//读取文本
var text = dataTransfer.getData("Text"); 
```

### 4.3 dropEffect与effectAllowed

> * 利用 `dataTransfer` 对象，可不光是能够传输数据，还能通过它来确定被拖动的元素以及作为放
    置目标的元素能够接收什么操作。
> * 这就要用到 `event.dataTransfer.dropEffect` 和 `event.dataTransfer.effectAllowed` 这两个属性！

> * `dropEffect` 属性：可以知道被拖动的元素能够执行哪种放置行为，在 `ondragenter` 事件处理程序中针对放置目标来设置
>   * "`none`"：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
>   * "`move`"：应该把拖动的元素移动到放置目标。
>   * "`copy`"：应该把拖动的元素复制到放置目标。
>   * "`link`"：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有 `URL`）

> * `dropEffect` 属性：只有搭配 `effectAllowed` 属性才有用；`effectAllowed` 属性表示允许拖动元素的哪种 `dropEffect`
> * 必须在 `ondragstart` 事件处理程序中设置 `effectAllowed` 属性

![drag](/styles/images/javascript/dragEvent/de-02.png)

---

> * [demo](/effects/demo/js/dragEvent/v5.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>原生拖放 - dropEffect与effectAllowed</title>
    <style>
        .target {
            width: 200px;
            height: 200px;
            margin-top: 20px;
            background: red;
        }
    </style>
</head>
<body>
<h2>允许用户把文本框中的文本拖放到一个div元素中</h2>
<input type="text" value="你好啊" id="txt">

<div class="target" id="target"></div>
<script>
  const txt = document.getElementById('txt')
  const target = document.getElementById('target')

    txt.addEventListener('dragstart', function (e) {
      // effectAllowed设置为move
      e.dataTransfer.effectAllowed = 'move'
    }, false)

    target.addEventListener('dragenter', function (e) {
      // dropEffect设置为move
      e.dataTransfer.dropEffect = 'move'
      e.preventDefault()
    }, false)

    target.addEventListener('dragover', function (e) {
      e.preventDefault()
    }, false)

    target.addEventListener('drop', function (e) {
      e.preventDefault()
      // 获取文本
      const content = e.dataTransfer.getData('text')
      target.innerHTML = `被拖拽的文本内容为 ：${content}`
    }, false)
</script>
</body>
</html>
```

![drag](/effects/images/javascript/drag/drag-06.gif)

### 4.4 其他成员

> * HTML5 规范规定 dataTransfer 对象还应该包含下列方法和属性。
>   *  `addElement(element)`：为拖动操作添加一个元素。
>       * 添加这个元素只影响数据（即增加作为拖动源而响应回调的对象），不会影响拖动操作时页面元素的外观。
>       * 在写作本书时，只有 Firefox 3.5+实现了这个方法。
>   *  `clearData(format)`：清除以特定格式保存的数据。
>       * 实现这个方法的浏览器有 IE、Fireforx 3.5+、Chrome 和 Safari 4+。
>   *  `setDragImage(element, x, y)`：指定一幅图像，当拖动发生时，显示在光标下方。
>       * 这个方法接收的三个参数分别是要显示的 HTML 元素和光标在图像中的 x、y 坐标。
>       * 其中，HTML 元素可以是一幅图像，也可以是其他元素。
>       * 是图像则显示图像，是其他元素则显示渲染后的元素。
>       * 实现这个方法的浏览器有 Firefox 3.5+、Safari 4+和 Chrome。
>   *  `types`：当前保存的数据类型。
>       * 这是一个类似数组的集合，以"text"这样的字符串形式保存着数据类型。
>       * 实现这个属性的浏览器有 IE10+、Firefox 3.5+和 Chrome。

