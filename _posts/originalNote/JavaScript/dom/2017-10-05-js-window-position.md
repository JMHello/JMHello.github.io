---
layout: post
title: "javascript - 窗口位置"
data: 2017-10-05 10:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

参考资料：
+ 《JavaScript高级程序设计（第3版）》 8.1.3 8.1.4

<!-- more -->

## 一、窗口位置

### 1.1 screenTop、screenLeft

* 表示窗口相对于屏幕左边和上边的位置
    * `IE`、`Safari`、`Opera` 和 `Chrome` 都提供了`screenLeft` 和 `screenTop` 属性。
    * `Firefox`提供 `screenX`、`screenY`。

```js
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY; 
```


> * 在 `IE`、`Opera` 中：
>    * `screenLeft` 和 `screenTop` 中保存的是从屏幕左边和上边到由 `window` 对象**表示的页面可见区域的距离**。
>    * 换句话说，如果 `window` 对象是最外层对象，而且浏览器窗口紧贴屏幕最上端——即 `y` 轴坐标为 0，
>    那么 `screenTop` 的值就是位于**页面可见区域上方的浏览器工具栏的像素高度**。

![relationship-map]({{ '/styles/images/javascript/DOM/style/style-12.png' | prepend: site.baseurl }})


>* 在 `Chrome`、`Firefox`和 `Safari`中，`screenY` 或 `screenTop`中：
>    * 保存的是整个浏览器窗口相对于屏幕的坐标值，即在窗口的 `y` 轴坐标为 `0` 时返回 `0`。

![relationship-map]({{ '/styles/images/javascript/DOM/style/style-11.png' | prepend: site.baseurl }})

> * `Firefox`、`Safari` 和 `Chrome` 始终返回页面中每个框架的 `top.screenX` 和`top.screenY` 值。
>   * 即使在页面由于被设置了外边距而发生偏移的情况下，相对于 `window` 对象使用`screenX` 和 `screenY` 每次也都会返回相同的值。
> * `IE` 和 `Opera` ：会给出框架相对于屏幕边界的精确坐标值。
> * 最终结果：无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值。

### 1.2 moveTo()、moveBy()

* `moveTo(x, y)`：
    * 新位置的 `x` 和 `y`坐标值
* `moveBy(left, top)`：
    * `left`：水平方向上移动的像素数。
    * `top`：垂直方向上移动的像素数。

```js
//将窗口移动到屏幕左上角
window.moveTo(0,0);
//将窗向下移动 100 像素
window.moveBy(0,100);
//将窗口移动到(200,300)
window.moveTo(200,300);
//将窗口向左移动 50 像素
window.moveBy(-50,0); 
```
    
> 在 Opera 和 IE 7（及更高版本）中默认就是禁用的。另外，这两个方法都不适用于框架，只能对最外层的 `window` 对象使用。

## 二、窗口大小

> * `innerWidth`、`innerHeight`：表示该容器中页面视图区的大小（减去边框宽度）。
  
> * `outerWidth`、`outerHeight`：
>  * 在 `IE9+`、`Safari` 和 `Firefox` 中：
>       * `outerWidth` 和 `outerHeight` 返回浏览器窗口本身的尺寸（无论是从最外层的 window 对象还是从某个框架访问）。
>  * 在 Opera中：
>       * 这两个属性的值表示页面视图容器的大小。


### 2.1 chrome、Firefox、IE

> * `outerWidth`、`outerHeight`：红色框框，即：返回浏览器窗口本身的尺寸
> * `innerWidth`、`innerHeight`：蓝色框框，即：浏览器视口的大小（减去了浏览器的边框）

> * 点击打开[demo](/effects/demo/js/demo-size/window.position/eg1.html)

![relationship-map]({{ '/styles/images/javascript/DOM/style/style-10.png' | prepend: site.baseurl }})

### 2.2 clientHeight & innerHeight、clientWidth & innerWidth

> * 以下两组输出的值是一样的，这两组属性都是保存了页面视口的信息。

> * 点击打开[demo](/effects/demo/js/demo-size/window.position/eg2.html)

> * 操作过程

![image](/effects/images/javascript/size/size-03.gif)

### 2.3 兼容浏览器，获取页面视口大小

```js
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

if (typeof pageWidth != "number"){
    if (document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
} 
```

### 2.4 移动设备与桌面浏览器的差异

> * 对于移动设备：`window.innerWidth` 和 `window.innerHeight` 保存着**可见视口**，也就是**屏幕上可见页面区域的大小**。
> * 移动 `IE` 浏览器不支持这些属性，但通过 `document.documentElement.clientWidth`和 `document.documentElement.clientHeihgt` 提供了相同的信息。
> * **着页面的缩放，这些值也会相应变化**。

> * 在其他移动浏览器中，`document.documentElement` 度量的是**布局视口**，即**渲染后页面的实际大小**（**与可见视口不同，可见视口只是整个页面中的一小部分**）。
> * 移动 `IE` 浏览器把布局视口的信息保存在`document.body.clientWidth`和`document.body.clientHeight`中。
> * **这些值不会随着页面缩放变化**。

**由于与桌面浏览器间存在这些差异，最好是先检测一下用户是否在使用移动设备，然后再决定使用哪个属性。**

### 2.5 resizeTo()、resizeBy()

* `resizeTo()`：接收浏览器窗口的新宽度和新高度
* `resizeBy()`：接收新窗口与原窗口的宽度和高度之差。

```js
//调整到 100×100
window.resizeTo(100, 100);
//调整到 200×150
window.resizeBy(100, 50);
//调整到 300×300
window.resizeTo(300, 300); 
```

> 在 `Opera`和 `IE7`（及更高版本）中默认就是禁用的。另外，这两个方法同样不适用于框架，而只能对最外层的`window` 对象使用。