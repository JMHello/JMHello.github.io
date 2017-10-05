---
layout: post
title: "项目 - 口袋豆瓣"
date: 2017-10-03 09:00:00 +0800 
categories: 原创
tag: project
---
* content
{:toc}

本篇文章主要讲述如何做一个“口袋豆瓣”的小项目。
这是我第一次使用 `react` 和 `es6`做项目，也体会到了`react`的强大以及便利。

<!-- more -->

## 一、介绍口袋豆瓣

### 1.1 简单介绍

* 首页

![relationship-map]({{ '/styles/images/project/douban/douban-03.png' | prepend: site.baseurl }})

* 列表页

![relationship-map]({{ '/styles/images/project/douban/douban-01.png' | prepend: site.baseurl }})

* 详情页

![relationship-map]({{ '/styles/images/project/douban/douban-02.png' | prepend: site.baseurl }})

> * 功能：
>    * 列表页展示。
>    * 底部 `Tab` 切换：底部常驻导航栏，点击可切换不同类型，控制列表展示相应的内容。
>    * 顶部搜索框功能。
>    * 点击 `item` 展示详情页。
>    * 返回列表页等功能。
>    * 列表页实现下拉刷新以及拉到底部加载更多的功能。

### 1.2 运行项目

> * 需要在`nodejs`环境下才可以运行本项目
> * 在命令行里输入 `npm i`，将所有需要依赖的工具包都下载好
> * 在命令行里输入 `npm run dev`，运行由`webpack`搭建的服务器（会直接在默认浏览器里打开网页）

## 二、口袋豆瓣 - 法1

### 2.1 文件结构

![relationship-map]({{ '/styles/images/project/douban/douban-04.png' | prepend: site.baseurl }})

### 2.2 想法

> * 我将 “搜索”、“列表展示”、“tab”抽出来作为组件复用，而图书、电影、音乐我将其看作“不同”的三个页面。
> * 因此，这三个页面我就将其都新建了一个 `index.jsx`页面（可从上图看到：`container`里有`Bokk`，`Music` 、`Movie`）。
> * 其实这三个页面就只有中间的列表内容不一样，即：请求数据的`url`不一样，其他的所有功能都一样。
> * 由于我将其分开了，所以处理数据来十分方便，就好像只要写一份`index.jsx`文件，其他两份直接`copy`就行了，只要适当改一下数据就可以了。

### 2.3 项目下载



## 三、口袋豆瓣 - 法2

### 3.1 文件结构

![relationship-map]({{ '/styles/images/project/douban/douban-05.png' | prepend: site.baseurl }})

### 3.2 想法

> * 总感觉 法1 的`copy`怪怪的，因此我换了一个思路去做：
>  * 整个应用看起来就像一个`tab`切换，只是中间的内容变化了，而其他一点变化都没有，所以根本就不需要新建那么多个`index.jsx`页面
> * 由上图可知，我就只建了一个 `category`页面就代表了`Bokk`，`Music` 、`Movie`。

### 3.3 做法

> * 既然一个页面就可以代表三个页面，那么就必须通过一些**标志**知道当前是属于哪一个页面的内容。
> * 这里我用到了 `this.props.params.type`（这个是路由配置的参数）+ `onhashchange()`这个事件。

以下是路由配置`routeMap.jsx`文件的内容

![relationship-map]({{ '/styles/images/project/douban/douban-06.png' | prepend: site.baseurl }})

### 3.4 项目下载

[http://git.imweb.io/jm_hello/douban-pocket.git](http://git.imweb.io/jm_hello/douban-pocket.git)

## 四、主要使用的工具包

> 1. `fetch-jsonp`：拉取数据
> 2. `react-router`：路由配置
> 3. `webpack-dev-server`：只要一有修改，页面就是自动更新

