---
layout: post
title: "javasript - 设计模式 - MVC模式"
data: 2017-09-18 12:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 装饰器模式]({{ '/2017/09/15/js-decorator-pattern' | prepend: site.baseurl }})
    
    

<!-- more -->

## 一、MVC模式

![relationship-map]({{ '/styles/images/javascript/designPattern/designPattern-03.png' | prepend: site.baseurl }})

应用复杂性的提高，程序变得臃肿，难以分工开发

* 解决办法：通过**关注点分离**改进程序组织
    * 思路：将大体的问题做一些合理的分解，拆成不同的部分，通过分别仔细研究不同的部分，综合各部分的结果做出整体的解决方案

界面：展示数据
逻辑：界面和数据的桥梁

MVC模式是软件工程中的架构模式，早期的开发中，MVC模式主要用于服务端，而前端主要负责View视图。随着BackboneJs、EmberJs等框架的出现，前端也逐渐兴起了MVC模式

当用户与视图交互的时候，会触发一些用户的事件，这些事件会被控制器监听，控制器会根据不同的用户事件调用模块层的一些相应的接口，通过
这个接口的调用，修改模块层的数据，导致模块层数据的改变。

而视图会根据**观察者模式**去观察模块的数据，当模块的数据进行改变的时候，则会通过事件通知的方式去通知视图。
最后，视图根据新的数据来改变自己的状态，即：改变我们的用户界面
    
