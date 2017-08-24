---
layout: post
title: "HTTP第一课--基础"
date: 2017-08-24 09:00:00 +0800 
categories: HTTP
tag: HTTP
---
* content
{:toc}

其他链接：

+ [HTTP第二课--TCP]({{ '/2017/08/24/HTTP-Second-TCP' | prepend: site.baseurl }})
+ [HTTP第三课--DNS]({{ '/2017/08/24/HTTP-Third-DNS' | prepend: site.baseurl }})



<!-- more -->

## HTTP是什么
HTTP，`Hyper Text Transfer Protocol`，简称 **超文本传输协议**，是用于万维网（WWW：World Wide Web）服务器传输超文本到本地浏览器的传输协议。

>HTTP属于应用层（Application Layer），是一个基于TCP/IP通信协议来传递数据（包括HTML文件、图片、查询结果等等），并且它工作在 **客户端-服务端** 的架构上。


## HTTP的特点

**1、简单快速**  
* 客户向服务器请求服务时，只需传送请求方法和路径。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。

**2、灵活** 
* HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。

**3.无连接**  
* 无连接的含义是 **限制每次连接只处理一个请求** 。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。

**4.无状态**  
* HTTP协议是 **无状态协议**。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

**5、支持B/S及C/S模式**

## HTTP之URI

### 什么是URI
URI，`Uniform Resource Identifier`，统一资源标识符。服务器资源名被称为统一资源标识符。

>1.HTTP使用统一资源标识符来传输数据和建立连接。      
>2.URI 有两种：URN 以及 URL。

### URN
URN，`Uniform Resource Name`，统一资源命名，是通过名字来标识资源，比如 `mailto:java-net@java.sun.com`

### URL
URL，`Uniform Resource Locator`,，统一资源定位符，是一种特殊类型的URI，包含了用于查找某个资源的足够的信息，也是互联网上用来标识某一处资源的地址。

>`&lt;scheme>://&lt;user>:&lt;password>@&lt;host>:&lt;port>/&lt;path>;&lt;params>?&lt;query>#&lt;frag>`

*  URL 的组成部分请看下图

![relationship-map]({{ '/styles/images/HTTP/HTTP-01.png' | prepend: site.baseurl }})

*  URL 的例子请看下图

![relationship-map]({{ '/styles/images/HTTP/HTTP-02.png' | prepend: site.baseurl }})

### 插件 -- Plugins

插件是`webpack`的*支柱*功能。

插件目的在于解决`loader`无法实现的功能。

以上四点的关系有点类似与下面这个图：

![relationship-map]({{ '/styles/images/webpack/webpack-04.png' | prepend: site.baseurl }})

---

## 第一个webpack项目

我们第一个项目使用了官方的一个例子。作为起步，非常有指导意义。主要的步骤先列举如下：

+ `webpack`的安装
+ 创建一个`bundle`文件
+ 配置`webpack.config.js`

### webpack的安装

对于一个`nodejs`项目，我们通常会先建立一个`package.json`，这个我们在[初识Gulp]({{ '/2017/04/26/First-Meet-Gulp' | prepend: site.baseurl }})进行进一步了解。

```bash
$ npm init -y
```

然后，我们可以进行全局安装：

```bash
$ npm install -g webpack
```

或本地依赖安装：

```bash
$ npm install --save-dev webpack
```

### 第一个bundle文件

```bash
$ mkdir demo-01 && cd demo-01
$ npm init -y
$ install --save-dev webpack
```

然后，我们建立一个`app`子目录并创建一个`index.js`文件。

```bash
$ mkdir app && cd app
$ touch index.js
```

```js
//index.js
function component () {
  var element = document.createElement('div');
  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}
document.body.appendChild(component());
```

这里，我们`_.join(['Hello','webpack'], ' ')`代码需要依赖`lodash`，而且是运行时依赖。

正常情况下，我们会在相应的`.html`文件中利用`<script>`标签引入这个依赖。这样的管理方式有一些问题：

+ 如果依赖不存在或引入顺序错误，程序将无法运行
+ 如果依赖被引入但是没有使用，就会浪费很多时间下载无用的代码

我们来利用`webpack`解决。

首先，我们安装`lodash`运行时依赖。

```bash
$ npm install --save lodash
```

然后，我们在`index.js`文件中import `lodash`。

```js
import _ from 'lodash';

function component() {
    ...
}
```

在项目根目录下，我么创建一个`index.html`文件将它显示出来。

```html
<html>
  <head>
    <title>webpack 2 demo</title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

> 这里的代码明显告诉我们：`index.html`只引入`bundle.js`文件，即`webpack`最终编译的文件。

### 配置webpack

通常情况下，我们使用一个配置文件来打包代码。在项目根目录下，我们创建一个`webpack.config.js`文件。

```js
var path = require('path');

module.exports = {
  entry: './app/index.js', //入口文件
  output: {
    filename: 'bundle.js', //输出文件名
    path: path.resolve(__dirname, 'dist') //输出文件地址
  }
};
```

然后，此文件可以被执行：

```bash
$ .\node_modules\.bin\webpack
```

![]({{ '/styles/images/webpack/webpack-01.png' | prepend: site.baseurl }})

输出的编译文件就存放在`dist`文件夹中。

> 如果全局安装了`webpack`的话，我们直接`$ webpack`就可以。但这并不是最佳实践，最佳实践还是利用本地命令。

#### 配合npm来使用

考虑到用`CLI`的方式来运行`webpack`不是特别方便，我们可以设置一个快捷方式。像这样调整`package.json`：

```json
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
```

这样，我们可以用以下命令来运行`webpack`:

```bash
$ npm run build
```

![]({{ '/styles/images/webpack/webpack-02.png' | prepend: site.baseurl }})

第一个章节到此结束。