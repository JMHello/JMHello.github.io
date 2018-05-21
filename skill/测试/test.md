测试：
正向测试、反向测试、异常测试
FAIR：快速、自动化、独立、可重复

jest

测试套件（test suit）
预期(expect)
操作DOM
```
document.body.innerHTML = '<div id="div" class="red test1"></div>';
const div = document.getElementById('div');
```

测试的方面：

前端
react
redux

1、后端
[Async testing Koa with Jest](https://hackernoon.com/async-testing-koa-with-jest-1b6e84521b71)
[A clear and concise introduction to testing Koa with Jest and Supertest](https://www.valentinog.com/blog/testing-api-koa-jest/)
[superagent](https://visionmedia.github.io/superagent/)
[全栈测试实战：用Jest测试Vue+Koa全栈应用](https://juejin.im/post/5a0cdb22f265da4332271ef9)

super test

2、supertest搭配koa报错： app.address is not a function

[方法一](https://segmentfault.com/q/1010000006906863)
[方法二](https://hackernoon.com/async-testing-koa-with-jest-1b6e84521b71)

3、testEnvironment
[配置 testEnvironment](https://facebook.github.io/jest/docs/en/configuration.html#testenvironment-string)

4、listen EADDRINUSE :::3001

解决方法：当所有测试都跑完了之后，关闭server（app）

```js
afterEach(() => {
  app.close() // 当所有测试都跑完了之后，关闭server
})
```

5、referer验证

在测试的时候，请求头headers里不存在referer，我们可以改换检测host

```js
{ host: '127.0.0.1:51024',
'accept-encoding': 'gzip, deflate',
'user-agent': 'node-superagent/3.8.3',
'content-type': 'application/json',
'content-length': '139',
connection: 'close' }

```

浏览器发出的请求头

```js
{ 'accept-language': 'zh-CN,zh;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  referer: 'http://127.0.0.1:8080/',
  'content-type': 'application/json',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
  origin: 'http://127.0.0.1:8080',
  accept: 'application/json, text/plain, */*',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '75',
  connection: 'close',
  host: '127.0.0.1:8080' }

```



------------------

对于cms来说，都是基于登录的前提

登录测试！

发表文章接口测试：
1、要有用户权限(jwt，请求头字段authorization)
2、要有csrf token



