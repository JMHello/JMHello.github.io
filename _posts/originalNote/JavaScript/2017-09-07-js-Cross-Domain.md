---
layout: post
title: "javasript -跨域"
data: 2017-09-07 20:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

今天主要总结一下几个跨域的方法。

<!-- more -->

## 一、同源策略(`same-origin policy`)

* 同源指的是三个相同（以下三个随意一个不同都不是同源，简称**不同域**）：
    * 协议相同
    * 域名相同
    * 端口相同
* 同源策略用来决定服务器能够相互通信的页面。
* 同源策略规定只有同源的页面才能访问、下载，以及与来自该源的资源进行交互（使用 `JavaScript`）。因此同源策略可以保证用户信息的安全，防止恶意的网站窃取数据。

> 我们也可以这样理解同源策略：**不同域**的客户端**脚本**在没有明确**授权**的情况下，是不能读写对方的资源（资源包括`ajax`、`cookie`）。

下面看一组比较：

![relationship-map]({{'/styles/images/javascript/crossDomain/crossDomain-01.png' | prepend: site.baseurl}})

## 二、解决跨域 - CORS

`CORS`，`Cross-Origin Resource Sharing`，跨域资源共享。它是基于`HTTP`来实现的。以下是`CORS`的原理图：

![relationship-map]({{'/styles/images/javascript/crossDomain/crossDomain-02.png' | prepend: site.baseurl}})

以下是文字描述：
* `www.jmazm.com`与`www.qq.com`明显不同域，假设前者要往后者拿数据，由于不同域，因此需要跨域处理。
    1. 浏览器在向服务器发送请求的时候，请求头应该包含`Origin`，并且其值为`http://www.jmazm.com`
    2. 如果服务器认为可以授权给这个“域”的话，就可以响应数据，并在向浏览器返回响应的时候，响应头应该包含`Access-Control-Allow-Origin`，并且其值为`http://www.jmazm.com`。
    3. 由于浏览器有同源策略的限制，所以`Access-Control-Allow-Origin`这个响应头就是用来告诉浏览器：“你有权使用我的数据了！”

