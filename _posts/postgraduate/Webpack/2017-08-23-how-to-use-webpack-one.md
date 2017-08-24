____
layout: post
title: "Webpack的基本用法"
date: 2017-08-23 23:00:00 +8000
categeries: 工具
tag: Webpack
____
* content
{:toc}

<!-- more -->

## 基本概念

### 入口 --- entry
`webpack`将创建所有应用程序的依赖关系图表(dependency graph)。图表的起点被称之为入口起点(entry point)。入口起点告诉`webpack`从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将您应用程序的入口起点认为是根上下文(contextual root)或app第一个启动文件。

在`webpack`中，我们使用**webpack 配置对象**(webpack configuration object)中的`entry`属性来定义入口。

#### entry配置