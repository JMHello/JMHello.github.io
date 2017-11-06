---
layout: post
title: "css - 选择器 - 3 - 伪类选择器 - 下篇"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第2章

<!-- more -->

## 一、结构伪类选择器

### 1.1 语法

![selector](/styles/images/css/selector/selector-13.png)

### 1.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-14.png)

### 1.3 结构伪类选择器中的 n

![selector](/styles/images/css/selector/structorSelector/structorSelector-01.png)

> * 补充：
>   * `n` 为整数，并且只能从1开始。
>   * `n` 可以是 `odd` （奇数：1、3、5、7、9）；或者是 `even` （偶数：2、4、6、8、10）

### 1.4 :first-child

> * `:first-child`：定位某个元素的第一个子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg1.html)

> * 效果图

![selector](/styles/images/css/selector/structorSelector/structorSelector-02.png)

---

> * 考虑使用 `:first-child` 的场景：
>   * 上述效果其实可以通过 **添加类名** 去解决，但是，如果多处都有这样的效果，那岂不是要为每个元素都添加这个类名？这样的话，这个代码看上去就会很冗杂。所以，此时可以考虑使用`:first-child`。
>   * 如果使用`:first-child` 来移除一个浮动元素的左边距或右边距，如果浏览器不支持`:first-child`，布局将会被破坏。

### 1.5 :last-child 

> * `:last-child`：定位某个元素的最后一个子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg2.html)

> * 效果图

![selector](/styles/images/css/selector/structorSelector/structorSelector-03.png)

### 1.5 :nth-child()

> * `:nth-child(n)`：定位某个父元素的一个或多个特定的子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg3.html)

> * 效果图

![selector](/styles/images/css/selector/structorSelector/structorSelector-04.png)

### 1.6 :nth-last-child()

> * `:nth-last-child(n)`：定位某个父元素的一个或多个特定的子元素，不过是从父元素的最后一个子元素开始计算。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg4.html)

> * 效果图

![selector](/styles/images/css/selector/structorSelector/structorSelector-05.png)

> * 补充：`:nth-child()` 和 `:nth-last-child()` 比较 

![selector](/styles/images/css/selector/structorSelector/structorSelector-06.png)

### 1.5 :nth-of-type()

> * `:nth-of-type(n)`：定位某个父元素的一个或多个特定的子元素，不过它只是计算父元素中指定的某种类型的子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg4.html)

> * 效果图

![selector](/styles/images/css/selector/structorSelector/structorSelector-05.png)


## 二、、否定伪类选择器

### 2.1 语法

![selector](/styles/images/css/selector/selector-15.png)

### 2.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-16.png)

