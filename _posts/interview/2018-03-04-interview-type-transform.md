---
layout: post
title: "面试题目 - 类型转换"
data: 2018-03-04 12:27:00 +0800
categories: 原创
tag: 面试题目
---
* content
{:toc}

<!-- more -->



## 一、数据类型


![dom](/styles/images/interview/question/q-06.png)


## 二、显式类型转换

### 2.1 Number函数

> * 规则如下

![dom](/styles/images/interview/question/q-07.png)

> * 对象类型转换（简单化）
>   * valueOf() ===> Number()
>   * valueOf() ===> toString() ===> Number()
>   * valueOf() ===> toString() ===> 报错

> * [demo](/effects/demo/interview/js/typeTransform.html)

```js
  // Number函数：转换成数值
  // 转换后还是原来的值
  console.log(Number(324)); // 324
  // 如果可以被解析为数值，则转换为相应的数值，否则得到NaN。空字符串转为0
  console.log(Number('324'));// 324
  console.log(Number('324abc')); // NaN

  console.log(Number('')); // 0
  // true转成1，false转成0
  console.log(Number(false)); // 0
  console.log(Number(true));// 1
  // 转成NaN
  console.log(Number(undefined)); // NaN
  // 转成0
  console.log(Number(null)); // 0
  var a = {a: 1};
  console.log('a', Number({a: 1}));
```

### 2.2 String函数

> * 规则如下

![dom](/styles/images/interview/question/q-08.png)

> * 对象类型转换（简单化）
>   * toString() ===> String()
>   * toString() ===> valueOf() ===> String()
>   * toString() ===> valueOf() ===> 报错

> * [demo](/effects/demo/interview/js/typeTransform.html)

```js
// 数值：转为相应的字符串
  console.log(String(123)); // "123"
  // 字符串：转换后还是原来的值
  console.log(String('abc')); // "abc"
  // 布尔值：true转为“true”，false转为“false”
  console.log(String(true)); // "true"
  // undefined：转为“undefined”
  console.log(String(undefined)); // "undefined"
  // null：转为“null”
  console.log(String(null)); // "null"
  // 先调用toString方法，如果toString方法返回的是原始类型的值，则对该值使用String方法;
  // 如果toString方法返回的是复合类型的值，再调用valueOf方法，如果valueOf方法返回的是原始类型的值，则对该值使用String方法
  var b = {
    b: 1,
    toString: function () {
      return {
        b: 2,
      };
    },
    valueOf: function () {
      return 'b';
    },
  };
  console.log('b', String(b));
```

### 2.3 Boolean函数

![dom](/styles/images/interview/question/q-09.png)

> * [demo](/effects/demo/interview/js/typeTransform.html)

```js
// 以下六个值的转化结果为false，其他的值全部为true
  // undefined
  // null
  // -0
  // +0
  // NaN
  // ''（空字符串）
  console.log('undefined', Boolean(undefined)); // false

  console.log('null', Boolean(null)); // false

  console.log('0', Boolean(0)); // false

  console.log('NaN', Boolean(NaN)); // false

  console.log('', Boolean('')); // false
```

## 三、隐式类型转换

> * 四则运算
> * 判断语句
> * Native调用

## 四、常见题目

![dom](/styles/images/interview/question/q-10.png)

> * [demo](/effects/demo/interview/js/typeTransform.html)

```js
 console.log([] + []) // ""
  console.log([] + {}) // "[object Object]"
  // chrome：0
  // FF：NaN
  console.log({} + []) 
  console.log({} + {}) // "[object Object][object Object]"
  console.log(true + true) // 2
  console.log(1 + {a: 1}) // "1[object Object]"
```

## 五、typeof

![dom](/styles/images/interview/question/q-11.png)