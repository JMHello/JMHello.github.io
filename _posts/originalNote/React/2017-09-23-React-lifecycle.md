---
layout: post
title: "React - lifecycle"
data: 2017-09-22 17:27:00 +0800
categories: 原创
tag: React
---
* content
{:toc}

<!-- more -->

## 一、lifecycle - 生命周期

* 回顾之前上篇文章[React - ref]({{ '/2017/09/23/React-ref' | prepend: site.baseurl }})，我们成功获取了`DOM`元素。
* 在成功获取`DOM`元素后，我们是否要考虑一个问题：如果这个`DOM`都还没生成，我们调用`this.input.focus()`是否就无法执行不。
* 这时候就要插入一个名词：**生命周期**。
    * 世上每一件事物都有它的声明周期，如：婴儿 =》 小孩 =》 青年 =》 壮年 =》 老年
* 而`React`也有属于它的生命周期：
    * `constructor`: 初始化
    * `componentWillMount`：插入前
    * `render` :  插入到DOM中
    * `componentDidMount`：插入DOM后
    * `componentWillUpdate`：组件更新前
    * `componentDidUpdate`：组件更新后
    * `componentWillUnmount`：从DOM移除

> 补充一下：只要将适当的行为分别添加到以上这些方法中，`React`就会自动识别，找准最适当的时机去执行这些代码！！！

## 二、实例：页面打开自动聚焦

* Input/index.js

```js
import React, {Component} from "react";

import './style.css';

class Input extends Component {

  handleEvent (event) {
    const value = event.target.value;

    this.props.onChange && this.props.onChange(value); // 通过this.props调用onChange函数
    console.log(`value：${value}`);
    console.log(`this：${this}`);
  }

  componentDidMount () { // `componentDidMount`：插入DOM后
      this.input.focus();
  }

  render () {

    return (
      <div className="input-container">
        {/*<input onKeyUp={this.handleEvent}/>*/}
          <input
            onKeyUp={this.handleEvent.bind(this)}
            ref={(input) => {this.input = input; }}
          />
        {/*<input onKeyUp={(e) => {this.handleEvent(e)}}/>*/}
      </div>
    )
  }
}

export default Input;
```