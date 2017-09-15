---
layout: post
title: "javasript - 设计模式 - 装饰器模式"
data: 2017-09-15 12:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 装饰器模式]({{ '/2017/09/15/js-decorator-pattern' | prepend: site.baseurl }})
    
* 以下内容部分都摘自书本：《JavaScript设计模式与开发实践》 第8章 发布—订阅模式 

<!-- more -->

## 一、什么是发布-订阅模式

* 发布—订阅模式（又称观察者模式）：定义对象间的一种一对多的依赖关系。
    * 即：当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

* 生活实例

![relationship-map]({{ '/styles/images/javascript/designPattern/designPattern-08.png' | prepend: site.baseurl }})

* 我们可以把主播当作发布者（`Subject`），当到了开始广播的时间之后，就会广播给听众：“我要开播了，快来呀！”
* 我们可以把听众当作观察者，也称为订阅者（`Observer`），主要是关注自己喜欢的广播人员，看他们什么时候开始广播。

