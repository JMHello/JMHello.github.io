---
layout: post
title: "浏览器缓存机制（二）"
date: 2018-02-03 19:00:00 +0800 
categories: 原创
tag: 深入理解Web前端
---
* content
{:toc}

其他链接：

+ 中文官方主页： [http://jekyll.com.cn/](http://jekyll.com.cn/)


<!-- more -->

> * 以下部分内容参考：[http://www.cnblogs.com/wangpenghui522/p/5498427.html](http://www.cnblogs.com/wangpenghui522/p/5498427.html)
> * 以下部分内容参考：《JavaScript 权威指南》（第3版）


## 一、Disable Cache

> * `Chrome` 浏览器设置了 `Disable Cache` 后，所有资源都不会被缓存，直接从服务器重新拿数据

![cache](/styles/images/web/cache/cache-06.png)

> * 从上图可看到，设置了`Disable Cahce` 后，请求头多了两个字段：
>   * `Cache-Control: no-cache`：告知服务器不直接使用缓存，要向原服务器发起请求
>   * `Pragma: no-cache`：禁用缓存