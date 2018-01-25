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
>   * [http://blog.csdn.net/blueblueskyhua/article/details/73135938](http://blog.csdn.net/blueblueskyhua/article/details/73135938)

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

> * 从上述图片可以看出：`b1.__proto__` 是一个对象 `Base {}`，`b2__proto__` 是一个函数 `f ()`。
> * 这里提出一个疑问：为什么 `b2.__proto__` 不是 `Base{}`？

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

console.log(b1) // Base {a: 1}
console.log(b2) // Function {}

console.log(`b1.a = ${b1.a}, b1.b = ${b1.b}`) // b1.a = 1, b1.b = 2
console.log(`b2.a = ${b2.a}, b2.b = ${b2.b}`) // b2.a = undefined, b2.b = undefined

console.log(b2.__proto__ === Base) // true
console.dir(b2.prototype === Base.prototype) // true
```

> * 输出结果如下：

![image](/styles/images/discrimination/objectAndNew/on-02.png)

> * 从图中你会发现，属性 `a` 只存在于`b1`中，而属性`b`存在于`b1`的`__proto__`对象中以及其`constructor`的`prototype`对象中，但是，
>   对于`b2`来说，`b2`只存在于`constructor`的`prototype`对象中。
> * 请看下图：

![image](/styles/images/discrimination/objectAndNew/on-03.png)

![image](/styles/images/discrimination/objectAndNew/on-04.png)

---

> * 先回答这个问题：为什么 `b2.__proto__` 不是 `Base{}`？
>   * 可从图中看到，`Object.create` 最终返回的是 `new F ()`，根据 [discrimination - __proto__ 和 prototype 的区别](http://www.jmazm.com/2018/01/25/discrimination-prototype/)里面所讲到的规则，
>       `b2.__proto__` 的指向规则是基于创建其的构造函数，因此，其值肯定是 `f ()` 非 `Base {}`

---

> * 为什么 `b2` 不能获取到 `b` 的值？

> * 先看：`b2.__proto__ === Base` 为`true` 的原因是：
>   * 因为 `b2.__proto__ = F.prototype` 
>   * 又因为 `F.prototype = Base`
>   * 所以 `b2.__proto__ = Base`

> * 从图中可知道，通过 `Object.create` 构造的 `b2` 没有指向 `Base` 的 `prototype`，而是直接执行`Base` 【即：`b2.__proto__ = Base` 而不是 `b2.__proto__ = Base.prototype`】,
>   所以在`Base.prototype`上定义的`b`，只单纯是`Base.prototype`上的一个属性。








