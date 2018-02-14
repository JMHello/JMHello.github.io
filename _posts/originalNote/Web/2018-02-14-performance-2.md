---
layout: post
title: "性能 - 性能衡量指标"
date: 2018-02-14 10:00:00 +0800 
categories: 学习笔记
tag: 深入理解Web前端
---
* content
{:toc}

> * 参考资料

<!-- more -->


## 一、性能衡量指标

![performance](/styles/images/web/performanceOptimization/po-20.png)


> * 打开一个页面的时候，都会做以下事情：
>   * 开始请求：加载页面的起始时间点，用 `performance.timing.navigationStart` 获取相应的值
>   * 获取首字节：接收到第一个字节数据的时刻，用 `performance.timing.responseStart` 获取相应的值
>   * 页面开始展示：用户屏幕刚开始显示内容的时刻，我们也俗称其为白屏时间
>   * 首屏内容加载完成：
>       * 一般来说，移动端页面比较长，但是我们的手机屏幕的大小是有限制的，所以不可能一屏就看完所有页面的内容。
>       * 因此，一般都是先加载手机屏幕可以容纳下的内容，即首屏内容。
>       * 综上所述：首屏内容加载完成指在不滚动屏幕能看到的内容加载完成的时间点，我们也称其为首屏时间

## 二、白屏时间

### 2.1 介绍

> * 白屏时间：用户屏幕刚开始显示内容的时刻

![performance](/styles/images/web/performanceOptimization/po-21.png)、

![performance](/styles/images/web/performanceOptimization/po-27.png)

> * 浏览器在加载页面的刚开始，页面是处于空白的状态，只有当页面发生绘制操作时会开始显示内容。
> * 浏览器加载页面是一个渐进的过程。为达到更好的用户体验，呈现引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建呈现树和设置布局。在不断接收页面内容的同时，呈现引擎会将部分内容解析并显示出来。
> * 非可视化的 DOM 元素不会显示到窗口中，例如 <head>，这就意味着浏览器在绘制之前，至少需要先解析完head元素中的内容。

### 2.2 计算白屏时间

![performance](/styles/images/web/performanceOptimization/po-22.png)

> * 白屏时间 = 页面开始展示的时间点 - 开始请求的时间点（`performance.timing.responseStart`）

> * 如何知道页面开始展示的时间点？（并没有相应的`api`获取这个时间点）

![performance](/styles/images/web/performanceOptimization/po-23.png)

> * 一般来说，我们解析一个`html`文件的顺序如下： 
>   * 按照文档流从上到下解析 ===》 开始解析 `head` ===》结束解析`head`（开始解析`body`）===》解析完`body`
>   * 即：开始解析`body`就是我们开始看到内容的时刻

> * 所以，我们可以在`head`标签的末尾插入 `endTime = +new Date()`，获取页面开始的时间点

![performance](/styles/images/web/performanceOptimization/po-24.png)

> * 计算的方法如下：
>   * 白屏时间 = `endTime` - `performance.timing.navigationStart`
>   * 白屏时间 = `endTime` - `startTime` (不支持`performance`时使用)
>       * `startTime`：指在`head`标签开头测试的时间点

### 2.3 demo

> * [demo](/effects/demo/js/performance/v8.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script>
      // 测试时间起始点    
      const startTime = +new Date()
    </script>
    <title>白屏时间</title>
    <link rel="stylesheet" href="style.css">
    <script>
      // 测试时间起终点  
      const endTime = +new Date()
    </script>
</head>
<body>
<h1>白屏时间</h1>
<script>
    // 计算白屏时间法1：
    const duration1 = endTime - startTime
    console.log(duration1)

    // 计算白屏时间法2
    const duration2 = endTime - performance.timing.navigationStart
    console.log(duration2)
</script>
</body>
</html>
```

## 三、首屏时间

### 3.1 介绍

![performance](/styles/images/web/performanceOptimization/po-25.png)

> * 首屏时间：指用户在不滚动屏幕看到首屏内容的完整加载时间。
>   * 简单来说，就是首屏区域都展现完成的耗时

---

![performance](/styles/images/web/performanceOptimization/po-28.png)

> * 对于用户体验来说，首屏时间是用户对一个网站的重要体验因素。
> * 通常一个网站，如果首屏时间在5秒以内是比较优秀的，10秒以内是可以接受的，10秒以上就不可容忍了。
> * 超过10秒的首屏时间用户会选择刷新页面或立刻离开。
> * 我自己也亲身体验过，一般如果页面加载过慢，内容显示不出来，我就会立刻离开这个页面或者刷新页面。


### 3.2 计算首屏时间

> * 其实白屏时间以及首屏时间都是我们根据用户去定义的一些衡量性能的指标，并没有对应的`api`去获取其中的值

> * 首屏时间 = 首屏加载完成的时间点 - 页面开始请求的时间点 

![performance](/styles/images/web/performanceOptimization/po-26.png)

> * 如上图所示，页面有4个模块，而模块1和模块2就是首屏可见的内容
> * 因此，我们就在模块2后面，模块3的前面，获取首屏加载完成的时间点

> * 总的来说，首屏时间的计算如下：
>   * 首屏时间 = `firstScreen` - `performance.timing.navigationStart`
>   * 首屏时间 = `firstScreen` - `pageTime` (不支持`performance`时使用)

---

> * 通常计算首屏的方法有
>   * 首屏模块标签标记法
>   * 统计首屏内加载最慢的图片的时间
>   * 自定义首屏内容计算法

### 3.3 首屏模块标签标记法

> * 首屏模块标签标记法，通常适用于首屏内容不需要通过拉取数据才能生存以及页面不考虑图片等资源加载的情况。
> * 我们会在 HTML 文档中对应首屏内容的标签结束位置，使用内联的 JavaScript 代码记录当前时间戳。
> * 事实上首屏模块标签标记法 在业务中的情况比较少，大多数页面都需要通过接口拉取数据才能完整展示，因此我们会使用 JavaScript 脚本来判断首屏页面内容加载情况。

> * [demo](/effects/demo/js/performance/v9.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script>
      // 测试时间起始点
      const pageStartTime = +new Date()
    </script>
    <title>首屏时间</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>首屏时间</h1>
<!-- 首屏可见模块1 -->
<div>模块1</div>
<!-- 首屏可见模块2 -->
<div>模块2</div>
<script>
  // 测试时间起终点
  const pageEndTime = +new Date()
</script>
<!-- 首屏不可见模块3 -->
<div>模块3</div>
<!-- 首屏不可见模块4 -->
<div>模块4</div>
<script>
  // 计算首屏时间法1：
  const duration1 = pageEndTime - pageStartTime
  console.log(duration1)

  // 计算首屏时间法2
  const duration2 = pageEndTime - performance.timing.navigationStart
  console.log(duration2)
</script>
</body>
</html>
```

### 3.4 统计首屏内图片完成加载的时间

> * 通常我们首屏内容加载最慢的就是图片资源，因此我们会把首屏内加载最慢的图片的时间当做首屏的时间。

> * 由于浏览器对每个页面的 `TCP` 连接数有限制，使得并不是所有图片都能立刻开始下载和显示。
> * 因此我们在 `DOM` 树 构建完成后将会去遍历首屏内的所有图片标签，并且监听所有图片标签 `onload` 事件，最终遍历图片标签的加载时间的最大值，并用这个最大值减去 `navigationStart` 即可获得近似的首屏时间。

> * 此时首屏时间等于 加载最慢的图片的时间点 - `performance.timing.navigationStart`;

### 3.5 自定义模块内容计算法

> * 由于统计首屏内图片完成加载的时间比较复杂。因此我们在业务中通常会通过自定义模块内容，来简化计算首屏时间。如下面的做法：
>   * 忽略图片等资源加载情况，只考虑页面主要 DOM
>   * 只考虑首屏的主要模块，而不是严格意义首屏线以上的所有内容

## 四、使用network分析页面

> * 在优化之前，我们要知道优化的瓶颈在哪，是图片？还是样式加载？还是`js`脚本加载？
> * 因此，我们可以使用`Chrome`浏览器自带的工具`network`去分析页面的加载情况。

![performance](/styles/images/web/performanceOptimization/po-29.png)

![performance](/styles/images/web/performanceOptimization/po-30.png)

> * 橙色框框：工具栏
> * 绿色框框：筛选栏，根据筛选条件筛选想要展示的请求列表
> * 蓝色框框：录制页面加载的一些快照
> * 红色框框：概览图，里面有资源被加载过的时间线
>   * 如果发现有多条时间线垂直在一起，表示在这个时间点，有多个资源并行加载
> * 紫色框框：请求列表，列出所有请求资源的情况，默认按请求的顺序排序
> * 褐色框框：请求的总览图，所有资源的加载情况（包括大小、加载时间）
>   * `DOMContentLoaded`：页面加载并解析完毕的时间，这里是`616ms`
>   * `Load`：所有资源加载完成的时间，这里是`1.66s`