---
layout: post
title: "css - 选择器 - 3 - 伪类选择器 - 下篇"
date: 2017-11-04 10:00:00 +0800 
categories: 学习笔记
tag: CSS
---
* content
{:toc}

> * 相关链接：
>   * [css - 选择器 - 选择器分类](http://www.jmazm.com/2017/11/04/css-basic/)
>   * [css - 选择器 - 1 - 基本选择器和层次选择器](http://www.jmazm.com/2017/11/04/css-selector1/)
>   * [css - 选择器 - 2 - 伪类选择器 - 上篇](http://www.jmazm.com/2017/11/04/css-selector2/)
>   * [css - 选择器 - 4 - 伪元素选择器](http://www.jmazm.com/2017/11/04/css-selector4/)
>   * [css - 选择器 - 5 - 属性选择器](http://www.jmazm.com/2017/11/04/css-selector5/)

> * 以下内容源于：《图解CSS3核心技术与案例实战》 第2章

<!-- more -->

## 一、结构伪类选择器

### 1.1 语法

![selector](/styles/images/css/selector/selector-13.png)

### 1.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-14.png)

### 1.3 结构伪类选择器中的 n

![selector](/styles/images/css/selector/structorSelector/structorSelector-01.png)

> * 补充：
>   * `n` 为整数，并且只能从1开始。
>   * `n` 可以是 `odd` （奇数：1、3、5、7、9）；或者是 `even` （偶数：2、4、6、8、10）

### 1.4 :first-child 和 :first-of-type

> * `:first-child`：定位某个元素的第一个子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg1.html)，效果图如下

![selector](/styles/images/css/selector/structorSelector/structorSelector-02.png)

---

> * 考虑使用 `:first-child` 的场景：
>   * 上述效果其实可以通过 **添加类名** 去解决，但是，如果多处都有这样的效果，那岂不是要为每个元素都添加这个类名？这样的话，这个代码看上去就会很冗杂。所以，此时可以考虑使用`:first-child`。
>   * 如果使用`:first-child` 来移除一个浮动元素的左边距或右边距，如果浏览器不支持`:first-child`，布局将会被破坏。

---

> * `:first-of-type`：指定了元素的类型

### 1.5 :last-child 和 :last-of-type 

> * `:last-child`：定位某个元素的最后一个子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg2.html)，效果图如下

![selector](/styles/images/css/selector/structorSelector/structorSelector-03.png)

---

> * `:last-of-type`：指定了元素的类型

### 1.6 :nth-child()

> * `:nth-child(n)`：定位某个父元素的一个或多个特定的子元素。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg3.html)，效果图如下

![selector](/styles/images/css/selector/structorSelector/structorSelector-04.png)

### 1.7 :nth-last-child()

> * `:nth-last-child(n)`：定位某个父元素的一个或多个特定的子元素，不过是从父元素的最后一个子元素开始计算。

> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg4.html)，效果图如下


![selector](/styles/images/css/selector/structorSelector/structorSelector-05.png)

> * 补充：`:nth-child()` 和 `:nth-last-child()` 比较 

![selector](/styles/images/css/selector/structorSelector/structorSelector-06.png)

### 1.8 :nth-of-type() 和 :nth-last-of-type()

> * `:nth-of-type(n)`：定位某个父元素的一个或多个特定的子元素，不过它只是计算父元素中指定的某种类型的子元素。

> * 接下来看一看 `:nth-child(n)` 与 `:nth-of-type(n)` 的区别，效果图如下：【点击打开[demo](/effects/demo/css/selector/structorSelector/eg5.html)】 

![selector](/styles/images/css/selector/structorSelector/structorSelector-07.png)

> * 我们都知道，`<ul>` 元素的子元素只能是 `<li>` 元素而不能是其他元素。但是例子中又在 `<ul>` 元素中添加了 `<div>` 元素。
> * 从图中我们可以看到：
>   * `.child > li:nth-child(4)` 并没有效果，那是因为将 `<div>` 元素作为了 `<ul>` 元素的第 4 个子元素，而第 4 个 `<li>` 元素则成为了 `<ul>` 元素的第5个子元素。【`.child > li:nth-child(5)` 这样才能正确匹配第4个`<li>`元素】
>   * ` .type > li:nth-of-type(4)` 却能正确匹配第4个`<li>`元素。

--- 
> * 总结：
>   * `:nth-child(n)`：选择的是某父元素的子元素，不过这个元素并没有指出确定的类型！！
>       * 我们可以这样理解`.child > li:nth-child(4)`：选择第4个`<li>`元素，但由于没有指定类型，刚好 `.child` 的第 4 个元素是`<div>` ，这也相当于`.child > li:nth-child(4)`这个元素是不存在的，所以匹配失效。
>   * `nth-of-type(n)`：选择的是某父元素的子元素，不过这个子元素是指定类型。
>    * 我们可以这样理解`.type > li:nth-of-type(4)`：选择的元素类型是 `<li>`，并且是第4个。

---

> * `:nth-last-of-type()` 和 `nth-of-type` 一样，不过起始方向是从最后一个子元素开始。

### 1.9 :only-child

> * `:only-child`：匹配元素的父元素中仅有一个子元素。【即：仅能匹配父元素中的一个子元素，这个子元素是唯一的】
> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg6.html)

![selector](/styles/images/css/selector/structorSelector/structorSelector-08.png)

### 1.10 :only-of-type

> * `:only-of-type`：选择一个元素是它的父元素的唯一一个相同类型的子元素。【表示一个元素有很多个子元素，而其中只有一个子元素是唯一的，使用`:only-of-type` 就可以选中这个唯一类型子元素。】
> * 点击打开[demo](/effects/demo/css/selector/structorSelector/eg7.html)

![selector](/styles/images/css/selector/structorSelector/structorSelector-09.png)

---

> * `:only-child` 和 `:only-of-type` 的区别可以参照 `1.8` .

### 1.11 :empty

![selector](/styles/images/css/selector/structorSelector/structorSelector-10.png)

## 二、、否定伪类选择器

### 2.1 语法

![selector](/styles/images/css/selector/selector-15.png)

### 2.2 浏览器兼容性

![selector](/styles/images/css/selector/selector-16.png)

### 2.3 demo

> * 点击打开[demo](/effects/demo/css/selector/NegativePseudoClassSelector/eg1.html)

![selector](/effects/images/css/selector/selector-03.gif)

