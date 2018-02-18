---
layout: post
title: "css - 进阶 - 订阅号信息流"
data: 2018-02-14 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、订阅号信息流

### 1.1 效果图

> * 模拟微信订阅号中的信息流。
> * 订阅号的一条信息既可以是一篇文章，也可以是多篇文章，这两种情况的排版方式有点不太一样，其最终效果图如下：

![subscription](/styles/images/css/exercise/subscription/subscribe-01.png)

### 1.2 图片

![subscription](/styles/images/css/exercise/subscription/subscribe-02.png)

> * 对于 “避免走弯路” 这种图片来说，它在不同屏幕上显示的大小也不一样，
> * 我或许就会想到设置宽度为 `calc(100% - 左右padding)`，绝对不会想到设置`padding-top: 56.25%` 来使图片自适应宽高

> * 看下面 [demo](/effects/demo/css/exercise/subscription/v2/v1.html)

> * 设置图片容器的`padding-top`而不是直接设置容器的`height`就可以实现图片自适应宽高的原理为：
>   * 首先，`padding-top` 必须设置为百分比
>   * `padding-top` 设置为百分比后，其参照计算的依据就是元素的宽度`width`
>   * 所以，我们就可以用 `padding-top` 来替换 `height`，使图片不定宽高自适应！
>   * 对了！图片的宽高记得设置成 `100%`

```html
<div class="img-wrapper">
    <img src="./timg.jpg">
</div>
```

```css
.img-wrapper {
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
}
.img-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

> * 效果图

![subscription](/effects/images/css/exercise/subscription/subscription-01.gif)

### 1.3 1px 分割线处理

> * 移动端会出现的问题：`1px 边框变粗`，因此，为了使`1px`边框正常显示，需要做以下处理：

> * 一般做边框，我都是直接在元素上面用`border`属性，其实我们可以用伪元素的：

> * 解决 `1px` 边框粗的关键在于：我们可以利用 `transform` 的 `scaleY` 来压缩

> * [demo](/effects/demo/css/exercise/subscription/v3/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>处理1px边框变粗的问题</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .wrapper {
            padding: 10px;
            margin: 10px;
            border: 1px solid #333333;
        }
        .des {
            position: relative;
        }
        /* 上边框 处理1px边框变粗的问题 */
        .des::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #e7e7e7;
            transform: scaleY(0.5); /* 关键代码，y轴上压缩一半 */
        }
        /* 下边框 没有处理1px边框变粗的问题 */
        .des::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #e7e7e7;
        }
    </style>
</head>
<body>
<div class="wrapper">
    <h1>处理1px边框变粗的问题</h1>
    <p class="des">Hello，你好！</p>
</div>
</body>
</html>
```

![subscription](/styles/images/css/exercise/subscription/subscribe-03.png)

> * 从上面的图片可以看到，没处理过的`1px`下边框要比处理过的`1px`上边框要粗！

### 1.4 左右布局

![subscription](/styles/images/css/exercise/subscription/subscribe-04.png)

> * 向上图的左右布局，之前一般会用浮动
> * 其实用 `flex` 布局要比浮动布局方便得多！
> * 对了，一般我们点击文字可以打开一个新链接，点击图片也打开一个新链接，所以就直接用一个`a`标签作为最外层！

> * [demo](/effects/demo/css/exercise/subscription/v4/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>flex布局 - 左右布局</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
        }
        .article {
            display: flex;
            padding: 10px;
            border: 1px solid #e7e7e7;
        }
        .article .article-tt {
            flex: 1;
            font: 14px/1.5 ''
        }
        .article .article-img-wrapper {
            width: 50px;
            height: 50px;
            border: 1px solid #e7e7e7;
        }

        img {
            display: block;
            vertical-align: middle;
            max-width: 100%;
        }
    </style>
</head>
<body>
<a class="article">
    <h2 class="article-tt">文案训练营</h2>
    <div class="article-img-wrapper">
        <img src="./../timg.jpg" class="article-img">
    </div>
</a>
</body>
</html>
```


----

> * 浮动的左右布局
> * [demo](/effects/demo/css/exercise/subscription/v4/v2.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>浮动布局 - 左右布局</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
        }
        .article {
            display: block;
            padding: 10px;
            border: 1px solid #e7e7e7;
        }
        .article .article-tt {
            float: left;
            font: 14px/1.5 ''
        }
        .article .article-img-wrapper {
            float: right;
            width: 50px;
            height: 50px;
            border: 1px solid #e7e7e7;
        }

        img {
            display: block;
            vertical-align: middle;
            max-width: 100%;
        }

        .clearfix::after {
            content: '';
            display: block;
            clear: both;
        }
    </style>
</head>
<body>
<a class="article clearfix">
    <h2 class="article-tt">文案训练营</h2>
    <div class="article-img-wrapper">
        <img src="./../timg.jpg" class="article-img">
    </div>
</a>
</body>
</html>
```
