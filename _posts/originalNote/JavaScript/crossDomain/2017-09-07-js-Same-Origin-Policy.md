---
layout: post
title: "javasript -同源策略"
data: 2017-09-07 19:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他连接：
    + [javasript - 跨域 - CORS]({{ '/2017/09/07/js-CORS' | prepend: site.baseurl }})
    + [javasript - 跨域 - JSONP]({{ '/2017/09/09/js-JSONP' | prepend: site.baseurl }})
    + [javasript - 跨域 - Iframe和window.name]({{ '/2017/09/09/js-window-name-iframe' | prepend: site.baseurl }})
    + [javasript - 跨域 - document.domain和iframe]({{ '/2017/09/11/js-document-domain' | prepend: site.baseurl }})
    + [javasript - 跨域 - 动态创建script标签]({{ '/2017/09/11/js-script' | prepend: site.baseurl }})
    + [javasript - 跨域 - location.hash + iframe]({{ '/2017/09/13/js-hash-iframe' | prepend: site.baseurl }})
  
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

