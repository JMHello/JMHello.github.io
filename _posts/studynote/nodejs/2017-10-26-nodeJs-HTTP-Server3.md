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

### 1.7 response.addTrailers(headers)

> * **`response.addTrailers(headers)`**
>   * `header`：对象，存放需要追加的响应头信息。
>   * 在使用这个方法时，**响应流须使用分块编码方式**。【如果客户端使用 `HTTP` 的版本为 1.1 以上（包括1.1版本），则响应流自动设置为分块编码方式；版本为1.0，此方法不生效】
>   * 使用此方法，**必须在响应头中添加 `Trailer` 字段并将字段值设为追加的响应头中所指定的字段名**。

```js
response.writeHead(200, {
  'Content-Type': 'text/plain',
  'Trailer': 'Content-MD5' // 添加Trailer字段
});
response.write('一些数据。');

// addTrailers 方法
response.addTrailers({
  'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667'
});
response.end();
```

### 1.8 response.write(chunk,[encoding])

> * `response.write(chunk,[encoding])`：发送响应内容。
>   * `chunk`：必选。指定响应内容，一个 `Buffer` 对象或一个字符串。
>   * `encoding`：如果第一参数值为字符串，可使用此属性指定如何编码该字符串。【**默认`utf8`**】

---

> * **如果在 `write` 方法前没有使用 `writeHead` 方法，那么 `Node.js` 将隐式创建一个响应头。**
> * 在使用 `end` 方法结束响应内容的书写之前，可调用多次 `write` 方法。
>   * 第一次调用 `write` 方法， `Node.js` 将立即发送 **缓存的响应头信息及 `write` 方法中指定的响应内容**。
>   * 当再次调用 `write` 方法时，`Node.js` 将 **单独发送 `write` 方法中指定的响应内容。该响应内容将与之前发送的响应内容一起缓存在客户端中。**

![relationship-map]({{ '/styles/images/nodejs/http/http-04.png | prepend: site.baseurl }})

### 1.9 response.end([chunk],[encoding])

> * `response.end(chunk,[encoding])`：结束响应内容的书写。【在每次发送数据时，**必须调用该方法来结束响应**。】
>   * `chunk`：可选，指定响应内容，一个 `Buffer` 对象或一个字符串。
>   * `encoding`：可选，如果第一参数值为字符串，可使用此属性指定如何编码该字符串。【**默认`utf8`**】

### 1.10 response.setTimeout(msecs, [callback])

> * `response.setTimeout(msecs, [callback])`：设置响应超时时间
>   * `msecs`：必选。整数，设置超时时间，单位：`ms`。
>   * `callback`：可选。指定当响应超时时调用的回调函数。（函数中不使用任何参数）。

```js
// 等价 response.setTimeout(msecs, [callback])
response.on('timeout', function() {
  //...
})
```

---

> * **如果在指定的时间内服务器没有做出响应，可能是因为网络间的连接出现问题，或者是因为服务器故障，或者是网络防火墙阻止了客户端与服务器的连接**。

![relationship-map]({{ '/styles/images/nodejs/http/http-05.png | prepend: site.baseurl }})

---

> * 实例：

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    // 设置相应超时时间，这里并没有使用回调函数
    res.setTimeout(1000);

    // 使用 timeout 事件，相当于 上行代码的回调函数
    res.on('timeout', function () {
      console.log('响应超时了！！！！！！');
    })

    setTimeout(function () {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      console.log("Content-Type：" + res.getHeader("Content-Type"));
      res.write('你好，response.getHeader()方法使用成功了！！');
      res.end();
    }, 2000);
  }
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-11.gif | prepend: site.baseurl }})

### 1.11 close事件

> * **在 `res.end()` 方法被调用之前**，如果连接中断，会触发 `http.ServerResponse` 对象的 `close` 事件。
> * 可通过监听该事件并指定事件回调函数，从而指定中断时所需执行的操作。

```js
res.on('close', function() {
  // ...
})
```

---

> * 实例：在页面打开的5秒内关闭页面就会显示连接中断

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    // close 事件
    res.on('close', function () {
      console.log('连接被中断！！！！！');
    });
    
    setTimeout(function () {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.write('你好，response.getHeader()方法使用成功了！！');
      res.end();
    }, 5000);
  }
});

server.listen(8080, "127.0.0.1", function () {
  console.log('开始监听');
});
```

> * 过程

![relationship-map]({{ '/effects/images/nodejs/http/http-12.gif | prepend: site.baseurl }})