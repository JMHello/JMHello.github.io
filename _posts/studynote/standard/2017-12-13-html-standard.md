---
layout: post
title: "前端HTML规范"
data: 2017-12-13 14:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

* 参考资料：《现代前端技术解析》

![img](/styles/images/standard/standard-03.png)

<!-- more -->

## 一、前端 HTML 规范

### 1.1 文档类型定义

```html
<!-- 不推荐 - HTML 4.01 的 DTD 定义 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD  XHTML 1.1//EN"  "http://www.w3.org/TR/xhtml11//DTD/xhtml11.dtd">

<!-- 推荐.md HTML5 的标准文档类型 -->
<!DOCTYPE html>
```

### 1.2 head 内容

> * `head` 中必须定义 `title`、`keyword`、`description`，保证基本的 `SEO` 页面关键字和内容描述。
> * 移动端页面 `head` 要添加 `viewport` 控制页面不缩放，有利于提高页面渲染性能。
> * 建议在页面 `<head>` 上加上基本的社交 [`RICH` 化信息](http://www.zhangxinxu.com/wordpress/2011/12/html5%E6%89%A9%E5%B1%95-%E5%BE%AE%E6%95%B0%E6%8D%AE-%E4%B8%B0%E5%AF%8C%E7%BD%91%E9%A1%B5%E6%91%98%E8%A6%81/)，保证网页地址分享到主流社交平台后显示页面的缩略图、标题和描述等。

```html
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta itemprop="name" content="页面标题">
<meta name="description" itemprop="description" content="页面描述内容">
<meta itemprop="image" content="http://www.domain.com/assets/logo.png">
```

### 1.3 省略 type 属性

> * 在引用 `CSS` 或 `JavaScript` 时，可以省略 `type` 属性不写
>   * 因为 `HTML5` 在引入 `CSS` 时默认 `type` 值为 `text/css`，在引入 `JavaScript` 时默认`type` 值为 `text/javascript`

### 1.4 使用双引号包裹属性值

> * 所有标签属性值必须要用双引号包裹，不允许有的用双引号，有的用单引号
>   * 这样有利于区分标签的属性名和属性值

```html
<!-- 不推荐 -->
<div class='wrap'></div>

<!-- 推荐.md -->
<div class="wrap"></div>
```

### 1.5 属性值省略

> * 非必需的属性值可以省略。
>   * 如：输入框的 `readonly`、`disabled` 和 `required` 等属性值是非必需的，可以省略不写

```html
<!-- 不推荐 -->
<input type="text" readonly="readonly">
<input type="text" disabled="disabled">
<!-- 推荐.md -->
<input type="text" readonly>
<input type="text" disabled>
```

### 1.6 嵌套

> * 所有元素必须正确嵌套，尽量使用语义化标签
> * 不允许交叉
> * 不允许在`inline`元素中包含`block`元素

```html
<!-- 不推荐 -->
<span>
    <div>块级元素</div>
</span>

<ul>
    <h2>h2</h2>
    <li>list-item</li>
</ul>

<!-- 推荐.md -->
<div>
    <p>p元素</p>
    <ul>
        <li>list-item</li>
    </ul>
</div>
```

### 1.7 标签闭合

> * 非自闭合标签必须添加关闭标识，自闭合标签无须关闭。
> * 在 `W3C` 的不同规范中，标签的闭合检查也是不一样的。
>   * `XHTML` 较为严格，必须在自闭合标签中添加 `"/""`
>   * `HTML4.01` 不推荐在自闭合标签中添加 `"/""`
>   * `HTML5` 添不添加 `"/""` 都符合规范

### 1.8 使用img的alt属性

> * 为 `<img>` 元素加上 `alt`属性，`alt`属性的内容可以简要描述图片的内容，有利于页面搜索引擎优化，而且对于盲人用户和图像加载失效时的提示也很实用（即：支持无障碍阅读和提示），所以要尽量避免 `alt` 的属性值为空
 
### 1.9 使用label的for属性

> * 为表单内部元素 `<label` 加上 `for` 属性或者将对应控件放在 `<label>` 标签内部；
> * 这样点击 `<label>` 标签的时候，同时会关联到对应的 `input` 或 `textarea` 上选中，可以增加输入的响应区域。

```html
<!-- 不推荐 -->
<label>蓝色</label><input type="radio" name="color">

<!-- 推荐.md -->
<label for="blue">蓝色</label><input type="radio" id="blue" name="color">

<!-- 或推荐 -->
<label><input type="radio" name="color">蓝色</label>
``` 

### 1.10 按模块添加注释

> * 在每个大的模块的开始和结束的地方添加起始注释标记，便于开发者识别、维护。

```html
<!-- 新闻列表模块 -->
<div id="news" class="g-news"></div>
<!-- 新闻列表模块结束 -->
```

### 1.11 标签元素格式

> * 块级元素一般另起一行写，行内元素可根据情况换行
> * 尽量保证行内元素代码长度不超过一行，否则要换行
> * 子元素需相对父元素进行缩进

```html
<!-- 不推荐 -->
<div><h1>name</h1><p>aaa<em>bbbb</em>ccc<span>dddd</span>eeee</p></div>

<!-- 推荐.md -->
<div>
    <h1>name</h1>
    <p>aaa<em>bbbb</em>ccc<span>dddd</span>eeee</p>
</div>
```

### 1.12 语义化标签

> * 在合适的地方使用语义合适的标签。

```html
<section class="m-news g-mod">
    <header class="m-news-hd">
        头部区域
    </header>
    <div class="m-news-bd">
        模块正文
    </div>
    <footer class="m-news-ft">
        底部区域
    </footer>
</section>
```