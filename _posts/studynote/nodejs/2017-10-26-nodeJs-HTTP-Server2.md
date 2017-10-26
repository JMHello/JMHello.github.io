---
layout: post
title: "nodeJs - HTTP服务器 - 下篇"
data: 2017-10-26 17:27:00 +0800
categories: 学习笔记
tag: node.js
---
* content
{:toc}

其他链接：

+ [nodeJs - 获取客户端请求信息]({{ '/2017/09/09/nodeJs-Get-IncomingMessage' | prepend: site.baseurl }})
+ [nodeJs - HTTP服务器 - 上篇]({{ '/2017/09/08/nodeJs-HTTP-Server1' | prepend: site.baseurl }})

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

## 二、发送服务器响应流

### 2.1 http.ServerResponse

> * `http.ServerResponse`：该对象可以发送服务器端响应流。【`createServer` 中第一个参数 - `response`】

### 2.2 response.writeHead(statusCode, [reasonPhrase], [headers])

> * `response.writeHead(statusCode, [reasonPhrase], [headers])`：响应头信息。
>   * `statusCode`：必填参数，是 `HTTP` 状态码。
>   * `reasonPhrase`：可选参数，字符串，用于指定对于该状态码的描述信息。
>   * `headers`：可选参数，对象，指定服务器端创建的响应头对象。

> * 在响应头中包含的一些常用字段如下：

![relationship-map]({{ '/styles/images/nodejs/http/http-01.png' | prepend: site.baseurl }})

> * 实例

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': 'http://localhost:63342'
    })
    res.write('你好，我成功了！！');
  }
  res.end();
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>使用ajax获取node.js服务器数据</title>
</head>
<body>
<button type="button" onclick="ajax()">获取数据</button>
<div id="info"></div>
<script>
    function ajax () {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log(11);
            document.getElementById('info').innerHTML = xhr.responseText;
          }
        }
      };

      xhr.open("GET", "http://127.0.0.1:8080", true);
      xhr.send(null);
    }
</script>
</body>
</html>
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-05.gif | prepend: site.baseurl }})

> * 注意事项

![relationship-map]({{ '/styles/images/nodejs/http/http-02.png' | prepend: site.baseurl }})

### 2.3 response.setHeader(name, value) 设置响应头信息

> * 如果没有使用 `http.ServerResponse` 对象的 `writeHead` 方法指定响应头对象，可使用 `http.ServerResponse` 对象的 **`setHeader`** 方法单独设置响应头信息。

> * `response.setHeader(name, value)`：【可以通过数组的使用在一个响应字段中指定多个字段值！！】
>   * `name`：指定响应字段
>   * `value`：指定响应字段值

> * 例1：

```js
response.setHeader('Set-Cookie', ["type=ninja", "language=javascript"]);
```

> * 例2：

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': 'http://localhost:63342'
    })
    res.write('你好，我成功了！！');
  }
  res.end();
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>使用ajax获取node.js服务器数据</title>
</head>
<body>
<button type="button" onclick="ajax()">获取数据</button>
<div id="info"></div>
<script>
    function ajax () {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log(11);
            document.getElementById('info').innerHTML = xhr.responseText;
          }
        }
      };

      xhr.open("GET", "http://127.0.0.1:8080", true);
      xhr.send(null);
    }
</script>
</body>
</html>
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-06.gif | prepend: site.baseurl }})

### 2.4 response.getHeader(name)

> * 在使用了 `http.ServerResponse` 对象的 `setHeader` 方法设置响应头信息后，可以使用 `http.ServerResponse` 对象的 `getHeader` 方法获取响应头中的某个值。

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    console.log("Content-Type：" + res.getHeader("Content-Type"));
    res.write('你好，response.getHeader()方法使用成功了！！');
  }
  res.end();
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-07.gif | prepend: site.baseurl }})

### 2.5 response.removeHeader(name)

> * `response.removeHeader(name)`：删除一个响应字段。
> * **`response.removeHeader()` 方法必须在 `http.ServerResponse` 对象的 `write` 方法发送数据之前被调用**。

### 2.5 response.headersSent

> * `response.headersSent`属性：当响应头已发送时，该属性值为 `true`， 当响应头未发送时，属性值为 `false`。

> * 例1：使用 `headersSent` 属性查看使用 `writeHead` 方法时响应头的发送时机

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    // 未发送响应头前
    if (res.headersSent) {
      console.log("响应头已发送！！");
    } else {
      console.log("响应头未发送！！");
    }

    // 发送响应头
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    // 发送响应头后
    if (res.headersSent) {
      console.log("响应头已发送！！");
    } else {
      console.log("响应头未发送！！");
    }

    res.write('<html><head><meta charset="utf-8"></head></html>');
    res.write("nihao!!!!");
  }
  res.end();
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-08.gif | prepend: site.baseurl }})

---

> * 例2：使用 `headersSent` 属性查看使用 `setHeader` 方法时响应头的发送时机

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {

    // 调用 setHeader 方法
    res.setHeader('Content-Type', 'text/html');

    // 未发送响应头前
    if (res.headersSent) {
      console.log("响应头已发送！！");
    } else {
      console.log("响应头未发送！！");
    }

    // 第一次调用 write 方法，发送响应头
    res.write('<html><head><meta charset="utf-8"></head></html>');


    // 发送响应头后
    if (res.headersSent) {
      console.log("响应头已发送！！");
    } else {
      console.log("响应头未发送！！");
    }

    res.write("nihao!!!!");
  }
  res.end();
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-09.gif | prepend: site.baseurl }})

---

> * 补充：**在使用 `setHeader` 方法时：当 `http.ServerResponse` 对象的 `write` 方法被第一次调用时即发送响应头。**