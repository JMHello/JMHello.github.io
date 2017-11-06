---
layout: post
title: "javascript - 本地存储 -- cookie - 下篇"
data: 2017-10-28 17:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他链接：
    + [javascript - 本地存储 -- cookie - 上篇]({{ '/2017/10/25/js-Storage-Cookie1' | prepend: site.baseurl }})
    + [javascript - 本地存储 -- cookie - 中篇]({{ '/2017/10/25/js-Storage-Cookie2' | prepend: site.baseurl }})

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

### 1.2 demo 目录以及解析

> * `demo` 目录

![relationship-map](/styles/images/javascript/cookie/cookie-14.png)

> * `demo` 解析

![relationship-map](/styles/images/javascript/cookie/cookie-13.png)


### 1.3 demo 下载

> * 点击下载[demo](/effects/demo/js/demo-cookie/login.zip)
> * 下载 `demo` 后可以阅读 `readme.md` 文件，里面有详细的操作步骤。

### 1.4 demo 过程

![relationship-map](/effects/images/nodejs/cookie/cookie-01.gif)

## 二、总结

### 2.1 收获

> * 一开始还以为 `Set-Cookie` 后，还需要通过 `xhr.getResponseHeader()`获取其值，并使用 `js` 将获取到的值通过 `document.cookie` 设置，才能算是设置 `cookie` 成功。
> * 为什么会出现这种想法呢？
>   * 那是因为一开始我就忘记了 **`cookie`不能跨域**。
> * 同时，由于是第一次做这样的 `demo`，我并不知道 `Set-Cookie` 只要在同源下，就能同时在浏览器中设置对应的 `cookie` （这个可以在控制台的 `Application` 中看到，在那个错误的想法里，我在 `Application` 中是看不到想要设置的 `cookie`，所以才兜了一个大圈！！）

### 2.2 不足

> 1. 尽管我是使用 `nodeJs`，但是没用使用 `Express` 框架，所以你就会看到 `app.js` 文件里有超多个 `if...else...` 的路由判断语句！！
> 2. 在不使用框架的情况下，暂时无法配置静态资源的路径，因此，我都是通过 `fs.readFileSync()` 读取文件，才 `res.write()` 数据的。
>   除此之外，我 `js` 、`css` 都写在了 `html` 页面里，也是因为不会配置静态资源的路径。



