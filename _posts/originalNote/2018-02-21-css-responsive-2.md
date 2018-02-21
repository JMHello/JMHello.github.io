---
layout: post
title: "css - 响应式 - 2"
data: 2018-02-21 10:27:00 +0800
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   * [响应式图片srcset全新释义sizes属性w描述符](http://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/)
>   * [HTML5响应式图片技术中文图解](http://www.zhangxinxu.com/wordpress/2015/11/anatomy-of-responsive-images/)
>   * [设备像素比devicePixelRatio简单介绍](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)
>   * [响应式图片— srcset 和 sizes 属性](https://segmentfault.com/a/1190000004411869)


<!-- more -->


## 一、响应式图片

### 1.1 设备像素比devicePixelRatio简单介绍

> * 物理像素：我们把分辨率的像素称之为物理像素或设备像素（如 `iPhone 7` 的物理像素为 `750px * 1334px`），它是显示设备中一个最微小的物理部件。

> * 设备独立像素：`CSS` 的尺寸像素称之为设备独立像素（`device-independent pixels` 简称为“`DIPs`”）或 `CSS` 像素（如 `iPhone 7` 的设备独立像素为 `375px * 667px`），它是一个抽象的单位，主要使用在浏览器上，用来精确的度量（确定）`Web`页面上的内容。

> * `window.devicePixelRatio`（简写 `DPR`）:
>   * 用来描述物理像素与设备独立像素的比例，其值等于 “**物理像素 / 设备独立像素**”。
>   * `devicePixelRatio` 值为 1 时就是我们的标准屏，值为 2 时则是我们俗称的 2 倍屏（`2x`），同样 3 就是 3 倍屏（`3x`）。

### 1.2 响应式图片srcset属性

> * `srcset` 属性：用于浏览器根据宽、高和像素密度来加载相应的图片资源
>   * 格式：`srcset = "图片路径 宽/高/像素密度, 图片路径 宽/高/像素密度"`
>   * 宽：`128w`
>   * 像素密度：`1x` 【其实就是几倍屏的意思】

```html
<!-- w描述符  -->
<img srcset="mm-width-128px.jpg 128w, mm-width-256px.jpg 256w, mm-width-512px.jpg 512w">

<!-- x描述符：表示几倍屏 -->
<img srcset="mm-width-128px.jpg 1x, mm-width-256px.jpg 2x, mm-width-512px.jpg 3x">
```

### 1.3 响应式图片sizes属性

> * `sizes` 属性明确定义了图片在不同的 `media conditions`下应该显示的尺寸。格式如下：

```
<img src="one.png"  
     srcset="two.png 100w, three.png 500w, four.png 1000w"

     sizes="<media condition> <width>,
            <media condition> <width>,
            <optional default image width>"\>
```

> * `Media Conditions`：媒体查询条件
> * `width`：可以使用任意的长度单位，比如：`em`, `rem`, `pixels`, 和 `viewport width`。【百分比单位是不允许的，如果需要使用相对单位，`vw`是推荐使用的。】
> * `<optional default image width>`：除查询条件外的默认的图片的宽度


### 1.4 demo

> * [demo](/effects/demo/css/responsive/img/v1.html)

```html
<h2>图片1</h2>
<img
     srcset="mm-width-128px.jpg 128w, mm-width-256px.jpg 256w, mm-width-512px.jpg 512w"
     sizes="(max-width: 360px) 340px, 128px"
>
<h2>图片2</h2>

<img 
     srcset="mm-width-128px.jpg 128w, mm-width-256px.jpg 256w, mm-width-512px.jpg 512w"
     sizes="(max-width: 360px) calc(100vw - 20px), 128px"
>
```

> * 先说说上面的代码是什么意思：
>   * 上面的 `img`：设置的 `sizes` 属性值为 `(max-width: 360px) 340px, 128px`，表示
>       当视区宽度不大于 `360px` 时，图片的宽度限制为 `340px`；其他情况下使用 `128px`
>   * 下面的 `img`：设置的 `sizes` 属性值为 `(max-width: 360px) calc(100vw - 20px), 128px`,
>       表示当视区宽度不大于 `360px` 时，图片的宽度限制为屏幕宽度减 `20px`；其他情况下使用 `128px`

---

> * 当在 `pc` 端打开上面的`demo`时，两个`img`展现的都是 `128.jpg` 这张图片

![responsive](/styles/images/css/responsive/responsive-05.png)

> * 原因如下：
>   * 由于桌面的显示宽度远远大于 `360px`，所以图片计算的尺寸宽度为 `128px`；
>   加上屏幕密度为 `1` ，因此正好是 `128w` 这个规格，于是加载 `128x.jpg` 这张图片。

---

> * 当在 `iphone6` 下打开上面`demo`， 两个`img`展现的都是 `256.jpg` 这张图片

![responsive](/styles/images/css/responsive/responsive-06.png)

> * 原因如下：
>   * 屏幕宽度为 `375px`， 依然大于 `360px`，但是其屏幕密度是 `2`，因此，图片尺寸 `128px`
>     乘以密度 `2` ，正好是 `256w` 这个规格，于是加载 `256x.jpg` 这张图片

---

> * 当在 `iphone6 plus` 下打开上面`demo`， 两个`img`展现的都是 `512.jpg` 这张图片

![responsive](/styles/images/css/responsive/responsive-07.png)

> * 原因如下：
>   * 屏幕宽度为 `414px`， 依然大于 `360px`，但是其屏幕密度是3，因此，图片尺寸 `128px`
>     乘以密度 `3` ，正好是 `384w` 这个规格，由于这个规格比较靠近 `512w`，所以选择 `512w` 这个规格，
>     于是加载 `512x.jpg` 这张图片

---

> * 就像上面所说的，计算出的规格是 `384w`，但是实际规格没有，就选择比`384w` 大的规格 `512w`
> * 如果计算出的规格是 `600w`， 实际规格没有，也选择比 `600w` 小的规格 `512w`

### 1.5 srcset and sizes 兼容性

![responsive](/styles/images/css/responsive/responsive-08.png)