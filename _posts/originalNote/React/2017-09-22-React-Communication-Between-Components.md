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

* 3.`React`里的通信方法：`Input`组件先通知父组件`App`，父组件`App`再通知子组件`List`：数据有变化！！可看下图。
    * 简单理解：我们需要通过父组件来作为`搭线人`，获取孩子们想要互相交流的信息，并一一告知对应的孩子。
    * 这里主要用到了 **调用回调** 和 **参数变化** 来实现组件间通信

![relationship-map]({{ '/styles/images/react/react-11.png' | prepend: site.baseurl }})

### 1.2 实例 -- 搜索过滤

* 父组件：App/index.js

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.css';

import List from './list';
import Input from './input';
import fruits from './fruits';

class App extends Component {

	constructor() {
		super();
		this.state = {  // 新增：this.state
			keyword: ''
		}
	}

	onChange(value) { // 新增：onChange事件
		this.setState({
			keyword: value
		});
	}

	render() {
        const keyword = this.state.keyword;
		return (
			<div className="app">
				<h1>Find My Fruit</h1>
				<Input onChange={this.onChange.bind(this)} />  // 新添加事件this.onChange
				<List keyword={keyword}/> // 新添加属性keyword
			</div>
		)
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

* 子组件 Input/index.jsx

```js
import React, { Component } from 'react';

import './index.css';

class Input extends Component {

    handleKeyUp(event) {
        const value = event.target.value;
        this.props.onChange(value); // 新添加代码
    }

    render() {
        return (
            <div className="input-container">
                <input
                    onKeyUp={this.handleKeyUp.bind(this)}
                />
            </div>
        )
    }

}

export default Input;

```

* 子组件 List/index.js

```js
/**
 * Created by jm on 2017/9/22.
 */
import React, {Component} from 'react';

import Item from '../Item';

import fruits from '../fruits';

import './style.css';

class List extends Component {
  render () {
    const keyword = this.props.keyword,  // 新添加代码：输入框输入的值
          fruitShow = fruits.filter((item) => { // 过滤数组
            return item.includes(keyword);
          });

    return (
      <ul className="list">
        {
          fruitShow.map((item, index) => { // 不再使用fruits数组，代替的是过滤后的数组fruitShow
            return (
              <Item key={index} item={item}/>
            )
          })
        }
      </ul>
    )
  }
}

export default List;
```

> 补充：`App`组件中的`onChange`事件不想`js`中的`onchange`事件，在这个`<Input>`中是不会触发的，`onChange`只是代表一个属性，然后通过`this.props.onChange`传递给它的子组件`Input`，
> 由子组件`Input`中的输入框`input`触发。

## 二、总结

1. `React`的组件中的通信必须是基于**父组件**，子组件间是无法通信的。
2. 利用 `this.props` 和 `this.state`的辅助，就可以基于父组件的基础上完美实现组件间通信。