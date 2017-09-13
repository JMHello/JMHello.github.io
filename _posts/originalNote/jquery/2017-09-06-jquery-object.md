---
layout: post
title: "jQuery - 代码分析之jquery变量"
date: 2017-09-06 19:00:00 +0800 
categories: 原创
tag: jQuery
---
* content
{:toc}

其他链接：

+ 中文官方主页： [http://jekyll.com.cn/](http://jekyll.com.cn/)

<!-- more -->

## 一、变量 jQuery

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