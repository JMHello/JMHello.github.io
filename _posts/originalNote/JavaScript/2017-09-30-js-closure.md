---
layout: post
title: "javascript - 闭包"
data: 2017-09-30 12:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 参考博文
    + [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

<!-- more -->

## 一、闭包概念


* 闭包：指有权访问另一个函数作用域中的变量的函数。
    * 创建闭包的常见方式，就是在一个函数内部创建另一个函数。

## 二、 闭包用途

* 看以下例子

```js
function foo() {
    var a = 2;
    
    function bar() {
      console.log( a );
    }
    
    return bar;
}
var baz = foo();
baz(); // 2
```

* 在一些编程语言中，函数中的局部变量仅在函数的执行期间可用。
* 一旦 `foo()` 执行过后，我们会很合理的认为 `a` 变量将不再可用。
* 然而，上述代码成功运行，所以很显然在 `JavaScript` 中并不是这样的。
* 这是因为闭包的存在 --- `bar`函数是一个闭包，可以访问其外部作用域 `foo`里的 `a` 变量，
  也因此，`bar`保留了对`foo`作用域的引用，所以当`foo`函数执行完后，并没有被垃圾回收。

> 总结用途：
> 1. 读取函数内部的变量
> 2. 让这些变量的值始终保持在内存中

## 三、闭包的应用

### 3.1 用闭包模拟私有方法（模块模式）

```js
var Counter = (function() {
  var privateCounter = 0;
  
  function changeBy(val) {
    privateCounter += val;
  }
  
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();

var Counter1 = makeCounter();
var Counter2 = makeCounter();

console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();

console.log(Counter1.value()); /* logs 2 */

Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

> * 两个计数器是如何维护它们各自的独立性的。
> * 每次调用 makeCounter() 函数期间，其环境是不同的。
> * 每次调用中， privateCounter 中含有不同的实例。

### 3.2 循环与闭包

```js
for (var i = 1; i <= 5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i * 1000 );
}
```

* 正常情况下，我们对这段代码行为的预期是：分别输出数字 1~5，每秒一次，每次一个。
* 但实际上，这段代码在运行时会以每秒一次的频率输出五次 6。
* 原因：延迟函数的回调会在循环结束时才执行。
    事实上，当定时器运行时即使每个迭代中执行的是 `setTimeout(.., 0)`，所有的回调函数依然是在循
         环结束后才会被执行，因此会每次输出一个 `6` 出来。