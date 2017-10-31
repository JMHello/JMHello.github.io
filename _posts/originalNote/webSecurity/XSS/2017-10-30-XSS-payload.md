---
layout: post
title: "XSS - payload 和 XSS 钓鱼"
data: 2017-10-30 20:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}

<!-- more -->


## 一、什么是 XSS payload

> * 下面这两行代码都是有可能实现 `XSS` 攻击的恶意脚本：
>   * `<img src="javascript:alert('xss')">`
>   * ` '><script>alert(document.cookie)</script>`  

> * `XSS payload`：`payload`的中文意思是“有效载客”；简单理解 `XSS payload` 就是能够有效实现 `XSS` 攻击的钥匙。我们可以通过 `XSS payload` 发起有效的 `XSS` 攻击。

> * `XSS payload` 的核心原理：**指能实现 `XSS` 攻击的恶意脚本**。

## 二、XSS payload的场景

> * 实际上，`XSS payload` 有成千上万种，不同的浏览器，不同的场景，不同的环境有不同的 `XSS payload`。下面就讲一下几种比较常见的 `XSS payload`。
>   * 窃取用户 `Cookie`。
>       * 通过 `document.cookie` 实现对 `cookie` 的操作 =======》 就可以模仿用户的登录态。
>   * 识别用户浏览器。
>       * 通过 `navigator.userAgent` 知道用户使用的浏览器是什么版本。如果用户使用的是较低版本的浏览器，就可以使用比较古老的攻击方式；如果用户使用的是高版本的浏览器，就可以使用相对应的攻击方式。
>   * 伪造请求
>       * 通过 `Ajax` 、`img.src`、`form`表单等等发起一些 `GET` 或 `POST` 请求，从而实现 `XSS` 的攻击。
>   * `XSS` 钓鱼。（下面会讲到）

## 三、XSS 钓鱼

### 1.1 什么是 XSS 钓鱼

> * 简单理解：`XSS` 钓鱼 = `XSS payload` + 钓鱼网站。
>   * 钓鱼网站：其实就是骗人的网站。

### 1.2 XSS 钓鱼demo下载

> * 点击下载[demo](/effects/files/webSecurity/XSSFish.zip)，详细操作可阅读 `readme.md` 文件

### 1.3 XSS demo 过程的展示

![XSSFish](/effects/images/webSecurity/webSecurity-04.gif)

### 1.4 XSS demo 过程的讲解

> * `http://localhost:8080/comments.html`

![XSSFish](/styles/images/web/security/security-10.png)

> * `http://localhost:3001/fish.html`

![XSSFish](/styles/images/web/security/security-11.png)

> * `http://localhost:3001/user.html`

![XSSFish](/styles/images/web/security/security-12.png)

### 1.5 总结XSS钓鱼窃取用户账号密码的流程

![XSSFish](/styles/images/web/security/security-13.png)




