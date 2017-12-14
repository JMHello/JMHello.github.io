---
layout: post
title: "ES6 - 变量的解构赋值"
data: 2017-08-31 9:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}


> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/destructuring](http://es6.ruanyifeng.com/#docs/destructuring)

<!-- more -->

## 1、数组的解构赋值

### 1.1 基本用法

> * `ES6` 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（`Destructuring`）。
> * 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

> * 点击打开[demo](/effects/demo/es6/destructuring/eg1.html)

```js
    let a = 1;
    let b = 2;
    let c = 3;
    console.log(a, b, c); // 1 2 3
    
    let [e, f, g] = [4, 5, 6];
    console.log(e, f, g); // 4 5 6
    
    let [foo, [[bar], baz]] = [7, [[8], 9]];
    console.log(foo, bar, baz); // 7 8 9
````

---

> * 如果解构不成功，变量的值就等于 `undefined`。
> * 不完全解构：即等号左边的模式，只匹配一部分的等号右边的数组。【这种情况下，解构依然可以成功。】

> * 点击打开[demo](/effects/demo/es6/destructuring/eg2.html)

``` js
  // 解构失败
   let [foo] = [];
   let [bar, baz] = [1];
   console.log(foo, bar, baz) // undefined 1 undefined

   // 不完全解构
   let [x, y] = [1, 2, 3];
   console.log(x, y); // 1 2
   let [a, [b], d] = [1, [2,3], 4];
   console.log(a, b, d); // 1 2 4
```

> * 如果等号的右边不是数组，那么将会报错。点击打开[demo](/effects/demo/es6/destructuring/eg3.html)

```js
 // 报错
  let [a] = 1;
  let [b] = false;
  let [c] = NaN;
  let [d] = undefined;
  let [e] = null;
  let [f] = {};
```

### 1.2 默认值 

> * 解构赋值允许指定默认值。
>   * 如果一个数组成员是`null`，默认值就不会生效【原因：`null`不严格等于`undefined`】
> * ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。

> * 点击打开[demo](/effects/demo/es6/destructuring/eg4.html)

```js
    let [foo = true] = [];
    console.log(foo); // true
    
    let [x, y = 1] = [2];
    console.log(x, y); // 2 1
    
    let [c, d = 3] = [4, undefined];
    console.log(c, d) // 4 3
    
    let [e, f = 3] = [5, null];
    console.log(e, f) // 5 null
```

---

> * 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg5.html)

```js
    function f () {
      return 2;
    }
    // 因为x能取到值，所以函数f根本不会执行。
    let [x = f()] = [1];

    // 因为y不能取到值，所以函数f会执行。
    let [y = f()] = [undefined];
    
    console.log(x, y); // 1 2
```

---

> * 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg6.html)

```js
   let [x = 1, y = x] = [];
   console.log(x, y); // 1 1

   let [a = b, b = 1] = [];
   console.log(a, b); // b is not defined -- 因为x用到默认值y时，y还没有声明。
```
        
## 2、 对象的解构赋值

### 2.1 基本用法

> * **对象的解构与数组有一个重要的不同。**
>    * 数组的元素是按次序排列的，变量的取值由它的位置决定；
>    * 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
> * **对象的解构赋值的内部机制：先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。**

> * 点击打开[demo](/effects/demo/es6/destructuring/eg7.html)

```js
     let {bar, foo} = {foo: 1, bar: 2};
     console.log(foo, bar); // 1 2
    
     let {baz} = {foo: 1, bar: 2};
     console.log(baz); // undefined
    
     // 如果变量名与属性名不一致，必须写成下面这样
     let {number: result} = {number: 3, name: 'jm'};
     console.log(result); // 3
    
     let user = {name: 'jm', age: 1};
     let {name: u, age: a} = user;
     console.log(u, a); // 'jm' 1
```

---

> * 解构可以用于嵌套结构的对象。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg8.html)

```js
// p是模式，不是变量，因此不会被赋值
   let obj = {
     p: [
       'name',
       {age: 1}
     ]
   };

   let {p: [x, {y}]} = obj;
   let {p: [b, {age}]} = obj;
   console.log(x, y, age); // name undefined 1
   console.log(p); //  Uncaught ReferenceError: p is not defined

   // 如果p也要作为变量赋值，可以写成下面这样。
   /*
   let {p, p: [c, {age}]} = obj;
   console.log(p); // ["name", {age: 1}]
   console.log(c, {age}); // name {age: 1}
   */
```

---

> * 下面是另一个例子。【点击打开[demo](/effects/demo/es6/destructuring/eg9.html)】

```js
   let node = {
     loc: {
       start: {
         line: 1,
         column: 5
       }
     }
   }

   // 分别对loc、start、line三个属性的解构赋值
   // 最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
   let {loc, loc: {start}, loc: {start: {line}} } = node;
   console.log(loc); // {start: {line: 1, column: 5}}
   console.log(start); // {line: 1, column: 5}
   console.log(line); // 1
```

---

> * 下面是嵌套赋值的例子。【点击打开[demo](/effects/demo/es6/destructuring/eg10.html)】
> * 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```js
  let obj = {};
  let arr = [];

  // 省略括号会报错 - Uncaught SyntaxError: Unexpected token 
  // {foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true}
  // 正确的写法----将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。
  ({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true})
  console.log(obj); // {prop: 123}
  console.log(arr); // [true]

  /*
  因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。
  只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
  */

  // 古怪写法
  ({} = [true, false]);
  ({} = 'abc');
  ({} = []);  
````

### 2.2 默认值

> * 对象的解构也可以指定默认值。【点击打开[demo](/effects/demo/es6/destructuring/eg11.html)】

```js
    let {x = 1, y = 2} = {y: 3};
    console.log(x, y); // 1 3 not 1 2
    
    let {a: a1 = 4, b: b1 = 5} = {
      b: 6
    }
    console.log(a1, b1) // 4 6 not 4 5
    // console.log(a) //  a is not defined
````

---

> * 默认值生效的条件是，对象的属性值严格等于 `undefined`。
> * 如果解构失败，变量的值等于 `undefined` 。
> * 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg12.html)

```js
    let {x = 3} = {x: undefined};
    console.log(x); // 3

    // y属性等于null，就不严格相等于undefined，导致默认值不会生效。
    let {y = 4} = {y: null};
    console.log(y); // null

    // 解构失败，变量的值等于undefined。
    let {eg} = {bar: 'baz'};
    console.log(eg);

    // 等号左边对象的foo属性，对应一个子对象。
    // 该子对象的bar属性，解构时会报错 -- Cannot destructure property `bar` of 'undefined' or 'null'.
    // 原因：因为foo这时等于undefined，再取子属性就会报错。
    // let {foo: {bar}} = {baz: 'baz'}; // 错误写法
    let {foo: {bar}} = {foo: {bar: 'bar'}}; // 正确写法
    console.log(bar); // 'bar'
```

---

> * 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。【将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。】
> * 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg13.html)

```js
    let { log, sin, cos } = Math;
    console.log(log); // ƒ log() { [native code] }
    console.log(sin); // ƒ sin() { [native code] }

    // 对数组进行对象属性的解构
    // 数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。
    let arr = [1, 2, 3];
    let {0: first, [arr.length - 1]: last} = arr;
    console.log(first, last); // 1 3
```

## 3、 字符串的解构赋值

> * 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
> * 类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg14.html)

```js
    const [a, b, c, d, e] = 'hello';
    console.log(a, b, c, d, e); // 'h' 'e' 'l' 'l' 'o'

    let {length : len} = 'hello';
    console.log(len); // 5
```

## 4、 数值和布尔值的解构赋值

> * 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
> * 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
>    * 由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg15.html)

```js
   // 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
   let {toString: s1} = 123;
   console.log(s1 === Number.prototype.toString); // true

   let {toString: s2} = true;
   console.log(s2 === Boolean.prototype.toString); //true

   // Cannot destructure property `prop` of 'undefined' or 'null'.
   let {prop: x} = undefined;
   let {prop: y} = null;
```

## 5、 函数参数的解构赋值

> * 函数的参数也可以使用解构赋值。【点击打开[demo](/effects/demo/es6/destructuring/eg16.html)】

```js
    // 例1
    function add ([x, y]) {
        return x + y;
    }
    // 函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。
    // 对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`。
    let sumResult = add([3, 4]);
    console.log(sumResult); // 7

    // 例2
    [[1, 2], [3, 4]].map(([a, b]) =>{
      console.log(a + b);
      // 3
      // 7
    });
```

---

> * 函数参数的解构也可以使用默认值。
> * `undefined`就会触发函数参数的默认值。
> * 点击打开[demo](/effects/demo/es6/destructuring/eg17.html)

```js
    // 例1
    function move1 ({x = 0, y = 0} = {}) {
      return [x, y];
    }
    
    // 函数`move1`的参数是一个对象，通过对这个对象进行解构，得到变量`x`和`y`的值。
    // 如果解构失败，`x`和`y`等于默认值。
    console.log(move1({x: 3, y: 8})); // [3, 8]
    console.log(move1({x: 3})); // [3, 0]
    console.log(move1({})); // [0, 0]
    console.log(move1()); // [0, 0]


    // 例2
    function move2 ({x, y} = {x: 0, y: 0}) {
      return [x, y];
    }
    // 上面代码是为函数`move2`的参数指定默认值，而不是为变量`x`和`y`指定默认值，所以会得到与前一种写法不同的结果。
    console.log(move2({x: 3, y: 8})); // [3, 8]
    console.log(move2({x: 3})); // [3, undefined]
    console.log(move2({})); // [undefined, undefined]
    console.log(move2()); // [0, 0]

    // `undefined`就会触发函数参数的默认值
    [1, undefined, 3].map((x = 'yes') => {
      console.log(x);
      // 1
      // yes
      // 3
    });
```

## 6、 圆括号问题

> * 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

> * 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

> * 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 6.1 不能使用圆括号的情况 

> * 1.变量声明语句

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
````  

> * 2.函数参数【函数参数也属于变量声明，因此不能带有圆括号。】

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
``` 

> * 3.赋值语句的模式

```js
// 全部报错--将整个模式放在圆括号之中，导致报错。
({ p: a }) = { p: 42 };
([a]) = [5];

// 将一部分模式放在圆括号之中，导致报错。
// 报错
[({ p: a }), { x: c }] = [{}, {}];
``` 

### 6.2 可以使用圆括号的情况

> * 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。


```js
  [(b)] = [3]; // 正确
  ({ p: (d) } = {}); // 正确
  [(parseInt.prop)] = [3]; // 正确
````  

> * 上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；
> * 其次它们的圆括号都不属于模式的一部分。
>    * 第一行语句中，模式是取数组的第一个成员，跟圆括号无关；
>    * 第二行语句中，模式是p，而不是d；
>    * 第三行语句与第一行语句的性质一致。

## 7、 用途

### 7.1 交换变量的值

> * 交换变量 `x` 和 `y` 的值，这样的写法不仅简洁，而且易读，语义非常清晰。

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

### 7.2 从函数返回多个值

> * 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

### 7.3 函数参数的定义

> * 解构赋值可以方便地将一组参数与变量名对应起来。

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

### 7.4 提取JSON数据

> * 解构赋值对提取JSON对象中的数据，尤其有用。

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number); // 42, "OK", [867, 5309]
```

### 7.5 函数参数的默认值

> * 指定参数的默认值，就避免了在函数体内部再写 `var foo = config.foo || 'default foo';`这样的语句。

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

### 7.6 遍历Map结构

> * 任何部署了`Iterator`接口的对象，都可以用`for...of`循环遍历。`Map`结构原生支持`Iterator`接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

> *　如果只想获取键名，或者只想获取键值，可以写成下面这样。

```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [value] of map) {
  // ...
}
```

### 7.7 输入模块的指定方法

> * 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```
