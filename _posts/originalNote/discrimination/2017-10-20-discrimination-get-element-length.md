---
layout: post
title: "discrimination - querySelectorAll 方法相比 getElementsBy 系列方法的区别"
data: 2017-10-18 14:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

<!-- more -->

## 一、 实例：不同获取元素的方法 - 添加新节点后 - length长度的变化

### 1.1 `getElementsByTagName()`

> * 点击打开[demo](/effects/demo/discrimination/get-element-length/eg1.html)

```js

  document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`;
  const list = document.getElementById('list');
  const newLi = document.createElement('li');


  // 获取元素的方法：getElementsByTagName
  const aLi2 = list.getElementsByTagName('li');
  

  // 未添加节点前的 li 的个数
  console.log(aLi2.length); // 3


  // 添加节点后，li的个数
  const result = append(list, newLi);
  console.log(result === newLi); // true

  console.log(aLi2.length); // 4
```

> * 从上面结果可以看出，通过`getElementsByTagName()`获取的元素列表，其长度是会动态变化的。
> * 即使其列表被分别保存在了`aLi2`中，在添加新节点后，再通过 `aLi2.length` 访问列表长度，其值由原来的`3` 变为了`4`。

### 1.2 `querySelectorAll()`

> * `querySelectorAll()`
> * 点击打开[demo](/effects/demo/discrimination/get-element-length/eg2.html)

```js
  document.body.innerHTML = `<ul id="list"><li>1</li><li>2</li><li>3</li></ul>`;
  const list = document.getElementById('list');
  const newLi = document.createElement('li');
  const aLi1 = list.querySelectorAll('li');


  // 未添加节点前的 li 的个数
  console.log(aLi1.length); // 3


  // 添加节点后，li的个数
  const result = append(list, newLi);
  console.log(result === newLi); // true
  
  console.log(aLi1.length); // 3
  
  console.log(list.querySelectorAll('li').length); // 4
```

> * 从上面代码你会发现一个很奇怪的问题：同样是拿一个变量`aLi1`保存获取到的元素列表，并在添加节点的前后访问其`length`属性，
>  然而，你会看到，他们的值是一样的，都是`3`，即：未添加新节点前的 `li`的个数，但是，新的`li`节点却又真实地被添加到了`ul`上。
> * 不过，你重新通过 `list.querySelectorAll('li').length` 访问 `li`的个数，它又是正确的值`4`。

## 二、分析

> * **`querySelectorAll()`** 
> * `querySelectorAll()` 实际上返回的是一个 `NodeList`对象。
> * 大家或许会很奇怪，`NodeList`对象不是一个 **动态集合**吗？那为什么其最基本的属性`length`在添加新节点后都没有变化呢？
> * 实际上，**那是因为在 `W3C` 规范中对 `querySelectorAll` 方法有明确规定：通过 `querySelectorAll()`方法返回的 `NodeList`对象是静态的**。
> * 这也说明了：我们将返回的静态的`NodeList`对象存在了一个变量里，那么它也是静态的，不变的，除非重新通过类似`list.querySelectorAll('li').length`访问，才能获取最新的值。

> * **`getElementsBy`系列方法**：
> * `getElementsBy`系列方法返回的其实是一个 `HTMLCollection` 对象，它也是一个**动态集合**，与`NodeList`有点像。



 
