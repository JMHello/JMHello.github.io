---
layout: post
title: "css - 选择器 - 1 -  基本选择器和层次选择器"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第2章

<!-- more -->

## 一、基本选择器

### 1.1 语法

![selector](/styles/images/css/selector/selector-02.png)

### 1.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-03.png)

## 二、层次选择器

### 2.1 语法

![selector](/styles/images/css/selector/selector-04.png)

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
