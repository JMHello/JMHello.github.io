---
layout: post
title: "javasript - 设计模式 - 装饰器模式"
data: 2017-09-14 12:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    
* 以下内容部分都摘自书本：《JavaScript设计模式与开发实践》 第十五章 装饰者模式

<!-- more -->

## 一、什么是装饰者模式


### 1.1 继承的的缺点

* 给对象添加功能常常使用继承的方式，但是继承的方式并不灵活，还会带来许多问题：
    1. 导致超类和子类之间存在**强耦合性**，当超类改变时，子类也会随之改变。
    2. 继承这种功能复用方式通常被称为“白箱复用”，“白箱”是相对可见性而言的，
    在继承方式中，超类的内部细节是对子类可见的，继承常常被认为**破坏了封装性**。
    3. 在完成一些功能复用的同时，有可能创建出大量的子类，**使子类的数量呈爆炸性增长**。

### 1.2 装饰者模式

* 装饰者模式（`Decorator Pattern`）：可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
    * 简单地理解：装饰者模式要比继承灵活得多，想添加什么新功能就添加，同时又不会影响对象自身。

## 二、装饰者模式的实例

### 2.1 模拟传统面向对象语言的装饰者模式

```js
// 原始的飞机类：
var Plane = function(){}
Plane.prototype.fire = function(){
 console.log( '发射普通子弹' );
}
// 增加装饰类：原子弹
var MissileDecorator = function( plane ){
 this.plane = plane;
}
MissileDecorator.prototype.fire = function(){
 this.plane.fire();
 console.log( '发射导弹' );
}

// 增加装饰类：原子弹
var AtomDecorator = function( plane ){
 this.plane = plane;
}
AtomDecorator.prototype.fire = function(){
 this.plane.fire();
 console.log( '发射原子弹' );
} 

// 测试
var plane = new Plane();
plane = new MissileDecorator( plane );
plane = new AtomDecorator( plane );
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹
```

* 新增的装饰类：导弹和原子弹都接收参数`plane`对象，并调用了`plane.fire()`，而且没有改动“飞机”这个对象原有的任何方面。
    * 这就体现了装饰者模式的实际功能：对对象动态增加功能，却没有改变对象本身。

### 2.2 回到 JavaScript 的装饰者
* JavaScript 语言动态改变对象相当容易，我们可以直接改写对象或者对象的某个方法，并不需要使用“类”来实现装饰者模式。
  
```js
var plane = {
 fire: function(){
 console.log( '发射普通子弹' );
 }
}

var missileDecorator = function(){
 console.log( '发射导弹' );
}

var atomDecorator = function(){
 console.log( '发射原子弹' );
}

var fire1 = plane.fire;
plane.fire = function(){
 fire1();
 missileDecorator();
}

var fire2 = plane.fire;
plane.fire = function(){
 fire2();
 atomDecorator();
}

plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹
```

## 三、装饰函数

```js
window.onload = function(){
 alert (1);
}

var _onload = window.onload || function(){};

window.onload = function(){
    _onload();
    alert (2);
} 
```

* 以上代码存在的问题：
    1. 必须维护`_onload` 这个中间变量，虽然看起来并不起眼，但如果函数的装饰链较长，或者
       需要装饰的函数变多，这些中间变量的数量也会越来越多。
    2. `this`的指向问题 

下面再看看这个例子：

```js
var _getElementById = document.getElementById;

document.getElementById = function( id ){
    alert (1);
    
    return _getElementById( id ); //  Uncaught TypeError: Illegal invocation 
    
    // 正确的写法
    // return  _getElementById.apply(document, arguments);
}

var button = document.getElementById( 'button' ); 
```

很明显，由于`_getElementById`是全局函数，当调用它的时候，`this`指向的是`window`，但我们期望的是`this`指向的是`document`。

## 四、AOP

* `AOP`：面向切面编程，主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，再通过“动态织入”的方式掺入业务逻辑模块中。
    * 与业务逻辑无关的功能：日志统计、安全控制、异常处理
* 优点：保持业务逻辑模块的纯净和高内聚性，并且方便地复用日志统计等功能模块。

### 4.1 before（前置通知）

```js
Function.prototype.before = function( beforefn ){
    var __self = this; // 保存原函数的引用
    
    return function(){ // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，修正 this
        
        return __self.apply( this, arguments ); // 执行原函数
    }
}; 
```

### 4.2 after（后置通知）

```js
Function.prototype.after = function( afterfn ){
    var __self = this; // 保存原函数的引用
    
    return function(){
        var ret = __self.apply( this, arguments ); // 保存的是after紧跟随的那个函数所返回的值
        
        afterfn.apply( this, arguments ); // 执行新的函数，修正this
        
        return ret; // 返回的是after紧跟随的那个函数所返回的值
    }
}; 
```

### 4.3 AOP简单实例

```js
// 原函数
var func = function(){
 console.log( 2 );
};

// 装饰者模式，并运用了前置通知以及后置通知
func = func.before(function(){
    console.log( 1 );
}).after(function(){
    console.log( 3 );
});

func(); 
```

## 五、 用AOP装饰函数

```js

```

```js

```

```js

```
