---
layout: post
title: "css - 选择器 - 优化"
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
>   * [css - 选择器 - 3 - 伪类选择器 - 下篇](http://www.jmazm.com/2017/11/04/css-selector3/)
>   * [css - 选择器 - 4 - 伪元素选择器](http://www.jmazm.com/2017/11/04/css-selector4/)
>   * [css - 选择器 - 5 - 属性选择器](http://www.jmazm.com/2017/11/04/css-selector5/)

> * 以下内容源于：
>   * [http://www.jianshu.com/p/268c7f3dd7a6](http://www.jianshu.com/p/268c7f3dd7a6)
>   * [http://www.alloyteam.com/2012/10/high-performance-css/](http://www.alloyteam.com/2012/10/high-performance-css/)

<!-- more -->

## 一、CSS 选择器性能损耗来自？

> * `CSS` 选择器对性能的影响 **源于浏览器匹配选择器和文档元素时所消耗的时间**，所以优化选择器的原则是应 **尽量避免使用消耗更多匹配时间的选择器**。

> * `CSS` 选择器是从右到左进行规则匹配。

> * 实例：`#header  a {font-weight:blod;}`
>   * 浏览器必须遍历页面中所有的 `a` 元素并且确定其父元素的 `id` 是否为 `header`。 

> * **最右边选择符称之为关键选择器**：
>   * 只要当前选择符的左边还有其他选择符，样式系统就会继续向左移动，直到找到和规则匹配的选择符，或者因为不匹配而退出。

## 二、如何减少 CSS 选择器性能损耗？

![selector](/styles/images/css/selector/selector-23.png)

> * 1、避免使用通用选择器
>   * 示例：`.content * {color: red;}`
>   * 浏览器匹配文档中所有的元素后分别向上逐级匹配 `class` 为 `content` 的元素，直到文档的根节点。
>   * 因此其匹配开销是非常大的，所以应避免使用关键选择器是通配选择器的情况。

> * 2、避免使用标签或 `class` 选择器限制 `id` 选择器

```
BAD
button#backButton {…}
BAD
.menu-left#newMenuIcon {…}

GOOD
#backButton {…}
GOOD
#newMenuIcon {…}
```


> * 3、避免使用标签限制 class 选择器

```
BAD
treecell.indented {…}

GOOD
.treecell-indented {…}

BEST
.hierarchy-deep {…}
```

> * 4、避免使用多层标签选择器。使用 `class` 选择器替换，减少 `css` 查找

```
BAD
treeitem[mailfolder="true"] > treerow > treecell {…}

GOOD
.treecell-mailfolder {…}
```

> * 5、避免使用子选择器

```
BAD
treehead treerow treecell {…}

BETTER, BUT STILL BAD 
treehead > treerow > treecell {…}

GOOD
.treecell-header {…}
```

> * 6、使用继承

```
BAD 
#bookmarkMenuItem > .menu-left { list-style-image: url(blah) }

GOOD
#bookmarkMenuItem { list-style-image: url(blah) }
```