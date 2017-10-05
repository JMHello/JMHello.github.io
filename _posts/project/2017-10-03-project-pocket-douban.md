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

* 需要在`nodejs`环境下才可以运行本项目
* 在命令行里输入 `npm i`，将所有需要依赖的工具包都下载好
* 在命令行里输入 `npm run dev`，运行由`webpack`搭建的服务器（会直接在默认浏览器里打开网页）

## 二、口袋豆瓣 - 法1

### 2.1 文件结构

![relationship-map]({{ '/styles/images/project/douban/douban-04.png' | prepend: site.baseurl }})

## 三、口袋豆瓣 - 法2

