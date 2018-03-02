---
layout: post
title: "React - lifecycle"
data: 2017-09-22 17:27:00 +0800
categories: 学习笔记
tag: React
---
* content
{:toc}

> * 参考博文
>    * [http://blog.csdn.net/pcaxb/article/details/53887605](http://blog.csdn.net/pcaxb/article/details/53887605)
>    * 《深入REACT技术栈+陈屹著》

<!-- more -->

## 一、lifecycle - 生命周期

> * 生命周期泛指自然界和人类社会中各类客观事物的阶段性变化及规律。
> * 生命周期是单一方向不可逆的过程，但是软件开发的生命周期却会根据方法的不同，在完成前重新开始

> * `React` 组件的生命周期根据广义定义描述，可以分为挂载、渲染和卸载。
> * 当渲染后的组件需要更新时，我们会重新去渲染组件，直至卸载。
> * 因此，我们可以把 `React` 生命周期分成两类：
>   * 当组件在挂载或卸载时；
>   * 当组件接收新的数据时，即组件更新时

![relationship-map]({{ '/styles/images/react/react-12.png' | prepend: site.baseurl }})



## 二、挂载阶段

### 2.1 介绍

> * 组件的挂载是最基本的过程，这个过程主要做**组件状态的初始化**。

```js
import React, { Component, PropTypes } from 'react';
class App extends Component {
 static propTypes = {
 // ...
 };
 static defaultProps = {
 // ...
 };
 constructor(props) {
 super(props);
 this.state = {
 // ...
 };
 }
 componentWillMount() {
 // ...
 } 
  componentDidMount() {
  // ...
  }
  render() {
  return <div>This is a demo.</div>;
  }
 } 
```

> * 挂载顺序顺序如下
>   * `constructor ===》 componentWillMount ===》 render ===》 componentDidMount`

### 2.2 getDefaultProps()

>    * 设置默认的`props`，也可以用`defaultProps`设置组件的默认属性。

### 2.3 constructor()

> * `getInitialState()` ==》 `constructor`
>    * 在使用`es6`的`class`语法时是没有这个钩子函数的，可以**直接在`constructor`中定义`this.state`**。
>    * 此时可以访问`this.props`。

### 2.4 componentWillMount

> * `componentWillMount()`
>    * 在首次完成渲染之前调用,基本业务逻辑都应该放到这里。
>    * 整个生命周期只调用一次。
>    * 是在首次渲染之前修改`state`的最后一次机会。

### 2.5 render

> * `render()`
>    * `react`最重要的步骤，**创建虚拟`dom`**，使用`diff`算法，**更新`dom`树**。
>    * 只能通过`this.props`和`this.state`访问数据;
>    * 可以返回`null`、`false`或任何`React`组件。
>    * 只能出现一个顶级组件（不能返回数组）。
>    * 不能改变组件的状态。
>    * 不能修改DOM的输出。
    
### 2.6 componentDidMount
    
> * `componentDidMount()`
>    * 组件渲染之后调用，可以通过`this.getDOMNode()`获取和操作`dom`节点，只调用一次。
>    * 一般情况下**网络请求(`AJAX`)** 可以放到`DOM渲`染完成之后，即：放到这个方法中执行。

## 三、卸载阶段

```js
import React, { Component, PropTypes } from 'react';
class App extends Component {
 componentWillUnmount() {
 // ...
 }
 render() {
 return <div>This is a demo.</div>;
 }
} 
```

> * `componentWillUnmount()`
>    * 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

## 四、更新阶段

### 4.1 介绍

> * 更新过程是指：父组件向下传递 `props` 或者组件自身执行 `setState` 方法时发生的一系列更新的动作。

```js
import React, { Component, PropTypes } from 'react';
class App extends Component {
 componentWillReceiveProps(nextProps) {
 // this.setState({})
 }
 shouldComponentUpdate(nextProps, nextState) {
 // return true;
 }
 componentWillUpdate(nextProps, nextState) {
 // ...
 }
 componentDidUpdate(prevProps, prevState) {
 // ...
 }
 render() {
 return <div>This is a demo.</div>;
 }
} 
```

> * **组件自身的 `state` 更新**
>   * 依次执行：`shouldComponentUpdate` ===》 `componentWillUpdate` ===》 `render` ===》 `componentDidUpdate`


### 4.3 shouldComponentUpdate(props, state)

> * `shouldComponentUpdate` 是一个特别的方法：
>   * 它接收需要更新的 `props` 和 `state`，让开发者增加必要的条件判断，让其在需要时更新，不需要时不更新。
>        * 我们可以设置在此对比前后两个`props`和`state`是否相同，如果相同则返回`false`阻止更新。【默认情况，返回`true`，在`state`或者`props`改变的时候调用】
>        * 因为相同的属性状态一定会生成相同的`dom`树，这样就不需要创造新的`dom`树和旧的`dom`树进行`diff`算法对比，节省大量性能，尤其是在`dom`结构复杂的时候。
>   * 因此，当方法返回 `false` 的时候，组件不再向下执行生命周期方法。
>   * 该方法在初始化渲染的时候不会调用，在使用 `forceUpdate` 方法的时候也不会。


> * 默认情况下，`React` 会渲染所有的节点，因为 `shouldComponentUpdate` 默认返回 `true`。
> * 正确的组件渲染从另一个意义上说，也是性能优化的手段之一。


> * `shouldComponentUpdate` 的本质是 **用来进行正确的组件渲染**。

![lifecycle](/styles/images/react/lifecycle/lifecycle-01.png)

> * 如上图所示：当父节点 `props` 改变的时候，在理想情况下，只需渲染在一条链路上有相关 `props` 改变的节点即可。  



### 4.4 componentWillReceivePorps

> * `componentWillReceivePorps(nextProps)`
>    * `props`是从父组件传过来的,是动态的可以修改的。
>    * 组件初始化时不调用，组件接受新的`props`时调用。
>    * 这里修改的`state`也不会引起`render`的重复渲染。

### 4.5 componentWillUpdate

> * `componentWillUpdate(nextProps, nextState)`
>    * 组件初始化时不调用，只有在组件将要更新时才调用。
>    * 在接收到新的`props`或者是`state`的时以及在`render`之前调用。
>    * 在该方法中不再允许更新`props`和`state`，如果你需要更新`props`或者`state`,可以在`componentWillReceiveProps`中修改。

### 4.6 componentDidUpdate

> * `componentDidUpdate()`
>    * 组件初始化时不调用，组件更新完成后调用，即：完成渲染新的`props`或者`state`后调用。
>    * 此时可以获取`dom`节点。


## 五、总结

![relationship-map]({{ '/styles/images/react/react-13.png' | prepend: site.baseurl }})
