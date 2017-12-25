---
layout: post
title: "discrimination - this"
data: 2017-10-18 14:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

* 相关文章
    + [es5 - this](http://www.jmazm.com/2017/10/10/js-this/)
    + [es6 - this](http://www.jmazm.com/2017/08/31/ES6-Function/)

<!-- more -->

## 一、 this辨析

### 1.1 es5 - this

> * 先看 `es5`语法下函数内的 `this`。
> * 点击打开[demo](/effects/demo/discrimination/this/eg1.html)

```js
var obj = {};

obj.getThis = function () {
  console.log(this);
};

obj.getThis(); // obj

// 等价以下写法

 var obj = {
  getThis: function () {
    console.log(this);
  }
};

obj.getThis();
```

> * 结果如图所示

![relationship-map]({{ '/styles/images/discrimination/this/this-01.png' | prepend: site.baseurl }})

### 1.2 es6 - this

> * 看 `es6` 语法下函数内的 `this`。
> * 点击打开[demo](/effects/demo/discrimination/this/eg2.html)
> * 箭头函数相当于直接在全局作用域中定义，所以 `this` 指向 `window`。

```js
var obj = {};

obj.getThis = () => {
console.log(this);
};

obj.getThis(); // window

// 等价于以下写法
var obj = {
  getThis: () => {
    console.log(this);
  }
};

obj.getThis(); // window
```

![relationship-map]({{ '/styles/images/discrimination/this/this-02.png' | prepend: site.baseurl }})

---

> * 例2
> * 点击打开[demo](/effects/demo/discrimination/this/eg6.html)

```js
var obj = {};

obj.getThis = () => {
 return () => {
   console.log(this);
 }
}

obj.getThis()(); //window
```

> * 结果如图所示

![relationship-map]({{ '/styles/images/discrimination/this/this-02.png' | prepend: site.baseurl }})


### 1.3 来个混合写法

> * 例1：
> * 点击打开[demo](/effects/demo/discrimination/this/eg3.html)
> * 箭头函数是在 `obj.getThis` 函数中定义的，因此，`this`指向 `obj`

```js
var obj = {};

obj.getThis = function () {
    return () => {
      console.log(this);
    };
}

obj.getThis()(); // obj

// 等价于

var obj = {
  getThis: function () {
    return () => {
      console.log(this);
    }
  }
};

obj.getThis()(); // obj
```

> * 结果如图所示

![relationship-map]({{ '/styles/images/discrimination/this/this-01.png' | prepend: site.baseurl }})

---

> * 例2：
> * 点击打开[demo](/effects/demo/discrimination/this/eg4.html)
> * 箭头函数是在 `obj.getThis` 函数的内部函数`inner` 中定义，但是，`this`指向 `window`

```js
var obj = {};

obj.getThis = function () {
  var inner = function () {
    console.log(this);
  }
  inner();
}

obj.getThis(); // window
```

> * 结果如图所示

![relationship-map]({{ '/styles/images/discrimination/this/this-02.png' | prepend: site.baseurl }})

---

> * 例3
> * 点击打开[demo](/effects/demo/discrimination/this/eg5.html)

```js
function outer () {
  return () => {
    console.log(this);
  }
}

outer()(); // window
```

> * 结果如图所示

![relationship-map]({{ '/styles/images/discrimination/this/this-02.png' | prepend: site.baseurl }})

### 1.4 总结

> * 普通函数中的 `this` 的指向取决于调用表达式的形式。
> * 箭头函数中的 `this` 的指向取决于箭头函数定义时所处的环境。
> * 混杂函数（不同函数和箭头函数的组合）中的 `this` 不一定是当前对象，也有可能是 `window` 对象。 
