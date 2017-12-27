---
layout: post
title: "javasript - 设计模式 - 工厂模式"
data: 2017-12-27 12:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 装饰器模式]({{ '/2017/09/15/js-decorator-pattern' | prepend: site.baseurl }})
    


<!-- more -->

## 一、简单工厂模式

### 1.1 介绍

> * 简单工厂模式(`Simple Factory`)：也叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例。【**主要用来创建同一类对象**】

### 1.2 例子

> * 先看下述代码：【[demo](/effects/demo/designPatterns/factory/simpleFactory/v1.html)】

```js
  /**
   * 警示框类
   * @param text
   * @constructor
   */
    const LoginAlert = function (text) {
      this.context = text
    }

    LoginAlert.prototype.show = function () {
      // 显示警示框
    }

   /**
   * 确认框类
   * @param text
   * @constructor
   */
    const LoginConfirm = function (text) {
      this.context = text
    }

    LoginConfirm.prototype.show = function () {
      // 显示确认框
    }

   /**
   * 提示框类
   * @param text
   * @constructor
   */
    const LoginPrompt = function (text) {
      this.context = text
    }

    LoginPrompt.prototype.show = function () {
      // 显示提示框框
    }
```

> * 大家会发现，这上面的类太多了，而且还是以`Login`为前缀，如果在注册模块也想用上述的代码，那么`Login`前缀就会显得怪怪的。
> * 除此之外，在每次创建时还要找到对应的类，实在太麻烦了！那么该如何解决呢？
> * 请看以下代码：【[demo](/effects/demo/designPatterns/factory/simpleFactory/v2.html)】

```js
/**
   * 简单工厂函数 - 自定义提示框 - 任意选择你想要的“框”
   * @param name
   * @param text
   * @returns {*}
   * @constructor
   */
    const PopFactory = function (name, text) {
      switch (name) {
        case 'alert':
          return new LoginAlert(text)
        case 'confirm':
          return new LoginConfirm(text)
        case 'prompt':
          return new LoginPrompt(text)
      }
    }
```

> * 上述代码体现了对不同类的实例化：你想要使用哪一种框，就将其类型名传进去上述函数就可了，就不用记着如此多复杂的东西。

### 1.3 相同地方抽取出来

> * 仔细一看，你会发现上述代码中有许多地方是一样的，例如：都有`show`方法和`text`，那么，就可以将他们抽取出来共用。
> * 【[demo](/effects/demo/designPatterns/factory/simpleFactory/v3.html)】

```js
 function createPop (type, text) {
      // 创建一个对象，并对对象拓展属性和方法
      const obj = new Object()
      obj.content = text
      // 显示方法
      obj.show = function () {}

      if (type === 'alert') {
        // 警示框差异部分
      }
      if (type === 'confirm') {
        // 确认框差异部分
      }
      if (type === 'prompt') {
        // 提示框差异部分
      }

      return obj
    }

    const userAlert = createPop('alert', '用户名只能是字母')
```

### 1.4 区别

> * `1.2` 的简单工厂模式：是通过类实例化对象创建。
> * `1.3` 的简单工厂模式：通过创建一个新对象然后包装增强其属性和功能实现。

> * 通过类创建的对象，如果这些类继承同一父类，那么他们的父类原型上的方法是可以共用

## 二、工厂方法模式

### 2.1 介绍

> * 工厂方法模式（`Factory Method`）：通过对 产品类的抽象 使其创建业务主要 负责用于创建多类产品的实例。

### 2.2 例子

> * 开始做广告咯！
>   * 第一批：`Java`，绿色字体
>   * 第二批：`PHP`，黄色字体，红色背景
>   * 第三批：`JavaScript`，粉色背景

> * 按照简单工厂模式，我们会按以下实现：【[demo](/effects/demo/designPatterns/factory/factoryMethod/v1.html)】

```js
    const Java = function (content) {}
    const Php = function (content) {}
    const JavaScrpt = function (content) {}
    
    // 工厂函数
    function JobFactory (type, content) {
      switch (type){
        case 'java':
          return new Java()
        // ,,,
      }
    }
```

---

> * 突然又来多了第四批：`UI`科学，红色边框，那岂不是又要做多两样东西：新建多一个类，修改工厂函数。
> * 每次多一批广告，都要做多两步，积少成多，那岂不是很耗时！因此，我们可以使用工厂方法模式！
【[demo](/effects/demo/designPatterns/factory/factoryMethod/v2.html)】

```js
 // 安全模式创建的工厂类
    const Factory = function (type, content) {
      // 安全模式类： 在构造函数开始时先判断当前对象this指代是不是类Factory
      // 如果是，则通过 new 关键字创建对象（这里是指Java、php）；
      // 如果不是，说明类在全局作用域中执行，所以this指向window，因此就需要返回Factory的实例
      if (this instanceof Factory) {
        console.log(this instanceof Factory)
        const s = new this[type](content)
        return s
      } else {
        console.log(this instanceof Factory)
        return new Factory(type, content)
      }
    }

    // 工厂原型中设置创建所有类型数据对象的基类
    Factory.prototype = {
      Java: function (content) {
        // ...
      },
      JavaScript: function (content) {
        // ...
      },
      php: function (content) {
        // ...
      },
      UI: function (content) {
        // ...
      }
    }

    
    const data = [
      {
        type: 'Java',
        content: 'Java'
      },
      {
        type: 'php',
        content: 'php'
      },{
        type: 'JavaScript',
        content: 'JavaScript'
      }
      // ...
    ]
    
    for (let item of data) {
      Factory(item.type, item.content)
    }
```

> * 输出`Factory`，如下图：

![factory](/styles/images/javascript/designPattern/factory/factory-01.png) 

## 三、抽象工厂模式

### 3.1 介绍

> * 抽象工厂模式（`Abstract Factory`）：通过对 类的工厂抽象 使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例。

---


### 3.2 抽象类

> * 抽象类：`Java`中的抽象类是一种声明但不能使用的类，当你使用时就会报错。
> * 显然`JavaScript`是没有这抽象类，但我们可以手动抛出错误来模拟抽象类。

> * [demo](/effects/demo/designPatterns/factory/abstractFactory/v1.html)

```js
    const Car = function () {}
    Car.prototype = {
      constructor: Car,
      getPrice: function () {
        return new Error('抽象方法不能调用')
      },
      getSpeed: function () {
        return new Error('抽象方法不能调用')
      }
    }

    console.log(new Car().getPrice()) // 抽象方法不能调用
```

### 3.3 抽象工厂模式实例

> * 抽象工厂模式，在`JavaScript`中一般不会用来创建具体对象，原因如下：
>   * 抽象类中定义的方法只是显性地定义一些功能，但没有具体的实现；
>   * 而一个对象是要具有一套完整的功能
>   * 所以用抽象类创建的对象当然也是“抽象”，所以我们不能使用它来创建一个真实的对象

> * [demo](/effects/demo/designPatterns/factory/abstractFactory/v2.html)

```js
  /**
   * 抽象工厂方法
   * @param subType
   * @param superType
   * @constructor
   */
   const VehicleFactory = function (subType, superType) {
     // 判断抽象工厂中是否有该抽象类
     if (Object.prototype.toString.call(VehicleFactory[superType]) === '[object Function]') {
       // 缓存类
       function F () {}
       // 继承父类属性和方法
       F.prototype = new VehicleFactory[superType]()
       // 将子类constructor指向子类
       subType.constructor = subType
       // 子类原型继承父类
       subType.prototype = new F()
     } else {
       // 不存在该抽象类抛出错误
       throw new Error('未创建该抽象类')
     }
   }

  /**
   * 小汽车抽象类
   * @constructor
   */
   VehicleFactory.Car = function () {
     this.type = 'car'
   }
   VehicleFactory.Car.prototype = {
     getPrice: function () {
       return new Error('抽象方法不能调用')
     },
     getSpeed: function () {
       return new Error('抽象方法不能调用')
     }
   }

  /**
   * 汽车子类：宝马
   * @param price
   * @param speed
   * @constructor
   */
   const BMW = function (price, speed) {
     this.price = price
     this.speed = speed
   }
   VehicleFactory(BMW, 'Car')
   BMW.prototype.getPrice = function () {
     return this.price
   }
//  BMW.prototype.getSpeed = function () {
//    return this.speed
//  }

  const bmw = new BMW(12, 2)
  console.log(bmw.getPrice()) // 12
  console.log(bmw.getSpeed()) // 抽象方法不能调用
```

## 四、总结

> * 简单工厂模式：适用于创建少类对象
> * 工厂方法模式：适用于创建多类对象，同时也避免了使用者与对象类之间的耦合，用户不必关心创建该对象的具体类，只需要调用工厂方法即可。
>   * 这里需提醒一下：避免因错误调用，让`this`对象变为全局对象，这里就需用到**安全模式创建的工厂对象**。
> * 抽象工厂模式：创建出来的结果不是一个真实的对象实例，而是一个类簇，它制定了类的结构。