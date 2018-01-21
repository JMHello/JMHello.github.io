---
layout: post
title: "nodejs - path模块"
date: 2017-11-20 15:00:00 +0800 
categories: 学习笔记
tag: node.js
---
* content
{:toc}

<!-- more -->



## 一、path模块

### 1.1 path

![path](/styles/images/nodejs/path/path-01.png)

### 1.2 path.parse(url)

> * `path.parse(url)`：返回一个对象：
>   * `dir` ===》`path.dirname(url)`：返回路径中代表文件夹的部分
>   * `base` ===》`path.basename(url)`：返回路径中的最后一部分
>   * `ext` ===》`path.extname(url)`：返回路径中文件的后缀名
>   * `name` ：

> * 例1：

```js
const url = 'http://localhost:8080/static/css/index.css'

console.log(path.parse(url))
/*
{ root: '',
  dir: 'http://localhost:8080/static/css',
  base: 'index.css',
  ext: '.css',
  name: 'index'
}
*/

console.log(path.dirname(url)) // http://localhost:8080/static/css
console.log(path.basename(url)) // index.css
console.log(path.extname(url)) // .css
```
---

> * 例2：

```js
const url_2 = 'http://www.jmazm.com/2017/12/25/discrimination-new-and-function-call/'

console.log(path.parse(url_2))
/*
{ root: '',
  dir: 'http://www.jmazm.com/2017/12/25',
  base: 'discrimination-new-and-function-call',
  ext: '',
  name: 'discrimination-new-and-function-call'
 }
*/

console.log(path.dirname(url_2)) // http://www.jmazm.com/2017/12/25
console.log(path.basename(url_2)) // discrimination-new-and-function-call
console.log(path.extname(url_2)) // ''
```

### 1.3  path.resolve()

> * `path.resolve()`： 方法会把一个路径或路径片段的序列解析为一个绝对路径。
> * 给定的路径的序列是从右往左被处理的，后面每个 `path` 被依次解析，直到构造完成一个绝对路径。

```js
const a = '/a'
const b = '/b'
const c = './c'
const d = '../d'
const dirname = __dirname

// E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel
console.log(dirname)

// E:\a
console.log(path.resolve(dirname, a))
// E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\c
console.log(path.resolve(dirname, c))
// E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\d
console.log(path.resolve(dirname, d))

// E:\a
console.log(path.resolve(a))
// E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\c
console.log(path.resolve(c))
// E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\d
console.log(path.resolve(d))

// E:\b\c
console.log(path.resolve(a, b, c))
// E:\d
console.log(path.resolve(a, b, d))

// E:\b\d
console.log(path.resolve(a, b, c, d))

// E:\a
console.log(path.resolve(c, a))
```

### 1.4 path.join()

```js
const http = require('http');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const a = '/a'
    const b = '/b'
    const c = './c'
    const d = '../d'
    const dirname = __dirname

    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel
    console.log(dirname)

    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\a
    console.log(path.join(dirname, a))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\c
    console.log(path.join(dirname, c))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\d
    console.log(path.join(dirname, d))

    // \a
    console.log(path.join(a))
    // c
    console.log(path.join(c))
    // ..\d
    console.log(path.join(d))

    // \a\b\c
    console.log(path.join(a, b, c))
    // \a\d
    console.log(path.join(a, b, d))

    // \a\b\d
    console.log(path.join(a, b, c, d))

    // \c\a
    console.log(path.join(c, a))
    res.end('ok');
  }
})

server.listen(3000);
```






