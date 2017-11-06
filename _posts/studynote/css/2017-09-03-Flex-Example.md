---
layout: post
title: "css - Flex - 实例"
date: 2017-09-03 12:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

其他链接：

+ [css - Flex - 基础]({{ '/2017/09/03/Flex-Basic' | prepend: site.baseurl }})

> 以下内容都摘自博客：[http://www.ruanyifeng.com/blog/2015/07/flex-examples.html](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)  

<!-- more -->

先`pose`一张图：

![relationship-map]({{ '/styles/images/css/flex/flex-14.png' | prepend: site.baseurl }})

## 一、骰子的布局

* 骰子的一面，最多可以放置9个点。

![relationship-map]({{ '/styles/images/css/flex/flex-15.png' | prepend: site.baseurl }})

* 下面，就来看看Flex如何实现，从1个点到9个点的布局。

![relationship-map]({{ '/styles/images/css/flex/flex-16.png' | prepend: site.baseurl }})

* 如果不加说明，本节的HTML模板一律如下。

```html
<div class="box">
  <span class="item"></span>
</div>
```

* 上面代码中，div元素（代表骰子的一个面）是Flex容器，span元素（代表一个点）是Flex项目。如果有多个项目，就要添加多个span元素，以此类推。

### 1.1 单项目

* 首先，只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。

![relationship-map]({{ '/styles/images/css/flex/flex-17.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
}
```

* 设置项目的对齐方式，就能实现居中对齐和右对齐。

![relationship-map]({{ '/styles/images/css/flex/flex-18.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: center;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-19.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: flex-end;
}
```

* 设置交叉轴对齐方式，可以垂直移动主轴。

![relationship-map]({{ '/styles/images/css/flex/flex-20.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  align-items: center;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-21.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-22.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-23.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
```

### 1.2 双项目

![relationship-map]({{ '/styles/images/css/flex/flex-24.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: space-between;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-25.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-26.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-27.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-28.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-29.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  justify-content: space-between;
}

.item:nth-child(2) {
  align-self: flex-end;
}
```

### 1.3 三项目

![relationship-map]({{ '/styles/images/css/flex/flex-30.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}

.item:nth-child(3) {
  align-self: flex-end;
}
```

### 1.4 四项目

![relationship-map]({{ '/styles/images/css/flex/flex-31.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-32.png' | prepend: site.baseurl }})

```html
<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
```

### 1.5 六项目

![relationship-map]({{ '/styles/images/css/flex/flex-33.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-34.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
```

![relationship-map]({{ '/styles/images/css/flex/flex-35.png' | prepend: site.baseurl }})

```html
<div class="box">
  <div class="row">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="row">
    <span class="item"></span>
  </div>
  <div class="row">
     <span class="item"></span>
     <span class="item"></span>
  </div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(2){
  justify-content: center;
}

.row:nth-child(3){
  justify-content: space-between;
}
```

### 1.6 九项目

![relationship-map]({{ '/styles/images/css/flex/flex-36.png' | prepend: site.baseurl }})

```css
.box {
  display: flex;
  flex-wrap: wrap;
}
```

## 二、网格布局

### 2.1 基本网格布局

最简单的网格布局，就是平均分布。在容器里面平均分配空间，跟上面的骰子布局很像，但是需要设置项目的自动缩放。

![relationship-map]({{ '/styles/images/css/flex/flex-37.png' | prepend: site.baseurl }})

```html
<div class="Grid">
  <div class="Grid-cell">...</div>
  <div class="Grid-cell">...</div>
  <div class="Grid-cell">...</div>
</div>
```

```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}
```

### 2.2 百分比布局

某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。

![relationship-map]({{ '/styles/images/css/flex/flex-38.png' | prepend: site.baseurl }})

```html
<div class="Grid">
  <div class="Grid-cell u-1of4">...</div>
  <div class="Grid-cell">...</div>
  <div class="Grid-cell u-1of3">...</div>
</div>
```

```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}

.Grid-cell.u-full {
  flex: 0 0 100%;
}

.Grid-cell.u-1of2 {
  flex: 0 0 50%;
}

.Grid-cell.u-1of3 {
  flex: 0 0 33.3333%;
}

.Grid-cell.u-1of4 {
  flex: 0 0 25%;
}
```

* `flex: 0 0 per%`：
    * 第一个值代表`flex-grow`：这里设置为0，是因为不让当前项目放大
    * 第二个值代表`flex-shrink`：这里设置为0，是因为其他项目都为1，则空间不足时，这个`shrink = 0 ` 的项目不缩小。 
    * 第三个值代表`flex-basis`：在分配多余空间之前，当前项目占据的主轴空间

## 三、圣杯布局

* 圣杯布局（`Holy Grail Layout`）指的是一种最常见的网站布局。
    * 页面从上到下，分成三个部分：头部（`header`），躯干（`body`），尾部（`footer`）。
        * 其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。

![relationship-map]({{ '/styles/images/css/flex/flex-39.png' | prepend: site.baseurl }})

```html
<body class="HolyGrail">
  <header>...</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">...</main>
    <nav class="HolyGrail-nav">...</nav>
    <aside class="HolyGrail-ads">...</aside>
  </div>
  <footer>...</footer>
</body>
```

```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}

/*如果是小屏幕，躯干的三栏自动变为垂直叠加。*/
@media (max-width: 768px) {
  .HolyGrail-body {
    flex-direction: column;
    flex: 1;
  }
  .HolyGrail-nav,
  .HolyGrail-ads,
  .HolyGrail-content {
    flex: auto;
  }
}
```

* `flex:1`等价于`flex-grow: 1; flex-shrink: 1; flex-basis: 0%;`

## 四、输入框的布局
我们常常需要在输入框的前方添加提示，后方添加按钮。

![relationship-map]({{ '/styles/images/css/flex/flex-40.png' | prepend: site.baseurl }})

```html
<div class="InputAddOn">
  <span class="InputAddOn-item">...</span>
  <input class="InputAddOn-field">
  <button class="InputAddOn-item">...</button>
</div>
```

``` css
.InputAddOn {
  display: flex;
}

.InputAddOn-field {
  flex: 1;
}
```

## 五、悬挂式布局

有时，主栏的左侧或右侧，需要添加一个图片栏。

![relationship-map]({{ '/styles/images/css/flex/flex-41.png' | prepend: site.baseurl }})

```html
<div class="Media">
  <img class="Media-figure" src="" alt="">
  <p class="Media-body">...</p>
</div>
```

``` css
.Media {
  display: flex;
  align-items: flex-start;
}

.Media-figure {
  margin-right: 1em;
}

.Media-body {
  flex: 1;
}
```

## 六、固定的底栏

有时，页面内容太少，无法占满一屏的高度，底栏就会抬高到页面的中间。这时可以采用Flex布局，让底栏总是出现在页面的底部。

![relationship-map]({{ '/styles/images/css/flex/flex-42.png' | prepend: site.baseurl }})

```html
<body class="Site">
  <header>...</header>
  <main class="Site-content">...</main>
  <footer>...</footer>
</body>
```

``` css
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}
```

## 七、流式布局

每行的项目数固定，会自动分行。

![relationship-map]({{ '/styles/images/css/flex/flex-43.png' | prepend: site.baseurl }})

``` css
.parent {
  width: 200px;
  height: 150px;
  background-color: black;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.child {
  box-sizing: border-box;
  background-color: white;
  flex: 0 0 25%;
  height: 50px;
  border: 1px solid red;
}
```

