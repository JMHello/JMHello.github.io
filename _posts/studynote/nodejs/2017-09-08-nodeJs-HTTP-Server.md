---
layout: post
title: "nodeJs - HTTP服务器"
data: 2017-09-08 17:27:00 +0800
categories: 学习笔记
tag: nodes
---
* content
{:toc}

其他链接：

+ [javasript - 数据存储--cookie]({{ '/2017/08/29/js-Storage-Cookie' | prepend: site.baseurl }})

> 以下内容全部源于： 《Node.js权威指南》

<!-- more -->

## 一、创建HTTP服务器

### 1.1 http.createServer()

* 调用`http`模块中的`createServer()`方法即可。
* `createServer()`接受一个可选的参数：回调函数-----用于指定当接收到客户端请求时所需执行的处理。回调函数里有两个参数：
    * `request`：实际上是`http.IncomingMessage`对象，代表一个客户端的请求
    * `response`：实际上是`http.ServerResponse`对象，代表服务器端的响应对象
* `createServer()`返回被创建的服务器对象
```js
// 引入http
var http = require('http');
var server = http.createServer(function(request, response) {
  //...
})
```

* 如果不在`createServer()`中使用参数，可通过监听该方法创建的服务器对象的`request`事件【该事件在接收到客户端请求时触发】。以下代码的效果其实与上面的代码的效果是等价的。

```js
var http = require('http');
var server = http.createServer();
server.on('request', function(request, response) {
  //...
})
```

### 1.2 server.listen()

* 在创建`HTTP`服务器后，需指定该服务器所需监听的地址和端口。方法如下：
* `server.listen(port, [host], [backlog], [callback])`
    * `port`：端口号。【值为0时将会为`HTTP`服务器分配一个随机端口号】
    * `host`：（可选），监听的地址。【省略该地址，服务器将监听来自于任何`IPv4`地址的客户端连接】
    * `backlog`：（可选），整数值，默认值为`511`，指定位于等待队列中的客户端连接的最大数量。【一旦超过这个长度，`HTTP`服务器将开始拒绝来自新客户端的连接。】
    * `callback`：（可选），建立客户端连接后，会触发该服务器的`listening`事件，而该参数就是来指定`listening`事件触发时调用的回调函数
* 不使用`callback`参数，也可按如下：

```js
server.on('listening', function() {
  //...
})
```

### 1.3 server.close()

`server.close()`：用来关闭服务器。

* 当服务器被关闭时，触发`close`事件，可通过监听该事件并`callback`指定当服务器被关闭时所需执行的处理：

```js
server.on('close', function() {
  //...
})
```

### 1.4 error事件

* 在对`HTTP`服务器指定需要监听的地址及端口时，如果该地址及端口已被占用，将产生一个错误码“`EADDRIUSE`”,表示**用于监听的地址及端口已被占用**。同时触发了`HTTP`服务器的`error事件

```js
server.on('error', function(e) {
  if(e.code == 'EADDRINUSE') {
      //...
  }
})
```

### 1.5 connection事件

* 默认下，客户端和服务器没进行一次`HTTP`操作，都将建立一次连接，客户端与服务器端之间的交互通信完成后该连接就中断。
* 在`HTTP 1.1`中，支持长连接。
    * 如果客户端发出的请求头信息或服务器端发出的响应头信息中添加"`Connection:keep-alive`"，则`HTTP`连接将继续保持，客户端可以继续通过相同的连接向服务器端发出请求。
* 当客户端和服务器端建立连接时，触发`HTTP`服务器对象的`connection`事件
    * 回调函数中的参数`socket`：服务器端用于监听客户端请求的`socket`端口对象
    
```js
server.on('connection', function(socket) {
  console.log('客户端已连接。。。')
})
```

补充：控制台会输出两次“客户端已连接。。。”，原因如下
* 因浏览器中访问`HTTP`服务器时，浏览器会发出两次客户端请求
    1. 用户发出的请求
    2. 浏览器为页面在收藏夹中的显示图标（默认为：`favicon.ico`）而自动发出的请求

### 1.6 server.setTimeout()

* `server.setTimeout(msecs,callback)`：设置服务器的超时时间。当超过该超时时间后，客户端不可继续利用本次与`HTTP`服务器建立的连接，下次向该`HTTP`服务器发出请求时需重新建立连接。
    * `msecs`：整数，设置服务器的超时时间，单位：**毫秒**。【设为0时取消服务器的超时处理】
    * `callback`：回调函数，其参数`socket`----服务器端用于监听客户端请求的`socket`端口对象
* 当服务器超时时，触发服务器对象的`timeout`事件，可不使用`callback`参数

```js
server.on('timeout', function(socket) {
  //...
})
```

* `HTTP`服务器拥有的一个属性：`timeout`，整数值，单位毫秒，用于查看/修改服务器的超时时间

```js
server.timeout = 1000;
console.log(server.timeout);
```

## 二、总结

* 如何自己搭建一个简单的本地服务器呢？
    1. 创建`server`对象
    2. 监听端口
    3. keep-alive
    4. 错误监听
    5. 超时监听
    6. 关闭服务器
* 个人觉得 1-4是必不可少的，当然，5-6按自己需要使用