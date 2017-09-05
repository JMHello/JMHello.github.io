---
layout: post
title: "css - 视觉格式化模型"
data: 2017-09-05 10:27:00 +0800
categories: 原创
tag: css
---
* content
{:toc}

其他链接：


<!-- more -->

## 一、什么是视觉格式化模型

视觉格式化模型（`visual formatting model`）,是 `CSS` 布局的一个基础理论体系，是用来处理文档并将它显示在视觉媒体上的机制。

## 二、关于模型的一些基础知识

### 2.1 包含块

* 每个元素都相对于其包含块摆放，因此，可以这样理解：包含块就是一个元素的“布局上下文”。
* 包含块由最近的块级祖先框、表单元格或行内块祖先框的内容边界（`content edge`）构成。

```html
<!-- p元素的包含块是div元素，div元素的包含块是body元素 -->
<body>
<div>
    <p></p>
</div>
</body>
```

### 2.2 正常流

* 指西方语言文本从左向右、从上向下显示。
* 要让一个元素不在正常流中，可通过使元素成为浮动元素或者定位元素。

### 2.3 非替换元素

* 非替换元素：元素的内容包含在文档中
    * 例：一个段落的文本内容都放在该元素本身之内，这个段落就是非替换元素

### 2.4 替换元素

* 替换元素：指作为其它内容占位符的一个元素。
    * 替换元素有：<`img`>、大多数表单元素
    
### 2.5 块级元素

* 块级元素在正常流中，会在其框前和框后生成“换行”，因此，处于正常流中的块级元素会垂直摆放。
    * 块级元素有：`p`、`div`

![relationship-map]({{ '/styles/images/css/box/box-01.png' | prepend: site.baseurl }})

> * 一个元素的`width`被定义为从左内边界到右内边界的距离
> * 一个元素的`height`则是从上内边界到下内边界的距离

### 2.6 行内元素

* 行内元素不会在框前或框后生成“行分隔符”。
    * 行内元素有：`strong`、`span`

### 2.7 根元素

* 根元素就是位于文档树顶端的元素。
    * 在`HTML`文档中，就是<`html`>
    * 在`XML`文档中，可以是该语言允许的任何元素
    
## 三、块级元素 --- 水平格式化

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

## 五、行内元素相关术语和知识

### 5.1 匿名文本

* 匿名文本(`anonymous text`)：指所有未包含在行内元素的字符串。
    * 例：`<p>Hello<em>,lalal</em></p>`，'Hello'就是匿名文本
* 空格也是匿名文本的一部分，因为空格也是正常字符

### 5.2 em框

* `em`框在字体中定义，也称为字符框(`character box`)。实际的字型可能比其`em`框更高或更矮

### 5.3 内容区

* 在非替换元素中，内容区可能有两种：
    1. 内容区可以是元素中各字符的`em`框串在一起构成的框，也称为`em框定义`
    2. 内容区可以是由元素中字符字形描述的框 
* 在替换元素中，内容区就是元素的固有高度 + margin + border + padding

### 5.4 行间距

* 行间距(`leading`)是`font-siz`的值和`line-height`值之差。
    * 这个差`/2`，即分成两半，分别应用到内容区的顶部和底部。
        * 内容区增加的这两部份也可称为半间距(`half-leading`)
* **行间距只应用于非替换元素**

### 5.5 行内框

* 行内框通过向内容区增加行间距来描述。
* 非替换元素：元素行内框的高度始终 = `line-height`的值 
* 替换元素：元素行内框的高度恰好 = 内容高度 
    * 原因：行间距不应用到替换元素上
    
### 5.6 行框

* 包含改行中出现的行内框的**最高点**和**最低点**的最小框。
    * 行框的上边界要位于最高行内框的上边界
    * 行框的底边要放在最低行内框的下边界

### 5.7 行内元素的一些特点

1. 行内元素的`background`应用内容区及所有内边距
2. 行内元素的`border`包围内容区和所有内边距和边框
3. 非替换元素的`padding`、`border`、`margin`对行内元素无垂直效果
    * 即：它们垂直方向的值不会影响元素行内框的高








