---
layout: post
title: "React - 事件系统"
data: 2018-03-01 9:27:00 +0800
categories: 学习笔记
tag: React
---
* content
{:toc}

> * 参考资料
>   * 《深入REACT技术栈+陈屹著》

<!-- more -->

## 一、 事件系统介绍

> * `Virtual DOM` 在内存中是以对象的形式存在的，如果想要在这些对象上添加事件，就会非常简单。
> * `React` 基于 `Virtual DOM` 实现了一个 `SyntheticEvent` （合成事件）层，我们所定义的事件处理器会接收到一个 `SyntheticEvent` 对象的实例，它完全符合 `W3C` 标准，不会存在任何 `IE` 标准的兼容性问题。
> * 并且与原生的浏览器事件一样拥有同样的接口，同样支持事件的冒泡机制，我们可以使用 `stopPropagation()` 和 `preventDefault()` 来中断它。
> * 所有事件都自动绑定到最外层上。
> * 如果需要访问原生事件对象，可以使用 `nativeEvent` 属性。

## 二、合成事件的绑定方式

> * `React` 事件的绑定方式在写法上与原生的 `HTML` 事件监听器属性很相似，并且含义和触发的场景也全都是一致的。

```html
<!-- HTML -->
<button onclick="handleClick()">Test</button> 

<!-- JSX -->
<button onClick={this.handleClick}>Test</button> 
```

> * 两者区别：
>   * 事件属性名书写方式不一样：`JSX`是驼峰式，`HTML`事件则是全部小写
>   * 属性值格式不一样：`HTML`的属性值只能是 `JavaScript` 代码字符串，`JSX`中的 `props`的值可以是任意类型

> * React 并不会像 DOM0 级事件那样将事件处理器直接绑定到 HTML 元素之上。


## 三、合成事件的实现机制

> * 在 `React` 底层，主要对合成事件做了两件事：**事件委派**和**自动绑定**。

### 3.1 事件委派

> * `React` 并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，
>   这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

> * 当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器
    处理，然后在映射里找到真正的事件处理函数并调用。
> * 这样做简化了事件处理和回收机制，效率也有很大提升。

### 3.2 自动绑定 - this的绑定

> * 在 `React` 组件中，每个方法的上下文都会指向该组件的实例，即自动绑定 `this` 为当前组件。

![event](/styles/images/react/event/event-01.png)

> * 而且 `React` 还会对这种引用进行缓存，以达到 `CPU` 和内存的最优化。
> * 在使用 `ES6 classes` 或者纯函数时，这种自动绑定就不复存在了，我们需要手动实现 `this` 的绑定。

---

> * **方法一：bind()**
>   * 绑定事件处理器内的 `this` ，并可以向事件处理器中传递参数
> * [demo](/effects/demo/react/event/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>bind()</title>
    <script src="./util/react-min.js"></script>
    <script src="./util/react-dom.min.js"></script>
    <script src="./util/babel.min.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
    class App extends React.Component {
        handleClick (color, e) {
          console.log(e)
          console.log(`这是我最喜欢的颜色：${color}`)
        }
        render () {
          console.log('this：')
          console.log(this)
          return <button type="button" onClick={this.handleClick.bind(this, 'blue')}>点击</button>
        }
    }

    ReactDOM.render(
      <App/>,
      document.getElementById('root')
    )
</body>
</html>
```

> * 如果是通过 `bind` 去传递参数，那么 `event` 对象一定是作为最后的参数！

> * 如果方法只绑定，不传参，那 `stage 0` 草案中提供了一个便捷的方案①——双冒号语法，其作
    用与 `this.handleClick.bind(this)` 一致，并且 `Babel` 已经实现了该提案。

```js
  class App extends React.Component {
        handleClick (e) {
          console.log(e)
        }
        render () {
          return <button type="button" onClick={::this.handleClick}>点击</button>
        }
    }

    ReactDOM.render(
      <App/>,
      document.getElementById('root')
    )
```

> * 不过我还没测试出来，如下图：

![event](/styles/images/react/event/event-02.png)

> * **方法二：构造器内声明**
> * [demo](/effects/demo/react/event/v3.html)

```js
  class App extends React.Component {
        constructor (props) {
          super(props)
          // 构造器内声明
          this.handleClick = this.handleClick.bind(this)
        }
        handleClick (e) {
          console.log(e)
        }
        render () {
          return <button type="button" onClick={this.handleClick}>点击</button>
        }
    }
```

> * **方法三：箭头函数**
>   * 箭头函数不仅是函数的“语法糖”，它还自动绑定了定义此函数作用域的 `this`，
      因此我们不需要再对它使用 `bind` 方法
> * 写法一：[demo1](/effects/demo/react/event/v4.html)

```js
class App extends React.Component {
    handleClick = (e) => {
      console.log(e)
    }
    render () {
      return <button type="button" onClick={this.handleClick}>点击</button>
    }
  }
```

> * 写法二：[demo2](/effects/demo/react/event/v5.html)

```js
 class App extends React.Component {
    handleClick (e){
      console.log(e)
    }
    render () {
      // 以下写法错误，一定要传递参数e，才可以获取到事件对象
      // return <button type="button" onClick={() => this.handleClick()}>点击</button>
      return <button type="button" onClick={(e) => this.handleClick(e)}>点击</button>
    }
  }
```

## 四、在 React 中使用原生事件

> * `React` 提供了很好用的合成事件系统，但这并不意味着在 `React` 架构下无法使用原生事件。
> * `React` 提供了完备的生命周期方法，其中 `componentDidMount` 会在组件已经完成安装并且在浏览器
中存在真实的 DOM 后调用，此时我们就可以完成原生事件的绑定。

> * 写法二：[demo](/effects/demo/react/event/v6.html)

```js
 class NativeEventDemo extends React.Component {
    componentDidMount() {
      /* refs：写法一 */
      this.refs.button.addEventListener('click', e => {
        console.log('refs：写法一')
        this.handleClick(e);
      });

      /* refs：写法二 */
      this.btn.addEventListener('click', e => {
        console.log('refs：写法二')
        this.handleClick(e);
      });
    }
    handleClick(e) {
      console.log(e);
    }
    componentWillUnmount() {
      this.refs.button.removeEventListener('click');
      this.btn.removeEventListener('click');
    }
    render() {
      return (
              <div>
                  <p> refs：写法一 </p>
                  <button ref="button">Test1</button>
                  <p> refs：写法二 </p>
                  <button ref={(btn) => this.btn = btn}>Test2</button>
              </div>
      )
    }
  }
```

> * 值得注意的是，在 `React` 中使用 `DOM` 原生事件时，**一定要在组件卸载时手动移除**，否则很
    可能出现内存泄漏的问题。而使用合成事件系统时则不需要，因为 React 内部已经帮你妥善地处
    理了。

## 五、合成事件与原生事件混用

> * 既然 `React` 合成事件系统有这么多的好处，那是不是 `React` 中就不需要原生事件了呢？
> * 当然不是，因为还有很多应用场景只能借助原生事件的帮助才能完成。
> * 比如，在 Web 页面中添加一个使用移动设备扫描二维码的功能，在点击按钮时显示二维码，点击非二维码区域时将其隐藏起来。

> * [demo](/effects/demo/react/event/v7.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> 合成事件与原生事件混用</title>
    <script src="./util/react-min.js"></script>
    <script src="./util/react-dom.min.js"></script>
    <script src="./util/babel.min.js"></script>
    <style type="text/css">
        .qr-wrapper {
            width: 200px;
        }
        .code-wrapper {
            position: relative;
            padding-top: 56.25%;
        }
        .code-wrapper .code-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            vertical-align: middle;
        }
    </style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
  class QrCode extends React.Component {
    constructor (props) {
      super(props)
      // 初始化状态
      this.state = {
        active: false
      }
    }
    componentDidMount () {
      document.body.addEventListener('click', (e) => {
        this.setState({
          active: false
        })
      }, false)
    }
    componentWillUnmount () {
      document.body.removeEventListener('click')
    }

    handleClick (e) {
      this.setState({
        active: !this.state.active
      })

      // 阻止冒泡无效
      e.stopPropagation()
    }
    handleQr (e) {
      // 阻止冒泡无效
      e.stopPropagation()
    }

    render () {
      const style = {
        display: this.state.active ? 'block': 'none'
      }
      return (
              <div className="qr-wrapper">
                  <button type="button" className="js-qr" onClick={this.handleClick.bind(this)}>二维码</button>
                  <div className="code-wrapper" style={style} onClick={this.handleQr.bind(this)}>
                      <img src="QQ.jpg" alt="二维码" className="code-img"/>
                  </div>
              </div>
      )
    }
  }

  ReactDOM.render(
          <QrCode/>,
    document.getElementById('root')
  )
</script>
</body>
</html>
```

> * 上述代码的逻辑很简单，点击按钮可以切换二维码的显示与隐藏，而在按钮之外的区域同样可以达到隐藏的效果。
> * 然而，我们无法在组件中将事件绑定到 `body` 上，因为 `body`     在组件范围之外，只能使用原生绑定事件来实现。

> * 逻辑似乎很简单，但 `React` 所表现的似乎与你所想的并不一致，实际效果是在你点击二维码区域时二维码依然会隐藏起来。
> * 原因也很简单，**就是 `React` 合成事件系统的委托机制，在合成事件内部仅仅对最外层的容器进行了绑定，并且依赖事件的冒泡机制完成了委派**。
> * 也就是说，**事件并没有直接绑定到 `div.js-qr` 元素上，所以在这里使用 `e.stopPropagation()` 并没有用**。

> * 当然，解决方法也很简单。

> * 方法一：不要将合成事件与原生事件混用  
> * [demo](/effects/demo/react/event/v8.html)

```js
  componentDidMount () {
      document.body.addEventListener('click', (e) => {
        this.setState({
          active: false
        })
      }, false)

      document.querySelector('.code-wrapper').addEventListener('click', (e) => {
        // 阻止冒泡
        e.stopPropagation()
      }, false)

      document.querySelector('.js-qr').addEventListener('click', (e) => {
        this.setState({
          active: !this.state.active
        })
        // 阻止冒泡
        e.stopPropagation()
      }, false)
    }
```

> * 方法二：通过 `e.target` 判断来避免
> * [demo](/effects/demo/react/event/v9.html)

```js
componentDidMount () {
  document.body.addEventListener('click', (e) => {
    const cName= e.target.classList
    if (cName.contains('code-img') || cName.contains('js-qr')) {
      return
    }
    
    this.setState({
      active: false
    })
  }, false)
}
```

---

> * 尽量避免在 `React` 中混用合成事件和原生 `DOM` 事件。
> * 另外，用 `reactEvent.nativeEvent.stopPropagation()` 来阻止冒泡是不行的。
> * 阻止 `React` 事件冒泡的行为只能用于 `React` 合成事件系统中，且没办法阻止原生事件的冒泡。
> * 反之，在原生事件中的阻止冒泡行为，却可以阻止 `React` 合成事件的传播。

> * 实际上，`React` 的合成事件系统只是原生 DOM 事件系统的一个子集。
> * 它仅仅实现了 `DOM Level 3` 的事件接口，并且统一了浏览器间的兼容问题。
> * 有些事件 `React` 并没有实现，或者受某些限制没办法去实现，比如 `window` 的 `resize` 事件。
> * 对于无法使用 `React` 合成事件的场景，我们还需要使用原生事件来完成。

## 六、对比 React 合成事件与 JavaScript 原生事件

### 6.1 事件传播与阻止事件传播

> * `React` 的合成事件则并没有实现事件捕获，仅仅支持了事件冒泡机制。
> * 这种 `API` 设计方式统一而简洁，符合“二八原则”。
> * 阻止原生事件传播需要使用 `e.preventDefault()`
> * 不过对于不支持该方法的浏览器（`IE9` 以下），只能使用 `e.cancelBubble = true` 来阻止。
> * 而在 `React` 合成事件中，只需要使用 `e.preventDefault()`即可。

### 6.2 事件类型

> * React 合成事件的事件类型是 JavaScript 原生事件类型的一个子集。

### 6.3 事件绑定方式

> * 受到 DOM 标准的影响，绑定浏览器原生事件的方式也有很多种，具体如下所示

> * 直接在 DOM 元素中绑定：

```html
<button onclick="alert(1);">Test</button>
```

> * 在 JavaScript 中，通过为元素的事件属性赋值的方式实现绑定：

```js
el.onclick = e => { console.log(e); }
```

> * 通过事件监听函数来实现绑定：

```js
el.addEventListener('click', () => {}, false);
el.attachEvent('onclick', () => {});
```

---

> * 相比而言，React 合成事件的绑定方式则简单得多：

```html
<button onClick={this.handleClick}>Test</button> 
```

### 6.4 事件对象

> * 原生 DOM 事件对象在 W3C 标准和 IE 标准下存在着差异。在低版本的 IE 浏览器中，只能使用 window.event 来获取事件对象。
> * 而在 React 合成事件系统中，不存在这种兼容性问题，在事件处理函数中可以得到一个合成事件对象。

