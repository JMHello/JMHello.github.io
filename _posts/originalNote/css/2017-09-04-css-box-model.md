---
layout: post
title: "css - 盒子模型"
data: 2017-09-04 20:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

其他链接：


<!-- more -->

## 一、什么是盒子模型

`css`盒子模型(`Box Model`)，又称框模型。包含了元素内容（`content`）、内边距（`padding`）、边框（`border`）、外边距（`margin`）几个要素。

## 二、盒子模型的分类

如下图所示：

![relationship-map]({{ '/styles/images/css/box/box-01.gif' | prepend: site.baseurl }})

### 2.1 W3C盒子模型

* 外盒尺寸计算（**元素空间尺寸**）
    * 元素空间高度＝内容高度＋内距＋边框＋外距
    * 元素空间宽度＝内容宽度＋内距＋边框＋外距

* 内盒尺寸计算（**元素大小**）
    * 元素高度＝内容高度＋内距＋边框（`height就是内容高度`）
    * 元素宽度＝内容宽度＋内距＋边框（`width就是内容宽度`）

### 2.2 IE盒子模型

* 外盒尺寸计算（**元素空间尺寸**）
    * 元素空间高度＝内容高度＋外距（`height包含了元素内容宽度、边框、内距`）
    * 元素宽间宽度＝内容宽度＋外距（`width包含了元素内容宽度、边框、内距`）

* 内盒尺寸计算（**元素大小**）
    * 元素高度＝内容高度（`height包含了元素内容宽度、边框、内距`）
    * 元素宽度＝内容宽度（`width包含了元素内容宽度、边框、内距`）

## 三、box-sizing

`box-sizing`定义盒模型的尺寸解析方式：`box-sizing: content-box | border-box | inherit`

### 3.1 content-box
* 默认值，让元素维持W3C的标准盒模型。
    * 让元素的宽度和高度（`width/height`）等于元素边框宽度（`border`）加上元素内距（`padding`）加上元素内容宽度或高度（`content width/ height`）
        * 即：`element width/height = border + padding + content width / height`

### 3.2 border-box
	
* 让元素维持IE传统的盒模型（IE6以下版本和IE6-7怪异模式）。
    * 让元素的宽度或高度等于元素内容的宽度或高度。
        * 即：这里的内容宽度或高度 包含了 元素的border、padding、内容的宽度或高度
        * 此处的内容宽度或高度 ＝ 盒子的宽度或高度—边框—内距

### 3.3 inherit

* 使元素继承父元素的盒模型模式

## 四、document.compatMode

* `document.compatMode`的用途：检测渲染页面的模式是`W3C`标准模式还是`IE`的怪异模式。
    * 在标准模式下：`document.compatMode` 的值等于`"CSS1Compat"`。
    * 在混杂模式下：`document.compatMode` 的值等于`"BackCompat"`。

```js
if (document.compatMode == "CSS1Compat"){
    alert("Standards mode");
} else {
    alert("Quirks mode");
} 
```
