---
layout: post
title: "css - 彻底理解行高"
data: 2017-11-22 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   * [深入理解CSS中的行高](http://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html)
>   * [CSS行高——line-height](https://www.cnblogs.com/dolphinX/p/3236686.html)
>   * [7.3 行高：line-height属性](http://www.ddcat.net/blog/?p=227)
>   * [css行高line-height的一些深入理解及应用](http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)


<!-- more -->

## 一、行高总结图

![line-height](/styles/images/css/lineHeight/lineHeight-02.png)


## 二、相关概念的理解


> * 概念展示图

![line-height](/styles/images/css/lineHeight/lineHeight-01.png)

## 三、行盒高度

> * 点击打开[demo](/effects/demo/css/lineHeight/eg1.html)

![line-height](/styles/images/css/lineHeight/lineHeight-03.png)

## 四、行内级元素垂直对齐方式（vertical-align）

### 4.1 必知概念

![line-height](/styles/images/css/lineHeight/lineHeight-04.png)

### 4.2 vertical-align 取值

> * `vertical-align` 作用于 **行内元素**。
> * 默认的对齐方式为 `baseline`，一般使用最多的就是 `middle`，偶尔你还会看到使用像素来偏移。
> * 注意 `text-top` 及 `text-bottom` 的对齐方式有点特别，不过实战中几乎不用。

![line-height](/styles/images/css/lineHeight/lineHeight-05.png)

### 4.3 demo

> * 点击打开[demo](/effects/demo/css/lineHeight/eg2.html)

![line-height](/styles/images/css/lineHeight/lineHeight-06.png)