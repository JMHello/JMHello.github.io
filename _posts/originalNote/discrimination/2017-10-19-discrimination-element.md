---
layout: post
title: "discrimination - element"
data: 2017-10-18 14:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

* 参考资料
    * 《JavaScript高级程序设计（第3版）》 11.2 元素遍历
    
* 相关文章
    + [javascript - 节点层次及 Node类型](http://www.jmazm.com/2017/10/19/js-dom-node-level/)

<!-- more -->

## 一、 辨析获取元素关系的相关属性

> * 请看下图

![relationship-map]({{ '/styles/images/discrimination/element/element-01.png' | prepend: site.baseurl }})

> * 元素的 `childNodes` 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。
>   * `firstChild`的值：可能是元素、文本节点、注释或处理指令。
>   * `lastChild`的值：可能是元素、文本节点、注释或处理指令。
>   * `nextSibling`的值：可能是元素、文本节点、注释或处理指令。
>   * `lastSibling`的值：可能是元素、文本节点、注释或处理指令。

> * 如果使用 `childNodes`，必须先判断一些节点的类型（`nodeType`）才执行其他操作。

```js
for (var i=0, len=element.childNodes.length; i < len; i++){
 if (element.childNodes[i].nodeType == 1){
 //执行某些操作
 }
} 
```

---

> * 元素的 `children` 属性的子节点只会是元素节点。
>   * `firstElementChild`的值：只会是元素节点。
>   * `lastElementChild`的值：只会是元素节点。
>   * `nextElementSibling`的值：只会是元素节点。
>   * `lastElementSibling`的值：只会是元素节点。

 
