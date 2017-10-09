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

> * 闭包：指有权访问另一个函数作用域中的变量的函数。
> * 创建闭包的常见方式：函数嵌套函数。
> * `ECMAScript` 的闭包只支持静态的词法作用域 --- 即：`[[Scrope]]`，详情请参考 [javascript - 作用域与作用域链](http://www.jmazm.com/2017/10/08/js-scope/)。

## 二、 闭包用途

> * 看以下例子

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
  也因此，`bar`保留了对`foo`作用域的引用，所以当`foo`函数执行完后，并没有被垃圾回收【归根结底就是 `[[Scope]]` 属性】。

> 总结用途：
> 1. 函数内部可以引用外部的参数和变量
> 2. 让这些变量的值始终保持在内存中，因此参数和变量不会被垃圾回收机制回收

## 三、闭包的应用

### 3.1 用闭包模拟私有方法（单例模式）

* 在没有了解闭包之前，我们可能会这样写一个计数器：

```js
var Counter = {
    privateCounter: 0,
    changeBy: function(val) {
      privateCounter += val;
    },
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
```

> * 上述代码轻松实现了一个简单的计数器。
> * 然而，其他人可通过`Counter.privateCounter`访问到 `privateCounter` 变量和`Counter.changeBy()`调用 `changeBy` 函数。
> * `Counter`也是有权利有自己的隐私的：它不希望别人访问到`privateCounter`和调用`changeBy()`。
> * 可惜，上述写法无法保障 `Counter` 的隐私权。请看下面的代码：

```js
var Counter = (function() {
  // 私有属性
  var privateCounter = 0;
  
  // 私有方法
  function changeBy(val) {
    privateCounter += val;
  }
  
  // 返回公共接口
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

> * 利用 `IIFE` 建立了一个封闭的作用域，即：闭包，在封闭的作用域中建立了 **私有变量`privateCounter`** 和 **私有方法`changeBy()`**，并返回 `Counter` 对外的公共 `API`。 
> * 其实上述代码是 **模块模式**：是单例（单例（`singleton`），指的就是只有一个实例的对象）创建私有变量和特权方法。

### 3.2 循环与闭包

```js
for (var i = 1; i <= 5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i * 1000 );
}
```

> * 正常情况下，我们对这段代码行为的预期是：分别输出数字 1~5，每秒一次，每次一个。
> * 但实际上，这段代码在运行时会以每秒一次的频率输出五次 6。
> * 原因：**延迟函数的回调会在循环结束时才执行**。    
>  【事实上，当定时器运行时即使每个迭代中执行的是 `setTimeout(.., 0)`，所有的回调函数依然是在循环结束后才会被执行，因此会每次输出一个 `6` 出来。
    详细可参考 [javascript-定时器](http://www.jmazm.com/2017/10/06/js-time/)】

> * 其实我们都对`for`循环有一个“先入为主”的思想：**认为循环中的每个迭代都能自己捕获到属于自己的`i`**。
> * 然而，根据 **作用域工作原理**，实际情况是尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个 `i`。
> * 简单理解：上述例子中的 5 个函数都在共享一个 `i` 的引用。

* 再看以下代码：

```js
for (var i = 1; i <= 5; i++) {
  (function() {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })();
}
```

> * 上述这段代码在运行时会依然以每秒一次的频率输出五次 6 。
> * 或许很奇怪：循环里的每一个函数不都有自己的作用域，为什么还是输出 6？ ---- 原来 `IIFE` 是空的，即：没有任何实质的、有帮助的东西。

* 再看以下代码：添加属于自己作用域的变量，保存相应的值

```js
for (var i = 1; i <=5; i++) {
  (function() {
    // 新添代码
    var j = i;
    
    setTimeout(function() {
      console.log(j);
    }, j * 1000);
  })();
}

// 改进后代码

for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, j * 1000);
  })(i);
}

// 使用 es6 语法 -- let
for(let i = 1; i <= 5; i++) {
   setTimeout(function() {
        console.log(i);
   }, i * 1000);
}
```

> * 总结：在迭代内使用 `IIFE` 会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的
     作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。
 
## 四、总结

> * 闭包优点：
>   * 当希望一个变量长期驻扎在内存中时，就可以使用闭包。
>   * 避免全局变量的污染。
>   * 可以创建私有成员。

> * 闭包缺点：
>   * 闭包会使变量始终保存在内存中，如果不当使用会增大内存消耗。







  
