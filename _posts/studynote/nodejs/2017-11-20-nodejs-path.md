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






