---
layout: post
title: "javascript - 设备事件"
data: 2017-11-03 12:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 13.4.8 设备事件

<!-- more -->


## 一、设备事件

### 1.1 orientationchange 事件

> * 苹果公司为移动 `Safari` 中添加了 `orientationchange` 事件，以便开发人员能够 **确定用户何时将设备由横向查看模式切换为纵向查看模式**。
> * 移动 `Safari` 的 `window.orientation` 属性中可能包含 3 个值：【请看下图】
>   * `0` 表示肖像模式。
>   * `90` 表示向左旋转的横向模式（“主屏幕”按钮在右侧）。
>   * `-90` 表示向右旋转的横向模式（“主屏幕”按钮在左侧）。
>   * 相关文档中还提到一个值，即 `180` 表示 `iPhone` 头朝下；但这种模式至今尚未得到支持。

![demo](/styles/images/javascript/deviceEvent/deviceEvent-01.png)

> * 所有 `iOS` 设备都支持 `orientationchange` 事件和 `window.orientation` 属性。

### 1.2  MozOrientation 事件
