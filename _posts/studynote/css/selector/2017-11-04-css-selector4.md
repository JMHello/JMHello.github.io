---
layout: post
title: "css - 选择器 - 4 - 伪元素选择器"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 相关链接：
>   * [css - 选择器 - 选择器分类](http://www.jmazm.com/2017/11/04/css-basic/)
>   * [css - 选择器 - 1 - 基本选择器和层次选择器](http://www.jmazm.com/2017/11/04/css-selector1/)
>   * [css - 选择器 - 2 - 伪类选择器 - 上篇](http://www.jmazm.com/2017/11/04/css-selector2/)
>   * [css - 选择器 - 3 - 伪类选择器 - 下篇](http://www.jmazm.com/2017/11/04/css-selector3/)
>   * [css - 选择器 - 5 - 属性选择器](http://www.jmazm.com/2017/11/04/css-selector5/)
>   * [css - 选择器 - 优化](http://www.jmazm.com/2017/11/12/css-optimization/)

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第2章

<!-- more -->

## 1、::first-letter

> * `::first-letter`：选择文本块的第一个字母，除非在同一行中包含一些其他元素。
>   * 使用场景：下沉字母或首字母 【点击打开[demo](/effects/demo/css/selector/NegativeSelector/eg1.html)】

![selector](/styles/images/css/selector/negativeSelector/negativeSelector-01.png)


## 2、::first-line

> * `::first-line`：选择文本块的第一行文本，匹配 `block`、`inline-block`、`table-caption`、`table-cell`等级别元素的第一行。
> * 点击打开[demo](/effects/demo/css/selector/NegativeSelector/eg2.html)】

![selector](/styles/images/css/selector/negativeSelector/negativeSelector-02.png)

## 3、::before 和 ::after

> * `::before` 和 `::after` 不是指存在于标记中的内容，而是可以插入额外内容的位置。
>   * 生成的内容不会成为 `DOM` 的一部分，但可以设置样式。
>   * 为伪元素生成内容，还需要用到 `content` 属性。

## 4、::selection

> * `::selection`：匹配突出显示的文本。浏览器默认情况下，选择网站文本时深蓝色背景，白色字体。
> * `IE9` 支持，`Firefox` 加上私有属性 `-moz-`。
> * 仅接受两个属性：`background` 和 `color`。
