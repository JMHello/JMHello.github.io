---
layout: post
title: "css - 进阶 - 朋友圈信息流"
data: 2018-02-15 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、朋友圈信息流

### 1.1 效果图

![friend](/effects/images/css/exercise/friend/friend-01.gif)

### 1.2 使用img还是background-image?

> * `img` 是一个标签，而`background-image`是一个`css`属性，但他们都有一个共同点，就是可以引入图片。
> * 那究竟什么时候使用 `img` 标签？什么时候使用 `background-image`？
> * 看下图：红色圈的就是使用 `img` 标签引入图片，而粉色圈的就是使用`css`属性 `background-image`

![friend](/styles/images/css/exercise/friend/friend-01.png)

> * 其实，装饰性的图片我们就用`background-image`，就像上图的“心形”、“信息提示”
> * 而一些有意义的，作为内容一部分的图片则用`img`标签，就像上图的 “头像”；还有一点，`img`标签可以设置`alt`属性，起提示性作用

### 1.3 头像

![friend](/styles/images/css/exercise/friend/friend-02.png)

> * 可看到上面的效果图：头像是在背景图最底端，这里是直接用了 `margin-top: -52px`
> * 如果是我，可能第一反应就是使用定位，不过定位要麻烦得多，显然，这里的做法要机智得多！

### 1.4 文字

![friend](/styles/images/css/exercise/friend/friend-03.png)

> * 上图左边是示意图，右边是结构图
> * 发表人直接用一个`a`标签包裹起来，而其评论则直接添加到 `a` 标签的后面；其实由于只有发表人的样式与后面的内容不同，所以才用标签包裹起来，方便设置样式。
> * 如果是我，因为是左右两边，所以，我会拿一个 `span` 标签将评论包裹起来；但是我的做法会让结构变得有点混乱。
> * 其实这里确实没必要添加`span`标签，本来`span`就没有语义，而且评论内容又没有什么特别的样式，加了就变得多余了，冗杂了！

> * 具体问题具体分析，不是生搬硬套将 `html` 和 `css` 杂在一起！