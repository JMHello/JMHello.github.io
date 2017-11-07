---
layout: post
title: "css - text-shadow - 文本阴影"
date: 2017-11-07 17:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第5章

<!-- more -->

## 一、text-shadow

### 1.1 语法

> * `text-shadow`：文本阴影。

```
text-shadow: color x-offset y-offset blur-radius;
```

![text-shadow](/styles/images/css/text-shadow/text-shadow-01.png)

### 1.2 浏览器兼容性

![text-shadow](/styles/images/css/text-shadow/text-shadow-02.png)

> * 兼容 `IE`，用滤镜

```
E {filter:shadow(color=颜色值，Direction=数值, Strength = 数值)}
```

![text-shadow](/styles/images/css/text-shadow/text-shadow-03.png)

## 二、demo - 制作立体文本

> * 点击打开[demo](/effects/demo/css/textShadow/index.html)

![text-shadow](/styles/images/css/text-shadow/text-shadow-04.png)

