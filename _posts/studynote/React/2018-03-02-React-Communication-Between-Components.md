---
layout: post
title: "React - 组件间通信"
data: 2018-03-02 16:27:00 +0800
categories: 学习笔记
tag: React
---
* content
{:toc}

> * 参考资料
>   * 《深入REACT技术栈+陈屹著》

> * React 是以组合组件的形式组织的，组件因为彼此是相互独立的。
> * 从传递信息的内容上看，几乎所有类型的信息都可以实现传递，例如字符串、数组、对象、方法或自定义组件等。
> * 所以，在嵌套关系上，就会有 3 种不同的可能性：父组件向子组件通信、子组件向父组件通信和没有嵌套关系的组件之间通信。

> * 下面将要讲到的**搜索过滤**的例子需要同时用到两个组件：`Input`组件、`List`组件，此时就不是单一一个组件间的修改状态`this.state`那么简单了，


<!-- more -->

## 一、组件间通信

### 1.1 组件间通信方法

> * 1.最原始的传递数据的方法：找一个共同都可以访问的变量（这里指全局变量），里面存储的就是要传递的数据。然而这种方法也太不安全了！！

> * 2.全局事件 --- 观察者模式，如下图所示

![relationship-map]({{ '/styles/images/react/react-10.png' | prepend: site.baseurl }})

> * 3.`React`里的通信方法：`Input`组件先通知父组件`App`，父组件`App`再通知子组件`List`：数据有变化！！可看下图。
>     * 简单理解：我们需要通过父组件来作为`搭线人`，获取孩子们想要互相交流的信息，并一一告知对应的孩子。
>     * 这里主要用到了 **调用回调** 和 **参数变化** 来实现组件间通信

![relationship-map]({{ '/styles/images/react/react-11.png' | prepend: site.baseurl }})

### 1.2 实例 -- 搜索过滤

> * 数据的过滤应该由`List`组件自己执行
> * 数据过滤的依据应该是用户输入的内容
> * 因此，过滤数据的媒介应该是用户输入的内容

![commucation](/effects/images/react/communication/communication-01.gif)

> * 父组件：App/index.js

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Input from '../component/Input/index'
import List from '../component/List/index'

import './style.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  onChange (value) {
   this.setState({
     keyword: value
   })
  }

  render () {
    return (
      <div className="search-wrapper">
        <Input onChange={this.onChange.bind(this)}/>
        <List keyword={this.state.keyword}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
```

> * 子组件 Input/index.jsx

```js
import React, {Component} from 'react'
import './style.css'

class Input extends Component {
  constructor (props) {
    super(props)
  }
  handleKeyUp (e) {
    const value = e.target.value
    this.props.onChange(value)
  }
  render () {
    return (
      <input type="text" className="search-input" onKeyUp={this.handleKeyUp.bind(this)}/>
    )
  }
}

module.exports = Input
```

> * 子组件 List/index.js

```js
import React, {Component} from 'react'
import ListItem from '../ListItem/index'

import data from './../../data'

import './style.css'

class List extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const keyword = this.props.keyword
    const filterResult = data.filter((item) => {
      return item.includes(keyword)
    })
    return (
      <ul className="search-list">
        {
          filterResult.map((item, i) => {
            return <ListItem data={item} key={i}/>
          })
        }
      </ul>
    )
  }
}

module.exports = List
```

> * 补充：`App`组件中的`onChange`事件不像`js`中的`onchange`事件，在这个`<Input>`中是不会触发的，`onChange`只是代表一个属性，然后通过`this.props.onChange`传递给它的子组件`Input`，
> * 由子组件`Input`中的输入框`input`触发。

### 1.3 demo

> * [demo](/effects/demo/react/communication.zip)

## 二、总结

> * 1. `React`的组件中的通信必须是基于**父组件**，子组件间是无法通信的。
> * 2. 利用 `this.props` 和 `this.state`的辅助，就可以基于父组件的基础上完美实现组件间通信。