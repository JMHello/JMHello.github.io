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

> * 这里只左中右浮动布局，并且是固定宽度布局

> * 关键 `css` 代码如下：
>   * 左右两边栏向左浮动，宽度为 `200px`，中间栏也向左浮动，左右外边距为 `200px`，宽度为自适应宽度

```css
.main .content {
    float: left;
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