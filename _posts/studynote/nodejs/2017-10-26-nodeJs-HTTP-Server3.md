---
layout: post
title: "nodeJs - HTTP服务器 - 下篇 - http.ServerResponse"
data: 2017-10-26 17:27:00 +0800
categories: 学习笔记
tag: node.js
---
* content
{:toc}

其他链接：

+ [nodeJs - 获取客户端请求信息]({{ '/2017/09/09/nodeJs-Get-IncomingMessage' | prepend: site.baseurl }})
+ [nodeJs - HTTP服务器 - 上篇]({{ '/2017/09/08/nodeJs-HTTP-Server1' | prepend: site.baseurl }})
+ [nodeJs - HTTP服务器 - 中篇 - http.IncomingMessage]({{ '/2017/10/26/nodeJs-HTTP-Server2' | prepend: site.baseurl }})

> 以下内容全部源于： 《Node.js权威指南》

<!-- more -->

## 一、发送服务器响应流

### 1.1 http.ServerResponse

> * `http.ServerResponse`：该对象可以发送服务器端响应流。【`createServer` 中第一个参数 - `response`】

### 1.2 response.writeHead(statusCode, [reasonPhrase], [headers])

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

### 1.3 response.setHeader(name, value) 设置响应头信息

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

### 1.4 response.getHeader(name)

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

### 1.5 response.removeHeader(name)

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

### 1.6 属性：sendDate、statusCode

> * **`sendDate`**
>   * 默认情况下，`HTTP`服务器自动将服务器端当前时间作为响应头中的 `Date` 字段值发送给客户端。
>   * 可以通过将 `http.ServerResponse` 对象的 `sendDate` 属性设置为 `false` 的方法在响应头中删除字段。

![relationship-map]({{ '/styles/images/nodejs/http/http-03.png | prepend: site.baseurl }})

---

> * **`statusCode`**
>   * 可以通过 `http.ServerResponse` 对象的 `statusCode` 属性值获取 `HTTP` 服务器返回的状态码。
>   * **当不使用 `res.writeHead` 方法设置状态码时，可通过该属性值设置 `HTTP`服务器返回的状态码。**

--- 

> * 例子：`sendDate` 属性和 `statusCode` 属性的使用实例

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {

    // statusCode 属性设置服务器返回的状态码
    res.statusCode = 304;

    // 删除 Date 字段
    res.sendDate= false;

    // 调用 setHeader 方法
    res.setHeader('Content-Type', 'text/html');

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

![relationship-map]({{ '/effects/images/nodejs/http/http-10.gif | prepend: site.baseurl }})