---
layout: post
title: "javasript - 设计模式 - 反模式"
data: 2017-09-17 12:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 装饰器模式]({{ '/2017/09/15/js-decorator-pattern' | prepend: site.baseurl }})
    
    
* 以下内容部分都摘自书本：《JavaScript设计模式与开发实践》 第8章 发布—订阅模式 

<!-- more -->

## 一、什么是反模式

反模式是一种针对特定问题的**不良解决方案**，该方案会导致糟糕的情况发生。

## 二、为什么要学习反模式

因为如果我们懂得反模式，就可以在项目的开发中避开反模式，也可以对我们现在已有的项目进行代码的重构，去除一些反模式的设计，从而提高代码的整体质量。

## 三、javascript中常见的反模式

### 3.1 定义大量污染全局命令空间的变量

### 3.2 修改Object的类型

### 3.3 使用document.wirte创建页面

### 3.4 硬编码，写死功能
