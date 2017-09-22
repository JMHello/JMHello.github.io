---
layout: post
title: "React - props"
data: 2017-09-22 14:27:00 +0800
categories: 原创
tag: React
---
* content
{:toc}

<!-- more -->

## 一、props

### 1.1 代码展示

* Item/index.js
    * 特别之处：使用了`props`

```js
import React, {Component} from 'react';

import React, {Component} from 'react';

import './style.css';

class Item extends Component {
  render () {
    return (
      <li>{this.props.item}</li>
    )
  }
}

export default Item;
```

* List/index.js
    * 修改的地方：新增了`Item`组件

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
    return (
      <ul className="list">
        {
          fruits.map((item, index) => {
            return (
              <Item key={index} item={item}/> // 这里不再是  <li key={index}>{item}</li>
            )
          })
        }
      </ul>
    )
  }
}

export default List;
```

### 1.2 数据传递的窍门 - props（重点）

![relationship-map]({{ '/styles/images/react/react-03.png' | prepend: site.baseurl }})

> * 从上面这一张图片我们可以清楚知道：`Item`组件是`List`组件的子组件，即：`List`是`Item`的父亲。
> * 现在我们需要将数据由父亲`List`传送到孩子`Item`，这中间的桥梁就是`props`。接下来开始分析：

* List/index.js
    * 以下截取的部分代码，可以看到`Item`组件上有一个`item`属性，其值就是数据

```js
  fruits.map((item, index) => {
    return (
      <Item key={index} item={item}/>
    )
  })
```

* Item/index.js
    *  以下截取的部分代码，可以看到`this.props.item`，这里保存的就是由父组件`List`传输过来的数据，作为子组件，`Item`只需要通过`this.props.xxx`直接引用就可以了
       这样就可以达到父子之间的数据传递了。

```js
 return (
      <li>{this.props.item}</li>
 )
```

> `tips`：只能是父组件向子组件传递数据哟！！！
> `props`只能读取不能修改！！！！