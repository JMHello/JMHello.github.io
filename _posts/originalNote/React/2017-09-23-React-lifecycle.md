---
layout: post
title: "React - lifecycle"
data: 2017-09-22 17:27:00 +0800
categories: 原创
tag: React
---
* content
{:toc}

* 参考博文
    * [http://blog.csdn.net/pcaxb/article/details/53887605](http://blog.csdn.net/pcaxb/article/details/53887605)

<!-- more -->

## 一、lifecycle - 生命周期

![relationship-map]({{ '/styles/images/react/react-12.png' | prepend: site.baseurl }})

---

![relationship-map]({{ '/styles/images/react/react-13.png' | prepend: site.baseurl }})

### 1.1 生命周期 - 组件初始化阶段

* `getDefaultProps()`
    * 设置默认的`props`，也可以用`defaultProps`设置组件的默认属性。

* `getInitialState()` ==》 `constructor`
    * 在使用`es6`的`class`语法时是没有这个钩子函数的，可以**直接在`constructor`中定义`this.state`**。
    * 此时可以访问`this.props`。

* `componentWillMount()`
    * 在首次完成渲染之前调用,基本业务逻辑都应该放到这里。
    * 整个生命周期只调用一次。
    * 是在首次渲染之前修改`state`的最后一次机会。

* `render()`
    * `react`最重要的步骤，**创建虚拟`dom`**，使用`diff`算法，**更新`dom`树**。
    * 只能通过`this.props`和`this.state`访问数据;
    * 可以返回`null`、`false`或任何`React`组件。
    * 只能出现一个顶级组件（不能返回数组）。
    * 不能改变组件的状态。
    * 不能修改DOM的输出。
    
* `componentDidMount()`
    * 组件渲染之后调用，可以通过`this.getDOMNode()`获取和操作`dom`节点，只调用一次。
    * 一般情况下**网络请求(`AJAX`)** 可以放到`DOM渲`染完成之后，即：放到这个方法中执行。

### 1.2 生命周期 - 组件初始化阶段

* `componentWillReceivePorps(nextProps)`
    * `props`是从父组件传过来的,是动态的可以修改的。
    * 组件初始化时不调用，组件接受新的`props`时调用。
    * 这里修改的`state`也不会引起`render`的重复渲染。

* `shouldComponentUpdate(nextProps, nextState)`
    * `react`性能优化非常重要的一环 --- **组件是否需要渲染新的`props`或`state`**
    * 组件接受新的`state`或者`props`时调用。    
        * 我们可以设置在此对比前后两个`props`和`state`是否相同，如果相同则返回`false`阻止更新。【默认情况，返回`true`，在`state`或者`props`改变的时候调用】
        * 因为相同的属性状态一定会生成相同的`dom`树，这样就不需要创造新的`dom`树和旧的`dom`树进行`diff`算法对比，节省大量性能，尤其是在`dom`结构复杂的时候。
    * 该方法在初始化渲染的时候不会调用，在使用 `forceUpdate` 方法的时候也不会。

* `componentWillUpdata(nextProps, nextState)`
    * 组件初始化时不调用，只有在组件将要更新时才调用。
    * 在接收到新的`props`或者是`state`的时以及在`render`之前调用。
    * 在该方法中不再允许更新`props`和`state`，如果你需要更新`props`或者`state`,可以在`componentWillReceiveProps`中修改。

* `render()`
    * 请看上文

* `componentDidUpdate()`
    * 组件初始化时不调用，组件更新完成后调用，即：完成渲染新的`props`或者`state`后调用。
    * 此时可以获取`dom`节点。

### 1.3 生命周期 - 组件卸载

* `componentWillUnmount()`
    * 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

* 

* `constructor`: 初始化
* `componentWillMount`：插入前
* `render` :  插入到DOM中
* `componentDidMount`：插入DOM后
* `componentWillUpdate`：组件更新前
* `componentDidUpdate`：组件更新后
* `componentWillUnmount`：从DOM移除

> 补充一下：只要将适当的行为分别添加到以上这些方法中，`React`就会自动识别，找准最适当的时机去执行这些代码！！！


