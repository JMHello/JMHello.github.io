---
layout: post
title: "javascript - 模块化"
data: 2018-02-23 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

<!-- more -->

## 一、 模块化的由来    

> * 如果一个js文件里有上千行代码，想想就可怕！所以，这也是模块化的由来
> * 模块化的意思就是：将相同的功能的代码放到一个js文件里，分块管理
> * 常常都说模块化和依赖
> * 比如说，你引用了jquery，那么你就是依赖了jquery
> * 所以，模块化绝对会和依赖联系在一起

---

![modularization](/styles/images/javascript/modularization/m-01.png)

> * 就像上图所展示的一样，`index.js` 一个文件就包含了上万行代码，想想就可怕
> * 所以，我们就根据代码的功能，拆分成 4 大模块： `common.js` 、`a.js`、`b.js`、`c.js`

## 二、命名冲突和变量污染

> * 下图的 `a.js` 和 `b.js` 就发生了命名冲突 （命名冲突指在相同作用域下，变量出现命名相同的情况）

![modularization](/styles/images/javascript/modularization/m-02.png)

> * 为了不影响 `a.js` 的 `keepMoving`，就把 `b.js` 的 `keepMoving` 修改成 `keepMoving2`，此时 `a.js` 和 `b.js` 由可以和平共处

![modularization](/styles/images/javascript/modularization/m-03.png)

> * 直到某一天，`a.js` 新建了一个全局变量 `b`，本来在 `b.js` 中，变量`b`默认为0，但由于 `a.js` 新建了一个变量`b`，
>   就造成了`a.js` 的 `b` 变量影响了 `b.js` 的 `b` 变量，我们称这种行为为变量污染

![modularization](/styles/images/javascript/modularization/m-04.png)

---

> * 从上面可知，只要有模块化， 命名冲突 和 变量污染 这两个问题就会存在
> * 为了解决这两个问题：我们要为模块简历自己的命名空间，避免全局污染

![modularization](/styles/images/javascript/modularization/m-05.png)

## 三、命名空间

> * 建立命名空间有以下方法：

![modularization](/styles/images/javascript/modularization/m-06.png)

### 3.1 前缀命名空间

![modularization](/styles/images/javascript/modularization/m-07.png)

> * 优点：有效防止命名冲突
> * 缺点：仍然有大量的全局变量
> * 总的来说，前缀命名空间是治标不治本

### 3.2 对象命名空间

![modularization](/styles/images/javascript/modularization/m-08.png)

> * 当我们的功能越来越复杂的时候，可能会出现嵌套对象命名空间
> * 除此之外，还有一个问题：所有属性和方法都会暴露，没有私有变量，即：其他模块是可以修改我们这个模块的。

### 3.3 IIFE 立即执行函数表达式

> * 立即执行函数表达式(`IIFE`，`Immediately Invoked Function Expression`)

![modularization](/styles/images/javascript/modularization/m-09.png)

> * 我们可以利用立即执行表达式来创建私有作用域，避免变量冲突！
> * 通常我们会使用立即执行表达式来实现模块！

![modularization](/styles/images/javascript/modularization/m-10.png)

> * 将 `b.js` 的函数、变量存储到 `IIFE` 中，并通过 `return` 语句，暴露模块的属性和方法，最终将 `IIFE` 赋值给一个变量 `moduleB`
> * 这样就通过立即执行表达式来实现模块！

## 四、模块依赖

> * 模块较少的情况下，还可以手动按依赖顺序加载，如下图所示：

![modularization](/styles/images/javascript/modularization/m-11.png)

> * 但是，当模块多起来，模块间的依赖就变得复杂，导致难以手动按依赖顺序加载，如下图所示

![modularization](/styles/images/javascript/modularization/m-12.png)

## 五、模块化规范

### 5.1 由来

> * 模块化肯定会遇到这两个问题：命名冲突以及模块依赖的管理
> * 不同开发者解决这些问题的方法不同
> * 为了统一，所以出现了模块化规范！
>   * 统一方法定义模块
>   * 不需要手动维护依赖

![modularization](/styles/images/javascript/modularization/m-13.png)

> * 模块化规范主要有以下三种：

![modularization](/styles/images/javascript/modularization/m-14.png)

### 5.2 CommonJS

![modularization](/styles/images/javascript/modularization/m-15.png)

> * `CommonJS` 主要有以下内容：

![modularization](/styles/images/javascript/modularization/m-16.png)

> * 文件即模块：
>   * 一个文件代表一个模块
>   * 每个模块有自己的作用域，里面定义的一些变量和函数都是私有的，对于其他文件来说是不可见的

> * `module` 变量代表当前模块

---

> * 实例：

![modularization](/styles/images/javascript/modularization/m-17.png)

### 5.3 AMD & RequireJS

![modularization](/styles/images/javascript/modularization/m-18.png)

> * `CommonJS` 适用于服务器端，不适用于浏览器端
>   * 因为 `CommonJS` 是同步加载模块的
>   * 对于服务器端而言，文件存储在本地硬盘，加载快，可同步加载
>   * 但是，对于浏览器端而言，文件是需要通过网络加载的，耗时，同步加载阻塞页面
>   * 所以，对于浏览器端而言，需要异步加载所需的模块！因此，`AMD` 诞生了！

---

> * `AMD`，`Asynchronous Module Definition`，异步模块定义
>   * 采用异步加载模块，模块加载并不会影响后面语句的执行

![modularization](/styles/images/javascript/modularization/m-19.png)
