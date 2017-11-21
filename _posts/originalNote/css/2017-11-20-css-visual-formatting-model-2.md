---
layout: post
title: "css - 视觉格式化模型 - 中篇 - BFC"
data: 2017-11-20 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

其他链接：


<!-- more -->

## 一、块级元素 --- 水平格式化

* 水平格式化的复杂性在于`width`影响的是内容区的宽而不是整个可见的元素框。

* 要知道什么情况下会隐式地增加`width`值

### 3.1 水平属性

* 水平格式化有7大属性
    * `margin-left`
    * `border-left`
    * `padding-left`
    * `width`
    * `padding-right`
    * `border-right`
    * `margin-right`

* 元素包含块的宽度（块元素的父元素的`width`值）= 元素7大水平属性之和

### 3.2 使用auto

7个水平属性中，只有3个属性的值可以设置为`auto`:`margin-left`、`width`、`margin-right`

**假设7个属性和为`400px`，无`padding`和`border`**

*  三个属性中随意一个设置为`auto`，余下的两个属性设置为特定值，那么设置了`auto`的属性的值就会被指定相应的值，以保证元素框的宽度等于父元素的`width`。

```css
p {
    width:100px;
    margin-left: auto; /* 实际上margin-left = 200px*/
    margin-right: 100px;
}
```

* 三个属性都设置为非`auto`，那么会将`margin-right`强制为`auto`

```css
p {
    width:100px;
    margin-left: 100px;
    margin-right: 100px; /* 此时 margin-right不是100px，而是200px */
}
```

* `margin-right`和`margin-left`为`auto`，`width`为特定值，那么元素会居中

```css
p {
    margin-left: auto;
    margin-right: auto;
    width:100px;
}
```

* `margin-right`和`margin-left`两个随意一个设置为`auto`，`width`也设置为`auto`，设置为`auto`的外边距强制性为0。

```css
p {
    width:auto; /* 实际上，width = 400 - 100 = 300px */
    margin-left: auto; /* 实际上margin-left = 0 */
    margin-right: 100px;
}
```

* 三个属性都设置为`auto`，两个外边距为0，`width`为400px

```css
p {
    width:auto; /* 实际上，width = 400px */
    margin-left: auto; /* 实际上margin-left = 0 */
    margin-right: auto; /* 实际上margin-right = 0 */
}
```

> 水平外边距不会合并

### 3.3 负外边距

基本`html`格式：

```html
<div class="parent">
    <p class="child"></p>
</div>
```



> 7个水平属性的总和 = 父元素的 `width`。只要所有属性 >= 0，元素就不会大于父元素的内容区。


* `10px + 0 + 0 + 440px + 0 + 0 - 50px = 400px`
    * 看上去，子元素比父元素还宽：`440px`是`width:auto`的实际计算值
    
```css
.parent {
    width: 400px;
    border: 3px solid;
}
.child {
    width: auto;
    margin-left: 10px;
    margin-right: -50px;
}
```

* `10px + 3px + 0 + 434px + 0 + 3px - 50px = 400px`

```css
.parent {
    width: 400px;
    border: 3px solid;
}
.child {
    width: auto;
    margin-left: 10px;
    margin-right: -50px;
    border: 3px solid;
}
```

* `10px + 3px + 0 + 500px + 0 + 3px - 116px = 400px`
    * 将`margin-right:auto`计算为负值【在元素不能比其包含块更宽的情况下会执行】
* **元素水平属性过分受限的一个规则：** 通过重置`margin-right`以保证元素水平属性的总和 = 父元素的`width`。
    * 在此规则下，`margin-right`很容易得到负值
    
```css
.parent {
    width: 400px;
    border: 3px solid;
}
.child {
    width: 500px;
    margin-left: 10px;
    margin-right: auto; /*实际上，margin-right = -116px*/
    border: 3px solid;
}
```

* `margin-left`设置为负值，会让`p`超出`div`，甚至超出浏览器窗口本身。

```css
.parent {
    width: 400px;
    border: 3px solid;
}
.child {
    width: 500px;
    margin-left: -50px;
    margin-right: 10px; 
    border: 3px solid;
}
```

## 四、块级元素 --- 垂直格式化

> 一个元素的默认高度由其内容决定。高度还会受其内容宽度的影响：段落越窄，相应就越高。

### 4.1 垂直属性

* 垂直格式化有7大属性
    * `margin-top`
    * `border-top`
    * `padding-top`
    * `height`
    * `padding-bottom`
    * `border-bottom`
    * `margin-bottom`
    
* 元素包含块的高度（块元素的父元素的`height`值）= 元素7大垂直属性之和

### 4.2 使用auto

* 7个垂直属性中，只有3个属性的值可以设置为`auto`:`margin-top`、`height`、`margin-bottom`
    * 元素的上下外边距设置为`auto`，他们会被重置为0，即：元素框没有上下外边距。


**auto高度**

* 块级正常流元素的`height`设置为`auto`
    * 显示时其高度恰好包含其内联内容的行盒。
    * 其子元素是块级元素的话，默认的高度 从最高级块级子元素的外边框边界到最低块级子元素外边框边界之间的距离。
        * 子元素的外边距会“超出”包含这些子元素的元素。
    * 块级元素有上下内边距/上下边框，其高度从其最高子元素的上外边距边界到其最低子元素的下外边距边界之间的距离。

例1：无边框

```html
<div style="height: auto;background: blue">
    <p style="margin-top: 2em; margin-bottom: 2em"></p>
</div>
```

![relationship-map]({{ '/styles/images/css/box/box-02.png' | prepend: site.baseurl }})

例2： 有边框

```html
<div style="height: auto;border-top: 1px solid; border-bottom: 1px solid;background: blue">
    <p style="margin-top: 2em; margin-bottom: 2em"></p>
</div>
```

![relationship-map]({{ '/styles/images/css/box/box-03.png' | prepend: site.baseurl }})

### 4.3 百分数高度    

* 一个正常流元素的`height`设置为一个百分数，其值是包含块 `height`的百分比。

* 例：`p`元素的高是其父元素`div`的一半，即`3em`

```html
<div style="height: 6em;">
    <p style="height: 50%;"></p>
</div>
```

* 没有显式声明包含块的`height`，百分数高度会重置为`auto`，即：与其包含块的高度完全相同

```html
<div style="height: auto;">
    <p style="height: 50%;"></p>
</div>
```

### 4.4 合并垂直外边距

例1：

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

```css
li {
    width: 200px;
    margin-top: 10px;
    margin-bottom: 15px;
    background: blue;
}
```

![relationship-map]({{ '/styles/images/css/box/box-04.png' | prepend: site.baseurl }})

* 相邻两个`li`之间的距离不是 `25px`而是`15px`
    * 原因：相邻外边距会沿着竖轴合并。即：**两个外边距中较小的一个会被较大的一个合并。**
* 如果用户代理实现不正确的话，那么相邻两个`li`元素之间的距离是`25px`

例2：

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
<h1>hello</h1>
```

```css
h1 {
    width: 240px;
    margin-top: 28px;
    background: orange;
}
ul {
    width: 240px;
    margin-bottom: 15px;
    background: yellow;
}
li {
    width: 200px;
    margin-top: 10px;
    margin-bottom: 20px;
    background: blue;
}
```

* `ul` 的下外边距为 `15px`

![relationship-map]({{ '/styles/images/css/box/box-06.png' | prepend: site.baseurl }})

* 列表中最后一项的下外边距为 `20px`。【其实相邻两个 `li`之间的距离也是`20px`】

![relationship-map]({{ '/styles/images/css/box/box-07.png' | prepend: site.baseurl }})

* `li`结尾到`h1`开始之间的距离有`28px` 
* 原因：`h1`的上边距为`28px`，`li`的下边距为`20px`，前者大于后者，所以取最大值者。

![relationship-map]({{ '/styles/images/css/box/box-05.png' | prepend: site.baseurl }})

**在包含块上设置边框或者内边距，会使其子元素的外边距包含在包含块内。**

```css
h1 {
    width: 240px;
    margin-top: 28px;
    background: orange;
}
ul {
    width: 240px;
    margin-bottom: 15px;
    background: yellow;
    border: 1px solid; /*新增了这一行*/
}
li {
    width: 200px;
    margin-top: 10px;
    margin-bottom: 20px;
    background: blue;
}
```

* 没添加`border` 

![relationship-map]({{ '/styles/images/css/box/box-09.png' | prepend: site.baseurl }})

* 添加了`border`

![relationship-map]({{ '/styles/images/css/box/box-08.png' | prepend: site.baseurl }})

### 4.5 负外边距
 
* 负外边距会影响外边距的合并
    * 如果垂直外边距都设置为负值，浏览器会取两个外边距**绝对值的最大值**
    * 如果一个正外边距和一个负外边距合并，会从**正外边距减去这个负外边距的绝对值**

基本`html`格式

```html
<p class="one">one</p>
<p class="two">two</p>
```

例1：垂直外边距都设置为负值

```css
p {
    width: 200px;
    height: 40px;
}
.one {
    margin-bottom: -20px;
    background: blue;
}
.two {
    margin-top: -30px;
    background: red;
}
```

* 段落1

![relationship-map]({{ '/styles/images/css/box/box-10.png' | prepend: site.baseurl }})

* 段落2

![relationship-map]({{ '/styles/images/css/box/box-11.png' | prepend: site.baseurl }})

例2：一正一负

```css
p {
    width: 200px;
    height: 40px;
}
.one {
    margin-bottom: 20px;
    background: blue;
}
.two {
    margin-top: -30px;
    background: red;
}
```

* 段落1

![relationship-map]({{ '/styles/images/css/box/box-12.png' | prepend: site.baseurl }})

* 段落2

![relationship-map]({{ '/styles/images/css/box/box-13.png' | prepend: site.baseurl }})

