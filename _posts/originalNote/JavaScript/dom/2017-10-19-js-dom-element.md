---
layout: post
title: "javascript - Element类型"
data: 2017-10-19 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

参考资料：
+ 《JavaScript高级程序设计（第3版）》 10.3

> * `Element` 类型用于表现 `XML` 或 `HTML` 元素，提供了对元素标签名、子节点及特性的访问。
<!-- more -->

## 一、Element 节点具有的特征

### 1.1 特征

> * `Element` 节点具有的特征
>    * `nodeType` 的值：1。
>    * `nodeName` 的值：元素的标签名。
>    * `nodeValue` 的值： `null`。
>    * `parentNode` 可能是： `Document` 或 `Element`。
>    * 其子节点可能是： `Element`、`Text`、`Comment`、`ProcessingInstruction`、`CDATASection` 或 `EntityReference`。

### 1.2 访问元素的标签名

> * 要访问元素的标签名，可以使用 `nodeName` 属性，也可以使用 `tagName` 属性，这两个属性会返回相同的值（使用后者主要是为了清晰起见）。
> * 在 `HTML` 中，标签名始终都以全部大写表示。【比较之前将标签名转换为相同的大小写形式】
> * 点击打开[demo](/effects/demo/demo-node/element/eg1.html)

```js
document.body.innerHTML = `<div id="div"></div>`;
const div = document.getElementById('div');

console.log(div.nodeName, div.tagName); // DIV，DIV

if (div.tagName == "div"){ //不能这样比较，很容易出错！
//在此执行某些操作
}
if (div.tagName.toLowerCase() === "div"){ //这样最好（适用于任何文档）
//在此执行某些操作
}
```

## 二、 HTML元素

> * 所有 `HTML` 元素都由 `HTMLElement` 类型表示，**不是直接通过这个类型，也是通过它的子类型来表示**。
> * `HTMLElement` 类型直接继承自 `Element` 并添加了一些属性。
> * 添加的这些属性分别对应于每个 `HTML` 元素中都存在的下列标准特性【以下属性都可以读写】。
>    * `id`：元素在文档中的唯一标识符。
>    * `title`：有关元素的附加说明信息，一般通过工具提示条显示出来。【只会在鼠标移动到这个元素之上时才会显示出来】
>    * `lang`：元素内容的语言代码，很少使用。
>    * `dir`：语言的方向，值为"`ltr`"（`left-to-right`，从左至右）或"`rtl`"（`right-to-left`，从右至左），也很少使用。
>    * `className`：与元素的 `class` 特性对应，即为元素指定的 `CSS`类。没有将这个属性命名为`class`，是因为 `class` 是 `ECMAScript` 的保留字。

> *  下表列出了所有 `HTML` 元素以及与之关联的类型。

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-07.png' | prepend: site.baseurl }})

![relationship-map]({{ '/styles/images/javascript/DOM/node/node-08.png' | prepend: site.baseurl }})

## 三、与特性有关的方法和属性

### 3.1 取得特性 - getAttribute()

> * 点击打开[demo](/effects/demo/demo-node/element/eg2.html)


> * **`ele.getAttribute(attr)`**：
> * 传递给 `getAttribute()` 的特性名与实际的特性名相同。【获取 `class` 特性值，应该传入"`class`"而不是"`className`"，后者只有在通过对象属性访问特性时才用。】
> * 如果给定名称的特性不存在，`getAttribute()` 返回 `null`。

```js
  document.body.innerHTML = '<div id="myDiv" class="bd" title="Body text" data-user="jm" style="background: blue;" onclick="console.log(this)"></div>';
  const myDiv = document.getElementById('myDiv');

  console.log(myDiv.getAttribute('id')); // "myDiv"
  console.log(myDiv.getAttribute('class')); // "bd"
```

---

> * 通过 `getAttribute()` 方法也可以取得自定义特性。【自定义特性应该加上 `data-` 前缀以便验证。】
> * 特性的名称是不区分大小写的，即"`ID`"和"`id`"代表的都是同一个特性。

```js
  document.body.innerHTML = '<div id="myDiv" class="bd" title="Body text" data-user="jm" style="background: blue;" onclick="console.log(this)"></div>';

  // 读取自定义属性
  console.log(myDiv.getAttribute('data-user')); // "jm"

```

---

> * 任何元素的所有特性，也都可以通过 `DOM` 元素本身的属性来访问。
> * 当然，`HTMLElement` 也会有 5个属性与相应的特性一一对应。
> * 不过，**只有公认的（非自定义的）特性才会以属性的形式添加到 `DOM` 对象中**。

```js
  document.body.innerHTML = '<div id="myDiv" class="bd" title="Body text" data-user="jm" style="background: blue;" onclick="console.log(this)"></div>';
  const myDiv = document.getElementById('myDiv');

  console.log(myDiv.getAttribute('id')); // "myDiv"
  console.log(myDiv.getAttribute('class')); // "bd"

  // 读取自定义属性
  console.log(myDiv.getAttribute('data-user')); // "jm"
  console.log(myDiv['data-user']); // "undefined"
```

---

> * 有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过 `getAttribute()` 返回的值并不相同。
>    * 第一类特性就是 `style`：用于通过 `CSS` 为元素指定样式。
>        * 在通过 `getAttribute()` 访问时，返回的 `style` 特性值中包含的是 `CSS` 文本。
>        * 通过属性来访问它则会返回一个对象。
>    * 第二类与众不同的特性是 `onclick` 这样的事件处理程序。
>        * 当在元素上使用时，`onclick` 特性中包含的是 `JavaScript` 代码。
>        * 如果通过 `getAttribute()` 访问，则会返回相应代码的字符串。
>        * 而在访问 `onclick` 属性时，则会返回一个 `JavaScript` 函数（如果未在元素中指定相应特性，则返回 `null`）【这是因为 `onclick` 及其他事件处理程序属性本身就应该被赋予函数值。】


```js
  document.body.innerHTML = '<div id="myDiv" class="bd" title="Body text" data-user="jm" style="background: blue;" onclick="console.log(this)"></div>';
  const myDiv = document.getElementById('myDiv');

  // 读取onclick
  console.log(myDiv.getAttribute('onclick')); // console.log(this)
  console.log(myDiv.onclick); // function (event){console.log(this)}

  // 读取style
  console.log(myDiv.getAttribute('style')); // background: blue;
  console.log(myDiv.style); // CSSStyleDeclaration ==》 一个很复杂的对象
```

### 3.2 设置特性 - setAttribute()

> * 点击打开[demo](/effects/demo/demo-node/element/eg3.html)

> * **`ele.setAttribute(attr, value)`**：【参数：要设置的特性名和值】
>   * 如果特性已经存在，`setAttribute()` 会以指定的值替换现有的值。
>   * 如果特性不存在，`setAttribute()` 则创建该属性并设置相应的值。

```js
  document.body.innerHTML = '<div class="red"></div>';
  const myDiv = document.body.querySelector('div');

  // 设置已有属性
  myDiv.setAttribute('class', 'blue');
  console.log(myDiv.getAttribute('class')); // blue

  // 设置未有属性
  myDiv.setAttribute('data-index', 1);
  console.log(myDiv.getAttribute('data-index')); // 1
```

---

> * 通过 `setAttribute()` 方法既可以操作 `HTML` 特性也可以操作自定义特性。
> * 通过这个方法设置的特性名会被统一转换为小写形式，即"`ID`"最终会变成"`id`"。 
> * 因为所有特性都是属性，所以直接给属性赋值可以设置特性的值，但是直接为 `DOM` 元素添加一个自定义的属性，该属性不会自动成为元素的特性。
>   * 想通过 `getAttribute()` 取得同名特性的值，结果会返回 `null`。

```js
  document.body.innerHTML = '<div class="red"></div>';
  const myDiv = document.body.querySelector('div');

  // 设置元素共有属性
  myDiv.id = "myDiv";
  console.log(myDiv.id); // myDiv

  // 设置自定义属性
  myDiv['data-user'] = 'jm';
  console.log(myDiv.getAttribute('data-user')); // null
```

### 3.3 删除特性 - removeAttribute()

> * **`ele.removeAttribute(attr)`**
> * 用于彻底删除元素的特性 -- 不仅会清除特性的值，而且也会从元素中完全删除特性。
> * 点击打开[demo](/effects/demo/demo-node/element/eg4.html)

```js
document.body.innerHTML = '<div class="red"></div>';
const myDiv = document.body.querySelector('div');

// 设置已有属性
myDiv.removeAttribute('class');
console.log(myDiv.getAttribute('class')); // null
```

### 3.4 attributes 属性

> * `Element` 类型是使用 `attributes` 属性的唯一一个 `DOM` 节点类型。
>   * `attributes` 属性中包含一系列节点，每个节点的 `nodeName` 就是特性的名称，而节点的 `nodeValue` 就是特性的值。
> * `attributes` 属性中包含一个 **`NamedNodeMap`**，与 `NodeList` 类似，也是一个 **“动态”的集合**。
> * 元素的每一个特性都由一个 `Attr` 节点表示，每个节点都保存在 `NamedNodeMap` 对象中。

---

> * `NamedNodeMap` 对象拥有下列方法。
>    * `getNamedItem(name)`：返回 `nodeName` 属性等于 `name` 的节点。
>    * `removeNamedItem(name)`：从列表中移除 `nodeName` 属性等于 `name` 的节点。【返回表示被删除特性的 Attr 节点】
>    * `setNamedItem(node)`：向列表中添加节点，以节点的 `nodeName` 属性为索引。
>    * `item(pos)`：返回位于数字 `pos` 位置处的节点。

---

> * 点击打开[demo](/effects/demo/demo-node/element/eg5.html)

```js
document.body.innerHTML = '<div id="red" class="big"></div>';
const myDiv = document.body.querySelector('div');

// 取得元素的 id 特性
console.log(myDiv.attributes.getNamedItem('id').nodeValue); // red
console.log(myDiv.attributes['id'].nodeValue); // red

// 设置特性的值
myDiv.attributes['class'].nodeValue = 'small';
console.log(myDiv.attributes['class'].nodeValue); // small

//  removeNamedItem()
const oldAttr = myDiv.attributes.removeNamedItem('id');
console.log(oldAttr); // id="red"
```

---

> * 迭代元素的每一个特性，然后将它们构造成 `name="value" name="value"`这样的字符串格式
> * 点击打开[demo](/effects/demo/demo-node/element/eg6.html)

```js
function outputAttributes(element){
var pairs = [],
    attrName,
    attrValue,
    i,
    len;

for (i=0, len=element.attributes.length; i < len; i++){
  attrName = element.attributes[i].nodeName;
  attrValue = element.attributes[i].nodeValue;
  pairs.push(attrName + "=\"" + attrValue + "\"");
}
return pairs.join(" ");
}

document.body.innerHTML = '<div id="new" class="blue"></div>'
const div = document.getElementById('new');
console.log(outputAttributes(div)); // id="new" class="blue"
```

## 四、创建元素  - createElement()

> * **`document.createElement(tagName)`**：【参数：要创建的元素标签名】
> * 返回值：返回一个 `DOM` 元素的引用。


> * 在新元素上设置特性（如：`id`、`class`）只是给它们赋予了相应的信息。
> * 要把新元素添加到文档树，可以使用 `appendChild()`、`insertBefore()` 或 `replaceChild()`方法，设置的这些特性才会影响浏览器的显示。
>   * 即：一旦将元素添加到文档树中，浏览器就会立即呈现该元素，此后，对这个元素所作的任何修改都会实时反映在浏览器中。


