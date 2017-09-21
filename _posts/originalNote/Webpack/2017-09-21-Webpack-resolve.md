---
layout: post
title: "Webpack - resolve"
date: 2017-09-21 09:00:00 +0800 
categories: 原创
tag: Webpack
---
* content
{:toc}


<!-- more -->


## 1. resolve.extensions

* `resolve.extensions`：是一个用来解析模块的数组。以下是默认的`resolve.extensions`

```
resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".json"]
}
```

* 补充：
    * 空字符串`""`代表：如果希望自己的模块添加扩展名，那么就需要在数组里添加一个空字符串
    * 如果在配置文件中重新定义`resolve.extensions`，那么就会覆盖默认的`resolve.extensions`。

* 简单理解：配置了`resolve.extensions`，我们就不再需要为我们的模块添加后缀名了。

```js
// 配置文件
resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".json"]
}

// index.js
var move = require('./move'); // 由于配置文件里配置了".js"这个后缀名，所以这里引入模块的时候就不需要再添加'.js'了
```
