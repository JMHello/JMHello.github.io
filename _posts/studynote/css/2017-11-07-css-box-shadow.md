---
layout: post
title: "css - box-shadow - 盒子阴影"
date: 2017-11-07 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第3章

<!-- more -->

## 一、box-shadow

### 1.1 简介

> * `box-shadow`：定义元素的盒子阴影。

### 1.2 语法

```
box-shadow: none | [inset x-offset y-offset blur-radius spread-radius color]
```

![box-shadow](/styles/images/css/box-shadow/box-shadow-01.png)

### 1.3 浏览器兼容

![box-shadow](/styles/images/css/box-shadow/box-shadow-02.png)

![box-shadow](/styles/images/css/box-shadow/box-shadow-03.png)

## 二、demo

### 2.1 单/双边阴影效果

> * 点击打开[demo](/effects/demo/css/boxShadow/eg1.html)

![box-shadow](/styles/images/css/box-shadow/box-shadow-04.png)

![box-shadow](/styles/images/css/box-shadow/box-shadow-11.png)

> * 从这个 `demo` 可以得出以下结论：

![box-shadow](/styles/images/css/box-shadow/box-shadow-05.png)

### 2.2 四边相同阴影效果

> * 先看第一个`demo`：【点击打开[demo1](/effects/demo/css/boxShadow/eg2.html)】

![box-shadow](/styles/images/css/box-shadow/box-shadow-06.png)

> * 从上图可以知道：`box-shadow` 扩展半径的效果类似于边框的效果，但实际上并不是非边框，因为 `box-shadow` 并不是盒模型中的元素，**不会计算内容宽度**，看一下下面的`demo2`。【点击打开[demo1](/effects/demo/css/boxShadow/eg3.html)】

![box-shadow](/styles/images/css/box-shadow/box-shadow-07.png)

### 2.3 内阴影

> * 点击打开[demo](/effects/demo/css/boxShadow/eg4.html)

![box-shadow](/styles/images/css/box-shadow/box-shadow-08.png)

### 2.4 多层阴影

> * 点击打开[demo](/effects/demo/css/boxShadow/eg5.html)

![box-shadow](/styles/images/css/box-shadow/box-shadow-09.png)

> * 使用多层级 `box-shadow` 时，需注意最先写的阴影将显示在最顶层。先定义 `1px` 红色阴影，再定义 `5px` 蓝色阴影，结果红色在蓝色上。【如果前面的阴影太大，顶层的阴影会遮盖底部的阴影】

## 三、制作3D搜索表单

> * 点击打开[demo](/effects/demo/css/boxShadow/demo/index.html)

![box-shadow](/styles/images/css/box-shadow/box-shadow-10.png)