---
layout: post
title: "XSS - 防御 - 输入检查"
data: 2017-10-31 9:27:00 +0800
categories: 原创
tag: WebSecurity
---
* content
{:toc}

> * 其他相关链接：[XSS-总结](http://www.jmazm.com/2017/10/31/XSS-inclustion/)

<!-- more -->


## 一、XSS的防御 - 输入检查

### 1.1 什么是输入检查

> * 输入检查就是**永远不要相信用户的输入**！！
>   * 即：我们需要对用户的输入抱有怀疑的态度，对一些不正确、不合规范的输入，我们需要进行过滤和筛选。

### 1.2 白名单和黑名单

![input](/styles/images/web/security/XSS/security-18.png)

---

> * **白名单**
>   * 假设：我们需要用户输入邮箱地址，此时就需要进行“输入格式的判断”，经判断后，如果不符合邮箱格式，我们就会给予一些提示并且不让通过。
>   * 以上这种形式我们称之为白名单。

> * 总结一下 **白名单**：只要符合白名单的要求，我们才给予通过。

---

> * **黑名单**
>   * 假设：我们允许用户输入一些富文本，例如输入一些标签（`<button onclick="alert(1);"></button>`），可以增强他们的评论信息。
>   * 然而我们能需要**过滤一些危险的字符**：`<scirpt>`、`javascript`、`onclick` 等 【这些都是一些具有攻击性可能的属性】
>   * 如果我们只是需要用户输入一些普通的文本的时候，我们就需要 **转义特殊字符**，例如 `> ===》 &gt;`，这样可以避免 `XSS` 攻击的发生。

> * 总结一下 **黑名单**：过滤危险的字符和转义特殊字符，我们称其为黑名单。如果用户里面涉及黑名单，我们则不给予通过，并且对黑名单里面的内容进行过滤和转义。

---

> * 我们可以根据不同的场景去使用白名单或者黑名单或者两者一起使用。
> * 谨记：**仅仅在前端做输入检查是不够的**，为什么？
>   * 因为我们可以通过一些工具，绕过前端的输入检查，直接发送给服务端。
>   * 因此，我们能一般都是服务端结合前端一起进行输入检查。

### 1.3 白名单和黑名单的应用场景

> * 一般来说，对于用户的输入有两种情况：

> 1. 一种是允许用户提交一些自定义 `HTML` 代码（称之为富文本）====》 **对于富文本我们通常是会采用黑名单来过滤危险的标签和属性**
>   * 比如用户在论坛里发帖，帖子的内容有图片、链接、表格等（需要通过 `HTML` 代码来实现）。
>   * 点击打开[demo](/effects/demo/demo-inputChecking/eg1.html)
> 2. 一种是只允许用户提交纯文本，即把用户的输入当做普通的文本字符串 =====》 **对于需要输出到 `HTML` 结构中的普通文本我们通常是会 `htmlEncode` 来转义特殊字符**
>   * 比如用户注册时填写姓名、地址等信息。
>   * 点击打开[demo](/effects/demo/demo-inputChecking/eg2.html)

## 二、XSS的防御 - 输入检查 demo

### 2.1 demo下载

> *  点击下载[demo](/effects/files/webSecurity/XSS/inputChecking.zip)

### 2.2 是否转义demo切换的提示

![input](/styles/images/web/security/XSS/security-21.png)

### 2.2 未防御前的操作展示（伪造的post请求成功发起XSS攻击）

> * 一开始 `node app.js` 时，是正常的 `post` 请求。
> * 到了 `node request.js` 时，才是**伪造的 `post` 请求**。【即：绕过前端，后端自动发起请求】

> * 操作过程：

![post](/effects/images/webSecurity/webSecurity-07.gif)

> * 结果图：

![input](/styles/images/web/security/XSS/security-19.png)

### 2.3 防御后的操作显示（伪造的post请求发起XSS攻击失败）

> * 操作过程：

![post](/effects/images/webSecurity/webSecurity-08.gif)

> * 结果图：

![input](/styles/images/web/security/XSS/security-20.png)






