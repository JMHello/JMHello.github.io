---
layout: post
title: "css - 进阶 - 响应式 - 分享嘉宾"
data: 2018-02-22 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、响应式 - 分享嘉宾

### 1.1 效果图

![music](/effects/images/css/exercise/share/share-01.gif)

### 1.2 思路

> * 一开始写样式的时候，我将立足点放在了 `pc` 端上，即：先写 `pc` 端的样式，再写手机端的样式
> * 其实，我忽略了现在较先进的设计理念“`Mobile First`”，即 默认设计的是手机端，然后根据不同的设备去做相应的修改

###  1.3 demo - 从pc开始

> * [demo](/effects/demo/css/exercise/share/v1/index.html)

> * 从 `pc` 端开始到手机端，证明是从大屏幕到小屏幕，因此，一般用的是 `max-width`

```css
@media screen and (max-width: 768px) {
    .guest-list {
        flex-wrap: wrap;
    }
    .guest-list .guest-item {
        width: 50%;
        margin-bottom: 10px;
    }
}

@media screen and (max-width: 480px) {
    .guest-list {
        display: block;
    }
    .guest-list .guest-item {
        width: 100%;
        padding: 0 10px;
        flex-direction: row;
    }
}
```

###  1.3 demo - 从手机端开始

> * [demo](/effects/demo/css/exercise/share/v2/index.html)  

> * 从手机端端开始到 `pc` ，证明是从小屏幕到大屏幕，因此，一般用的是 `min-width`

```css
@media screen and (min-width: 768px) {
    .guest-list {
        display: flex;
        flex-wrap: wrap;
    }
    .guest-item {
        width: 50%;
        flex-direction: column;
        align-items: center;
    }
    .guest-item .item-text {
        text-align: center;
    }
}

@media screen and (min-width: 1280px) {
    .guest-item {
        width: 25%;
    }
}
```

### 1.5 分享嘉宾的实现

![share](/styles/images/css/exercise/share/share-01.png)

> * `html` 如下：

```html
<div class="section-hd">
    <h2 class="hd-tt">分享嘉宾</h2>
</div>
```

> * `css` 如下：

```css
.section-hd {
    position: relative;
    text-align: center;
}
.section-hd::before {
    content: '';
    position: absolute;
    top:50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: #efefef;
}
.section-hd .hd-tt {
    display: inline-block;
    font-size: 20px;
    padding: 0 20px;
    background: white;
    position: relative;
}
```

> * 分享嘉宾的实现主要利用了伪元素（`::before`）添加中间那条线
> * “分享嘉宾” 这四个字别忘记设置 `display: inline-block` 和 `position: relative`
>   * 设置 `position: relative` ：因为 `.section-hd::before` 设置了绝对定位，其层级比`h2.hd-tt`高，所以`.section-hd::before`会覆盖`h2.hd-tt`；而设置了相对定位后，可以让`h2.hd-tt`的内容正常显示
>   * 设置 `display: inline-block`：让 `h2.hd-tt` 的宽度为其内容宽，否则会覆盖整条线

### 1.6 破坏flex布局

> * 在我们做响应式布局的时候，一般会用到 `flex` 布局，但是，在做到某个断点的响应式的时候，你会发现不再需要`flex`布局，此时，你就要破坏掉`flex`布局

> * 方法很简单：将 `display: flex` 改为 `display: block`。就像下面的例子：
> * [demo](/effects/demo/css/exercise/share/v1/index.html)

![share](/styles/images/css/exercise/share/share-02.png)

```css
/* 默认flex 布局 */
.guest-list {
    display: flex;
    min-width: 320px;
    max-width: 1280px;
    margin: 0 auto;
}

/* 当屏幕宽度小于 480px后，破坏掉flex布局 */
@media screen and (max-width: 480px) {
    .guest-list {
        display: block;
    }
}
```