---
layout: post
title: "css - 文本换行"
date: 2017-11-07 17:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第5章

> * 浏览器自身都带有让文本换行的功能。
> * 对于西方文本来说，浏览器会在半角空格或连字符的地方自动换行，而不会在单词的中间突然换行。
> * 对于中文来说，可以在任何一个文字后面换行，但浏览器碰到标点符号时，通常将标点符号以及其前面的一个文字作为一个整体统一换行。

<!-- more -->

## 一、word-wrap

### 1.1 语法

![textWrap](/styles/images/css/textWrap/textWrap-01.png)

### 1.2 浏览器兼容

![textWrap](/styles/images/css/textWrap/textWrap-04.png)

### 1.3 用法

> * 点击打开[demo](/effects/demo/css/textWrap/eg1.html)

> * `word-wrap:normal`：

![textWrap](/styles/images/css/textWrap/textWrap-02.png)

> * `word-wrap:break-word`：

![textWrap](/styles/images/css/textWrap/textWrap-03.png)

## 二、word-break

### 2.1 语法

![textWrap](/styles/images/css/textWrap/textWrap-05.png)

### 2.2 浏览器兼容

![textWrap](/styles/images/css/textWrap/textWrap-06.png)

### 2.3 用法

> * 点击打开[demo](/effects/demo/css/textWrap/eg2.html)

> * `word-break:normal`：

![textWrap](/styles/images/css/textWrap/textWrap-02.png)

> * `word-wrap:break-all`：

![textWrap](/styles/images/css/textWrap/textWrap-07.png)

> * `word-wrap:keep-all`：

![textWrap](/styles/images/css/textWrap/textWrap-08.png)


