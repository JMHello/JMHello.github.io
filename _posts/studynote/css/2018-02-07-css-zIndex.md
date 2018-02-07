---
layout: post
title: "css - zIndex"
data: 2018-02-07 12:27:00 +0800
categories: 学习笔记
tag: CSS
---
* content
{:toc}

<!-- more -->

> * 参考资料：
>   * [理解CSS的 z-index属性](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index)
>   * [深入理解CSS中的层叠上下文和层叠顺序](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
>   * [层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

> * 网页正常文档流排版默认在同一个平面内，元素占据空间，依次排列，互不干扰。
> * 但是如果元素变成定位元素，难免会遇到元素重叠。
> * 所以，如果想要让想要的元素在最上层，就要用到`z-index`这个属性了！


## 一、zIndex

> * `z-Index` 属性：用来指定定位元素（非`static`元素）在垂直于页面上的排列顺序，其值有两种：`auto`（默认值），整数值（0/负数/正数）

> * 元素排列顺序：
>   * 默认 `HTML` 结构顺序
>   * `position`(非`static`) 元素高于其他元素
>   * `position`(非`static`) 元素之间先通过`z-index` 值判断
>   * 如果`z-index`相同，则按照`HTML`结构顺序

```html
<div class="img-wapper">
    <img src="cat.png" class="cat" alt="cat">
    <img src="dog.png" class="dog" alt="dog">
</div>
```

> * [demo1](/effects/demo/css/zIndex/v1.html)

![zIndex](/styles/images/css/zIndex/zIndex-01.png)

---

> * [demo2](/effects/demo/css/zIndex/v2.html)

![zIndex](/styles/images/css/zIndex/zIndex-02.png)

## 二、z-index 与层叠上下文

> * `z-index` 默认值 `auto` 数值上等于`0`，但是，设置了 `z-index:0` 和 默认的 `z-index:auto;` 还是有区别的！
>   * 设置了 `z-index` 属性为整数值(包括0)的元素，自身会创建一个层叠上下文。而创建一个层叠上下文之后，其子元素的层叠顺序就相对于父元素计算，不会与外部元素比较。
>   * 设置了 `z-index: auto`：自身并不会创建一个层叠上下文

> * [demo](/effects/demo/css/zIndex/v3.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>z-index</title>
    <style>
        .dog-wapper {
            position: relative;
            width: 300px;
            height: 200px;
            background: black;
            z-index: auto; /* 默认值 */
        }
        .dog {
            position: absolute;
            top: 120px;
            left: 120px;
            z-index: 2;
        }
        .cat {
            position: absolute;
            top: 80px;
            left: 80px;
            z-index: 1;
        }
    </style>
</head>
<body>
<p>
    给 .dog 和 .cat 增加了容器 .dog-container 和 .cat-container, 并且 .dog 和 .cat 都设置了 z-index 值，<br>
    所以都显示在红色背景的 .container 之上，而且 .dog z-index 数值比较大，所以显示在上面。
</p>
<div class="dog-wapper">
    <img src="dog.png" class="dog" alt="dog">
</div>
<div class="cat-wapper">
    <img src="cat.png" class="cat" alt="cat">
</div>
</body>
</html>
```

> * 我们给 `.dog` 和 `.cat` 增加了容器 `.dog-wrapper` 和 `.cat-wrapper`, 
>   并且 `.dog` 和 `.cat` 都设置了 `z-index` 值，所以都显示在红色背景的 `.wrapper` 之上，而且 `.dog z-index` 数值比较大，所以显示在上面。

![zIndex](/styles/images/css/zIndex/zIndex-03.png)

---

> * 当我们设置了 `.dog-wrapper` 的 `z-index` 属性值为0之后，我们发现，`z-index` 值比较大的 `.dog` 元素反而到 `z-index` 值比较小的 `.cat` 下面了
> * [demo](/effects/demo/css/zIndex/v4.html)

```css
.dog-wapper {
    position: relative;
    width: 300px;
    height: 200px;
    background: black;
    z-index: 0; /* 设置为0 */
}
```

![zIndex](/styles/images/css/zIndex/zIndex-04.png)

> * 其原因就在于我们给 `.dog-wrapper` 设置了 `z-index:0` 之后，`.dog-wrapper` 就创建了自己的层叠上下文
> * 其子元素 `.dog` 在比较层叠顺序的时候只会在 `.dog-wrapper` 内比较，而不会与外面的 `.cat` 比较。

![zIndex](/styles/images/css/zIndex/zIndex-05.png)

---

> * 上面例子告诉我们，并不是所有情况 `z-index` 值大的元素都会在上面。
> * 我们在进行 `z-index` 比较的时候要留意其祖先元素有没有建立独立的层叠上下文，`z-index` 只有在同一个层叠上下文中比较才有意义。
> * 另外，对定位元素设置 `z-index` 属性不是唯一创建层叠上下文的方法，具有下面属性的元素都会创建层叠上下文
>   * 根元素 (`HTML`)
>   * `z-index` 值不为 "`auto`"的 绝对/相对定位
>   * 一个 `z-index` 值不为 "`auto`"的 `flex` 项目 (`flex item`)，即：父元素 `display: flex|inline-flex`
>   * `opacity` 属性值小于 1 的元素
>   * `transform` 属性值不为 "`none`"的元素，
>   * `mix-blend-mode` 属性值不为 "`normal`"的元素，
>   * `filter` 值不为“`none`”的元素，
>   * `perspective` 值不为“`none`”的元素，
>   * `isolation` 属性被设置为 "`isolate`"的元素，
>   * `position: fixed`
>   * 在 `will-change` 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考这篇文章）
>   * `-webkit-overflow-scrolling` 属性被设置 "`touch`"的元素

---

> * `opacity` 属性小于1也会创建层叠上下文
> * [demo](/effects/demo/css/zIndex/v5.html)

```css
 .dog-wapper {
    width: 300px;
    height: 200px;
    background: black;
    opacity: 0.9; /* 设置 opacity 属性小于1也会创建层叠上下文 */
}
```

![zIndex](/styles/images/css/zIndex/zIndex-06.png)

---

> * 只是设置 `position:fixed` 也可以创建层叠上下文
> * [demo](/effects/demo/css/zIndex/v6.html)

```css
 .dog-wapper {
    width: 300px;
     height: 200px;
     background: black;
     position: fixed; /* 只是设置 position:fixed也可以创建层叠上下文 */
 }
```

![zIndex](/styles/images/css/zIndex/zIndex-07.png)


## 三、总结

> * `z-index` 属性用于描述定位元素在垂直于页面方向上的排列顺序。
> * `z-index` 一般比较规则是值大在上，值相同则排后面的在上。
> * 元素在设置了某些属性的时候会创建层叠上下文，`z-index` 值比较大小只有在同一个层叠上下文才有效。



