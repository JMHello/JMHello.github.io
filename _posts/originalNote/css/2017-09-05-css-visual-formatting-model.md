---
layout: post
title: "css - 视觉格式化模型 - 上篇 - 简介"
data: 2017-09-05 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   * [替换元素和非替换元素](http://blog.csdn.net/gr11222/article/details/52071168)


<!-- more -->

## 一、什么是视觉格式化模型

![vfm](/styles/images/css/vfm/vfm-05.png)

## 二、关于模型的一些基础知识

### 2.1 包含块

![vfm](/styles/images/css/vfm/vfm-01.png)

> * 包含块举例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>包含块</title>
</head>
<body>
<div class="container">
    <div class="div1">div</div>
    <p class="p p1">the first paragraph</p>
    <p class="p p2">
        <em>the<strong>second</strong>paragraph</em>
    </p>
</div>
</body>
</html>
```

![vfm](/styles/images/css/vfm/vfm-02.png)


### 2.2 正常流

> * 指西方语言文本从左向右、从上向下显示。
> * 要让一个元素不在正常流中，可通过使元素成为浮动元素或者定位元素。

### 2.3 非替换元素

> * 非替换元素：`(X)HTML` 的大多数元素都是非替换元素，他们将内容直接告诉浏览器，将其显示出来

> * 行内非替换元素特点：
>   * 行内非替换元素添加 `padding-top` 或 `padding-bottom`，不影响行框高度，但内容去高度会变化
>   * `margin-top`，`margin-bottom` 对行框没有任何影响
>   * 添加左右边距会影响行内非替换元素水平位置

---

> * 以下这两个 `demo` 是关于行内非替换元素与行内替换元素的对比：

> * 行内非替换元素：【点击打开[demo1](/effects/demo/css/vfm/eg3.html)】

![vfm](/styles/images/css/vfm/vfm-07.png)

> * 行内替换元素：【点击打开[demo2](/effects/demo/css/vfm/eg4.html)】

![vfm](/styles/images/css/vfm/vfm-08.png)

### 2.4 替换元素

> * 替换元素：替换元素是浏览器根据元素的标签和属性，来决定元素的具体显示内容

> * 替换元素：
>   * `audio` 和 `canvas` 在某些特定情况下为替换元素
>   * 行内替换元素：`input`/`textarea`/`select`(`display:inline-block`)；`img`/`object`/`iframe`(`display:inline`)

> * 特点：
>   * 替换元素是其内容不受`css`视觉格式化模型控制的元素
>   * 在这些元素没有实际的内容，是个空元素
>   * 浏览器会根据元素的标签类型和属性来显示这些元素
>   * 替换元素也在其显示中生成了框 --- 替换元素通常有其固有的尺寸（一个固有的宽度、一个固有的高度和一个固有的比率）
>   * 替换元素可增加其行框高度，带不影响`line-height` --- 内容区高度值 = `pading-top` + `padding-bottom` + `margin-top` + `margin-bottom` + `height`（要向替换元素居中，可设置 `line-height = height`）


> * 这个 `demo` 是关于说明行内替换元素有哪些。【点击打开[demo](/effects/demo/css/vfm/eg5.html)】

![vfm](/styles/images/css/vfm/vfm-09.png)
    
### 2.5 块级元素

> * 当元素的 `CSS` 属性 `display` 的计算值为 `block`，`list-item`，`table`，`flex` 或 `grid` 时，它是块级元素。
> * 块级元素在正常流中，会在其框前和框后生成“换行”，因此，处于正常流中的块级元素会垂直摆放。

![relationship-map]({{ '/styles/images/css/box/box-01.png' | prepend: site.baseurl }})

> * 一个元素的`width`被定义为从左内边界到右内边界的距离
> * 一个元素的`height`则是从上内边界到下内边界的距离

### 2.6 行内元素

> * 行内元素不会在框前或框后生成“行分隔符”。
>    * 行内元素有：`strong`、`span`、`em`、`i`、`b`

### 2.7 根元素

> * 根元素就是位于文档树顶端的元素。
>    * 在`HTML`文档中，就是<`html`>
>    * 在`XML`文档中，可以是该语言允许的任何元素
    
