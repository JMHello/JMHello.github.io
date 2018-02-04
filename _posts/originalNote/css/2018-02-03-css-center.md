---
layout: post
title: "css - 对于一个未知宽高的盒子，如何让它水平垂直居中于父元素？"
data: 2017-11-22 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   * [深入理解CSS中的行高](http://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html)


<!-- more -->

> * 以下是基本的`html`代码

```html
<div class="parent box">
    <div class="child">未知宽高</div>
</div>
```

## 一、table + table-cell

> * 方法一：
>   * 父元素设置`display: table; text-align: center`
>   * 子元素设置`display: table-cell; vertical-align: middle`

> * [demo](/effects/demo/css/center/v1.html)

```css
.parent {
    display: table;
    text-align: center;
}
.child {
    display: table-cell;
    vertical-align: middle;
}
```

## 二、position + transform

> * [demo](/effects/demo/css/center/v2.html)

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## 三、flex布局

> * [demo](/effects/demo/css/center/v3.html)

```css
 .parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

## 四、利用了一个空标签

> * [demo](/effects/demo/css/center/v4.html)

> * 这里的`html`稍微有些不一样：

```html
<div class="parent box1">
    <span></span>
    <div class="box2 child">未知宽高</div>
</div>
```

```css
.parent {
    text-align: center;
}
.parent span {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

## 五、利用伪元素::before

> * [demo](/effects/demo/css/center/v5.html)

> * 这里的`html`稍微有些不一样：

```html
<div class="parent box1">
    <span></span>
    <div class="box2 child">未知宽高</div>
</div>
```

```css
 .parent {
    text-align: center;
}
.parent::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

## 六、利用js计算

> * [demo](/effects/demo/css/center/v6.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>对于一个未知宽高的盒子，如何让它水平垂直居中于父元素？</title>
    <style>
        .box1 {
            width: 150px;
            height: 150px;
            color: white;
            background: blue;
        }
        .box2 {
            background: red;
        }
        .parent {
            text-align: center;
        }
    </style>
</head>
<body>
<h2>利用伪元素::before</h2>
<div class="parent box1">
    <div class="box2 child">未知宽高</div>
</div>
<script>
  const parent = document.querySelector('.parent')
  const child = document.querySelector('.child')

  // 父元素设置相对定位
  parent.style.position = 'relative'
  // 子元素设置绝对定位
  child.style.position = 'absolute'

  // 获取父元素的宽高
  const parentWidth = parent.offsetWidth
  const parentHeight = parent.offsetHeight
  
  // 获取子元素的宽高
  const childWidth= child.offsetWidth
  const childHeight = child .offsetHeight
  
  // 设置子元素的left 值
  child.style.left = (parentWidth - childWidth) / 2 + 'px'
  // 设置子元素的top值
  child.style.top = (parentHeight - childHeight) / 2 + 'px'
</script>
</body>
</html>
```
