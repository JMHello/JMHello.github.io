---
layout: post
title: "css - 选择器 - 1 -  基本选择器和层次选择器"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 相关链接：
>   * [css - 选择器 - 选择器分类](http://www.jmazm.com/2017/11/04/css-basic/)
>   * [css - 选择器 - 2 - 伪类选择器 - 上篇](http://www.jmazm.com/2017/11/04/css-selector2/)
>   * [css - 选择器 - 3 - 伪类选择器 - 下篇](http://www.jmazm.com/2017/11/04/css-selector3/)
>   * [css - 选择器 - 4 - 伪元素选择器](http://www.jmazm.com/2017/11/04/css-selector4/)
>   * [css - 选择器 - 5 - 属性选择器](http://www.jmazm.com/2017/11/04/css-selector5/)
>   * [css - 选择器 - 优化](http://www.jmazm.com/2017/11/12/css-optimization/)

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第2章

<!-- more -->

## 一、基本选择器

### 1.1 语法

![selector](/styles/images/css/selector/selector-02.png)

![selector](/styles/images/css/selector/selector-20.png)

### 1.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-03.png)

## 二、层次选择器

### 2.1 语法

![selector](/styles/images/css/selector/selector-04.png)

![selector](/styles/images/css/selector/selector-21.png)

![selector](/styles/images/css/selector/selector-22.png)

### 2.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-05.png)

### 2.3 后代选择器

> * 后代选择器： `E F` ===》 选择`E`元素的 **所有后代`F`元素**【不管是什么辈分】。

> * 点击打开[demo](/effects/demo/css/selector/levelSelector/eg1.html)

![selector](/styles/images/css/selector/levelSelector/levelSelector-01.png)

### 2.4 子选择器

> * 子选择器：`E > F` ====》 选择 `E` 元素下 **所有子元素`F`**【仅仅只是子元素】。   

> * 点击打开[demo](/effects/demo/css/selector/levelSelector/eg2.html)

![selector](/styles/images/css/selector/levelSelector/levelSelector-02.png) 

### 2.5 相邻兄弟选择器

> * 相邻兄弟选择器：`E + F` ====》 选择紧跟 `E` 元素后的元素`F` 【说明 `E` 元素 和 `F` 元素在同一个父元素中】。   

> * 点击打开[demo](/effects/demo/css/selector/levelSelector/eg3.html)

![selector](/styles/images/css/selector/levelSelector/levelSelector-03.png) 

### 2.6 通用兄弟选择器

> * 通用兄弟选择器：`E ~ F` ====》 选择 `E` 元素下 **所有兄弟元素`F`**【说明 `E` 元素 和 `F` 元素在同一个父元素中】。   

> * 点击打开[demo](/effects/demo/css/selector/levelSelector/eg4.html)

![selector](/styles/images/css/selector/levelSelector/levelSelector-04.png) 
