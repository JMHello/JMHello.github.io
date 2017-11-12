---
layout: post
title: "css - 选择器 - 2 - 伪类选择器 - 上篇"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 相关链接：
>   * [css - 选择器 - 1 - 基本选择器和层次选择器](http://www.jmazm.com/2017/11/04/css-selector1/)
>   * [css - 选择器 - 3 - 伪类选择器 - 下篇](http://www.jmazm.com/2017/11/04/css-selector3/)
>   * [css - 选择器 - 4 - 伪元素选择器](http://www.jmazm.com/2017/11/04/css-selector4/)
>   * [css - 选择器 - 5 - 属性选择器](http://www.jmazm.com/2017/11/04/css-selector5/)
>   * [css - 选择器 - 优化](http://www.jmazm.com/2017/11/12/css-optimization/)

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第2章

<!-- more -->

## 一、动态伪类选择器

### 1.1 语法

![selector](/styles/images/css/selector/selector-06.png)

### 1.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-07.png)

### 1.3 demo

> * 点击打开[demo](/effects/demo/css/selector/eg1.html)

![selector](/effects/images/css/selector/selector-04.gif)

## 二、目标伪类选择器

### 2.1 语法

![selector](/styles/images/css/selector/selector-08.png)

### 2.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-09.png)

### 2.3 demo - 手风琴效果

> * 点击打开 [demo](/effects/demo/css/selector/targetSelector/accordion/index.html)

![selector](/effects/images/css/selector/selector-01.gif)

### 2.4 demo - 高亮提示

> * 点击打开 [demo](/effects/demo/css/selector/targetSelector/highlight/index.html)

![selector](/effects/images/css/selector/selector-02.gif)

### 2.5 总结

> * 先看下图：

![selector](/styles/images/css/selector/targetSelector/targetSelector-01.png)

> * 可以看到使用 `:target` 选择器，少不了 `<a>` 标签、`href` 属性（其值为目标元素的`id`值）。

> * 为什么这里需要用到`<a>` 标签？
>   * 因为 `<a>` 标签有一个功能：可以生成内部超链接。【即：将同一文档中的另外一个元素移入视野。】

> * 补充其他 `:target` 的 `demo`：

![selector](/styles/images/css/selector/targetSelector/targetSelector-02.png)

## 三、语言伪类选择器

### 3.1 语法

> * `E:lang(language)`，匹配 `E` 的所有元素，且匹配元素指定的 `lang` 属性，值为 `language`。

### 3.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-10.png)

## 四、UI元素状态伪类选择器

### 4.1 语法

![selector](/styles/images/css/selector/selector-11.png)

### 4.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-12.png)



