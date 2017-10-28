---
layout: post
title: "nodeJs - HTTP服务器 - 中篇 - http.IncomingMessage"
data: 2017-10-26 17:27:00 +0800
categories: 学习笔记
tag: node.js
---
* content
{:toc}

其他链接：

+ [nodeJs - HTTP服务器 - 上篇](http://www.jmazm.com/2017/09/08/nodeJs-HTTP-Server1/)
+ [nodeJs - HTTP服务器 - 下篇 - http.ServerResponse]({{ '/2017/10/26/nodeJs-HTTP-Server3' | prepend: site.baseurl }})

> 以下内容全部源于： 《Node.js权威指南》

<!-- more -->

## 一、获取客户端请求信息

### 1.1 http.IncomingMessage

> * `http.IncomingMessage`对象：用于读取客户端请求流中的数据 【`createServer` 中第一个参数 - `request`】
>     * 当从客户端请求流中读取到新的数据时触发`data`事件
>    * 当读取完客户端请求流中的数据时触发`end`事件

> * `http.IncomingMessage`对象拥有的一些属性：
>    * `method`：字符串，客户端向服务器端发送请求时使用的方法，`POST`
>    * `url`：字符串，客户端发送请求时所使用的 `URL`。【常用来判断客户端请求的页面及需要执行的处理。】
>    * `headers`：客户端发送的请求头对象，存放客户端发送的所有请求头信息，包括`cookie`以及浏览器的各种信息
>    * `httpVersion`：字符串，客户端发送的`HTTP`版本
>    * `trailers`：客户端发送的`trailer`对象。它存放了客户端附加的一些`HTTP`头信息。该对象被包含在客户端发送的请求数据之后，因此只有当`http.ImcomingMessage`对象的`end`事件触发之后才能读取到`trailer`对象中的信息
>    * `socket`：服务器端用于监听客户端请求的`socket`端口对象

## 1.2 实例 - 在文件中保存客户端请求信息

```js
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var out = fs.createWriteStream('./request.log');
    out.write('客户端请求所用方法为：' + req.method + '\r\n');
    out.write('客户端请求所用url字符串为：' + req.url + '\r\n');
    out.write('客户端请求头对象为：' + JSON.stringify(req.headers) + '\r\n');
    out.write('客户端请求所用 HTTP 版本为：' + req.httpVersion + '\r\n');
  }
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

> * 运行过程

![relationship-map]({{ '/effects/images/nodejs/http/http-03.gif' | prepend: site.baseurl }})

### 1.3 req 的 data 事件

> * `req` 的 `data` 事件可以接收到前端传来的数据

```js
req.on('data', function(data) {
  // ...
})
```



