---
layout: post
title: "css - 进阶 - 音乐播放界面"
data: 2018-02-18 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、音乐播放界面

### 1.1 效果图

![music](/effects/images/css/exercise/music/music-01.gif)

### 1.2 整体结构

![music](/styles/images/css/exercise/music/music-01.png)

> * 这个音乐播放界面只用两层大结构就搞掂
> * 其实从界面上看，是“上中下”的结构，如果是我，会直接用三层结构
> * 但是，他这里用两层搞掂，也有它的道理：图片的转动以及下面的播放按钮应该是属于 `main` 这一块，不应该是属于`footer`这一块的。

### 1.3 头部fixed

![music](/styles/images/css/exercise/music/music-02.png) 

> * 头部是固定定位，脱离了正常的文档流，为了让下面的布局正常显示，所以 `.page-music-play` 需要设置`padding-top`，其值为 `.header` 的高度

### 1.4 指针

![music](/styles/images/css/exercise/music/music-03.png)

> * 对于指针，不用看，绝对是定位布局！

### 1.5 转盘的处理

![music](/styles/images/css/exercise/music/music-04.png)

> * 从上图可知道：
>   * 转盘也是用了定位布局
>   * 控制转盘转动的动画直接添加到最外层 `.play-disc`，控制整个转盘转动
>   * `.disc-cover`：
>       * 设置了水平垂直居中
>       * 转盘需要随着屏幕大小而改变大小，于是要设置其宽度对于视窗宽度的百分比，而转盘的高度与宽度相等，于是使用 `padding-top` 来撑开高度，保持宽高的比例
>       * 由于整张图片都要显示出来，所以用了`background-size: cover`
>   * `.disc-bg`：指的是黑色那个圈圈，这里也是用了`padding-top` 来撑开高度，保持宽高的比例

> * 对了，在`.disc-bg`上添加了个`position:relative`，其实一开始我也不是很懂为什么这里要添加这个，后来尝试不要了这行代码，你会发现如下图

![music](/styles/images/css/exercise/music/music-05.png)

> * 实际上，由于 `.disc-cover` 为定位元素，尽管`.disc-bg`在`.disc-cover`后面，但是 `position` (非 `static`) 元素高于其他元素，所以 `.disc-cover`仍会覆盖后面的非定位元素
> * 所以在`.disc-bg`上添加了个`position:relative`， 就是为了让它俩显示的顺序按照默认的`html`结构，不让`.disc-cover` 覆盖 `.disc-bg`

### 1.6 等距排版

![music](/styles/images/css/exercise/music/music-06.png)

> * 为什么非要 `div.control-action` 用了 `justify-content: space-between;` 再加上两个伪元素来使得每个子项等距排布？
> * 为什么不用 `justify-content: space-around`？

> * 其实，我自己还没真正弄懂 `space-around` 和 `space-between`！
>   * `space-between`：指的是两端对齐，子项目之间的间隔相等，即：`item 1 item 1 item`
>   * `space-around`：指的是子项目两侧的距离相等，即：`1 item 1 item 1 item 1`

> * 而作者结合伪元素与`justify-content: space-between` 构建成：`1 item 1 item 1 item 1`，完全做到等距，实在是妙！
> * 伪元素宽高为`1px`根本不会对布局有多大影响，只会起到辅助的作用！

> * 之前自己也做过类似这种等距离的，都要经过大量计算，才能得出相应的距离，还用了一堆的`margin`、`padding`，这个方法实在是妙太多了！

### 1.7 播放进度

> * 我们都是通过拖动进度条中间的圆圈来控制进度的，并且，当拖动进度的时候，进度条的背景会发生变化。

![music](/styles/images/css/exercise/music/music-07.png)

> * 这里的播放进度设置了`flex:1`：也是为了自适应
> * 之前我做进度条，都是用两个`span`标签，一个是底层背景，另外一个是上层背景，但这里就妙在：用伪元素替代了一个`span`标签，用来设置底层背景
> * `.line-pointer::before`：控制红色的进度
> * `.line-pointer::after`：控制圆圈

> * 这样去设计进度条，我们就可以直接控制 `.line-pointer` 就可以控制进度条！