---
layout: post
title: "ES6 - let和const"
data: 2017-08-26 19:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}

> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/let](http://es6.ruanyifeng.com/#docs/let)

<!-- more -->

## 一、let

### 1.1 let 的基本用法

> * let用于所声明的变量。这个变量只在let命令所在的代码块内有效。

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
````

* for循环的计数器很合适使用let命令。

```js
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);// ReferenceError: i is not defined，计数器i只在for循环体内有效，在循环体外引用就会报错。
```

* 下面的代码，如果使用var，最后输出的是10；如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

> 1. 输出10的原因：  
     变量 `i`是`var`命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量`i`的值都会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，里面的i指向的就是全局的`i`。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是10。
> 2. 输出6的原因：  
    变量`i`是`let`声明的，当前的i只在本轮循环有效，所以每一次循环的`i`其实都是一个新的变量，所以最后输出的是6。
> 3. 如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？  
    这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
    
    
* for循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

> 输出了3次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

### 1.2 不存在变量提升

* var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。而let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### 1.3 暂时性死区 【 `temporal dead zone`，TDZ】

“暂时性死区”：如果区块中存在 `let` 和 `const` 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

> 目的：为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。  
> 本质：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

* 只要块级作用域内存在let命令，它所声明的变量就“绑定”（ `binding` ）这个区域，不再受外部的影响。并且在代码块内，使用let命令声明变量之前，该变量都是不可用的

```js
// 存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

* 在let命令声明变量tmp之前，都属于变量tmp的“死区”。
```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

* “暂时性死区”也意味着 `typeof` 不再是一个百分之百安全的操作。
```js
typeof x; // ReferenceError
let x;
```

上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，`typeof` 运行时就会抛出一个 `ReferenceError` 。

* 作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。

```js
typeof undeclared_variable // "undefined"
```

上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

* 有些“死区”比较隐蔽，不太容易发现。

```js
// 调用bar函数之所以报错（某些实现可能不报错），是因为参数 `x` 默认值等于另一个参数 `y`，而此时y还没有声明，属于”死区“。

function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

* 如果y的默认值是x，就不会报错，因为此时x已经声明了。

```js
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

* 暂时性死区，使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。【在变量x的声明语句还没有执行完成前，就去取x的值，导致报错“x 未定义”。】

```js
// 不报错
var x = x;

// 报错
let x = x; // ReferenceError: x is not defined
```

### 1.4 不允许重复声明
let不允许在相同作用域内，重复声明同一个变量。

```js
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}

// 因此，不能在函数内部重新声明参数。

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

## 二、const

### 2.1 基本用法

* const声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const PI = 3.1415;
PI // 3.1415

PI = 3; destructuring
```

* const声明的变量不得改变值。即：**对于const来说，只声明不赋值，就会报错。**

```js
const foo; // SyntaxError: Missing initializer in const declaration
```

* const的作用域与let命令相同：只在声明所在的块级作用域内有效。

```js
if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined
```

* const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```


* const声明的常量，也与let一样不可重复声明。

```js
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 2.2 本质

* const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。

* 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。

* 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

* 下面是另一个例子。常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

```js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

* 如果真的想将对象冻结，应该使用Object.freeze方法。【常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。】

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

* 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## 三、总结

![relationship-map]({{ '/styles/images/es6/es6-01.png' | prepend: site.baseurl }})