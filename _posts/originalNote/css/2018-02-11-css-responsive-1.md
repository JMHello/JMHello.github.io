---
layout: post
title: "css - 响应式 - 1"
data: 2018-02-11 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   * [移动前端开发之viewport的深入理解](https://www.cnblogs.com/2050/p/3877280.html)
>   * [7种方法解决移动端Retina屏幕1px边框问题](https://www.jianshu.com/p/7e63f5a32636)
>   * [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)


<!-- more -->


## 一、什么是响应式

> * 响应式指通过`css`实现，让一套代码都能在不同的设备上都完美呈现的解决方案

> * 如何实现响应式？ --- 主要从4个方面入手
>   1. `viewport`
>   2. `media queries`
>   3. 内容布局
>   4. 图片大小

## 二、viewport

> * `viewport` 其实就是浏览器的可视区，但是可视区与设备的宽度并没有必然的关系

> * [demo](/effects/demo/css/responsive/v1.html)，请看下图

![viewport](/styles/images/css/responsive/responsive-01.png)

> * 从图中可以发现：(图片宽度设置为300px)
>   * 没有设置`viewport`，其`body`的宽度还是980px，图片显示得非常小
>   * 设置`viewport`，其`body`的宽度还是375px，图片显示正常

> * 所以，这也是为什么我们在做响应式设计的时候，要注意`viewport`，因为，我们要以最好的形式呈现给用户！

> * 设置`viewport` 的关键代码是：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
``` 

> * 以下是`viewport`的一些相关属性

![viewport](/styles/images/css/responsive/responsive-02.png)

## 三、媒体查询

### 3.1 介绍

> * 使用 `@media` 查询，你可以针对不同的媒体类型定义不同的样式。

> * `@media` 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，`@media` 是非常有用的。

> * 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

### 3.2 语法

```
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

或者

```
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

### 3.3 媒体类型

![responsive](/styles/images/css/responsive/responsive-02.png)

### 3.4 媒体功能

![responsive](/styles/images/css/responsive/responsive-03.png)

### 3.5 流行尺寸

![responsive](/styles/images/css/responsive/responsive-04.png)

## 四、响应式布局

> * 响应式布局主要有三种形式：
>   * 流体布局
>   * 流体 + 固定布局
>   * 表现形式改变的布局

> * 具体例子查看 [响应式布局](http://www.jmazm.com/2018/02/07/css-layout/)


