---
layout: post
title: "XSS - DOM-Based 型"
data: 2017-10-29 19:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}

<!-- more -->


## 一、DOM-Based 型 XSS

### 1.1 DOM-Based 型 XSS 介绍

> * `DOM-Based` 型 `XSS`：基于 **浏览器** `DOM` 解析的攻击。
>   * 即：在前端的页面进行 `DOM` 操作的时候，例如：通过 `javascript` 操作 `DOM` 时，一些带有恶意代码的片段被 `HTML` 解析执行，从而导致 `XSS`  攻击。

### 1.2 DOM-Based 型 XSS 过程

> * 请看下图：

![demo](/styles/images/web/security/security-07.png)

> 1. 用户打开带有恶意的链接。
> 2. 浏览器（即：客户端）会在 `DOM` 解析时直接使用恶意数据。
> 3. 结果：用户中招了！！！
 
### 1.3 触发 DOM-Based 型 XSS 的场景

> * 触发 `DOM-Based` 型 `XSS` 的场景：`innerHTML`、`outerHTML`、`document.write`


### 1.4 触发 DOM-Based 型 XSS 的例子

> * `DOM-Based` 型 `XSS` 例子：
>   * 拼接 `HTML` 文本
>   * 修改 `HTML` 结构


## 二、DOM-Based 型demo

### 2.1 demo的下载和操作

> * 点击下载[demo](/effects/files/webSecurity/domBasedType.html)，详细的操作可以阅读 `readme.md` 文件。

> * 操作过程如下：

![demo](/effects/images/webSecurity/webSecurity-03.gif)

### 2.2 demo 的提示

> 1. 测试的例子1：`http://ke.qq.com`，点击链接，可以打开网站。
> 2. 测试的例子2：`" onclick=alert(/xss/) //` （可看下图）
>    * 这个例子屏蔽了 `href` 属性，为 `a` 标签添加了 `onclick` 事件，用户点击 `a` 标签，就会有弹窗出现！！
>    * 如果是一些恶意的脚本代码，那么在这里就会起到 `DOM-Based` 型的 `XSS` 攻击的作用。

![demo](/styles/images/web/security/security-08.png)

## 三、总结

> * 总结之前，我们先来比较一下三种 `XSS` 攻击：

![demo](/styles/images/web/security/security-06.png)

> * 反射型 `XSS`（服务端直接使用恶意脚本并返回结果页）和存储型 `XSS` （服务端存储恶意脚本并返回）都是需要服务端的直接参与的。
> * 然而对于 `DOM-Based` 型 `XSS` 来说，其并不依赖服务端，服务端的响应不会涉及到恶意脚本的内容。
> * `DOM-Based` 型 `XSS` 是客户端 `XSS` 的一种形式, 其数据来源在客户端中。
> * 从效果来看 `DOM-Based` 型 `XSS` 也是需要诱导用户去打开相应恶意链接才能发送的 `XSS` 攻击，所以说 `DOM-Based` 型也可以算是反射型`XSS` 的一种是正确的。

---

> * 总结：
>   * `DOM-Based` 型 `XSS` 是由于客户端 `JavaScript` 脚本修改页面 `DOM` 结构时引起浏览器 `DOM` 解析所造成的一种漏洞攻击。
>       * 因此如果页面 `JavaScript` 脚本不存在着漏洞的话，则不会发送 `DOM-Based` 型 `XSS` 攻击。

