---
layout: post
title: "javascript - Text类型"
data: 2017-10-19 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 参考资料：
    + 《JavaScript高级程序设计（第3版）》 10.1.4 Text类型

> * 文本节点由 `Text` 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的
    `HTML` 字符，但不能包含 `HTML` 代码。

<!-- more -->

## 一、Text 节点具有的特征

> * `nodeType` 的值为 3。
> * `nodeName` 的值为" `#text`"。
> * `nodeValue` 的值为节点所包含的文本。
> * `parentNode` 是一个 `Element`。
> * 不支持（没有）子节点。

> * 可以通过 `nodeValue` 属性或 `data` 属性访问 `Text` 节点中包含的文本，这两个属性中包含的值相
  同。对 `nodeValue` 的修改也会通过 `data` 反映出来，反之亦然。

## 二、操作节点中的文本的方法和属性

### 2.1 方法

> * `appendData(text)`：将 `text` 添加到节点的末尾。
> * `deleteData(offset, count)`：从 `offset` 指定的位置开始删除 `count` 个字符。
> * `insertData(offset, text)`：在 `offset` 指定的位置插入 `text`。
> * `replaceData(offset, count, text)`：用 `text` 替换从 `offset` 指定的位置开始到 `offset+count` 为止处的文本。
> * `splitText(offset)`：从 `offset` 指定的位置将当前文本节点分成两个文本节点。
> * `substringData(offset, count)`：提取从 `offset` 指定的位置开始到 `offset+count` 为止处的字符串。

### 2.2 length 属性

> * `length` 属性：保存着节点中字符的数目。
> * `nodeValue.length` 和 `data.length` 中也保存着同样的值。

---

> * 在默认情况下，每个可以包含内容的元素最多只能有一个文本节点，而且必须确实有内容存在。来看几个例子。

```html
<!-- 没有内容，也就没有文本节点 -->
<div></div>

<!-- 有空格，因而有一个文本节点 -->
<div> </div>

<!-- 有内容，因而有一个文本节点 -->
<div>Hello World!</div> 
```

## 三、创建文本节点

> * **`document.createTextNode(text)`**：【参数：要插入节点中的文本】
> * 在创建新文本节点的同时，也会为其设置 ownerDocument 属性。
> * 不过，除非把新节点添加到文档树中已经存在的节点中，否则我们不会在浏览器窗口中看到新节点。【例如：`appendChild()`方法】

> * 点击打开[demo](/effects/demo/demo-node/text/eg1.html)

```js
// 新建元素
var element = document.createElement("div");
element.className = "message";

// 新建文本节点
var textNode = document.createTextNode("Hello world!");

element.appendChild(textNode);
document.body.appendChild(element); 
```

---

> * 一般情况下，每个元素只有一个文本子节点。不过，在某些情况下也可能包含多个文本子节点，如下面的例子所示。
> * **如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格**。
> * 点击打开[demo](/effects/demo/demo-node/text/eg2.html)

```js
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);

document.body.appendChild(element); 
```

## 四、规范化文本节点 - normalize()

> * DOM 文档中存在相邻的同胞文本节点很容易导致混乱，因为分不清哪个文本节点表示哪个字符串。

> * `ele.normalize()`：由 `Node` 类型定义的（因而在所有节点类型中都存在，能够将相邻文本节点合并。
>   * 即：如果在 **一个包含两个或多个文本节点的父元素**上调用 `normalize()`方法，则会将所有文本节点合并成一个节点，结果节点的 `nodeValue` 等于将合并前每个文本节点的 `nodeValue` 值拼接起来的值。

> * 点击打开[demo](/effects/demo/demo-node/text/eg3.html)

```js
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);

document.body.appendChild(element);

console.log(element.childNodes.length); //2
console.log(element.firstChild.nodeValue) // Hello world!
console.log(element.lastChild.nodeValue) // Yippee!

element.normalize();
console.log(element.childNodes.length); //1
console.log(element.firstChild.nodeValue); // "Hello world!Yippee!"
console.log(element.lastChild.nodeValue) // "Hello world!Yippee!"
```

## 五、分割文本节点 - splitText()

> * **`ele.splitText()`**
> * 用法：会将一个文本节点分成两个文本节点，即按照指定的位置分割 `nodeValue` 值。
>   * 原来的文本节点将包含从开始到指定位置之前的内容，新文本节点将包含剩下的文本。
> * 返回值：返回一个新的文本节点。
> * 该节点与原节点的 `parentNode` 相同。

> * 点击打开[demo](/effects/demo/demo-node/text/eg4.html)

```js
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

document.body.appendChild(element);

var newNode = element.firstChild.splitText(5);

console.log(element.firstChild.nodeValue); //"Hello"
console.log(newNode.nodeValue); //" world!"
console.log(element.childNodes.length); //2
```