---
layout: post
title: "jQuery - 代码分析之变量"
date: 2017-09-06 19:00:00 +0800 
categories: 原创
tag: 深入理解Web前端
---
* content
{:toc}

其他链接：

+ 中文官方主页： [http://jekyll.com.cn/](http://jekyll.com.cn/)



<!-- more -->

## 一、最外部的`IIFE`

```js
(function(window, undefined) {
  // 不要在这里直接用window，而是传参
})(window)
```

这里有三点需要注意的：

### 1.1 使用`IIFE`(立即执行函数表达式)
* 原因：所有变量都是局部变量，不会与外部产生变量冲突

### 1.2 传进参数`window`
* 原因：
    1. 尽管`window`对象处于最顶端的对象，但在沿着作用域链查找变量的过程中，查找`window`对象往往是最慢的。
      但是，如果我们将`window`对象当成参数传进去，根据变量查找规则，最先往作用域链的最前端去查找，
      因此，我们不需要再往最顶端寻找`window`对象，而是只需要找到`IIFE`中的参数`window`就好。
      【**简单来说，传参后查找变量的速度要比不传参的快**】
      
    2. 其实我们不传`window`对象，直接在`IIFE`里使用`window`对象也是可以的，但当在压缩代码的时候，写在`IIFE`里
      的 `window`尽管可以压缩，但是你并不知道这个压缩后的`window`是什么来的。相反，如果你将`window`传到`IIFE`里，
      参数`window`是可以压缩的，但由于`window`是存在的，所以即使参数`window`压缩了，我们也知道压缩后的它是什么来的。
      【**简单来说，传参后，即使压缩了，也可以知道压缩后的代码是什么意思**】
      
### 1.3 传进参数`undefined`

`````js
    var undefined = 10;
    alert(undefined);
`````
   
* 在`ie`较低版本下，弹出的是`10`；在`ie10`,弹出的是`undefined`。
* 因此，传`undefined`是为了防止外部修改`undefined`的值，恰好又有一些浏览器默认可以修改`undefined`的值
        
## 二、变量

### 2.1 rootjQuery

```js
// A central reference to the root jQuery(document)
var  rootjQuery;

// 第866行
rootjQuery = jQuery(document);
```
 
* 为什么获取`document`对象也要拿一个变量将其存储起来呢？
    * 原因：压缩代码的时候，`jQuery(document)`一般不能压缩，而`rootjQuery`可以压缩，并且我们调用`document`起来会比较方便

### 2.2 readyList

```js
// The deferred used on DOM ready
var readyList;
```

* 这个变量与`DOM`有关，以后解释

### 2.3 core_strundefined

```js
// Support: IE9
// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
var  core_strundefined = typeof undefined;
```

* 其实我们验证一个变量是否为`undefined`有两种方法：
    1. `window.a == 'undefined';`
    2. `type window.a =='undefined'`
* 但在jq中选择第二种写法，是因为第一种写法在浏览器兼容上有些问题，例如低版本的ie可能无法正确判断一个变量是否为`undefined`。

### 2.4 location、document、docElem

```js
 // Use the correct document accordingly with window argument (sandbox)
var location = window.location,
    document = window.document,
    docElem = document.documentElement;
```

* 用变量存起来，也是为了代码的压缩

### 2.5 `_jQuery`、`_$`

```js
var
 // Map over jQuery in case of overwrite
_jQuery = window.jQuery,

// Map over the $ in case of overwrite
_$ = window.$;
```

* 这两个变量都是为了防冲突而使用的。

### 2.6 class2type

```js
// [[Class]] -> type pairs
var class2type = {};

// 其实class2Type就是按以下格式存储以下内容
class2type = {
    '[Object String': 'string',
    '[Object Array': 'array'
}
```

* 这个变量将要在`$.type()`方法中用到，这个方法主要用来判断类型的。

### 2.7     

```js
var 
// List of deleted data cache ids, so we can reuse them
// 在jq2.0版本以上，这个变量已经没什么用处了，数据的缓存与“data”有关。
core_deletedIds = [],

// 版本号
core_version = "2.0.3",

// Save a reference to some core methods
// 变量存储，使用方便，压缩方便
core_concat = core_deletedIds.concat,
core_push = core_deletedIds.push,
core_slice = core_deletedIds.slice,
core_indexOf = core_deletedIds.indexOf,
core_toString = class2type.toString,
core_hasOwn = class2type.hasOwnProperty,
core_trim = core_version.trim;
```

### 2.8 fcamelCase

```js
// Used by jQuery.camelCase as callback to replace()
var fcamelCase = function( all, letter ) {
    return letter.toUpperCase();
};
```

* 

### 2.9 completed

```js
// The ready event handler and self cleanup method
var completed = function() {
    document.removeEventListener( "DOMContentLoaded", completed, false );
    window.removeEventListener( "load", completed, false );
    jQuery.ready();
};
```

* 

## 三、变量 --- 正则部分

### 3.1 core_pnum

* 用来匹配数字

```js
 // Used for matching numbers
var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
```


### 3.2 core_rnotwhite

* 用来匹配数字

```js
 // Used for splitting on whitespace
var core_rnotwhite = /\S+/g;
```

### 3.3 rquickExpr

* 用来匹配类似`<p>xxx` 或者 `#div1`

```js
// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
```

### 3.4 rsingleTag

* 用来成对出现的标签，例：`<p></p>`

```js
// Match a standalone tag
var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
```

### 3.5 rmsPrefix

* `-ms-`是`ie`的前缀，如果是`-ms-margin-left-`缩写后是`MsMarginLeft`，不像`webkitMarginLeft`的第一个字母是小写，所以这个要重点拿出来

```js
// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/;
```

### 3.6 rdashAlpha

* 用来匹配`-1xx`或者`-mm`
    * 例：`margin-left`中的`-left`就可以匹配到，我们可以将其转化成`marginLeft`这样的形式

```js
var rdashAlpha = /-([\da-z])/gi;
```

## 四、变量 jQuery

* 一般面向对象的写法是这样的：

```js
var jQuery = function() {
  //...
};
jQuery.prototype.init = function() {
  //...
}
jQuery.prototype.css = function() {
  //...
}

// 调用
var jq = new jQuery();
jq.init();
jq.css();
```

* 到了jq这里就不一样了，是**链式调用**

```js
var jQuery = function() {
   return new jQuery.fn.init();
};
jQuery.fn = jQuery.prototype = {
    init: function() {
      
    },
    css: function() {
      
    }
}
// 使用jQuery的原型对象覆盖init的原型对象
jQuery.fn.init.prototype = jQuery.fn;

//调用
jQuery().css();
```

看到`jq`的面向对象的写法，大家或许会有以下疑惑：

### 4.1  为什么要`jQuery.fn = jQuery.prototype`,而不是`fn = jQuery.prototype`?

* 首先，其实是由于`jQuery.prototype`太长了，我们只是换一个比较名字而已，他们两个是一样的。
* 接着，将`jQuery.prototype`挂在`jQuery`对象的的`fn`属性下，是为了安全着想，不然任何人都可以随意改了。

### 4.2 为什么要在`jQuery`的构造函数里返回` return new jQuery.fn.init();`？

* 由于需要起到“链式”调用的作用，那么`jQuery`的构造函数返回的必然是一个对象才可以，因此，一开始我们的想法是：
```js
var jQuery = function() {
   // 返回类的实例
   return new jQuery();   
}
```
* 接着我们就要新建一个实例，那么`this`关键字就指向`$jq`，同时`$jq`实例对象就有了`jQuery.prototype`包含的原型属性和方法，并且`this`也会指向`$jq`的实例对象。
```js
 var $jq = new jQuery();
```
* 有了上面的想法，我们就可以尝试用工厂方法来创建一个实例，并且将这个方法放在`jQuery.prototype`原型对象上，并在`jQuery`函数中返回这个原型方法的调用。
```js
    var jQuery = function() {
        // 调用原型方法init
          return jQuery.fn.init();
    }
    jQuery.fn = jQuery.prototype = {
          init: function() {
              return this;
          }
     }
```
* 上面的代码貌似可以实现我们的链式调用了，然而，它还是存在问题的：` return jQuery.fn.init();`这一句话其实破环了**作用域的独立性**。
**可以试想一下：`init()`方法中的`this`究竟指代的是`jQuery`呢还是`init()`方法本身呢？** 下面让我们来看一下例子：
```js
    var $ = jQuery = function() {
        // 调用原型方法init
          return jQuery.fn.init();
    }
    jQuery.fn = jQuery.prototype = {
          init: function() {
              this.length = 0;
              this.test = function() {
                  return this.length;
              };
              return this;
          },
          size: function() {
              return this.length;
          },
          length: 1,
          version: '2.0.3'
     };
   
    // 测试
    console.log($().version); // '2.0.3'
    console.log($().test()); // 0
    console.log($().size()); // 0
```
* 分析上述代码：`this`关键字引用了`init()`函数作用域所在的对象，所以`$().test()`返回0。
  但是，`this`关键字又可以访问上一级对象`jQuery.fn`的作用域，所以`$().version`返回`'2.0.3'`。
  记得，`$().size()`返回的是0。**很明显，这样的设计很糟糕！！因此我们需要分隔作用域**
```js
    var $ = jQuery = function() {
        // 实例化init初始化函数，起到分隔作用域的效果
          return new jQuery.fn.init();
    }
    jQuery.fn = jQuery.prototype = {
          init: function() {
              this.length = 0;
              this.test = function() {
                  return this.length;
              };
              return this;
          },
          size: function() {
              return this.length;
          },
          length: 1,
          version: '2.0.3'
     };
   
    // 测试
    console.log($().version); // 'undefined'
    console.log($().test()); // 0
    console.log($().size()); // 报错
```
* 解决了“作用域”的问题，现在又出现了另外一个问题（我们也可以从上述代码的测试中看到）：**居然无法访问`jQuery.fn`对象的属性和方法**。那我们究竟怎么样才能在返回的实例中访问`jQuery`的原型对象呢？
**很简单，一行代码搞掂。**
```js
    var $ = jQuery = function() {
        // 实例化init初始化函数，起到分隔作用域的效果
          return new jQuery.fn.init();
    }
    jQuery.fn = jQuery.prototype = {
          init: function() {
              this.length = 0;
              this.test = function() {
                  return this.length;
              };
              return this;
          },
          size: function() {
              return this.length;
          },
          length: 1,
          version: '2.0.3'
     };
    
    // 新增代码：使用jQuery原型对象覆盖init的原型对象，这就相当于init方法有权利去访问jQuery原型对象的所有属性和方法
    jQuery.fn.init.prototype = jQuery.fn;
   
    // 测试
    console.log($().version); // '2.0.3'
    console.log($().test()); // 0
    console.log($().size()); // 0
```
 > 注意：`$().size()`的值仍然是`0`，原因是：根据作用域链寻找变量的原理，`init`方法中存在`length`，自然就不会寻找 `jQuery.prototype`下的`length`了