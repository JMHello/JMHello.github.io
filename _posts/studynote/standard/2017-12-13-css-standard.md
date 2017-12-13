---
layout: post
title: "前端CSS规范"
data: 2017-12-13 14:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

* 参考资料：《现代前端技术解析》

![img](/styles/images/standard/standard-04.png)

<!-- more -->

## 一、前端 CSS 规范

### 1.1 CSSy引用规范

> * 推荐使用 `link` 方式调用外部样式文件【原因：可复用并能利用浏览器缓存提高加载速度】
> * 不要在标签中使用内联样式【原因：后期不易维护和管理】

### 1.2 样式的命名规范

> * [命名规范](http://www.jmazm.com/2017/11/28/css-name-rules/)

> * 所有命名全小写 
> * 不要使用拼音作为样式命名，尤其是中英混合
> * 写 `css` 样式时，不要用 `id`选择器 【原因：针对`id` 的元素样式难以复用，而且 `id` 属性一般用于 `JavaScript` 查询 `DOM` 使用】

```css
/* 不推荐 */
.xinwen {}
.XINWEN {}
.xinwen-list {}
.ui-xw-ft {}
.news {}
#news {}
```
> * 尽量不以 `info`、`current`、`news` 等单词类名直接作为类名称【原因：单独的一级命名很容易造成冲突覆盖，并难以理解】

```css
/* 不推荐 */
.news .info {}

/* 推荐 */
.ui-news .news-info {}
```

> * 不以模块表现样式来命名，要根据内容命名 ---- 推荐使用功能和内容相关的词汇命名
>   * 如：`left`、`right`、`red` 这类命名就会有些尴尬。【如果段落一开始颜色为`red`，之后要变成 `blue`。】

```css
/* 不推荐 */
.left {}
.center {}

/* 推荐 */
.ui-search {}
.ui-main {}
```

### 1.3 简写方式

> * 每项规则后一定要带分号。

> * 单位 0 的缩写。
>   * 如果属性值为 0，则不需要为 0 添加单位。
>   * 如果是以 0 为个数的小数，前面的 0 可省略不写。

```css
/* 不推荐 */
.ui-news {
    marigin: 0px;
    opacity: 0.6;
}

/* 推荐 */
.ui-news {
    marigin: 0;
    opacity: .6;
}
```

> * 去掉 `URL` 中引用资源的引号，影响阅读

```css
/* 不推荐 */
body {
    background: url("sprites.png");
}

/* 推荐 */
body {
    background: url(sprites.png);
}
```

> * 所有颜色值要使用小写，并尽量缩写至3位

```css
/* 不推荐 */
.ui-news {
  color: #FF0000;
}

/* 推荐 */
.ui-news {
    color: #f00;
}
```

### 1.4 属性书写顺序

> * 先写布局属性 ====》 再写元素内容属性
>   * `position、display、float、overflow =====》 color、font、text-align`

```css
/* 不推荐 */
.ui-news {
  background: #000;
  margin: 10px;
  padding: 10px;
  color: #000;
  width: 500px;
  height: 200px;
  float:left;
}

/* 推荐 */
.ui-news {
  float:left;
  margin: 10px;
  padding: 10px;
  width: 500px;
  height: 200px;
  color: #000;
  background: #000;
}
```

### 1.5 Hack 写法

> * 目前浏览器已完全舍弃对 IE7及其版本以下的浏览器的兼容性考虑。

```css
.ui-news p {
    color: #000; /* For all */
    color: #111\9; /* For all IE */
    color: #222\0; /* For IE8 and later, Opera without Webkit */
    color: #333\9\0; /* For IE9 and later */
}
```

> * 针对IE，可以使用条件注释作为预留`HACK` 来使用

```html
<!-- [if <keyword>? IE <version>?]>
    <link rel="stylesheet" href="./style.css">
<![endif] -->
```

> * CSS 规则若要实现在多种浏览器内核上兼容，需遵循先写私有属性后写标准属性的原则【原因：利于浏览器版本向前兼容】

```css
.ui-news p {
    -webkit-box-shadow: inset 1px 2px 1px blue;
    -moz-box-shadow: inset 1px 2px 1px blue;
    -ms-box-shadow: inset 1px 2px 1px blue;
    -o-box-shadow: inset 1px 2px 1px blue;
    box-shadow: inset 1px 2px 1px blue;
}
```

### 1.6 CSS高效实现规范

> * [css - 选择器 - 优化](http://www.jmazm.com/2017/11/12/css-selector-optimization/)