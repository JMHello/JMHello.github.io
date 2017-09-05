---
layout: post
title: "jQuery - 整体框架"
date: 2017-09-05 19:00:00 +0800 
categories: 原创
tag: 深入理解Web前端
---
* content
{:toc}

其他链接：

+ 中文官方主页： [http://jekyll.com.cn/](http://jekyll.com.cn/)



<!-- more -->

## 一、整体框架

### 1.1 jq入口

```js
(function(window,undefined) {
  //...
  
  // 这里是（8825，8826）行代码
 if ( typeof window === "object" && typeof window.document === "object" ) {
        window.jQuery = window.$ = jQuery;
}
})(window)
```

* 这里用了匿名函数自执行，并传进参数`window`
    * 使用匿名函数的原因：匿名函数内声明的变量和函数，在匿名函数外部都无法访问或者调用，这样起到了防止“变量冲突”或者“函数冲突”的效果
    * 传进`window`参数的原因：`jq`写出来毕竟是给人用的，因此需要将`jQuery`以及`$`挂在`window`对象下，充当`window`对象的属性，那么就能通过`jQuery`以及`$`访问匿名函数内部的一些方法了。

### 1.2 （21，94）行 定义函数和变量

* 定义了一些变量和函数
* `jQuey`对象也在这里创建

```js
(function(window,undefined) {
  //...
  
  // 这里是（61，64）行代码
  var 
  
  // 省略许多变量和函数
  
  jQuery = function( selector, context ) {
        // The jQuery object is actually just the init constructor 'enhanced'
        return new jQuery.fn.init( selector, context, rootjQuery );
    },
})(window)
```

### 1.3 （96，283）行 jq添加属性和方法

* 为`jQuery`对象添加一些方法和属性      

```js
jQuery.fn = jQuery.prototype = {
    //...
}

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

```

### 1.4 （285，347）行 extend

* `jQuey继承方法`：`extend`
* 为什么出现这个方法？
    * 不可能将所有方法都挂在了`jQuery.fn = jQuery.prototype`上，这样的话代码会过于冗杂，不利于代码的阅读以及后期的维护
    * 有了`extend`这个方法后，可以随时随地将方法继承在`jQuery`对象上，但又不会影响`jQuery`本身拥有的属性和方法

```js
jQuery.extend = jQuery.fn.extend = {
    //...
}
```

### 1.5 （349,817）行 扩展工具方法

* 扩展一些工具方法

```js
jQuery.extend({
    //...
});
```

### 1.6 （877，2856）行 Sizzle

* `Sizzle`：只单纯实现一个功能——复杂的选择器的实现

* `Sizzle`也是一个独立的库

### 1.7 （2880，3042）行 Callbacks

* `Callbacks`：回调对象，对函数的统一处理

```js
 jQuery.Callbacks = function() {
   //...
 }
```

### 1.8 （3043，3183）行 Deferred

* `Deferred`：延迟对象，对异步的统一处理

```js
jQuery.extend({
    Deferred:function() {
      //...
    }
})
```

### 1.9 （3184，3295）行 support

* `support` : 浏览器功能检查

```js
jQuery.support = (function() {
  //...
})({})
```
### 1.10 （）行
### 1.11（）行
### 1.12 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
### 1.5 （）行
