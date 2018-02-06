---
layout: post
title: "discrimination - __proto__ 和 prototype 的区别"
data: 2018-01-25 14:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

<!-- more -->

> * 参考资料
>   * [https://www.zhihu.com/question/34183746](https://www.zhihu.com/question/34183746)

## 一、二者定义

> * `prototype`：显式原型(`explicit prototype`)
>   * 每一个函数在创建之后都会有`prototype`这个属性，这个属性指向函数的原型对象。
>   * 通过 `Function.prototype.bind` 方法构造出来的函数是个例外，它没有 `prototype` 属性。

> * `__proto__`：隐式原型(`implicit prototype`)
>   * `js` 中任意一个对象都有一个内置属性`[[prototype]]`，在 `ES5` 之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过 `__proto__` 来访问
>   * `Object.prototype` 这个对象是个例外，它的` __proto__ `值为 `null`

## 二、二者关系

> * 二者关系：**隐式原型指向创建这个对象的函数(`constructor`)的`prototype`**

## 三、作用

> * 显式原型的作用：用来实现基于原型的继承与属性的共享。
> * 隐式原型的作用：构成原型链，同样用于实现基于原型的继承。

## 四、__proto__的指向

### 4.1 基础理解

> * 上面说到：隐式原型(`__proto__`)指向创建这个对象的函数(`constructor`)的`prototype`
> * `js`中创建对象有三种方式：
>   1. 对象字面量
>   2. `new` 的方式
>   3. `Object.create()`

> * 三种方式的本质都是通过`new`来创建对象。
>   * 字面量只是一个语法糖，便于开发者更方便创建对象，为对象添加属性、方法。
>   * 而 `Object.create()`，可先看下面的代码（就是`Object.create()`的实现）：

```js
function inherit (obj) {
    const F = function () {}
    F.prototype = obj
    return new F()
}
```

> * 由上述代码，看出`inherit`函数最终还不是通过`new`返回一个对象。接着上面的代码，再看一下以下的输出结果：
> * [demo](/effects/demo/discrimination/protoAndPrototype/v2.html)

```js
function Blue () {}
console.log(inherit({}))
console.log(new Blue())
```

![image](/styles/images/discrimination/prototype/p-01.png)

> * 从图中发现：通过`inherit`，即`Object.create()`所创建的对象是没有构造函数（`constructor`）的。

> * 或许你会有一个疑问，既然没有构造函数，那么其`__proto__`指向哪里？其实这里说它没有构造函数是指在 `Object.create()`  函数外部我们不能访问到它的构造函数，然而在函数内部实现中是有的，它短暂地存在了那么一会儿（即：当 `new F ()` 时，其内部的 构造函数 `F` 就会被销毁了）。假设我们现在就在函数内部:

```js
// 伪代码如下：

const f = new F ()

// 有
f.__proto__ === F.prototype // true

// 又因为
F.prototype === obj // true

// 所以
f.__proto__ === obj // true
```
### 4.2 __proto__ 的指向

```js
  function Fun () {}
  const fun = new Fun()

  // fun 的 __proto__ 指向其构造函数 Fun 的 prototype
  console.log(fun.__proto__ === Fun.prototype) // true

  // Fun 的 __proto__ 指向其构造函数 Function 的 prototype
  console.log(Fun.__proto__ == Function.prototype) // true

  // Function 的 __proto__ 指向其构造函数 Function 的 prototype 【 构造函数自身是一个函数，他是被自身构造的】
  console.log(Function.__proto__ === Function.prototype) // true

  // Function.prototype 的 __proto__ 指向其构造函数 Object 的 prototype
  // Function.prototype 是一个对象,它有自己的构造函数 Object
  console.log(Function.prototype.__proto__ === Object.prototype) // true

  // Object.prototype这个对象是个例外，它的 __proto__ 值为 null
  console.log(Object.prototype.__proto__===null) // true
  console.log(Object.prototype) // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
  console.log(Object.prototype.__proto__) // null

  console.log(Function.prototype === Object.__proto__) // true
  console.dir(Function.prototype)
  console.dir(Object.__proto__)

  console.log(new Array().__proto__) // [constructor: ƒ, concat: ƒ, pop: ƒ, push: ƒ, shift: ƒ, …]
  console.log(new Array().__proto__ === Array.prototype) // true
```

> * 分别输出：`Function.prototype` ,`Object.__proto__`，结果如下

![image](/styles/images/discrimination/prototype/p-02.png)

## 4.3 再来一个demo

> * [demo](/effects/demo/discrimination/protoAndPrototype/v4.html)

```js
 function Person (name) {
  this.name = name
}
Person.prototype.run = function () {
  console.log(`run`)
}

const p1 = new Person('jm')
console.log(p1)

console.dir(Person)
```

![image](/styles/images/discrimination/prototype/p-05.png)

> * 标识为1的 `__proto__`：指代的就是 `Person.prototype`
> * 标识为2的 `prototype`：就是`Person.prototype`
> * 标识为3的 `__proto__`：指代的是 `Function` 这个原生构造函数  

> * 从图中也证实了：每个对象都有一个隐式原型 `__proto__`，而只有函数才有`prototype`

## 五、总结

> * 想知道 `xxx.__proto__` 究竟指向什么
> * 1.我们必须谨记 ****隐式原型（`__prototype`）指向创建这个对象的函数(`constructor`)的`prototype`****
> * 2.我们忽略`__proto__`，直接把目光聚焦在`xxx`身上
>   * 如果`xxx`是一个数组，那么创建这个对象的`constructor`就是`Array`，所以 `new Array().__proto__ === Array.prototype`
>   * 如果`xxx`是一个对象，那么创建这个对象的`constructor`有可能是`Function` 或者 `Object`，因此，这里需视情况而言
> * 3.记住那些特别的例子：
>   * `Object.prototype.__proto__===null`
>   * 通过 `Function.prototype.bind` 方法构造出来的函数是个例外，它没有 `prototype` 属性。






