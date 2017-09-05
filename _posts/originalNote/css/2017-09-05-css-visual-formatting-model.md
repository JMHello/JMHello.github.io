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
    
## 三、水平格式化

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

## 四、垂直格式化

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
### 4.3 百分数高度    