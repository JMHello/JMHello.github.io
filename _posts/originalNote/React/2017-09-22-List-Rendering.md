---
layout: post
title: "React - 列表渲染"
data: 2017-09-22 22:27:00 +0800
categories: 原创
tag: React
---
* content
{:toc}

<!-- more -->

## 一、列表渲染

### 1.1 文件目录

![relationship-map]({{ '/styles/images/react/react-05.png' | prepend: site.baseurl }})

### 1.2 新增组件List

* List/index.jsx 代码如下：

```js
import React, {Component} from 'react';

import Item from '../Item';

import fruits from '../fruits'; // 引入的数据来源

import './style.css';

class List extends Component {
  render () {
    return (
      <ul className="list">
        {
          fruits.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>
    )
  }
}

export default List;
```

* src/index.jsx 代码如下

```js
import React, {Component} from 'react';

import ReactDom from "react-dom";

import './style.css';

import Input from './Input';
import List from './List';  // 新引入的组件List


class App extends Component {
    render () {
        // 如何访问变量 -- 利用字符串模板
        // const hello = 'hello';
        // <h1>{hello}</h1>
        return (
            // 只能有一个容器，其他内容都放在这个容器里面
            <div className="app">
                <h1>Find my fruit</h1>
                <Input/>
                <List/>  // 新添加的组件List
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
);
```

* 效果图如下

![relationship-map]({{ '/styles/images/react/react-06.png' | prepend: site.baseurl }})

### 1.3 key属性

```js
fruits.map((item, index) => {
    return (
      <li key={index}>{item}</li> // 这里使用了key属性
    )
})
```

* 如果将`key`属性去掉，浏览器会报错，如下所示：

![relationship-map]({{ '/styles/images/react/react-07.png' | prepend: site.baseurl }})


> * `key`属性：是一个可选的唯一标识符。
> * 通过给组件设置唯一的`key`，确保渲染周期内保持一致，使`React`能够更智能的决定应该**重用一个组件**，还是**销毁并重新创建一个组件**，从而提升渲染的性能。
> * 例：当两个已经存在`DOM`中的组件交换位置时，可以不用重新渲染`DOM`而是移动。

* 我们也可以这样理解：
    * `render()`函数其实需要反复触发调用。
    * 由于`key`键的存在，当每次触发`render`的时候， `React`就会智能地利用`key`值高性能重用已存在的`DOM`，而不是随意地去创建新`DOM`。
    * 因此，如果没有`key`值，就会去重新创建DOM，大大降低了性能

> `tips`：**务必给你循环的数组的每一项都添加`key`值，尤其涉及到`DOM`的时候**


