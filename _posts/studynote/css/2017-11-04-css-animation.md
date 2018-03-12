---
layout: post
title: "css - animation - 动画"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第12章

<!-- more -->

## 一、animation 简介

### 1.1 transition 和 animation 的异同

> * `transition` 和 `animation`
>   * 相同点：都是通过改变元素的属性值来实现动画效果。
>   * 不同点：
>       * `transition`：只能通过指定属性的初始状态和结束状态，然后在两个状态之间进行平滑过渡的方式来实现动画。
>       * `animation`：实现动画主要由两个部分构成：
>           * 通过类似 `Flash` 动画中的 **关键帧** 来声明一个动画。
>           * 在 `animation` 属性中调用关键帧声明的动画，从而实现一个更为复杂的动画效果。

### 1.2 浏览器兼容性

> * 点击查看[animation浏览器兼容性](http://caniuse.com/#search=animation)

![animation](/styles/images/css/animation/animation-01.png)

### 1.3 属性简介

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

![animation](/styles/images/css/animation/animation-02.png)

## 二、关键帧

### 2.1 什么是关键帧

> * `@keyframes` 就是关键帧。

### 2.2 语法

> * 只接受百分比值！！！

```css
@keyframes animationName{
    from { /* 相当于 0% */
    
    }
    
    percentage { /* 其他百分比 */
    
    }
    
    to { /* 相当于 100% */
    
    }
}
```

### 2.3 浏览器兼容性

![animation](/styles/images/css/animation/animation-03.png)

## 三、animation 子属性详解

### 3.1 调用动画 animation-name

> * `animation-name`：主要用来调用动画，其调用的动画是通过 `@keyframes` 关键帧定义好的动画。语法如下：

```
animation-name: none | IDENT [, none | IDENT]*;
```

![animation](/styles/images/css/animation/animation-04.png)

### 3.2 设置动画播放时间 animation-duration

> * 单位：秒；默认值：0【意味动画周期为0，没有动画效果】。
> * 如果为负值会被视为0。

```
animation-duration: <time>[, <time>]*;
```

### 3.3 设置动画播放方式 animation-timing-function

> * `animation-timing-function`：主要用来设置动画播放方式。
>   * 指元素根据时间的推进来改变属性值的变换速率，即：动画的播放方式。

![transition](/styles/images/css/transition/transition-05.png)

### 3.4 设置动画开始播放的时间 animation-delay

> * `animation-delay`：定义动画开始播放的时间 ---- 延迟或提前。即：用于定义在浏览器开始执行动画之前等待的时间。

```
animation-delay: <time>[, <time>]*;
```

### 3.5 设置动画播放次数 animation-iteration-count

> * `animation-iteration-count`：定义动画的播放次数。
>   * 值为常为整数，也可以是带有小数的数字。
>   * 默认值：1【意味动画将从开始到结束只播放一次】
>   * 取值为 `infinite`，动画将会无限次播放。

```
animation-iteration-count: infinite | <number> [, infinite | <number>]*;
```

### 3.6 设置动画播放方向 animation-direction

```
animation-direction: normal|reverse|alternate|alternate-reverse;
```

![animation](/styles/images/css/animation/animation-05.png)

### 3.7 设置动画的播放状态 animation-play-state

```
animation-play-state: paused|running;
```

![animation](/styles/images/css/animation/animation-06.png)

### 3.8 设置动画时间外属性 animation-fill-mode

```
animation-fill-mode: none|forwards|backwards|both;
```

![animation](/styles/images/css/animation/animation-07.png)

## 四、demo

> * 点击打开 [demo](/effects/demo/css/animation/slideShow/index.html)

![animation](/effects/images/css/animation/animation-01.gif)