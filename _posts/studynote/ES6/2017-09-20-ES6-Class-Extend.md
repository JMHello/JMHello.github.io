---
layout: post
title: "ES6 - Class的继承"
data: 2017-09-20 9:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}


> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/class-extends](http://es6.ruanyifeng.com/#docs/class-extends)

<!-- more -->

## 一、class继承

### 1.1 简介

* `class`可以通过`extends`关键字实现继承。
    * `super`关键字：表示父类的构造函数，用来创建父类的`this`对象。

* `ES5` 的继承实质：是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。
* `ES6` 的继承实质：是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

```js
// Point 类
class Point {
    
}
// ColorPoint 类继承 Point 类
class ColorPoint extends Point {
    constructor (x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }
    
    toString () {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
```

* 子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。
    * 这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。
    * 如果不调用`super`方法，子类就得不到`this`对象。
* 在子类的`constructor`中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。
    * 这是因为子类实例的构建，是基于对父类实例加工，只有`super`方法才能返回父类实例。

```js
class Point { /* ... */ }

// ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。
class ColorPoint extends Point {
  constructor() {
  }
}
let cp = new ColorPoint(); // ReferenceError

// 没有调用super就使用了this
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

* 如果子类没有定义`constructor`方法，这个方法会被默认添加。
    * 即：不管有没有显式定义，任何一个子类都有`constructor`方法。

### 1.2 Object.getPrototypeOf()

* `Object.getProtypeOf()`：用来从子类上获取父类
    * 可使用这个方法来判断一个类是否继承了另一个类

```js
Object.getPrototypeOf(ColorPoint) === Point; // true
```

### 1.3 super 关键字

* **1.当作函数使用的情况**
    * `super`作为函数调用时，代表父类的构造函数。
    * ES6 要求，**子类的构造函数必须执行一次super函数**， 否则会报错。
    
```js
class A{
    constructor () {
        console.log(new.target.name);
    }
}

class B extends A {
    constructor () {
        super(); 
    }
}

new A(); // A
new B(); // B
```

*  `super`虽然代表了父类`A`的构造函数，但是**返回的是子类B的实例**，即 **`super`内部的`this`指的是`B`** ，
因此`super()`在这里相当于`A.prototype.constructor.call(this)`。
    * 验证上述说法：使用`new.target`，它指向当前正在执行的函数。
        * 在`super()`执行时，它指向的是子类`B`的构造函数，而不是父类`A`的构造函数。也就是说，`super()`内部的`this`指向的是`B`。

* 作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。

* **2.`super`作为对象**
    * 在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
    * 由于`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。

```js
class A {
    constructor () {
        this.a = 2;
    }
    p () {
        return 33;
    }
}

A.prototype.b = 22;

class B extends A {
    constructor () {
        super();
        console.log(super.p()); // 33
    }
    
    get m () {
        console.log(super.a); // undefined
        console.log(super.b); // 22
    }
}

let b = new B ();
b.m();
```

* 子类`B`中的`super.p()`就是将`super`当作一个对象来使用。
    * 此时，`super`在普通方法中，因此`super => A.prototype`，即：`super.p() => A.prototype.p()`;
* `a`是父类`A`的实例属性，`super.p`就无法引用它。
* 如果属性定义在父类的原型对象上，super就可以取到。
    * `b`定义在了`A.protype`上，所以`super.b`可以获取到值
    

* ES6 规定，通过`super`调用父类的方法时，`super`会绑定子类的`this`
    * 由于绑定子类的`this`，所以如果通过`super`对某个属性赋值，这时`super`就是`this`，赋值的属性会变成子类实例的属性。

```js
class A {
    constructor () {
        this.x = 1;
    }
    print () {
        console.log(this.x);
    }
}

class B extends A {
    constructor () {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); //undefined
        console.log(this.x); // 3
    }
    m () {
        super.print();
    }
}

var b = new B ();
b.m();
```

* 代码分析：
    * `super.print()`虽然调用的是`A.prototype.print()`，但是`A.prototype.print()`会绑定子类`B`的`this`，
      导致输出的是2，而不是1。
        * 即：实际上执行的是`super.print.call(this)`。
    * `super.x`赋值为3，这时等同于对`this.x`赋值为3。而当读取`super.x`的时候，读的是`A.prototype.x`，所以返回`undefined`。  

* **如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。**
    * 使用`super`的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
        * 如果能清晰地表明`super`的数据类型，就不会报错。
    
```js
class Parent {
    static myMethod (msg) {
        console.log(`static:${msg}`);
    }
    
    myMethod (msg) {
        console.log(`instance: ${msg}`);
    }
}

// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
class Child extends Parent {
    static myMethod (msg) {
        super.myMethod(msg);
    }
    
    myMethod (msg) {
        super.myMethod(msg);
        console.log(super); // 报错，因为super，无法看出是作为函数使用，还是作为对象使用
        
        // super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super绑定Child的this，所以super.valueOf()返回的是一个Child的实例。
        console.log(super.valueOf() instanceof Child); 
    }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); //instance 2
```

* 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

```js
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

### 1.4 类的 prototype 属性和__proto__属性 

* `es5`：每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。
* `Class` 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此**同时存在两条继承链**。
    * 第一条：子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
    * 第二条：子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```js
class A {
    //..
}
class B extends A {
    //...
}

console.log(B.__proto__ === A); //true
console.log(B.prototype.__proto__ === A.prototype); //true
```

* 这样的结果是因为，类的继承是按照下面的模式实现的。

```js
class A {
    //..
}
class B extends A {
    //..
}
// B的实例继承A的示实例
Object.setPrototypeOf(B.prototype, A.prototype); // B.prototype.__proto__ = A.prototype;

// B的实例继承A的静态属性
Object.setPrototypeOf(B, A); // B.__proto__ = A;

const b = new B ();
```

* 这两条继承链，可以这样理解：
    * 作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）；
    * 作为一个构造函数，子类（`B`）的原型对象（`prototype`属性）是父类的原型对象（`prototype`属性）的实例。

```js
Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

**extends 的继承目标**

* 只要是一个有`prototype`属性的函数都能被继承。接下来讲一下三种特殊情况：

* 1.子类继承`Object`类。
    * `A`其实就是构造函数`Object`的复制，`A`的实例就是`Object`的实例。

    
```js
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```
    
* 2.不存在任何继承。
    * `A`作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Function.prototype`。
    * 但是，`A`调用后返回一个空对象（即`Object`实例），所以`A.prototype.__proto__`指向构造函数（`Object`）的`prototype`属性。
    
```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

* 3.子类继承null。
    * `A`也是一个普通函数，所以直接继承`Function.prototype`。
    * 但是，`A`调用后返回的对象不继承任何方法，所以它的`__proto__`指向`Function.prototype`
    
```js
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true

// 实质上执行了下面的代码。
class C extends null {
  constructor() { return Object.create(null); }
}
```

**实例的 __proto__ 属性**

* 子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。
    * 即：**子类的原型的原型，是父类的原型**。
    * 因此，通过子类实例的`__proto__`.`__proto__`属性，可以修改父类实例的行为。
    
```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true

// 在ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
```

### 1.5 原生构造函数的继承

* 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。 
    * Boolean()
    * Number()
    * String()
    * Array()
    * Date()
    * Function()
    * RegExp()
    * Error()
    * Object()

* 原生构造函数不能继承。
    * 原因：`ES5` 是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于**父类的内部属性无法获取**，导致无法继承原生的构造函数。

* 例1：不能自己定义一个`Array`的子类。
    * 原因：
        * 因为子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。
        * **原生构造函数会忽略`apply`方法传入的`this`**。
            * 即：原生构造函数的`this`无法绑定，导致拿不到内部属性。
    * `length`属性异常的原因：
        * `Array`构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新`length`属性，这个内部属性无法在子类获取，导致子类的`length`属性行为不正常。
    
```js
// 定义一个Array的子类
function MyArray() {
    Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
})

// 使用MyArray
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

* 例2：让一个普通对象继承Error对象。
    * 想通过`Error.call(e)`这种写法，让普通对象`e`具有`Error`对象的实例属性。
    * 但是，`Error.call()`完全忽略传入的第一个参数，而是返回一个新对象，`e`本身没有任何变化。
    * 这证明了`Error.call(e)`这种写法，无法继承原生构造函数。

```js
var e = {};

Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []
```

* **ES6 允许继承原生构造函数定义子类**
    * 因为 `ES6` 是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。

* 下面是一个继承Array的例子。

```js
class MyArray extends Array {
    constructor (...args) {
        super(...args);
    }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

> 上例说明：`extends`关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
   因此可以在原生数据结构的基础上，定义自己的数据结构。

* 定义了一个带版本功能的数组。

```js
class VersionedArray extends Array {
    constructor () {
        super();
        this.history = [[]];
    }
    
    // VersionedArray会通过commit方法，将自己的当前状态生成一个版本快照，存入history属性。
    commit () {
        this.history.push(this.slice());
    }
    
    // revert方法用来将数组重置为最新一次保存的版本。
    revert () {
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}

// VersionedArray依然是一个普通数组，所有原生的数组方法都可以在它上面调用。
var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]
```

* 自定义Error子类的例子，可以用来定制报错时的行为。

```js
class ExtendableError extends Error {
    constructor (msg) {
        super();
        this.msg = msg;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

class MyError extends ExtendableError {
    constructor (msg) {
        super(msg);
    }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
```

* **继承Object的子类，有一个行为差异。**

```js
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false
```

* `NewObj`继承了`Object`，但是无法通过`super`方法向父类`Object`传参。
    * 因为 `ES6` 改变了`Object`构造函数的行为，一旦发现`Object`方法不是通过`new Object()`这种形式调用，`ES6` 规定`Object`构造函数会忽略参数。

### 1.6 Mixin 模式的实现 

* Mixin 模式指的是，将多个类的接口“混入”（mix in）另一个类。它在 ES6 的实现如下。
    * mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
    
```js
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```