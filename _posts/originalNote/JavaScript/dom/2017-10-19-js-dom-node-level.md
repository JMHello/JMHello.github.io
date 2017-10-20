---
layout: post
title: "javascript - 节点层次及 Node类型"
data: 2017-10-19 10:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

参考资料：
+ 《JavaScript高级程序设计（第3版）》 10.1

> * `DOM(Document Object Model)`，文档对象模型，是针对 `HTML` 和 `XML` 文档的一个 `API`（应用程序编程接口）
> * `DOM` 描绘了一个 **层次化的节点树**，允许开发人员添加、移除和修改页面的某一部分。

<!-- more -->

## 一、节点层次

> * 请看下图：

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-01.png' | prepend: site.baseurl }})

> * `DOM` 可以将任何 `HTML` 或 `XML` 文档描绘成一个 **由多层节点构成**的结构。
> * 节点分为几种不同的 **类型** ，每种类型分别表示文档中不同的信息及（或）标记。
> * 每个节点都拥有各自的 **特点**、**数据** 和 **方法**。
> * 节点见也会存在某种**关系**。
> * 节点之间的关系构成了层次，而所有页面标记则表现为一个 **以特定节点为根节点的树形结构**。
>   * 一个页面只有一个根节点，那就是 `<html>`元素 (对于`html`文件来说)

## 二、Node类型

### 2.1 介绍

> * `DOM1` 级定义了一个 `Node` 接口，该接口将由 `DOM` 中的所有节点类型实现。
> * 这个 `Node` 接口在 `JavaScript` 中是作为 `Node` 类型实现的；除了 `IE` 之外，在其他所有浏览器中都可以访问到这个类型。
> * `JavaScript` 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。

---

> * 每个节点都有一个 `nodeType` 属性，用于表明节点的类型。
> * 节点类型由在 `Node` 类型中定义的下列 `12` 个数值常量来表示，任何节点类型必居其一：
>    * `Node.ELEMENT_NODE(1)`；
>    * `Node.ATTRIBUTE_NODE(2)`；
>    * `Node.TEXT_NODE(3)`；
>    * `Node.CDATA_SECTION_NODE(4)`；
>    * `Node.ENTITY_REFERENCE_NODE(5)`；
>    * `Node.ENTITY_NODE(6)`；
>    * `Node.PROCESSING_INSTRUCTION_NODE(7)`；
>    * `Node.COMMENT_NODE(8)`；
>    * `Node.DOCUMENT_NODE(9)`；
>    * `Node.DOCUMENT_TYPE_NODE(10)`；
>    * `Node.DOCUMENT_FRAGMENT_NODE(11)`；
>    * `Node.NOTATION_NODE(12)`。

---

> * 判断节点类型的方法：通过 `nodeType` 属性与数字值作比较（适用于所有浏览器）

```js
if (someNode.nodeType === 1) {
  // ...
}
```

### 2.2 nodeName 和 nodeValue

> * 要了解节点的具体信息，可以使用 nodeName 和 nodeValue 这两个属性。
> * 这两个属性的值完全取决于节点的类型。
> * 在使用这两个值以前，最好是像下面这样先检测一下节点的类型。

```js
if (someNode.nodeType === 1){
 value = someNode.nodeName; //nodeName 的值是元素的标签名
}
```

> * 在这个例子中，首先检查节点类型，看它是不是一个元素。
>   * 如果是，则取得并保存 `nodeName` 的值。
> * **对于元素节点，`nodeName` 中保存的始终都是元素的标签名，而 `nodeValue` 的值则始终为 `null`**。


## 三、 节点关系

### 3.1 节点关系图

> * 节点间的关系可看下图：

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-01.png' | prepend: site.baseurl }})


### 3.2 子节点 - childNodes 

> * 子节点 --- **`childNodes`**：
>   * 每个节点都有一个 `childNodes` 属性，其中保存着一个 `NodeList` 对象。
>       * **`NodeList`**： `NodeList` 是一种 **类数组对象**，用于保存一组有序的节点，可以通过位置来访问这些节点。
>       * `NodeList` 对象的独特之处在于，它实际上是 **基于 DOM 结构动态执行查询的结果**，因此 `DOM` 结构的变化能够自动反映在 `NodeList` 对象中。

> * 点击打开[demo](/effects/demo/demo-node/node/eg1.html)

```js
document.body.innerHTML = `<div id="div"><i></i><p></p><p></p></div>`;
const div = document.getElementById('div');
// 通过方括号方位
console.log(div.childNodes[0]); // <i></i>

// 通过item()访问
console.log(div.childNodes.item(1)) // <p></p>

// childNodes 的 length 属性
console.log(div.childNodes.length) // 3

console.log(div.childNodes);
```


> * `childNodes` 类数组：

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-03.png' | prepend: site.baseurl }})

### 3.3 父节点 - parentNode

> * 每个节点都有一个 `parentNode` 属性，该属性指向文档树中的父节点。
> * 包含在 `childNodes` 列表中的所有节点都具有相同的父节点，因此它们的 `parentNode` 属性都指向同一个节点。
> * 点击打开[demo](/effects/demo/demo-node/node/eg2.html)

```js
document.body.innerHTML = `<div id="div"><i id="i"></i><p id="p"></p><p></p></div>`;
const i = document.getElementById('i');
const p = document.getElementById('p');

console.log(i.parentNode); // <div id="div"><i id="i"></i><p id="p"></p><p></p></div>
console.log(p.parentNode); // <div id="div"><i id="i"></i><p id="p"></p><p></p></div>
console.log(i.parentNode === p.parentNode); // true
```

### 3.4 同胞节点之一 - nextSibling

> * `nextSibling`：指的就是当前节点的下一个节点。（指的是最近的那一个节点，不能跨节点）

> * 点击打开[demo](/effects/demo/demo-node/node/eg3.html)

```js
document.body.innerHTML = `<div id="div"><i id="i"></i><p id="p1"></p><p id="p2"></p></div>`;
const div = document.getElementById('div');
const i = document.getElementById('i');
const p1 = document.getElementById('p1');

console.log(div.nextElementSibling); // null
console.log(i.nextElementSibling); // <p id="p1"></p>
console.log(p1.nextElementSibling); // <p id="p2"></p>
```

### 3.5 同胞节点之一 - previousSibling

> * `previousSibling`：指的就是当前节点的上一个节点（指的是最近的那一个节点，不能跨节点）。
> * 点击打开[demo](/effects/demo/demo-node/node/eg4.html)

```js
 document.body.innerHTML = `<div id="div"><i id="i"></i><p id="p1"></p><p id="p2"></p></div>`;
  const div = document.getElementById('div');
  const i = document.getElementById('i');
  const p1 = document.getElementById('p1');

  console.log(div.previousElementSibling); // null
  console.log(i.previousElementSibling); // null
  console.log(p1.previousElementSibling); // <i id="i"></i>
```

### 3.6 firstChild 和 lastChild

> * `firstChild`：当前元素的第一个子节点。
>   * `someNode.firstChild` 的值始终等于 `someNode.childNodes[0]`

> * `lastChild`：当前元素的最后一个子节点。
>   * `someNode.lastChild` 的值始终等于 `someNode.childNodes [someNode.childNodes.length-1]`

> * 在只有一个子节点的情况下，`firstChild` 和 `lastChild` 指向同一个节点。
> * 如果没有子节点，那么 `firstChild` 和 `lastChild` 的值均为 `null`。

> * 点击打开[demo](/effects/demo/demo-node/node/eg5.html)

```js
document.body.innerHTML = `<div id="div"><i></i><p id="p1"></p><p id="p2"><span></span></p></div>`;
const div = document.getElementById('div');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

// 存在不只一个子节点
console.log(div.firstChild, div.lastChild); // <i></i>，<p id="p2">...</p>
console.log(div.firstChild === div.childNodes[0]); // true
console.log(div.lastChild === div.childNodes[div.childNodes.length - 1]); // true

// 不存在子节点
console.log(p1.firstChild, p1.lastChild); // null, null

// 只有一个子节点
console.log(p2.firstChild === p2.lastChild); // true
```

### 3.7 hasChildNodes()

> * `hasChildNodes()`：在节点包含一或多个子节点的情况下返回 `true`，没有子节点返回 `false`。
> * 点击打开[demo](/effects/demo/demo-node/node/eg6.html)

```js
  document.body.innerHTML = `<div id="div"><i></i><p id="p1"></p><p id="p2"><span></span></p></div>`;
  const div = document.getElementById('div');
  const p1 = document.getElementById('p1');

  // 存在子节点
  console.log(div.hasChildNodes()); // true
  // 不存在子节点
  console.log(p1.hasChildNodes()); // false
```

### 3.8 ownerDocument

> * `ownerDocument`：该属性指向表示整个文档的文档节点。
> * 这种关系表示的是任何节点都属于它所在的文档，任何节点都不能同时存在于两个或更多个文档中。
> * 通过这个属性，我们可以不必在节点层次中通过层层回溯到达顶端，而是可以直接访问文档节点。
> * 点击打开[demo](/effects/demo/demo-node/node/eg7.html)

```js
document.body.innerHTML = `<div id="div"><i></i><p id="p1"></p><p id="p2"><span></span></p></div>`;
const div = document.getElementById('div');
const p1 = document.getElementById('p1');

// 存在子节点
console.log(div.ownerDocument); // #document
// 不存在子节点
console.log(p1.ownerDocument); // #document
```

> * 文档节点：

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-04.png' | prepend: site.baseurl }})

### 3.9 补充

> * **虽然所有节点类型都继承自 `Node`，但并不是每种节点都有子节点**。

## 四、操作节点

> * `currentNode` 都是指父节点。

### 4.1 末尾添加节点 - appendChild()

> * **`currentNode.appendChild(newNode)`**：
> * 用法：向 `childNodes` 列表的**末尾**添加一个节点。
    * 添加节点后，`childNodes` 的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。
> * 返回值：更新完成后，`appendChild()`返回 **新增的节点**。
  
> * 如果传入到 `appendChild()` 中的节点已经是文档的一部分了，那结果就是**将该节点从原来的位置转移到新位置**。
> * 即使可以将 `DOM` 树看成是由一系列指针连接起来的，但任何 `DOM` 节点也不能同时出现在文档中的多个位置上。
>   * 因此，如果在调用 `appendChild()` 时传入了父节点的第一个子节点，那么该节点就会成为父节点的最后一个子节点。

> * 例 【点击打开[demo](/effects/demo/demo-node/node/eg8.html)】

```js
document.body.innerHTML = `<div id="div"><i id="i"></i><p id="p1"></p></div>`;
const div = document.getElementById('div');
const i = document.getElementById('i');

// i元素是div元素的第一个子节点，因此该节点就会成为父节点的最后一个子节点
const returnNode = div.appendChild(i);
console.log(returnNode === div.firstChild); // false
console.log(returnNode === div.lastChild); // true
console.log(returnNode === i); // true
```

> * 未添加节点前：

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-05.png' | prepend: site.baseurl }})

> * 添加节点后：

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-06.png' | prepend: site.baseurl }})

### 4.2 任意位置插入节点 insertBefore()

> * **`currentNode.insertBefore(newNode, referenceNode)`** （参数：要插入的节点和作为参照的节点）
> * 用法：可以将节点放在 `childNodes` 列表中某个特定的位置上。
>    *  插入节点后，被插入的节点会变成 **参照节点的前一个同胞节点**（`previousSibling`），同时被方法返回。
> * 如果参照节点是 `null`，则 `insertBefore()` 与 `appendChild()` 执行相同的操作。

> * 例 【点击打开[demo](/effects/demo/demo-node/node/eg9.html)】

```js
document.body.innerHTML = `<div id="div"><i id="i"></i><p id="p1"><i></i></p></div>`;
const div = document.getElementById('div');
const i = document.getElementById('i');
const p1 = document.getElementById('p1');

// 插入后成为最后一个子节点
const returnNode1 = div.insertBefore(i, null);
console.log(returnNode1 === i); // true

// 插入后成为第一个子节点
const span = document.createElement('span');
const returnNode2 = p1.insertBefore(span, p1.firstChild);
console.log(returnNode2 === p1.firstChild); // true

// 插入到最后一个子节点前面
const em = document.createElement('em');
const returnNode3 = div.insertBefore(em, div.lastChild);
console.log(returnNode3 === div.childNodes[div.childNodes.length - 2]); // true
```

### 4.3 删除节点 - removeChild() 和 replaceChild()

> * **`currentNode.removeChild(node)`** - 删除节点
> * 用法：用于移除节点。
> * 返回值：被移除的节点。
> * 例 【点击打开[demo](/effects/demo/demo-node/node/eg10.html)】

```js
document.body.innerHTML = `<div id="div"><i id="i"></i></div>`;
const div = document.getElementById('div');
const i = document.getElementById('i');

// 移除节点i
const returnNode = div.removeChild(i);
console.log(returnNode === i); // true
```

---

> * **`currentNode.replaceChild(newNode, replacedNode)`** - 替换节点 【参数：要插入的节点和要替换的节点】
> * 用法：用于移除节点。【要替换的节点将由这个方法返回并从文档树中被移除，同时由要插入的节点占据其位置】
> * 返回值：被移除的节点。
> * 在使用 `replaceChild()` 插入一个节点时，该节点的所有关系指针都会从被它替换的节点复制过来。即：被替换的节点仍然还在文档中，但它在文档中已经没有了自己的位置。

> * 例 【点击打开[demo](/effects/demo/demo-node/node/eg11.html)】

```js
  document.body.innerHTML = `<div id="div"><i id="i"></i></div>`;
  const div = document.getElementById('div');
  const i = document.getElementById('i');
  const newNode = document.createElement('span');

  // 移除节点i，并用 span 替换
  const returnNode = div.replaceChild(newNode, i);
  console.log(returnNode === i); // true
```

### 4.4 cloneNode()

> * **`someNode.cloneNode(flag)`** 【参数：布尔值】
> * `cloneNode()`方法接受一个布尔值参数，表示 **是否执行深复制**。
>    * 在参数为 `true` 的情况下，执行 **深复制** --- 复制节点及其整个子节点树。
>    * 在参数为 `false` 的情况下，执行**浅复制** --- 只复制节点本身。
> * 用法：用于创建调用这个方法的节点的一个完全相同的副本。
> * 复制后返回的节点副本属于文档所有，但并没有为它指定父节点，除非通过 `appendChild()`、`insertBefore()`或 `replaceChild()`将它添加到文档中。

> * 例 【点击打开[demo](/effects/demo/demo-node/node/eg12.html)】

```js
document.body.innerHTML = `<div id="div"><i id="i"></i></div>`;
const div = document.getElementById('div');

// 深复制
const deepCopyResult = div.cloneNode(true);
console.log(deepCopyResult); // <div id="div"><i id="i"></i></div>

// 浅复制
const shallowCopeResult = div.cloneNode(false);
console.log(shallowCopeResult); // <div id="div"></div>
```

> * 注意：
> * `cloneNode()`方法不会复制添加到 `DOM` 节点中的 `JavaScript` 属性，例如事件处理程序等。
> * 这个方法 **只复制特性、（在明确指定的情况下也复制）子节点，其他一切都不会复制**。
> * `IE` 在此存在一个 `bug`，即它会复制事件处理程序，所以我们建议在复制之前最好先移除事件处理程序。