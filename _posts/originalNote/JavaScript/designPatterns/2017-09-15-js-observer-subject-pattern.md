---
layout: post
title: "javasript - 设计模式 - 观察者模式"
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

![relationship-map]({{ '/styles/images/javascript/designPattern/designPattern-02.png' | prepend: site.baseurl }})

* 我们可以把主播当作发布者（`Subject`），当到了开始广播的时间之后，就会广播信息给听众：“我要开播了，快来呀！”
* 我们可以把听众当作观察者，也称为订阅者（`Observer`），主要是关注自己喜欢的广播人员，看他们什么时候开始广播。

## 二、发布-订阅模式的作用

* 发布—订阅模式可以广泛应用于**异步编程**中，这是一种**替代传递回调函数**的方案。
    * 例：
        * 我们可以订阅 `ajax` 请求的 `error`、`succ` 等事件。
        * 如果想在动画的每一帧完成之后做一些事情，那我们可以订阅一个事件，然后在动画的每一帧完成之后发布这个事件。
    * 在异步编程中使用发布—订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。

* 发布—订阅模式可以**取代对象之间硬编码的通知机制**，一个对象不用再显式地调用另外一个对象的某个接口。
    * 发布—订阅模式让两个对象**松耦合**地联系在一起，虽然不太清楚彼此的细节，但这不影响它们之间相互通信。
        * 当有新的订阅者出现时，发布者的代码不需要任何修改；同样发布者需要改变时，也不会影响到之前的订阅者。
        * 只要之前约定的事件名没有变化，就可以自由地改变它们。

## 三、DOM事件

* 只要曾经在 DOM 节点上面绑定过事件函数，那我们就曾经使用过发布—订阅模式。

```js
document.body.addEventListener('click', function() {
  //...
},false);

document.body.click(); // 模拟用户点击
```

* 需要监控用户点击 `document.body` 的动作，但是我们没办法预知用户将在什么时候点击。
    * 所以我们**订阅** `document.body` 上的 `click` 事件，当 `body` 节点被点击时，**`body` 节点便会向订阅者发布这个消息**。

## 四、发布-订阅模式通用实现

```js
var Event = function() {
    this.clientList = {};
};

Event.prototype = {
    constructor: Event,
    // 订阅消息
    subscribe: function(key, fn) {
        // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        if(!this.clientList[key]) {
            this.clientList[key] = [];
        }
        
        // 将订阅的消息添加到缓存列表里
        this.clientList[key].push(fn);
    },
    // 发布消息
    publish: function() {
        var key = Array.prototype.shift.call(arguments), // 取出消息类型
            fns = this.clientList[key], // 取出该消息对应的回调函数集合
            len = fn.length ;   
        
        // 如果没有订阅该消息，则返回
        if (!fns || len === 0 ) {
            return false;
        }
        
        //执行缓存列表中的函数
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    // 删除消息
    remove: function(key, fn) {
        var fns = this.clientList[key],
            len;
        
        // 如果 key 对应的消息没有被人订阅，则直接返回
        if (!fns) {
           return false; 
        }
        
        //  如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
        if (!fn) {
            len = fns.length;
            fns && (len = 0); 
        } else {
            // 反向遍历订阅的回调函数列表
            for (var l = fns.length; i > 0; i--) {
                var _fn = fns[l];
                if (_fn == fn) {
                    fns.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    }
}

```

## 五、发布-订阅模式的实例

### 5.1 简单实例 -- 自定义事件

```js
// 第一个监听观察 topic1
Event.subscribe('someTopic', function () {
   console.log('someTopic1');
});

// 第二个监听观察 topic1
Event.subscribe('someTopic', function () {
   console.log('someTopic2');
});

// 第一个监听观察 topic2
Event.subscribe('otherTopic', function () {
    console.log('otherTopic');
});

Event.publish('someTopic'); // 输出 'someTopic1' 和 'someTopic2'
Event.publish('otherTopic'); // 输出 'otherTopic'
```

### 5.2 复杂实例 -- 分页插件

```js

var Pagination=function (outer,data) {
        this.outer=outer;
        this.pageList=data.pageList||[10,20,30];//每页显示的数据
        this.pageSize=data.pageSize||0;//一页显示的数据——请求时的字段
        this.pageCount=data.pageCount||1;//页面总数
        this.beginPageIndex=data.beginPageIndex||1;//首页
        this.currentPage=data.currentPage||1;//当前页
        this.endPageIndex=data.endPageIndex||1;//尾页
        this.recordCount=data.recordCount||0;//数据总数
        this.recordList=data.recordList||[];//数据
        this.beginPageBtn=null;//首页按钮
        this.endPageBtn=null;//尾页按钮
        this.lastIndexBtn=null;//上一页按钮
        this.nextIndexPage=null;//下一页按钮
        this.currentPageNum=null;//当前页
        this.totalRecords=null;//总数
        this.pageSizeChoice=null;//每页显示数据的选择
        this.pageCurrentChoiceBtn=null;//选择当前页的按钮
        this.pageSizeBtn=null;//选择每页展示数据数的按钮
        
        this.cE=new JM.component.CustormEvent();//订阅-分布模式的对象
};

//获取input里的值
var getIndex = function (eles,input,callback) {
    for (var i=0,len=eles.length;i<len;i++) {
        eles[i].onclick = function () {
            input.value = this.innerHTML;
            callback && callback.call(this, input.value);
        }
    }
};

var fn = Pagination.prototype;

//创建分页插件的基本架构
fn.createStructure = function () {
    // 获取元素省略
};

//创建当前页的下拉框的架构
fn.createCurrentPageList = function () {
   // ...
};

//创建每页展示数据数的下拉框的架构
fn.createPageList=function () {
   // ...
};

//获取当前页
fn.getCurrentPage=function () {
    var _self=this;
    this.createCurrentPageList();
    JM.addHandler(this.pageCurrentChoiceBtn,'click',function (e) {
        // 代码省略
        getIndex(sm,this,function (pN) {
            // 代码省略
           
            _self.cE.publish('updateMsg');// 发布消息
        });
    },false);
};

//获取每页显示数据数
fn.getPageList=function () {
    var _self=this;
    this.createPageList();
    JM.addHandler(this.pageSizeBtn,'click',function (e) {
        // 代码省略
        getIndex(sm,this,function (size) {
            // 代码省略
            
            _self.cE.publish('updateMsg'); // 发布消息
        });
    },false);
};

//获取上一页的数据
fn.getPrev=function () {
    var _self=this;
    JM.addHandler(this.lastIndexBtn,'click',function (e) {
        // 代码省略
        
        _self.cE.publish('updateMsg');// 发布消息
    },false);
};

//获取下一页的数据
fn.getNext=function () {
    var _self=this;
    JM.addHandler(this.nextIndexPage,'click',function (e) {
        // 代码省略
        
        _self.cE.publish('updateMsg'); // 发布消息
    },false);
};

//获取首页的数据
fn.getFirst=function () {
    var _self=this;
    JM.addHandler(this.beginPageBtn,'click',function (e) {
        // 代码省略
        
        _self.cE.publish('updateMsg');//发布消息
    },false);
};

//获取尾页数据
fn.getEnd=function () {
    var _self=this;
    
    JM.addHandler(this.endPageBtn,'click',function (e) {
        // 代码省略
        
        _self.cE.publish('updateMsg');//发布消息
    },false);
};

//计算数据
fn.change=function () {
    var _len=this.recordCount;
    if(_len){
        this.endPageIndex=Math.ceil(_len/this.pageSize);
    }else this.endPageIndex=1;
    this.getCurrentPage();
};

//更新数据——也是对外获取数据的接口
fn.updateMsg=function (fn) {
   var self=this;
   var msg=(function () {
       var _self=self;
       return function () {
           fn.call(_self,function (result) {
               console.log(result,result.pageCount,result.recordCount);
               _self.pageList=result.pageList|| _self.pageList;
               _self.pageSize=result.pageSize|| _self.pageSize;
               _self.pageCount=result.pageCount|| _self.pageCount;
               _self.beginPageIndex=result.beginPageIndex|| _self.beginPageIndex;
               _self.currentPage=result.currentPage|| _self.currentPage;
               _self.endPageIndex=result.endPageIndex|| _self.endPageIndex;
               _self.recordCount=result.recordCount|| _self.recordCount;
               _self.recordList=result.resultList|| _self.recordList;
               _self.totalRecords.innerHTML=_self.recordCount;
               _self.change();
           },{
               'currentPage':parseInt(_self.pageCurrentChoiceBtn.value),
               'pageSize':parseInt(_self.pageSizeBtn.value)
           });
       };
   })();
   
   this.cE.subscribe('updateMsg',msg); // 订阅消息
};

//分页插件初始化
fn.init=function () {
   this.createStructure();
   this.getCurrentPage();
   this.getPageList();
   this.getPrev();
   this.getNext();
   this.getFirst();
   this.getEnd();
   
   this.cE.publish('updateMsg'); //发布消息
};
```
