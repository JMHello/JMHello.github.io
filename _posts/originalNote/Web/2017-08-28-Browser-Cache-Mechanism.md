---
layout: post
title: "浏览器缓存机制"
date: 2017-08-28 19:00:00 +0800 
categories: 原创
tag: 深入理解Web前端
---
* content
{:toc}

其他链接：

+ 中文官方主页： [http://jekyll.com.cn/](http://jekyll.com.cn/)


**图1：浏览器缓存机制**

![relationship-map]({{ '/styles/images/web/cache/cache-01.png' | prepend: site.baseurl }})

**图2：http报文中与缓存相关的首部字段**

![relationship-map]({{ '/styles/images/web/cache/cache-04.png' | prepend: site.baseurl }})


<!-- more -->

> 以下部分内容参考：[https://doc.webpack-china.org/configuration](https://doc.webpack-china.org/configuration)

## 一、浏览器如何判断缓存是否过期 

### 1.1 原理

浏览器根据`Response Header`里面的`Cache-Control`和`Expires`这两个属性判断缓存是否过期。

当`Cache-Control`和`Expires`都存在时，`Cache-Control`优先级较高，即`Expires`的效用会被忽略。

### 1.2 Cache-Control

`Cache-Control`用于随报文传送缓存指示。

* `Cache-Control`在作为请求首部的一部分时的值，如下图所示：

![relationship-map]({{ '/styles/images/web/cache/cache-02.png' | prepend: site.baseurl }})

> * 如果值为 `max-age`：那么它定义了文档的最大使用期，也可称为最大的合法生存时间（以秒为单位），并且它是`相对时间`。即：从第一次生成文档到文档不再新鲜、无法使用为止
> * 如果值为`no-cache`，有些人会误认为响应不会被缓存，实际上标识为 `no-cache` 的响应实际上是可以存储在本地缓存区中的，只不过每次在向客户端（即：浏览器）提供响应数据时，缓存都要向服务器评估缓存相应的有效性。
> * `Cache-Control:no-store`：这个才是响应不被缓存。

* `Cache-Control`在作为响应首部的一部分时的值，如下图所示：

![relationship-map]({{ '/styles/images/web/cache/cache-03.png' | prepend: site.baseurl }})

### 1.3 Expires

`Expires`是一个`绝对时间`，指定的是一绝对的过期日期。如果过期日期一到，说明实体不再有效，要从原始的源端再次获取此实体的日期和时间。

* 例：`Expires:Fri,05 Jul 2002,05:00:00 GMT` 【格林尼治时间】

## 二、服务端如何判断缓存是否失效

### 2.1 原理

服务端会通过 `If-Modified-Since（Last-Modified）`和`If-None-Match（Etag）`这两个属性的值来判断缓存是否失效的。

* `If-Modified-Since（Last-Modified）`和`If-None-Match（Etag）` 可称之为“有条件的请求”。
    * 有条件的请求是标准的 `HTTP` 请求报文，但仅当某个特定条件为真时才执行，即：仅当资源改变时才请求副本。

### 2.2 If-Modified-Since（Last-Modified）再验证

`If-Modified-Since:<date>` 用于再验证。

> 例子：`If-Modified-Since: Thu, 03 Oct 1997 17:15:00 GMT`


*  `If-Modified-Since` 再验证请求通常被称为 `IMS` 请求。如果从指定日期之后文档被修改过了，就执行请求的方法。

    * 如果自指定日期后，文档被修改了，`If-Modified-Since` 条件就为真，通常`GET` 就会成功执行。
      携带新首部的新文档会被返回给缓存，新首部除了其他信息之外，还包含了一个新的过期日期。
      
    * 如果自指定日期后，文档没被修改过，条件就为假，会向客户端返回一个小的 `304 Not Modified` 响应报文，
      为了提高有效性，不会返回文档的主体。这些首部是放在响应中返回的，但只会返回那些需要在源端更新的首部。
      
* `Last-Modified`：表示上一次文件修改的时间。`If-Modified-Since`可以与`Last-Modified` 服务器响应首部配合使用，只有在内容被修改后与已缓存版本有所不同的时候才去获取内容。

> 简单举个例子【**以下所讲的缓存机制可以称为协商缓存，并且是单方面验证**】：  
> * 假设我第一次向`www.xxx.com`发送请求，那么客户端会得到服务器发回来的 `Response Header`，里面会有一个首部 `Last-Modified:xxx`，那么浏览器将会将这个`Last-Modified`的值存起来，用于我下一次请求这个页面。 【假设缓存时间为`cache-control:max-age=60`】 
> * 第二次向`www.xxx.com`发送请求，如果没有超过缓存时间，则实行 **“强缓存”**，如果超过了缓存时间，则执行以下步骤：
>      *  那么`Request Header`里会伴随一个首部`If-Modified-Since:xxx`，那么此时会有两种情况。
>          1. 文件没有被修改过：如果该请求首部告诉服务器，客户端传来的最后修改时间与服务器上的一致，则直接回送`304` 和响应报头即可
>          2. 文件被修改了：如果该请求首部告诉服务器，客户端传来的最后修改时间与服务器上的不一致，则直接回送`200` 和响应报头（包含新的`Last-Modified`的值）即可，那么浏览器又会重新存储这个`Last-Modified`的值。



### 2.3 If-None-Match（Etag）实体标签再验证


`ETag` : 服务器会通过一系列复杂的算法，给资源算出一个唯一的标识值在把资源响应给客户端的时候，会在实体首部加上“ETag: 唯一标识符”一起返回给客户端。

> 服务器只需要比较客户端传来的ETag跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。那么客户端是如何把标记在资源上的 ETag 传去给服务器的呢？就是一下所讲的`If-None-Match`。

`If-None-Match` ：它存的实际上就是`Etag`值。它可以用于发起条件请求。客户端为服务器提供一个实体标记列表，服务器将这些标记与它拥有的资源实体标记进行比较，只在都不匹配的时候才将资源返回。

例子：`If-None-Match: "11e92a-457b-31345aa"`


* 有些情况下仅使用最后修改日期进行再验证是不够的，即`Last-Modified`所带来的一些问题：
    * 有些文档可能会被周期性地重写（比如，从一个后台进程中写入），但实际包含的数据常常是一样的。尽管内容没有变化，但修改日期会发生变化。
    
    * 有些文档可能被修改了，但所做修改并不重要，不需要让世界范围内的缓存都重装数据（比如对拼写或注释的修改）。
    
    * 有些服务器无法准确地判定其页面的最后修改日期。
    
    * 有些服务器提供的文档会在亚秒间隙发生变化（比如，实时监视器），对这些服务器来说，以一秒为粒度的修改日期可能就不够用了。
    
* 为了解决这些问题，`HTTP` 允许用户对被称为实体标签（`ETag`）的“版本标识符”进行比较。实体标签是附加到文档上的任意标签（引用字符串）。它们可能包含了文
  档的序列号或版本名，或者是文档内容的校验和及其他指纹信息。
  
* 当发布者对文档进行修改时，可以修改文档的实体标签来说明这个新的版本。这样，如果实体标签被修改了，缓存就可以用 If-None-Match 条件首部来 GET 文档的新副本了。


举个例子：

其实在`If-Modified-Since`验证前，需要先验证'Etag'，以下所讲的都是单方面验证。

> * 假设我第一次向`www.xxx.com`发送请求，那么客户端会得到服务器发回来的 `Response Header`，里面会有一个首部 `Etag:xxx`，那么浏览器将会将这个`Etag`的值存起来，用于我下一次请求这个页面。 
> * 第二次向`www.xxx.com`发送请求，执行以下步骤：
>      *  那么`Request Header`里会伴随一个首部`If-None-Match:xxx`，那么此时会有两种情况。
>          1. 文件没有被修改过：如果该请求首部告诉服务器，客户端传来的`If-None-Match`值（实际上是`Etag`值）与服务器上的一致，则直接回送`304` 和响应报头即可。
>          2. 文件被修改了：如果该请求首部告诉服务器，客户端传来的传来的`If-None-Match`值（实际上是`Etag`值）与服务器上的不一致，则直接回送`200` 和响应报头（包含新的`Etag`的值）即可，那么浏览器又会重新存储这个`Etag`的值。

## 三、用户行为与缓存

![relationship-map]({{ '/styles/images/web/cache/cache-05.png' | prepend: site.baseurl }})