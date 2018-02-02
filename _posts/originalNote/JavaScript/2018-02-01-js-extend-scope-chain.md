---
layout: post
title: "javascript - 延长作用域链"
data: 2018-02-01 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 相关文章
    + [javascript - 执行上下文](http://www.jmazm.com/2017/10/08/js-EC/)
    + [javascript - 作用域与作用域链](http://www.jmazm.com/2017/10/08/js-Scope/)
    + [javascript - 闭包](http://www.jmazm.com/2017/09/30/js-closure/)

<!-- more -->

## 一、 什么是延长作用域链

> * 执行环境的类型总共只有两种——全局和局部（函数），但有些语句可以在作用域链的前端临时增加一个变量对象，
    该变量对象会在代码执行后被移除，具体来说，就是当执行流进入下列任何一个语句时，作用域链就会得到加长。
    
## 二、with 语句

> * `with` 语句的作用：就是引用对象，并对该对象上的属性进行操作，其作用是可以省略重复书写该对象名称，起到简化书写的效果。

> * [demo](/effects/demo/js/extendScopeChain/v1.html)

```js
    function buildUrl () {
      const qs = `?debug=true`

      with (location) {
        var url = href + qs
      }

      return url
    }

    console.dir(buildUrl)
    const url = buildUrl()
    console.log(url)
    // http://localhost:63342/JMHello.github.io/effects/demo/js/extendScopeChain/v1.html?_ijt=rkrvpjiijro2nfbo4615ajtekp?debug=true
```

---

> * `with` 代码块中，`javascript` 引擎对变量的处理方式是：先查找是不是该对象的属性，如果是，则停止。如果不是继续查找是不是局部变量。
> * 并不能通过`with`语句对引用对象添加多个属性，并为每个属性赋值，因为通过 `with` 语句赋值的只能是对象已经存在并且可以写入的属性（不能是只读属性）。

> * [demo](/effects/demo/js/extendScopeChain/v2.html)

```js
let obj = {
      href: 'http://localhost'
    }
    let href = '11111'
    function buildUrl () {
      const qs="?debug=true";
      with (obj) {
        href = '22222'
        var url = href + qs
      }

      return url
    }

    const url = buildUrl()
    console.log(url) // 22222?debug=true
    console.log(href) // 11111
```

> * 从上面的`demo`可看到：`with` 语句中并没有更改变量 `href` 的值，而是更改了 `obj` 对象的 `href` 属性。

## 三、try-catch语句