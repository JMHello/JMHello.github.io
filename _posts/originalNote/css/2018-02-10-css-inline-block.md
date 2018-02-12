---
layout: post
title: "css - inline-block"
data: 2018-02-10 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   [http://web.jobbole.com/84089/](http://web.jobbole.com/84089/)


<!-- more -->


## 一、inline-block

### 1.1 认识inline-block

> * 个人觉得：`inline-block` 是结合了 `inline` 和 `block` 所产生出来的产物
>   * 设置了 `diplay:inline-block` 的元素，宽度依然是内容宽，可支持上下外边距以及行高；
>   * 除此之外，如果兄弟元素是行内元素或者也设置了`inline-block`，那么他们都会出现在同一行

### 1.2 inline-block 的问题 - 空白符

> * 上面说到，`inline-block` 有 `inline` 的某些特征，因此，这也是设置了`inline-block` 的元素间为什么会出现空隙的原因
> * 其实这些空隙就是 "空白符"

---

> * 解决方法1：将`li`标签写在一起

```html
<ul class="list">
    <li class="list-item">首页</li><li class="list-item">关于</li><li class="list-item">热点</li>
</ul>
```

---

> * 解决方法2：
>   * 空白符其实就是字符，可通过设置 `font-size` 属性控制产生的间隙大小
>   * 对于空白符来说，就是属于 `ul` 的子“元素”，不过个人觉得这个是一个隐性的
>   * 对于 `li` 来说，就是真真实实的 `ul` 的子元素了，是显性的
>   * 所以，空白符的大小可继承其父类，而 `li` 的字体大小即可继承父类，也可自己控制

```html
<style>
  .list-no-white {
        font-size: 0; /* 让空白符消失 */
    }
    .list-no-white .list-item {
        font-size: 12px; /* 让 li 有自己的字体大小 */
    }
</style>
<h2>解决空白符问题法2 - 基于字符去解决</h2>
<ul class="list list-no-white">
    <li class="list-item">首页</li>
    <li class="list-item">关于</li>
    <li class="list-item">热点</li>
</ul>
```

> * [demo](/effects/demo/css/inlineBlock/v1.html)
> * 结果如下：

![inline-block](/styles/images/css/inlineBlock/inlineblock-01.png)

## 二、应用

### 2.1 网页头部菜单

> * 之前我一般做网页头部菜单，都是用浮动，然后又要清浮动，这次就来试一试用 `inline-block`，效果也不错！

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>inline-block 应用 - 网页头部菜单</title>
    <style>
        .nav {
           background: black;
        }
        .list {
            font-size: 0;
        }
        .list .list-item {
            display: inline-block;
            font-size: 20px;
            padding: 5px 10px;
        }
        .list .item-link {
            display: block;
            color: white;
        }
    </style>
</head>
<body>
<header class="header">
    <nav class="nav">
        <ul class="list">
            <li class="list-item"><a href="#" class="item-link">首页</a></li>
            <li class="list-item"><a href="#" class="item-link">关于</a></li>
            <li class="list-item"><a href="#" class="item-link">热点</a></li>
        </ul>
    </nav>
</header>
</body>
</html>
```

> * [demo](/effects/demo/css/inlineBlock/v2.html)
> * 结果如下：

![inline-block](/styles/images/css/inlineBlock/inlineblock-02.png)

### 2.2 布局-三列布局

> * `display: inline-block` 是能实现三列布局，但是相对于浮动而言，如果浏览器缩小了，那么元素就会一层层往下掉，而浮动则不会

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>inline-block 应用 - 三列布局</title>
    <style>
        * {
            margin: 0;
        }
        .header,
        .footer {
            width: 100%;
            height: 100px;
            background: gainsboro;
        }
        .container {
            width: 100%;
            text-align: center;
        }
        .container .aside {
            display: inline-block;
            width: 300px;
            height: 400px;
            background: orangered;
        }
        .container .main {
            display: inline-block;
            width: 600px;
            height: 400px;
            background: dodgerblue;
        }
    </style>
</head>
<body>
<header class="header">
   <h1>头部</h1>
</header>
<div class="container">
    <aside class="aside aside--left">
        <h2>左边栏</h2>
    </aside>
    <main class="main">
        <h2>主体内容</h2>
    </main>
    <aside class="aside aside--right">
        <h2>右边栏</h2>
    </aside>
</div>
<footer class="footer">
    <h2>尾部</h2>
</footer>
</body>
</html>
```

> * [demo](/effects/demo/css/inlineBlock/v3.html)
> * 结果如下：

![inline-block](/styles/images/css/inlineBlock/inlineblock-03.png)
