---
layout: post
title: "css - 清除浮动"
data: 2018-02-23 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、清除浮动的原因

> * 浮动元素会脱离文档流，导致元素重叠或者父元素高度塌陷，严重破坏页面布局，所以要清除浮动

## 二、解决元素重叠

> * 在不想受到浮动元素影响的元素上添加 `clear:both;` 即可
> * [demo](/effects/demo/css/clearFloat/elementsOverlap/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>元素重叠</title>
    <style>
        .parent {
            width: 200px;
            height: 150px;
            color: white;
            background: black;
        }
        .child {
            width: 50px;
            height: 50px;
            background: blue;
        }
        .child:last-child {
            background: red;
        }
        .fl {
            float: left;
        }
        .cl {
            clear: both;
        }
    </style>
</head>
<body>
<h2>元素重叠</h2>
<div class="parent">
    <p class="child fl"></p>
    <p class="child"></p>
</div>

<h2>解决元素重叠 - 在不想受到浮动元素影响的元素上添加clear:both</h2>
<div class="parent">
    <p class="child fl"></p>
    <p class="child cl"></p>
</div>
</body>
</html>
```

![clearFloat](/styles/images/css/clearFloat/cf-01.png)

## 三、解决父元素高度塌陷

### 3.1 父元素高度塌陷

> * [demo](/effects/demo/css/clearFloat/collapsed/v1.html)

> * 结果如下图：

![clearFloat](/styles/images/css/clearFloat/cf-02.png)

---

> * 方法1：给最后一个元素设置 `clear:both`
> * [demo](/effects/demo/css/clearFloat/collapsed/v2.html)

![clearFloat](/styles/images/css/clearFloat/cf-03.png)

---

> * 方法2：给父元素新建一个BFC
>   * [绝对定位元素](/effects/demo/css/clearFloat/collapsed/v3.html)
>   * [固定定位元素](/effects/demo/css/clearFloat/collapsed/v4.html)
>   * [弹性元素、display:inline-block、overflow不为visible](/effects/demo/css/clearFloat/collapsed/v5.html)
>   * [浮动元素](/effects/demo/css/clearFloat/collapsed/v6.html)

> * 结果如下图：

![clearFloat](/styles/images/css/clearFloat/cf-04.png)
