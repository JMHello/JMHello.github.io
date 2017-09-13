---
layout: post
title: "javasript -跨域 - postMessage() + iframe"
data: 2017-09-13 22:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他连接：
    + [javasript - 同源策略]({{ '/2017/09/07/js-Same-Origin-Policy' | prepend: site.baseurl }})
    + [javasript - 跨域 - CORS]({{ '/2017/09/07/js-CORS' | prepend: site.baseurl }})
    + [javasript - 跨域 - JSONP]({{ '/2017/09/07/js-JSONP' | prepend: site.baseurl }})
    + [javasript - 跨域 - Iframe和window.name]({{ '/2017/09/09/js-window-name-iframe' | prepend: site.baseurl }})
    + [javasript - 跨域 - document.domain和iframe]({{ '/2017/09/11/js-document-domain' | prepend: site.baseurl }})
    + [javasript - 跨域 - 动态创建script标签]({{ '/2017/09/11/js-script' | prepend: site.baseurl }})
    + [javasript - 跨域 - location.hash + iframe]({{ '/2017/09/13/js-hash-iframe' | prepend: site.baseurl }})
  
* 以下内容部分都摘自书本：《JavaScript高级程序设计（第3版）》 16.1 跨文档消息传递

<!-- more -->

## 一、跨文档消息传送

* 跨文档消息传送（`cross-document messaging`），有时候简称为 `XDM`，指的是**在来自不同域的页面间传递消息**。
    * 例如：`www.wrox.com` 域中的页面与位于一个内嵌框架中的 `p2p.wrox.com`域中的页面通信。
        * 即：`www.wrox.com/a.html`中引入一个`iframe`，其`src`为`p2p.wrox.com/b.html`
* 支持 `XDM` 的浏览器有 IE8+、Firefox 3.5+、Safari 4+、Opera、Chrome、iOS 版 Safari 及 Android 版WebKit。
        
## 二、 postMessage()

### 2.1 postMessage()简介

* `XDM` 的核心是 `postMessage()`方法。
* `postMessage()`的存在就是为了向另一个地方传递数据。
    * 对于 `XDM` 而言，“另一个地方”指的是**包含在当前页面中的`<iframe>`元素**，或者**由当前页面弹出的窗口**。

### 2.2 postMessage()的使用

* `targetWindow.postMessage(msg, origin)`方法接收两个参数：
    * `msg`：消息，类型为 `String`、`Object` (IE8、9 不支持)
        * 可以恰当使用`JSON.stringify()`以及`JSON.parse()`
    * `origin`：表示消息接收方来自哪个域的字符串。
        * `origin`这个参数对保障安全通信非常重要，可以防止浏览器把消息发送到不安全的地方。
        
* 例子
```js
//注意：所有支持 XDM 的浏览器也支持 iframe 的 contentWindow 属性
var iframeWindow = document.getElementById("myframe").contentWindow;
iframeWindow.postMessage("A secret", "http://www.wrox.com"); 
```

* 最后一行代码尝试向内嵌框架中发送一条消息，并指定框架中的文档必须来源于`http://www.wrox.com`域。
    * 如果来源匹配，消息会传递到内嵌框架中；否则，`postMessage()`什么也不做。
* 这一限制可以避免窗口中的位置在你不知情的情况下发生改变。
* 如果传给 `postMessage()`的第二个参数是"`*`"，则表示可以把消息发送给来自任何域的文档，但不推荐这样做。

### 2.4 接收到XDM消息时的操作

* 接收到`XDM`消息后，触发 `window` 对象的 `message` 事件。
    * 这个事件是以异步形式触发的，因此从发送消息到接收消息（触发接收窗口的 `message` 事件）可能要经过一段时间的延迟。
* 触发 `message`事件后，传递给 `onmessage` 处理程序的事件对象包含以下三方面的重要信息。
    * `data`：作为 `postMessage()`第一个参数传入的字符串数据。
    * `origin`：发送消息的文档所在的域，例如"`http://www.wrox.com`"。
    * `source`：发送消息的文档的 `window` 对象的代理。
        * 这个代理对象主要用于在发送上一条消息的窗口中调用 `postMessage()`方法。
        * 如果发送消息的窗口来自同一个域，那这个对象就是`window`。
        
```js
EventUtil.addHandler(window, "message", function(event){
     //确保发送消息的域是已知的域
     if (event.origin == "http://www.wrox.com"){
         //处理接收到的数据
         processMessage(event.data);
         //可选：向来源窗口发送回执
         event.source.postMessage("Received!", "http://p2p.wrox.com");
     }
}); 
```

## 三、完整的实例

![relationship-map]({{'/styles/images/javascript/crossDomain/crossDomain-07.png' | prepend: site.baseurl}})

* 假设 `http://127.0.0.1:3001/a.html`要与`http://127.0.0.1:3002/b.html`通信

**`http://127.0.0.1:3001/a.html`**

* `html`
```html
<!--  
 1. `a.html`里引入一个`iframe`，其`src`为：`http://127.0.0.1:3002/b.html`
-->
<iframe src="http://127.0.0.1:3002/b.html"></iframe>
```

* `js`
```js
// 2. 获取iframe
var iframeWindow = document.getElementById("myframe").contentWindow;

//3. 向http://127.0.0.1:3002/b.html发送信息
iframeWindow.postMessage("A secret", "http://127.0.0.1:3002/b.html"); 
```

**`http://127.0.0.1:3002/b.html`**

* `js`
```js
var onmessage = function (event) {  
    var data = event.data;//消息  
    var origin = event.origin;//消息来源地址  
    var source = event.source;//源Window对象 
     
    if(origin=="http://www.baidu.com"){  
        console.log(data);//hello world! 
         
        // 如果b.html需要向a.html发送信息，那么b.html里就要嵌入一个iframe，其src为http://127.0.0.1:3001/a.html 
        // source.postMessage('Recieved', 'http://127.0.0.1:3001/a.html');
    }  
};  

window.onmessage = onmessage;  

```