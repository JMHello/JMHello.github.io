---
layout: post
title: "css - radial-gradient"
date: 2017-11-14 15:00:00 +0800 
categories: 原创
tag: CSS
---
* content
{:toc}


<!-- more -->

## 一、径向渐变总结图

![gradient](/styles/images/css/gradient/gradient-10.png)

## 二、浏览器兼容性

> * 点击查看[兼容性](https://caniuse.com/#search=linear-gradient)

![gradient](/styles/images/css/gradient/gradient-04.png)

## 三、理解size (即：extend-keyword)

### 3.1 demo 展示

> * 请看下图：

![gradient](/styles/images/css/gradient/gradient-15.png)

> * 点击打开[demo](/effects/demo/css/gradient/demo5/index.html)，效果如下图：

![gradient](/effects/images/css/gradient/gradient-01.gif)

### 3.2 分析

> * 先看下图：

![gradient](/styles/images/css/gradient/gradient-20.png)

---

> * 其实如果是径向渐变的话，每一种颜色都是一个椭圆（个人猜测除了最后一个颜色不是一个椭圆。但是，或许它就是一个很大的椭圆，我们无法看到而已）。【圆形亦如此。】

---

> * **谨记**：
>   * 1、`color-shop` 中的位置（ `xx%` 或者 `xxpx`）指的是光晕的尺寸。
>       * 不过你会发现除了圆心不一样，其他都一样的情况下，其光晕的大小也会不同，那是**因为光晕的大小是相对于径向距离而言的**，径向距离大，那么你的光晕相对而言就会越大，径向距离小，那么你的光晕相对而言就会越小。
>   * 2、`<size>` 指的是整个渐变的尺寸（个人理解为渐变的范围）。
>       * `<size>` 就是用来决定径向距离的！！
>   * 3、等间距径向渐变：`radial-gradient(red, yellow, red, yellow, red)` 【其他径向渐变也一样】
>       * 对与 `xx-corner` 来说，其径向距离是点与角的距离。
>       * 对于 `xx-side` 来说，其径向距离是点与边的距离 。

## 四、demo

### 4.1 语法

![gradient](/styles/images/css/gradient/gradient-14.png)

### 4.2 理解 radial-gradient

![gradient](/styles/images/css/gradient/gradient-13.png)


### 4.3 radial-gradient demo

> * 点击打开[demo](/effects/demo/css/gradient/demo2/index.html)，结果如下图所示：

![gradient](/styles/images/css/gradient/gradient-11.png)

![gradient](/styles/images/css/gradient/gradient-12.png)

![gradient](/styles/images/css/gradient/gradient-16.png)

