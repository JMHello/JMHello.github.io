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

* 是否固定宽高？
* inlin-block？ block？
* 浮动布局？
* 定位布局？
* 弹性布局？
* 表格布局？
* 网格布局？
* column布局？

## 四、单栏布局

### 4.1 水平居中

* inline-block + text-align 【[demo](/effects/demo/css/layout/v3/single/horizon/v1.html)】

思路：`text-align: center` 让行内元素水平居中。【表现为`inline` 或者 `inline-block` 的都可以实现】

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        width: 500px;
        height: 300px;
        text-align: center; /* 关键代码 */
        background: grey;
    }
    .child {
        display: inline-block; /* 关键代码 */
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-01.png)

---

* absolute + transform【[demo](/effects/demo/css/layout/v3/single/horizon/v2.html)】

思路：利用定位中水平方向偏移50%，再通过`transform` 将定位元素自身偏移-50%来使中心回到正确的位置

注意点：

1. 子元素的宽度不是必须的
2. `transform` 只能兼容到 `IE9`

```html
<section class="parent">
    <div class="child">水平居中</div>
</section>
<style>
    .parent {
        position: relative;
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        position: absolute; /* 关键代码 */
        left: 50%; /* 关键代码 */
        transform: translateX(-50%); /* 关键代码 */
        /*width: 100px;*/
        /*height: 100px;*/
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-02.png)

---

* absolute + margin 【[demo](/effects/demo/css/layout/v3/single/horizon/v6.html)】

思路：利用定位中水平方向偏移50%，在知道子元素宽度的情况下（即：子元素有设置固定宽度），再设置 `margin-left` 的值为子元素的宽度的一半，并设置为负值。

注意点：

1. 子元素定宽
2. 兼容性好

```html
<section class="parent">
    <div class="child">水平居中</div>
</section>
<style>
    .parent {
        position: relative;
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        position: absolute; /* 关键代码 */
        left: 50%; /* 关键代码 */
        margin-left: -50px; /* 关键代码 */
        width: 100px; /* 关键代码 */
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-03.png)

---

* flex + justify-content 【[demo](/effects/demo/css/layout/v3/single/horizon/v3.html)】

思路： 通过容器表现为flex，用justify-content水平居中

注意点：
1. 支持IE10+
2. 子元素可不定宽

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        display: flex; /* 关键代码 */
        justify-content: center; /* 关键代码 */
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-04.png)

---

* 子元素定宽 + margin 【[demo](/effects/demo/css/layout/v3/single/horizon/v4.html)】

思路：在子元素定宽的情况下，加上 `margin: 0 auto` 就可以实现水平居中

注意点：
1. 子元素必须定宽

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        width: 100px; /* 关键代码 */
        height: 100px;
        margin: 0 auto; /* 关键代码 */
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-04.png)

---

* table + margin 【[demo](/effects/demo/css/layout/v3/single/horizon/v5.html)】

思路：子元素设置为table，加上 `margin: 0 auto` 就可以实现水平居中

注意点：
1. 子元素可不定宽 或者 子元素必须有内容才有效

```html
<section class="parent">
    <div class="child">子元素必须有内容，table才有效</div>
</section>
<style>
    .parent {
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        display: table; /* 关键代码 */
        margin: 0 auto; /* 关键代码 */
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-05.png)

### 4.2 垂直居中

* position + transform 【[demo](/effects/demo/css/layout/v3/single/vertical/v1.html)】

思路：这里利用的是定位中垂直方向偏移50%，再通过transform将定位元素自身偏移-50%来使得中心回到正确的位置

注意点：
1. 父元素要定高
2. .用了transform只能兼容到IE9
   
```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        position: relative;
        height: 300px;
        background: grey;
    }
    .child {
        position: absolute; /* 关键代码 */
        top: 50%; /* 关键代码 */
        transform: translateY(-50%); /* 关键代码 */
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-07.png)

---

* position + margin 【[demo](/effects/demo/css/layout/v3/single/vertical/v4.html)】

思路：这里利用的是定位中垂直方向偏移50%，再通过margin-top将定位元素自身偏移-50%来使得中心回到正确的位置

注意点：
1. 父元素要定高，子元素要定高
2. 用了transform只能兼容到IE9
   
```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        position: relative;
        height: 300px;
        background: grey;
    }
    .child {
        position: absolute; /* 关键代码 */
        top: 50%; /* 关键代码 */
        margin-top: -50px; /* 关键代码 */
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-07.png)

---

* flex + align-items 【[demo](/effects/demo/css/layout/v3/single/vertical/v2.html)】

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        display: flex; /* 关键代码 */
        align-items: center; /* 关键代码 */
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-07.png)

---

* table-cell + vertical-align 【[demo](/effects/demo/css/layout/v3/single/vertical/v3.html)】

思路：父元素设置`display: table-cell;` 以及 `vertical-align: middle`；

注意点：
1. 子元素可不定宽高；但在不定宽高的情况下，必须有内容

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        display: table-cell; /* 关键代码 */
        vertical-align: middle; /* 关键代码 */
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        /*width: 100px;*/
        /*height: 100px;*/
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-08.png)

### 4.3 水平垂直居中

* table-cell + vertical-align + inline-block + text-align 【[demo](/effects/demo/css/layout/v3/single/hAndV/v1.html)】

注意点：
1. 子元素可不定宽高；在没宽高的情况下，必须有内容

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        display: table-cell; /* 关键代码 */
        text-align: center; /* 关键代码 */
        vertical-align: middle; /* 关键代码 */
        width: 500px;
        height: 300px;
        text-align: center;
        background: grey;
    }
    .child {
        display: inline-block; /* 关键代码 */
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-09.png)

---

* absolute + transform 【[demo](/effects/demo/css/layout/v3/single/hAndV/v2.html)】

注意点：
1. 父元素必须定高
2. 使用transform ，支持IE10+

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        position: relative;   /* 关键代码 */
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        position: absolute; /* 关键代码 */
        top: 50%; /* 关键代码 */
        left: 50%; /* 关键代码 */
        transform: translate(-50%, -50%); /* 关键代码 */
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-10.png)

---


* absolute + margin 【[demo](/effects/demo/css/layout/v3/single/hAndV/v4.html)】

注意点：
1. 子元素必须定宽高

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        position: relative;   /* 关键代码 */
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        position: absolute; /* 关键代码 */
        top: 50%; /* 关键代码 */
        left: 50%; /* 关键代码 */
        margin-top: -50px; /* 关键代码 */
        margin-left: -50px; /* 关键代码 */
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-10.png)

---

* flex + justify-content + align-items 【[demo](/effects/demo/css/layout/v3/single/hAndV/v3.html)】

```html
<section class="parent">
    <div class="child"></div>
</section>
<style>
    .parent {
        display: flex; /* 关键代码 */
        justify-content: center; /* 关键代码 */
        align-items: center; /* 关键代码 */
        width: 500px;
        height: 300px;
        background: grey;
    }
    .child {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-10.png)

## 五、两栏布局

### 5.1 一列定宽，一列自适应

#### 5.1.1 左定宽，右自适应

* float + overflow 【[demo](/effects/demo/css/layout/v3/double/lr/v1.html)】

思路：浮动元素会脱离文档流，会影响其下面兄弟元素的布局，导致发生元素重叠；设置 overflow 非 visible，可以使其兄弟元素新建一个bfc，避免发生元素重叠

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        background: gray;
    }
    .aside {
        float: left; /* 关键代码 */
        width: 200px;
        margin-right: 20px;
        background: red;
    }
    .main {
        overflow: hidden; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-11.png)

---

* float + margin 【[demo](/effects/demo/css/layout/v3/double/lr/v2.html)】

思路：左栏定宽，左栏左浮动；右栏设置margin-left的值为“负”左栏的宽度

注意点：
1. 左栏必须定宽

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        background: gray;
    }
    .aside {
        float: left; /* 关键代码 */
        width: 200px;
        margin-right: 20px;
        background: red;
    }
    .main {
        margin-left: 220px; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-11.png)


---

* position【[demo](/effects/demo/css/layout/v3/double/lr/v3.html)】

思路：左右两栏都设置为绝对定位元素，其top值都为0；左栏left值为0，右栏的left值为左栏的宽度，并且设置右栏的right值为0

注意点：
1. 左栏必须定宽

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        position: relative;
        background: gray;
    }
    .aside {
        position: absolute; /* 关键代码 */
        top: 0; /* 关键代码 */
        left: 0; /* 关键代码 */
        width: 200px;
        background: red;
    }
    .main {
        position: absolute; /* 关键代码 */
        top: 0; /* 关键代码 */
        left: 200px; /* 关键代码 */
        right: 0; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-11.png)


---

* flex【[demo](/effects/demo/css/layout/v3/double/lr/v4.html)】

思路：父元素设置`display: flex`，左栏定宽，右栏设置为`flex: 1`，让其自适应

注意点：
1. 支持IE9+

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        display: flex; /* 关键代码 */
        background: gray;
    }
    .aside {
        width: 200px;
        background: red;
    }
    .main {
        flex: 1; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-11.png)

---

* table 【[demo](/effects/demo/css/layout/v3/double/lr/v5.html)】

思路：父元素定宽并且设置`display: table`，左右两栏都设置为 `table-cell`，左栏定宽，右栏会自适应

注意点：
1. 父元素定宽，左栏定宽

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        width: 100%; /* 关键代码 */
        display: table; /* 关键代码 */
        background: gray;
    }
    .aside {
        display: table-cell; /* 关键代码 */
        width: 200px;
        background: red;
    }
    .main {
        display: table-cell; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-11.png)

---

* grid 【[demo](/effects/demo/css/layout/v3/double/lr/v6.html)】

思路：父元素设置`display: grid`，由属性 `grid-template-columns` 控制有多少列，每列的宽度是多少

注意点：
1. 左由两栏可不设置宽度，由属性 `grid-template-columns` 决定每列的宽度 

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        display: grid; /* 关键代码 */
        grid-template-columns: 200px auto; /* 关键代码：有多少列，每列的宽度 */
        background: gray;
    }
    .aside {
        background: red;
    }
    .main {
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-11.png)

#### 5.1.2 右定宽，左自适应

* float + margin 【[demo](/effects/demo/css/layout/v3/double/lr/v7.html)】

思路：右栏定宽，右栏右浮动；左栏设置 `margin-right` 为右栏的宽度

注意点：
1. 注意html结构：右栏 ===》 左栏

```html
<div class="container">
    <main class="main">右main</main>
    <aside class="aside">左aside</aside>
</div>
<style>
    .container {
        background: gray;
    }
    .aside {
        margin-right: 200px; /* 关键代码 */
        background: red;
    }
    .main {
        float: right; /* 关键代码 */
        width: 200px; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-12.png)

---


* float + overflow 【[demo](/effects/demo/css/layout/v3/double/lr/v11.html)】

思路：右栏定宽，右栏右浮动；左栏设置 `overflow` 

注意点：
1. 注意html结构：右栏 ===》 左栏

```html
<div class="container">
    <main class="main">右main</main>
    <aside class="aside">左aside</aside>
</div>
<style>
    .container {
        background: gray;
    }
    .aside {
        overflow: hidden; /* 关键代码 */
        background: red;
    }
    .main {
        float: right; /* 关键代码 */
        width: 200px; /* 关键代码 */
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-12.png)

---

* flex 【[demo](/effects/demo/css/layout/v3/double/lr/v8.html)】

思路：父元素设置 `display: flex`，右栏定宽，左栏设置为flex: 1，让其自适应

注意点：
1. 左栏必须定宽
2. 支持IE9+

```html
<div class="container">
    <aside class="aside">左aside</aside>
    <main class="main">右main</main>
</div>
<style>
    .container {
        display: flex; /* 关键代码 */
        background: gray;
    }
    .aside {
        flex: 1; /* 关键代码 */
        background: red;
    }
    .main {
        width: 200px;
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-12.png)


---

* table 【[demo](/effects/demo/css/layout/v3/double/lr/v9.html)】

思路：父元素定宽并且设置display: table，左右两栏都设置为 table-cell，右栏定宽，左栏会自适应

注意点：
1. 右栏必须定宽
2. 支持IE9+

```html
<div class="container">
    <aside class="aside">aside</aside>
    <main class="main">main</main>
</div>
<style>
    .container {
        width: 100%; /* 关键代码 */
        display: table; /* 关键代码 */
        background: gray;
    }
    .aside {
        display: table-cell; /* 关键代码 */
        background: red;
    }
    .main {
        display: table-cell; /* 关键代码 */
        width: 200px;
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-12.png)

---

* grid 【[demo](/effects/demo/css/layout/v3/double/lr/v10.html)】

思路：父元素设置display: grid，由属性 grid-template-columns 控制有多少列，每列的宽度是多少

注意点：
1. 左由两栏可不设置宽度，由属性 grid-template-columns 决定每列的宽度

```html
<div class="container">
    <aside class="aside">左aside</aside>
    <main class="main">右main</main>
</div>
<style>
    .container {
        display: grid; /* 关键代码 */
        grid-template-columns: auto 200px ; /* 关键代码：有多少列，每列的宽度 */
        background: gray;
    }
    .aside {
        background: red;
    }
    .main {
        background: blue;
    }
</style>
```

![layout](/styles/images/css/layout/v2/v-12.png)



### 5.3 总结

左右布局都可以用以下方法实现：

* 浮动布局
* 定位布局
* 弹性布局
* 表格布局
* 网格布局


### 5.2 上下布局

* 定位布局
* 弹性布局
* 表格布局
* 网格布局

---

多列不定宽，一列自适应

* [float + overflow](/effects/demo/css/layout/v3/v2.html)