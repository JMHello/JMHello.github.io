---
layout: post
title: "javasript - 设计模式 - 装饰器模式"
data: 2017-09-14 12:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    
* 以下内容部分都摘自书本：《JavaScript设计模式与开发实践》 第十五章 装饰者模式

<!-- more -->

## 一、什么是装饰者模式


### 1.1 继承的的缺点

> * 给对象添加功能常常使用继承的方式，但是继承的方式并不灵活，还会带来许多问题：
>     1. 导致超类和子类之间存在**强耦合性**，当超类改变时，子类也会随之改变。
>     2. 继承这种功能复用方式通常被称为“白箱复用”，“白箱”是相对可见性而言的，
>     在继承方式中，超类的内部细节是对子类可见的，继承常常被认为**破坏了封装性**。
>     3. 在完成一些功能复用的同时，有可能创建出大量的子类，**使子类的数量呈爆炸性增长**。

### 1.2 装饰者模式

> * 装饰者模式（`Decorator Pattern`）：可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
>     * 简单地理解：装饰者模式要比继承灵活得多，想添加什么新功能就添加，同时又不会影响对象自身。

## 二、装饰者模式的实例

### 2.1 模拟传统面向对象语言的装饰者模式

> * [demo](/effects/demo/js/designPattern/decorator/v1.html)

```js
    // 原始飞机
    const Plane = function () {}
    Plane.prototype.fire = function () {
      console.log('发射普通子弹')
    }

    // 增加装饰类：导弹
    const MissleDecorator = function (plane) {
      this.plane = plane
    }
    MissleDecorator.prototype.fire = function () {
      console.log('发射导弹')
    }

    // 增加装饰类：原子弹
    const AtomDecorator = function (plane) {
      this.plane = plane
    }
    AtomDecorator.prototype.fire = function () {
      console.log('发射原子弹')
    }

    // 测试
    const plane = new Plane()
    plane.fire()

    const planeWithMissle = new MissleDecorator(plane)
    planeWithMissle.fire()

    const planeWithAtom = new AtomDecorator(plane)
    planeWithAtom.fire()
```

> * 新增的装饰类：导弹和原子弹都接收参数`plane`对象，并调用了`plane.fire()`，而且没有改动“飞机”这个对象原有的任何方面。
>     * 这就体现了装饰者模式的实际功能：对对象动态增加功能，却没有改变对象本身。

### 2.2 回到 JavaScript 的装饰者

> * JavaScript 语言动态改变对象相当容易，我们可以直接改写对象或者对象的某个方法，并不需要使用“类”来实现装饰者模式。
> * [demo](/effects/demo/js/designPattern/decorator/v2.html)
  
```js
    const plane = {
      fire: function () {
        console.log('发射普通子弹')
      }
    }

    const missleDeractor = function () {
      console.log('发射导弹')
    }

    const atomDeractor = function () {
      console.log('发射原子弹')
    }

    const fire1 = plane.fire
    plane.fire = function () {
      fire1()
      missleDeractor()
    }

    const fire2 = plane.fire
    plane.fire = function () {
      fire2()
      atomDeractor()
    }

    plane.fire()
// 分别输出： 发射普通子弹、发射导弹、发射原子弹
```

## 三、装饰函数

```js
window.onload = function(){
 alert (1);
}

var _onload = window.onload || function(){};

window.onload = function(){
    _onload();
    alert (2);
} 
```

> * 以上代码存在的问题：
>     1. 必须维护`_onload` 这个中间变量，虽然看起来并不起眼，但如果函数的装饰链较长，或者
>        需要装饰的函数变多，这些中间变量的数量也会越来越多。
>     2. `this`的指向问题 

> * 下面再看看这个例子：

```js
var _getElementById = document.getElementById;

document.getElementById = function( id ){
    alert (1);
    
    return _getElementById( id ); //  Uncaught TypeError: Illegal invocation 
    
    // 正确的写法
    // return  _getElementById.apply(document, arguments);
}

var button = document.getElementById( 'button' ); 
```

> * 很明显，由于`_getElementById`是全局函数，当调用它的时候，`this`指向的是`window`，但我们期望的是`this`指向的是`document`。

## 四、AOP

> * `AOP`：面向切面编程，主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，再通过“动态织入”的方式掺入业务逻辑模块中。
>     * 与业务逻辑无关的功能：日志统计、安全控制、异常处理
> * 优点：保持业务逻辑模块的纯净和高内聚性，并且方便地复用日志统计等功能模块。

### 4.1 before（前置通知）

```js
// 原型上
Function.prototype.before = function( beforefn ){
    var __self = this; // 保存原函数的引用
    
    return function(){ //  返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，且保证 this 不被劫持，新函数接受的参数；也会被原封不动地传入原函数，新函数在原函数之前执行
        
        return __self.apply( this, arguments ); //  执行原函数并返回原函数的执行结果，并且保证 this 不被劫持
    }
}; 

// 不污染原型
var before = function( fn, beforefn ){
    return function(){
        beforefn.apply( this, arguments );
        return fn.apply( this, arguments );
    }
} 
```

> * “代理”函数只是结构上像代理而已，并不承担代理的职责（比如控制对象的访问等）。
>    * 它的工作是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原函数之前执行（前置装饰），这样就实现了动态装饰的效果。

> * 实例：
> * [demo](/effects/demo/js/designPattern/decorator/v3.html)

```js
const fn = function (fruits) {
  console.log(`我喜欢吃的水果是：${fruits}`)
}

const bFn = function (fruits) {
  console.log(`吃${fruits}前要洗手！`)
}

const result = before(fn, bFn)
result('苹果')
```

### 4.2 after（后置通知）

```js

// 原型上
Function.prototype.after = function( afterfn ){
    var __self = this; // 保存原函数的引用
    
    return function(){
        var ret = __self.apply( this, arguments ); // 保存的是after紧跟随的那个函数所返回的值
        
        afterfn.apply( this, arguments ); // 执行新的函数，修正this
        
        return ret; // 返回的是after紧跟随的那个函数所返回的值
    }
}; 

// 不污染原型
var after = function(fn, afterFn) {
    return function() {
      var ret = fn.apply(this, arguments);
      
      afterFn.apply(this, arguments);
      
      return this;
    };
}
```

> * 新添加的函数在原函数执行之后再执行。

> * [demo](/effects/demo/js/designPattern/decorator/v4.html)

```js
    const fn = function (fruits) {
      console.log(`我喜欢吃的水果是：${fruits}`)
    }

    const aFn = function (fruits) {
      console.log(`吃${fruits}后要洗手！`)
    }

    const result = after(fn, aFn)
    result('苹果')
```

### 4.3 AOP简单实例

```js
// 原函数
var func = function(){
 console.log( 2 );
};

// 装饰者模式，并运用了前置通知以及后置通知
func = func.before(function(){
    console.log( 1 );
}).after(function(){
    console.log( 3 );
});

func(); 
```

## 五、 用AOP装饰函数

### 5.1 数据统计上报

> * 页面中有一个登录 `button`，点击这个 `button` 会弹出登录浮层，与此同时要进行数据上报，来统计有多少用户点击了这个登录 `button`。

```html
<html>
<button tag="login" id="button">点击打开登录浮层</button>
<script>
    var showLogin = function(){
        console.log( '打开登录浮层' );
        log( this.getAttribute( 'tag' ) );
    };
    
    var log = function( tag ){
        console.log( '上报标签为: ' + tag );
        // (new Image).src = 'http:// xxx.com/report?tag=' + tag; // 真正的上报代码略
    };
    
    document.getElementById( 'button' ).onclick = showLogin;
</script>
</html> 
```

> * 在 `showLogin` 函数里，既要负责打开登录浮层，又要负责数据上报，这是两个层面的功能，在此处却被**耦合**在一个函数里。

> * 解决耦合方法：使用后置通知（`after`），详细代码可看**四、AOP**
> * [demo](/effects/demo/js/designPattern/decorator/v5.html)
   
```html
<html>
<button tag="login" id="button">点击打开登录浮层</button>

<script>
    const after = function (fn, afterFn) {
      return function () {
        const ret = fn.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ret
      }
    }

    var showLogin = function(){
      console.log( '打开登录浮层' );
    }

    var log = function(){
      console.log( '上报标签为: ' + this.getAttribute( 'tag' ) );
    }

    // 打开登录浮层之后上报数据
    showLogin = after(showLogin, log );

    document.getElementById( 'button' ).onclick = showLogin;
</script>
</html>
```

### 5.2 用AOP动态改变函数的参数

```js
Function.prototype.before = function( beforefn ){
    var __self = this;
    
    return function(){
        beforefn.apply( this, arguments ); // (1)
        
        return __self.apply( this, arguments ); // (2)
    }
} 
```

> * 从这段代码的`(1)`处 和`(2)`处可以看到，`beforefn` 和原函数 `__self` 共用一组参数列表
>   `arguments`，当我们在 `beforefn` 的函数体内改变 `arguments` 的时候，原函数 `__self` 接收的参数列表自然也会变化。

> * [demo](/effects/demo/js/designPattern/decorator/v6.html)
  
```js
  const before = function (fn, beforeFn) {
    return function () {
      beforeFn.apply(this, arguments)
      return fn.apply(this, arguments)
    }
  }

  let fn = function (param) {
    console.log(param)
  }

  fn = before(fn, function (param) {
    console.log(param) // {b: 2}
    param.a = 1
  })

  fn({
    b: 2
  })

  // 结果 {b: 2, a: 1}
```

### 5.3 解决 CSRF 攻击

> * **CSRF**

> * `CSRF`（`Cross-site request forgery`）跨站请求伪造。
>     * 解决 `CSRF` 攻击最简单的一个办法就是在 `HTTP` 请求中带上一个 `Token` 参数。
    
> * **解决CSRF的思路：**

> * 思路1：直接在 `ajax`函数的参数`param`（这个参数一般是发送给服务器的数据，格式为`JSON`）附加`Token`这个参数
>     * 这个思路存在一个`bug`：不是所有项目都需要`Token`验证的，那么这个`Token`参数可能就是多余的，或者 `Token` 的生成方式不同
> * 思路2：用`AOP`的前置通知（`before`）
>     * 完美解决了思路1的`bug`：还原一个纯净的`Ajax`函数，提高了`Ajax`函数的可复用性
    
```js
var getToken = function(){
 return 'Token';
} 

// 思路1
var ajax = function( type, url, param ){
    param = param || {};
    
    // 每个ajax请求里的param都会包含Token参数
    Param.Token = getToken(); 
}; 

//思路2
var ajax= function( type, url, param ){
    // ajax函数的参数很纯洁：不存在Token参数
    console.log(param); 
    
    // 发送 ajax 请求的代码略
};

// 使用前置通知before，动态给ajax函数装饰上（也可以说添加上）Token参数
ajax = ajax.before(function( type, url, param ){
    param.Token = getToken();
});

ajax( 'get', 'http:// xxx.com/userinfo', { name: 'sven' } ); 

// 最后输出 {name: "sven", Token: "Token"} 
```

### 5.4 插件式的表单验证

> * 在表单数据提交给后台之前，常常要做一些校验，比如登录的时候需要验证用户名和密码是否为空。

> * **思路1：一个formSubmit函数搞掂表单验证和发送数据**

```html
<html>
<body>
    用户名：<input id="username" type="text"/> 
    密码： <input id="password" type="password"/>
    <input id="submitBtn" type="button" value="提交">
</body>
<script>
    // 获取元素
    var username = document.getElementById( 'username' ),
        password = document.getElementById( 'password' ),
        submitBtn = document.getElementById( 'submitBtn' );
    
    // 表单验证
    var formSubmit = function(){
        
        if ( username.value === '' ){
            return alert ( '用户名不能为空' );
        }
        
        if ( password.value === '' ){
            return alert ( '密码不能为空' );
        }
        
        // 发送给服务器的数据
        var param = {
            username: username.value,
            password: password.value
        };
        
        // ajax
        ajax( 'http:// xxx.com/login', param ); 
    };
    
    // 点击事件
    submitBtn.onclick = function(){
        formSubmit();
    };
</script>
</html> 
```

> * `formSubmit` 函数在此处承担了两个职责：
>     * 提交 `ajax` 请求
>     * 验证用户输入的合法性。
> * 以上代码存在很大缺点：
>     * 函数臃肿，职责混乱
>     * 没有任何可复用性。
    
> * **思路2：部分分离校验输入和提交 `ajax` 请求的代码**

> * 校验输入的逻辑放到 `validata` 函数中，并且约定当 `validata` 函数返回 `false` 的时候，表示校验未通过。

```js
// 校验表单的函数
var validata = function(){
    if ( username.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    
    if ( password.value === '' ){
        alert ( '密码不能为空' );
        return false;
    }
}

// 提交表单数据的函数
var formSubmit = function(){
    // 校验未通过，直接return，不提交表单数据
    if ( validata() === false ){ 
        return;
    }
    
    var param = { 
        username: username.value,
        password: password.value
    }
    
    ajax( 'http:// xxx.com/login', param );
}

submitBtn.onclick = function(){
    formSubmit();
} 
```

> * 思路2存在的问题：
>     * 貌似`validata` 和 `formSubmit`好像已经分离开来，然而`formSubmit`函数的内部还要计算 `validata` 函数的返回值，因为返回值的结果表明了是否通过校验。
>       那也说明`validata` 和 `formSubmit`还没有完全分离开来

> * **思路3：完全分离validata 和 formSubmit**

> * 关键点：改写 `Function.prototype.before`，如果 `beforefn` 的执行结果返回 `false`，表示不再执行后面的原函数。

```js
// 进化版的前置通知 --- before
Function.prototype.before = function( beforefn ){
    var __self = this;
    
    return function(){
        if ( beforefn.apply( this, arguments ) === false ){
            // beforefn 返回 false 的情况直接 return，不再执行后面的原函数
            return;
        }
        
        return __self.apply( this, arguments );
    }
}

var validata = function(){
    if ( username.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    
    if ( password.value === '' ){
        alert ( '密码不能为空' );
        return false;
    }
}
var formSubmit = function(){
    // 已经不存在于validata函数有关的任何计算代码
    
    var param = {
        username: username.value,
        password: password.value
    }
    
    ajax( 'http:// xxx.com/login', param );
}

// 使用修改后的前置通知--before，实现validata 与 formSubmit的完全分离，它俩不再有任何耦合的关系
formSubmit = formSubmit.before( validata );

submitBtn.onclick = function(){
    formSubmit();
} 
```

> * 注意：为函数通过 `Function.prototype.before` 或者 `Function.prototype.after` 被装饰之后
>    1. 返回的实际上是一个新的函数，如果在原函数上保存了一些属性，那么这些属性会丢失。
>    2. 也叠加了函数的作用域，如果装饰的链条过长，性能上也会受到一些影响。 
> * [demo](/effects/demo/js/designPattern/decorator/v7.html)

```js
  const after = function (fn, afterFn) {
    return function () {
      const ret = fn.apply(this, arguments)
      afterFn.apply(this, arguments)
      return ret
    }
  }

  let fn = function () {
    console.log(1)
  }

  fn.a = 1
  console.dir(fn)

  fn = after(fn, function () {
    console.log(2)
  })

  console.dir(fn)

  fn()
  console.log(fn.a)  // undefined
```

![decorator](/styles/images/javascript/designPattern/decorator/decorator-01.png)

> * 红线上方是未`after`前，仍有a变量；红线下方是`after`后，没有了`a`变量
     
### 六、总结

> * 个人发现装饰者模式有的另外一个强大的功能：可以**解决代码之间的耦合性**，促使代码的复用性提高。最详细的例子就是 **5.4 插件式的表单验证**。