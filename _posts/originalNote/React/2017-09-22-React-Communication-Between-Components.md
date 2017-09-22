---
layout: post
title: "React - 组件间通信"
data: 2017-09-22 16:27:00 +0800
categories: 原创
tag: React
---
* content
{:toc}


下面将要讲到的**搜索过滤**的例子需要同时用到两个组件：`Input`组件、`List`组件，此时就不是单一一个组件间的修改状态`this.state`那么简单了，

就需要实现不同组件之间的通信！！！

<!-- more -->

## 一、组件间通信

### 1.1 组件间通信方法

* 1.最原始的传递数据的方法：找一个共同都可以访问的变量（这里指全局变量），里面存储的就是要传递的数据。然而这种方法也太不安全了！！

* 2.全局事件 --- 观察者模式，如下图所示

![relationship-map]({{ '/styles/images/react/react-10.png' | prepend: site.baseurl }})

* 3.`React`里的通信方法：`Input`组件先通知父组件`App`，父组件`App`再通知子组件`List`：数据有变化！！
    * 简单理解：我们需要通过父组件来作为`搭线人`，获取孩子们想要互相交流的信息，并一一告知对应的孩子。


### 1.2 实例 -- 搜索过滤

* Item/index.jsx

```js
import React, {Component} from 'react';

import './style.css';

class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSelected: false
    }
  }

  clickHandler () {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }

  render () {
    const item = this.props.item, // 数据
          isSelected = this.state.isSelected, // 当前是否被选择的flag值
          selectedClass = isSelected ? ' item-selected' : ''; // 是否被选中后的类名
    return (
      <li
        className={'item' + selectedClass}
        onClick={this.clickHandler.bind(this)}
      >
        {item}
      </li>
    )
  }
}

export default Item;

```

* `this.state.isSelected`默认是`false`，即：用户还没有点击任何一项

* `clickHandler()`函数里利用`this.setState()`方法修改状态值。如果`clickHandler`函数里的代码修改如下，是完全不起作用的。我们只能使用`this.setState()`去修改状态.。

```js
clickHandler () {
   this.state.isSelected = !this.state.isSelected
}
```

* 当用户点击某一个`item`的时候，就会触发`clickHandler`函数，并自动对`this.state.isSelected`取反，且修改相应的`className`值。

> 补充：`this.state`只能在`constuctor`函数里才有用！！

### 1.3 props 和 state 的区别

* `this.props` 和 `this.state` 都用于描述组件的特性，但他们有以下区别：
    * `this.props`：表示那些一旦定义，就不再改变的特性。【不可变属性：只可读不可修改】
    * `this.state`：是会随着用户互动而产生变化的特性。【可变属性：可修改】