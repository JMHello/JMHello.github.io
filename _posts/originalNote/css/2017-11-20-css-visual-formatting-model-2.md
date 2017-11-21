---
layout: post
title: "css - 视觉格式化模型 - 中篇 - BFC"
data: 2017-11-20 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

其他链接：


<!-- more -->

## 一、BFC总结图

![vfm](/styles/images/css/vfm/vfm-06.png)

## 二、概念辨析

> * 理解：
>   * 块容器盒（`Box Container Box`）
>   * 块级盒（`block-level box`）
>   * 主要块级盒（`principal block-level box`）
>   * 块盒（`block boxes`）
>   * 匿名块盒(`Anonymous block boxes`)

![bfc](/styles/images/css/vfm/bfc/bfc-06.png)

## 三、块级元素 --- 水平格式化

> * 水平格式化的复杂性在于`width`影响的是内容区的宽而不是整个可见的元素框。

> * 要知道什么情况下会隐式地增加`width`值

### 3.1 水平属性

> * 水平格式化有7大属性
>    * `margin-left`
>    * `border-left`
>    * `padding-left`
>    * `width`
>    * `padding-right`
>    * `border-right`
>    * `margin-right`

>* 元素包含块的宽度（块元素的父元素的`width`值）= 元素7大水平属性之和

### 3.2 使用auto

> * 7个水平属性中，只有3个属性的值可以设置为`auto`:`margin-left`、`width`、`margin-right`
> * 水平外边距不会合并

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg1.html)【7个属性和为 `600px`，无`padding`和 `border`】

![bfc](/styles/images/css/vfm/bfc/bfc-01.png)

![bfc](/styles/images/css/vfm/bfc/bfc-02.png)

### 3.3 负外边距

> * 7个水平属性的总和 = 父元素的 `width`。只要所有属性 >= 0，元素就不会大于父元素的内容区。

> * **元素水平属性过分受限的一个规则：** 通过重置`margin-right`以保证元素水平属性的总和 = 父元素的`width`。
>    * 在此规则下，`margin-right`很容易得到负值
    
> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg2.html)

![bfc](/styles/images/css/vfm/bfc/bfc-03.png)

## 四、块级元素 --- 垂直格式化

> * 一个元素的默认高度由其内容决定。高度还会受其内容宽度的影响：段落越窄，相应就越高。

### 4.1 垂直属性

> * 垂直格式化有7大属性
>    * `margin-top`
>    * `border-top`
>    * `padding-top`
>    * `height`
>    * `padding-bottom`
>    * `border-bottom`
>    * `margin-bottom`
    
> * 元素包含块的高度（块元素的父元素的`height`值）= 元素7大垂直属性之和

### 4.2 使用auto

> * 7个垂直属性中，只有3个属性的值可以设置为`auto`:`margin-top`、`height`、`margin-bottom`
> * 元素的上下外边距设置为`auto`，他们会被重置为0，即：元素框没有上下外边距。
    
> * 块级正常流元素的`height`设置为`auto`
>    * 显示时其高度恰好包含其内联内容的行盒。
>    * 其子元素是块级元素的话，默认的高度 从最高级块级子元素的外边框边界到最低块级子元素外边框边界之间的距离。
>        * 子元素的外边距会“超出”包含这些子元素的元素。
>    * 块级元素有上下内边距/上下边框，其高度从其最高子元素的上外边距边界到其最低子元素的下外边距边界之间的距离。

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg3.html)

![bfc](/styles/images/css/vfm/bfc/bfc-04.png)

### 4.3 百分数高度    

> * 一个正常流元素的`height`设置为一个百分数，其值是包含块 `height`的百分比。

> * 例：`p`元素的高是其父元素`div`的一半，即`3em`

```html
<div style="height: 6em;">
    <p style="height: 50%;"></p>
</div>
```

> * 没有显式声明包含块的`height`，百分数高度会重置为`auto`，即：与其包含块的高度完全相同

```html
<div style="height: auto;">
    <p style="height: 50%;"></p>
</div>
```

### 4.4 垂直方向间距计算

> * 在一个 `BFC` 里，盒子垂直方向的距离由上下 `margin` 决定。
> * 在同一个 `BFC` 中，垂直方向相接的间距会发生合并。
>   * 如都为正值，则取最大值；
>   * 如一正一负，则取相加后的值；
>   * 如都为负，则取绝对值大的那个。

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg4.html)

![bfc](/styles/images/css/vfm/bfc/bfc-05.png)