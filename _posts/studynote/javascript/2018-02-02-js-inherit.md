---
layout: post
title: "javascript - 继承 "
data: 2018-02-02 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 6.3 继承

<!-- more -->

## 一、继承

> * 继承：就是可以使子类具有父类的属性和方法，而不需要重复编写相同的代码

## 二、原型链继承

### 2.1 实现

![inherit](/styles/images/javascript/inherit/inherit-01.png)

> * 从上图可知：
>   * 原型链继承：就是利用原型让一个引用类型继承另一个引用类型的属性和方法

> * 基本过程：
>   * 子类寻找属性和方法的途径是：如果实例中找不到属性和方法，就会往原型去寻找
>   * 对于父类来说，其实例既有了父类实例的属性和方法，也有父类原型对象上的属性和方法
>   * 为了实现子类继承父类属性和方法的目的，我们就将子类的原型(`prototype`) 和父类的实例联系起来，这样就可以达到目的了！

> * [demo](/effects/demo/js/inherit/v1.html)

```js
 // 父类构造函数
    function Plane (color) {
      this.color = color
    }
    Plane.prototype.fly = function () {
      console.log('flying')
    }

    // Fighter 构造函数
    function Fighter () {
      this.bullets = []
    }

    // 打通原型链，实现继承
    Fighter.prototype = new Plane('blue')

    // 特有方法
    Fighter.prototype.shoot = function () {
      console.log('shooting');
    }

    // 检测
    const fighter1 = new Fighter()
    // 继承的属性
    console.log(fighter1.color) // blue
    // 继承的方法
    fighter1.fly() //flying
    // 自身特有的方法
    fighter1.shoot() // shooting
```
> * 将上面代码的继承过程转化为下图：

![inherit](/styles/images/javascript/inherit/inherit-02.png)

### 2.2 缺点

> * `constructor` 的指向问题

> * [demo](/effects/demo/js/inherit/v1.html)

```js
console.log(`--- test constructor ---`)
console.log(fighter1.constructor === Plane) //true
```
> * 将上面代码的继承过程转化为下图：

![inherit](/styles/images/javascript/inherit/inherit-03.png)

> * 很奇怪，`fighter1` 不是 `Fighter` 的实例，为什么其`constructor` 却是 `Plane`！

> * 解决方法：手动修改 ` Fighter.prototype.constructor = Fighter`
> * [demo](/effects/demo/js/inherit/v2.html)

```js
    // 父类构造函数
    function Plane (color) {
      this.color = color
    }
    Plane.prototype.fly = function () {
      console.log('flying')
    }

    // Fighter 构造函数
    function Fighter () {
      this.bullets = []
    }

    // 打通原型链，实现继承
    Fighter.prototype = new Plane('blue')

    // 修改 Fighter 的 constructor 属性
    Fighter.prototype.constructor = Fighter

    // 特有方法
    Fighter.prototype.shoot = function () {
      console.log('shooting');
    }

    // 检测
    const fighter1 = new Fighter()

    console.log(`--- test constructor ---`)
    console.log(fighter1.constructor === Plane) // false
    console.log(fighter1.constructor === Fighter) // true
```

---

> * 共享问题：引用类型惹的祸！这个就不详细去说了
> * 参数：`Fighter` 也有自己的 `color`，但是却无法传参！

## 三、借用构造函数继承

> * 借用构造函数继承：基于函数可以指定其执行环境而实现的，即 `Plane.call(this)`

> * [demo](/effects/demo/js/inherit/v3.html)

```js
    // 父类构造函数
    function Plane (color) {
      this.color = color
      this.sayName = function () {}
    }
    Plane.prototype.fly = function () {
      console.log('flying')
    }

    // Fighter 构造函数
    function Fighter (color) {
      // 基于函数可以指定其执行环境而实现的
      Plane.call(this, color)
      this.bullets = []
    }

    // 特有方法
    Fighter.prototype.shoot = function () {
      console.log('shooting');
    }

    // 检测
    const fighter1 = new Fighter('blue')
    console.log(fighter1)
```

> * 输出 `fighter1`

![inherit](/styles/images/javascript/inherit/inherit-04.png)

> * 从图中可以看出：
>   * 借用构造函数的继承：解决了原型链继承的`constructor`问题、参数问题
>   * 却存在一个巨大的问题：无法继承父类原型上的任何属性和方法！

## 四、组合继承

### 4.1 实现

> * [demo](/effects/demo/js/inherit/v4.html)

```js
 // 父类构造函数
    function Plane (color) {
      this.color = color
    }

    Plane.prototype.fly = function () {
      console.log('flying')
    }

    // Fighter 构造函数
    function Fighter (color) {
      Plane.call(this, color)
      this.bullets = []
    }

    Fighter.prototype = new Plane()
    Fighter.prototype.constructor = Fighter

    // 特有方法
    Fighter.prototype.shoot = function () {
      console.log('shooting');
    }

    // 检测
    const fighter1 = new Fighter('blue')
    console.log(fighter1)
    console.log(fighter1.color) // blue
    fighter1.fly() // flying
    fighter1.shoot() // shooting
```

> * 输出 `fighter1`

![inherit](/styles/images/javascript/inherit/inherit-05.png)

### 4.2 组合继承是三部曲

>   * 有基础构造函数（父类）
>   * 借用构造函数继承实例属性
>   * 继承原型属性和方法

---

> * 属性和方法都是从父类继承的 ---- 代码复用
> * 继承的属性是私有的 ---- 互补影响
> * 继承的方法都在原型里 ---- 函数复用

### 4.3 缺点

> * 直接看下图：

![inherit](/styles/images/javascript/inherit/inherit-06.png)

> * 缺点一：我们调用了两次构造函数 `Plane`，这是极大浪费 ====》 **重复调用**
> * 缺点二：我们用的是`fighter`实例下的`color`属性，而其父类实例的`color`属性就显得有点多余了！ ====》**复杂冗余**
>   * 一个`color`属性在`Fighter` 实例上，另外一个属性在 `Fighter` 的原型中


## 五、寄生组合式继承

### 5.1 实现

![inherit](/styles/images/javascript/inherit/inherit-07.png)

> * 组合继承，我们是通过 `Fighter.prototype = new Plane()` 继承，其实我们可以不用调用多一次 `Plane`就可以实现继承
> * 简单来说，寄生组合式继承就是基于组合继承，不必重复调用父类构造函数，只需继承原型

> * 关键代码：

```js
function inheritPrototype (subType, superType) {
  const prototype = Object.create(superType.prototype) // 复制父类原型
  prototype.constructor = subType // 重置constructor
  subType.prototype = prototype // 修改子类原型
}
````

> * [demo](/effects/demo/js/inherit/v5.html)

```js
  // 父类构造函数
    function Plane (color) {
      this.color = color
    }

    Plane.prototype.fly = function () {
      console.log('flying')
    }

    // Fighter 构造函数
    function Fighter (color) {
      // 借用构造函数
      Plane.call(this, color)
      this.bullets = []
    }

    // 继承原型
    inheritPrototype(Fighter, Plane)

    // 特有方法
    Fighter.prototype.shoot = function () {
      console.log('shooting');
    }

    // 检测
    const fighter1 = new Fighter('blue')
    console.log(fighter1)
    console.log(fighter1.color) // blue
    fighter1.fly() // flying
    fighter1.shoot() // shooting
```

> * 输出 `fighter1`

![inherit](/styles/images/javascript/inherit/inherit-08.png)

> * 只有一个`color`属性，只调用了一次`Plane`

### 5.2 总结

> * `Plane.call(this, color)`：继承了属性
> * `inheritPrototype(Fighter, Plane)`：继承了方法





