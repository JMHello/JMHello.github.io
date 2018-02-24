---
layout: post
title: "css - 布局"
data: 2018-02-07 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：


<!-- more -->


## 一、浮动布局

### 1.1 固定宽度布局

> * [demo](/effects/demo/css/layout/v1.html)

> * `html` 代码：布局是左边栏 ===》 中间栏 ===》 右边栏

![layout](/styles/images/css/layout/layout-01.png)

> * 这里只左中右浮动布局，并且是固定宽度布局

> * 关键 `css` 代码如下：
>   * 左右两边栏向左浮动，宽度为 `200px`，中间栏也向左浮动，宽度为`800px`

```css
 .container .center-inner {
    width: 1200px;
    margin: 0 auto;
}
 .container .aside {
    float: left;
    width: 200px;
    color: white;
    background: black;
}
.container .main {
    float: left;
    width: 800px;
    color: white;
    background: #333333;
}
```

> * 以下是效果图：

![layout](/styles/images/css/layout/layout-02.png)

### 1.2 流体布局

> * [demo](/effects/demo/css/layout/v2.html)

> * `html` 代码：布局是 中间栏 ===》 左边栏 ===》 右边栏

![layout](/styles/images/css/layout/layout-03.png)

> * 关键 `css` 代码如下：
>   * 中间栏宽度设置为100%，左浮动
>   * `div.content` 设置 `margin: 0 200px`（留出空位给左右两栏）
>   * 左右两栏左浮动，宽度设置为200px
>   * 左栏`margin-left: -100%`
>   * 右栏`margin-left: -200px`

```css
.container .main {
    width: 100%;
    float: left;
}
.main .content {
    margin: 0 200px;
    padding: 10px;
}
.aside--left,
.aside--right {
    float: left;
    width: 200px;
    background: white;
}
.aside--left {
    margin-left: -100%; /* 这里 -100% 是因为左边栏在下一行，要回到上一行的最左边*/
}
.aside--right {
    margin-left: -200px;
}
```

> * 以下是效果图：

![layout](/styles/images/css/layout/layout-04.png)

## 二、响应式布局

### 2.1 流体布局

> * 流体布局：元素宽度无时无刻都在自适应
> * [demo](/effects/demo/css/layout/v3.html)
> * 这里使用了 `flex` 布局 以及设置断点

![responsive](/effects/images/css/responsive/responsive-01.gif)


### 2.2 流体 + 固定布局

> * [demo](/effects/demo/css/layout/v4.html)

> * 固定：有一个固定宽度，比如1200px 或者 1000px
> * 流体：在特定的断点，布局会有所转换，并且部分内容的宽度会自适应

![responsive](/effects/images/css/responsive/responsive-02.gif)

### 2.3 表现形式改变

> * [demo](/effects/demo/css/layout/v5.html)

![responsive](/effects/images/css/responsive/responsive-03.gif)

### 2.4 总结

> * 如果做响应式布局，要想清楚是做流体布局，还是固定 + 流体布局，还是表现形式改变的响应式布局。
> * 想清楚有什么断点，每个断点有哪些元素的展现形式是有变化的，变化的效果又是什么

