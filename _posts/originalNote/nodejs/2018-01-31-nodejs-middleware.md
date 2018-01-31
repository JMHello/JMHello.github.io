---
layout: post
title: "nodejs - 中间件 middleware"
date: 2018-01-31 15:00:00 +0800 
categories: 原创
tag: node.js
---
* content
{:toc}

<!-- more -->

> * 使用过 `koa` 的朋友们都知道，`koa` 绝大部分都是依赖于中间件，今天我们就来分析分析 `koa` 的中间件的实现

## 一、中间件

### 1.1 从实例出发

> * 直接看下面的实例，源于（`blog`）

```js
const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

// ...

// middleware

app.use(logger());

app.use(render);

app.use(koaBody());

// route definitions

// ...

app.use(router.routes());

// ...

// listen

if (!module.parent) app.listen(3000);
```

### 1.1 app.use()

> * 看到以上代码，我猜测或许是通过 `app.use(xxxFn())` 去使用中间件，那么我们先来看看`use`函数【源于 `application.js`】

```js
 /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }
```

> * 你会发现，`use` 函数只是将函数 `fn` 添加到 `this.middleware`这个数组里，并没有做其他事情，这也说明了：并不是 `app.use()` 调用了中间件

### 1.3 app.listen()

> * 除了`app.use`，就只有`app.listen` ，因此，我猜测，或许是这里调用中间件的。先看看`listen`的代码：

```js
 /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
```

> * 就三行代码，很简单，但是从字面上看，这三行代码与中间件没有任何关系，难道这样就`over`了？

### 1.4 this.callback()

> * 但我留意到了`this.callback()`，这明显是一个回调函数，或许这里有转机，先看看`callback`的代码：

```js
/**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */

  callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
```

> * 皇天不负有心人，终于看到与中间件有关的代码了！

### 1.5 compose()

> * `const fn = compose(this.middleware)`，先看这一行代码都做了些啥，直接跳去`compose`函数：

```js
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

> * 从上述代码可知道：
> * `compose` 函数是一个单例函数，主要使用递归的思想控制中间件的调用，并且返回的是一个`Promise`对象；
> * 中间件必须是一个函数，并且其存储的形式必须是一个数组 
> * `const fn = compose(this.middleware)` 中的 `fn` 实际上为 `function (context, next) {}`

> * 以下是个人基于`compose`函数做的一个小测试：
> * [demo](/effects/demo/nodejs/middleware/v1.html)

```js
    async function f1 (context, next) {
      await next()
      console.log(1)
    }

    async function f2 (context, next) {
      await next()
      console.log(2)
    }

    async function f3 (context, next) {
      console.log(3)
//      next()
    }

    async function f4 (context, next) {
      console.log(4)
//      next()
    }

    // 中间件数组
    let mw = [f1, f2, f3, f4]
    // context
    let ctx = {}

    const fn = compose(mw)
    const result = fn(ctx)
    console.log(result)
```

> * 上述代码我发现了一件事情，作为中间件，必须包含以下参数，才能调用中间件成功

```js
// 简单的话
function fn (context, next) {
  next()
}

// 或者
function foo() {
  return function (context, next) {
    
  }
}
```

> * `next` 这个参数不可缺少，个人觉得它代表的含义就是：调用下一个中间件。
> * 就像上面所测试的一样，最后只输出 `3 2 1`，缺少了 4，实际上就是因为在`f3`的时候，没有`next()` 即调用下一个中间件。
> * 当然，这个测试只是单纯想知道`compose`函数究竟想干嘛，真实的中间件绝对没有像上面的代码那么简单。
> * 如果看过`koa`的相关中间件，你会发现，单纯依靠`compose`函数，也是无法真实调用中间件的，所以我们接着往下看。

### 1.6 handleRequest()

> * 理解了 `compose` 函数后，再次回到`this.callback`函数

```js
callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
}
```

> * 通过`compose`函数处理完`this.middleware`后得出的`fn`将作为`this.handleRequest()`的第二个参数，接下来看`this.handleRequest` 的函数

```js
/**
   * Handle request in callback.
   *
   * @api private
   */

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
```

> * 终于找到了，这一行代码 `return fnMiddleware(ctx).then(handleResponse).catch(onerror);` 才是调用中间件的代码！其等价于：

```js
(function (context, next) {})(ctx, undefined)
.then(handleResponse)
.catch(onerror)
```
> * 实际上，只传了一个`context`的参数

## 二、实例讲解

> * 上面讲了辣么多，接下来就结合例子中的4个中间件以及上述所分析的，总结一遍中间件实现的过程！

```js
// 第一次
index = -1
dispatch(0)
index = i = 0
fn = middleware[0] = logger
return Promise.resolve(logger(ctx, function next () {
  return dispatch(1)
}))
```

> * 看一下`logger.js`

```js
function dev (opts) {
  return async function logger (ctx, next) {
    // request
    const start = Date.now()
    console.log('  ' + chalk.gray('<--') +
      ' ' + chalk.bold('%s') +
      ' ' + chalk.gray('%s'),
        ctx.method,
        ctx.originalUrl)

    try {
      await next()
    } catch (err) {
      // log uncaught downstream errors
      log(ctx, start, null, err)
      throw err
    }
    // ...
  }
}
```

> * `app.use(logger())` ，说明 `dev` 函数已执行了一遍，所以最终`logger`函数为：

```js
async function logger (ctx, next) {
    // request
    const start = Date.now()
    console.log('  ' + chalk.gray('<--') +
      ' ' + chalk.bold('%s') +
      ' ' + chalk.gray('%s'),
        ctx.method,
        ctx.originalUrl)

    try {
      await next()
    } catch (err) {
      // log uncaught downstream errors
      log(ctx, start, null, err)
      throw err
    }
    // ...
}
```

> * 最终结果：

```js
// 第一次
index = -1
dispatch(0)
index = i = 0
fn = middleware[0] = logger
return Promise.resolve(logger(ctx, function next () {
  return dispatch(1)
}))

async function logger (ctx, next) {
  // request
  const start = Date.now()
  console.log('  ' + chalk.gray('<--') +
    ' ' + chalk.bold('%s') +
    ' ' + chalk.gray('%s'),
      ctx.method,
      ctx.originalUrl)

  try {
    await next()
  } catch (err) {
    // log uncaught downstream errors
    log(ctx, start, null, err)
    throw err
  }
  
  // ...
}
```

> * 从上面代码可以看到 `async + await` 的组合，因此，需要成为 `koa` 的中间件，必须要实现对 `next` 函数的等待，这样的话，对于 `/blog/app.js` 来说，中间件的执行顺序实质上如下：

![middleware](/styles/images/nodejs/middleware/middleware-01.jpg)

## 三、总结

> * 以下是个人学习中间件的过程：

![middleware](/styles/images/nodejs/middleware/middleware-01.png)

> * 之前学习别人的源码就真的是直接去看别人的源码，然后看到一脸蒙蔽，觉得无从入手。

> * 这次学习`koa`的中间件，换了一个思维去学习：先从实例出发，找到代码的入口，一步一步学习。这个方法完爆了我之前看源码的方法！












