---
layout: post
title: "XSS - 防御 - 输出检查"
data: 2017-10-31 16:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}

> * 其他相关链接：[XSS-总结](http://www.jmazm.com/2017/10/31/XSS-inclustion/)

<!-- more -->

## 一、XSS的防御 - 输出检查

### 1.1 什么是输出检查

> * 输入检查就是**最后一道防线，根据不同的场景对数据进行处理**！！（可看下图：5种场景的展示）

![output](/styles/images/web/security/XSS/security-22.png)

### 1.2 5种场景的对应特性

> * 我们有没有想过，为什么会发起 `XSS` 攻击？
>   * 事实上，由于我们把我们用户的输入当作代码来运行，从而导致一些意料之外的结果。

---

> * 先看下图

![output](/styles/images/web/security/XSS/security-23.png)

---

> * **`HTML`执行环境**
> * 如果输出到 `HTML` 标签中、`HTML` 属性中，那么事实上，输出的环境是 `HTML`执行环境。
> * 为了避免用户输入被当作 `HTML` 代码去执行，因此在输出之前，需要做一些工作 **`HtmlEncode()`**。
>   * 即：将 `HTML` 中的一些特殊的字符进行转义，变成普通的文本。

---

> * **`js`解析环境**
> * 如果输出到 `script` 标签中、事件属性中，那么事实上，输出的环境是 `js`解析环境。
> * 为了避免用户输入被当作 `js` 代码去执行，因此在输出之前，需要做一些工作 **`JavascriptEncode()`**。
>   * 我们通常通过 **斜杠** 转义。

---

> * **`URL`解析环境**
> * 如果输出到 `href` 、`src`中，那么事实上，输出的环境是 `URL`解析环境。
> * 为了避免用户输入被当作 `URL` 去执行，因此在输出之前，需要做一些工作 **`URLEncode()`**。
>   * 即：把`URL`中一些特殊的字符进行转义，避免出现攻击的现象。

## 二、XSS的防御 - 输出检查demo

### 2.1 未检查前，XSS 攻击成功

> * 点击打开[demo](/effects/files/webSecurity/XSS/xss-output.html);

> * 过程

![demo](/effects/images/webSecurity/XSS/webSecurity-09.gif);

### 2.2 检查后，XSS 攻击失败

> * 点击打开[demo](/effects/files/webSecurity/XSS/xss-output2.html);

> * 最终结果：所有弹窗都无效了！！！

### 2.3 注意事项

> * 在做这个`demo` 的时候，发现将 `<script>` 标签直接赋值给某元素的 `innerHTML`，一点效果都没有。
> * 原因可参考：[javascript - 为什么直接把script标签赋值给innerHTML不起作用](http://www.jmazm.com/2017/11/01/js-innerHTML-scriptTag)

