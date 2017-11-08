---
layout: post
title: "CSRF - 下篇 - XSS蠕虫"
data: 2017-10-31 16:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}


<!-- more -->

## 一、XSS 蠕虫

### 1.1 什么是XSS蠕虫

> * `XSS` 蠕虫就是不断传播的 `XSS` + `CSRF` 攻击。

> * `XSS` 和 `CSRF` 结合后发生的一些事情：

![CSRF](/styles/images/web/security/CSRF/csrf-09.png)

> * `XSS` 蠕虫的发生过程：

![CSRF](/styles/images/web/security/CSRF/csrf-10.png)

### 1.2 XSS蠕虫总结

![CSRF](/styles/images/web/security/CSRF/csrf-11.png)