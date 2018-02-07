---
layout: post
title: "口述面试题 （五）安全攻防"
date: 2018-02-06 09:00:00 +0800 
categories: 面试
tag: interview
---
* content
{:toc}


<!-- more -->

## 1、有没有碰到过跨域请求，你是怎么处理的？

> 先说自己如何遇到过跨域，再说一说解决方案

> * 暂时在自己实践过程中，遇到过两次跨域的问题
>   * 第一次是：做一个上传图片的插件，我是用Nodejs搭的服务器，但是我是在本地上传图片给这个服务器，存在跨域的问题
>       * 解决方案是：在服务器端返回响应头的时候，添加多了一个字段 `Access-Control-Allow-Origin: *`
>   * 第二次是：上传图片的插件需要做进度条，所以，添加了 `xhr.upload.progress` 这个事件，却发现本以为的简单请求`post` 却无法发出
>       * 实际原因是：`post` + `xhr.upload.progress` 就不是简单请求，而是非简单请求，它会发送两次请求，第一次是预检请求 `OPTIONS`，第二次才是真正的上传图片的请求
>       * 解决方案：思路是这样的：先处理预检请求，再处理真正的上传图片的请求
>           * 主要讲讲处理预检请求：在检测到请求的方法是`OPTIONS` 的时候，设置响应头字段 `Access-Control-Allow-Origin: *`，这个是基础，以及设置响应头字段 `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`

> * `cors` 的话，主要是兼容性的问题


---

> * 自己的扩充：比如有什么解决跨域的方法，其实如何实现的，各自的不足

> * 跨域的方法有：
>   * `postMessage()` + `iframe`
>   * `location.hash` + `iframe`
>   * `document.domain` + `iframe`
>   * `window.name` + `iframe`
>   * 动态创建`script`标签
>   * `JSONP`
>   * `CORS`

---

> * `JSONP`
>   * 主要原理是：利用`script` 标签不受同源策略限制来跨域获取数据
>   * 举个例子，3001 端口的`a.html`页面希望能获取 `3002` 端口的`data.json`的数据，
>       * 在`a`页面上加个`jsonp`函数，里面的逻辑你喜欢怎么写就怎么写
>       * 然后将`http://localhost:3001/data.js`作为新的一个`script`标签的`src`值
>       * 我们通过`data.js`获取到的数据传递给`jsonp`函数
>   * 需要注意的是，如果要使用`JSONP`实现跨域，那么在返回响应头的时候，一定要添加这个响应头信息`Content-Type: application/x-javascript`，不然浏览器没法正确识别响应内容

> * `jsonp` 的话，只局限于get请求方法，而且所有参数都暴露在参数上

---

> * `window.name` + `iframe`
>   * 主要原理是：利用`window.name`只要在当前页面保存了数据，然后无论跳转多少个页面，其保存的数据仍然不变的特性，以及`iframe` 的跨域能力来实现跨域获取数据。
>   * 举个例子：3001 端口下有a.html 和 c.html，3002 端口下有b.html 和 data.json；a.html要获取data.json的数据，这就存在跨域
>       * 利用iframe将3002端口的b.html嵌套在3001端口的a.html下
>       * a.html 里只需要添加一些拿到数据后，如何处理数据的逻辑即可，例如 `update` 函数，将数据展示在页面上
>       * b.html 里就是正常的ajax请求，请求的数据当然是data.json，不过在请求成功后，要将拿到的数据赋值给window.name，并且跳转到3001端口的c.html
>       * 基于window.name的特性，所以c.html 可以通过window.name获取到data.json的数据
>       * c.html的话，可以直接通过parent.update(window.name)，就可以调用到a.html的函数，这也相当于将数据传回给a.html
>       * 最终，a.html就可以跨域拿到data.json的数据

---

> * `postMessage()` + `iframe`
>   * 利用 `XDM`，核心方法为 `targetWindow.postMesage(info, origin)`，其可在来自不同域的页面间传递信息；
>     以及通过监听`messge`方法，获取数据，主要用到其事件对象中的 data 属性，还有origin属性，判断传数据的域是什么
>   * 在实现过程中：
>       * 作为发送方，则通过postMessage方法，发送数据给接收方
>       * 作为接收方，那么就要用iframe嵌入发送方的网页到作为接收方的页面中
>           * 例如：http://127.0.0.1:3002/b.html 作为接收方，所以要利用iframe将作为发送方的 http://127.0.0.1:3001/a.html 嵌入到自己的页面中
>       * 作为接收方，通过监听message事件，获取发送来的数据 

## 2、你写代码的时候是怎么考虑安全因素的？

> * 我是这样考虑安全因素的：

> * 最基本的安全因素就是：用户登录，比如需要cms系统，绝对是要用户登录，才可以看到里面的数据或者操作里面的一些功能。
>   * 用户登录时要进行用户名和密码的判断，两者与后台数据匹配了，就登陆成功

---

> * 接着就是要预防XSS攻击，XSS有三种
>   * 反射型（非持久型）：就是诱导用户点击恶意链接来造成一次性攻击（最常见的就是将js代码挂载在url的参数中）
>   * 存储型（持久型）：将恶意脚本代码存储到有漏洞的服务器中，用户浏览相关页面，就会受到攻击，最常见的就是留言
>   * DOM-Based型：通过js操作dom的时候，一些带有恶意代码的片段被html解析执行，从而导致xss攻击

> * 因此，为了预防XSS攻击，输入检查，输出检查，以及httpOnly

> * 输入检查：是针对用户的输入而言的。
>   * 对于富文本（用户可以输入一些自定义的html代码），我们会采用黑名单来过滤危险的标签和属性，例如：帖子
>   * 对于只允许提交纯文本，则会用`htmlEncode`转义一些特殊字符

> * 输出检查：主要有5中环境：html 标签、html 属性、script标签中、事件属性中以及Url中

> * httpOnly主要用在cookie上，设置了httpOnly的cookie在客户端是无法用js操作的

> * 其实个人理解，如果数据是要存储到数据库中，为了安全着想，无论前端还是后台，必须都要进行过滤检查，只有满足规范，才可以批准通过

---

> * 接着是CSRF攻击
>   * 进行referer验证
>   * 进行token验证

> * 还有SQL注入攻击

## 3、