看英文文档，学会理解和翻译

第一阶段：
* 知道Nodejs的运行原理、使用的场景
* 必须要掌握常用模块的用法：path fs http 
* 处理并发：回调 ==》 promise ===》 async/await
深入学习理解promise
* 调试

第二阶段
* 看源码



-----------------------------

## 3、学习 Node.js 的三个境界

打日志：console.log
断点调试：断点调试：node debugger 或node inspector 或vscode
测试驱动开发（tdd | bdd）

## 4、个人学习和技术选型都要循序渐进

先能写，然后再追求更好的写法，比如面向对象。
等团队水平到一定程度了，并且稳定的时候，可以考虑更加极致的函数式写法。

## 3m安装环境

nvm（node version manager）【需要使用npm安装，替代品是yrm（支持yarn）】
node版本发布非常快，而且多版本共存可能性较大，推荐使用nvm来安装node

nrm（node registry manager）【需要使用npm安装，替代品是yrm（支持yarn）】
https://registry.npmjs.com 是node官方的源（registry），服务器在国外，
下载速度较慢，推荐安装nrm来切换源，
国内的cnpm和taobao的源都非常快，当然，如果你想自建源也是支持的。


npm（node packages manager）【内置，替代品是n或nvs（对win也支持）】

## 4、promise的学习

Node.js最新技术栈之Promise篇 https://cnodejs.org/topic/560dbc826a1ed28204a1e7de
理解 Promise 的工作原理 https://cnodejs.org/topic/569c8226adf526da2aeb23fd
Promise 迷你书 http://liubin.github.io/promises-book/

## 5、每天看10个Npm包

[https://github.com/parro-it/awesome-micro-npm-packages](https://github.com/parro-it/awesome-micro-npm-packages)

## 6、api的规范

[api 的最佳实践](https://developer.github.com/v3/)
[客户端 API 开发总结](https://cnodejs.org/topic/552b3b9382388cec50cf6d95)
[HTTP API 设计指南](https://segmentfault.com/bookmark/1230000002521721)
[Heroku 平台 API 指引](https://devcenter.heroku.com/articles/platform-api-reference)