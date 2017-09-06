---
layout: post
title: "jQuery - 学习二"
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

1. 使用`IIFE`(立即执行函数表达式)
    * 原因：所有变量都是局部变量，不会与外部产生变量冲突
2. 传进参数`window`
    * 原因：
        * 尽管`window`对象处于最顶端的对象，但在沿着作用域链查找变量的过程中，查找`window`对象往往是最慢的。
          但是，如果我们将`window`对象当成参数传进去，根据变量查找规则，最先往作用域链的最前端去查找，
          因此，我们不需要再往最顶端寻找`window`对象，而是只需要找到`IIFE`中的参数`window`就好。
          【**简单来说，传参后查找变量的速度要比不传参的快**】
          
        * 其实我们不传`window`对象，直接在`IIFE`里使用`window`对象也是可以的，但当在压缩代码的时候，写在`IIFE`里
          的 `window`尽管可以压缩，但是你并不知道这个压缩后的`window`是什么来的。相反，如果你将`window`传到`IIFE`里，
          参数`window`是可以压缩的，但由于`window`是存在的，所以即使参数`window`压缩了，我们也知道压缩后的它是什么来的。
          【**简单来说，传参后，即使压缩了，也可以知道压缩后的代码是什么意思**】
3. 传进参数`undefined`

    ```js
    var undefined = 10;
    alert(undefined);
    ```
   
    * 在`ie`较低版本下，弹出的是`10`
    * 在`ie10`,弹出的是`undefined`
    * 因此，传`undefined`是为了防止外部修改`undefined`的值，恰好又有一些浏览器默认可以修改`undefined`的值
    
    
 