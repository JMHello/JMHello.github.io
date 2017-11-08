---
layout: post
title: "CSRF - 中篇 - 介绍和防御"
data: 2017-10-31 16:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}


<!-- more -->

## 一、什么是CSRF

### 1.1 总结转账攻击的过程

> * 回顾[CSRF - 上篇 - 转账攻击](http://www.jmazm.com/2017/10/31/CSRF-example/)，我们可以清楚地知道坏人是如何进行转账攻击的，下面先来总结一下这个过程。

![CSRF](/styles/images/web/security/CSRF/csrf-04.png)

![CSRF](/styles/images/web/security/CSRF/csrf-05.png)

### 1.2 CSRF

> * `CSRF`（`Cross Site Request Forgery`）：跨站请求伪造。
> * 本质：伪造。

## 二、CSRF 防御

### 2.1 如何防御CSRF攻击

> * 先看下图：

![CSRF](/styles/images/web/security/CSRF/csrf-06.png)

> * 从上图知道，我们可以这样防御 `CSRF`：

![CSRF](/styles/images/web/security/CSRF/csrf-07.png)

### 2.2 CSRF防御 - referer验证

> * 点击下载[demo](/effects/files/webSecurity/CSRF/CSRF-defence-referer.zip)

> * `demo` 展示

![demo](/effects/images/webSecurity/CSRF/csrf-03.gif)

### 2.3 CSRF防御 - token验证

> * 点击下载[demo](/effects/files/webSecurity/CSRF/CSRF-defence-token.zip)

> * 发送的请求数据：（里面多了一个 `token` 参数）

![CSRF](/styles/images/web/security/CSRF/csrf-08.png)

> * `demo` 展示

![demo](/effects/images/webSecurity/CSRF/csrf-04.gif)









