---
layout: post
title: "nodeJs - 伪造get请求和post请求"
data: 2017-10-26 17:27:00 +0800
categories: 学习笔记
tag: node.js
---
* content
{:toc}



<!-- more -->

## 一、http.request(options, [callback])

### 1.1 用途

> * `http.request(options, [callback])` ：能够发送一个请求

### 1.2 参数 - options

> * 参数 - `options` 可以是字符串或者对象。【如果是字符串，它会自动被 `url.parse()` 方法解析】

> `options` 有以下值：
>   * `host`：域名或者 `IP` 地址。【默认：`localhost`】
>   * `hostname`：主机名
>   * `port`：端口号。【默认：`80`】
>   * `localAddress`：用于绑定网络连接的本地接口。
>   * `socketPath`：`Unix Domain Socket (use one of host:port or socketPath)`
>   * `method`：发送请求的方法。【默认：`GET`】
>   * `path`：请求的路径。【默认：`/`】
>   * `headers`：请求头
>   * `auth`：基础认证，如：`user:password` ，用来计算授权头。
>   * `agent`：控制代理行为。
>      * 当你的请求头有 `Connection: keep-alive`，这个参数可能的值有：
>           * `undefined`（默认值）：对此主机和端口使用全局代理
>           * `Agent` 对象（默认值）：` explicitly use the passed in Agent.`
>           * `false`（默认值）：`opts out of connection pooling with an Agent, defaults request to Connection: close.`

### 1.3 参数 - callback

> * 参数 - `callback`：可选参数，是回调函数，其参数为 `response` 对象。

### 1.4 方法的返回值

> * `http.request(options, [callback])` 返回 一个 `http.ClientRequest` 类的实例。

### 1.5 实例

> 点击下载[demo]()

```js
const http = require('http');

const content = JSON.stringify({
  content: '<a href="#">test3</a>',
  data: +new Date()
});

const opts = {
  host: 'localhost',
  port: '8080',
  path: '/addCommentData_action',
  method: 'POST',
  headers: {
    'Cookie': 'userkey=userkey_268.3329513853596; username=jm', // 每一登录，都需要更换这个值才能伪造 post 请求成功
    'Content-Type': 'application/json',
    'Content-Length': content.length
  }
}

// 伪造 post 请求
const req = http.request(opts, function(res){
  res.setEncoding('utf8');
  res.on('data',function(data){
    console.log("data:",data);   //一段html代码
  });
});

req.write(content);
req.end();
````




