---
layout: post
title: "XSS - 防御 - httpOnly"
data: 2017-10-30 21:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}

> * 其他相关链接：[XSS-总结](http://www.jmazm.com/2017/10/31/XSS-inclustion/)

<!-- more -->

## 一、httpOnly 

### 1.1 httpOnly 的引入

> * 我们知道攻击者可以通过恶意脚本获取和控制用户信息。
> * 例如：涉及到用户登录态信息的 `cookie`，此时，为保护用户登录态信息，不让攻击者获取到 `cookie` 信息，我们就需要建立以一面防卫墙，这面墙就是 为 `cookie` 设置 `httpOnly`。

---

> * **给 `cookie` 设置 `httpOnly`**：
>   * 实际上就是阻止客户端脚本访问 `cookie`。
>   * 即：只有在与服务端交互的时候，我们的 `HTTP` 请求头中才会带上 `cookie` 的信息，其余的手段如：`javascript` 无法访问 `cookie` 信息。

> * 过程可看下图

![httpOnly](/styles/images/web/security/XSS/security-14.png)

### 1.2 httpOnly 的缺点

> 1. 自己不能用。
>   * 即：浏览器根本不能读取设置了 `httpOnly` 的 `cookie` 的值。
> 2. 非根本性解决 `XSS`。
>   * 事实上，设置 `httpOnly` 并不是防御 `XSS`，而是为了发生 `XSS` 之后，防止脚本去获取 `cookie` 的信息，所以设置 `httpOnly` 并不是从根本上去解决 `XSS` 攻击，而是减少了 `XSS` 攻击的范围。   

### 1.3 httpOnly demo 下载

> * 点击下载[demo](/effects/files/webSecurity/XSS/httpOnly.zip)，详细操作可阅读 `readme.md` 文件

### 1.4 httpOnly demo 过程

> * 切换是否设置 `httpOnly` 的 `demo` 中的关键代码

![httpOnly](/styles/images/web/security/XSS/security-15.png)

---

> * 未设置 `httpOnly`

![httpOnly](/effects/images/webSecurity/XSS/webSecurity-05.gif)

> * 未设置 `httpOnly` 结果图

![httpOnly](/styles/images/web/security/XSS/security-16.png)

----

> * 设置 `httpOnly`

![httpOnly](/effects/images/webSecurity/XSS/webSecurity-06.gif)

> * 设置 `httpOnly` 结果图

![httpOnly](/styles/images/web/security/XSS/security-17.png)


