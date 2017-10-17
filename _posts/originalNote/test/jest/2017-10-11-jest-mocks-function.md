---
layout: post
title: "jest - mocks function"
data: 2017-10-11 16:27:00 +0800
categories: 原创
tag: jest
---
* content
{:toc}


<!-- more -->

## 一、Mock Function

> * `Mock functions` 通过清除函数的实际调用从而更容易测试代码之间的连接，捕获对函数的调用以及在这些调用中传递的参数；
> * 当使用`new`操作符实例化时捕获构造函数的实例，并且允许测试时间配置的返回值。  

> * 有两种方式创建`mock functions`：
>   * 1.通过创建一个在测试代码中使用的`mock`函数 --- `Mock Function`。
>   * 2.手动 `mock` 来覆盖模块依赖关系 --- 编写`manual_mock`来覆盖模块依赖。

> * `mock` 函数就像间谍一样，因为他们可以让你监控在其他代码中间接被调用函数的行为，而不是仅仅测试输出。
> * 你可以通过 `jest.fn()` 创建一个 `mock`函数。
> * 如果不给予实施，这个`mock` 函数会在调用时直接返回`undefined`。

## 二、使用mock函数

```js

```