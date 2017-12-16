---
layout: post
title: "javasript - 设计模式 - MVC模式"
data: 2017-09-18 12:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 装饰器模式]({{ '/2017/09/15/js-decorator-pattern' | prepend: site.baseurl }})
    

* 随着应用复杂性的提高，程序变得臃肿，难以分工开发
* 解决办法：通过**关注点分离**改进程序组织
    * 思路：将大体的问题做一些合理的分解，拆成不同的部分，通过分别仔细研究不同的部分，综合各部分的结果做出整体的解决方案。

讲了那么多，我们应该怎么做了？请看以下的`MVC`模式。


<!-- more -->

## 一、MVC模式

![relationship-map]({{ '/styles/images/javascript/designPattern/designPattern-05.png' | prepend: site.baseurl }})

> * `MVC`模式是软件工程中的架构模式：
>    * 早期的开发中，`MVC`模式主要用于服务端，而前端主要负责`View`视图。
>    * 随着`BackboneJs`、`EmberJs`等框架的出现，前端也逐渐兴起了`MVC`模式

### 1.1 MVC的简介

> * `MVC`：
>    * `M`：模型层 -- `Model`，
>        * 提供和保存业务数据。
>        * 个人理解：模型层的代码主要是一些关于对数据处理的代码。
>           * 例如：获取数据、对数据处理的一些代码、观察者模式的代码（下面的例子会讲到）  
>    * `V`：视图层 -- `View`。
>        * 展示数据以及提供用户界面。
>        * 个人理解：视图层的代码主要是一些展示页面的代码。
>            * 例如：大量的`DOM`操作、一小部分用来更新视图的代码（这里与控制器层有关）
>    * `C`：控制器层 -- `Controller`。
>        * 处理业务的应用逻辑。
>        * 个人理解：`控制器层（Controller）` 是 `视图层（View）` 和 `模型层（Model)`的桥梁  --- 控制器层可以调用数据层数据和视图层内的视图创建页面增添逻辑。
>            * 例：初始化模型层、视图层，通过控制层建立起视图层和模型层之间的联系


### 1.2 MVC模式整个过程的简单描述

> * 当用户与**视图**交互的时候，会触发一些用户的事件，这些事件会被**控制器**监听。
> * **控制器**会根据不同的用户事件调用**模块层**的一些相应的接口，通过这个接口的调用，修改**模块层**的数据，导致**模块层**数据的改变。
> * 而**视图**会根据**观察者模式**去观察模块的数据，当模块的数据进行改变的时候，则会通过**事件通知**的方式去通知**视图**。
> * 最后，视图根据新的数据来改变自己的状态，即：改变我们的用户界面

## 二、实例1：简单的增减价钱牌实例

### 2.1 代码展示

![relationship-map]({{ '/styles/images/javascript/designPattern/designPattern-04.png' | prepend: site.baseurl }})

> * html

```html
<div class="calculator">
    <div class="num">0元</div>
    <button type="button" class="js-add">+</button>
    <button type="button" class="js-sub">-</button>
</div>
```

> * css

```css
  .calculator {
            width: 300px;
        }
        .calculator .num {
            text-align: center;
            font-size: 80px;
            background: yellow;
        }
        .calculator button {
            width: 50%;
            font: bold 24px/38px '';
            float: left;
        }
```

> * js
   
> * `Model`

```js
class Model {
    constructor () {
        this.val = 0;
        this.views = [];
    }
    
    // 增加
    add (num) {
        if (this.val <= 100) {
           this.val += num; 
        }
    }
    
    // 减少
    sub (num) {
        if (this.val > 0) {
            this.val -= num;
        }
    }
    
    // 获取值
    getVal () {
        return this.val;
    }
    
    // 注册
    register (view) {
        this.views.push(view);
    }
    
    // 通知
    notify () {
        this.views.forEach((view) => {
            view.render(this);
        })
    }
}
```

> * View

```js
class View {
    constructor () {
        let doc = document;

        this.addBtn = doc.getElementsByClassName('js-add')[0];
        this.subBtn = doc.getElementsByClassName('js-sub')[0];
        this.num = doc.getElementsByClassName('num')[0];
    }
    
    // 事件绑定 
    addEvent (controller) {
        // 使用 bind 绑定this，经过修正后，this = controller，而不是按钮
        this.addBtn.onclick = this.controller.increase.bind(controller);
        this.subBtn.onclick = this.controller.descrease.bind(controller);
    }

    // 渲染
    render (model) {
        this.num.innerHTML = `${model.getVal()}元`;
    }
}
```


> * Controller

```js
class Controller {
    constructor () {
        this.view = null;
        this.model = null;
    }

    init () {
        // 初始化Model 和 view
        this.model = new Model();
        this.view = new View(this);

        // 事件绑定
        this.view.addEvent(this.model);
    
        // View观察注册Model，当Model更新就会去通知View
        this.model.register(this.view);
        this.model.notify();
    }

    increase () {
        // 此时 this 指代的是 controller
        this.model.add(1);
        this.model.notify();
    }

    descrease () {
        // 此时 this 指代的是 controller
        this.model.sub(1);
        this.model.notify();
    }
}
```

> * 调用代码

```js
var controller= new Controller();

controller.init();
```

### 2.2 遇到的问题

> * `this`的指向出了问题，代码如下：

```js
class View {
    constructor (controller) {
        //...
    }
    // 一开始addEvent是这样写的
    addEvent () {
        this.addBtn.onclick = this.controller.increase;
        this.subBtn.onclick = this.controller.descrease;
    }
}

class Controller {
    // ...
    init () {
        // ...
        this.view.addEvent(this.model);
        // ...
    }

    increase () {
        // 此时 this 指代的是按钮addBtn
        // this.model = undefined
        // 因此会报错
        this.model.add(1);
        this.model.notify();
    }
    // ...
}
```

> * 我忽略了一句很重要的话：**如果将类中定义方法提取出来单独使用，`this`会指向该方法运行时所在的环境。**
>    * 这就意味着 `Controller`类的`increase`拿到了`View`类的`addEvent`里使用，由于`increase`是绑定在按钮的`click`事件上，
>        即：`increase`是用在了`addBtn`这个对象上，因此，`increase`里的`this`的指向指代的是`addBtn`这个对象，所以，
>        `this.model = undefined`。
        
>  * 解决方法：
>    * `bind`：更改函数内`this`的指向，详情请看上面的代码。