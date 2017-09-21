---
layout: post
title: "React - 组件化"
data: 2017-09-21 22:27:00 +0800
categories: 学习笔记
tag: React
---
* content
{:toc}

<!-- more -->

## 一、 什么是组件化

以 **过滤搜索** 应用作为例子，请看下图

![relationship-map]({{ '/styles/images/react/react-03.png' | prepend: site.baseurl }})

> * 可以看到图中的小应用其实可以分成三个板块，也就是三个组件：
>   * 1.标题 （`title`）
>   * 2.输入框 （`input`）
>   * 3.数据列表 （`List`） 【这里面又增加多了一个`Item`组件，会在以后说明为什么要增加它】

* 简单理解：就是将应用里的一些功能模块拆分成一个个组件，便于复用。

## 二、 实例

### 2.1 文件结构

![relationship-map]({{ '/styles/images/react/react-04.png' | prepend: site.baseurl }})

> 由图上可发现：
> * 1.`src`文件夹里多了一个`Input`文件夹，其实这个就是`Input`组件。
> * 2.`Input`文件夹里并没有`.html`文件

### 2.2 Input/index.jsx

```js
import React, {Component} from "react";

import './style.css';

class Input extends Component {
    render () {
        return (
            <div className="input-container">
                <input/>
            </div>
        )
    }
}

export default Input;
```

### 2.3 src/index.jsx

* `src/index.jsx`文件里需要添加多这一行代码，才能引用`Input`组件

```js
import Input from './Input';

// ... 

class App extends Component {
    render () {
        return (
            <div className="app">
                <h1>Find my fruit</h1>
                <Input/> // 使用Input组件
            </div>
        );
    }

// ...
```

> 补充：其实使用组件既可以大写，也可以小写，即：`<input/>` 等价于 `<Input/>`