---
layout: post
title: "css面试题目 - 布局总结"
data: 2018-03-06 10:27:00 +0800
categories: 面试
tag: interview
---
* content
{:toc}

<!-- more -->


## 一、布局总结

常用布局有以下：

![layout](/styles/images/css/layout/layout.png)

## 二、布局展示

> * [demo](/effects/demo/css/layout/v3/v1.html)

* 单栏布局

![layout](/styles/images/css/layout/layout-07.png)

* 两栏布局

![layout](/styles/images/css/layout/layout-08.png)

* 三栏布局和圣杯布局

![layout](/styles/images/css/layout/layout-09.png)

* 等分布局和等高布局

![layout](/styles/images/css/layout/layout-10.png)

## 三、当要写布局时的思维方向

> * 先从大布局下手，再到小布局

* inlin-block？ block？
* 浮动布局？
* 定位布局？
* 弹性布局？
* 表格布局？
* 网格布局？
* column布局？

## 四、总结实现每个布局有什么方法

### 4.1 单栏布局

水平居中

* inline-block + text-align
* absolute + transform
* flex + justify-content
* table + margin

垂直居中

* absolute + transform
* flex + align-items
* table-cell + vertical-align

水平垂直居中

* table-cell + vertical-align + inline-block + text-align
* table + table-cell + vertical-align  + text-align
* absolute + transform
* flex + justify-content + align-items

### 多栏布局

对于左右布局或者左中右布局

* 浮动布局
* 定位布局
* 弹性布局
* 表格布局
* 网格布局


对于上下布局或者上中下布局

* 定位布局
* 弹性布局
* 表格布局
* 网格布局

---

多列不定宽，一列自适应

* [float + overflow](/effects/demo/css/layout/v3/v2.html)