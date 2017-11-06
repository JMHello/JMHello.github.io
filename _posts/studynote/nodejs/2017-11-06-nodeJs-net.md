---
layout: post
title: "nodeJs - 实现基于TCP与UDP的数据通信"
data: 2017-11-06 09:27:00 +0800
categories: 学习笔记
tag: node.js
---
* content
{:toc}



<!-- more -->

## 一、使用 net 模块实现基于 TCP 的数据通信

### 1.1 创建 TCP 服务器

```js
var server = net.createServer([options], [connectionListener]);
```

> * `options`：对象。
>   * 其中 `allowHalfOpen` 属性：
>       * 值为`false`【默认值】, 当`TCP`服务器接收到客户端发送的一个 `FIN`包时将会回发一个`FIN`包 ；
>       * 值为`true`，当`TCP`服务器接收到客户端发送的一个 `FIN`包时不会回发一个`FIN`包，这使得`TCP`服务器可以继续向客户端发送数据，但不会继续接受客户端发送的数据。
>       * 开发者必须调用 `end` 方法来关闭 `socket` 连接。

> * `connectionListener`：指定客户端与服务器建立连接时所要调用的回调函数。`function(socket){}`

### 1.2 listen

> * `callback`：回调函数，无任何传参数。等价于 `server.on('listen', function(){})`

> * 法1

```js
server.listen(port, [host], [backlog], [callback]);
```

> * `port`：需要监听的端口号，参数值为0时将为`TCP`服务器分配一个随机端口号，`TCP` 服务器将监听来自于这个随机端口号的客户端连接。
> * `host`：指定需要监听的 `TP` 地址或主机名，如果省略该参数，服务器将监听来自于任何 `IPv4` 地址的客户端连接。
> * `backlog`：【默认：511】整数值，指定位于等待队列中的客户端连接的最大数量，一旦超越这个长度，`TCP` 服务器将开始拒绝来自于新的客户端的连接请求。

---

> * 法2
> * 以下这种方式用于通知一个使用 `unix` 端口的服务器开始监听来自于指定路径的客户端连接。

```js
server.listen(path, [callback]);
```

---

> * 法3
> * 以下这种方式用于通知一个`TCP` 服务器开始监听来自于`socket`句柄（该句柄可以是一个`TCP`服务器对象/`socket`端口对象/（windows系统不支持）文件描述符）的客户端连接。

```js
server.listen(handle, [callback]);
```

### 1.4 server.address()

```js
var address = server.address();
```

> * 创建 `TCP` 服务器后，可使用`TCP` 服务器的 `address` 方法查看该服务器所监听的地址信息，因此开发者应在服务器的 `listening` 事件被触发后使用该方法。

![net](/styles/images/nodejs/net/net-01.png)

### 1.5 server.getConnections

> * `server.getConnections(function(err, count){})`：查看当前与 `TCP` 服务器建立连接的客户端连接数量。
>   * `err`：获取客户端连接数时所触发的错误对象。
>   * `count`：获取到的客户端连接数。

### 1.6 属性 maxConnections

> * `maxConnections`：`TCP` 服务器对象的属性，整数，用于指定 `TCP` 服务器可以接收的客户端连接的最大数量。

### 1.7 server.close()

> * `server.close(function(){})` ======》》》 `server.on('close', function(){})`
> * 使用`close` 方法，并不会断开所有现存的客户端连接。
> * 当客户端连接被关闭时，服务器将自动被关闭，同时会触发 `TCP` 服务器的 `close` 事件。