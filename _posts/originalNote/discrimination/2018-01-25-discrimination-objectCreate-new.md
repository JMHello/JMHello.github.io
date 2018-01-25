---
layout: post
title: "discrimination -  Object.create()和new一个新对象的区别"
data: 2018-01-25 15:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

<!-- more -->

> * 参考资料
>   * [https://www.zhihu.com/question/34183746](https://www.zhihu.com/question/34183746)

## 区别

> * [demo](/effects/demo/discrimination/ObjectCreateAndNew/v1.html)

```js
const Base = function () {}
const b1 = new Base()
const b2 = Object.create(Base)
console.log(b1)
console.log(b2)
```

> * 输出结果如下：

![image](/styles/images/discrimination/objectAndNew/on-01.png)

> * `Object.create()` 和 `new` 一个新对象的究竟有什么区别？

---

> * `Object.create(prototype, descriptors)`，用原生`js`实现的代码如下：

```js
Object.create = function (obj) {
    const F = function () {}
    F.prototype = obj
    return new F()
}
```

> * 上述代码做了以下这些事情：
>   * 新建一个空函数（什么都不干）
>   * 将对象`obj`赋值给空函数`F`的原型对象`prototype`
>   * 最终返回一个新对象

---

> * 接下来,说一说 `const b1 = new Base()`都干了些什么！
>   * 首先，创建了一个`Object`对象`b1`
>   * 接着，让 `b1` 的 `__proto__` 指向了 `Base.prototype` 对象
>   * 最后，调用 `call` 强行转换作用环境

```js
const b1 = new Object()
b1.[[Prototype]] = Base.prototype
// 或 b1.__proto__ = Base.prototype
Base.call(b1)
```

---

> * 接着再看下面的代码 
> * [demo](/effects/demo/discrimination/ObjectCreateAndNew/v2.html)

```js
const Base = function () {
  this.a = 1
}

Base.prototype.b = 2

const b1 = new Base()
const b2 = Object.create(Base)

console.log(b1)
console.log(b2)

console.log(`b1.a = ${b1.a}, b1.b = ${b1.b}`)
console.log(`b2.a = ${b2.a}, b2.b = ${b2.b}`)
```

> * 输出结果如下：

![image](/styles/images/discrimination/objectAndNew/on-02.png)

> * 从图中你会发现，属性 `a` 只存在于`b1`中，而属性`b`存在于`b1`的`__proto__`对象中以及其`constructor`的`prototype`对象中，但是，
>   对于`b2`来说，`b`只存在于`constructor`的`prototype`对象中。

> * 到了这里，我




