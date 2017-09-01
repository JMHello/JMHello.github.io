---
layout: post
title: "ES6 - 变量的解构赋值"
data: 2017-08-31 9:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}

其他链接：

+ [javascript - 数组]({{ '/2017/08/27/js-Array' | prepend: site.baseurl }})

> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/function](http://es6.ruanyifeng.com/#docs/function)

<!-- more -->

## 1、数组的解构赋值

### 1.1 基本用法

* `ES6` 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（`Destructuring`）。

以前，为变量赋值，只能直接指定值。

```js
let a = 1;
let b = 2;
let c = 3;

// ES6 允许写成下面这样。
let [a, b, c] = [1, 2, 3]; // 可以从数组中提取值，按照对应位置，对变量赋值。
````

> 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

* 下面是一些使用嵌套数组进行解构的例子。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

* 如果解构不成功，变量的值就等于undefined。【以下两种情况都属于解构不成功，foo的值都会等于undefined。】

```
let [foo] = [];
let [bar, foo] = [1];
```

* 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
   
```
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

* 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

```
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

> 上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

* 对于 Set 结构，也可以使用数组的解构赋值。

```
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

上面代码中，参数`p`的默认值是`x + 1`。这时，每次调用函数`foo`，都会重新计算`x + 1`，而不是默认`p`等于 `100`。

* 事实上，只要某种数据结构具有 `Iterator` 接口，都可以采用数组形式的解构赋值。

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

上面代码中，`fibs`是一个 `Generator` 函数（参见《`Generator` 函数》一章），原生具有 `Iterator` 接口。解构赋值会依次从这个接口获取值。

### 1.2 默认值 

* 解构赋值允许指定默认值。【如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。】

```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

>* 注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。

```js
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

* 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
// 因为x能取到值，所以函数f根本不会执行。
function f() {
  console.log('aaa');
}

let [x = f()] = [1];

// 上面的代码其实等价于下面的代码。
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

* 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError ,最后一个表达式之所以会报错，是因为x用到默认值y时，y还没有声明。
```
        
## 2、 对象的解构赋值

* 解构不仅可以用于数组，还可以用于对象。

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

**对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。**

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于`undefined`。

* 如果变量名与属性名不一致，必须写成下面这样。

```js
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

// 这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```

**也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。**

```js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

* 与数组一样，解构也可以用于嵌套结构的对象。

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

* 注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

* 下面是另一个例子。

```js
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

> 上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。

* 下面是嵌套赋值的例子。

```js
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
````

* 对象的解构也可以指定默认值。

```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
````

* 默认值生效的条件是，对象的属性值严格等于undefined。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

上面代码中，如果x属性等于null，就不严格相等于undefined，导致默认值不会生效。

* 如果解构失败，变量的值等于undefined。

```js
let {foo} = {bar: 'baz'};
foo // undefined
```

* 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```js
// 报错
let {foo: {bar}} = {baz: 'baz'};

let _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错
```

上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错。

* 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法----将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。
let x;
({x} = {x: 1});
```

上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。
只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

* 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

* 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。【将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。】

```js
let { log, sin, cos } = Math;
```

* 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，对应的值是3。方括号这种写法，属于“属性名表达式”，参见《对象的扩展》一章。

### 1.4 函数的 length 属性 

指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length`属性将失真。

```js
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
````

>* 上面代码中，`length`属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。
>    * 比如，上面最后一个函数，定义了`3`个参数，其中有一个参数`c`指定了默认值，因此`length`属性等于`3`减去`1`，最后得到`2`。
>    * 这是因为`length`属性的含义是：**该函数预期传入的参数个数**。
>        * 某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 `rest` 参数也不会计入`length`属性。
    
```js
(function(...args) {}).length // 0
````

* 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

```js
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
````

### 1.5 作用域

* 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（`context`）。
* 等到初始化结束，这个作用域就会消失。
* 这种语法行为，在不设置参数默认值时，是不会出现的。

```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
````
    
> 上面代码中，参数`y`的默认值等于变量`x`。调用函数`f`时，参数形成一个单独的作用域。  
在这个作用域里面，默认值变量`x`指向第一个参数`x`，而不是全局变量`x`，所以输出是`2`。

* 再看下面的例子。

```js
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
````

> 上面代码中，函数`f`调用时，参数`y = x`形成一个单独的作用域。  
这个作用域里面，变量`x`本身没有定义，所以指向外层的全局变量`x`。  
函数调用时，函数体内部的局部变量`x`影响不到默认值变量`x`。

* 如果此时，全局变量x不存在，就会报错。

```js
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined
````

* 下面这样写，也会报错。
 
```js
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined
````  

上面代码中，参数`x = x`形成一个单独作用域。实际执行的是`let x = x`，由于暂时性死区的原因，这行代码会报错“x 未定义”。

* 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。
```js
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer
````  

上面代码中，函数`bar`的参数`func`的默认值是一个匿名函数，返回值为变量`foo`。函数参数形成的单独作用域里面，并没有定义变量`foo`，所以`foo`指向外层的全局变量`foo`，因此输出`outer`。

* 如果写成下面这样，就会报错。

```js
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined
````  

上面代码中，匿名函数里面的`foo`指向函数外层，但是函数外层并没有声明变量`foo`，所以就报错了。

* 下面是一个更复杂的例子。

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
``` 

> 上面代码中，函数`foo`的参数形成一个单独作用域。  
这个作用域里面，首先声明了变量`x`，然后声明了变量`y`，`y`的默认值是一个匿名函数。  
这个匿名函数内部的变量`x`，指向同一个作用域的第一个参数`x`。  
函数`foo`内部又声明了一个内部变量`x`，该变量与第一个参数`x`由于不是同一个作用域，所以不是同一个变量。  
因此执行`y`后，内部变量`x`和外部全局变量`x`的值都没变。

* 如果将`var x = 3`的`var`去除，函数`foo`的内部变量`x`就指向第一个参数`x`，与匿名函数内部的`x`是一致的，所以最后输出的就是`2`，而外层的全局变量`x`依然不受影响。

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
``` 

### 1.6 应用

* 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```js
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
````  

上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（注意函数名throwIfMissing之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会运行。

* 另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。

```js
function foo(optional = undefined) { ... }
```

* 实际应用中，常见的类似数组的对象是`DOM` 操作返回的 `NodeList` 集合，以及函数内部的`arguments`对象。Array.from都可以将它们转为真正的数组。

* 只要是部署了`Iterator` 接口的数据结构，`Array.from` 都能将其转为数组。
    * 字符串和 `Set` 结构都具有 `Iterator` 接口，因此可以被Array.from转为真正的数组。

```js
    Array.from('hello')  // ['h', 'e', 'l', 'l', 'o']
    
    let namesSet = new Set(['a', 'b'])
    Array.from(namesSet) // ['a', 'b']
```
`
* 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。

```js
    Array.from([1, 2, 3]) // [1, 2, 3]
```

* 扩展运算符（...）也可以将某些数据结构转为数组。

    * 扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。
    * `Array.from` 方法还支持类似数组的对象。所谓类似数组的对象，`本质特征只有一点，即必须有length属性`。
    * 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

```js
// arguments对象
function foo() {
  var args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]

// 有本质特征的类数组
Array.from({ length: 3 });// [ undefined, undefined, undefined ]
```

* 对于还没有部署该方法的浏览器，可以用 `Array.prototype.slice` 方法替代。

```js
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

### 2.2 Array.from()的进阶（传第二个参数）

* 第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
//---- 例1
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x) // [1, 4, 9]

//------ 例2：取出一组DOM节点的文本内容。
let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)

//-------例3：将数组中布尔值为false的成员转为0。
Array.from([1, , 2, , 3], (n) => n || 0)  // [1, 0, 2, 0, 3]

//------例4：返回各种数据的类型。
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN) // ['object', 'object', 'number']

// ------- 例5：Array.from的第一个参数指定了第二个参数运行的次数。
Array.from({ length: 2 }, () => 'jack') // ['jack', 'jack']
```

### 2.2 Array.from()的进阶（传第三个参数）

* 如果map函数里面用到了`this`关键字，还可以传入 `Array.from` 的第三个参数，用来绑定 `this` 。

* `Array.from()` 可以将各种值转为真正的数组，并且还提供`map`功能。这实际上意味着，**只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法**。

### 2.3 Array.from()应用

* 将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
```js
function countSymbols(string) {
  return Array.from(string).length;
}
````

## 3、Array.of()

* `Array()`：只有当参数个数不少于`2`个时，`Array()`才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

* `Array.of`方法用于将一组值，转换为数组。
    * 主要目的：弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。
    * `Array.of`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。
    * `Array.of`总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
    
```js
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

* Array.of方法可以用下面的代码模拟实现。

```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

## 4、数组实例的 copyWithin(target, start, end)

* 数组实例的 `copyWithin`方法，在当前数组内部，将指定位置的成员复制到其他位置（`会覆盖原有成员`），然后返回当前数组。即：**使用这个方法，会修改当前数组**。
* 接受三个参数
    * target（必需）：从该位置开始替换数据。
    * start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    * end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数    

```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)  // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)  // [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)  // {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2); // Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);  // Int32Array [4, 2, 3, 4, 5]
```

## 5、数组实例的 find() 和 findIndex()

### 5.1 find()
* `find()`方法，用于找出第一个符合条件的数组成员。
    * 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出 `第一个`返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回 `undefined`。
        * find方法的回调函数可以接受三个参数，依次为 `当前的值`、 `当前的位置` 和 `原数组` 。

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

### 5.2 findIndex()

* 与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

### 5.3 两者共同点

1. 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
2. 两个方法都可以发现NaN，弥补了数组的`IndexOf`方法的不足。
    * `indexOf`方法无法识别数组的NaN成员，但是`findIndex`方法可以借助`Object.is` 方法做到。

```js
[NaN].indexOf(NaN) // -1

[NaN].findIndex(y => Object.is(NaN, y)) // 0
```

## 6、数组实例的fill()

* `fill`方法使用给定值，填充一个数组。

* `fill`方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

* `fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js
['a', 'b', 'c'].fill(7) // [7, 7, 7]

new Array(3).fill(7) // [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)  // ['a', 7, 'c']，从1号位开始，向原数组填充7，到2号位之前结束。
```

## 8、 数组实例的 entries()，keys() 和 values()

* `entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象，可以用 `for...of` 循环进行遍历，唯一的区别：
    * `keys()`是对键名的遍历。
    * `values()`是对键值的遍历。
    * `entries()`是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

//----如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## 8、 数组实例的 includes()

* `Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，

* 不会误判 `NaN`。

* 该方法的第二个参数表示搜索的起始位置，默认为`0`。
    * 如果第二个参数为负数，则表示倒数的位置。
    * 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true

[NaN].includes(NaN) // true
```

* 没有该方法之前，我们通常使用数组的 `indexOf` 方法，检查是否包含某个值。
    * `indexOf` 方法有两个缺点：
        1. 不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。
        2. 它内部使用严格相等运算符（`===`）进行判断，这会导致对NaN的误判。
        
```js
[NaN].indexOf(NaN)  // -1
```

* 下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。

```es6
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

* 另外，`Map` 和 `Set` 数据结构有一个 `has` 方法，需要注意与 `includes`区分。
    * `Map` 结构的 `has` 方法，是用来查找键名的，比如 `Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
    * `Set` 结构的 `has`方法，是用来查找值的，比如 `Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

## 9、数组的空位

* 数组的空位指，数组的某一个位置没有任何值。
    * 空位不是 `undefined`，一个位置的值等于`undefined`，依然是有值的。空位是没有任何值，`in`运算符可以说明这一点。

```js
Array(3) // [, , ,]，Array(3)返回一个具有3个空位的数组。

0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```

* ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
  * `forEach()`, `filter()`, `every()` 和`some()`都会跳过空位。
  * `map()`会跳过空位，但会保留这个值
  * `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。

```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

* ES6 则是明确将空位转为undefined。
    1. Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
    2. 扩展运算符（...）也会将空位转为undefined。
    3. copyWithin()会连空位一起拷贝。
    4. fill()会将空位视为正常的数组位置。
    5. for...of循环也会遍历空位。
    6. entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

```js
//-----1
Array.from(['a',,'b']) // [ "a", undefined, "b" ]

//-----2
[...['a',,'b']]
// [ "a", undefined, "b" ]
//-----3
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

//-----4
new Array(3).fill('a') // ["a","a","a"]

//-----5
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

//-----6
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```
