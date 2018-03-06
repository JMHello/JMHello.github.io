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

在css3中，使用word-wrap属性实现长单词与URL地址的自动换行

![textWrap](/styles/images/css/textWrap/textWrap-01.png)

### 1.2 浏览器兼容

![textWrap](/styles/images/css/textWrap/textWrap-04.png)

### 1.3 用法

> * 点击打开[demo](/effects/demo/css/textWrap/eg1.html)

> * `word-wrap:normal`：长文本和URL地址超出容器

![textWrap](/styles/images/css/textWrap/textWrap-02.png)

> * `word-wrap:break-word`：长文本和URL地址都自动换行（唯一不完美，它不会按单词换行，直接将长单词截断换行，增加阅读的难度）

![textWrap](/styles/images/css/textWrap/textWrap-03.png)

## 二、word-break

### 2.1 语法

css3中使用 word-break 属性来决定自动换行的方法。通过具体的设置，不仅可以让浏览器实现半角空格或连字符后面的换行，而且还可以让浏览器实现任意位置的换行。

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

## 三、white-space


`white-space` 主要用来声明建立布局过程中如何处理元素中的空白符

![textWrap](/styles/images/css/textWrap/textWrap-09.png)

> * 点击打开[demo](/effects/demo/css/textWrap/eg3.html)


![textWrap](/styles/images/css/textWrap/textWrap-10.png)

## 四、文本换行技术比较

`line-break`：专门负责控制日文还行

`word-wrap`：可以控制换行，当取值为`word-break`时强制换行，中英文文本都没任何问题，对长串英文不起作用。**`break-word`用来断词而不是用来断字符**

`word-break`：主要针对亚洲语言和非亚洲语言进行控制换行。当取值为 `break-all` 时，可允许非亚洲语言文本的任意字符断开；当值为 `keep-all` 时，表示在中文、韩文、日文中不允许字断开

`white-space`：具有格式化文本作用。当值为 `nowrap` 时，文本强制不换行；当值为 `pre` 时， 显示预定义文本格式。

---

在 `IE` 浏览器下，使用 `word-wrap: break-word` 可以确保所有文本正常显示。在`FF`浏览器下，长串英文会出现问题。为了解决长串英文问题，一般
将 `word-wrap: break-word` 和 `word-break: break-all` 一起使用，但又造成了一个新问题，会导致普通英文语句中的单词断行影响阅读。

---

综上所述：目前主要问题是长串英文和英文单词会被断开。

为了解决这个问题：

> * 使用　`word-wrap: break-wrap` 和 `overflow: hidden` 而不是 `word-wrap: break-word` 和 `word-break: break-all`
> * 点击打开[demo](/effects/demo/css/textWrap/eg4.html)