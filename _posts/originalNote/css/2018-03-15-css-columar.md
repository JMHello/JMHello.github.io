---
layout: post
title: "css - 柱状图"
data: 2018-03-15 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、柱状图的实现思路

柱状图有固定的高度

使用flex布局 + 定位布局

x轴需要绝对定位（向下定位），x轴方向上的变量需要 `space-around`
y轴也是绝对定位（向左定位），y轴方向上的变量需要 `space-between`

x轴由于设置了绝对定位，因此会脱离文档里，所以x轴的容器需要显式设定`width: 100%`；而矩形的容器则不用，它会默认继承其父亲的宽度。

对了，矩形容器需要设置 `height: 100%`，才能保证矩形正常显示（其子元素我都是设置了百分比的高度）。如果我取消了矩形容器`div.bar`的`height: 100%`，并设置其中一个矩形的高度为 `70px`，就会如下图所示：

![progress-06](/styles/images/css/progress/progress-06.png)

从上图可看到，矩形的高度只有 `70px`，而其他矩形却没有显示，而矩形容器的高度也是 `70px`。


x轴和矩形的容器的宽度必须显式设定`100%`，才能保证x轴一个变量对应一个矩形！
x轴和矩形的容器的宽度必须显式设定`100%`，才能保证x轴一个变量对应一个矩形！

`html` 结构：

```html
<div class="columnar">
    <div class="columnar-inner">
        <!-- x 轴 -->
        <ul class="x-axis"></ul>
        <!-- y轴 -->
        <ul class="y-axis"></ul>
        <!-- 矩形 -->
        <div class="bar"></div>
    </div>
</div>
```