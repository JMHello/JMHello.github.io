---
layout: post
title: "javascript - 创建对象 "
data: 2018-02-02 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 6.2 创建对象 

<!-- more -->


## 一、工厂模式

> * [demo](/effects/demo/js/createObject/v1.html)

```js
function createPerson (name, age) {
  return {
    name: name,
    age: age
  }
}

const p1 = createPerson('jm', 20)
console.log(p1 instanceof createPerson) // false
console.log(p1 instanceof Object) // true
```

> * 工厂模式就是不管内部实现是怎么样的，直接将一些变量、方法作为一个对象的属性直接返回出去。
> * 缺陷：没有解决对象识别的问题
>   * 即：从上述例子，我们无法判断`p1`是一个`Person`

## 二、构造函数模式

> * [demo](/effects/demo/js/createObject/v2.html)

```js
function Person (name, age) {
  this.name = name
  this.age = age
  this.sayName = () => {
    return this.name
  }
}

const p1 = new Person('jm', 20)
const p2 = new Person('li', 20)

console.log(p1 instanceof Person) // true
console.log(p1.sayName === p2.sayName) // false
```

> * 与工厂模式创建对象作比较，构造函数创建对象的不同在于：
>   * 没有显式创建对象
>   * 将属性和方法都赋值给了`this`
>   * 没有`return`语句

> * 看到这里，大家或许会疑惑，没有这没有那，那么构造函数究竟如何创建对象？
> * 其秘密在于 `new` 操作符 【 [new操作符的原理](http://www.jmazm.com/2017/12/25/discrimination-new-and-function-call/)】
>   * (1) 创建一个新对象；
>   * (2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
>   * (3) 执行构造函数中的代码（为这个新对象添加属性）；
>   * (4) 返回新对象。

> * 构造函数创建对象的缺陷：**功能相同的函数，重复声明消耗空间**
>   * 因为，`ECMAScript` 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。
>   * 即：`console.log(p1.sayName === p2.sayName) // false`
>   * 对于 `p1` 和 `p2` 来说，`sayName` 方法除了返回的值不一样，其效果是一样的，因此我们并不需要两个不同的实例，只需要一个实例即可。
>   * 简单来说，`console.log(p1.sayName === p2.sayName) // true`

---

> * 解决方法：[demo](/effects/demo/js/createObject/v3.html)

```js
    function Person (name, age) {
      this.name = name
      this.age = age
      this.sayName = sayName
    }

    function sayName () {
      return this.name
    }
    const p1 = new Person('jm', 20)
    const p2 = new Person('li', 20)
    console.log(p1 instanceof Person) // true
    console.log(p1.sayName === p2.sayName) // true
```

> * 不过这个方法也存在着问题：
>   * 在全局作用域中定义的函数实际上只能被某个对象调用，这个不现实
>   * 如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了

## 三、原型模式

### 3.1 实例

> * [demo](/effects/demo/js/createObject/v4.html)

```js
    function Person () {}

    Person.prototype.sayName = function () {
      return this.name
    }
    const p1 = new Person()
    const p2 = new Person()

    console.log(p1 instanceof Person) // true
    console.log(p1.sayName === p2.sayName) // true
```

> * 原型模式解决了构造函数的问题!

### 3.2 原型（prototype）

> * 原型(`prototype`)：是**函数**的一个属性，也是一个对象。
>   * 即：只要创建一个新函数，就会按照一定规则为这个函数创建`prototype`属性。
>   * 用途：包含可以由特定类型的所有实例共享的属性和方法

### 3.3 constructor 属性

> * `constructor` 属性：包含一个指向 `prototype` 属性所在函数的指针。
>   * `Person.prototype.constructor` 指向 `Person`
>   * 或者：`p1` 的 `__proto__` 的 `constructor` 指向 `Person`
 
> * [demo](/effects/demo/js/createObject/v5.html)

```js
function Person () {}

Person.prototype.sayName = function () {
return this.name
}
const p1 = new Person()
const p2 = new Person()


console.dir(Person)
console.log(p1)

console.log(`--- test constructor ---`)
console.log(p1.constructor === Person) //true
console.log(p1.constructor == p2.constructor) // true
```

> * `Person` 和 `p1`

![image](/styles/images/javascript/createObject/cO-01.png)

> * 上图转化为下图：

![image](/styles/images/javascript/createObject/cO-02.png)

### 3.4 prototypeObj.isPrototypeOf(object)

> * `prototypeObj.isPrototypeOf(object)`：测试一个对象是否存在于另一个对象的原型链上。

> * [demo](/effects/demo/js/createObject/v5.html)

```js
console.log(Person.prototype.isPrototypeOf(p1)) // true
````

### 3.5 Object.getPrototypeOf(obj)

> * `Object.getPrototypeOf(obj)`：获取某个对象的原型对象
>   * 支持浏览器：IE9+、Firefox 3.5+、Safari 5+、Opera 12+和 Chrome。

> * [demo](/effects/demo/js/createObject/v5.html)

```js
console.log(Object.getPrototypeOf(p1) === Person.prototype) // true
```

### 3.6 原型模式存在的问题

> * 原型模式存在的问题：
>   * 1.共享问题
>       * 其对基本类型没任何影响，但是对引用类型却有着极大影响！
>   * 2.无法传递参数

> * [demo](/effects/demo/js/createObject/v6.html)

```js
    function Person () {}

    Person.prototype.hobby = ['swimming', 'running']
    const p1 = new Person()

    console.log(p1.hobby) // ["swimming", "running"]

    let copyHobby = p1.hobby
    copyHobby.push('eating')
    console.log(p1.hobby) // ["swimming", "running", "eating"]
```

### 3.7 总结

> * 原型模式关键在于共享！
>   * 如果函数作为构造函数去使用，那么这个构造函数的所有实例，就会共享这个原型对象。

## 四、构造函数结合原型

> * 这才是完美的创建对象的方法！

> * [demo](/effects/demo/js/createObject/v7.html)

```js
  function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
  }
  Person.prototype = {
    constructor : Person,
    sayName : function(){
      return this.name
    }
  }
  
  var person1 = new Person("Nicholas", 29, "Software Engineer");
  var person2 = new Person("Greg", 27, "Doctor");
  person1.friends.push("Van");
  
  console.log(person1.friends); //"Shelby,Count,Van"
  console.log(person2.friends); //"Shelby,Count"
  console.log(person1.friends === person2.friends); //false
  console.log(person1.sayName === person2.sayName); //true 
```


