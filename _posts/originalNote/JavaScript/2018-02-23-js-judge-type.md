---
layout: post
title: "javascript - 判断变量类型"
data: 2018-02-23 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

<!-- more -->

## 一、 typeof

> * [demo](/effects/demo/js/judgeType/v1.html)

```js
    const a = 1
    const b = 'b'
    const c = new Object()
    const d = /hello/
    const e = function () {}
    const f = undefined
    const g = null
    const h = []
    const i = true

    console.log(`a = 1 的类型为：${typeof a}`)
    console.log(`b = 'b' 的类型为：${typeof b}`)
    console.log(`c = new Object() 的类型为：${typeof c}`)
    console.log(`d = /hello/ 的类型为：${typeof d}`)
    console.log(`e = function () {} 的类型为：${typeof e}`)
    console.log(`f = undefined 的类型为：${typeof f}`)
    console.log(`g = null 的类型为：${typeof g}`)
    console.log(`h = [] 的类型为：${typeof h}`)
    console.log(`i = true 的类型为：${typeof i}`)
```

![judgeType](/styles/images/javascript/judgeType/jt-01.png)

## 二、instanceof

> * `instanceof` 主要用来判断引用类型属于哪一类
> * [demo](/effects/demo/js/judgeType/v2.html)

```js
  const reg = new RegExp()
  const array = []
  const obj = new Object()
  const fn = function () {}

  console.log(`reg instanceof RegExp: ${reg instanceof RegExp}`)
  console.log(`array instanceof Array:  ${array instanceof Array}`)
  console.log(`obj instanceof Object:  ${obj instanceof Object}`)
  console.log(`fn instanceof Function:  ${fn instanceof Function}`)
```

![judgeType](/styles/images/javascript/judgeType/jt-02.png)

## 三、Object.prototype.toString.call()

> * [demo](/effects/demo/js/judgeType/v3.html)

```js
  const a = 1
  const b = 'b'
  const c = new Object()
  const d = /hello/
  const e = function () {}
  const f = undefined
  const g = null
  const h = []
  const i = true

  console.log(`a = 1 的类型为：${Object.prototype.toString.call(a)}`)
  console.log(`b = 'b' 的类型为：${Object.prototype.toString.call(b)}`)
  console.log(`c = new Object() 的类型为：${Object.prototype.toString.call(c)}`)
  console.log(`d = /hello/ 的类型为：${Object.prototype.toString.call(d)}`)
  console.log(`e = function () {} 的类型为：${Object.prototype.toString.call(e)}`)
  console.log(`f = undefined 的类型为：${Object.prototype.toString.call(f)}`)
  console.log(`g = null 的类型为：${Object.prototype.toString.call(g)}`)
  console.log(`h = [] 的类型为：${Object.prototype.toString.call(h)}`)
  console.log(`i = true 的类型为：${Object.prototype.toString.call(i)}`)
```

![judgeType](/styles/images/javascript/judgeType/jt-03.png)