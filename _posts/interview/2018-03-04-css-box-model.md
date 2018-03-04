---
layout: post
title: "css面试题目 - css盒模型"
data: 2018-03-04 10:27:00 +0800
categories: 原创
tag: 面试题目
---
* content
{:toc}

<!-- more -->



## 一、谈谈你对CSS盒模型的理解

### 1.1 回答的思路

> 1. 基本概念：标准模型 + IE 模型
> 2. 标准模型和IE模型的区别
> 3. CSS如何设置这两种模型
> 4. JS如何设置获取盒模型对应的宽和高

> 5. 实例题（根据盒模型解析边距重叠）
> 6. BFC（边距重叠解决方案）

### 1.2 概念

> * css盒模型有两种：标准模型 + IE 模型

### 1.3 标准模型和IE模型的区别

> * 宽高的计算方式不一样
>   * W3C标准盒模型和宽高是就是content的宽高
>   * 而IE盒模型的宽高则是 content + padding + border 的宽高

### 1.4 CSS如何设置这两种模型

> * box-sizing: content-box(默认) 或者 border-box

### 1.5 JS如何设置获取盒模型对应的宽和高

|           方法          |                                 备注                                        |
|:----------------------|:----------------------------------------------------------------------------|
|节点.style.width/height| 只能获取行内样式设置的宽高，内联和外链都不行|
|节点.currentStyle.width/height  【IE】 window.getComputedStyle(节点).width/height 【其他】| 获取渲染后的宽高|
|节点.offsetWidth/offsetHeight|	获取元素的content + padding + border宽高值|
|节点.getBoundingClientRect().width/heigh|此API返回一矩形对象，其中的left, top, right, bottom描绘了元素相对于视窗左上角的位置，而width/height与offsetWidth与offsetHeight一样|

### 1.6 根据盒模型解析边距重叠

> * W3CSchool规定：当两个垂直外边距相遇的时候，他们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大值。

### 1.7 BFC

> 考察点：BFC的基本概念、BFC的原理、如何创建BFC、BFC的使用场景

> * 概念：块级格式化上下文

> * 原理(即渲染规则)
>   1.块级盒会在垂直方向，一个接一个地放置，每个盒子水平占满整个容器空间
>   2.块级盒的垂直方向距离由上下margin决定，同属于一个BFC中的两个或以上块级盒的相接的margin会发生重叠
>   3.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
>   4.计算BFC的高度时，浮动元素也参与计算

> * 创建BFC
>   1.float除了none以外的值
>   2.overflow除了visible以外的值hidden，auto，scroll
>   3.display (table-cell，table-caption，inline-block, flex, inline-flex)
>   4.position值为（absolute，fixed）