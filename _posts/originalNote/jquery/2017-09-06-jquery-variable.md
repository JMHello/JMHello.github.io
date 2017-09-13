---
layout: post
title: "jQuery - 代码分析之变量"
date: 2017-09-06 19:00:00 +0800 
categories: 原创
tag: jQuery
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
