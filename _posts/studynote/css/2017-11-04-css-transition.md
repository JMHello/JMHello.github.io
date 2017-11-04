---
layout: post
title: "css - transition - 过渡"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第12章

<!-- more -->

## 一、过渡简介

### 1.1 什么是过渡

> * `W3C` 标准中描述的 `transition` 的功能很简单：`CSS3` 的 `transition` 允许 `CSS` 的属性值在一定时间区间内 **平滑** 过渡。
> * 这种效果可以在鼠标点击、获得焦点、被点击或对元素任何改变中触发，并平滑地以动画效果改变 `CSS` 的属性值。

### 2.2 兼容性

> * 查看[transition](http://caniuse.com/#search=transition)浏览器兼容情况。

![transition](/styles/images/css/transition/transition-01.png)

### 2.3 基本语法

```
transition: transition-property transition-duration transition-timing-function transition-delay [,transition-property transition-duration transition-timing-function transition-delay];
```

![transition](/styles/images/css/transition/transition-02.png)

> * 注意：
>   * 这4个子属性间不能用逗号分隔，而是使用空格分隔。
>   * 在`transition` 简写中，`transition-duration` 和 `transition-delay` 取值都是 `<time>`，浏览器会根据先后顺序决定：第一个 `<time>` 会解析为 `transition-duration`，第二个 `<time>` 会解析为 `transition-delay`。

## 二、属性详解

### 2.1 指定过渡属性 transition-property

> * `transition-property` : 指定过渡动画的 `CSS` 属性名称。
> * 基本语法：
>   * `all`：默认值，所有属性都将获得过渡效果。#
>   * `none`：没有属性会获得过渡效果。
>   * `<single-transition-property>`：定义应用过渡效果的 CSS 属性名称列表，列表以逗号分隔。

```
transition-property: none|all|single-transition-property;
```

> * 支持 `transition` 过渡功能的 `CSS` 属性表

![transition](/styles/images/css/transition/transition-03.png)

> * 用 `transition-property` 指定的过渡属性并不是所有属性都可以过渡，只有属性具有一个中点值得属性才能具备过渡效果。请看下图：

![transition](/styles/images/css/transition/transition-04.png)

---

> * 点击打开[demo](/effects/demo/demo-css/transition/eg1.html)

> * 效果如下：

![transition](/effects/images/css/transition/transition-01.gif)

### 2.2 指定过渡所需时间 transition-duration

> * `transition-duration`：设置一个属性过渡到另一个属性所需的时间，即：从旧属性过渡到新属性话费的时间。
> * 单位：秒 `(s)` 或 毫秒 `(ms)` ；默认值为0，变换是即时的，指定元素样式过渡时，看不到过程，直接看到结果。
> * 可用于所有元素，包括 `:before` 和 `:after` 伪元素。 

```
transition-duration: <time> [,<time>] * ;
```

> * 点击打开[demo](/effects/demo/demo-css/transition/eg2.html)

> * 效果如下：

![transition](/effects/images/css/transition/transition-02.gif)

### 2.3 指定过渡函数 transition-timing-function

> * `transition-timing-function`：指定某种指代过渡 “缓动函数” 的属性。
> * 此属性可指定浏览器的过渡速度以及过渡期间的操作进展情况。
> * 可以将某个值指定为预定义函数、阶梯函数或者三次贝塞尔曲线。

```
transition-timing-function: <single-transition-timing-function> [, single-transition-timing-function]
```

> * 单一过渡函数

![transition](/styles/images/css/transition/transition-05.png)

> * `cubic-bezier` 
> * 点击打开网站[cubic-bezier](http://cubic-bezier.com/#.17,.67,.83,.67)
> * 点击打开网站[cubic-bezier builder](http://www.roblaplaca.com/examples/bezierBuilder/)
> * 点击打开网站[easing animation tool](https://matthewlein.com/tools/ceaser)

![transition](/styles/images/css/transition/transition-06.png)

### 2.4 指定过渡延迟时间 transition-delay

> * `transition-delay`：指定一个动画开始执行的时间，即：当改变元素属性值后多长时间开始执行过渡效果。
> * 取值：【单位：秒 `(s)` 或 毫秒 `(ms)` 】
>   * 正整数：元素的过渡动作不会立即触发，当过了设定的时间值后触发。
>   * 负整数：元素的过渡动作会从该时间点开始显示，之前的动作被截断。
>   * 0：默认值，元素的过渡动作会立即出发，没有任何延迟。

```
transition-delay: <time> [,<time>] * ;
```

## 三、css3 触发过渡

### 3.1 伪元素触发

> * 使用 `:active` 【点击打开[demo](/effects/demo/demo-css/transition/eg3.html)】，效果如下：

![transition](/effects/images/css/transition/transition-03.gif)

> * 使用 `:focus` 【点击打开[demo](/effects/demo/demo-css/transition/eg4.html)】，效果如下：

![transition](/effects/images/css/transition/transition-04.gif)

> * 使用 `:checked` 【点击打开[demo](/effects/demo/demo-css/transition/eg5.html)】，效果如下：

![transition](/effects/images/css/transition/transition-05.gif)

### 3.2 媒体查询触发

> * 使用媒体查询触发 【点击打开[demo](/effects/demo/demo-css/transition/eg6.html)】，效果如下：

![transition](/effects/images/css/transition/transition-06.gif)

### 3.3 Javascript 触发

> * 使用媒体查询触发 【点击打开[demo](/effects/demo/demo-css/transition/eg7.html)】，效果如下：

![transition](/effects/images/css/transition/transition-07.gif)

> * 这里补充一下：
>   * 如果将 `transition` 添加到 `.box` 类，即初始类，而 `.on` 不添加 `transition`，你会发现在这两个类中切换的话，都是有过渡的效果的；
>   * 如果将 `transition` 添加到 `.on` 类，即初始类，而 `.box` 不添加 `transition`，你会发现在这两个类中切换的话，第一次点击按钮，是 `.box ==》 .on`，有过渡效果，
>     第二次点击按钮，是 `.on ==》 .box`，没有过渡效果。

