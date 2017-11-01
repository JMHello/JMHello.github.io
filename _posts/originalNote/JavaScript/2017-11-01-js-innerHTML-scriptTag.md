---
layout: post
title: "javascript - 为什么直接把script标签赋值给innerHTML不起作用"
data: 2017-11-01 17:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

> * 其他相关链接：
>   * [http://www.hellojm.cn/2017/10/26/scrpit-in-innerHTML/](http://www.hellojm.cn/2017/10/26/scrpit-in-innerHTML/)

> * 以下内容部分源于：
>   * 《JavaScript高级程序设计（第3版）》 11.3.6

> * 最近在做一个 `demo` ==》 `XSS`-防御-输出检查，但是发现，将 `<script>` 标签直接赋值给某元素的 `innerHTML`，却一点作用都没有。   

<!-- more -->


## 一、为什么不起作用？

### 1.1 原因

> * 因为，这个是被规定的：**在大多数浏览器中，通过 `innerHTML` 插入 `<script>` 元素并不会执行其中的脚本。**。

### 1.2 demo

> * 点击打开[demo](/effects/demo/demo-innerHTML/eg2.html)

> * 过程展示

![demo](/effects/images/javascript/innerHTML/innerHTML-01.gif)

## 二、重构script节点

> * 既然直接将 `<script>` 赋值给 `innerHTML` 不行，我们就重构它，让它成功运行。

> * 点击打开[demo](/effects/demo/demo-innerHTML/eg1.html)

> * 过程展示

![demo](/effects/images/javascript/innerHTML/innerHTML-02.gif)

