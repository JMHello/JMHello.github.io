---
layout: post
title: "React - state"
data: 2017-09-22 15:27:00 +0800
categories: 原创
tag: React
---
* content
{:toc}

<!-- more -->

## 一、state

### 1.1 state简介

> * `React` 将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 `UI`。
> * `getInitialState`：`getInitialState` 方法用于定义初始状态，即：为一个对象，这个对象可以通过 `this.state` 属性读取。
> * `this.setState`：当用户点击组件，导致状态变化，`this.setState` 方法就修改状态值，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。

### 1.2 实例 - 是否点击item的状态改变

* 效果图：未点击item前

![relationship-map]({{ '/styles/images/react/react-08.png' | prepend: site.baseurl }})

* 效果图：点击item

![relationship-map]({{ '/styles/images/react/react-09.png' | prepend: site.baseurl }})

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