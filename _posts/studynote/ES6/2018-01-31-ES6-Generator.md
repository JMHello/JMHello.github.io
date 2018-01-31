---
layout: post
title: "ES6 - Generator 函数的语法"
data: 2018-01-31 19:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}

> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/generator](http://es6.ruanyifeng.com/#docs/generator)

<!-- more -->

## 一、基本概念

> * `Generator` 函数是一个状态机，封装了多个内部状态。

> * 执行 `Generator` 函数会返回一个遍历器对象，也就是说，`Generator` 函数除了状态机，还是一个遍历器对象生成函数。
> * 返回的遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态。

> * 形式上，`Generator` 函数是一个普通函数，但是有两个特征。
>   * 一是，`function` 关键字与函数名之间有一个星号，例如：`function *hello(){}`；
>   * 二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。


> * [demo](/effects/demo/es6/generator/v1.html)

```js
 // Generator 函数
    function *helloWorldGenerator () {
      yield `hello`
      yield 'world'
      return 'ending'
    }

    // 调用 Generator 函数
    const hw = helloWorldGenerator()
    console.log(hw)

    // next
    console.log(hw.next()) // {value: "hello", done: false}
    console.log(hw.next()) // {value: "world", done: false}
    console.log(hw.next()) // {value: "ending", done: true}
    console.log(hw.next()) // {value: undefined, done: true}
```

> * `Generator` 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。
> * 每次调用遍历器对象的 `next` 方法，就会返回一个有着 `value` 和 `done` 两个属性的对象。
> * `value` 属性表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值；`done` 属性是一个布尔值，表示是否遍历结束。

## 二、yield表达式

### 2.1 基础 

> * 遍历器对象的 `next` 方法的运行逻辑：
>   * （1）遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。
>   * （2）下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。
>   * （3）如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。
>   * （4）如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`。

> * `yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行

```js
function* gen() {
  yield  123 + 456;
}
```

> * 上面代码中，`yield` 后面的表达式 `123 + 456`，不会立即求值，只会在 `next` 方法将指针移到这一句时，才会求值。

> * `yield` 表达式只能用在 `Generator` 函数里面，用在其他地方都会报错。
> * `yield` 表达式如果用在另一个表达式之中，必须放在圆括号里面，例如：` console.log('Hello' + (yield 123))`

### 2.2 yield 与 return

> * 相似：都能返回紧跟在语句后面的那个表达式的值。
> * 区别：每次遇到 `yield` ，函数暂停执行，下一次再从该位置继续向后执行，而 `return` 语句不具备位置记忆的功能。
>   * 一个函数里面，只能执行一次（或者说一个）`return` 语句，但是可以执行多次（或者说多个）`yield` 表达式。
>   * 正常函数只能返回一个值，因为只能执行一次 `return`；`Generator` 函数可以返回一系列的值，因为可以有任意多个 `yield`。

## 三、next方法的参数

> * `yield` 表达式本身没有返回值，或者说总是返回 `undefined`。
> * `next` 方法可以带一个参数，该参数就会被当作上一个 `yield` 表达式的返回值。

> * [demo](/effects/demo/es6/generator/v2.html)

```js
   // Generator 函数
    function *foo (x) {
      const y = 2 * (yield (x + 1))
      console.log(`y = ${y}`) 

      const z = yield (y / 3)
      console.log(`z = ${z}`) 

      console.log(`x + y + z = ${x + y + z}`) 
      return (x + y + z)
    }

    // 调用 Generator 函数
    const f1 = foo(5)

    // next
    console.log(`---f1----`)
    console.log(f1.next()) // {value: 6, done: false}
    console.log(f1.next()) // {value: NaN, done: false}
    console.log(f1.next()) // {value: NaN, done: true}

    // 调用 Generator 函数
    const f2 = foo(5)

    // next
    console.log(`---f2----`)
    console.log(f2.next()) // {value: 6, done: false}
    console.log(f2.next(12)) // {value: 8, done: false}
    console.log(f2.next(13)) // {value: 42, done: true}
```

---

> * 如果想要第一次调用 `next` 方法时，就能够输入值，可以在 `Generator` 函数外面再包一层。
> * [demo](/effects/demo/es6/generator/v3.html)

```js
    // Generator 函数
    function wrapper (generatorFn) {
        return function (...args) {
          let generatorObj = generatorFn(...args)
          console.log(generatorObj)
          generatorObj.next()
          return generatorObj
        }
    }

    const wrapped = wrapper(function* () {
      console.log(`First input: ${yield}`)
      return `DONE`
    })

    wrapped().next(`he`)
    wrapped().next(`jm`)
```

> * 上面代码中，`Generator` 函数如果不用 `wrapper` 先包一层，是无法第一次调用 `next` 方法，就输入参数的。

## 四、for..of循环

> * `for...of` 循环可以自动遍历 `Generator` 函数时生成的 `Iterator` 对象，且此时不再需要调用 `next` 方法。

```js
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }

  for (let v of foo()) {
    console.log(v);
    // 1 2 3 4 5
  }
```

> * 一旦 `next` 方法的返回对象的 `done` 属性为 `true`，`for...of` 循环就会中止，且不包含该返回对象，所以上面代码的 `return` 语句返回的6，不包括在 `for...of` 循环之中。

---

> * 利用 `for...of` 循环，可以写出遍历任意对象（`object`）的方法。
> * 原生的 `JavaScript` 对象没有遍历接口，无法使用 `for...of` 循环，通过 `Generator` 函数为它加上这个接口，就可以用了。

```js
/**
   * 通过 Generator 函数objectEntries为它加上遍历器接口，就可以用for...of遍历
   */
  function *objEntries () {
      console.log(this) // {name: "jm", age: 20, Symbol(Symbol.iterator): ƒ}
      let propKeys = Object.keys(this)
      console.log(propKeys) // ["name", "age"]
      for (let propKey of propKeys) {
        yield [propKey, this[propKey]]
      }
    }

    let person = {
      name: 'jm',
      age: 20
    }

    // 将 Generator 函数加到对象的Symbol.iterator属性上面。
    person[Symbol.iterator] = objEntries

    for (let [key, value] of person) {
      console.log(`${key} = ${value}`)
    }
    // name = jm
    // age = 20
```