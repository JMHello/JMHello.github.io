---
layout: post
title: "ES6 - Iterator 和 for...of 循环"
data: 2017-09-22 9:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}


> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/iterator](http://es6.ruanyifeng.com/#docs/iterator)

<!-- more -->

## 一、Iterator（遍历器）的概念

### 1.1 Iterator由来
> * `JavaScript` 表示“集合”的数据结构：数组（`Array`）、对象（`Object`）、`Map`和`Set`。
>   * 用户还可以组合使用它们，定义自己的数据结构。比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
> * 遍历器（`Iterator`）是一种接口，为各种不同的数据结构提供统一的访问机制。
> * 任何数据结构只要部署`Iterator`接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

### 1.2 Iterator 的作用

1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. `ES6`创造了一种新的遍历命令`for...of`循环，`Iterator`接口主要供`for...of`消费。

### 1.3 Iterator遍历过程

> * Iterator遍历过程如下：
>   1. 创建一个指针对象，指向当前数据结构的起始位置。即：**遍历器对象本质就是一个指针对象**。
>   2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
>   3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
>   4. 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

> * 每一次调用`next`方法，都会返回数据结构的当前成员的信息，即：返回一个包含`value`和`done`两个属性的对象。
>   * `value`属性：是当前成员的值
>   * `done`属性：是一个布尔值，表示遍历是否结束。

下面是一个模拟`next`方法返回值的例子。

```js
function makeIterator (arr) {
}

```

