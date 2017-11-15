---
layout: post
title: "css - radial-gradient"
date: 2017-11-14 15:00:00 +0800 
categories: 原创
tag: CSS
---
* content
{:toc}


<!-- more -->

## 一、径向渐变总结图

![gradient](/styles/images/css/gradient/gradient-10.png)

## 二、浏览器兼容性

> * 点击查看[兼容性](https://caniuse.com/#search=linear-gradient)

![gradient](/styles/images/css/gradient/gradient-04.png)

## 三、理解size(即：extend-keyword)

### 3.1 demo 展示

> * 请看下图：

![gradient](/styles/images/css/gradient/gradient-15.png)

> * 点击打开[demo](/effects/demo/css/gradient/demo5/index.html)，效果如下图：

![gradient](/effects/images/css/gradient/gradient-01.gif)

### 3.2 分析

> * 先看下图：

![gradient](/styles/images/css/gradient/gradient-20.png)

> * 从 `3.1` 的 `demo` 和上面的图片我们知道：
>   * 第`1`个椭圆就是最里面的红色椭圆。
>   * 第`2`个椭圆就是里面的黄色椭圆。
>   * 第`3`个椭圆就是较外面的红色椭圆。
>   * 第`4` 就是 黄色了。

---

> * 其实如果是径向渐变的话，每一种颜色都是一个椭圆（个人猜测除了最后一个颜色不是一个椭圆。但是，或许它就是一个很大的椭圆，我们无法看到而已）。【圆形亦如此。】
>   * 即：我们可以暂时将倒数第二个颜色（这里是黄色）作为渐变的结束边界。【不过你也可以从图上看到，边界中会掺杂一些黄色，这个可以通过 `transparent` 解决】

---

> * **接着要说的就是每个椭圆或者圆的渐变半径了！！！**

> * 对于圆来说，是最简单的，只要一个找到一个半径即可（这里就需要知道 **圆心位置 +　`extend-keyword`**）。

> * 对于椭圆来说，除了要知道 **圆心位置 +　`extend-keyword`** 之外，我们还需要找到 **两个半径（包括水平半径和垂直半径）** 才可以决定 椭圆渐变的范围。
> * 上面说了，每一种颜色就是一个椭圆，因此每个颜色的渐变范围都是根据上述所讲的去处理。
> * 还有，对于 `closest-corner` 和 `farthest-corner` 来说， 看上面的介绍所说的，貌似只是找一个最近或最远距离，但请仔细想一想，根据高中学的知识，还不是可以根据这最近或最远距离
>   找到最近/最远水平半径，找到最近/最远垂直半径。

---

> * **最后总结一句：径向渐变的范围就是根据 圆心位置 + `extend-keyword` 找到渐变的半径！！！** 

## 四、demo

### 4.1 语法

![gradient](/styles/images/css/gradient/gradient-14.png)

### 4.2 理解 radial-gradient

![gradient](/styles/images/css/gradient/gradient-13.png)


### 4.3 radial-gradient demo

> * 点击打开[demo](/effects/demo/css/gradient/demo2/index.html)，结果如下图所示：

![gradient](/styles/images/css/gradient/gradient-11.png)

![gradient](/styles/images/css/gradient/gradient-12.png)

![gradient](/styles/images/css/gradient/gradient-16.png)

