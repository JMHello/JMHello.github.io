---
layout: post
title: "css - position"
data: 2017-10-01 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

参考博文：

+ [http://www.cnblogs.com/wangfupeng1988/p/4322680.html](http://www.cnblogs.com/wangfupeng1988/p/4322680.html)

<!-- more -->

## 一、定位简介

### 1.1 定位原理

> * 定位原理：我们可以利用定位，准确地定义元素框相对于其正常位置应该出现在哪里，或者相对于父元素，或者另一个元素，或者是浏览器窗口本身的位置。

### 1.2 position拥有的值

```css
position: static | relative | absolute | fixed
```

### 1.3 实例基础html代码

```html
<div class="outer">
    <p class="pub">1111</p>
    <p class="pub">2222</p>
    <p class="pub">3333</p>
    <p class="pub">4444</p>
</div>
```

## 二、static

### 2.1 static 介绍

> * 元素框正常生成。
> * 块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。


## 三、relative

### 3.1 relative 介绍

> * 元素偏移某个距离。
> * 元素仍保持其未定位前的形状，它原本所占的空间仍保留。
> * `relative`产生一个新的定位上下文。

### 3.2 实例

* 初始状态

![relationship-map]({{ '/styles/images/css/position/position-01.png' | prepend: site.baseurl }})

* 第三个`p`元素添加了`position: relative; top: 10px; left: 10px`的样式

```html
<div class="outer">
    <p class="pub">1111</p>
    <p class="pub">2222</p>
    <p class="pub" style="position: relative; top: 10px; left: 10px">3333</p>
    <p class="pub">4444</p>
</div>
```

![relationship-map]({{ '/styles/images/css/position/position-02.png' | prepend: site.baseurl }})

> * 从上图你可发现只有第3个`p`的位置发生了变化，其余`p`的位置一点变化都没有。
> * **`relative`会导致自身位置的相对变化，而不会影响其他元素的位置、大小的变化。**

## 四、absolute

### 4.1 absolute 介绍

> * 元素框从文档流完全删除，并相对于其包含块定位。
>    * 即：元素之前在正常文档流中所占的空间会消失，就好像该元素原来不存在一样。
> * 元素定位后生成一个块级框，而不论元素原来在正常流中生成哪一种类型的框。
>   * 即：设置`absolute`会使得`inline`元素被“块”化。

* 补充：
    * 包含块：可能是文档中的另一个元素或者是初始包含块。
    * 初始包含块：根元素的包含块（指：`html`元素）。
    * 设置`absolute`会使得元素已有的`float`失效。
    
### 4.2 实例

* 初始状态

![relationship-map]({{ '/styles/images/css/position/position-03.png' | prepend: site.baseurl }})

```html
<div class="outer">
    <p class="pub">1111</p>
    <p class="pub">2222</p>
    <p class="pub" style="position: absolute;background: red">3333</p>
    <p class="pub">4444</p>
</div>
```

* 设置`position:absolute`后的状态：

![relationship-map]({{ '/styles/images/css/position/position-04.png' | prepend: site.baseurl }})

> 从上图可知：只有第3个`p`脱离了文档流
> 1. `absolute`元素脱离了文档结构。
>    * 和relative不同，其他三个`p`元素的位置重新排列了。**只要元素会脱离文档结构，它就会产生破坏性，导致父元素坍塌。**
> 2. `absolute`元素具有“包裹性”。
>   * 之前`p`元素的宽度是撑满整个屏幕的，而此时`p`元素的宽度刚好是内容的宽度。
> 3. `absolute`元素具有“跟随性”。
>   * 虽然`absolute`元素脱离了文档结构，但是它的位置并没有发生变化，还是老老实实的呆在它原本的位置，因为我们此时没有设置`top`、`left`的值。
> 4. `absolute`元素具有悬浮性：
>   * `absolute`元素会悬浮在页面上方，会遮挡住下方的页面内容。
>   * 如果有多个悬浮元素，层级如何确定？答案是“后来者居上”


## 五、fixed

* `fixed`和`absolute`是一样的，唯一的区别在于：`absolute`元素是根据最近的定位上下文确定位置，而`fixed`永远根据浏览器确定位置。

## 六、定位上下文

### 6.1 relative的定位

* `relative`元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素。

![relationship-map]({{ '/styles/images/css/position/position-05.png' | prepend: site.baseurl }})

### 6.2 fixed的定位

* `fixed`元素的定位永远是相对于浏览器边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化。

![relationship-map]({{ '/styles/images/css/position/position-06.png' | prepend: site.baseurl }})

### 6.3 absolute的定位

* 如果为`absolute`设置了`top`、`left`，浏览器会根据什么去确定它的纵向和横向的偏移量呢？
    * 答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了`position:relative/absolute/fixed`的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。

* 以浏览器为标准

![relationship-map]({{ '/styles/images/css/position/position-07.png' | prepend: site.baseurl }})

* 以其父元素为标准

![relationship-map]({{ '/styles/images/css/position/position-08.png' | prepend: site.baseurl }})

