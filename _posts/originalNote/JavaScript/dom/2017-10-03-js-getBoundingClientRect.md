---
layout: post
title: "javascript - getBoundingClientRect()"
data: 2017-10-03 12:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

<!-- more -->

## 一、getBoundingClientRect()

* `getBoundingClientRect()`：返回会一个矩形对象，包含4 个属性：`left`、`top`、`right` 和 `bottom`。
* 这些属性给出了**元素在页面中相对于视口的位置**。
* 在 `IE8` 及更早版本中，会返回`(2,2)`，而在其他浏览器中会返回`(0,0)`。

* 实例1：只有一层父元素

```html
<div id="outer" style="width: 100px; height: 100px; position: relative; margin: 20px; padding: 20px; left: 10px; top: 10px; background: red">
    <div id="inner" style="width: 50px; height: 50px; overflow: scroll; border: 10px solid; padding: 10px; margin: 10px;position: absolute; top: 100px; left: 10px; background: blue"></div>
</div>

<script>
var outer = document.getElementById('outer');
console.log(outer.getBoundingClientRect());
var inner = document.getElementById('inner');
console.log(inner.getBoundingClientRect());
</script>
```

* 效果图：

![relationship-map]({{ '/styles/images/javascript/DOM/style/style-07.png' | prepend: site.baseurl }})

* `outer`

![relationship-map]({{ '/styles/images/javascript/DOM/style/style-05.png' | prepend: site.baseurl }})

* `inner`

![relationship-map]({{ '/styles/images/javascript/DOM/style/style-06.png' | prepend: site.baseurl }})

* 从图中可以得出以下结论：
    1. `bottom` = `top` + `height`
    2. `right` = `left` + `width`
    3. `x` = `left`
    4. `y` = `right`

