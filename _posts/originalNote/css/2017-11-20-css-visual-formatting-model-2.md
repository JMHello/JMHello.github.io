---
layout: post
title: "css - 视觉格式化模型 - 中篇 - BFC"
data: 2017-11-20 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

> * 参考资料：
>   * [CSS深入理解流体特性和BFC特性下多栏自适应布局](http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)


<!-- more -->

## 一、概念辨析

### 1.1 块容器盒

> * 块容器盒（`Box Container Box`）：
>   * 只包含其它块级盒，或者生成一个行内格式化上下文（`Inline Formatting Context`）
>       * 即：要么只包含行内级盒，要么只包含块级盒
>   * 块容器盒描述的是元素与其后代之间的影响

### 1.2 块级盒

> * 块级盒（`block-level box`）：
>   * 块级盒参与块级格式化上下文
>   * 每个块级元素至少有一个块级盒，不过`li`元素除外，它会多生成一个盒子来存放装饰符
>   * 块级盒描述元素与它的父元素与兄弟元素之间的表现

---

> * 元素的 `CSS` 属性 `display` 的计算值为 `block`，`list-item`，`table`，`flex` 或 `grid` 时，它是块级元素。
> * 视觉上呈现为块，竖直排列。
>   * 典型的如 `<div>` 元素，`<p>` 元素等都是块级元素。


### 1.3 主要块级盒

> * 主要块级盒（`principal block-level box`）：
>   * 每个块级元素至少生成一个块级盒，称为主要块级盒
>   * 主要块级盒将包含后代元素生成的盒以及生成的内容

### 1.4 块盒

> * 块盒（`block boxes`）：同时是块容器盒的块级盒称为块盒

![bfc](/styles/images/css/vfm/bfc/bfc-09.png)

### 1.5 匿名块盒

> * 匿名块盒(`Anonymous block boxes`)：
>   * 有时需要添加补充性盒，这些盒子就是匿名块盒，它们没有名字，不能被`css`选择器选中
>       * 不能被`css`选择器选中意味不能用样式表添加样式，所以这些盒子内所有继承的`css`属性都是 `inherit`，所有非继承的`css`属性都是`initial`

> * 块容器盒要么只包含行内级盒，要么只包含块级盒。但通常会同时包含两者。在这种情况下，将创建匿名块盒来包含毗邻的行内级盒（`IFC` 里不会包含块级元素）

> * [demo](/effects/demo/css/vfm/bfc/eg7.html)

```html
<div>
    hello,
    <p>你好吗？</p>
    I'm fine
</div>
```

![bfc](/styles/images/css/vfm/bfc/bfc-10.png)

> * 上述代码创建了两个匿名块盒，一个包含`p`前的文本，一个包含`p`后的文本

## 二、块级元素 --- 水平格式化

> * 水平格式化的复杂性在于`width`影响的是内容区的宽而不是整个可见的元素框。

> * 要知道什么情况下会隐式地增加`width`值

### 2.1 水平属性

> * 水平格式化有7大属性
>    * `margin-left`
>    * `border-left`
>    * `padding-left`
>    * `width`
>    * `padding-right`
>    * `border-right`
>    * `margin-right`

>* 元素包含块的宽度（块元素的父元素的`width`值）= 元素7大水平属性之和

### 2.2 使用auto

> * 7个水平属性中，只有3个属性的值可以设置为`auto`:`margin-left`、`width`、`margin-right`
> * 水平外边距不会合并

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg1.html)【7个属性和为 `600px`，无`padding`和 `border`】

![bfc](/styles/images/css/vfm/bfc/bfc-01.png)

![bfc](/styles/images/css/vfm/bfc/bfc-02.png)

### 2.3 负外边距

> * 7个水平属性的总和 = 父元素的 `width`。只要所有属性 >= 0，元素就不会大于父元素的内容区。

> * **元素水平属性过分受限的一个规则：** 通过重置`margin-right`以保证元素水平属性的总和 = 父元素的`width`。
>    * 在此规则下，`margin-right`很容易得到负值
    
> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg2.html)

![bfc](/styles/images/css/vfm/bfc/bfc-03.png)

## 三、块级元素 --- 垂直格式化

> * 一个元素的默认高度由其内容决定。高度还会受其内容宽度的影响：段落越窄，相应就越高。

### 3.1 垂直属性

> * 垂直格式化有7大属性
>    * `margin-top`
>    * `border-top`
>    * `padding-top`
>    * `height`
>    * `padding-bottom`
>    * `border-bottom`
>    * `margin-bottom`
    
> * 元素包含块的高度（块元素的父元素的`height`值）= 元素7大垂直属性之和

### 3.2 使用auto

> * 7个垂直属性中，只有3个属性的值可以设置为`auto`:`margin-top`、`height`、`margin-bottom`
> * 元素的上下外边距设置为`auto`，他们会被重置为0，即：元素框没有上下外边距。
    
> * 块级正常流元素的`height`设置为`auto`
>    * 显示时其高度恰好包含其内联内容的行盒。
>    * 其子元素是块级元素的话，默认的高度 从最高级块级子元素的外边框边界到最低块级子元素外边框边界之间的距离。
>        * 子元素的外边距会“超出”包含这些子元素的元素。
>    * 块级元素有上下内边距/上下边框，其高度从其最高子元素的上外边距边界到其最低子元素的下外边距边界之间的距离。

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg3.html)

![bfc](/styles/images/css/vfm/bfc/bfc-04.png)

### 3.3 百分数高度    

> * 一个正常流元素的`height`设置为一个百分数，其值是包含块 `height`的百分比。

> * 例：`p`元素的高是其父元素`div`的一半，即`3em`

```html
<div style="height: 6em;">
    <p style="height: 50%;"></p>
</div>
```

> * 没有显式声明包含块的`height`，百分数高度会重置为`auto`，即：与其包含块的高度完全相同

```html
<div style="height: auto;">
    <p style="height: 50%;"></p>
</div>
```

### 3.4 垂直方向间距计算

> * 在一个 `BFC` 里，盒子垂直方向的距离由上下 `margin` 决定。
> * 在同一个 `BFC` 中，垂直方向相接的间距会发生合并。
>   * 如都为正值，则取最大值；
>   * 如一正一负，则取相加后的值；
>   * 如都为负，则取绝对值大的那个。

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg4.html)

![bfc](/styles/images/css/vfm/bfc/bfc-05.png)

## 四、BFC

### 4.1 什么是bfc

> * `BFC`(`Block Formatting Context`)：块级格式化上下文
>   * 它是一个独立的渲染区域，只有块级盒(`Block-level Box`) 参与
>   * 它规定了内部的块级盒(`Block-level Box`)如何布局
>   * 并且与这个区域外部毫不相干

### 4.2 渲染规则

> * 默认根元素（`html` 元素）会创建一个 `BFC`，其块级盒子元素将会按照如下规则进行渲染：
>   * 块级盒会在垂直方向，一个接一个地放置，每个盒子水平占满整个容器空间
>   * 块级盒的垂直方向距离由上下 `margin` 决定，同属于一个 `BF`C 中的两个或以上块级盒的相接的 `margin` 会发生重叠
>   * `BFC` 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
>   * 计算 `BFC` 的高度时，浮动元素也参与计算

### 4.3 如何创建bfc

> * 根元素或其它包含它的元素
> * 浮动元素 (元素的 float 不是 none)
> * 绝对定位元素 (元素的 position 为 absolute 或 fixed)
> * 内联块元素 (元素具有 display: inline-block)
> * 表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
> * 表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
> * 匿名表格元素 (元素具有 display: table, table-row, table-row-group, table-header-group, table-footer-group [分别是HTML tables, table rows, table bodies, table headers and table footers的默认属性]，或 inline-table )
> * overflow 值不为 visible 的块元素，
> * display 值为 flow-root 的元素
> * contain 值为 layout, content, 或 strict 的元素
> * 弹性元素 (display: flex 或 inline-flex元素的子元素)
> * 网格元素 (display: grid 或 inline-grid 元素的子元素)
> * 多列容器 (元素的 column-count 或 column-width 不为 auto 即视为多列，column-count: 1的元素也属于多列)
> * 即便具有 column-span: all 的元素没有被包裹在一个多列容器中，column-span: all 也始终会创建一个新的格式化上下文。

## 五、创建BFC

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg5.html)

![bfc](/styles/images/css/vfm/bfc/bfc-07.png)

## 六、BFC 的应用

### 6.1 应用

> * 点击打开[demo](/effects/demo/css/vfm/bfc/eg6.html)

![bfc](/styles/images/css/vfm/bfc/bfc-08.png)

### 6.2  BFC特性下多栏自适应布局的效果展示

![bfc](/effects/images/css/vfm/vfm-01.gif)

## 七、总结

> * **`BFC` 元素特性表现原则就是：内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。**
>   * 在此基础上，避免 `margin` 的穿透（`margin` 的合并）以及理解如何通过创建 `BFC` 清除浮动就可以了！！