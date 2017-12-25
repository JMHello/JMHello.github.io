---
layout: post
title: "discrimination - 函数调用和new一个函数的区别"
data: 2017-12-23 14:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

<!-- more -->

> * 参考资料
>   * 《JavaScript高级程序设计（第3版）》 6.2 创建对象

## 一、 new操作符

### 1.1 定义

> * `new` 运算符：创建一个自定义对象 或 具有构造函数的内置对象的实例。

### 1.2 new操作符做了啥？

```js
function Person (name) {
    this.name = name
    // return this; // 隐式的返回this
}

const p1 = new Person('jm')
```

> * 上述代码通过 `new` 操作符创建了构造函数 `Person` 的一个实例，以这种方式调用构造函数实际上会经历以下 4个步骤
>   * 创建一个新对象；
>   * 将构造函数的作用域赋给新对象（因此 `this` 就指向了这个新对象） ；
>   * 执行构造函数中的代码（属性和方法被加入到 `this` 引用的对象中） ；
>   * 返回新对象【新创建的对象由 `this` 所引用，并且最后隐式的返回 `this`】。

---

> * 那么，`new` 操作符做了些什么事情呢？

```js
var p1  = {};
p1.__proto__ = Person.prototype;
Person.call(p1);
```

> 1. 创建了一个空对象 `p1`。
> 2. 将这个空对象的 `__proto__` 成员指向了 `Person` 函数对象 `prototype` 成员对象。
> 3. 将 `Person` 函数对象的 `this` 指针替换成 `p1` ，然后再调用 `Person` 函数。

## 二、函数调用和new一个函数的区别

### 2.1 构造函数无返回值

> * 点击打开[demo](/effects/demo/discrimination/newAndFnCall/v1.html)

```js
  function Person (name) {
    this.name = name
    return this.name
  }

  // 使用 new 操作符
  const p1 = new Person('jm')
  console.log(`使用 new 操作符：`) // 使用 new 操作符
  console.log(p1) // Person {name: "jm"}

  // 不适用 new 操作符
  const p2 = Person('jm')
  console.log(`不使用new操作符：`) // 不使用new操作符
  console.log(p2) // undefined
```

> * 从上面代码你可以看到：【我们应该留意到：构造函数 `Person` 里并没有任何返回值（即：`return xxx`）】
>   * 使用`new`操作符，返回一个对象：因为使用`new`创建实例，会隐式返回`this`，指代的是新的实例，所以这里返回的是一个对象
>   * 不使用`new`操作符，返回`undefined`：因为这只是普通的函数调用，既然没有返回值，那么默认就是返回`undefined`

### 2.2 返回值为基本类型

> * 点击打开[demo](/effects/demo/discrimination/newAndFnCall/v2.html)

```js
    function Person (name) {
        this.name = name
        return this.name
    }

    // 使用 new 操作符
    const p1 = new Person('jm')
    console.log(`使用 new 操作符：`) // 使用 new 操作符
    console.log(p1) // Person {name: "jm"}

    // 不适用 new 操作符
    const p2 = Person('jm')
    console.log(`不使用new操作符：`) // 不使用new操作符
    console.log(p2) // jm
```

> * 从上面代码你可以看到：
>   * 使用`new`操作符，返回一个对象
>   * 不使用`new`操作符，返回基本类型值

### 2.2 返回值为引用类型

> * 点击打开[demo](/effects/demo/discrimination/newAndFnCall/v3.html)

```js
    function Person (name) {
        this.name = name
        return []
    }

    // 使用 new 操作符
    const p1 = new Person('jm')
    console.log(`使用 new 操作符：`) // 使用 new 操作符
    console.log(p1) // []

    // 不适用 new 操作符
    const p2 = Person('jm')
    console.log(`不使用new操作符：`) // 不使用new操作符
    console.log(p2) // []
```

> * 从上面代码你可以看到：使用`new`操作符 和 不使用`new`操作符，都返回引用类型

### 2.3 返回值为new出来的对象

> * 点击打开[demo](/effects/demo/discrimination/newAndFnCall/v4.html)

```js
    function Person (name) {
        this.name = name
        return new String('你好')
    }

    // 使用 new 操作符
    const p1 = new Person('jm')
    console.log(`使用 new 操作符：`) // 使用 new 操作符
    console.log(p1) // String {0: "你", 1: "好", length: 2, [[PrimitiveValue]]: "你好"}

    // 不适用 new 操作符
    const p2 = Person('jm')
    console.log(`不使用new操作符：`) // 不使用new操作符
    console.log(p2) // String {0: "你", 1: "好", length: 2, [[PrimitiveValue]]: "你好"}
```

> * 如果函数的返回值为 `new` 出来的对象，那么`p1` 的值根据 `new` 出来的对象的 `prototype` 而定。

## 三、总结

> * `new` 一个函数：
>   * 等于创建了一个新实例，把`this`的指向搞掂，把对应的属性方法也添加上了；
>   * 并且在没有返回值的情况下，隐式返回了一个对象；
>   * 如果函数中有返回值，如果是基本类型，还是返回对象；如果是引用类型，则返回对应的类型的对象。

> * 直接函数调用（即：不使用`new`操作符）：
>   * 就单纯是函数调用，没有搞那么多事情，并且没有返回值，就返回`undefined`，有返回值，就返回它。

