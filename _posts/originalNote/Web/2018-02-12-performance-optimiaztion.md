---
layout: post
title: "性能优化阶段"
date: 2018-02-03 19:00:00 +0800 
categories: 原创
tag: 深入理解Web前端
---
* content
{:toc}



<!-- more -->


## 一、本质

> * 浏览器发送请求给服务器端，服务器端返回响应给客户端。

![optimization](/styles/images/web/performanceOptimization/po-01.png)

> * 这个过程可以移到我们生活中的例子：运输货物

![optimization](/styles/images/web/performanceOptimization/po-02.png)

> * 看到上图，大家可能都会回想到：如何做才能以最短时间把货物运输完？其实我们可以从3方面下手：
>   1. 减少运输次数：当我们的服务器端在装载“货物”时，如果一次多装一点，那么运输次数不就减少了，从而使运输时间也减少了
>   2. 减少运输体积：当我们的服务器端装载货物时， 除去不必要的包装、杂物，那么运输的体积不就减少了，从而使运输时间也减少了
>   3. 提高运输速度：这个就最简单，总路程一定，速度高了，运输时间自然就少了

> * 由上述例子类比到我们的浏览器与服务器端间的数据运输，其减少运输时间的途径也是：减少运输次数、减少运输体积、提高运输速度

## 二、减少请求数

> * 一般来说，`Web` 前端大多数的响应时间都花在图片、样式、脚本等资源的下载
>   * 请求耗时的原因：我们拿到数据都要经过这些过程
>   * `DNS` 解析和寻址，服务器建立连接，发送数据，等待服务器响应，接受数据等等
> * 所以，你也可以想象到，如果一个页面的请求数过多，那么这个页面的加载速度就会令人无法直视！

![optimization](/styles/images/web/performanceOptimization/po-03.png)

> * 减少请求数的方法：
>   * 小图片合并成雪碧图或者使用`icon-font`
>   * `js`，`css`文件合并

## 三、减少资源体积

> * 减少资源体积的方法：
>  * 精简代码
>  * 压缩 `css`，`js`，图片：可使用一些在线工具、`clean-css`、`UglifyJS`、`imagemin`
>  * 开启`Gzip`：`Gzip`是一种压缩方案，会将输出到浏览器的数据进行压缩处理，这样就会减少通过网络传输的数据量，这样也就可以提高我们的浏览速度

> * `Gzip` 原理大概如下图：

![optimization](/styles/images/web/performanceOptimization/po-04.png)

> * 浏览器发送请求给服务器端时，请求头上携带字段 `accept-encoding: gzip`，告诉服务器端，接受的编码格式是`gzip`，然后，服务器端就会按照`Gzip`的编码格式规则去进行压缩
> * 压缩完后，服务器端就会将压缩完的数据返回给客户端，响应头携带字段 `content-encoding: gzip`，告诉客户端，接受的内容的编码格式是 `gzip`，然后，客户端就会对数据进行解压
> * 解压后，数据才能正常在页面中显示。
> * 通常来说，`gzip`最高能压缩到90%，大大节省网络带宽


## 四、提高网络运输

> * 网络传输是影响网页性能的主要因素
> * 提高网络传输的手段：

> * 手段1. 浏览器缓存：节约网络的资源加载，使用户能更快速地浏览页面。
>   * 即：浏览器能把用户最近浏览的页面进行缓存，当用户再次访问的时候，会从浏览器缓存里取出这些文件和资源，最终使用户更快速获取到页面的内容。

> * 浏览器缓存大致过程如下图：

![optimization](/styles/images/web/performanceOptimization/po-05.png)

> * 浏览器缓存的优点：减少了冗余的数据传输，减少了服务器的负担

---

> * 手段2. 使用`CDN`（`Content Delivery Network`，内容分发网络）

> * 没有`CDN`

![optimization](/styles/images/web/performanceOptimization/po-06.png)

> * 来自五湖四海的用户想访问 `xxx` 网页，就要从服务器里拿数据和资源，但是，有些用户离这个服务器太远了，导致页面加载速度过慢，这严重影响了用户体验！

> * 所以才有了`CDN`（蓝色的云代表`CDN`）

![optimization](/styles/images/web/performanceOptimization/po-07.png)

> * 服务器会将数据和资源 `copy` 一份到 `CDN`上，用户不再需要从服务器拿数据，而是直接从`CDN`拿数据和资源
> * 所以，使用`CDN`能缩短传输路径，使用户就近访问！

---

> * 较完整的请求资源的路径如下：

![optimization](/styles/images/web/performanceOptimization/po-08.png)

> * 询问完浏览器缓存后，再看看有没有`CDN`，有从`CDN`拿数据，没有才从服务器端拿数据