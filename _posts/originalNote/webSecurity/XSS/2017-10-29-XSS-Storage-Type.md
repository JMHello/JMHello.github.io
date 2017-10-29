---
layout: post
title: "XSS - 存储型"
data: 2017-10-29 19:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}

<!-- more -->


## 一、存储型 XSS

### 1.1 存储型 XSS 介绍

> * 存储型（持久型）`XSS`：将恶意脚本代码 **存储** 到漏洞服务器中，用户浏览相关页面发起攻击。过程可看下图：

![safe](/styles/images/web/security/security-03.png)

> * 存储型 `XSS` 关键在于 **存储**。

> 1. 那些黑客或者其他坏的程序员会将恶意脚本代码上传或存储到漏洞服务器，其途径可以通过输入框。
> 2. 无意中，用户访问了这个包含了相关恶意脚本的网页。
> 3. 对于服务器来说，服务器只会直接读取这些恶意数据并且直接使用。
> 4. 由于收到了请求，那么服务器就需要返回响应，因此，服务器就会未防范返回含有恶意脚本的页面给客户端。
> 5. 结果：客户端就中招了！！受到了 存储型 `XSS` 的攻击！！！

### 1.2 反射性 XSS 的特点

> 1. 持久型，存储在服务器里。
> 2. 不需要交互也能触发。

## 二、反射型demo

> * 点击下载[demo](/effects/files/webSecurity/storageType.zip)，详细的操作可以阅读 `readme.md` 文件。

> * `demo` 结果解析如下图：（以下图片只是举个例子，并不是说百度是不好的网站！！）

![demo](/styles/images/web/security/security-04.png)

> * 操作过程如下：（一开始展示的是chrome浏览器，之后是ie浏览器）

![demo](/effects/images/webSecurity/webSecurity-02.gif)

## 三、总结

> * 总结之前，我们先来比较一下 反射型 `XSS` 和 存储型 `XSS`：

![demo](/styles/images/web/security/security-04.png)

> * 由图中可以看出，**存储型 `XSS`** 的破坏力要比 反射型 `XSS` 要强！！！

