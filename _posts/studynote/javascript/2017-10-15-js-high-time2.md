---
layout: post
title: "javascript - 高级定时器2 - throttle、debounce、immediate"
data: 2017-10-15 12:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 22.3 高级定时器
    + [http://www.css88.com/archives/6589](http://www.css88.com/archives/6589)

* 相关链接
    + [javascript - 定时器]({{ '/2017/10/06/js-time' | prepend: site.baseurl }})
    + [javascript - 高级定时器]({{ '/2017/10/07/js-high-time' | prepend: site.baseurl }})
    
> JavaScript遵循事件驱动的编程范例。这意味着一些行为可以激活一些响应，并且这些响应仅在发生特定的行为时才被激活。我们称这些行为 `events` (事件)，和响应 `callbacks`(回调)。连续的事件流被称为 `event stream`（事件流）。

> 这些行为发生的速度不是我们能手动控制的。但是我们可以控制何时和如何激活正确的响应。有一些技术为我们提供精确的控制。**【`throttle`、`debounce`、`immediate`】**

<!-- more -->


## 一、Throttle

### 1.1 throttle介绍

> * 在现代浏览器中，帧速率为`60fps`是流畅性能的目标，而给定我们的`16.7ms`的时间预算就是用于响应一些事件所需要的更新。
> * 这样可以推断，如果每秒发生 `n` 个事件并且回调执行，需要 `t` 秒的时间，为了流畅运行：
>   * **`1 / n >= t`**
> * 如果 `t` 以毫秒为单位：**`1000 / n >= t`**

### 1.2 onmousemove的问题

* 先看一下`onmousemove`的 `demo` 【点击打开[demo](/effects/demo/demo-time/throttle/throttle1.html)】

```js
var then = 0;
 
function log() {
  var now = Date.now();
  if (1000 / (now - then) > 60) {
    console.log('It\'s over 9000!!!');
  }
  then = now;
}
 
window.onmousemove = log;
```

> * 可看到当你移动鼠标时，控制台会不断输出“It’s over 9000!!!”

### 1.3 throttle的实现

> * `Throttle` 允许我们限制我们激活响应的数量。
> * 我们可以限制每秒回调的数量。
> * 反过来，也就是说在激活下一个回调之前要等待多少时间。

* 改良版本 `demo1` 【点击打开[demo](/effects/demo/demo-time/throttle/throttle2.html)】

```js
var then = 0;
 
function log() {
  var now = Date.now();
  if (1000 / (now - then) > 60) {
    console.log('It\'s over 9000!!!');
  }
  then = now;
}
 
window.onmousemove = log;
```

* 改良版本 `demo2` 【点击打开[demo](/effects/demo/demo-time/throttle/throttle3.html)】

```js
    var delta = 1000;
    var safe =true;

    function log() {
      console.log('foo');
    }

    function throttledLog() {
      if (safe) {
        log();
        safe = false;

        setTimeout(function () {
          safe = true;
        }, delta);
      }
    };

    window.onmousemove = throttledLog;
```

### 1.4 完美 throttle函数

```js
function throttle (fn, delta, context) {
  var safe = true;
  
  return function () {
    var args = arguments;
    
    if (safe) {
      fn.call(context, args);
      setTimeout(function() {
        safe = true;
      },delta);
    }
  };
}
```

## 二、Debounce

### 2.1 debounce介绍

### 2.2 实例 - keydown vs keyup

> * 假设您正在处理一个项目，并且需要输入内容。
> * 但是你想要每次敲击键盘得到一个字符。
> * 输入时，如果长按一个键，`keydown` 事件将连续被触发，但是 `keyup` 事件只有在按键被释放时才会触发。
> * 在某种程度上，我们可以说 `keydown` 是原始输入，`keyup` 是去抖动输入。
> * 点击打开[demo](/effects/demo/demo-time/debounce/debounce1.html) 

```js
window.onkeydown = function () {
  console.log('onkeydown');
}

window.onkeyup = function () {
  console.log('onkeyup');
}
```

### 2.3 debounced 实现

> * 当事件发生时，我们 **不会立即激活回调**。
> * 相反，我们等待一定的时间并检查相同的事件是否再次触发。
> * 如果是，我们重置定时器，并再次等待。
> * 如果在等待期间没有发生相同的事件，我们就立即激活回调。
> * 点击打开[demo](/effects/demo/demo-time/debounce/debounce2.html) 

```js
 var delta = 500;
    var timeoutId = null;

    function foo () {
      console.log('foo');
    }

    function debouncedLog () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // 等待一段时间，并且检查事件是否再次发生
        foo();
      }, delta);
    }

    window.onkeydown = debouncedLog;
```

> * 时间间隔设为了 `500ms`，如果你在 `500ms` 按着键盘不放，也只会输出一次`foo`（不是马上输出），即：只调用一次 `debouncelog`。

### 2.4 debounced 的问题

> * 1.传递参数（`Passing arguments`）
>   * 如果 `foo` 期望传递一些参数？
>   * 解决方法：通过添加参数到 `debouncedFoo` 来解决。

```js
function foo(a, b, c) {
  // ...
}
 
function debouncedFoo(x, y, z) {
  // ...
    foo(x, y, z);
  // ...
};
```

----

> * 2.未知参数数量的函数
>   * 解决方法：使用 `arguments` 对象。

```js
function foo(a, b, c) {
  // ...
}
 
function debouncedFoo(arguments) {
  var args = arguments;
  // ...
    foo.apply(null, args);
  // ...
};
```

----

> * 3.防止上下文丢失

```js
// ...
 
function debounce(fn, delta, context) {
  // ...
      fn.apply(context, args);
  // ...
}
```

### 2.5 多个 debounced 函数

> * 假设我们需要多个`debounce`函数。
> * 最好的方法就是使用高阶函数。【`HOF`（高阶函数）接受一个函数并返回另一个函数。】
> * 点击打开[demo](/effects/demo/demo-time/debounce/debounce3.html) 

```js
var delta = 1000;

function log(e) {
  console.log(e);
}

function debounce(fn, delta) {
  var timeoutId = null;
  
  return function () {
    clearTimeout(timeoutId);
    
    var args = arguments;
    
    timeoutId = setTimeout(function() {
      fn.apply(null, args);
    }, delta);
  }
}

var debouncedLog = debounce(log, delta);
window.onkeydown = debouncedLog;
```

### 2.6 完美debounce代码

> * 完美 `debounce`代码

```js
function debounce(fn, delta, context) {
  var timeoutId = null;
  
  return function () {
    clearTimeout(timeoutId);
    
    var args = arguments;
    
    timeoutId = setTimeout(function() {
      fn.apply(context, args);
    }, delta);
  }
}
```

> * 实例
> * 点击打开[demo](/effects/demo/demo-time/debounce/debounce4.html) 

```js

function foo() {
    console.log('foo');
}

var debouncedFoo = debounce(foo, 1000);

window.onmousemove = debouncedFoo;
```

## 三、Immediate

### 3.1 immediate介绍

> * `Immediate` 是 `Debounce` 的精确版本。
> * 比起 `Debounce` 的等待后续事件触发，然后再激活回调。
> * `Immediate` 是立即激活回调，然后等待后续事件在一定时间内触发。

### 3.2 immediate实现

> * 点击打开[demo](/effects/demo/demo-time/immediate/immediate1.html)
> * 你会发现，只要你一`keydown`，控制台马上会输出`foo`，但是在 `1s` 内，无论你多少次`keydown`，控制台里也只会输出一次`foo`。过了`1s`后，你再`keydown`，又会再次马上输出`foo`。

```js
var delta = 1000;
var timeId = null;
var safe = true;

function log () {
  console.log('foo');
}

function immediateLog () {
  if (safe) {
    log();
    safe = false;
  }

  clearTimeout(timeId);
  timeId = setTimeout(() => {
    safe = true;
  }, delta);
}

window.onkeydown = immediateLog;
```

### 3.3 完美 immediate

```js
function immediate(fn, delta, context) {
  var timeoutId = null;
  var safe = true;
  
  return function () {
    var args = arguments;
    
    if (safe) {
      fn.call(context, args);
      safe = false;
    }
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(function() {
      safe = true;
    }, delta);
  };
}
```