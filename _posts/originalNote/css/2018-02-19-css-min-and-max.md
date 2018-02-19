---
layout: post
title: "css - min/max width/height"
data: 2018-02-19 10:27:00 +0800
categories: 原创
tag: CSS
---
* content
{:toc}

<!-- more -->


## 一、width&min-width&max-width

> * [demo](/effects/demo/css/minAndMax/v1.html)

![width](/styles/images/css/minAndMax/mm-01.png)

> * 从上图可得出以下结论：
>   * 单独设置 `min-width`，则保证元素有最少宽度
>   * 单独设置 `max-width`，则保证元素有最大宽度
>   * 同时设置 `width` 和 `max-width`，保证元素的最小宽度为 `width` 的值，而元素的最大宽度则为 `max-width` 的值
>   * 同时设置 `width` 和 `min-width`，`min-width` 的值会直接覆盖`width`的值，元素最终的宽度为`min-width`的值
>   * 同时设置 `width` 、 `min-width` 和 `max-width`，`min-width` 的值会直接覆盖`width`的值，元素元素的最小宽度为`min-width`的值，而元素的最大宽度则为 `max-width` 的值

## 二、height&min-height&max-height

> * [demo](/effects/demo/css/minAndMax/v2.html)

![width](/styles/images/css/minAndMax/mm-02.png)


> * 从上图可得出以下结论：
>   * 单独设置`height` 或者 `min-height`，都能保证元素有最小高度
>   * 单独设置`max-height`，在元素没有内容的情况下，是不会有高度的；如果有内容，则保证元素的最大高度为 `max-height` 的值，不会超过此值
>   * 同时设置 `height` 和 `max-height`，保证元素的最小宽度为 `height` 的值，而元素的最大宽度则为 `max-height` 的值
>   * 同时设置 `height` 和 `min-height`，`min-height` 的值会直接覆盖`height`的值，元素最终的宽度为`min-height`的值
>   * 同时设置 `height` 、 `min-height` 和 `max-height`，`min-height` 的值会直接覆盖`height`的值，元素元素的最小宽度为`min-height`的值，而元素的最大宽度则为 `max-height` 的值