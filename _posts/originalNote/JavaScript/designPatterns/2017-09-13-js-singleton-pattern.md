---
layout: post
title: "javasript - 设计模式 - 单例模式"
data: 2017-09-13 12:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    
* 以下内容部分都摘自书本：《JavaScript设计模式与开发实践》 第四章 单例模式

<!-- more -->

## 一、什么是单例模式

> * 单例模式（`Singleton Pattern`）：保证一个类仅有一个实例，并提供一个访问它的全局访问点
> * **单例模式的核心**：确保只有一个实例，并提供全局访问。

## 二、实现单例模式

> * 原理：用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

### 2.1 “不透明”的单例模式

> * [demo](/effects/demo/js/designPattern/singleton/v1.html)

```js
const Singleton = function (name) {
  this.name = name
  this.instance = null
}
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

const a = Singleton.getInstance('a')
const b = Singleton.getInstance('b')
console.log(a === b) // true
```

> * 正常来说，我们都是`new xxx`来获取一个对象的，然而，从以上代码我们可以看到，是通过`Singleton.getInstance()`获取对象的，这明显和我们想象中的不一样。
> * 同时，对于不知情者来说（即：不知道这是一个单例类）,都会直接`var a = new Singleton('bb)`来新建一个对象，然而，这又与实际代码的功效不符。
> * 所以以上代码就称它为“不透明”的单例模式，简单理解：这是一个令人有误会的单例模式。

### 2.2 “透明”的单例模式

> * “透明”的单例模式：我们直接用`new Singleton()`来使用`Singleton`这个类，而不用想那么多无谓的东西。

> * `CreateDiv` 单例类：负责在页面中创建唯一的 `div` 节点

> * [demo](/effects/demo/js/designPattern/singleton/v2.html)

```js
let CreateDiv = (function () {
  let instance = null
  const CreateDiv = function (html) {

    // 保证只创建一个div
    if (instance) {
      return instance
    }

    this.html = html
    // 创建div
    this.init()
    instance = this
    return instance
  }

  CreateDiv.prototype.init = function () {
    const div = document.createElement('div')
    div.innerHTML  = this.html
    document.body.appendChild(div)
  }

  return CreateDiv
})()

const div = new CreateDiv('html1')
const div1 = new CreateDiv('html2')

console.log(div === div1)
```

> * 执行上面代码后，你会发现，只有1个`div`被创建

> * 以上代码尽管实现了单例模式的“透明性”，却暴露了一些缺点：
>    * 假设我们某天需要利用这个类，在页面中创建千千万万的 `div`，即：让这个单例类变成
>          一个普通的可产生多个实例的类，那我们必须改写 `CreateDiv` 构造函数，把控制创建唯一对象
>          的那一段代码去掉，这就是一个`“bug”`了，太麻烦了。
>    * 违反了“单一职责原则”：
>        * `CreateDiv` 的构造函数做了两件事：第一是创建对象和执行初始化 `init` 方法，第二是保证只有一个对象。
>    * 代码看上去很冗杂，不舒服。

      
### 2.3 使用**代理模式**

> * 解决以上问题可以用代理模式。

> * [demo](/effects/demo/js/designPattern/singleton/v3.html)

```js
    // 创建div的类
    function CreateDiv (html) {
      this.html = html
    }
    CreateDiv.prototype.init = function () {
      const div = document.createElement('div')
      div.innerHTML = this.html
      document.body.appendChild(div)
    }

    // 代理模式：负责管理单例
    const ProxySingletonCreateDiv = (function  () {
        let instance = null

        return function (html) {
          if (!instance) {
            instance = new CreateDiv(html)
            instance.init()
          }

          return instance
        }
    })()

    // 测试代码
    const a = new ProxySingletonCreateDiv('html1')
    const b = new ProxySingletonCreateDiv('html2')
    console.log(a === b)
```

> * 通过使用代理模式之后，你会发现代码结构清晰，功能对应，一看上去就知道这段代码究竟是用来做什么的。

## 三、总结

> * 单例模式核心：就是只有一个实例
> * 优点：节约资源，控制入口
> * 缺点：拓展困难（所以可以使用代理模式），不可以职责过重