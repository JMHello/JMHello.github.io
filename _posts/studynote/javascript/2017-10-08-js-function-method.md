---
layout: post
title: "javascript - 函数方法 apply()、call()、bind()"
data: 2017-10-08 12:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 22.3 高级定时器

* 相关链接
    + [javascript - 定时器]({{ '/2017/10/06/js-time' | prepend: site.baseurl }})

<!-- more -->

## 一、apply() 和 call()

### 1.1 apply()

> * `apply(context,array)`：在特定的作用域中调用函数，即：等于设置函数体内 `this` 对象的值。
>    * `context`：在其中运行函数的作用域。
>    * `array`：参数数组。【可以是 `Array` 的实例，也可以是`arguments` 对象】

```js
function sum(num1, num2){
 return num1 + num2;
}
function callSum1(num1, num2){
 return sum.apply(this, arguments); // 传入 arguments 对象
}
function callSum2(num1, num2){
 return sum.apply(this, [num1, num2]); // 传入数组
}
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20 
```

### 1.2 call()

> * `call(context,...arg)`：在特定的作用域中调用函数，即：等于设置函数体内 `this` 对象的值。
>    * `context`：在其中运行函数的作用域。
>    * `...arg`：传递给函数的参数必须逐个列举出来。

```js
function sum(num1, num2){
 return num1 + num2;
}
function callSum(num1, num2){
 return sum.call(this, num1, num2);
}
alert(callSum(10,10)); //20 

```

### 1.3 扩充函数赖以运行的作用域

> * 传递参数并非 `apply()` 和 `call()` 真正的用武之地；它们真正强大的地方是 **能够扩充函数赖以运行的作用域**。

```js
window.color = "red";

var o = { color: "blue" };

function sayColor(){
 alert(this.color);
}

sayColor(); //red

sayColor.call(this); //red，this = window，函数体内的 this 对象指向了 window
sayColor.call(window); //red，函数体内的 this 对象指向了 window
sayColor.call(o); //blue ，函数体内的 this 对象指向了 o
```

> * **使用 `call()`（或 `apply()`）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。**

## 二、bind()

> * `bind(context)`：创建一个函数的实例，其 `this` 值会被绑定到传给 `bind()` 函数的值。
>    * `context`：在其中运行函数的作用域。
> * 支持 `bind()` 方法的浏览器有 `IE9+`、`Firefox 4+`、`Safari 5.1+`、`Opera 12+` 和 `Chrome`。

```js
window.color = "red";

var o = { color: "blue" };

function sayColor(){
 alert(this.color);
}

var objectSayColor = sayColor.bind(o);

objectSayColor(); //blue 
```
