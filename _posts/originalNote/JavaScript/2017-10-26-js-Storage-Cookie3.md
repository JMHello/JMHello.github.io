---
layout: post
title: "javascript - 本地存储 -- cookie - 下篇"
data: 2017-10-25 17:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他链接：
    + [javasript - 数据存储--Web存储机制]({{ '/2017/09/04/js-Storage-Web' | prepend: site.baseurl }})
    + [javascript - 本地存储 -- cookie - 上篇]({{ '/2017/10/25/js-Storage-Cookie1' | prepend: site.baseurl }})
    + [javascript - 本地存储 -- cookie - 中篇]({{ '/2017/10/26/js-Storage-Cookie2' | prepend: site.baseurl }})

> * 以下内容部分源于：
>   * 《JavaScript高级程序设计（第3版）》
  

<!-- more -->


## 一、实例：用户登录

### 1.1 过程

> * 大家都知道，`HTTP`是无状态的协议，那么如果多台电脑去访问相同的服务器，那么服务器又是通过什么来分辨每一台电脑呢？**答案：那就是`cookie`**，我们需要通过`cookie`实现 **登录态**。

> * 接下来讲讲用户登录的大致过程。


![relationship-map](/styles/images/javascript/cookie/cookie-10.png)

![relationship-map](/styles/images/javascript/cookie/cookie-11.png)

![relationship-map](/styles/images/javascript/cookie/cookie-12.png)

### 1.2 实例




